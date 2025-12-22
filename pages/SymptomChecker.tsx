import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { Button, DisclaimerBox, Input, Select, AsclepiusLogo, PageHeader, ClinicalScanner, Card, IntelligenceLedger } from '../components/Shared';
import { BodyMap } from '../components/BodyMap';
import { generateAnalysis } from '../services/geminiService';
import { cryptoService } from '../services/cryptoService';
import { useLanguage } from '../App';
import { I18N, EMERGENCY_TEXT, SYMPTOMS_BY_PART } from '../constants';
import { Printer, RefreshCcw, ArrowRight, UserPlus, Stethoscope, Brain, User, FileText, Check } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { SymptomPayload } from '../types';
import clsx from 'clsx';

export const SymptomChecker = () => {
  const { language } = useLanguage();
  const t = I18N[language];
  const [view, setView] = useState<'intake' | 'report'>('intake');
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [clinicalNarrative, setClinicalNarrative] = useState('');
  const [result, setResult] = useState<SymptomPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const savedRef = useRef(false);

  const { register, getValues } = useForm({
    defaultValues: { name: '', age: '', sex: 'Male' }
  });

  const onAnalyze = async () => {
    if (!selectedPart || (selectedSymptoms.length === 0 && !clinicalNarrative)) return;
    setLoading(true);
    savedRef.current = false;
    const data = getValues();
    try {
      const fullSymptoms = [...selectedSymptoms];
      const prompt = `Role: Senior Diagnostic Consultant. Perform exhaustive clinical analysis.
      Patient: ${data.age}yo ${data.sex}, Region: ${selectedPart}, Observations: ${fullSymptoms.join(', ')}. 
      Narrative Context: "${clinicalNarrative}".
      STRICT JSON FORMAT REQ: { "conditions": [{"name": "", "description": "", "confidence": 0.0, "specialty": "", "etiology": "", "pathophysiology": ""}], "treatments": [{"name": "", "dosage": "", "mechanism": "", "description": ""}], "lifestyle": [""] }`;
      
      const rawText = await generateAnalysis(prompt, language);
      
      let parsedData: any = {};
      try {
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            parsedData = JSON.parse(jsonMatch[0]);
        } else {
            throw new Error("No JSON found");
        }
      } catch (e) { 
        console.error("JSON parsing failed, falling back to raw text", e);
        parsedData = { rawAnalysis: rawText }; 
      }

      setResult({ 
        demographics: { name: data.name || 'Anonymous', age: data.age || 'N/A', sex: data.sex }, 
        bodyPart: selectedPart, 
        symptoms: fullSymptoms, 
        ...parsedData,
        rawAnalysis: rawText
      });
      setView('report');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) { 
      console.error(e);
      alert("Diagnostic Handshake Interrupted. System Error."); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (result && view === 'report' && !savedRef.current) {
        const autoSave = async () => {
            const recordId = uuidv4();
            const { iv, data } = await cryptoService.encrypt(JSON.stringify(result));
            const recordMeta = { id: recordId, type: 'symptom' as any, title: `${result.demographics.name} - ${result.conditions?.[0]?.name || 'Clinical Case'}`, createdAt: Date.now(), language, iv, data, meta: { age: result.demographics.age, sex: result.demographics.sex, bodyPart: result.bodyPart, condition: result.conditions?.[0]?.name || 'Unknown', confidence: result.conditions?.[0]?.confidence || 0.87 } };
            localStorage.setItem(`asclepius_rec_${recordId}`, JSON.stringify(recordMeta));
            savedRef.current = true;
        };
        autoSave();
    }
  }, [result, view, language]);

  if (view === 'report' && result) {
      return (
        <div className="max-w-4xl mx-auto pb-24 animate-in fade-in duration-500 px-4 md:px-0">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 no-print">
              <Button variant="secondary" onClick={() => { setView('intake'); setSelectedPart(null); setResult(null); }} className="w-full sm:w-auto h-12 px-8 rounded-xl"><UserPlus size={18} className="mr-2" /> New Intake</Button>
              <Button variant="accent" onClick={() => window.print()} className="w-full sm:w-auto h-12 px-8 rounded-xl"><Printer size={18} className="mr-2" /> Print bio-report</Button>
          </div>

          <div className="print-section glass border border-primary/10 rounded-3xl p-6 md:p-12 shadow-xl relative overflow-hidden">
             {/* Dynamic Header */}
             <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-primary/5 pb-8 mb-12 gap-6 relative z-10">
                 <div className="space-y-6 flex-1">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><FileText size={24} /></div>
                        <h1 className="text-2xl md:text-3xl font-black text-textPrimary tracking-tight uppercase leading-none">Clinical bio-ledger</h1>
                     </div>
                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-[8px] font-black uppercase tracking-widest text-textSecondary">
                         <div className="flex flex-col gap-1"><span className="text-primary opacity-40">Patient ID</span> <span className="text-textPrimary text-sm font-black">{result.demographics.name}</span></div>
                         <div className="flex flex-col gap-1"><span className="text-secondary opacity-40">Biometric</span> <span className="text-textPrimary text-sm font-black">{result.demographics.age}Y • {result.demographics.sex}</span></div>
                         <div className="flex flex-col gap-1"><span className="text-accent opacity-40">Anatomical</span> <span className="text-textPrimary text-sm font-black">{result.bodyPart}</span></div>
                         <div className="flex flex-col gap-1"><span className="text-emerald-500 opacity-40">Security</span> <span className="text-textPrimary text-sm font-black">ENCRYPTED</span></div>
                     </div>
                 </div>
                 <AsclepiusLogo className="w-20 h-20 text-primary opacity-30 shrink-0" />
             </div>

             <IntelligenceLedger result={result} type="clinical" />

             <div className="mt-16 pt-8 border-t border-primary/5 text-center relative z-10">
                 <p className="text-[8px] text-textSecondary font-black uppercase tracking-[0.4em] opacity-30 max-w-2xl mx-auto leading-relaxed">
                     INTELLIGENCE SUPPORT ENGINE • CLINICAL CORRELATION MANDATORY • v3.1
                 </p>
             </div>
          </div>
        </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-24 px-4 md:px-0">
      <PageHeader title={<span>Clinical <span className="text-primary">Intelligence</span> Intake</span>} subtitle="Differential Assessment Matrix" />
      <DisclaimerBox text={EMERGENCY_TEXT} />

      {/* Demographics Matrix */}
      <Card title={<div className="flex items-center gap-3 text-primary"><User size={20} /> Biometric Persona</div>}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Input label="Case Identifier" placeholder="Case ID or Name" {...register('name')} />
             <Input label="Chronological Age" type="number" placeholder="Years" {...register('age')} />
             <Select label="Biological Sex" {...register('sex')}>
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
                 <option value="Non-Binary">Other / Non-Binary</option>
             </Select>
          </div>
      </Card>

      {/* Anatomical Selection Matrix */}
      <Card 
        title={
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 text-secondary"><Stethoscope size={20} /> {selectedPart ? `Primary Focus: ${selectedPart.toUpperCase()}` : "Target Anatomical Matrix"}</div>
            {selectedPart && <Button variant="secondary" size="sm" onClick={() => { setSelectedPart(null); setSelectedSymptoms([]); }} className="h-10 px-6 rounded-lg"><RefreshCcw size={14} className="mr-2" /> Re-map</Button>}
          </div>
        }
      >
          {!selectedPart ? (
             <div className="p-6 bg-surface/30 rounded-2xl border border-border/20 flex justify-center shadow-inner"><BodyMap selectedPart={selectedPart} onSelect={(p) => setSelectedPart(p)} /></div>
          ) : (
             <div className="animate-in slide-in-from-right-4 duration-500">
                 <div className="flex flex-wrap gap-2.5 mb-8">
                      {SYMPTOMS_BY_PART[selectedPart]?.map(sym => (
                          <button key={sym} type="button" onClick={() => setSelectedSymptoms(p => p.includes(sym) ? p.filter(s => s !== sym) : [...p, sym])} className={clsx("px-5 py-2.5 rounded-xl transition-all font-black uppercase text-[8px] tracking-widest flex items-center gap-3 border", selectedSymptoms.includes(sym) ? "bg-primary border-primary text-white shadow-md scale-105" : "bg-surfaceHighlight/50 border-border text-textSecondary hover:border-primary/40")}>
                              {sym} {selectedSymptoms.includes(sym) && <Check size={12} />}
                          </button>
                      ))}
                  </div>
                  <div className="mb-8 space-y-4">
                      <label className="text-[9px] font-black text-textSecondary uppercase tracking-widest ml-1 opacity-70 flex items-center gap-2"><FileText size={14} className="text-primary" /> Clinical Narrative</label>
                      <textarea 
                         className="w-full bg-surface/50 border border-border rounded-xl px-6 py-4 text-base text-textPrimary placeholder-textSecondary/20 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-semibold min-h-[160px] resize-none shadow-inner leading-relaxed"
                         value={clinicalNarrative}
                         onChange={(e) => setClinicalNarrative(e.target.value)}
                         placeholder="Document detailed symptom trajectory and history..."
                      />
                  </div>
                  <Button onClick={onAnalyze} isLoading={loading} disabled={selectedSymptoms.length === 0 && !clinicalNarrative} className="w-full py-6 text-base font-black rounded-2xl">
                     Execute Intelligence Scan <ArrowRight className="ml-4" size={24} />
                  </Button>
             </div>
          )}
      </Card>
    </div>
  );
};