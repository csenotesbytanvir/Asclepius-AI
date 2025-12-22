
import React, { useState } from 'react';
import { Card, Button, Input } from '../components/Shared';
import { Calculator, Info } from 'lucide-react';
import { useLanguage } from '../App';
import { I18N } from '../constants';
import clsx from 'clsx';

type CalcType = 'bmi' | 'egfr' | 'wells' | 'cha2ds2';

export const Calculators = () => {
  const { language } = useLanguage();
  const t = I18N[language];
  const [activeTab, setActiveTab] = useState<CalcType>('bmi');

  // BMI State
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  // eGFR State
  const [creat, setCreat] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [gfrResult, setGfrResult] = useState<number | null>(null);

  // Wells (DVT) State - Simplified
  const [wellsScore, setWellsScore] = useState(0);
  const wellsCriteria = [
      "Active Cancer", "Paralysis or immobilization", "Bedridden >3 days", "Localized tenderness", "Entire leg swollen", "Calf swelling >3cm", "Pitting edema", "Collateral veins", "Previous DVT"
  ];
  const [wellsChecked, setWellsChecked] = useState<Record<number, boolean>>({});

  const calculateBMI = () => {
      const w = parseFloat(weight);
      const h = parseFloat(height) / 100; // cm to m
      if (w > 0 && h > 0) {
          setBmiResult(parseFloat((w / (h * h)).toFixed(1)));
      }
  };

  const calculateGFR = () => {
      const cr = parseFloat(creat);
      const a = parseFloat(age);
      if (cr > 0 && a > 0) {
          // MDRD Formula (Simplified)
          let gfr = 175 * Math.pow(cr, -1.154) * Math.pow(a, -0.203);
          if (gender === 'female') gfr *= 0.742;
          setGfrResult(parseFloat(gfr.toFixed(1)));
      }
  };

  const toggleWells = (idx: number) => {
      const next = { ...wellsChecked, [idx]: !wellsChecked[idx] };
      setWellsChecked(next);
      setWellsScore(Object.values(next).filter(Boolean).length);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <div className="flex items-center gap-3 mb-6 no-print">
           <Calculator className="text-accent h-8 w-8" />
           <div>
               <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">{t.calculators.title}</h1>
               <p className="text-textSecondary text-sm">{t.calculators.subtitle}</p>
           </div>
       </div>

       <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border mb-6 no-print">
           {[
               { id: 'bmi', label: 'BMI' },
               { id: 'egfr', label: 'eGFR (MDRD)' },
               { id: 'wells', label: 'Wells Criteria (DVT)' },
           ].map(c => (
               <button
                  key={c.id}
                  onClick={() => setActiveTab(c.id as CalcType)}
                  className={clsx(
                      "px-6 py-3 rounded-t-xl font-bold text-xs uppercase tracking-wide transition-all border-b-2 whitespace-nowrap",
                      activeTab === c.id ? "border-accent text-accent bg-surfaceHighlight/50" : "border-transparent text-textSecondary hover:text-textPrimary"
                  )}
               >
                   {c.label}
               </button>
           ))}
       </div>

       <Card className="min-h-[400px]">
           {activeTab === 'bmi' && (
               <div className="max-w-md mx-auto space-y-6 animate-in fade-in">
                   <h3 className="text-xl font-bold text-textPrimary">Body Mass Index</h3>
                   <div className="grid grid-cols-2 gap-4">
                       <Input label="Weight (kg)" type="number" step="any" value={weight} onChange={e => setWeight(e.target.value)} />
                       <Input label="Height (cm)" type="number" step="any" value={height} onChange={e => setHeight(e.target.value)} />
                   </div>
                   <Button onClick={calculateBMI} className="w-full">Calculate</Button>
                   
                   {bmiResult && (
                       <div className="mt-8 text-center p-6 bg-surfaceHighlight/30 rounded-2xl border border-border">
                           <div className="text-4xl font-black text-textPrimary mb-2">{bmiResult}</div>
                           <div className={clsx("text-sm font-bold uppercase tracking-widest", 
                               bmiResult < 18.5 ? "text-blue-400" : 
                               bmiResult < 25 ? "text-success" : 
                               bmiResult < 30 ? "text-warning" : "text-danger"
                           )}>
                               {bmiResult < 18.5 ? "Underweight" : bmiResult < 25 ? "Normal Weight" : bmiResult < 30 ? "Overweight" : "Obese"}
                           </div>
                       </div>
                   )}
               </div>
           )}

           {activeTab === 'egfr' && (
               <div className="max-w-md mx-auto space-y-6 animate-in fade-in">
                   <h3 className="text-xl font-bold text-textPrimary">eGFR (MDRD Study Equation)</h3>
                   <div className="space-y-4">
                       <Input label="Serum Creatinine (mg/dL)" type="number" step="any" value={creat} onChange={e => setCreat(e.target.value)} />
                       <Input label="Age (Years)" type="number" step="any" value={age} onChange={e => setAge(e.target.value)} />
                       <div>
                           <label className="text-xs font-bold text-textSecondary uppercase tracking-widest ml-1 mb-2 block">Gender</label>
                           <div className="flex gap-2">
                               <button onClick={() => setGender('male')} className={clsx("flex-1 py-3 rounded-xl font-bold text-sm border", gender === 'male' ? "border-primary bg-primary/10 text-primary" : "border-border text-textSecondary hover:border-primary/50")}>Male</button>
                               <button onClick={() => setGender('female')} className={clsx("flex-1 py-3 rounded-xl font-bold text-sm border", gender === 'female' ? "border-primary bg-primary/10 text-primary" : "border-border text-textSecondary hover:border-primary/50")}>Female</button>
                           </div>
                       </div>
                   </div>
                   <Button onClick={calculateGFR} className="w-full">Calculate GFR</Button>
                   
                   {gfrResult && (
                       <div className="mt-8 text-center p-6 bg-surfaceHighlight/30 rounded-2xl border border-border">
                           <div className="text-4xl font-black text-textPrimary mb-2">{gfrResult}</div>
                           <div className="text-sm font-bold uppercase tracking-widest text-textSecondary">mL/min/1.73m²</div>
                           <p className="text-xs text-textSecondary mt-4">Note: MDRD equation is less accurate for GFR {'>'} 60 mL/min.</p>
                       </div>
                   )}
               </div>
           )}

           {activeTab === 'wells' && (
               <div className="space-y-6 animate-in fade-in">
                   <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-textPrimary">Wells Criteria for DVT</h3>
                        <div className="bg-surfaceHighlight px-4 py-2 rounded-xl border border-border">
                            <span className="text-xs text-textSecondary uppercase font-bold mr-2">Score</span>
                            <span className="text-xl font-black text-accent">{wellsScore}</span>
                        </div>
                   </div>
                   
                   <div className="grid md:grid-cols-2 gap-3">
                       {wellsCriteria.map((c, i) => (
                           <button
                               key={i}
                               onClick={() => toggleWells(i)}
                               className={clsx(
                                   "p-4 rounded-xl text-left text-sm font-medium transition-all border flex items-center justify-between",
                                   wellsChecked[i] ? "bg-accent/10 border-accent text-accent" : "bg-surfaceHighlight/30 border-border text-textSecondary hover:bg-surfaceHighlight/50"
                               )}
                           >
                               {c}
                               {wellsChecked[i] && <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_5px_currentColor]"></div>}
                           </button>
                       ))}
                   </div>

                   <div className="mt-6 p-4 rounded-xl bg-surfaceHighlight/50 border border-border">
                       <h4 className="font-bold text-textPrimary mb-2 flex items-center gap-2"><Info size={16} /> Interpretation</h4>
                       <div className="grid grid-cols-3 gap-4 text-center">
                           <div className={clsx("p-2 rounded-lg", wellsScore <= 0 ? "bg-success/20 text-success" : "opacity-30")}>
                               <div className="font-black text-lg">Low</div>
                               <div className="text-[10px] uppercase font-bold">Score ≤ 0</div>
                           </div>
                           <div className={clsx("p-2 rounded-lg", (wellsScore === 1 || wellsScore === 2) ? "bg-warning/20 text-warning" : "opacity-30")}>
                               <div className="font-black text-lg">Mod</div>
                               <div className="text-[10px] uppercase font-bold">Score 1-2</div>
                           </div>
                           <div className={clsx("p-2 rounded-lg", wellsScore >= 3 ? "bg-danger/20 text-danger" : "opacity-30")}>
                               <div className="font-black text-lg">High</div>
                               <div className="text-[10px] uppercase font-bold">Score ≥ 3</div>
                           </div>
                       </div>
                   </div>
               </div>
           )}
       </Card>
    </div>
  );
};
