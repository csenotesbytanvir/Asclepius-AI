import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, Button, FileUpload, DisclaimerBox } from '../components/Shared';
import { generateMultimodalAnalysis } from '../services/geminiService';
import { useLanguage } from '../App';
import { I18N } from '../constants';
import { Microscope, BarChart3 } from 'lucide-react';

export const LabIntelligence = () => {
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
      const prompt = `Role: Lab Educator. Analyze report. Format Markdown.`;
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
            <h1 className="text-3xl font-black text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-secondary to-purple-400">
               Lab Intelligence
            </h1>
            <p className="text-textSecondary text-sm">Deep analysis of pathology and blood work reports.</p>
         </div>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-8 min-h-0">
        <div className="flex flex-col gap-6 h-full">
           <div className="flex-1 glass-panel border border-white/5 rounded-3xl p-6 relative group overflow-hidden border-dashed border-2 border-secondary/20 hover:border-secondary/50 transition-colors">
               {!image ? (
                   <div className="h-full flex flex-col items-center justify-center text-center">
                       <div className="mb-6">
                           <BarChart3 className="text-secondary h-16 w-16" />
                       </div>
                       <Button variant="secondary" className="pointer-events-none">Select File</Button>
                       <div className="absolute inset-0 opacity-0">
                           <FileUpload label="" accept="image/*" onFileSelect={handleFile} />
                       </div>
                   </div>
               ) : (
                   <div className="relative h-full w-full rounded-2xl overflow-hidden bg-black">
                       <img src={image} className="w-full h-full object-contain" />
                       <div className="absolute top-4 right-4">
                           <Button variant="secondary" size="sm" onClick={() => {setImage(null); setResult(null);}}>Reset</Button>
                       </div>
                   </div>
               )}
           </div>
           
           <Button 
             onClick={analyze} 
             disabled={!image} 
             isLoading={loading}
             className="w-full py-5 text-lg font-bold uppercase tracking-widest bg-gradient-to-r from-secondary to-purple-800 border border-white/10 shadow-lg"
           >
             Analyze Report
           </Button>
        </div>

        <div className="glass-panel border border-white/5 rounded-3xl p-8 flex flex-col h-full min-h-[500px] relative overflow-hidden">
            {!result ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
                    <Microscope size={64} className="mb-4 text-textSecondary" />
                    <h3 className="text-lg font-bold text-white tracking-widest uppercase">No Data Found</h3>
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