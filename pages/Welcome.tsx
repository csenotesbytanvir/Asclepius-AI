
import React from 'react';
import { Button, AsclepiusLogo, AppFooter } from '../components/Shared';
import { I18N } from '../constants';
import { useLanguage } from '../App'; // Import context

interface WelcomeProps {
    onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
    const { language } = useLanguage(); // Use context to get current language
    const t = I18N[language];

    return (
        <div className="min-h-[100dvh] w-full bg-background flex flex-col relative overflow-x-hidden">
            {/* Global Aurora Background */}
            <div className="aurora-bg fixed inset-0 pointer-events-none z-0"></div>

            <div className="relative z-10 flex flex-col items-center justify-center flex-1 p-6 py-12 md:py-24 space-y-16 w-full max-w-7xl mx-auto">
                {/* System Pill */}
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-surfaceHighlight/30 border border-white/10 shadow-lg backdrop-blur-md animate-in slide-in-from-top-8 duration-700">
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_cyan]"></span>
                    <span className="text-[10px] md:text-xs font-bold text-accent tracking-[0.2em] uppercase">{t.common.systemOperational}</span>
                </div>

                {/* Main Brand Section */}
                <div className="flex flex-col items-center gap-8 text-center">
                    {/* DNA Icon Graphic */}
                    <div className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center animate-float">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary blur-3xl opacity-40 animate-pulse"></div>
                        <AsclepiusLogo className="w-full h-full text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                    </div>

                    {/* Typography */}
                    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-1000 delay-300">
                        <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent tracking-tighter drop-shadow-2xl font-sans">
                            ASCLEPIUS
                        </h1>
                        <div className="flex flex-col items-center gap-1">
                            <p className="text-textSecondary text-sm md:text-xl font-medium tracking-[0.4em] uppercase">
                                Medical Intelligence
                            </p>
                            <div className="h-0.5 w-16 md:w-24 bg-gradient-to-r from-transparent via-accent to-transparent mt-3"></div>
                        </div>
                    </div>
                </div>

                {/* Action with isolated animation */}
                <div className="w-full max-w-xs animate-in slide-in-from-bottom-8 duration-1000 delay-500 flex flex-col items-center pb-12">
                    <div className="animate-float-y w-full">
                        <Button 
                            onClick={onStart} 
                            variant="primary" 
                            size="lg" 
                            className="w-full h-16 md:h-20 text-lg md:text-xl shadow-[0_0_60px_rgba(6,182,212,0.4)] hover:shadow-[0_0_80px_rgba(6,182,212,0.6)] bg-gradient-to-r from-cyan-500 to-blue-600 hover:to-blue-500 text-white border border-white/20 rounded-3xl font-black tracking-widest group relative overflow-hidden transition-all duration-300"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-4">
                                INITIALIZE
                                <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </Button>
                    </div>
                    <p className="text-[10px] text-textSecondary text-center mt-8 font-mono opacity-60 uppercase tracking-wider">
                        Architected by Tanvir Ahmmed • v2.0
                    </p>
                </div>
            </div>

            {/* Static Footer (Flowing naturally) */}
            <div className="relative z-10 w-full mt-auto bg-surface/80 backdrop-blur-md border-t border-white/5">
                <AppFooter disclaimer={t.disclaimer.footer} />
            </div>
        </div>
    );
};
