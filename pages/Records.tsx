
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, Button, RxBadge, AsclepiusLogo } from '../components/Shared';
import { AnalyticsDashboard } from '../components/Analytics';
import { cryptoService } from '../services/cryptoService';
import { RecordBase, AnalyticsData, SymptomPayload } from '../types';
import { Trash2, Search, FileLock, User, ArrowLeft, LayoutGrid, List, Check } from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '../App';
import { I18N } from '../constants';

export const Records = () => {
  const { language } = useLanguage();
  const t = I18N[language];
  const [records, setRecords] = React.useState<RecordBase[]>([]);
  const [viewRecord, setViewRecord] = React.useState<RecordBase | null>(null);
  const [decryptedPayload, setDecryptedPayload] = React.useState<any | null>(null);
  const [search, setSearch] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState<'newest' | 'oldest' | 'az'>('newest');
  const [mode, setMode] = React.useState<'list' | 'analytics'>('list');

  const loadRecords = () => {
     const keys = Object.keys(localStorage).filter(k => k.startsWith('asclepius_rec_'));
     const recs = keys.map(k => {
       try {
         const item = localStorage.getItem(k);
         if (!item) return null;
         const parsed = JSON.parse(item);
         return { ...parsed, payload: null };
       } catch { return null; }
     }).filter(Boolean) as RecordBase[];
     setRecords(recs);
  };

  React.useEffect(() => {
    loadRecords();
  }, []);

  const handleSelect = async (rec: any) => {
    try {
       const jsonString = await cryptoService.decrypt(rec.data, rec.iv);
       const payload = JSON.parse(jsonString);
       setDecryptedPayload(payload);
       setViewRecord(rec);
    } catch (e) {
       alert("Decryption failed. Invalid Key.");
    }
  };

  const handleDelete = (id: string) => {
      if(confirm('Delete this clinical record locally?')) {
          localStorage.removeItem(`asclepius_rec_${id}`);
          loadRecords();
          setViewRecord(null);
          setDecryptedPayload(null);
      }
  };

  const sortedRecords = React.useMemo(() => {
      let filtered = records.filter(r => r.title.toLowerCase().includes(search.toLowerCase()));
      
      if (sortOrder === 'newest') {
          return filtered.sort((a, b) => b.createdAt - a.createdAt);
      } else if (sortOrder === 'oldest') {
          return filtered.sort((a, b) => a.createdAt - b.createdAt);
      } else if (sortOrder === 'az') {
          return filtered.sort((a, b) => a.title.localeCompare(b.title));
      }
      return filtered;
  }, [records, search, sortOrder]);

  const analyticsData: AnalyticsData = React.useMemo(() => {
      // Note: We can only analyze metadata (titles/dates) without decrypting everything.
      // For a real app, you'd decrypt on load or store unencrypted metadata alongside.
      // Here we will simulate with titles for the "conditions" count.
      const conditionsMap: Record<string, number> = {};
      const typeDist: any = {};
      const activityMap: Record<string, number> = {};
      
      records.forEach(r => {
          // Extract condition from title "Name - Condition"
          const parts = r.title.split(' - ');
          const cond = parts.length > 1 ? parts[1] : 'Unknown';
          conditionsMap[cond] = (conditionsMap[cond] || 0) + 1;
          
          typeDist[r.type] = (typeDist[r.type] || 0) + 1;

          const date = new Date(r.createdAt).toLocaleDateString();
          activityMap[date] = (activityMap[date] || 0) + 1;
      });

      return {
          totalRecords: records.length,
          conditionsMap,
          typeDistribution: typeDist,
          activityByDate: Object.entries(activityMap).map(([date, count]) => ({ date, count })),
          demographics: { ageGroups: {}, gender: {} } // Can't access without decrypting all
      };
  }, [records]);

  // RENDER REPORT CONTENT (Reused from SymptomChecker Logic)
  const renderReportContent = () => {
      if (!decryptedPayload) return null;

      // Detect payload type (Symptom payload vs others)
      const data = decryptedPayload as SymptomPayload;
      
      // If it's a symptom/clinical report
      if (data.conditions || data.treatments) {
          return (
              <div className="space-y-8 animate-in fade-in duration-500">
                  {/* Conditions */}
                  <div>
                      <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Clinical Assessment</h3>
                      <div className="grid gap-4">
                          {data.conditions?.map((cond, i) => (
                              <div key={i} className="bg-surfaceHighlight/50 border border-white/5 rounded-2xl p-4 md:p-6 shadow-sm">
                                  <h4 className="text-lg font-bold text-textPrimary mb-2">{cond.name}</h4>
                                  <p className="text-textSecondary text-sm leading-relaxed">{cond.description}</p>
                              </div>
                          ))}
                      </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                      {/* Rx */}
                      <div>
                          <h3 className="text-xs font-bold text-success uppercase tracking-widest mb-4">Pharmacotherapy</h3>
                          <div className="space-y-3">
                              {data.treatments?.map((tx, i) => (
                                  <div key={i} className="bg-surfaceHighlight/30 border border-white/5 rounded-xl p-4 flex items-center justify-between group">
                                      <div className="flex items-start gap-3">
                                          <RxBadge className="mt-1" />
                                          <div>
                                              <span className="block font-bold text-textPrimary group-hover:text-success transition-colors">{tx.name}</span>
                                              <span className="text-xs text-textSecondary">{tx.description}</span>
                                          </div>
                                      </div>
                                      <span className="text-xs font-mono font-bold text-success bg-success/10 px-2 py-1 rounded border border-success/20 ml-2">
                                          {tx.dosage}
                                      </span>
                                  </div>
                              ))}
                          </div>
                      </div>

                      {/* Lifestyle */}
                      <div>
                          <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">Interventions</h3>
                          <div className="space-y-3">
                              {data.lifestyle?.map((item, i) => (
                                  <div key={i} className="bg-surfaceHighlight/30 border border-white/5 rounded-xl p-4 flex items-start gap-3">
                                      <div className="mt-1 w-4 h-4 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                                          <Check size={10} className="text-secondary" />
                                      </div>
                                      <p className="text-sm text-textSecondary">{item}</p>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          );
      }

      // Fallback for non-structured data (Derm/Rx/Lab)
      const rawText = data.rawAnalysis || (data as any).analysis || JSON.stringify(data, null, 2);
      return (
          <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{rawText}</ReactMarkdown>
          </div>
      );
  };

  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col">
       <div className={clsx("mb-6 flex items-center justify-between", viewRecord ? "hidden md:flex" : "flex")}>
           <div>
               <h1 className="text-3xl font-black text-primary tracking-tight">{t.nav.records}</h1>
               <p className="text-textSecondary text-sm">{t.disclaimer.banner}</p>
           </div>
           
           {/* View Toggle */}
           <div className="bg-surfaceHighlight/50 p-1 rounded-xl flex border border-white/10">
               <button 
                 onClick={() => setMode('list')}
                 className={clsx("p-2 rounded-lg transition-all", mode === 'list' ? "bg-primary text-white shadow-lg" : "text-textSecondary hover:text-white")}
               >
                   <List size={20} />
               </button>
               <button 
                 onClick={() => setMode('analytics')}
                 className={clsx("p-2 rounded-lg transition-all", mode === 'analytics' ? "bg-accent text-white shadow-lg" : "text-textSecondary hover:text-white")}
               >
                   <LayoutGrid size={20} />
               </button>
           </div>
       </div>

       {mode === 'analytics' ? (
           <AnalyticsDashboard data={analyticsData} />
       ) : (
           <div className="flex-1 flex gap-6 min-h-0 relative">
               {/* Sidebar List - Hidden on mobile if viewing record */}
               <div className={clsx("w-full md:w-80 flex flex-col gap-4 transition-all duration-300 min-h-0", viewRecord ? "hidden md:flex" : "flex")}>
                   <div className="bg-surface border border-white/5 rounded-xl p-3 shrink-0">
                       <div className="flex items-center gap-2 bg-surfaceHighlight rounded-lg px-3 py-2">
                           <Search size={16} className="text-textSecondary" />
                           <input 
                             value={search}
                             onChange={(e) => setSearch(e.target.value)}
                             placeholder="Search records..." 
                             className="bg-transparent border-none outline-none text-sm text-textPrimary w-full placeholder-textSecondary/50"
                           />
                       </div>
                       <div className="flex justify-between items-center mt-3 px-1">
                           <span className="text-[10px] font-bold text-textSecondary uppercase tracking-widest">Sort:</span>
                           <select 
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as any)}
                            className="bg-transparent text-[10px] font-bold text-textPrimary uppercase outline-none cursor-pointer"
                           >
                               <option value="newest">Newest First</option>
                               <option value="oldest">Oldest First</option>
                               <option value="az">A-Z Name</option>
                           </select>
                       </div>
                   </div>

                   <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar pb-20 md:pb-0">
                       {sortedRecords.length === 0 && (
                           <div className="text-center py-8 text-textSecondary text-xs">No records found.</div>
                       )}
                       {sortedRecords.map(rec => (
                           <div 
                             key={rec.id}
                             onClick={() => handleSelect(rec)}
                             className={clsx(
                                 "p-4 rounded-xl border cursor-pointer transition-all group active:scale-95",
                                 viewRecord?.id === rec.id 
                                   ? "bg-surfaceHighlight border-primary" 
                                   : "bg-surface border-white/5 hover:bg-surfaceHighlight hover:border-white/10"
                             )}
                           >
                               <div className="flex items-center gap-3 mb-2">
                                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                       <User size={14} className={viewRecord?.id === rec.id ? "text-primary" : "text-textSecondary"} />
                                   </div>
                                   <span className="text-[10px] font-bold text-textSecondary uppercase tracking-widest">{rec.type}</span>
                               </div>
                               <h4 className="font-bold text-textPrimary text-sm mb-1 line-clamp-1">{rec.title}</h4>
                               <div className="flex justify-between items-center">
                                   <span className="text-[10px] text-textSecondary font-mono">{new Date(rec.createdAt).toLocaleDateString()}</span>
                               </div>
                           </div>
                       ))}
                   </div>
               </div>

               {/* Detail View - Hidden on mobile if NOT viewing record */}
               <div className={clsx(
                   "flex-1 bg-surface border border-white/5 md:rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col shadow-2xl absolute md:relative inset-0 z-10 md:z-0",
                   !viewRecord ? "hidden md:flex" : "flex"
               )}>
                   {viewRecord ? (
                       <>
                           <div className="flex justify-between items-start border-b border-textSecondary/20 pb-6 mb-6 shrink-0">
                               <div className="flex items-start gap-3">
                                   <button 
                                       onClick={() => setViewRecord(null)}
                                       className="md:hidden p-2 -ml-2 text-textSecondary hover:text-white"
                                   >
                                       <ArrowLeft size={24} />
                                   </button>
                                   <div>
                                       <h2 className="text-xl md:text-2xl font-bold text-textPrimary line-clamp-2">{viewRecord.title}</h2>
                                       <div className="flex items-center gap-4 mt-2">
                                           <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest">{viewRecord.type}</span>
                                           <span className="text-xs text-textSecondary font-mono hidden md:inline">ID: {viewRecord.id.split('-')[0]}</span>
                                       </div>
                                   </div>
                               </div>
                               <button 
                                    onClick={() => handleDelete(viewRecord.id)}
                                    className="text-textSecondary hover:text-danger transition-colors p-2 bg-surfaceHighlight rounded-lg"
                                    title="Delete Record"
                               >
                                   <Trash2 size={20} />
                               </button>
                           </div>
                           <div className="flex-1 overflow-y-auto custom-scrollbar pb-20 md:pb-0">
                               {renderReportContent()}
                           </div>
                       </>
                   ) : (
                       <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
                           <FileLock size={64} className="mb-4 text-textSecondary" />
                           <h3 className="text-lg font-bold text-textPrimary tracking-widest uppercase">{t.common.viewDetails}</h3>
                       </div>
                   )}
               </div>
           </div>
       )}
    </div>
  );
};
