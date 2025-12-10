import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { SymptomChecker } from './pages/SymptomChecker';
import { Dermatology } from './pages/Dermatology';
import { RxScanner } from './pages/RxScanner';
import { LabIntelligence } from './pages/LabIntelligence';
import { Chat } from './pages/Chat';
import { Records } from './pages/Records';
import { Welcome } from './pages/Welcome';
import { Setup } from './pages/Setup';
import { Language, AppTheme } from './types';
import { cryptoService } from './services/cryptoService';
import { initializeGemini } from './services/geminiService';
import { v4 as uuidv4 } from 'uuid';

// Contexts
const LanguageContext = createContext<{ language: Language; setLanguage: (l: Language) => void }>({ language: 'en', setLanguage: () => {} });
const ThemeContext = createContext<{ theme: AppTheme; setTheme: (t: AppTheme) => void }>({ theme: 'nebula', setTheme: () => {} });

export const useLanguage = () => useContext(LanguageContext);
export const useTheme = () => useContext(ThemeContext);

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<AppTheme>('nebula');
  const [appState, setAppState] = useState<'welcome' | 'app'>('welcome');
  const [showConfig, setShowConfig] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  // Apply Theme
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Initialize systems
  const initSystem = async (apiKey: string | null, offline: boolean) => {
      // 1. Setup AI
      setIsOffline(offline);
      if (apiKey) {
          initializeGemini(apiKey, false);
      } else if (offline) {
          initializeGemini('', true);
      }

      // 2. Setup Encryption (Auto-init with device key)
      let deviceKey = localStorage.getItem('asclepius_device_key');
      if (!deviceKey) {
          deviceKey = uuidv4();
          localStorage.setItem('asclepius_device_key', deviceKey);
      }
      const storedSalt = localStorage.getItem('asclepius_salt');
      const { success, salt } = await cryptoService.init(deviceKey, storedSalt || undefined);
      if (success && !storedSalt) {
          localStorage.setItem('asclepius_salt', salt);
      }

      setAppState('app');
      setShowConfig(false);
  };

  const handleStartWelcome = () => {
     const key = localStorage.getItem('asclepius_api_key');
     if (key) {
         initSystem(key, false);
     } else {
         setShowConfig(true);
     }
  };

  const handleConfigComplete = (apiKey: string | null, offline: boolean) => {
      initSystem(apiKey, offline);
  };

  // Render Welcome
  if (appState === 'welcome') {
      return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <Welcome onStart={handleStartWelcome} />
            {showConfig && <Setup onComplete={handleConfigComplete} onClose={() => setShowConfig(false)} />}
        </ThemeContext.Provider>
      );
  }

  // Render Main App
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <HashRouter>
          <Layout onConfig={() => setShowConfig(true)} isOffline={isOffline}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/symptoms" element={<SymptomChecker />} />
              <Route path="/derm" element={<Dermatology />} />
              <Route path="/rx" element={<RxScanner />} />
              <Route path="/lab" element={<LabIntelligence />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/records" element={<Records />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
          {showConfig && <Setup onComplete={handleConfigComplete} onClose={() => setShowConfig(false)} />}
        </HashRouter>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}