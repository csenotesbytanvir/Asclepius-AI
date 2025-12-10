import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../components/Shared';
import { useLanguage } from '../App';
import { I18N } from '../constants';
import { Activity, ShieldCheck, Stethoscope, Clock, FileText } from 'lucide-react';
import { RecordBase } from '../types';

export const Dashboard = () => {
  const { language } = useLanguage();
  const t = I18N[language];
  const navigate = useNavigate();
  const [recentRecords, setRecentRecords] = React.useState<RecordBase[]>([]);

  React.useEffect(() => {
    // Load recent records metadata (mock or real if implemented full fetch in future)
    // For now we just read from local storage raw if possible or valid
    const loadRecents = () => {
       const keys = Object.keys(localStorage).filter(k => k.startsWith('asclepius_rec_'));
       const recs = keys.map(k => {
         try {
           const item = localStorage.getItem(k);
           if (!item) return null;
           const parsed = JSON.parse(item);
           return { id: parsed.id, type: parsed.type, title: parsed.title, createdAt: parsed.createdAt } as RecordBase;
         } catch { return null; }
       }).filter(Boolean) as RecordBase[];
       
       setRecentRecords(recs.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5));
    };
    loadRecents();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Status Card */}
        <Card className="flex-1 bg-gradient-to-br from-surface to-slate-800/50 border-secondary/30 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-3 opacity-10">
              <Activity size={100} />
           </div>
           <div className="relative z-10">
             <div className="flex items-center gap-3 mb-2 text-success">
               <div className="h-3 w-3 bg-success rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
               <span className="font-mono text-sm tracking-wider uppercase">{t.common.welcome}</span>
             </div>
             <h2 className="text-2xl font-bold mb-1">{t.common.systemOperational}</h2>
             <p className="text-slate-400 text-sm">Encrypted Local Storage Active</p>
           </div>
        </Card>

        {/* Disclaimer Card */}
        <Card className="flex-1 bg-surface/50">
          <div className="flex items-start gap-3">
             <ShieldCheck className="text-secondary h-8 w-8 shrink-0" />
             <div>
               <h3 className="font-semibold text-slate-200 mb-1">Privacy First</h3>
               <p className="text-sm text-slate-400">
                 {t.disclaimer.banner} Your health data never leaves this device without your explicit export action.
               </p>
             </div>
          </div>
        </Card>
      </div>

      <h3 className="text-lg font-semibold text-slate-300 mt-8 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <Button variant="secondary" onClick={() => navigate('/symptoms')} className="h-24 flex flex-col gap-2">
            <Stethoscope className="h-6 w-6 text-accent" />
            <span>Symptom Checker</span>
         </Button>
         <Button variant="secondary" onClick={() => navigate('/derm')} className="h-24 flex flex-col gap-2">
            <Activity className="h-6 w-6 text-purple-400" />
            <span>Dermatology AI</span>
         </Button>
         <Button variant="secondary" onClick={() => navigate('/rx')} className="h-24 flex flex-col gap-2">
            <FileText className="h-6 w-6 text-green-400" />
            <span>Rx Scanner</span>
         </Button>
         <Button variant="secondary" onClick={() => navigate('/records')} className="h-24 flex flex-col gap-2">
            <Clock className="h-6 w-6 text-orange-400" />
            <span>History</span>
         </Button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-300 mb-4">Recent Activity</h3>
        <div className="bg-surface rounded-xl border border-slate-700 overflow-hidden">
          {recentRecords.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
               No records found. Start a new analysis.
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {recentRecords.map(rec => (
                <div key={rec.id} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => navigate('/records')}>
                   <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        rec.type === 'symptom' ? 'bg-blue-500/10 text-blue-400' :
                        rec.type === 'derm' ? 'bg-purple-500/10 text-purple-400' :
                        rec.type === 'rx' ? 'bg-green-500/10 text-green-400' :
                        rec.type === 'lab' ? 'bg-pink-500/10 text-pink-400' :
                        'bg-slate-500/10 text-slate-400'
                      }`}>
                        {rec.type === 'symptom' && <Stethoscope size={16} />}
                        {rec.type === 'derm' && <Activity size={16} />}
                        {rec.type === 'rx' && <FileText size={16} />}
                        {rec.type === 'lab' && <FileText size={16} />}
                        {rec.type === 'chat' && <FileText size={16} />}
                      </div>
                      <div>
                        <p className="font-medium text-slate-200">{rec.title}</p>
                        <p className="text-xs text-slate-500 capitalize">{rec.type} Analysis</p>
                      </div>
                   </div>
                   <span className="text-xs text-slate-500 font-mono">
                     {new Date(rec.createdAt).toLocaleDateString()}
                   </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
