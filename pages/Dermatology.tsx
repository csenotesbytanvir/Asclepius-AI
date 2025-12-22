import React, { useState } from 'react';
import { Card, Button, FileUpload, PageHeader, AsclepiusLogo, ClinicalScanner, IntelligenceLedger } from '../components/Shared';
import { generateMultimodalAnalysis } from '../services/geminiService';
import { useLanguage } from '../App';
import { I18N } from '../constants';
import { ScanEye, RefreshCcw, Camera, Printer, BrainCircuit, Activity, FileText } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export const Dermatology = () => {
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
      const prompt = `Perform Comprehensive Dermatology Vision Assessment. 
      STRICT JSON FORMAT REQ: { "conditions": [{"name": "", "description": "", "confidence": 0.0, "specialty": "Dermatology", "etiology": "", "pathophysiology": ""}], "treatments": [{"name": "", "dosage": "", "mechanism": "", "description": ""}], "lifestyle": [""] }`;
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
      alert("Neural handshake interrupted."); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-16 pb-48 animate-in fade-in duration-1000 px-4 md:px-0">
      <PageHeader title={<span>Dermatology <span className="text-amber-500">Vision</span></span>} subtitle="Optical Integumentary Profiling Matrix" />

      <div className="max-w-4xl mx-auto space-y-12">
        <div className="bg-surface/80 border-4 border-amber-500/20 rounded-[5rem] overflow-hidden shadow-clinical relative group">
            {!image ? (
                <div className="p-8 h-96 md:h-[500px]"><FileUpload label="Bio-Capture Clinical Skin Image" accept="image/*" onFileSelect={handleFile} icon={Camera} capture="environment" /></div>
            ) : (
                <div className="relative h-96 md:h-[500px] bg-black/40 flex items-center justify-center p-12">
                    {loading && <ClinicalScanner />}
                    <img src={image} className="max-h-full max-w-full object-contain rounded-[2rem] shadow-glow-heavy border-2 border-white/20" alt="Capture" />
                    <button onClick={() => {setImage(null); setResult(null);}} className="absolute top-10 right-10 bg-black/80 backdrop-blur-xl p-8 rounded-full text-white hover:text-red-500 transition-all shadow-2xl z-40 border-2 border-white/10"><RefreshCcw size={32} /></button>
                </div>
            )}
        </div>
        
        {!result && (
            <Button onClick={analyze} disabled={!image || loading} isLoading={loading} className="w-full py-16 text-3xl font-black rounded-[4rem] bg-amber-600 shadow-glow shadow-amber-500/30">
                <ScanEye className="mr-6" size={40} /> Execute Vision Scan
            </Button>
        )}
      </div>

      {result && (
        <div className="animate-in slide-in-from-bottom-12 duration-1000 space-y-16">
           <div className="bg-amber-500/10 border-4 border-amber-500/30 rounded-[4rem] p-12 flex flex-col md:flex-row items-center justify-between gap-10 backdrop-blur-3xl shadow-glow shadow-amber-500/10">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-amber-500 text-white rounded-[2rem] flex items-center justify-center shrink-0 shadow-lg ring-8 ring-amber-500/20"><BrainCircuit size={48} /></div>
                <div>
                   <h3 className="text-4xl font-black text-amber-500 uppercase tracking-tighter">Vision Assessment Node</h3>
                   <p className="text-sm text-textSecondary font-black uppercase tracking-[0.4em] mt-3 flex items-center gap-4"><Activity size={22} className="text-amber-500" /> Neural Link Synchronized</p>
                </div>
              </div>
              <Button variant="secondary" onClick={() => window.print()} className="h-20 px-16 rounded-[2.5rem]"><Printer size={32} className="mr-4" /> Print Bio-Report</Button>
           </div>

           <div className="print-section glass border-4 border-amber-500/20 rounded-[5rem] p-12 md:p-24 shadow-glow-heavy relative overflow-hidden">
               <div className="flex flex-col md:flex-row justify-between items-start border-b-8 border-amber-500/10 pb-16 mb-20 gap-12 relative z-10">
                   <div className="space-y-8">
                       <h1 className="text-5xl md:text-7xl font-black text-textPrimary tracking-tighter uppercase leading-none">Optical Skin Ledger</h1>
                       <div className="flex items-center gap-10 text-textSecondary text-sm uppercase font-black tracking-[0.5em] opacity-80">
                           <span className="bg-surfaceHighlight px-8 py-4 rounded-2xl border-2 border-border">PROTOCOL: VISION-DERM-{uuidv4().slice(0,6).toUpperCase()}</span>
                       </div>
                   </div>
                   <AsclepiusLogo className="w-40 h-40 text-amber-500 opacity-60 drop-shadow-glow" />
               </div>
               
               <IntelligenceLedger result={result} type="vision" />
               
               <div className="mt-40 pt-16 border-t-8 border-amber-500/5 text-center opacity-30 text-xs font-black uppercase tracking-[0.8em]">
                   BIO-OPTIC SCAN ANALYSIS • ARCHIVE VAULTED AES-256
               </div>
           </div>
        </div>
      )}
    </div>
  );
};