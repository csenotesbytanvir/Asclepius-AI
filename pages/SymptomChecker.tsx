
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Button, DisclaimerBox, Input, Select, AsclepiusLogo, RxBadge } from '../components/Shared';
import { BodyMap } from '../components/BodyMap';
import { generateAnalysis } from '../services/geminiService';
import { cryptoService } from '../services/cryptoService';
import { useLanguage } from '../App';
import { I18N, EMERGENCY_TEXT, SYMPTOMS_BY_PART } from '../constants';
import { Printer, Check, RefreshCcw, FilePlus2, ChevronRight, PenTool } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { SymptomPayload } from '../types';
import clsx from 'clsx';

export const SymptomChecker = () => {
  const { language } = useLanguage();
  const t = I18N[language];
  const [view, setView] = useState<'intake' | 'report'>('intake');
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [otherSymptomText, setOtherSymptomText] = useState('');
  const [result, setResult] = useState<SymptomPayload | null>(null);
  const [loading, setLoading] = useState(false);
  
  const savedRef = useRef(false);

  const { register, getValues, reset } = useForm({
    defaultValues: {
      name: '',
      age: '',
      sex: 'Male',
      duration: '',
      history: ''
    }
  });

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]
    );
  };

  const onAnalyze = async () => {
    if (!selectedPart || (selectedSymptoms.length === 0 && !otherSymptomText)) return;
    setLoading(true);
    savedRef.current = false; // Reset save guard
    const data = getValues();
    try {
      const fullSymptoms = [...selectedSymptoms];
      if (otherSymptomText.trim()) fullSymptoms.push(otherSymptomText.trim());

      const prompt = `
        Role: Clinical Decision Support System.
        Task: Analyze these symptoms and return a structured JSON response wrapped in markdown code block.
        
        Patient: ${data.age}yo ${data.sex}, Name: ${data.name}
        Region: ${selectedPart}
        Symptoms: ${fullSymptoms.join(', ')}
        
        Required JSON Structure:
        {
          "conditions": [
            { "name": "Diagnosis/Differential", "description": "Clinical reasoning." }
          ],
          "treatments": [
            { "name": "Medication Name", "dosage": "Standard clinical dosage (e.g. 500mg BID)", "description": "Mechanism/Indication." }
          ],
          "lifestyle": [
            "Protocol 1", "Protocol 2"
          ]
        }
      `;
      
      const rawText = await generateAnalysis(prompt, language);
      
      let parsedData: any = {};
      try {
        const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/) || rawText.match(/```\n([\s\S]*?)\n```/);
        if (jsonMatch) {
            parsedData = JSON.parse(jsonMatch[1]);
        } else {
            parsedData = { 
                rawAnalysis: rawText,
                conditions: [{ name: "Analysis Result", description: rawText }] 
            };
        }
      } catch (e) {
        parsedData = { rawAnalysis: rawText, conditions: [{ name: "Analysis Text", description: rawText }] };
      }

      setResult({
        demographics: { name: data.name || 'Anonymous', age: data.age || 'N/A', sex: data.sex },
        bodyPart: selectedPart,
        symptoms: fullSymptoms,
        otherSymptoms: otherSymptomText,
        ...parsedData
      });
      setView('report');

    } catch (e) {
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-save effect
  useEffect(() => {
    if (result && view === 'report' && !savedRef.current) {
        const autoSave = async () => {
            const recordId = uuidv4();
            const payload = JSON.stringify(result);
            const { iv, data } = await cryptoService.encrypt(payload);
            
            const recordMeta = {
              id: recordId,
              type: 'symptom',
              title: `${result.demographics.name} - ${result.conditions?.[0]?.name || 'Clinical Note'}`,
              createdAt: Date.now(),
              language,
              iv,
              data
            };
            
            localStorage.setItem(`asclepius_rec_${recordId}`, JSON.stringify(recordMeta));
            savedRef.current = true;
        };
        autoSave();
    }
  }, [result, view, language]);

  const restart = () => {
    setView('intake');
    setResult(null);
    setSelectedPart(null);
    setSelectedSymptoms([]);
    setOtherSymptomText('');
    reset();
  };

  // REPORT VIEW
  if (view === 'report' && result) {
      return (
        <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center no-print gap-4">
             <div className="flex gap-3 w-full md:w-auto">
                 <Button variant="accent" onClick={() => window.print()} className="flex-1 md:flex-none py-3 shadow-glow-accent">
                    <Printer size={18} className="mr-2" /> {t.common.exportPdf}
                 </Button>
                 <Button variant="secondary" onClick={restart} className="flex-1 md:flex-none py-3 border border-white/10 hover:bg-white/5">
                    <FilePlus2 size={18} className="mr-2" /> {t.common.newIntake}
                 </Button>
             </div>
             
             <div className="px-4 py-2 bg-success/10 rounded-full border border-success/20 flex items-center text-success text-xs font-bold uppercase tracking-widest shadow-lg">
                <Check size={14} className="mr-2" /> {t.common.save}
             </div>
          </div>

          <div className="print-section bg-surface/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
             {/* Report Header */}
             <div className="flex justify-between items-start border-b border-textSecondary/20 pb-6 mb-8 print-header">
                 <div>
                     <h1 className="text-4xl font-black text-textPrimary tracking-tight mb-2">Clinical Report</h1>
                     <div className="flex items-center gap-4 text-textSecondary text-sm uppercase tracking-widest font-mono">
                         <span>Patient: <span className="text-textPrimary font-bold">{result.demographics.name}</span></span>
                         <span className="w-1 h-1 bg-textSecondary rounded-full"></span>
                         <span>Age: {result.demographics.age}</span>
                         <span className="w-1 h-1 bg-textSecondary rounded-full"></span>
                         <span>Sex: {result.demographics.sex}</span>
                     </div>
                 </div>
                 <div className="flex flex-col items-end">
                     <div className="w-12 h-12 mb-2 bg-gradient-to-tr from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                         <AsclepiusLogo className="w-8 h-8 text-white" />
                     </div>
                     <span className="text-xs font-bold text-textPrimary tracking-[0.2em] uppercase">ASCLEPIUS AI</span>
                 </div>
             </div>

             {/* Detected Conditions */}
             <div className="mb-8 print-break-inside-avoid">
                 <h3 className="text-sm font-bold text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                     <div className="w-2 h-2 bg-accent rounded-full"></div>
                     Clinical Assessment
                 </h3>
                 <div className="grid md:grid-cols-2 gap-4">
                     {result.conditions?.map((cond, i) => (
                         <div key={i} className="bg-surfaceHighlight/50 border border-white/5 rounded-2xl p-6 hover:border-accent/30 transition-colors shadow-sm">
                             <h4 className="text-xl font-bold text-textPrimary mb-3">{cond.name}</h4>
                             <p className="text-textSecondary text-sm leading-relaxed">{cond.description}</p>
                         </div>
                     ))}
                 </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8 print-break-inside-avoid">
                 {/* Treatments */}
                 <div>
                     <h3 className="text-sm font-bold text-success uppercase tracking-widest mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        Pharmacotherapy Plan
                     </h3>
                     <div className="space-y-3">
                         {result.treatments?.map((tx, i) => (
                             <div key={i} className="bg-surfaceHighlight/30 border border-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-surfaceHighlight/50 transition-colors group">
                                 <div className="flex items-start gap-3">
                                     <RxBadge className="mt-1" />
                                     <div>
                                         <span className="block font-bold text-textPrimary group-hover:text-success transition-colors">{tx.name}</span>
                                         <span className="text-xs text-textSecondary">{tx.description}</span>
                                     </div>
                                 </div>
                                 <span className="text-xs font-mono font-bold text-success bg-success/10 px-3 py-1.5 rounded-lg border border-success/20 ml-2 whitespace-nowrap">
                                     {tx.dosage}
                                 </span>
                             </div>
                         ))}
                     </div>
                 </div>

                 {/* Lifestyle */}
                 <div>
                     <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                         <div className="w-2 h-2 bg-secondary rounded-full"></div>
                         Non-Pharmacologic Interventions
                     </h3>
                     <div className="space-y-3">
                         {result.lifestyle?.map((item, i) => (
                             <div key={i} className="bg-surfaceHighlight/30 border border-white/5 rounded-xl p-4 flex items-start gap-3 hover:bg-surfaceHighlight/50 transition-colors">
                                 <div className="mt-1 w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                                     <Check size={12} className="text-secondary" />
                                 </div>
                                 <p className="text-sm text-textSecondary">{item}</p>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>

             {/* Disclaimer Footer */}
             <div className="mt-12 pt-8 border-t border-dashed border-textSecondary/20 text-center">
                 <p className="text-[10px] text-textSecondary font-bold uppercase tracking-widest opacity-70">
                     {t.disclaimer.footer}
                 </p>
             </div>
          </div>
        </div>
      );
  }

  // INTAKE VIEW
  return (
    <div className="max-w-5xl mx-auto space-y-6">
       <div className="flex items-center justify-between no-print mb-4 animate-in slide-in-from-top-4 duration-500">
        <h1 className="text-3xl font-black text-textPrimary tracking-tight flex items-center gap-3">
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Clinical</span> Intake
        </h1>
        <div className="text-textSecondary text-sm font-mono flex items-center gap-2">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
            {t.common.systemOperational}
        </div>
      </div>

      <DisclaimerBox text={EMERGENCY_TEXT} />

      {/* Patient Profile Card */}
      <div className="glass-panel border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-lg transition-all duration-300 animate-in fade-in duration-700">
          <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-accent rounded-full shadow-glow-accent"></div>
              <h3 className="text-xs font-bold text-textSecondary uppercase tracking-widest">Patient Demographics</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Input label="Patient Name" placeholder="Full Name" {...register('name')} />
             <Input label="Age" type="number" placeholder="Years" {...register('age')} />
             <Select label="Biological Sex" {...register('sex')}>
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
                 <option value="Other">Other</option>
             </Select>
          </div>
      </div>

      {/* Body Map & Symptoms */}
      <div className="glass-panel border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-lg transition-all duration-300 animate-in slide-in-from-bottom-8 duration-700 delay-100">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full shadow-glow"></div>
                <h3 className="text-xs font-bold text-textSecondary uppercase tracking-widest">
                   {selectedPart ? `Assessment: ${selectedPart.toUpperCase()}` : "Step 1: Select Anatomical Region"}
                </h3>
             </div>
             {selectedPart && (
                 <Button variant="secondary" size="sm" onClick={() => { setSelectedPart(null); setSelectedSymptoms([]); setOtherSymptomText(''); }} className="text-xs border border-white/10 uppercase tracking-wide">
                     <RefreshCcw size={14} className="mr-1" /> Change Region
                 </Button>
             )}
          </div>

          {!selectedPart ? (
             <div className="mb-4 p-6 bg-surfaceHighlight/20 rounded-2xl border border-white/5 flex justify-center backdrop-blur-md">
                 <BodyMap selectedPart={selectedPart} onSelect={(p) => setSelectedPart(p)} />
             </div>
          ) : (
             <div className="animate-in slide-in-from-right-8 duration-500">
                 <div className="flex flex-wrap gap-4 mb-6">
                      {SYMPTOMS_BY_PART[selectedPart]?.map(sym => (
                          <button
                            key={sym}
                            onClick={() => toggleSymptom(sym)}
                            className={clsx(
                                "px-6 py-4 rounded-xl transition-all font-bold flex items-center gap-2 duration-300",
                                selectedSymptoms.includes(sym)
                                ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-glow transform scale-105"
                                : "bg-surfaceHighlight/50 border border-white/5 text-textSecondary hover:bg-surfaceHighlight hover:text-white hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg"
                            )}
                          >
                              {sym}
                              {selectedSymptoms.includes(sym) && <Check size={16} />}
                          </button>
                      ))}
                  </div>

                  {/* Free text input */}
                  <div className="mb-8">
                      <label className="text-xs font-bold text-textSecondary uppercase tracking-widest ml-1 mb-2 block">Clinical Notes / Other Symptoms</label>
                      <div className="relative">
                          <input 
                              value={otherSymptomText}
                              onChange={(e) => setOtherSymptomText(e.target.value)}
                              placeholder="Describe other clinical findings..." 
                              className="w-full bg-surfaceHighlight/30 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm text-white placeholder-textSecondary/40 focus:border-primary focus:bg-surfaceHighlight/50 outline-none transition-all shadow-inner"
                          />
                          <PenTool className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary" size={18} />
                      </div>
                  </div>

                  <Button 
                    onClick={onAnalyze} 
                    isLoading={loading}
                    disabled={selectedSymptoms.length === 0 && !otherSymptomText}
                    className="w-full py-6 text-lg font-bold uppercase tracking-widest bg-gradient-to-r from-primary to-accent shadow-glow hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all rounded-2xl"
                  >
                     {t.common.submit} <ChevronRight className="ml-2" />
                  </Button>
             </div>
          )}
      </div>
    </div>
  );
};
