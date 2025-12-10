import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, Button } from '../components/Shared';
import { cryptoService } from '../services/cryptoService';
import { RecordBase } from '../types';
import { Trash2, Search, FileLock, User } from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '../App';
import { I18N } from '../constants';

export const Records = () => {
  const { language } = useLanguage();
  const t = I18N[language];
  const [records, setRecords] = React.useState<RecordBase[]>([]);
  const [viewRecord, setViewRecord] = React.useState<RecordBase | null>(null);
  const [decryptedContent, setDecryptedContent] = React.useState<string | null>(null);
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
       // Handle structured or simple text
       const content = payload.rawAnalysis || payload.analysis || JSON.stringify(payload, null, 2);
       setDecryptedContent(content);
       setViewRecord(rec);
    } catch (e) {
       alert("Decryption failed.");
    }
  };

  const handleDelete = (id: string) => {
      if(confirm('Are you sure you want to delete this record locally?')) {
          localStorage.removeItem(`asclepius_rec_${id}`);
          loadRecords();
          setViewRecord(null);
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

  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col">
       <div className="mb-6">
           <h1 className="text-3xl font-black text-primary tracking-tight">{t.nav.records}</h1>
           <p className="text-textSecondary text-sm">{t.disclaimer.banner}</p>
       </div>

       <div className="flex-1 flex gap-6 min-h-0">
           {/* Sidebar List */}
           <div className="w-80 flex flex-col gap-4">
               <div className="bg-surface border border-white/5 rounded-xl p-3">
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

               <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                   {sortedRecords.length === 0 && (
                       <div className="text-center py-8 text-textSecondary text-xs">No records found.</div>
                   )}
                   {sortedRecords.map(rec => (
                       <div 
                         key={rec.id}
                         onClick={() => handleSelect(rec)}
                         className={clsx(
                             "p-4 rounded-xl border cursor-pointer transition-all group",
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
                               <span className="text-[10px] text-textSecondary font-mono">{new Date(rec.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                           </div>
                       </div>
                   ))}
               </div>
           </div>

           {/* Detail View */}
           <div className="flex-1 bg-surface border border-white/5 rounded-3xl p-8 relative overflow-hidden flex flex-col shadow-2xl">
               {viewRecord ? (
                   <>
                       <div className="flex justify-between items-start border-b border-textSecondary/20 pb-6 mb-6">
                           <div>
                               <h2 className="text-2xl font-bold text-textPrimary">{viewRecord.title}</h2>
                               <div className="flex items-center gap-4 mt-2">
                                   <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest">{viewRecord.type}</span>
                                   <span className="text-xs text-textSecondary font-mono">ID: {viewRecord.id.split('-')[0]}</span>
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
                       <div className="flex-1 overflow-y-auto prose prose-invert max-w-none">
                           <ReactMarkdown>{decryptedContent || ''}</ReactMarkdown>
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
    </div>
  );
};