// Simple wrapper around Web Crypto API for AES-GCM

export class CryptoService {
  private key: CryptoKey | null = null;

  async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    return window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  async init(password: string, existingSalt?: string): Promise<{ success: boolean; salt: string }> {
    try {
      let salt: Uint8Array;
      if (existingSalt) {
        salt = new Uint8Array(atob(existingSalt).split('').map(c => c.charCodeAt(0)));
      } else {
        salt = window.crypto.getRandomValues(new Uint8Array(16));
      }

      this.key = await this.deriveKey(password, salt);
      
      const saltString = btoa(String.fromCharCode(...salt));
      return { success: true, salt: saltString };
    } catch (e) {
      console.error("Crypto init failed", e);
      return { success: false, salt: "" };
    }
  }

  async encrypt(data: string): Promise<{ iv: string; data: string }> {
    if (!this.key) throw new Error("Crypto not initialized");
    const enc = new TextEncoder();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encodedData = enc.encode(data);

    const encryptedContent = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      this.key,
      encodedData
    );

    return {
      iv: btoa(String.fromCharCode(...iv)),
      data: btoa(String.fromCharCode(...new Uint8Array(encryptedContent))),
    };
  }

  async decrypt(encryptedData: string, iv: string): Promise<string> {
    if (!this.key) throw new Error("Crypto not initialized");
    const dec = new TextDecoder();
    const dataBuffer = new Uint8Array(atob(encryptedData).split('').map(c => c.charCodeAt(0)));
    const ivBuffer = new Uint8Array(atob(iv).split('').map(c => c.charCodeAt(0)));

    const decryptedContent = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: ivBuffer,
      },
      this.key,
      dataBuffer
    );

    return dec.decode(decryptedContent);
  }

  isInitialized(): boolean {
    return this.key !== null;
  }
}

export const cryptoService = new CryptoService();
