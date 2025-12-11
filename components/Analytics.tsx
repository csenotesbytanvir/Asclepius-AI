
import React from 'react';
import { Card } from './Shared';
import { AnalyticsData } from '../types';
import { BarChart3, Users, Activity, FileText, Zap } from 'lucide-react';
import clsx from 'clsx';

export const AnalyticsDashboard = ({ data }: { data: AnalyticsData }) => {
  const maxConditionCount = Math.max(...Object.values(data.conditionsMap), 1);
  const topConditions = Object.entries(data.conditionsMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const maxActivity = Math.max(...data.activityByDate.map(d => d.count), 1) + 1; // Add padding
  const total = Object.values(data.typeDistribution).reduce((a, b) => a + b, 0) || 1;
  const types = Object.entries(data.typeDistribution);
  
  // Body Parts Sort
  const topBodyParts = Object.entries(data.bodyParts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  const maxBodyCount = Math.max(...Object.values(data.bodyParts), 1);

  // SVG Helper for Area Chart
  const generateAreaPath = (width: number, height: number) => {
      if (data.activityByDate.length === 0) return "";
      const stepX = width / (data.activityByDate.length - 1);
      
      let path = `M 0,${height} `; // Start bottom-left
      
      data.activityByDate.forEach((d, i) => {
          const x = i * stepX;
          const y = height - (d.count / maxActivity) * height;
          path += `L ${x},${y} `;
      });
      
      path += `L ${width},${height} Z`; // Close path
      return path;
  };
  
  const generateLinePath = (width: number, height: number) => {
      if (data.activityByDate.length === 0) return "";
      const stepX = width / (data.activityByDate.length - 1);
      
      let path = "";
      
      data.activityByDate.forEach((d, i) => {
          const x = i * stepX;
          const y = height - (d.count / maxActivity) * height;
          path += `${i === 0 ? 'M' : 'L'} ${x},${y} `;
      });
      return path;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* 1. KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20 hover:border-blue-500/40 group">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-500 group-hover:scale-110 transition-transform"><FileText size={24} /></div>
                <div>
                    <div className="text-3xl font-black text-textPrimary">{data.totalRecords}</div>
                    <div className="text-[10px] uppercase font-bold text-textSecondary tracking-wide">Encrypted Records</div>
                </div>
            </div>
        </Card>
        <Card className="p-5 bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20 hover:border-indigo-500/40 group">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-500 group-hover:scale-110 transition-transform"><Users size={24} /></div>
                <div>
                    <div className="text-3xl font-black text-textPrimary">
                        {Object.values(data.demographics.gender).reduce((a,b) => a+b, 0)}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-textSecondary tracking-wide">Unique Encounters</div>
                </div>
            </div>
        </Card>
        <Card className="p-5 bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20 hover:border-emerald-500/40 group">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-500 group-hover:scale-110 transition-transform"><Activity size={24} /></div>
                <div>
                    <div className="text-3xl font-black text-textPrimary">
                        {topConditions.length > 0 ? topConditions[0][1] : 0}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-textSecondary tracking-wide">Peak Pathology</div>
                </div>
            </div>
        </Card>
        <Card className="p-5 bg-gradient-to-br from-cyan-500/10 to-transparent border-cyan-500/20 hover:border-cyan-500/40 group">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-500 group-hover:scale-110 transition-transform"><Zap size={24} /></div>
                <div>
                    <div className="text-3xl font-black text-textPrimary">
                        {data.activityByDate.reduce((acc, curr) => acc + (curr.count > 0 ? 1 : 0), 0)}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-textSecondary tracking-wide">Active Days (2wk)</div>
                </div>
            </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
          {/* 2. Patient Volume (Area Chart) */}
          <div className="lg:col-span-2 glass-panel border border-border rounded-2xl p-6 flex flex-col shadow-lg">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xs font-bold text-textSecondary uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_5px_currentColor]"></span> Patient Volume (14 Days)
                  </h3>
                  <div className="text-[10px] font-mono text-textSecondary bg-surfaceHighlight px-2 py-1 rounded">
                      Max: {maxActivity - 1} / Day
                  </div>
              </div>
              
              <div className="flex-1 w-full h-48 relative">
                  {/* SVG Chart */}
                  <svg viewBox="0 0 1000 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <defs>
                          <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.5"/>
                              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0"/>
                          </linearGradient>
                      </defs>
                      
                      {/* Grid Lines */}
                      <line x1="0" y1="0" x2="1000" y2="0" stroke="var(--border-color)" strokeDasharray="4" />
                      <line x1="0" y1="100" x2="1000" y2="100" stroke="var(--border-color)" strokeDasharray="4" />
                      <line x1="0" y1="200" x2="1000" y2="200" stroke="var(--border-color)" strokeDasharray="4" />

                      {/* Area */}
                      <path d={generateAreaPath(1000, 200)} fill="url(#volumeGradient)" />
                      
                      {/* Line */}
                      <path d={generateLinePath(1000, 200)} fill="none" stroke="var(--color-primary)" strokeWidth="3" vectorEffect="non-scaling-stroke" />

                      {/* Points */}
                      {data.activityByDate.map((d, i) => {
                          const x = (i / (data.activityByDate.length - 1)) * 1000;
                          const y = 200 - (d.count / maxActivity) * 200;
                          return (
                              <circle key={i} cx={x} cy={y} r="4" className="fill-surface stroke-primary hover:r-6 transition-all cursor-pointer" strokeWidth="2" >
                                  <title>{d.label}: {d.count} Visits</title>
                              </circle>
                          );
                      })}
                  </svg>
              </div>
              
              <div className="flex justify-between mt-4 px-1">
                  {data.activityByDate.filter((_, i) => i % 2 === 0).map((d, i) => (
                      <span key={i} className="text-[10px] text-textSecondary font-mono">{d.label}</span>
                  ))}
              </div>
          </div>

          {/* 3. Demographics (Age Groups) */}
          <div className="glass-panel border border-border rounded-2xl p-6 flex flex-col shadow-lg">
             <h3 className="text-xs font-bold text-textSecondary uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_5px_currentColor]"></span> Age Demographics
             </h3>
             <div className="flex-1 flex flex-col justify-center gap-4">
                 {Object.entries(data.demographics.ageGroups).map(([group, count]) => {
                     const totalP = Object.values(data.demographics.ageGroups).reduce((a,b)=>a+b, 0) || 1;
                     const pct = (count / totalP) * 100;
                     return (
                         <div key={group} className="space-y-1">
                             <div className="flex justify-between text-xs font-bold text-textPrimary">
                                 <span>{group} Yrs</span>
                                 <span className="opacity-60">{count} ({Math.round(pct)}%)</span>
                             </div>
                             <div className="h-2 bg-surfaceHighlight rounded-full overflow-hidden">
                                 <div className="h-full bg-accent transition-all duration-1000" style={{ width: `${pct}%` }}></div>
                             </div>
                         </div>
                     )
                 })}
             </div>
             
             <div className="mt-6 pt-6 border-t border-border flex justify-between">
                 <div className="text-center">
                     <div className="text-xs text-textSecondary uppercase font-bold">Male</div>
                     <div className="text-lg font-black text-blue-400">{data.demographics.gender.Male || 0}</div>
                 </div>
                 <div className="w-px bg-border"></div>
                 <div className="text-center">
                     <div className="text-xs text-textSecondary uppercase font-bold">Female</div>
                     <div className="text-lg font-black text-pink-400">{data.demographics.gender.Female || 0}</div>
                 </div>
             </div>
          </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
          {/* 4. Top Pathologies (Horizontal Bars) */}
          <div className="glass-panel border border-border rounded-2xl p-6">
              <h3 className="text-xs font-bold text-textSecondary uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_5px_currentColor]"></span> Clinical Diagnoses
              </h3>
              <div className="space-y-4">
                  {topConditions.map(([name, count], i) => (
                      <div key={name} className="relative group">
                          <div className="flex justify-between text-xs font-bold text-textPrimary mb-1 z-10 relative">
                              <span className="truncate pr-4">{name}</span>
                              <span className="opacity-60 shrink-0">{count}</span>
                          </div>
                          <div className="h-8 bg-surfaceHighlight/30 rounded-lg overflow-hidden relative border border-white/5">
                               {/* Bar */}
                              <div 
                                className={clsx("h-full absolute top-0 left-0 transition-all duration-1000 ease-out opacity-20 group-hover:opacity-30", i === 0 ? "bg-secondary" : "bg-textSecondary")}
                                style={{ width: `${(count / maxConditionCount) * 100}%` }}
                              ></div>
                          </div>
                      </div>
                  ))}
                  {topConditions.length === 0 && <div className="text-center text-xs text-textSecondary py-4">No data available.</div>}
              </div>
          </div>
          
          {/* 5. Most Affected Body Regions (Heatmap List) */}
          <div className="glass-panel border border-border rounded-2xl p-6">
              <h3 className="text-xs font-bold text-textSecondary uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_5px_currentColor]"></span> Affected Regions
              </h3>
              <div className="space-y-2">
                  {topBodyParts.map(([part, count], i) => (
                      <div key={part} className="flex items-center gap-3 p-3 rounded-xl bg-surfaceHighlight/20 border border-border hover:bg-surfaceHighlight/40 transition-colors">
                          <div className={clsx(
                              "w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm",
                              i === 0 ? "bg-orange-500 text-white shadow-glow" : "bg-surfaceHighlight text-textSecondary"
                          )}>
                              {i + 1}
                          </div>
                          <div className="flex-1">
                              <div className="font-bold text-sm text-textPrimary">{part}</div>
                              <div className="h-1.5 bg-surfaceHighlight rounded-full mt-1.5 overflow-hidden w-full max-w-[100px]">
                                  <div className="h-full bg-orange-500" style={{ width: `${(count / maxBodyCount) * 100}%` }}></div>
                              </div>
                          </div>
                          <div className="text-lg font-black text-textSecondary opacity-50">
                              {count}
                          </div>
                      </div>
                  ))}
                  {topBodyParts.length === 0 && <div className="text-center text-xs text-textSecondary py-4">No anatomical data.</div>}
              </div>
          </div>
      </div>
    </div>
  );
};