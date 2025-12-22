import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, Button, FileUpload, PageHeader, AsclepiusLogo, RxBadge, ClinicalScanner, IntelligenceLedger } from '../components/Shared';
import { generateMultimodalAnalysis } from '../services/geminiService';
import { useLanguage } from '../App';
import { I18N } from '../constants';
import { RefreshCcw, FileText, Camera, ShieldCheck, Printer, CheckCircle, BrainCircuit, Pill, Zap } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export const RxScanner = () => {
  const { language } = useLanguage();
  const t = I18N[language];
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const prompt = `Role: Senior Clinical Pharmacologist. Perform neural decryption of this prescription. Output JSON.`;
      const res = await generateMultimodalAnalysis(prompt, image, language);
      
      let parsedData: any = {};
      try {
        const jsonMatch = res.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            parsedData = JSON.parse(jsonMatch[0]);
        } else {
            throw new Error("No JSON found");
        }
      } catch (e) { 
        parsedData = { rawAnalysis: res }; 
      }
      setResult(parsedData);
    } catch (e) {
      alert("Pharmacology Handshake Interrupted.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-16 pb-32 animate-in fade-in duration-700 px-4 md:px-0">
       <PageHeader 
          title={<span>Rx <span className="text-emerald-500">Decrypter</span></span>} 
          subtitle="Neural Optical Pharmacotherapy Recognition" 
       />

      <div className="space-y-12">
        <div className="relative group mx-auto max-w-3xl">
            <Card className="p-0 bg-surface/80 border-2 border-emerald-500/10 overflow-hidden rounded-[3rem] shadow-glow shadow-emerald-500/10 relative">
                {!image ? (
                    <div className="h-96 md:h-[500px] flex items-center justify-center p-6">
                        <FileUpload 
                          label="Deploy Prescription for Neural Decryption" 
                          accept="image/*,application/pdf" 
                          onFileSelect={handleFile} 
                          icon={Camera}
                          color="rx"
                        />
                    </div>
                ) : (
                    <div className="relative h-96 md:h-[500px] rounded-[3rem] overflow-hidden bg-black/20 flex items-center justify-center border-2 border-emerald-500/20 shadow-2xl">
                        {loading && <ClinicalScanner />}
                        {image.startsWith('data:application/pdf') ? (
                            <div className="flex flex-col items-center gap-6 text-emerald-500">
                                <FileText size={100} className="animate-pulse" />
                                <span className="font-black uppercase tracking-[0.4em] text-lg">VIGNETTE SECURED</span>
                            </div>
                        ) : (
                            <img src={image} className="max-h-full max-w-full object-contain p-8" alt="Rx Capture" />
                        )}
                        <button 
                          onClick={reset} 
                          className="absolute top-8 right-8 bg-black/80 backdrop-blur-2xl p-6 rounded-full text-white hover:bg-red-500 transition-all shadow-glow shadow-red-500/20 border border-white/10 z-30"
                        >
                            <RefreshCcw size={28} />
                        </button>
                    </div>
                )}
            </Card>
        </div>
        
        {!result && (
            <div className="mx-auto max-w-2xl">
              <Button 
                onClick={analyze} 
                disabled={!image || loading} 
                isLoading={loading}
                variant="rx"
                size="lg"
                className="w-full py-12 text-2xl font-black rounded-[2rem] hover:scale-[1.02]"
              >
                <Pill className="mr-6" size={40} /> Commence Decryption
              </Button>
            </div>
        )}
      </div>

      {result && (
        <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-700">
           <div className="bg-emerald-500/5 border-2 border-emerald-500/10 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-3xl shadow-glow shadow-emerald-500/10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-glow shadow-emerald-500/20 ring-4 ring-emerald-500/10">
                  <BrainCircuit size={40} />
                </div>
                <div>
                   <h3 className="text-3xl font-black text-textPrimary uppercase tracking-tighter text-emerald-500">Decryption Ledger</h3>
                   <p className="text-xs text-textSecondary font-black uppercase tracking-[0.3em] mt-2 flex items-center gap-3">
                     <ShieldCheck size={20} className="text-emerald-500" /> Neural Pharma Handshake Active
                   </p>
                </div>
              </div>
              <Button variant="secondary" onClick={() => window.print()} className="rounded-2xl px-12 h-16 border-2 border-emerald-500/5 shadow-lg w-full md:w-auto">
                  <Printer size={28} className="mr-4" /> Print Pharma-Report
              </Button>
           </div>

           <div className="print-section glass border-2 border-emerald-500/10 rounded-[4rem] p-10 md:p-24 shadow-2xl relative overflow-hidden">
               <div className="flex flex-col md:flex-row justify-between items-start border-b-4 border-emerald-500/5 pb-12 mb-16 gap-10 relative z-10">
                   <div className="space-y-8 flex-1">
                       <h1 className="text-4xl md:text-7xl font-black text-textPrimary tracking-tighter uppercase leading-none">Pharma <span className="text-emerald-500">Intelligence</span></h1>
                       <div className="flex flex-wrap items-center gap-8 text-textSecondary text-xs uppercase font-black tracking-[0.4em] opacity-80">
                           <span className="flex items-center gap-4 bg-emerald-500/5 border-2 border-emerald-500/10 px-8 py-4 rounded-2xl">LEDGER ID: RX-{uuidv4().slice(0,8).toUpperCase()}</span>
                       </div>
                   </div>
                   <RxBadge className="w-32 h-32 shadow-glow shadow-emerald-500/40 opacity-40 shrink-0" />
               </div>

               <IntelligenceLedger result={result} type="pharma" />

               <div className="mt-24 pt-12 border-t-2 border-dashed border-emerald-500/10 text-center opacity-30 text-[10px] font-black uppercase tracking-[0.6em]">
                   BIO-OPTIC SCAN ANALYSIS • ARCHIVE VAULTED AES-256
               </div>
           </div>
        </div>
      )}
    </div>
  );
};