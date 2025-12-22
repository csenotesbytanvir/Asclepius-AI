import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, Button, FileUpload, PageHeader, AsclepiusLogo, ClinicalScanner, IntelligenceLedger } from '../components/Shared';
import { generateMultimodalAnalysis } from '../services/geminiService';
import { useLanguage } from '../App';
import { I18N } from '../constants';
import { Microscope, BarChart3, RefreshCcw, Printer, ShieldCheck, Activity, FileText, BrainCircuit } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export const LabIntelligence = () => {
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
      const prompt = `Role: Senior Pathologist. Analyze the lab report or medical document. Extract critical findings and output JSON.`;
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
      alert("Lab Intelligence handshake interrupted.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-24 pb-48 animate-in fade-in duration-700 px-4 md:px-0">
       <PageHeader 
          title={<span>Pathology <span className="text-purple-500">Intelligence</span></span>} 
          subtitle="Deep Analysis of Bio-Pathological Markers" 
       />

      <div className="space-y-16">
        <div className="relative group mx-auto max-w-4xl">
            <Card className="p-0 border-4 border-purple-500/20 overflow-hidden rounded-[4.5rem] shadow-glow shadow-purple-500/10 bg-surface/80">
                {!image ? (
                    <div className="h-96 md:h-[550px] flex items-center justify-center p-6">
                        <FileUpload 
                          label="Deploy Pathology Report for Intelligence Audit" 
                          accept="image/*,application/pdf,.docx" 
                          onFileSelect={handleFile} 
                          icon={FileText}
                        />
                    </div>
                ) : (
                    <div className="relative h-96 md:h-[550px] rounded-[4.5rem] overflow-hidden bg-black/20 flex items-center justify-center border-4 border-purple-500/10 shadow-2xl">
                        {loading && <ClinicalScanner />}
                        {image.startsWith('data:application/pdf') || image.startsWith('data:application/vnd.openxmlformats-officedocument') ? (
                            <div className="flex flex-col items-center gap-10 text-purple-400">
                                <BarChart3 size={150} className="animate-pulse" />
                                <span className="font-black uppercase tracking-[0.5em] text-xl text-center px-12">BIO-ARCHIVE INTEGRATED</span>
                            </div>
                        ) : (
                            <img src={image} className="max-h-full max-w-full object-contain p-12" alt="Lab Scan" />
                        )}
                        <button 
                          onClick={reset} 
                          className="absolute top-12 right-12 bg-black/80 backdrop-blur-2xl p-8 rounded-full text-white hover:bg-red-500 transition-all shadow-glow shadow-red-500/20 border-2 border-white/10 z-30"
                        >
                            <RefreshCcw size={32} />
                        </button>
                    </div>
                )}
            </Card>
        </div>
        
        {!result && (
            <div className="mx-auto max-w-3xl">
              <Button 
                onClick={analyze} 
                disabled={!image || loading} 
                isLoading={loading}
                size="lg"
                className="w-full py-16 text-3xl font-black bg-gradient-to-r from-purple-600 to-indigo-700 border-none shadow-glow shadow-purple-500/40 rounded-[4rem] hover:scale-[1.02]"
              >
                <Microscope className="mr-6" size={56} /> ANALYZE PATHOLOGY
              </Button>
            </div>
        )}
      </div>

      {result && (
        <div className="space-y-20 animate-in slide-in-from-bottom-12 duration-1000">
           <div className="bg-purple-500/10 border-4 border-purple-500/20 rounded-[4rem] p-12 flex flex-col md:flex-row items-center justify-between gap-10 backdrop-blur-3xl shadow-glow shadow-purple-500/10">
              <div className="flex items-center gap-10">
                <div className="w-28 h-28 bg-purple-600 text-white rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-glow shadow-purple-500/40 ring-4 ring-purple-500/20">
                  <BrainCircuit size={64} />
                </div>
                <div>
                   <h3 className="text-4xl md:text-5xl font-black text-textPrimary uppercase tracking-tighter text-purple-400">Pathology Audit</h3>
                   <p className="text-sm md:text-base text-textSecondary font-black uppercase tracking-[0.4em] mt-4 flex items-center gap-4">
                     <ShieldCheck size={28} className="text-purple-500" /> Neural Pathology-Handshake Active
                   </p>
                </div>
              </div>
              <Button variant="secondary" onClick={() => window.print()} className="rounded-[2.5rem] px-16 h-24 border-2 border-purple-500/10 shadow-lg w-full md:w-auto">
                  <Printer size={36} className="mr-6" /> Print Pathology-Ledger
              </Button>
           </div>

           <div className="print-section glass border-4 border-purple-500/20 rounded-[6rem] p-12 md:p-32 shadow-2xl relative overflow-hidden">
               <div className="flex flex-col md:flex-row justify-between items-start border-b-8 border-purple-500/20 pb-20 mb-24 gap-12 relative z-10">
                   <div className="space-y-12">
                       <h1 className="text-6xl md:text-9xl font-black text-textPrimary tracking-tighter uppercase leading-none">Bio-Pathology <span className="text-purple-500">Report</span></h1>
                       <div className="flex flex-wrap items-center gap-12 text-textSecondary text-base uppercase font-black tracking-[0.5em] opacity-80">
                           <span className="flex items-center gap-6 bg-purple-500/5 border-2 border-purple-500/20 px-12 py-6 rounded-3xl">REPORT ID: {uuidv4().slice(0,8).toUpperCase()}</span>
                       </div>
                   </div>
                   <AsclepiusLogo className="w-48 h-48 text-purple-500 opacity-60 drop-shadow-glow" />
               </div>

               <IntelligenceLedger result={result} type="pathology" />

               <div className="mt-40 pt-20 border-t-4 border-dashed border-purple-500/20 text-center opacity-30 text-sm font-black uppercase tracking-[0.8em]">
                   PATHOLOGY SUPPORT MODULE • VERIFY ALL FINDINGS LOCALLY • AES-256 VAULTED
               </div>
           </div>
        </div>
      )}
    </div>
  );
};