
import React from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  action?: React.ReactNode;
}

export const Card = ({ children, className, title, action }: CardProps) => (
  <div className={clsx("bg-surface/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl hover:border-white/10 transition-all duration-300", className)}>
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
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#05050A] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const sizeStyles = {
    default: "px-6 py-3 text-sm",
    sm: "px-4 py-2 text-xs",
    lg: "px-8 py-5 text-base",
    icon: "p-3"
  };

  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-glow hover:shadow-glow-heavy border border-white/10 relative overflow-hidden group",
    secondary: "bg-surfaceHighlight border border-white/10 hover:bg-white/10 text-textPrimary hover:text-white shadow-lg hover:shadow-xl",
    accent: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-glow-accent hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] border border-white/10",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 shadow-lg",
    ghost: "bg-transparent hover:bg-white/5 text-textSecondary hover:text-white"
  };

  return (
    <button 
      className={clsx(baseStyles, sizeStyles[size], variants[variant], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
      {/* Glossy effect */}
      {(variant === 'primary' || variant === 'accent') && (
         <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 group-hover:ring-white/30 transition-all"></div>
      )}
    </button>
  );
};

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label?: string }>(
  ({ className, label, ...props }, ref) => (
    <div className="space-y-2">
       {label && <label className="text-xs font-bold text-textSecondary uppercase tracking-widest ml-1">{label}</label>}
       <input 
         ref={ref}
         className={clsx(
           "w-full bg-surfaceHighlight/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-textSecondary/40 focus:border-primary focus:bg-surfaceHighlight focus:ring-1 focus:ring-primary outline-none transition-all duration-300 shadow-inner",
           className
         )}
         {...props}
       />
    </div>
  )
);

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }>(
  ({ className, label, children, ...props }, ref) => (
    <div className="space-y-2">
       {label && <label className="text-xs font-bold text-textSecondary uppercase tracking-widest ml-1">{label}</label>}
       <div className="relative">
         <select 
           ref={ref}
           className={clsx(
             "w-full bg-surfaceHighlight/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-primary focus:bg-surfaceHighlight focus:ring-1 focus:ring-primary outline-none transition-all duration-300 appearance-none cursor-pointer shadow-inner",
             className
           )}
           {...props}
         >
           {children}
         </select>
         <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-textSecondary">
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
    <div className="h-full border-2 border-dashed border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 hover:border-primary/50 transition-all duration-300 cursor-pointer relative group bg-surfaceHighlight/20 backdrop-blur-sm">
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