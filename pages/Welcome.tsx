import React from 'react';
import { Button } from '../components/Shared';

interface WelcomeProps {
    onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
    return (
        <div className="min-h-screen bg-transparent flex flex-col items-center justify-center relative overflow-hidden p-6 text-center">
            {/* Global Aurora Background is handled in Layout or Index, but adding local for safety */}
            <div className="aurora-bg"></div>

            <div className="relative z-10 space-y-12 max-w-lg w-full flex flex-col items-center">
                {/* System Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surfaceHighlight/30 border border-white/10 shadow-lg backdrop-blur-md animate-in slide-in-from-top-8 duration-700">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_10px_cyan]"></span>
                    <span className="text-[10px] font-bold text-accent tracking-[0.2em] uppercase">System Operational</span>
                </div>

                {/* DNA Icon Graphic */}
                <div className="relative w-48 h-48 flex items-center justify-center animate-float">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary blur-3xl opacity-40 animate-pulse"></div>
                    {/* DNA Helix SVG */}
                    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                        <defs>
                            <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="var(--color-primary)" />
                                <stop offset="100%" stopColor="var(--color-accent)" />
                            </linearGradient>
                        </defs>
                        {/* Strand 1 */}
                        <path d="M60,20 Q100,60 60,100 T60,180" fill="none" stroke="url(#dnaGradient)" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
                        {/* Strand 2 */}
                        <path d="M140,20 Q100,60 140,100 T140,180" fill="none" stroke="var(--color-secondary)" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
                        
                        {/* Connecting Base Pairs */}
                        <line x1="70" y1="30" x2="130" y2="30" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
                        <line x1="85" y1="50" x2="115" y2="50" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
                        <line x1="85" y1="150" x2="115" y2="150" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
                        <line x1="70" y1="170" x2="130" y2="170" stroke="white" strokeWidth="2" strokeOpacity="0.3" />

                        {/* Central Nodes */}
                        <circle cx="100" cy="60" r="6" fill="white" className="animate-pulse" />
                        <circle cx="100" cy="140" r="6" fill="white" className="animate-pulse" style={{animationDelay: '1s'}} />
                    </svg>
                </div>

                {/* Typography */}
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-1000 delay-300">
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent tracking-tighter drop-shadow-2xl font-sans">
                        ASCLEPIUS
                    </h1>
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-textSecondary text-lg font-medium tracking-[0.4em] uppercase">
                            Medical Intelligence
                        </p>
                        <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-accent to-transparent mt-2"></div>
                    </div>
                </div>

                {/* Action with special animation */}
                <div className="pt-12 w-full max-w-xs animate-in slide-in-from-bottom-8 duration-1000 delay-500 animate-float-y">
                    <Button 
                        onClick={onStart} 
                        variant="primary" 
                        size="lg" 
                        className="w-full h-16 text-lg shadow-[0_0_60px_rgba(6,182,212,0.4)] bg-gradient-to-r from-cyan-500 to-blue-600 hover:to-blue-500 text-white border-none rounded-3xl font-black tracking-widest group relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            INITIALIZE
                            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                        </span>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </Button>
                    <p className="text-[9px] text-textSecondary text-center mt-6 font-mono opacity-60">
                        Architected by Team Curadex • CONFIG v1.0
                    </p>
                </div>
            </div>
        </div>
    );
};