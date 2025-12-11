
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, PageHeader } from '../components/Shared';
import { useLanguage } from '../App';
import { I18N } from '../constants';
import { Activity, ShieldCheck, Stethoscope, Clock, FileText, Microscope, MessageSquare } from 'lucide-react';
import { RecordBase, AnalyticsData } from '../types';
import { AnalyticsDashboard } from '../components/Analytics';

export const Dashboard = () => {
  const { language } = useLanguage();
  const t = I18N[language];
  const navigate = useNavigate();
  const [recentRecords, setRecentRecords] = React.useState<RecordBase[]>([]);
  const [analyticsData, setAnalyticsData] = React.useState<AnalyticsData | null>(null);

  React.useEffect(() => {
    const loadData = () => {
       const keys = Object.keys(localStorage).filter(k => k.startsWith('asclepius_rec_'));
       const recs = keys.map(k => {
         try {
           const item = localStorage.getItem(k);
           if (!item) return null;
           const parsed = JSON.parse(item);
           return { 
               id: parsed.id, 
               type: parsed.type, 
               title: parsed.title, 
               createdAt: parsed.createdAt,
               meta: parsed.meta // Extract metadata if present
           } as RecordBase;
         } catch { return null; }
       }).filter(Boolean) as RecordBase[];
       
       setRecentRecords(recs.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5));

       const conditionsMap: Record<string, number> = {};
       const typeDist: any = {};
       const activityMap: Record<string, number> = {};
       const ageGroups: Record<string, number> = { '0-18': 0, '19-35': 0, '36-60': 0, '60+': 0 };
       const genderMap: Record<string, number> = { 'Male': 0, 'Female': 0, 'Other': 0 };
       const bodyPartMap: Record<string, number> = {};
       
       recs.forEach(r => {
           // Condition Count
           const parts = r.title.split(' - ');
           const cond = (r.meta?.condition) ? r.meta.condition : (parts.length > 1 ? parts[1] : 'Unknown');
           if(cond !== 'Unknown') conditionsMap[cond] = (conditionsMap[cond] || 0) + 1;
           
           // Type Distribution
           typeDist[r.type] = (typeDist[r.type] || 0) + 1;
           
           // Activity Date
           const dateKey = new Date(r.createdAt).toISOString().split('T')[0]; // YYYY-MM-DD
           activityMap[dateKey] = (activityMap[dateKey] || 0) + 1;

           // Demographics (from Metadata)
           if (r.meta) {
               // Age
               if (r.meta.age) {
                   const age = parseInt(r.meta.age);
                   if (!isNaN(age)) {
                       if (age <= 18) ageGroups['0-18']++;
                       else if (age <= 35) ageGroups['19-35']++;
                       else if (age <= 60) ageGroups['36-60']++;
                       else ageGroups['60+']++;
                   }
               }
               // Gender
               if (r.meta.sex) {
                   genderMap[r.meta.sex] = (genderMap[r.meta.sex] || 0) + 1;
               }
               // Body Part
               if (r.meta.bodyPart) {
                   // Capitalize first letter
                   const part = r.meta.bodyPart.charAt(0).toUpperCase() + r.meta.bodyPart.slice(1);
                   bodyPartMap[part] = (bodyPartMap[part] || 0) + 1;
               }
           }
       });

       // Fill in last 14 days for chart continuity (Fixes "Blank" chart)
       const chartData = [];
       for (let i = 13; i >= 0; i--) {
           const d = new Date();
           d.setDate(d.getDate() - i);
           const key = d.toISOString().split('T')[0];
           const label = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
           chartData.push({
               date: key,
               label: label,
               count: activityMap[key] || 0
           });
       }

       setAnalyticsData({
           totalRecords: recs.length,
           conditionsMap,
           typeDistribution: typeDist,
           activityByDate: chartData,
           demographics: { ageGroups, gender: genderMap },
           bodyParts: bodyPartMap
       });
    };
    loadData();
  }, [language]);

  const guideContent = `
**System Overview**

This dashboard provides a high-level view of clinical operations and system status.

1.  **System Status**: Monitors local encryption protocols and system readiness.
2.  **Clinical Modules**: Rapid access to diagnostic and analysis tools (Symptom Checker, Derm Vision, etc).
3.  **Analytics**: Visualizes patient demographics, pathology trends, and affected body regions.
4.  **Recent Activity**: Quick link to the last 5 patient interactions.

*Note: All data is stored locally on this device. Clear browser cache to wipe data.*
  `;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader 
        title={t.dashboard.title} 
        subtitle={t.dashboard.subtitle}
        guide={guideContent}
      />

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1 bg-gradient-to-br from-surface to-surfaceHighlight border-primary/20 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity size={100} className="text-textPrimary" />
           </div>
           <div className="relative z-10">
             <div className="flex items-center gap-3 mb-2 text-success">
               <div className="h-3 w-3 bg-success rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
               <span className="font-mono text-sm tracking-wider uppercase">{t.common.welcome}</span>
             </div>
             <h2 className="text-3xl font-bold mb-2 text-textPrimary">{t.dashboard.biosystems}</h2>
             <p className="text-textSecondary text-sm max-w-md leading-relaxed">{t.dashboard.biosystemsDesc}</p>
           </div>
        </Card>

        <Card className="flex-1 bg-surface/50 border-border hover:bg-surface/80 transition-colors">
          <div className="flex items-start gap-4">
             <div className="p-3 bg-secondary/10 rounded-xl">
                <ShieldCheck className="text-secondary h-8 w-8" />
             </div>
             <div>
               <h3 className="font-bold text-textPrimary mb-1 text-lg">{t.dashboard.privacy}</h3>
               <p className="text-sm text-textSecondary leading-relaxed">
                 {t.dashboard.privacyDesc}
               </p>
             </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-bold text-textSecondary mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> {t.nav.diagnostics}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
           <Button variant="secondary" onClick={() => navigate('/symptoms')} className="h-32 flex flex-col gap-3 hover:bg-surfaceHighlight hover:scale-105 transition-all">
              <div className="p-3 bg-blue-500/10 rounded-full"><Stethoscope className="h-6 w-6 text-blue-400" /></div>
              <span className="text-xs font-bold uppercase tracking-wide text-center">{t.nav.symptomChecker}</span>
           </Button>
           <Button variant="secondary" onClick={() => navigate('/derm')} className="h-32 flex flex-col gap-3 hover:bg-surfaceHighlight hover:scale-105 transition-all">
              <div className="p-3 bg-purple-500/10 rounded-full"><Activity className="h-6 w-6 text-purple-400" /></div>
              <span className="text-xs font-bold uppercase tracking-wide text-center">{t.nav.dermatology}</span>
           </Button>
           <Button variant="secondary" onClick={() => navigate('/rx')} className="h-32 flex flex-col gap-3 hover:bg-surfaceHighlight hover:scale-105 transition-all">
              <div className="p-3 bg-emerald-500/10 rounded-full"><FileText className="h-6 w-6 text-emerald-400" /></div>
              <span className="text-xs font-bold uppercase tracking-wide text-center">{t.nav.rxScanner}</span>
           </Button>
           <Button variant="secondary" onClick={() => navigate('/lab')} className="h-32 flex flex-col gap-3 hover:bg-surfaceHighlight hover:scale-105 transition-all">
              <div className="p-3 bg-pink-500/10 rounded-full"><Microscope className="h-6 w-6 text-pink-400" /></div>
              <span className="text-xs font-bold uppercase tracking-wide text-center">{t.nav.labIntel}</span>
           </Button>
           <Button variant="secondary" onClick={() => navigate('/chat')} className="h-32 flex flex-col gap-3 hover:bg-surfaceHighlight hover:scale-105 transition-all">
              <div className="p-3 bg-cyan-500/10 rounded-full"><MessageSquare className="h-6 w-6 text-cyan-400" /></div>
              <span className="text-xs font-bold uppercase tracking-wide text-center">{t.nav.chat}</span>
           </Button>
           <Button variant="secondary" onClick={() => navigate('/records')} className="h-32 flex flex-col gap-3 hover:bg-surfaceHighlight hover:scale-105 transition-all">
              <div className="p-3 bg-orange-500/10 rounded-full"><Clock className="h-6 w-6 text-orange-400" /></div>
              <span className="text-xs font-bold uppercase tracking-wide text-center">{t.nav.records}</span>
           </Button>
        </div>
      </div>

      {analyticsData && (
        <div className="mt-8">
            <h3 className="text-lg font-bold text-textSecondary mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span> {t.dashboard.analytics}
            </h3>
            <AnalyticsDashboard data={analyticsData} />
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-bold text-textSecondary mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
            <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> {t.dashboard.recentActivity}
        </h3>
        <div className="bg-surface/50 rounded-2xl border border-border overflow-hidden backdrop-blur-sm">
          {recentRecords.length === 0 ? (
            <div className="p-12 text-center text-textSecondary flex flex-col items-center gap-2">
               <Clock size={32} className="opacity-20" />
               <span className="text-sm font-medium">{t.dashboard.noRecords}</span>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentRecords.map(rec => (
                <div key={rec.id} className="p-4 flex items-center justify-between hover:bg-surfaceHighlight/50 transition-colors cursor-pointer group" onClick={() => navigate('/records')}>
                   <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl transition-colors ${
                        rec.type === 'symptom' ? 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20' :
                        rec.type === 'derm' ? 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20' :
                        rec.type === 'rx' ? 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20' :
                        rec.type === 'lab' ? 'bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20' :
                        'bg-slate-500/10 text-slate-400 group-hover:bg-slate-500/20'
                      }`}>
                        {rec.type === 'symptom' && <Stethoscope size={18} />}
                        {rec.type === 'derm' && <Activity size={18} />}
                        {rec.type === 'rx' && <FileText size={18} />}
                        {rec.type === 'lab' && <Microscope size={18} />}
                        {rec.type === 'chat' && <MessageSquare size={18} />}
                      </div>
                      <div>
                        <p className="font-bold text-textPrimary text-sm group-hover:text-primary transition-colors">{rec.title}</p>
                        <p className="text-[10px] text-textSecondary font-bold uppercase tracking-wider">{rec.type} Analysis</p>
                      </div>
                   </div>
                   <div className="flex flex-col items-end">
                       <span className="text-[10px] text-textSecondary font-mono font-medium">
                         {new Date(rec.createdAt).toLocaleDateString()}
                       </span>
                       <span className="text-[10px] text-textSecondary font-mono">
                         {new Date(rec.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                       </span>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};