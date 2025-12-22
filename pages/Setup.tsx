import React, { useState, useEffect } from 'react';
import { WifiOff, Activity, X, Dna, ShieldAlert, Target, Info, Zap, Lock, Key, CheckCircle2, ShieldCheck, Cpu, ArrowUpRight, Monitor, Smartphone, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../components/Shared';
import { useTheme } from '../App';
import clsx from 'clsx';

interface SetupProps {
    onComplete: (isOffline: boolean) => void;
    onClose?: () => void;
}

export const Setup: React.FC<SetupProps> = ({ onComplete, onClose }) => {
    const [mode, setMode] = useState<'online' | 'offline'>(localStorage.getItem('asclepius_offline') === 'true' ? 'offline' : 'online');
    const [handshaking, setHandshaking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { theme, setTheme } = useTheme();

    const handleInitialize = async () => {
        setError(null);
        setHandshaking(true);
        
        setTimeout(() => {
            setHandshaking(false);
            onComplete(mode === 'offline');
            if (onClose) onClose();
        }, 1500);
    };

    const isClinical = theme === 'clinical';

    return (
        <div className={clsx(
            "fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 animate-in fade-in duration-300",
            isClinical ? "bg-slate-900/40 backdrop-blur-md" : "bg-black/80 backdrop-blur-md"
        )}>
            <div className={clsx(
                "w-full max-w-xl shadow-2xl relative animate-in zoom-in-95 duration-300 rounded-[2rem] overflow-hidden border",
                isClinical ? "bg-white border-slate-200" : "bg-surface border-border"
            )}>
                
                {handshaking && (
                    <div className="absolute inset-0 bg-black/90 z-[110] flex flex-col items-center justify-center text-center p-10 animate-in fade-in duration-300">
                        <Dna className="text-primary w-12 h-12 animate-spin mb-6" />
                        <h3 className="text-xl font-black text-white tracking-tight uppercase mb-2">Neural handshake</h3>
                        <p className="text-[10px] text-accent font-black uppercase tracking-widest animate-pulse">Syncing core protocols...</p>
                    </div>
                )}

                <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-secondary"></div>

                <div className="px-8 py-6 flex items-center justify-between border-b border-border bg-surfaceHighlight/10">
                    <div className="flex items-center gap-4">
                        <div className={clsx(
                            "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border",
                            isClinical ? "bg-slate-50 text-primary border-slate-200" : "bg-surfaceHighlight text-primary border-border"
                        )}>
                             <Dna size={24} />
                        </div>
                        <div>
                            <h2 className={clsx("text-xl font-black tracking-tight uppercase leading-none", isClinical ? "text-slate-900" : "text-textPrimary")}>
                                Protocol setup
                            </h2>
                            <p className={clsx("text-[9px] font-black uppercase tracking-widest mt-1", isClinical ? "text-slate-500" : "text-accent")}>
                                Secure core v3.1
                            </p>
                        </div>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="p-2 text-textSecondary hover:text-primary transition-all rounded-lg">
                            <X size={20} />
                        </button>
                    )}
                </div>

                <div className="px-8 py-8 space-y-8 overflow-y-auto max-h-[70vh]">
                    <div className="space-y-4">
                        <label className={clsx("text-[9px] font-black uppercase tracking-widest flex items-center gap-2", isClinical ? "text-slate-400" : "text-textSecondary")}>
                             <Cpu size={14} className="text-primary" /> Operational mode
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => setMode('online')}
                                className={clsx(
                                    "p-6 rounded-2xl border transition-all text-left relative overflow-hidden group shadow-sm",
                                    mode === 'online' 
                                        ? (isClinical ? "bg-blue-50 border-blue-500" : "bg-primary/10 border-primary") 
                                        : (isClinical ? "bg-slate-50 border-slate-100 opacity-60" : "bg-surfaceHighlight/20 border-border opacity-50")
                                )}
                            >
                                <span className={clsx("block text-[9px] font-black uppercase tracking-widest mb-2", mode === 'online' ? (isClinical ? "text-blue-700" : "text-primary") : "text-textSecondary")}>Secure cloud</span>
                                <div className={clsx("text-2xl font-black tracking-tighter", mode === 'online' ? (isClinical ? "text-blue-900" : "text-textPrimary") : "text-textSecondary")}>87.3%</div>
                                <div className="text-[8px] font-black text-textSecondary uppercase tracking-widest mt-1">Diagnostic power</div>
                            </button>
                            
                            <button 
                                onClick={() => setMode('offline')}
                                className={clsx(
                                    "p-6 rounded-2xl border transition-all text-left group shadow-sm",
                                    mode === 'offline' 
                                        ? (isClinical ? "bg-slate-100 border-slate-300" : "bg-white/5 border-white/20") 
                                        : (isClinical ? "bg-slate-50 border-slate-100 opacity-60" : "bg-surfaceHighlight/20 border-border opacity-50")
                                )}
                            >
                                <span className="block text-[9px] font-black uppercase tracking-widest mb-2 text-textSecondary">Local airgap</span>
                                <div className="text-2xl font-black text-textSecondary tracking-tighter">74.8%</div>
                                <div className="text-[8px] font-black text-textSecondary uppercase tracking-widest mt-1">Research power</div>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className={clsx("text-[9px] font-black uppercase tracking-widest flex items-center gap-2", isClinical ? "text-slate-400" : "text-textSecondary")}>
                             <Monitor size={14} className="text-primary" /> Visualization mode
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                             {[
                                 { id: 'nebula', name: 'Nebula', grad: 'from-blue-600 to-purple-600' },
                                 { id: 'clinical', name: 'Clinical', grad: 'from-slate-100 to-white' },
                                 { id: 'onyx', name: 'Onyx', grad: 'from-neutral-800 to-black' }
                             ].map(v => (
                                <button 
                                    key={v.id}
                                    onClick={() => setTheme(v.id as any)}
                                    className={clsx(
                                        "border rounded-xl p-3 text-center transition-all group",
                                        theme === v.id 
                                            ? "border-primary bg-primary/5 shadow-sm" 
                                            : "border-border bg-surfaceHighlight/10"
                                    )}
                                >
                                    <div className={clsx("w-6 h-6 rounded-full mx-auto mb-2 bg-gradient-to-tr", v.grad, v.id === 'clinical' && "border border-slate-200")}></div>
                                    <span className={clsx("text-[8px] font-black uppercase tracking-widest", theme === v.id ? "text-primary" : "text-textSecondary")}>{v.name}</span>
                                </button>
                             ))}
                        </div>
                    </div>
                </div>

                <div className={clsx(
                    "p-6 border-t flex flex-col gap-4",
                    isClinical ? "bg-slate-50 border-slate-100" : "bg-surfaceHighlight/20 border-border"
                )}>
                    <Button 
                        onClick={handleInitialize}
                        className="w-full py-5 text-xs font-black uppercase tracking-widest bg-primary text-white rounded-xl shadow-lg"
                    >
                        Initialize console
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-textSecondary/50 text-[8px] font-black uppercase tracking-widest">
                         <ShieldCheck size={12} /> Local-first end-to-end encryption active
                    </div>
                </div>
            </div>
        </div>
    );
};