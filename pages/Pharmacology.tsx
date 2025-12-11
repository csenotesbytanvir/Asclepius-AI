
import React, { useState } from 'react';
import { Card, Button, Input, DisclaimerBox, PageHeader } from '../components/Shared';
import { Pill, AlertTriangle, BookOpen, Search, ArrowRightLeft, Activity, Info, AlertOctagon, ThumbsUp } from 'lucide-react';
import { generateAnalysis } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../App';
import { I18N } from '../constants';
import clsx from 'clsx';

interface DrugMonograph {
    class?: string;
    mechanism?: string;
    uses?: string[];
    sideEffects?: string[];
    warnings?: string;
    pearls?: string;
    raw?: string;
}

interface InteractionData {
    severity: "High" | "Moderate" | "Low" | "None";
    description: string;
    mechanism?: string;
    management?: string;
    raw?: string;
}

export const Pharmacology = () => {
    const { language } = useLanguage();
    const t = I18N[language];
    const [activeTab, setActiveTab] = useState<'lookup' | 'interaction'>('lookup');
    const [drugQuery, setDrugQuery] = useState('');
    const [drugA, setDrugA] = useState('');
    const [drugB, setDrugB] = useState('');
    const [monograph, setMonograph] = useState<DrugMonograph | null>(null);
    const [interactionResult, setInteractionResult] = useState<InteractionData | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLookup = async () => {
        if (!drugQuery) return;
        setLoading(true);
        setMonograph(null);
        try {
            const prompt = `Role: Clinical Pharmacist.
            Task: Provide a structured monograph for "${drugQuery}".
            Return valid JSON with keys: "class", "mechanism", "uses" (array), "sideEffects" (array), "warnings", "pearls".
            Disclaimer: Do NOT include intro text.`;
            
            const res = await generateAnalysis(prompt, language);
            
            let parsed: DrugMonograph = { raw: res };
            try {
                const jsonMatch = res.match(/```json\n([\s\S]*?)\n```/) || res.match(/```\n([\s\S]*?)\n```/) || [null, res];
                const strToParse = jsonMatch[1] || res;
                const startIndex = strToParse.indexOf('{');
                const endIndex = strToParse.lastIndexOf('}');
                if (startIndex !== -1 && endIndex !== -1) {
                    parsed = JSON.parse(strToParse.substring(startIndex, endIndex + 1));
                }
            } catch (e) {
                console.error("JSON Parse failed", e);
            }
            setMonograph(parsed);

        } catch(e) { 
            setMonograph({ raw: "Analysis failed." }); 
        }
        setLoading(false);
    };

    const handleInteraction = async () => {
        if (!drugA || !drugB) return;
        setLoading(true);
        setInteractionResult(null);
        try {
            const prompt = `Role: Clinical Pharmacist.
            Task: Check drug-drug interaction between "${drugA}" and "${drugB}".
            Return valid JSON with keys: "severity" (High/Moderate/Low/None), "description" (Clinical Effect), "mechanism", "management".
            Disclaimer: Do NOT include intro text.`;
            
            const res = await generateAnalysis(prompt, language);
            
            let parsed: InteractionData = { severity: "None", description: res, raw: res };
            try {
                 const jsonMatch = res.match(/```json\n([\s\S]*?)\n```/) || res.match(/```\n([\s\S]*?)\n```/) || [null, res];
                 const strToParse = jsonMatch[1] || res;
                 const startIndex = strToParse.indexOf('{');
                 const endIndex = strToParse.lastIndexOf('}');
                 if (startIndex !== -1 && endIndex !== -1) {
                     parsed = JSON.parse(strToParse.substring(startIndex, endIndex + 1));
                 }
            } catch(e) {
                console.error("Interaction JSON Parse failed", e);
            }

            setInteractionResult(parsed);
        } catch(e) { setInteractionResult({ severity: "None", description: "Analysis failed.", raw: "Error" }); }
        setLoading(false);
    };

    const guideContent = `
**Pharmacology Module Guide**

1.  **Drug Lookup**:
    *   Enter the Generic or Brand name.
    *   Provides Class, Mechanism of Action (MOA), Indications, Side Effects, and Black Box Warnings.
2.  **Interaction Checker**:
    *   Input two medications to screen for potential adverse interactions.
    *   Analysis includes Severity Grading (High/Mod/Low), Clinical Effect, and Management Strategy.

*Clinical Pearl: Always reconcile the full medication list before prescribing.*
    `;

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <PageHeader 
                title={<span>{t.pharmacology.title} <Pill className="text-emerald-400 inline ml-2" /></span>}
                subtitle={t.pharmacology.subtitle}
                guide={guideContent}
            />

            <DisclaimerBox text="Clinical Aid Only. Verify all interactions with official databases (e.g., Lexicomp, Micromedex)." />

            <div className="flex bg-surfaceHighlight p-1 rounded-2xl border border-border w-full max-w-md">
                <button
                    onClick={() => { setActiveTab('lookup'); setMonograph(null); setInteractionResult(null); }}
                    className={clsx(
                        "flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all",
                        activeTab === 'lookup' ? "bg-emerald-600 text-white shadow-lg" : "text-textSecondary hover:text-textPrimary"
                    )}
                >
                    {t.pharmacology.lookup}
                </button>
                <button
                    onClick={() => { setActiveTab('interaction'); setMonograph(null); setInteractionResult(null); }}
                    className={clsx(
                        "flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all",
                        activeTab === 'interaction' ? "bg-cyan-600 text-white shadow-lg" : "text-textSecondary hover:text-textPrimary"
                    )}
                >
                    {t.pharmacology.interaction}
                </button>
            </div>

            <Card className="min-h-[400px]">
                {activeTab === 'lookup' ? (
                    <div className="space-y-8">
                        <div className="flex gap-4 items-end">
                            <div className="flex-1">
                                <Input 
                                    label={t.pharmacology.drugName} 
                                    placeholder="e.g., Atorvastatin, Lisinopril..." 
                                    value={drugQuery}
                                    onChange={(e) => setDrugQuery(e.target.value)}
                                    enableVoice
                                    onVoiceInput={(txt) => setDrugQuery(txt)}
                                />
                            </div>
                            <Button className="h-[54px] mb-[1px]" onClick={handleLookup} isLoading={loading} disabled={!drugQuery}>
                                <Search size={18} />
                            </Button>
                        </div>

                        {monograph && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                                {monograph.class ? (
                                    <>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-emerald-600/20 to-emerald-900/20 border border-emerald-500/30 rounded-2xl p-8">
                                                <h2 className="text-3xl font-black text-emerald-500 mb-2 capitalize">{drugQuery}</h2>
                                                <p className="text-base font-bold text-textPrimary uppercase tracking-wide opacity-90">{monograph.class}</p>
                                            </div>

                                            <div className="lg:col-span-2 bg-surfaceHighlight/50 border border-border rounded-2xl p-6 flex flex-col">
                                                <div className="flex items-center gap-2 mb-4 text-cyan-400">
                                                    <Activity size={20} />
                                                    <h3 className="font-bold uppercase tracking-widest text-xs">{t.pharmacology.mechanism}</h3>
                                                </div>
                                                <p className="text-sm text-textPrimary leading-relaxed flex-1">{monograph.mechanism}</p>
                                            </div>

                                            <div className="bg-surfaceHighlight/50 border border-border rounded-2xl p-6">
                                                <div className="flex items-center gap-2 mb-4 text-blue-400">
                                                    <CheckCircleIcon />
                                                    <h3 className="font-bold uppercase tracking-widest text-xs">{t.pharmacology.indications}</h3>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {monograph.uses?.map((use, i) => (
                                                        <span key={i} className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold">
                                                            {use}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="bg-surfaceHighlight/50 border border-border rounded-2xl p-6">
                                                <div className="flex items-center gap-2 mb-4 text-pink-400">
                                                    <Activity size={20} />
                                                    <h3 className="font-bold uppercase tracking-widest text-xs">{t.pharmacology.sideEffects}</h3>
                                                </div>
                                                <ul className="grid grid-cols-1 gap-2">
                                                    {monograph.sideEffects?.map((se, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-textSecondary">
                                                             <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0"></span>
                                                             {se}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="md:col-span-2 lg:col-span-2 bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
                                                <div className="flex items-center gap-2 mb-3 text-orange-400">
                                                    <AlertTriangle size={20} />
                                                    <h3 className="font-bold uppercase tracking-widest text-xs">{t.pharmacology.warnings}</h3>
                                                </div>
                                                <p className="text-sm text-textPrimary font-medium leading-relaxed">{monograph.warnings}</p>
                                            </div>
                                        </div>

                                        <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-6">
                                            <div className="flex items-center gap-2 mb-3 text-purple-400">
                                                <Info size={20} />
                                                <h3 className="font-bold uppercase tracking-widest text-xs">{t.pharmacology.pearls}</h3>
                                            </div>
                                            <p className="text-sm text-textSecondary italic leading-relaxed">{monograph.pearls}</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="prose prose-invert max-w-none p-6 bg-surfaceHighlight/20 rounded-xl">
                                        <ReactMarkdown>{monograph.raw || ''}</ReactMarkdown>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="flex flex-col md:flex-row gap-6 items-end relative z-0">
                            <div className="flex-1 w-full">
                                <Input 
                                    label={t.pharmacology.drugA} 
                                    placeholder="e.g., Warfarin" 
                                    value={drugA}
                                    onChange={(e) => setDrugA(e.target.value)}
                                />
                            </div>
                            <div className="hidden md:flex items-center justify-center pb-4 px-2 text-textSecondary">
                                <ArrowRightLeft size={24} />
                            </div>
                            <div className="flex-1 w-full">
                                <Input 
                                    label={t.pharmacology.drugB} 
                                    placeholder="e.g., Aspirin" 
                                    value={drugB}
                                    onChange={(e) => setDrugB(e.target.value)}
                                />
                            </div>
                            <Button className="h-[54px] mb-[1px]" onClick={handleInteraction} isLoading={loading} disabled={!drugA || !drugB} variant="accent">
                                {t.pharmacology.check}
                            </Button>
                        </div>

                        {interactionResult && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4">
                                <div className={clsx("p-6 rounded-2xl border flex items-center gap-4", 
                                    interactionResult.severity === 'High' ? "bg-red-500/10 border-red-500/30 text-red-500" :
                                    interactionResult.severity === 'Moderate' ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-500" :
                                    "bg-green-500/10 border-green-500/30 text-green-500"
                                )}>
                                    {interactionResult.severity === 'High' ? <AlertOctagon size={32} /> : 
                                     interactionResult.severity === 'Moderate' ? <AlertTriangle size={32} /> : <ThumbsUp size={32} />}
                                    
                                    <div>
                                        <h3 className="text-2xl font-black uppercase tracking-tight">{interactionResult.severity} Interaction</h3>
                                        <p className="text-sm opacity-80 font-bold">Risk Level Assessment</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-surfaceHighlight/30 p-6 rounded-2xl border border-border">
                                        <h4 className="text-xs font-bold text-textSecondary uppercase tracking-widest mb-3">Clinical Effect</h4>
                                        <p className="text-textPrimary leading-relaxed text-sm">{interactionResult.description}</p>
                                    </div>
                                    <div className="bg-surfaceHighlight/30 p-6 rounded-2xl border border-border">
                                        <h4 className="text-xs font-bold text-textSecondary uppercase tracking-widest mb-3">Management</h4>
                                        <p className="text-textPrimary leading-relaxed text-sm">{interactionResult.management || "Monitor patient status."}</p>
                                    </div>
                                </div>
                                {interactionResult.mechanism && (
                                    <div className="p-4 rounded-xl bg-surfaceHighlight/10 border border-border text-xs text-textSecondary italic">
                                        <span className="font-bold not-italic mr-2">Mechanism:</span> {interactionResult.mechanism}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
                
                {!monograph && !interactionResult && !loading && (
                    <div className="mt-12 text-center opacity-30 flex flex-col items-center">
                        <BookOpen size={64} className="mb-4 text-textSecondary" />
                        <p className="uppercase font-bold tracking-widest text-sm text-textSecondary">System Ready for Analysis</p>
                    </div>
                )}
            </Card>
        </div>
    );
};

const CheckCircleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
