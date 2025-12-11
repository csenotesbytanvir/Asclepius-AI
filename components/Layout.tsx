
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
  Calculator
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
  const t = I18N[language].nav;
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Grouped Navigation for better organization
  const diagnosticItems = [
    { to: '/', icon: LayoutDashboard, label: t.dashboard },
    { to: '/symptoms', icon: Stethoscope, label: t.symptomChecker },
    { to: '/derm', icon: ScanEye, label: t.dermatology },
    { to: '/lab', icon: Microscope, label: t.labIntel },
  ];

  const medicationItems = [
    { to: '/rx', icon: FileText, label: t.rxScanner },
    { to: '/pharmacology', icon: Pill, label: t.pharmacology },
    { to: '/calculators', icon: Calculator, label: t.calculators },
  ];

  const careItems = [
    { to: '/wellness', icon: HeartPulse, label: t.wellness },
    { to: '/library', icon: BookOpen, label: t.library },
    { to: '/chat', icon: MessageSquare, label: t.chat },
    { to: '/records', icon: FolderLock, label: t.records },
  ];

  const NavGroup = ({ title, items }: { title: string, items: any[] }) => (
    <>
      <div className="text-[10px] font-bold text-textSecondary uppercase tracking-widest px-4 mt-6 mb-2 opacity-60">{title}</div>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) => clsx(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
            isActive 
              ? "bg-gradient-to-r from-primary/20 to-transparent border-l-2 border-primary shadow-glow translate-x-1" 
              : "text-textSecondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-textPrimary hover:translate-x-1"
          )}
        >
          {({ isActive }) => (
             <>
                <item.icon className={clsx(
                    "h-5 w-5 transition-colors", 
                    isActive ? "text-primary drop-shadow-[0_0_5px_currentColor]" : "text-textSecondary group-hover:text-primary"
                )} />
                <span className={clsx(
                    "font-medium text-sm relative z-10 transition-colors",
                    // Ensure text is dark in light mode when active
                    isActive ? "text-primary font-bold" : "text-textSecondary group-hover:text-textPrimary"
                )}>
                    {item.label}
                </span>
             </>
          )}
        </NavLink>
      ))}
    </>
  );

  return (
    <div className="h-[100dvh] bg-background text-textPrimary flex overflow-hidden print:bg-white print:text-black print:h-auto relative">
      {/* Global Background Animation */}
      <div className="aurora-bg"></div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-surface/90 backdrop-blur-xl border-b border-surfaceHighlight no-print shadow-lg h-[60px]">
        <div className="flex items-center gap-3">
          {/* Mobile Logo */}
          <div className="w-8 h-8 flex items-center justify-center">
               <AsclepiusLogo className="w-8 h-8 text-primary" />
          </div>
          <span className="font-black text-lg tracking-wider font-sans bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">ASCLEPIUS</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-textSecondary hover:text-textPrimary bg-surfaceHighlight/50 rounded-lg">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={clsx(
        "fixed md:relative z-40 h-full w-72 bg-surface/80 backdrop-blur-xl border-r border-surfaceHighlight flex flex-col transition-transform duration-300 no-print shadow-2xl md:shadow-none pt-[60px] md:pt-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Brand Header */}
        <div className="p-8 pb-4 hidden md:block">
          <div className="flex items-center gap-4 mb-2">
             <div className="relative w-12 h-12 flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-40 blur-xl rounded-full animate-pulse"></div>
                 {/* Standardized Logo */}
                 <AsclepiusLogo className="w-12 h-12 text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
             </div>
             <div>
                <h1 className="font-black text-xl tracking-tighter text-textPrimary">ASCLEPIUS</h1>
                <p className="text-[10px] text-textSecondary uppercase tracking-widest">Medical Intelligence</p>
             </div>
          </div>
          <div className="mt-6 flex items-center gap-2 px-3 py-1.5 bg-surfaceHighlight/50 rounded-full w-fit border border-white/5">
              <span className={clsx("w-2 h-2 rounded-full animate-pulse", isOffline ? "bg-warning" : "bg-success shadow-[0_0_8px_#10b981]")}></span>
              <span className="text-[10px] font-bold tracking-wider text-textSecondary uppercase">
                  {isOffline ? I18N[language].common.offlineMode : I18N[language].common.systemOperational}
              </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="text-[10px] font-bold text-textSecondary uppercase tracking-widest px-4 mb-2 opacity-60">Diagnostics</div>
          {diagnosticItems.map((item) => (
             <NavLink
             key={item.to}
             to={item.to}
             onClick={() => setSidebarOpen(false)}
             className={({ isActive }) => clsx(
               "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
               isActive 
                 ? "bg-gradient-to-r from-primary/20 to-transparent border-l-2 border-primary shadow-glow translate-x-1" 
                 : "text-textSecondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-textPrimary hover:translate-x-1"
             )}
           >
             {({ isActive }) => (
                <>
                   <item.icon className={clsx(
                       "h-5 w-5 transition-colors", 
                       isActive ? "text-primary drop-shadow-[0_0_5px_currentColor]" : "text-textSecondary group-hover:text-primary"
                   )} />
                   <span className={clsx(
                       "font-medium text-sm relative z-10 transition-colors",
                       isActive ? "text-primary font-bold" : "text-textSecondary group-hover:text-textPrimary"
                   )}>
                       {item.label}
                   </span>
                </>
             )}
           </NavLink>
          ))}
          
          <NavGroup title="Pharmacology & Tools" items={medicationItems} />
          <NavGroup title="Patient Care" items={careItems} />
        </nav>

        {/* Settings Footer in Sidebar */}
        <div className="p-4 border-t border-surfaceHighlight space-y-3 bg-surfaceHighlight/20 backdrop-blur-md">
            <div className="flex items-center justify-between px-2">
                 <span className="text-[10px] font-bold text-textSecondary uppercase tracking-widest">Interface Language</span>
                 <Languages size={12} className="text-textSecondary" />
            </div>
            <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full bg-surface border border-border rounded-lg p-2 text-xs text-textPrimary focus:border-primary outline-none hover:border-primary transition-colors cursor-pointer"
            >
                {LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code} className="bg-surface text-textPrimary">{lang.label}</option>
                ))}
            </select>
          
          <button 
            type="button"
            onClick={onConfig}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-textSecondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-textPrimary transition-all group mt-2"
          >
            <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
            <div className="text-left">
                <span className="block font-bold text-xs text-textPrimary">{t.config}</span>
                <span className="block text-[10px] opacity-60">System Settings</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden pt-[60px] md:pt-0">
        <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar flex flex-col">
           <div className="flex-1 p-4 md:p-8 md:pt-12 pb-12 w-full max-w-[1600px] mx-auto">
               {children}
           </div>
           
           {/* Static Footer within flow */}
           <AppFooter disclaimer={I18N[language].disclaimer.footer} />
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
