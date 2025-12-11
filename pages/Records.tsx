
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, Button, RxBadge, AsclepiusLogo, Select, PageHeader } from '../components/Shared';
import { cryptoService } from '../services/cryptoService';
import { RecordBase, SymptomPayload } from '../types';
import { Trash2, Search, FileLock, User, ArrowLeft, Filter, Check } from 'lucide-react';
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

  const renderReportContent = () => {
      if (!decryptedPayload) return null;
      const data = decryptedPayload as SymptomPayload;
      if (data.conditions || data.treatments) {
          return (
              <div className="space-y-8 animate-in fade-in duration-500">
                  <div>
                      <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">{t.symptomChecker.assessment}</h3>
                      <div className="grid gap-4">
                          {data.conditions?.map((cond, i) => (
                              <div key={i} className="bg-surfaceHighlight/50 border border-border rounded-2xl p-4 md:p-6 shadow-sm">
                                  <h4 className="text-lg font-bold text-textPrimary mb-2">{cond.name}</h4>
                                  <p className="text-textSecondary text-sm leading-relaxed">{cond.description}</p>
                              </div>
                          ))}
                      </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                      <div>
                          <h3 className="text-xs font-bold text-success uppercase tracking-widest mb-4">{t.symptomChecker.pharmacotherapy}</h3>
                          <div className="space-y-3">
                              {data.treatments?.map((tx, i) => (
                                  <div key={i} className="bg-surfaceHighlight/30 border border-border rounded-xl p-4 flex items-center justify-between group">
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
                      <div>
                          <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">{t.symptomChecker.interventions}</h3>
                          <div className="space-y-3">
                              {data.lifestyle?.map((item, i) => (
                                  <div key={i} className="bg-surfaceHighlight/30 border border-border rounded-xl p-4 flex items-start gap-3">
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
      const rawText = data.rawAnalysis || (data as any).analysis || JSON.stringify(data, null, 2);
      return (
          <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{rawText}</ReactMarkdown>
          </div>
      );
  };

  const guideContent = `
**Medical Records Archive**

1.  **Security**: All records are encrypted using AES-GCM 256-bit encryption before local storage.
2.  **Access**: Click on a patient record to decrypt and view clinical details.
3.  **Management**:
    *   **Filter**: Search by patient name or ID.
    *   **Sort**: Organize by Date or Name.
    *   **Delete**: Permanently remove records from the device.

*Protocol: Records are device-specific. Ensure regular backups via Print/PDF export if data portability is required.*
  `;

  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col">
       <div className={clsx("mb-8", viewRecord ? "hidden md:block" : "block")}>
           <PageHeader 
              title={t.records.title}
              subtitle={t.records.subtitle}
              guide={guideContent}
           />
       </div>

       <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0 relative">
           <div className={clsx("w-full md:w-96 flex flex-col gap-4 transition-all duration-300 min-h-0", viewRecord ? "hidden md:flex" : "flex")}>
               <div className="bg-surface/80 border border-border rounded-2xl p-4 shrink-0 shadow-lg backdrop-blur-md">
                   <div className="flex items-center gap-2 bg-surfaceHighlight/50 rounded-xl px-4 py-3 border border-border focus-within:border-primary/50 transition-colors">
                       <Search size={16} className="text-textSecondary" />
                       <input 
                         value={search}
                         onChange={(e) => setSearch(e.target.value)}
                         placeholder={t.records.search}
                         className="bg-transparent border-none outline-none text-sm text-textPrimary w-full placeholder-textSecondary/50 font-medium"
                       />
                   </div>
                   <div className="flex justify-between items-center mt-4 px-1">
                       <div className="flex items-center gap-2 text-[10px] font-bold text-textSecondary uppercase tracking-widest">
                           <Filter size={12} /> {t.records.filter}
                       </div>
                       <select 
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as any)}
                        className="bg-surfaceHighlight/50 border border-border rounded-lg text-xs font-bold text-textPrimary py-1 px-2 outline-none cursor-pointer hover:bg-surfaceHighlight transition-colors"
                       >
                           <option value="newest" className="text-black bg-white">Newest First</option>
                           <option value="oldest" className="text-black bg-white">Oldest First</option>
                           <option value="az" className="text-black bg-white">A-Z Name</option>
                       </select>
                   </div>
               </div>

               <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar pb-20 md:pb-0">
                   {sortedRecords.length === 0 && (
                       <div className="text-center py-12 text-textSecondary opacity-50 flex flex-col items-center gap-2">
                           <FileLock size={32} />
                           <span className="text-xs font-bold uppercase tracking-widest">No records found</span>
                       </div>
                   )}
                   {sortedRecords.map(rec => (
                       <div 
                         key={rec.id}
                         onClick={() => handleSelect(rec)}
                         className={clsx(
                             "p-5 rounded-2xl border cursor-pointer transition-all group duration-200 active:scale-95 shadow-sm relative overflow-hidden",
                             viewRecord?.id === rec.id 
                               ? "bg-gradient-to-r from-surfaceHighlight to-primary/10 border-primary" 
                               : "bg-surface border-border hover:bg-surfaceHighlight hover:border-primary/30"
                         )}
                       >
                           {viewRecord?.id === rec.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_#3b82f6]"></div>}
                           
                           <div className="flex items-center gap-3 mb-3">
                               <div className={clsx(
                                   "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                   viewRecord?.id === rec.id ? "bg-primary text-white shadow-glow" : "bg-surfaceHighlight text-textSecondary"
                               )}>
                                   <User size={14} />
                               </div>
                               <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded border border-accent/20">{rec.type}</span>
                           </div>
                           <h4 className={clsx("font-bold text-base mb-1 line-clamp-1 transition-colors", viewRecord?.id === rec.id ? "text-textPrimary" : "text-textPrimary")}>{rec.title}</h4>
                           <div className="flex justify-between items-center mt-2">
                               <span className="text-[10px] text-textSecondary font-mono opacity-70">{new Date(rec.createdAt).toLocaleDateString()}</span>
                               <span className="text-[10px] text-textSecondary font-mono opacity-70">{new Date(rec.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                           </div>
                       </div>
                   ))}
               </div>
           </div>

           <div className={clsx(
               "flex-1 bg-surface border border-border md:rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col shadow-2xl absolute md:relative inset-0 z-10 md:z-0",
               !viewRecord ? "hidden md:flex" : "flex"
           )}>
               {viewRecord ? (
                   <>
                       <div className="flex justify-between items-start border-b border-textSecondary/20 pb-6 mb-6 shrink-0">
                           <div className="flex items-start gap-4">
                               <button 
                                   onClick={() => setViewRecord(null)}
                                   className="md:hidden p-2 -ml-2 text-textSecondary hover:text-white"
                               >
                                   <ArrowLeft size={24} />
                               </button>
                               <div>
                                   <h2 className="text-xl md:text-2xl font-black text-textPrimary line-clamp-2 tracking-tight">{viewRecord.title}</h2>
                                   <div className="flex items-center gap-4 mt-2">
                                       <span className="px-2 py-1 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">{viewRecord.type}</span>
                                       <span className="text-[10px] text-textSecondary font-mono hidden md:inline opacity-60">ID: {viewRecord.id.split('-')[0]}</span>
                                   </div>
                               </div>
                           </div>
                           <button 
                                onClick={() => handleDelete(viewRecord.id)}
                                className="text-textSecondary hover:text-danger hover:bg-danger/10 transition-colors p-2.5 rounded-xl border border-transparent hover:border-danger/20"
                                title={t.common.delete}
                           >
                               <Trash2 size={18} />
                           </button>
                       </div>
                       <div className="flex-1 overflow-y-auto custom-scrollbar pb-20 md:pb-0">
                           {renderReportContent()}
                       </div>
                   </>
               ) : (
                   <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
                       <div className="w-24 h-24 bg-surfaceHighlight rounded-full flex items-center justify-center mb-6">
                           <FileLock size={48} className="text-textSecondary" />
                       </div>
                       <h3 className="text-xl font-bold text-textPrimary tracking-widest uppercase mb-2">{t.common.viewDetails}</h3>
                       <p className="text-sm text-textSecondary max-w-xs">Select a patient record from the list to decrypt and view clinical details.</p>
                   </div>
               )}
           </div>
       </div>
    </div>
  );
};
