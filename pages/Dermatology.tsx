import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, Button, FileUpload, DisclaimerBox } from '../components/Shared';
import { generateMultimodalAnalysis } from '../services/geminiService';
import { useLanguage } from '../App';
import { I18N } from '../constants';
import { Save, Printer, ScanEye, UploadCloud } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export const Dermatology = () => {
  const { language } = useLanguage();
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
        Role: Dermatology Educator.
        Task: Analyze skin lesion.
        Format: Markdown with sections: Visuals, Differentials, Management.
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
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Dermatology</span> Vision
            </h1>
            <p className="text-textSecondary text-sm">Visual analysis for skin conditions and injuries.</p>
         </div>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-8 min-h-0">
        {/* Left Panel: Upload */}
        <div className="flex flex-col gap-6 h-full">
           <div className="flex-1 glass-panel border border-white/5 rounded-3xl p-6 relative group overflow-hidden border-dashed border-2 border-pink-500/20 hover:border-pink-500/50 transition-colors">
               {!image ? (
                   <div className="h-full flex flex-col items-center justify-center text-center">
                       <div className="w-24 h-24 bg-surfaceHighlight/50 rounded-full flex items-center justify-center mb-6 shadow-glow transition-transform group-hover:scale-110">
                           <UploadCloud className="text-pink-500 h-10 w-10" />
                       </div>
                       <h3 className="text-xl font-bold text-white mb-2">Upload Image</h3>
                       <div className="absolute inset-0 opacity-0">
                           <FileUpload label="" accept="image/*" onFileSelect={handleFile} />
                       </div>
                   </div>
               ) : (
                   <div className="relative h-full w-full rounded-2xl overflow-hidden bg-black">
                       <img src={image} className="w-full h-full object-contain" />
                       <div className="absolute top-4 right-4">
                           <Button variant="secondary" size="sm" onClick={() => {setImage(null); setResult(null);}}>Remove</Button>
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
             <ScanEye className="mr-2" /> Run Diagnostics
           </Button>
        </div>

        {/* Right Panel: Results */}
        <div className="bg-[#080a0e]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 flex flex-col h-full min-h-[500px] relative overflow-hidden shadow-inner">
            {!result ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
                    <div className="w-32 h-24 border-2 border-dashed border-white/20 rounded-xl mb-4 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white/10 rounded-full"></div>
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-widest uppercase">Awaiting Input</h3>
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