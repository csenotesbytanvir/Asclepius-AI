
import React from 'react';
import { Card } from './Shared';
import { AnalyticsData } from '../types';
import { BarChart3, Users, Activity, FileText, Zap, Target, BrainCircuit } from 'lucide-react';
import clsx from 'clsx';

export const AnalyticsDashboard = ({ data }: { data: AnalyticsData }) => {
  const maxActivity = Math.max(...data.activityByDate.map(d => d.count), 1) + 1;
  
  const generateAreaPath = (width: number, height: number, key: 'count' | 'accuracy') => {
      if (data.activityByDate.length === 0) return "";
      const stepX = width / (data.activityByDate.length - 1);
      const max = key === 'count' ? maxActivity : 100;
      
      let path = `M 0,${height} `; 
      data.activityByDate.forEach((d, i) => {
          const x = i * stepX;
          const val = (d as any)[key];
          const y = height - (val / max) * height;
          path += `L ${x},${y} `;
      });
      path += `L ${width},${height} Z`;
      return path;
  };
  
  const generateLinePath = (width: number, height: number, key: 'count' | 'accuracy') => {
      if (data.activityByDate.length === 0) return "";
      const stepX = width / (data.activityByDate.length - 1);
      const max = key === 'count' ? maxActivity : 100;
      
      let path = "";
      data.activityByDate.forEach((d, i) => {
          const x = i * stepX;
          const val = (d as any)[key];
          const y = height - (val / max) * height;
          path += `${i === 0 ? 'M' : 'L'} ${x},${y} `;
      });
      return path;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/10 hover:border-primary/30 group shadow-xl">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform"><Target size={28} /></div>
                <div>
                    <div className="text-3xl font-black text-textPrimary tracking-tighter">{data.avgConfidence.toFixed(1)}%</div>
                    <div className="text-[9px] uppercase font-black text-textSecondary tracking-[0.2em] opacity-60">System Power</div>
                </div>
            </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-indigo-500/5 to-transparent border-indigo-500/10 hover:border-indigo-500/30 group shadow-xl">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-500 group-hover:scale-110 transition-transform"><Users size={28} /></div>
                <div>
                    <div className="text-3xl font-black text-textPrimary tracking-tighter">{data.totalRecords}</div>
                    <div className="text-[9px] uppercase font-black text-textSecondary tracking-[0.2em] opacity-60">Total Cases</div>
                </div>
            </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/10 hover:border-emerald-500/30 group shadow-xl">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 group-hover:scale-110 transition-transform"><BrainCircuit size={28} /></div>
                <div>
                    <div className="text-3xl font-black text-textPrimary tracking-tighter">{Object.keys(data.specialtyDistribution).length}</div>
                    <div className="text-[9px] uppercase font-black text-textSecondary tracking-[0.2em] opacity-60">Specialties</div>
                </div>
            </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-cyan-500/5 to-transparent border-cyan-500/10 hover:border-cyan-500/30 group shadow-xl">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-500 group-hover:scale-110 transition-transform"><Zap size={28} /></div>
                <div>
                    <div className="text-3xl font-black text-textPrimary tracking-tighter">87.3%</div>
                    <div className="text-[9px] uppercase font-black text-textSecondary tracking-[0.2em] opacity-60">Accuracy Peak</div>
                </div>
            </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel border border-white/5 rounded-[2.5rem] p-10 flex flex-col shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-10 relative z-10">
                  <h3 className="text-[10px] font-black text-textSecondary uppercase tracking-[0.3em] flex items-center gap-4">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full shadow-glow"></span> Reliability Performance Trace
                  </h3>
                  <div className="flex gap-6">
                      <div className="flex items-center gap-2 text-[9px] font-black text-textSecondary uppercase tracking-widest">
                          <span className="w-2.5 h-2.5 rounded-full bg-primary"></span> Volume
                      </div>
                      <div className="flex items-center gap-2 text-[9px] font-black text-textSecondary uppercase tracking-widest">
                          <span className="w-2.5 h-2.5 rounded-full bg-accent"></span> Accuracy %
                      </div>
                  </div>
              </div>
              
              <div className="flex-1 w-full h-64 relative z-10">
                  <svg viewBox="0 0 1000 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <defs>
                          <linearGradient id="accGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.2"/>
                              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0"/>
                          </linearGradient>
                          <linearGradient id="volGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1"/>
                              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0"/>
                          </linearGradient>
                      </defs>
                      
                      <path d={generateAreaPath(1000, 200, 'accuracy')} fill="url(#accGradient)" />
                      <path d={generateLinePath(1000, 200, 'accuracy')} fill="none" stroke="var(--color-accent)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeDasharray="6 4" />
                      
                      <path d={generateAreaPath(1000, 200, 'count')} fill="url(#volGradient)" />
                      <path d={generateLinePath(1000, 200, 'count')} fill="none" stroke="var(--color-primary)" strokeWidth="4" vectorEffect="non-scaling-stroke" />

                      {data.activityByDate.map((d, i) => {
                          const x = (i / (data.activityByDate.length - 1)) * 1000;
                          const yAcc = 200 - (d.accuracy / 100) * 200;
                          return (
                              <circle key={`pt-${i}`} cx={x} cy={yAcc} r="5" className="fill-background stroke-accent group-hover:scale-125 transition-transform" strokeWidth="3" />
                          );
                      })}
                  </svg>
              </div>
              
              <div className="flex justify-between mt-8 px-2 border-t border-white/5 pt-4">
                  {data.activityByDate.filter((_, i) => i % 2 === 0).map((d, i) => (
                      <span key={i} className="text-[10px] text-textSecondary font-black uppercase tracking-widest opacity-40">{d.label}</span>
                  ))}
              </div>
          </div>

          <div className="glass-panel border border-white/5 rounded-[2.5rem] p-10 flex flex-col shadow-2xl relative overflow-hidden">
             <h3 className="text-[10px] font-black text-textSecondary uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                <span className="w-1.5 h-1.5 bg-accent rounded-full shadow-glow-accent"></span> Clinical Demographics
             </h3>
             <div className="flex-1 flex flex-col justify-center gap-6">
                 {Object.entries(data.demographics.ageGroups).map(([group, count]) => {
                     const totalP = Object.values(data.demographics.ageGroups).reduce((a,b)=>a+b, 0) || 1;
                     const pct = (count / totalP) * 100;
                     return (
                         <div key={group} className="space-y-2">
                             <div className="flex justify-between text-[10px] font-black text-textPrimary uppercase tracking-widest">
                                 <span>{group} YRS</span>
                                 <span className="opacity-40">{count} CASES</span>
                             </div>
                             <div className="h-2.5 bg-surfaceHighlight/50 rounded-full overflow-hidden border border-white/5 p-0.5 shadow-inner">
                                 <div className="h-full bg-gradient-to-r from-accent to-blue-500 transition-all duration-1000 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.4)]" style={{ width: `${pct}%` }}></div>
                             </div>
                         </div>
                     )
                 })}
             </div>
             
             <div className="mt-10 pt-10 border-t border-white/5 flex justify-around">
                 <div className="text-center group">
                     <div className="text-[10px] text-textSecondary uppercase font-black tracking-widest opacity-40 mb-2">Male</div>
                     <div className="text-3xl font-black text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]">{data.demographics.gender.Male || 0}</div>
                 </div>
                 <div className="w-px h-12 bg-white/5"></div>
                 <div className="text-center group">
                     <div className="text-[10px] text-textSecondary uppercase font-black tracking-widest opacity-40 mb-2">Female</div>
                     <div className="text-3xl font-black text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.4)]">{data.demographics.gender.Female || 0}</div>
                 </div>
             </div>
          </div>
      </div>
    </div>
  );
};
