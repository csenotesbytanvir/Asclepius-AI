import React, { useState } from 'react';
import { Key, WifiOff, Activity, X, Dna } from 'lucide-react';
import { Button, Input } from '../components/Shared';
import { useTheme } from '../App';
import clsx from 'clsx';

interface SetupProps {
    onComplete: (apiKey: string | null, isOffline: boolean) => void;
    onClose?: () => void;
}

export const Setup: React.FC<SetupProps> = ({ onComplete, onClose }) => {
    const [apiKey, setApiKey] = useState(localStorage.getItem('asclepius_api_key') || '');
    const [mode, setMode] = useState<'online' | 'offline'>('online');
    const { theme, setTheme } = useTheme();

    const handleInitialize = () => {
        if (mode === 'online') {
             if (!apiKey.trim()) return;
             localStorage.setItem('asclepius_api_key', apiKey);
             onComplete(apiKey, false);
        } else {
             onComplete(null, true);
        }
        if (onClose) onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-surface border border-white/10 rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-500">
                {onClose && (
                    <button onClick={onClose} className="absolute top-6 right-6 text-textSecondary hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                )}
                
                {/* Colorful Header Bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-accent via-primary to-secondary"></div>
                
                <div className="p-8 pb-0">
                    <div className="flex items-center gap-5 mb-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-surfaceHighlight to-surface border border-white/5 rounded-2xl flex items-center justify-center shadow-glow-accent group">
                             <Dna className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight">Asclepius Core</h2>
                            <p className="text-xs text-accent font-bold uppercase tracking-[0.2em] mt-1">System Configuration</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    {/* Visual Interface */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-textSecondary uppercase tracking-widest block">Visual Interface</label>
                        <div className="grid grid-cols-3 gap-3">
                             <div 
                                onClick={() => setTheme('nebula')}
                                className={clsx(
                                    "border rounded-xl p-3 text-center cursor-pointer transition-all hover:-translate-y-1 duration-200",
                                    theme === 'nebula' ? "border-primary bg-primary/10 shadow-glow" : "border-white/5 bg-surfaceHighlight hover:border-white/20"
                                )}
                             >
                                 <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 mx-auto mb-2 shadow-lg"></div>
                                 <span className={clsx("text-[10px] font-bold uppercase", theme === 'nebula' ? "text-primary" : "text-textSecondary")}>Nebula</span>
                             </div>
                             <div 
                                onClick={() => setTheme('clinical')}
                                className={clsx(
                                    "border rounded-xl p-3 text-center cursor-pointer transition-all hover:-translate-y-1 duration-200",
                                    theme === 'clinical' ? "border-primary bg-primary/10 shadow-glow" : "border-white/5 bg-surfaceHighlight hover:border-white/20"
                                )}
                             >
                                 <div className="w-4 h-4 rounded-full bg-white mx-auto mb-2 border border-slate-300 shadow-lg"></div>
                                 <span className={clsx("text-[10px] font-bold uppercase", theme === 'clinical' ? "text-primary" : "text-textSecondary")}>Clinical</span>
                             </div>
                             <div 
                                onClick={() => setTheme('onyx')}
                                className={clsx(
                                    "border rounded-xl p-3 text-center cursor-pointer transition-all hover:-translate-y-1 duration-200",
                                    theme === 'onyx' ? "border-primary bg-primary/10 shadow-glow" : "border-white/5 bg-surfaceHighlight hover:border-white/20"
                                )}
                             >
                                 <div className="w-4 h-4 rounded-full bg-black border border-white/20 mx-auto mb-2 shadow-lg"></div>
                                 <span className={clsx("text-[10px] font-bold uppercase", theme === 'onyx' ? "text-primary" : "text-textSecondary")}>Onyx</span>
                             </div>
                        </div>
                    </div>

                    {/* Intelligence Mode */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-textSecondary uppercase tracking-widest block">Intelligence Mode</label>
                        <div className="flex bg-surfaceHighlight/50 p-1.5 rounded-2xl border border-white/5">
                            <button 
                                onClick={() => setMode('online')}
                                className={clsx(
                                    "flex-1 py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wide",
                                    mode === 'online' ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg" : "text-textSecondary hover:text-white"
                                )}
                            >
                                <Activity size={16} /> Live AI
                            </button>
                            <button 
                                onClick={() => setMode('offline')}
                                className={clsx(
                                    "flex-1 py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wide",
                                    mode === 'offline' ? "bg-surface text-white border border-white/10 shadow-lg" : "text-textSecondary hover:text-white"
                                )}
                            >
                                <WifiOff size={16} /> Offline
                            </button>
                        </div>
                    </div>

                    {/* API Key Input */}
                    <div className={clsx("transition-all duration-300 overflow-hidden", mode === 'online' ? "max-h-32 opacity-100" : "max-h-0 opacity-0")}>
                        <Input 
                            label="AI Access Key (Gemini)"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="sk-..."
                            type="password"
                            className="h-12 bg-black/20"
                        />
                        <p className="text-[10px] text-textSecondary mt-2">Key is stored locally in your browser.</p>
                    </div>

                    <Button 
                        onClick={handleInitialize}
                        disabled={mode === 'online' && apiKey.length < 5}
                        className="w-full py-5 text-sm font-bold uppercase tracking-widest shadow-glow bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all rounded-xl"
                    >
                        Initialize System <span className="ml-2">✓</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};