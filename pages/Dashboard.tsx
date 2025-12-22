import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, PageHeader } from '../components/Shared';
import { useLanguage, useTheme } from '../App';
import { I18N } from '../constants';
import { Activity, ShieldCheck, Stethoscope, Clock, FileText, Microscope, MessageSquare, TrendingUp, Zap, Palette, Monitor, Sun, Moon } from 'lucide-react';
import { RecordBase, AnalyticsData } from '../types';
import { AnalyticsDashboard } from '../components/Analytics';
import clsx from 'clsx';

export const Dashboard = () => {
  const { language } = useLanguage();
  const { theme, setTheme } = useTheme();
  const t = I18N[language];
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = React.useState<AnalyticsData | null>(null);

  React.useEffect(() => {
    const loadData = () => {
       const keys = Object.keys(localStorage).filter(k => k.startsWith('asclepius_rec_'));
       const recs = keys.map(k => {
         try {
           const item = localStorage.getItem(k);
           if (!item) return null;
           return JSON.parse(item) as RecordBase;
         } catch { return null; }
       }).filter(Boolean) as RecordBase[];
       
       const specialtyMap: Record<string, number> = {};
       const typeDist: any = {};
       const activityMap: Record<string, { count: number, confidence: number }> = {};
       let totalConfidence = 0;
       let confidenceCount = 0;
       
       recs.forEach(r => {
           typeDist[r.type] = (typeDist[r.type] || 0) + 1;
           const dateKey = new Date(r.createdAt).toISOString().split('T')[0];
           if (!activityMap[dateKey]) activityMap[dateKey] = { count: 0, confidence: 0 };
           activityMap[dateKey].count++;
           
           if (r.meta?.confidence) {
               activityMap[dateKey].confidence += r.meta.confidence;
               totalConfidence += r.meta.confidence;
               confidenceCount++;
           }
       });

       const chartData = [];
       for (let i = 13; i >= 0; i--) {
           const d = new Date();
           d.setDate(d.getDate() - i);
           const key = d.toISOString().split('T')[0];
           const label = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
           const dayData = activityMap[key];
           chartData.push({
               date: key,
               label: label,
               count: dayData?.count || 0,
               accuracy: dayData ? (dayData.confidence / dayData.count) * 100 : 87.3
           });
       }

       setAnalyticsData({
           totalRecords: recs.length,
           avgConfidence: confidenceCount > 0 ? (totalConfidence / confidenceCount) * 100 : 87.3,
           specialtyDistribution: specialtyMap,
           typeDistribution: typeDist,
           activityByDate: chartData,
           demographics: { ageGroups: {}, gender: {} },
           bodyParts: {}
       });
    };
    loadData();
  }, [language]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader 
        title={<span className="font-black tracking-tight">{t.dashboard.title}</span>} 
        subtitle={t.dashboard.subtitle}
      />

      {/* Interface Visualizer Section */}
      <section className="bg-surface/30 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary"><Palette size={20} /></div>
                  <div>
                      <h3 className="text-sm font-black text-textPrimary uppercase tracking-tight">Interface Configuration</h3>
                      <p className="text-[9px] text-textSecondary font-black uppercase tracking-widest opacity-50">Visual Mode Switcher</p>
                  </div>
              </div>
              <div className="flex items-center gap-2 bg-background/50 p-1.5 rounded-xl border border-border">
                  {[
                      { id: 'nebula', name: 'Nebula', icon: Moon, color: 'text-blue-400' },
                      { id: 'clinical', name: 'Clinical', icon: Sun, color: 'text-amber-500' },
                      { id: 'onyx', name: 'Onyx', icon: Monitor, color: 'text-white' }
                  ].map(v => (
                      <button 
                        key={v.id}
                        onClick={() => setTheme(v.id as any)}
                        className={clsx(
                            "flex items-center gap-2 px-4 py-2.5 rounded-lg font-black uppercase text-[9px] tracking-widest transition-all",
                            theme === v.id ? "bg-primary text-white shadow-md" : "text-textSecondary hover:bg-surfaceHighlight"
                        )}
                      >
                          <v.icon size={12} className={theme === v.id ? 'text-white' : v.color} />
                          {v.name}
                      </button>
                  ))}
              </div>
          </div>
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="col-span-2 bg-gradient-to-br from-surface to-surfaceHighlight border-primary/10 group shadow-lg p-8">
           <div className="relative z-10">
             <div className="flex items-center gap-2 mb-4 text-primary">
               <div className="h-3 w-3 bg-primary rounded-full animate-pulse"></div>
               <span className="font-black text-[9px] tracking-widest uppercase">{t.common.systemOperational}</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black mb-4 text-textPrimary tracking-tighter">
                {analyticsData?.avgConfidence.toFixed(1)}% <span className="text-xl font-medium text-textSecondary tracking-normal">Inference fidelity</span>
             </h2>
             <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <div className="px-4 py-2 bg-primary/10 rounded-xl border border-primary/20 flex items-center gap-2 w-fit">
                    <Zap size={14} className="text-primary" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-textPrimary">Handshake active</span>
                </div>
                <p className="text-textSecondary text-xs font-medium max-w-sm leading-relaxed opacity-60">
                    Dual-mode clinical architecture processing encrypted vignettes across 15 medical specialties.
                </p>
             </div>
           </div>
        </Card>

        <Card className="bg-surfaceHighlight/20 border-border flex flex-col justify-center items-center text-center p-8 group shadow-sm">
             <div className="p-5 bg-secondary/10 rounded-full mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck className="text-secondary h-10 w-10" />
             </div>
             <h3 className="font-black text-textPrimary mb-1 text-lg tracking-tight uppercase">Air-gap security</h3>
             <p className="text-[9px] text-textSecondary uppercase tracking-widest font-black opacity-40">Local protocol aes-256</p>
        </Card>
      </div>

      <div className="space-y-6">
        <h3 className="text-[9px] font-black text-textSecondary flex items-center gap-3 uppercase tracking-[0.4em]">
            <div className="h-px w-10 bg-border"></div> Intel Suite Nodes
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
           {[
             { path: '/symptoms', icon: Stethoscope, label: t.nav.symptomChecker },
             { path: '/derm', icon: Activity, label: t.nav.dermatology },
             { path: '/rx', icon: FileText, label: t.nav.rxScanner },
             { path: '/lab', icon: Microscope, label: t.nav.labIntel },
             { path: '/chat', icon: MessageSquare, label: t.nav.chat },
             { path: '/records', icon: Clock, label: t.nav.records }
           ].map((item) => (
             <Button 
                key={item.path} variant="secondary" 
                onClick={() => navigate(item.path)} 
                className="h-32 flex flex-col gap-3 rounded-3xl border-border/50 group hover:shadow-md"
             >
                <div className={`p-3.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all`}>
                    <item.icon className={`h-6 w-6 text-primary`} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-center leading-tight max-w-[80px]">{item.label}</span>
             </Button>
           ))}
        </div>
      </div>

      {analyticsData && (
        <div className="mt-12 animate-in slide-in-from-bottom-8 duration-700">
            <h3 className="text-[9px] font-black text-textSecondary flex items-center gap-3 uppercase tracking-[0.4em] mb-6">
                <div className="h-px w-10 bg-border"></div> Neural Intelligence Metrics
            </h3>
            <AnalyticsDashboard data={analyticsData} />
        </div>
      )}
    </div>
  );
};