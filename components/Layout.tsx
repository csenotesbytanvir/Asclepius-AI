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
  Settings
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

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: t.dashboard },
    { to: '/symptoms', icon: Stethoscope, label: t.symptomChecker },
    { to: '/derm', icon: ScanEye, label: t.dermatology },
    { to: '/rx', icon: FileText, label: t.rxScanner },
    { to: '/lab', icon: Microscope, label: t.labIntel },
    { to: '/chat', icon: MessageSquare, label: t.chat },
    { to: '/records', icon: FolderLock, label: t.records },
  ];

  return (
    <div className="h-[100dvh] bg-background text-textPrimary flex overflow-hidden print:bg-white print:text-black print:h-auto relative">
      {/* Global Background Animation */}
      <div className="aurora-bg"></div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-surface/90 backdrop-blur-xl border-b border-surfaceHighlight no-print">
        <div className="flex items-center gap-2">
          {/* Mobile Logo */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
               <AsclepiusLogo className="text-white w-5 h-5" />
          </div>
          <span className="font-black text-lg tracking-wider font-sans">ASCLEPIUS</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-textSecondary hover:text-textPrimary">
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={clsx(
        "fixed md:relative z-40 h-full w-72 bg-surface/80 backdrop-blur-xl border-r border-surfaceHighlight flex flex-col transition-transform duration-300 no-print shadow-2xl md:shadow-none",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Brand Header */}
        <div className="p-8 pb-4">
          <div className="flex items-center gap-4 mb-2">
             <div className="relative w-12 h-12 flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-40 blur-xl rounded-full animate-pulse"></div>
                 {/* Standardized Logo */}
                 <div className="relative bg-surfaceHighlight/50 border border-white/10 rounded-xl p-1 shadow-glow flex items-center justify-center overflow-hidden w-full h-full">
                     <AsclepiusLogo className="w-8 h-8 text-primary" />
                 </div>
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
          {navItems.slice(0, 5).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                isActive 
                  ? "bg-gradient-to-r from-primary/20 to-transparent text-white border-l-2 border-primary shadow-glow translate-x-1" 
                  : "text-textSecondary hover:bg-white/5 hover:text-white hover:translate-x-1"
              )}
            >
              <item.icon className={clsx("h-5 w-5 transition-colors", ({isActive}: any) => isActive ? "text-primary drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]" : "text-textSecondary group-hover:text-white")} />
              <span className="font-medium text-sm relative z-10">{item.label}</span>
            </NavLink>
          ))}
          
          <div className="text-[10px] font-bold text-textSecondary uppercase tracking-widest px-4 mt-6 mb-2 opacity-60">Core System</div>
          {navItems.slice(5).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                isActive 
                  ? "bg-gradient-to-r from-secondary/20 to-transparent text-white border-l-2 border-secondary shadow-glow translate-x-1" 
                  : "text-textSecondary hover:bg-white/5 hover:text-white hover:translate-x-1"
              )}
            >
              <item.icon className={clsx("h-5 w-5 transition-colors", ({isActive}: any) => isActive ? "text-secondary drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]" : "text-textSecondary group-hover:text-white")} />
              <span className="font-medium text-sm relative z-10">{item.label}</span>
            </NavLink>
          ))}
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
                className="w-full bg-surface/50 border border-white/10 rounded-lg p-2 text-xs text-textSecondary focus:border-primary outline-none hover:text-white transition-colors cursor-pointer"
            >
                {LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.label}</option>
                ))}
            </select>
          
          <button 
            onClick={onConfig}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-textSecondary hover:bg-white/5 hover:text-white transition-all group mt-2"
          >
            <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
            <div className="text-left">
                <span className="block font-bold text-xs text-textPrimary">{t.config}</span>
                <span className="block text-[10px] opacity-60">System Settings</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 md:pt-12 scroll-smooth pb-32 custom-scrollbar">
           {children}
        </div>
        
        {/* Persistent App Footer */}
        <AppFooter disclaimer={I18N[language].disclaimer.footer} />
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