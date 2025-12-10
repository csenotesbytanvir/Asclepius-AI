import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, Button, FileUpload, DisclaimerBox } from '../components/Shared';
import { generateMultimodalAnalysis } from '../services/geminiService';
import { useLanguage } from '../App';
import { I18N } from '../constants';
import { Save, Printer, RefreshCw, FileText, Camera } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export const RxScanner = () => {
  const { language } = useLanguage();
  const t = I18N[language];
  const [image, setImage] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const prompt = `
        Role: Clinical Pharmacist.
        Task: Extract Rx details.
        Output format: Markdown.
        Sections: Detected Medications, Instructions, Educational Class, Safety Warnings.
        Keep it clean and professional.
      `;
      const res = await generateMultimodalAnalysis(prompt, image, language);
      setResult(res);
    } catch (e) {
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 h-full flex flex-col">
       <div className="flex items-center justify-between no-print shrink-0">
         <div>
            <h1 className="text-3xl font-black text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-success to-emerald-400">
            Rx Scanner
            </h1>
            <p className="text-textSecondary text-sm">Optical character recognition for handwritten prescriptions.</p>
         </div>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-8 min-h-0">
        {/* Left Panel: Upload */}
        <div className="flex flex-col gap-6 h-full">
           <div className="flex-1 glass-panel border border-white/5 rounded-3xl p-6 relative group overflow-hidden border-dashed border-2 border-emerald-500/20 hover:border-emerald-500/50 transition-colors">
               {!image ? (
                   <div className="h-full flex flex-col items-center justify-center text-center">
                       <div className="w-20 h-20 bg-surfaceHighlight/50 rounded-full flex items-center justify-center mb-6 shadow-glow">
                           <Camera className="text-success h-10 w-10" />
                       </div>
                       <h3 className="text-xl font-bold text-white mb-2">Upload Rx Image</h3>
                       <p className="text-textSecondary text-sm max-w-xs mx-auto mb-8">Drag and drop or click to scan a prescription.</p>
                       <div className="absolute inset-0 opacity-0">
                           <FileUpload label="" accept="image/*" onFileSelect={handleFile} />
                       </div>
                   </div>
               ) : (
                   <div className="relative h-full w-full rounded-2xl overflow-hidden bg-black">
                       <img src={image} className="w-full h-full object-contain opacity-80" />
                       <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                           <Button variant="secondary" size="sm" onClick={() => {setImage(null); setResult(null);}}>Retake Photo</Button>
                       </div>
                   </div>
               )}
           </div>
           
           <Button 
             onClick={analyze} 
             disabled={!image} 
             isLoading={loading}
             className="w-full py-5 text-lg font-bold uppercase tracking-widest bg-surfaceHighlight border border-white/10 hover:bg-white/5 shadow-lg"
           >
              Decrypt & Analyze
           </Button>
        </div>

        {/* Right Panel: Results */}
        <div className="glass-panel border border-white/5 rounded-3xl p-8 flex flex-col h-full min-h-[500px] relative overflow-hidden">
            {!result ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                    <FileText size={64} className="mb-4 text-textSecondary" />
                    <h3 className="text-lg font-bold text-white tracking-widest uppercase">Awaiting Scan</h3>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto custom-scrollbar prose prose-invert max-w-none">
                    <ReactMarkdown>{result}</ReactMarkdown>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};