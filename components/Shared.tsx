
import React, { useState } from 'react';
import { Loader2, Mic, X, HelpCircle, Info } from 'lucide-react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';

export const AsclepiusLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={clsx("drop-shadow-lg", className)} fill="none">
      <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-accent)" />
          </linearGradient>
      </defs>
      <path d="M60,20 Q100,60 60,100 T60,180" stroke="url(#dnaGradient)" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
      <path d="M140,20 Q100,60 140,100 T140,180" stroke="var(--color-secondary)" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
      <line x1="70" y1="30" x2="130" y2="30" stroke="currentColor" strokeWidth="3" strokeOpacity="0.4" />
      <line x1="85" y1="50" x2="115" y2="50" stroke="currentColor" strokeWidth="3" strokeOpacity="0.4" />
      <line x1="85" y1="150" x2="115" y2="150" stroke="currentColor" strokeWidth="3" strokeOpacity="0.4" />
      <line x1="70" y1="170" x2="130" y2="170" stroke="currentColor" strokeWidth="3" strokeOpacity="0.4" />
      <circle cx="100" cy="60" r="8" fill="white" className="animate-pulse" />
      <circle cx="100" cy="140" r="8" fill="white" className="animate-pulse" style={{animationDelay: '1s'}} />
  </svg>
);

export const RxBadge = ({ className }: { className?: string }) => (
  <div className={clsx("relative inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-900/40 border border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]", className)}>
     <span className="font-serif font-black italic text-sm pr-0.5 pt-0.5">Rx</span>
     <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
  </div>
);

export const AppFooter = ({ disclaimer }: { disclaimer: string }) => (
  <footer className="py-6 text-center z-10 no-print w-full">
    <div className="container mx-auto px-4 flex flex-col items-center gap-3">
       <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
          <AsclepiusLogo className="w-5 h-5" />
          <span className="text-xs font-black tracking-widest text-textPrimary">ASCLEPIUS AI</span>
       </div>
       <p className="text-[10px] text-textSecondary font-bold tracking-[0.1em] uppercase flex flex-col md:flex-row items-center justify-center gap-2 max-w-xl text-center leading-relaxed">
         {disclaimer}
       </p>
       <div className="h-px w-24 bg-border my-1"></div>
       <p className="text-[10px] text-textSecondary font-mono opacity-60 uppercase tracking-wider">
          © 2025 • Architected by Tanvir Ahmmed
       </p>
    </div>
  </footer>
);

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  action?: React.ReactNode;
}

export const Card = ({ children, className, title, action }: CardProps) => (
  <div className={clsx("bg-surface/80 backdrop-blur-md border border-border rounded-2xl p-6 shadow-xl hover:border-primary/20 transition-all duration-300", className)}>
    {(title || action) && (
      <div className="flex justify-between items-start mb-6">
        {title && <h3 className="text-lg font-bold text-textPrimary tracking-tight">{title}</h3>}
        {action && <div>{action}</div>}
      </div>
    )}
    {children}
  </div>
);

export const Button = ({ 
  children, 
  isLoading, 
  variant = 'primary', 
  size = 'default',
  className, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  isLoading?: boolean, 
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'accent',
  size?: 'default' | 'sm' | 'lg' | 'icon'
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#05050A] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transform cursor-pointer select-none";
  
  const sizeStyles = {
    default: "px-6 py-3 text-sm",
    sm: "px-4 py-2 text-xs",
    lg: "px-8 py-5 text-base",
    icon: "p-3"
  };

  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-glow hover:shadow-glow-heavy border border-white/10 relative overflow-hidden group hover:-translate-y-0.5",
    secondary: "bg-surfaceHighlight border border-border hover:bg-surfaceHighlight/80 text-textPrimary hover:text-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5",
    accent: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-glow-accent hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] border border-white/10 hover:-translate-y-0.5",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 shadow-lg",
    ghost: "bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-textSecondary hover:text-textPrimary"
  };

  return (
    <button 
      type={props.type || 'button'}
      className={clsx(baseStyles, sizeStyles[size], variants[variant], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
      {(variant === 'primary' || variant === 'accent') && (
         <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 group-hover:ring-white/30 transition-all pointer-events-none"></div>
      )}
    </button>
  );
};

export const VoiceInput = ({ onTranscript }: { onTranscript: (text: string) => void }) => {
    const [listening, setListening] = useState(false);

    const handleListen = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Voice input not supported in this browser.");
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setListening(true);
        recognition.onend = () => setListening(false);
        recognition.onresult = (event: any) => {
            const text = event.results[0][0].transcript;
            onTranscript(text);
        };

        recognition.start();
    };

    return (
        <button 
            type="button"
            onClick={handleListen}
            className={clsx(
                "absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors z-20",
                listening ? "text-red-500 bg-red-500/10 animate-pulse" : "text-textSecondary hover:text-primary hover:bg-white/5"
            )}
            title="Voice Input"
        >
            <Mic size={18} />
        </button>
    );
};

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label?: string, enableVoice?: boolean, onVoiceInput?: (txt: string) => void }>(
  ({ className, label, enableVoice, onVoiceInput, ...props }, ref) => (
    <div className="space-y-2 w-full">
       {label && <label className="text-xs font-bold text-textSecondary uppercase tracking-widest ml-1">{label}</label>}
       <div className="relative">
         <input 
            ref={ref}
            className={clsx(
            "w-full bg-surfaceHighlight/50 border border-border rounded-xl px-5 py-4 text-sm text-textPrimary placeholder-textSecondary/40 focus:border-primary focus:bg-surfaceHighlight focus:ring-1 focus:ring-primary outline-none transition-all duration-300 relative z-10",
            enableVoice ? "pr-12" : "",
            className
            )}
            {...props}
         />
         {enableVoice && onVoiceInput && <VoiceInput onTranscript={onVoiceInput} />}
       </div>
    </div>
  )
);

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }>(
  ({ className, label, children, ...props }, ref) => (
    <div className="space-y-2 w-full">
       {label && <label className="text-xs font-bold text-textSecondary uppercase tracking-widest ml-1">{label}</label>}
       <div className="relative">
         <select 
           ref={ref}
           className={clsx(
             "w-full bg-surfaceHighlight border border-border rounded-xl px-5 py-4 text-sm text-textPrimary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 appearance-none cursor-pointer relative z-10",
             className
           )}
           {...props}
         >
           {React.Children.map(children, child => {
               if (React.isValidElement(child) && child.type === 'option') {
                   // Ensure option text is visible regardless of theme
                   return React.cloneElement(child as React.ReactElement<any>, { className: 'bg-surface text-textPrimary' });
               }
               return child;
           })}
         </select>
         <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-textSecondary z-20">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
         </div>
       </div>
    </div>
  )
);

export const FileUpload = ({ label, accept, onFileSelect }: { label: string, accept: string, onFileSelect: (f: File) => void }) => {
  return (
    <div className="h-full border-2 border-dashed border-border rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 hover:border-primary/50 transition-all duration-300 cursor-pointer relative group bg-surfaceHighlight/20 backdrop-blur-sm">
      <input 
        type="file" 
        accept={accept}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        onChange={(e) => {
          if (e.target.files?.[0]) onFileSelect(e.target.files[0]);
        }}
      />
      
      <div className="w-20 h-20 rounded-full bg-surfaceHighlight flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl group-hover:shadow-glow">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary group-hover:text-accent transition-colors"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
      </div>
      
      <span className="font-bold text-lg text-textPrimary group-hover:text-primary transition-colors">{label}</span>
      <span className="text-xs text-textSecondary mt-2 uppercase tracking-wide opacity-70">Supports JPG, PNG • Max 5MB</span>
    </div>
  );
};

export const DisclaimerBox = ({ text }: { text: string }) => (
  <div className="bg-gradient-to-r from-orange-500/10 to-transparent border-l-4 border-warning p-4 rounded-r-xl flex gap-4 text-warning/90 text-sm mb-6 print:hidden items-start shadow-lg backdrop-blur-sm">
    <svg className="h-6 w-6 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
    <p className="font-semibold leading-relaxed tracking-wide">{text}</p>
  </div>
);

// New: Modal Component
export interface ModalProps {
    children?: React.ReactNode;
    onClose: () => void;
    title?: string;
}

export const Modal = ({ children, onClose, title }: ModalProps) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-surface border border-border w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-border flex justify-between items-center bg-surfaceHighlight/30">
                    <h3 className="text-lg font-black text-textPrimary tracking-tight">{title || 'Info'}</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-textSecondary transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
            <div className="absolute inset-0 z-[-1]" onClick={onClose}></div>
        </div>
    );
};

// New: Page Guide Component
export interface PageGuideProps {
    title: string;
    content: string;
    onClose: () => void;
}

export const PageGuide = ({ title, content, onClose }: PageGuideProps) => {
    return (
        <Modal onClose={onClose} title={title}>
            <div className="prose prose-invert prose-sm max-w-none text-textSecondary">
                <div className="flex items-center gap-3 mb-4 p-4 bg-primary/10 rounded-xl border border-primary/20 text-primary">
                    <Info className="shrink-0" size={24} />
                    <p className="m-0 font-bold text-xs uppercase tracking-wider">Clinical Protocol & Usage Guide</p>
                </div>
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            <div className="mt-6 pt-4 border-t border-border flex justify-end">
                <Button size="sm" onClick={onClose}>Understood</Button>
            </div>
        </Modal>
    );
};

// New: Reusable Page Header
export interface PageHeaderProps {
    title: React.ReactNode;
    subtitle: string;
    guide?: string;
}

export const PageHeader = ({ title, subtitle, guide }: PageHeaderProps) => {
  const [showGuide, setShowGuide] = useState(false);
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 no-print gap-4">
      <div>
        <h1 className="text-3xl font-black text-textPrimary tracking-tight flex items-center gap-3">
          {title}
        </h1>
        <p className="text-textSecondary text-sm font-medium tracking-wide mt-1">{subtitle}</p>
      </div>
      {guide && (
        <>
          <button 
            type="button"
            onClick={() => setShowGuide(true)}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2 rounded-full bg-surfaceHighlight border border-border text-textSecondary hover:text-primary hover:border-primary transition-all shadow-sm group text-xs font-bold uppercase tracking-widest"
            title="Open Clinical Guide"
          >
            <HelpCircle size={16} className="group-hover:scale-110 transition-transform" />
            <span>Guide</span>
          </button>
          {showGuide && <PageGuide title="Clinical Module Protocol" content={guide} onClose={() => setShowGuide(false)} />}
        </>
      )}
    </div>
  );
};
