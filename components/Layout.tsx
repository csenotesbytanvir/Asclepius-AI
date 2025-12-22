import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Stethoscope, 
  ScanEye, 
  FileText, 
  Microscope, 
  MessageSquare, 
  FolderLock,
  Menu,
  X,
  Languages,
  Settings,
  Pill,
  HeartPulse,
  BookOpen,
  Calculator,
  ShieldCheck,
  Zap,
  Globe,
  WifiOff
} from 'lucide-react';
import { I18N } from '../constants';
import { useLanguage } from '../App';
import { LANGUAGES, Language } from '../types';
import { AsclepiusLogo, AppFooter } from './Shared';
import clsx from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
  onConfig: () => void;
  isOffline: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, onConfig, isOffline }) => {
  const { language, setLanguage } = useLanguage();
  const t = I18N[language];
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const NavGroup = ({ title, items }: { title: string, items: any[] }) => (
    <div className="mb-6">
      <div className="text-[10px] font-black text-textSecondary uppercase tracking-[0.3em] px-6 mb-3 opacity-50">{title}</div>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) => clsx(
            "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden mb-1 mx-3",
            isActive 
              ? "bg-primary/20 border-l-4 border-primary text-primary shadow-glow ring-1 ring-white/5" 
              : "text-textSecondary hover:bg-surfaceHighlight hover:text-textPrimary"
          )}
        >
          {({ isActive }) => (
             <>
                <item.icon className={clsx(
                    "h-5 w-5 transition-all duration-300", 
                    isActive ? "text-primary scale-110 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]" : "text-textSecondary group-hover:text-primary group-hover:scale-110"
                )} />
                <span className={clsx(
                    "font-bold text-[13px] tracking-tight uppercase",
                    isActive ? "text-primary" : "text-textSecondary group-hover:text-textPrimary"
                )}>
                    {item.label}
                </span>
             </>
          )}
        </NavLink>
      ))}
    </div>
  );

  const diagnosticItems = [
    { to: '/', icon: LayoutDashboard, label: t.nav.dashboard },
    { to: '/symptoms', icon: Stethoscope, label: t.nav.symptomChecker },
    { to: '/derm', icon: ScanEye, label: t.nav.dermatology },
    { to: '/lab', icon: Microscope, label: t.nav.labIntel },
  ];

  const medicationItems = [
    { to: '/rx', icon: FileText, label: t.nav.rxScanner },
    { to: '/pharmacology', icon: Pill, label: t.nav.pharmacology },
    { to: '/calculators', icon: Calculator, label: t.nav.calculators },
  ];

  const careItems = [
    { to: '/wellness', icon: HeartPulse, label: t.nav.wellness },
    { to: '/library', icon: BookOpen, label: t.nav.library },
    { to: '/chat', icon: MessageSquare, label: t.nav.chat },
    { to: '/records', icon: FolderLock, label: t.nav.records },
  ];

  return (
    <div className="h-[100dvh] bg-background text-textPrimary flex overflow-hidden print:bg-white print:text-black print:h-auto relative">
      <div className="aurora-bg"></div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-surface/90 backdrop-blur-2xl border-b border-border no-print h-[75px] shadow-2xl">
        <div className="flex items-center gap-3">
          <AsclepiusLogo className="w-10 h-10 text-primary" />
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter text-textPrimary leading-none">ASCLEPIUS</span>
            <div className="flex items-center gap-1.5 mt-1">
               {isOffline ? <WifiOff size={11} className="text-warning" /> : <Globe size={11} className="text-success" />}
               <span className={clsx("text-[9px] font-black uppercase tracking-widest", isOffline ? "text-warning" : "text-success")}>
                  {isOffline ? "Offline Protocol" : "Secure Online Cloud"}
               </span>
            </div>
          </div>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-3 text-textSecondary hover:text-textPrimary bg-surfaceHighlight/50 rounded-2xl border border-border shadow-inner">
          {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={clsx(
        "fixed md:relative z-40 h-full w-85 bg-surface/95 backdrop-blur-3xl border-r border-border flex flex-col transition-transform duration-500 no-print shadow-2xl md:shadow-none pt-[75px] md:pt-0 shrink-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-10 pb-6 hidden md:block">
          <div className="flex items-center gap-5 mb-8">
             <div className="relative w-16 h-16 flex items-center justify-center">
                 <div className="absolute inset-0 bg-primary opacity-20 blur-2xl rounded-full animate-pulse"></div>
                 <AsclepiusLogo className="w-16 h-16 text-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
             </div>
             <div>
                <h1 className="font-black text-2xl tracking-tighter text-textPrimary leading-none">ASCLEPIUS</h1>
                <p className="text-[10px] text-textSecondary uppercase tracking-[0.4em] font-black mt-2 opacity-60">Intelligence Suite</p>
             </div>
          </div>
          <div className={clsx(
              "flex items-center gap-3 px-5 py-3 rounded-2xl w-full border shadow-xl backdrop-blur-md",
              isOffline ? "bg-warning/10 border-warning/30" : "bg-success/10 border-success/30"
          )}>
              <div className="relative">
                <span className={clsx("block w-3 h-3 rounded-full animate-ping absolute", isOffline ? "bg-warning" : "bg-success")}></span>
                <span className={clsx("block w-3 h-3 rounded-full relative", isOffline ? "bg-warning" : "bg-success shadow-[0_0_10px_#10b981]")}></span>
              </div>
              <span className={clsx("text-[11px] font-black tracking-widest uppercase", isOffline ? "text-warning" : "text-success")}>
                  {isOffline ? "Offline Protocols Active" : "Neural Link Established"}
              </span>
          </div>
        </div>

        <nav className="flex-1 py-4 space-y-2 overflow-y-auto custom-scrollbar">
          <NavGroup title={t.nav.diagnostics} items={diagnosticItems} />
          <NavGroup title={t.nav.tools} items={medicationItems} />
          <NavGroup title={t.nav.care} items={careItems} />
        </nav>

        <div className="p-6 border-t border-border bg-surfaceHighlight/20 space-y-4">
            <div className="space-y-2">
                 <div className="flex items-center justify-between px-3">
                      <span className="text-[10px] font-black text-textSecondary uppercase tracking-[0.3em] opacity-60">Intelligence Core</span>
                      <Languages size={14} className="text-primary" />
                 </div>
                 <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="w-full bg-surfaceHighlight border border-border rounded-xl px-5 py-3.5 text-[13px] font-bold text-textPrimary focus:border-primary outline-none transition-all cursor-pointer shadow-inner appearance-none"
                >
                    {LANGUAGES.map(lang => (
                        <option key={lang.code} value={lang.code} className="text-black bg-white">{lang.label}</option>
                    ))}
                </select>
            </div>
          
          <button 
            type="button"
            onClick={onConfig}
            className="flex items-center gap-5 px-5 py-4 w-full rounded-2xl text-textSecondary hover:bg-primary/10 hover:text-primary transition-all group border border-transparent hover:border-primary/20 shadow-sm"
          >
            <Settings className="h-6 w-6 group-hover:rotate-180 transition-transform duration-700" />
            <div className="text-left">
                <span className="block font-black text-[13px] uppercase tracking-widest">{t.nav.config}</span>
                <span className="block text-[10px] opacity-60 font-bold uppercase tracking-tighter">System Integration Protocol</span>
            </div>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full relative overflow-hidden pt-[75px] md:pt-0">
        <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar flex flex-col">
           <div className="flex-1 p-6 md:p-14 w-full max-w-[1600px] mx-auto">
               {children}
           </div>
           <AppFooter disclaimer={t.disclaimer.footer} />
        </div>
      </main>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-30 md:hidden backdrop-blur-md animate-in fade-in duration-500"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};