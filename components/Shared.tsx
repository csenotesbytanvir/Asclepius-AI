import React, { useState } from 'react';
import { Loader2, X, HelpCircle, Info, Zap, AlertCircle, Check, Pill, Activity, HeartPulse, Brain, ShieldCheck, Microscope, FileText, ChevronRight, Star } from 'lucide-react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';

export const AsclepiusLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={clsx("drop-shadow-2xl", className)} fill="none">
      <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-accent)" />
          </linearGradient>
      </defs>
      <path d="M60,20 Q100,60 60,100 T60,180" stroke="url(#dnaGradient)" strokeWidth="15" strokeLinecap="round" opacity="0.9" />
      <path d="M140,20 Q100,60 140,100 T140,180" stroke="var(--color-secondary)" strokeWidth="15" strokeLinecap="round" opacity="0.9" />
      <circle cx="100" cy="60" r="10" fill="white" className="animate-pulse" />
      <circle cx="100" cy="140" r="10" fill="white" className="animate-pulse" style={{animationDelay: '1s'}} />
  </svg>
);

export const ClinicalScanner = () => (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-3xl">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-scan blur-sm"></div>
        <div className="absolute inset-0 bg-primary/5 backdrop-blur-[2px]"></div>
    </div>
);

export const RxBadge = ({ className }: { className?: string }) => (
  <div className={clsx("relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400", className)}>
     <span className="font-serif font-black italic text-lg">Rx</span>
  </div>
);

export const AppFooter = ({ disclaimer }: { disclaimer: string }) => (
  <footer className="py-8 text-center z-10 no-print w-full border-t border-border mt-auto px-6 backdrop-blur-3xl">
    <div className="container mx-auto flex flex-col items-center gap-3">
       <div className="flex items-center gap-2">
          <AsclepiusLogo className="w-6 h-6" />
          <span className="text-[10px] font-black tracking-[0.3em] text-textPrimary uppercase">Asclepius AI</span>
       </div>
       <p className="text-[9px] text-textSecondary font-bold max-w-4xl leading-relaxed uppercase tracking-widest opacity-50 px-4">
         {disclaimer}
       </p>
    </div>
  </footer>
);

export const Card = ({ children, className, title, action, variant = 'glass' }: { children?: React.ReactNode; className?: string; title?: React.ReactNode; action?: React.ReactNode; variant?: 'glass' | 'solid' }) => (
  <div className={clsx(
    "border rounded-3xl p-6 md:p-8 transition-all relative overflow-hidden",
    variant === 'glass' ? "glass shadow-clinical" : "bg-surfaceHighlight border-border shadow-md",
    className
  )}>
    {(title || action) && (
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-border/20 pb-4 relative z-10 gap-2">
        {title && <h3 className="text-lg md:text-xl font-black text-textPrimary tracking-tight uppercase leading-none">{title}</h3>}
        {action && <div className="relative z-20 w-full md:w-auto">{action}</div>}
      </div>
    )}
    <div className="relative z-10">{children}</div>
  </div>
);

export const Button = ({ children, isLoading, variant = 'primary', size = 'default', className, ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-black transition-all duration-200 focus:outline-none disabled:opacity-50 active:scale-[0.98] transform uppercase tracking-[0.1em] select-none";
  const sizeStyles = { 
    default: "px-5 py-3 text-[10px]", 
    sm: "px-3 py-1.5 text-[9px]", 
    lg: "px-8 py-4 text-xs md:text-sm" 
  };
  const variants = {
    primary: "bg-primary text-white border border-primary/20 shadow-glow",
    secondary: "bg-surfaceHighlight border border-border text-textPrimary hover:bg-border/30",
    accent: "bg-accent text-white border border-accent/20",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
    rx: "bg-emerald-600 text-white shadow-emerald-500/20 border border-emerald-500/20"
  };
  return (
    <button className={clsx(baseStyles, sizeStyles[size], (variants as any)[variant], className)} disabled={isLoading || props.disabled} {...props}>
      {isLoading && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
      {children}
    </button>
  );
};

export const Input = React.forwardRef<HTMLInputElement, any>(({ label, className, ...props }, ref) => (
    <div className="space-y-1.5 w-full">
       {label && <label className="text-[9px] font-black text-textSecondary uppercase tracking-[0.2em] ml-1 opacity-70">{label}</label>}
       <input 
          ref={ref} 
          className={clsx(
              "w-full bg-surface/50 border border-border rounded-xl px-4 py-2.5 text-sm text-textPrimary placeholder-textSecondary/30 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-semibold", 
              className
          )} 
          {...props} 
        />
    </div>
));

export const Select = React.forwardRef<HTMLSelectElement, any>(({ label, className, children, ...props }, ref) => (
    <div className="space-y-1.5 w-full">
       {label && <label className="text-[9px] font-black text-textSecondary uppercase tracking-[0.2em] ml-1 opacity-70">{label}</label>}
       <select 
          ref={ref} 
          className={clsx(
              "w-full bg-surface/50 border border-border rounded-xl px-4 py-2.5 text-sm text-textPrimary focus:border-primary outline-none transition-all cursor-pointer appearance-none font-semibold", 
              className
          )} 
          {...props}
        >
           {children}
       </select>
    </div>
));

export const IntelligenceLedger = ({ result, type = 'clinical' }: { result: any, type?: 'clinical' | 'vision' | 'pharma' | 'pathology' }) => {
    const themeStyles = {
        clinical: { bg: 'bg-primary/10', border: 'border-primary/20', accent: 'text-primary', icon: Brain },
        vision: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', accent: 'text-amber-500', icon: Microscope },
        pharma: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', accent: 'text-emerald-500', icon: Pill },
        pathology: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', accent: 'text-purple-500', icon: Activity }
    };
    
    const style = themeStyles[type];
    const Icon = style.icon;

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Primary Analysis Module */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                   <h3 className={clsx("text-[9px] font-black text-white px-4 py-2 rounded-lg uppercase tracking-widest flex items-center gap-2", style.bg.replace('/10', ''))}>
                       <Icon size={14} /> Neural Assessment Ledger
                   </h3>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {result.conditions?.map((cond: any, i: number) => (
                        <div key={i} className={clsx("bg-surfaceHighlight/20 border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-sm", style.border)}>
                            <div className="flex-1 space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                    <h4 className="text-lg md:text-xl font-black text-textPrimary tracking-tight leading-tight">{cond.name}</h4>
                                    <span className={clsx("text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border", style.bg, style.border)}>{cond.specialty}</span>
                                </div>
                                <p className="text-textSecondary text-xs md:text-sm leading-relaxed font-medium opacity-90">{cond.description}</p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                    <div className="space-y-1">
                                        <span className="text-[8px] font-black uppercase tracking-widest text-textSecondary opacity-40">Etiology</span>
                                        <p className="text-xs text-textPrimary font-bold leading-relaxed">{cond.etiology || "N/A"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[8px] font-black uppercase tracking-widest text-textSecondary opacity-40">Pathophysiology</span>
                                        <p className="text-xs text-textPrimary font-bold leading-relaxed">{cond.pathophysiology || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-40 flex flex-col items-center justify-center bg-background/30 rounded-2xl p-4 border border-white/5">
                                <div className={clsx("text-3xl md:text-4xl font-black tracking-tighter", style.accent)}>{(cond.confidence * 100).toFixed(0)}%</div>
                                <div className="text-[8px] font-black text-textSecondary uppercase tracking-widest text-center opacity-40">Confidence</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid lg:grid-cols-2 gap-6">
                <section className="space-y-4">
                    <h3 className="text-[9px] font-black text-white bg-emerald-600 px-4 py-2 rounded-lg uppercase tracking-widest flex items-center gap-2 w-fit">
                        <Pill size={14} /> Pharmacotherapy
                    </h3>
                    <div className="space-y-3">
                        {result.treatments?.map((tx: any, i: number) => (
                            <div key={i} className="bg-surfaceHighlight/20 border-l-4 border-emerald-500 rounded-xl p-4 flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="font-black text-textPrimary text-sm">{tx.name}</span>
                                    <span className="text-[9px] font-mono font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10">{tx.dosage}</span>
                                </div>
                                <p className="text-xs text-textSecondary font-medium leading-relaxed">{tx.mechanism || tx.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-[9px] font-black text-white bg-cyan-600 px-4 py-2 rounded-lg uppercase tracking-widest flex items-center gap-2 w-fit">
                        <HeartPulse size={14} /> Prophylactic Protocol
                    </h3>
                    <div className="space-y-2">
                        {result.lifestyle?.map((item: string, i: number) => (
                            <div key={i} className="bg-surfaceHighlight/20 border-l-4 border-cyan-500 rounded-xl p-4 flex items-start gap-4">
                                <Check size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                                <p className="text-xs text-textPrimary font-semibold leading-relaxed">{item}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export const PageHeader = ({ title, subtitle, guide }: { title: any, subtitle: string, guide?: string }) => {
    const [showGuide, setShowGuide] = useState(false);
    return (
        <div className="flex flex-col mb-10 no-print relative w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-xl md:text-2xl font-black text-textPrimary tracking-tight leading-none">{title}</h1>
                    <p className="text-textSecondary text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase opacity-70 flex items-center gap-2">
                        <Zap size={14} className="text-primary" /> {subtitle}
                    </p>
                </div>
                {guide && (
                    <button 
                        onClick={() => setShowGuide(!showGuide)}
                        className="p-2 text-textSecondary hover:text-primary transition-all bg-surfaceHighlight/50 rounded-lg border border-border shrink-0"
                    >
                        {showGuide ? <X size={18} /> : <HelpCircle size={18} />}
                    </button>
                )}
            </div>
            {showGuide && guide && (
                <div className="mt-6 p-6 glass border-primary/20 rounded-2xl shadow-xl animate-in slide-in-from-top-4 z-50">
                    <div className="flex items-center gap-2 mb-4 text-primary border-b border-border pb-2">
                        <Info size={16} />
                        <h3 className="text-xs font-black uppercase tracking-widest">Protocol Guide</h3>
                    </div>
                    <div className="prose prose-invert max-w-none text-textPrimary leading-relaxed text-xs font-medium">
                        <ReactMarkdown>{guide}</ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
};

export const DisclaimerBox = ({ text, className }: { text: string; className?: string }) => (
    <div className={clsx("bg-red-500/5 border border-red-500/10 rounded-2xl p-4 md:p-6 flex items-start gap-4 relative overflow-hidden", className)}>
        <div className="absolute top-0 left-0 w-1 h-full bg-red-500/30"></div>
        <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
        <p className="text-[10px] font-black text-textSecondary leading-relaxed uppercase tracking-widest opacity-80">{text}</p>
    </div>
);

export const FileUpload = ({ label, onFileSelect, icon: Icon, color = 'primary' }: any) => (
    <div onClick={() => (document.getElementById('file-inp') as any).click()} className={clsx(
        "flex flex-col items-center justify-center gap-4 cursor-pointer group w-full h-full py-12 transition-all border-2 border-dashed rounded-3xl bg-surface/30",
        color === 'primary' ? "border-primary/20 hover:bg-primary/5 hover:border-primary/40" : "border-emerald-500/20 hover:bg-emerald-500/5 hover:border-emerald-500/40"
    )}>
      <input type="file" id="file-inp" onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])} className="hidden" />
      <div className={clsx(
        "p-5 bg-surface rounded-2xl border border-border group-hover:scale-105 transition-all shadow-sm",
        color === 'primary' ? "group-hover:border-primary/50" : "group-hover:border-emerald-500/50"
      )}>
        <Icon className={clsx("h-8 w-8 transition-colors", color === 'primary' ? "text-primary group-hover:text-accent" : "text-emerald-500 group-hover:text-emerald-400")} />
      </div>
      <span className="font-black text-[10px] uppercase tracking-widest text-textPrimary group-hover:text-primary transition-colors text-center px-6 leading-relaxed">{label}</span>
    </div>
);