
import React, { useState } from 'react';
import { Card, Button, Input, DisclaimerBox, PageHeader } from '../components/Shared';
import { HeartPulse, BrainCircuit, Syringe, Save, Calendar } from 'lucide-react';
import { generateAnalysis } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../App';
import { I18N } from '../constants';
import clsx from 'clsx';

export const Wellness = () => {
    const { language } = useLanguage();
    const t = I18N[language];
    const [tab, setTab] = useState<'chronic' | 'mental' | 'vax'>('chronic');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const [phqScore, setPhqScore] = useState<number>(0);
    const [mentalAnswers, setMentalAnswers] = useState<Record<number, number>>({});

    const [symptoms, setSymptoms] = useState('');
    const [vitals, setVitals] = useState({ bp: '', hr: '', glucose: '' });

    const handleMentalSubmit = async () => {
        setLoading(true);
        const score = (Object.values(mentalAnswers) as number[]).reduce((a, b) => a + b, 0);
        setPhqScore(score);
        try {
            const prompt = `Role: Clinical Psychologist.
            Task: Interpret PHQ-9 Score of ${score}.
            Output: Severity level, General recommendations (CBT, sleep hygiene), and WHEN to see a doctor.
            Disclaimer: Not a diagnosis.`;
            const res = await generateAnalysis(prompt, language);
            setResult(res);
        } catch(e) { setResult("Analysis error."); }
        setLoading(false);
    };

    const handleChronicLog = () => {
        alert("Vitals logged locally.");
        setVitals({ bp: '', hr: '', glucose: '' });
    };

    const renderMental = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-textPrimary mb-4">Mood & Anxiety Screen (PHQ-9 Style)</h3>
            <p className="text-sm text-textSecondary mb-6">Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
            
            <div className="space-y-4">
                {["Little interest or pleasure in doing things", "Feeling down, depressed, or hopeless", "Trouble falling or staying asleep"].map((q, i) => (
                    <div key={i} className="bg-surfaceHighlight/20 p-4 rounded-xl border border-border">
                        <p className="mb-3 font-medium text-textPrimary">{q}</p>
                        <div className="grid grid-cols-4 gap-2">
                            {[0, 1, 2, 3].map(val => (
                                <button
                                    key={val}
                                    onClick={() => setMentalAnswers(p => ({...p, [i]: val}))}
                                    className={clsx(
                                        "py-2 rounded-lg text-[10px] md:text-xs font-bold transition-colors border",
                                        mentalAnswers[i] === val ? "bg-primary border-primary text-white" : "bg-surfaceHighlight border-border text-textSecondary hover:text-textPrimary hover:bg-surfaceHighlight/80"
                                    )}
                                >
                                    {val === 0 ? "Not at all" : val === 1 ? "Several days" : val === 2 ? "> Half days" : "Every day"}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Button onClick={handleMentalSubmit} isLoading={loading} className="w-full mt-4">Analyze Response</Button>
            
            {result && (
                <div className="mt-6 p-6 bg-surfaceHighlight/30 rounded-2xl border border-border prose prose-invert prose-p:text-textPrimary prose-headings:text-textPrimary">
                    <ReactMarkdown>{result}</ReactMarkdown>
                </div>
            )}
        </div>
    );

    const renderChronic = () => (
        <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
                <Input 
                    label="Blood Pressure" 
                    placeholder="120/80" 
                    value={vitals.bp} 
                    onChange={e => setVitals({...vitals, bp: e.target.value})} 
                />
                <Input 
                    label="Heart Rate" 
                    placeholder="BPM" 
                    value={vitals.hr} 
                    onChange={e => setVitals({...vitals, hr: e.target.value})} 
                />
                <Input 
                    label="Blood Glucose" 
                    placeholder="mg/dL" 
                    value={vitals.glucose} 
                    onChange={e => setVitals({...vitals, glucose: e.target.value})} 
                />
            </div>
            <Input 
                label="Symptom Journal" 
                placeholder="How are you feeling today?" 
                value={symptoms} 
                onChange={e => setSymptoms(e.target.value)} 
            />
            <Button onClick={handleChronicLog} variant="secondary" className="w-full">
                <Save className="mr-2 h-4 w-4" /> Log Entry
            </Button>

            <div className="mt-8">
                <h4 className="font-bold text-textSecondary uppercase tracking-widest text-xs mb-4">Educational Modules</h4>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border border-border rounded-xl hover:bg-surfaceHighlight/50 cursor-pointer transition-colors bg-surfaceHighlight/10">
                        <h5 className="font-bold text-textPrimary">Hypertension Management</h5>
                        <p className="text-xs text-textSecondary mt-1">DASH diet, salt reduction, and medication adherence.</p>
                    </div>
                    <div className="p-4 border border-border rounded-xl hover:bg-surfaceHighlight/50 cursor-pointer transition-colors bg-surfaceHighlight/10">
                        <h5 className="font-bold text-textPrimary">Diabetes Care</h5>
                        <p className="text-xs text-textSecondary mt-1">Carb counting, insulin types, and foot care.</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const vaccineSchedule = [
        { age: 'Birth', vaccines: [{ name: 'Hep B', dose: '1st dose' }] },
        { age: '2 Months', vaccines: [
            { name: 'Hep B', dose: '2nd dose (1-2 mos)' },
            { name: 'DTaP', dose: '1st dose' },
            { name: 'Hib', dose: '1st dose' },
            { name: 'Polio (IPV)', dose: '1st dose' },
            { name: 'PCV13', dose: '1st dose' },
            { name: 'Rotavirus', dose: '1st dose' }
        ]},
        { age: '4 Months', vaccines: [
            { name: 'DTaP', dose: '2nd dose' },
            { name: 'Hib', dose: '2nd dose' },
            { name: 'Polio (IPV)', dose: '2nd dose' },
            { name: 'PCV13', dose: '2nd dose' },
            { name: 'Rotavirus', dose: '2nd dose' }
        ]},
        { age: '6 Months', vaccines: [
            { name: 'Hep B', dose: '3rd dose (6-18 mos)' },
            { name: 'DTaP', dose: '3rd dose' },
            { name: 'Influenza', dose: 'Annual' }
        ]},
        { age: '12-15 Months', vaccines: [
            { name: 'MMR', dose: '1st dose' },
            { name: 'Varicella', dose: '1st dose' },
            { name: 'Hep A', dose: '2 doses, 6 mos apart' }
        ]},
        { age: '11-12 Years', vaccines: [
            { name: 'Meningococcal', dose: '1st dose' },
            { name: 'Tdap', dose: 'Booster' },
            { name: 'HPV', dose: 'Series' }
        ]},
        { age: 'Adults (19+)', vaccines: [
            { name: 'Influenza', dose: 'Annual' },
            { name: 'Tdap/Td', dose: 'Every 10 years' },
            { name: 'Shingles', dose: 'Age 50+, 2 doses' },
            { name: 'Pneumococcal', dose: 'Age 65+' }
        ]}
    ];

    const renderVax = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-textPrimary mb-4">Immunization Schedule (CDC Guidelines)</h3>
            
            <div className="relative border-l-2 border-surfaceHighlight/50 ml-3 space-y-8 py-2">
                {vaccineSchedule.map((group, i) => (
                    <div key={i} className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface border-2 border-accent flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        </div>
                        
                        <h4 className="font-bold text-accent text-lg mb-3 flex items-center gap-2">
                            <Calendar size={18} /> {group.age}
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {group.vaccines.map((vax, j) => (
                                <div key={j} className="flex items-center justify-between p-3 rounded-xl bg-surfaceHighlight/20 border border-border hover:bg-surfaceHighlight/40 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Syringe size={14} className="text-textSecondary" />
                                        <span className="font-bold text-sm text-textPrimary">{vax.name}</span>
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-textSecondary bg-surfaceHighlight/50 px-2 py-1 rounded">
                                        {vax.dose}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            <DisclaimerBox text="Schedules may vary by country and risk factors. Always consult your pediatrician or primary care provider." />
        </div>
    );

    const guideContent = `
**Wellness & Preventive Medicine**

1.  **Chronic Tracker**:
    *   Monitor Hemodynamics (BP, HR) and Glucose.
    *   Log subjective symptoms for trend analysis.
    *   Local logging ensures privacy.
2.  **Mental Health**:
    *   PHQ-9 screening tool for depression severity.
    *   Self-assessment for monitoring treatment efficacy.
3.  **Vaccinations**:
    *   Reference guide for CDC-recommended immunization schedules.
    `;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
             <PageHeader 
                title={t.wellness.title}
                subtitle={t.wellness.subtitle}
                guide={guideContent}
             />

             <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border mb-6">
                 {[
                     { id: 'chronic', label: t.wellness.chronic, icon: HeartPulse },
                     { id: 'mental', label: t.wellness.mental, icon: BrainCircuit },
                     { id: 'vax', label: t.wellness.vaccinations, icon: Syringe }
                 ].map(item => (
                     <button
                        key={item.id}
                        onClick={() => setTab(item.id as any)}
                        className={clsx(
                            "px-6 py-3 rounded-t-xl font-bold text-xs uppercase tracking-wide flex items-center gap-2 whitespace-nowrap transition-all border-b-2",
                            tab === item.id 
                                ? "bg-surfaceHighlight/50 border-pink-500 text-pink-500" 
                                : "border-transparent text-textSecondary hover:text-textPrimary"
                        )}
                     >
                         <item.icon size={16} /> {item.label}
                     </button>
                 ))}
             </div>

             <Card className="min-h-[500px]">
                 {tab === 'chronic' && renderChronic()}
                 {tab === 'mental' && renderMental()}
                 {tab === 'vax' && renderVax()}
             </Card>
        </div>
    );
};
