
import React from 'react';
import { Card } from './Shared';
import { AnalyticsData } from '../types';
import { BarChart3, Users, Activity, FileText } from 'lucide-react';
import clsx from 'clsx';

export const AnalyticsDashboard = ({ data }: { data: AnalyticsData }) => {
  const maxConditionCount = Math.max(...Object.values(data.conditionsMap), 1);
  const topConditions = Object.entries(data.conditionsMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const maxActivity = Math.max(...data.activityByDate.map(d => d.count), 1);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-primary/10 border-primary/20">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-xl text-primary"><FileText size={20} /></div>
                <div>
                    <div className="text-2xl font-black text-white">{data.totalRecords}</div>
                    <div className="text-[10px] uppercase font-bold text-textSecondary">Total Records</div>
                </div>
            </div>
        </Card>
        <Card className="p-4 bg-secondary/10 border-secondary/20">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/20 rounded-xl text-secondary"><Users size={20} /></div>
                <div>
                    <div className="text-2xl font-black text-white">{Object.keys(data.demographics.gender).length}</div>
                    <div className="text-[10px] uppercase font-bold text-textSecondary">Unique Profiles</div>
                </div>
            </div>
        </Card>
        <Card className="p-4 bg-success/10 border-success/20">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-success/20 rounded-xl text-success"><Activity size={20} /></div>
                <div>
                    <div className="text-2xl font-black text-white">{data.typeDistribution.symptom || 0}</div>
                    <div className="text-[10px] uppercase font-bold text-textSecondary">Diagnoses</div>
                </div>
            </div>
        </Card>
        <Card className="p-4 bg-accent/10 border-accent/20">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/20 rounded-xl text-accent"><BarChart3 size={20} /></div>
                <div>
                    <div className="text-2xl font-black text-white">{data.activityByDate.length}</div>
                    <div className="text-[10px] uppercase font-bold text-textSecondary">Active Days</div>
                </div>
            </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
          {/* Top Conditions Chart */}
          <div className="glass-panel border border-white/5 rounded-2xl p-6">
              <h3 className="text-xs font-bold text-textSecondary uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Top Conditions
              </h3>
              <div className="space-y-4">
                  {topConditions.map(([name, count]) => (
                      <div key={name} className="relative">
                          <div className="flex justify-between text-xs font-bold text-white mb-1">
                              <span>{name}</span>
                              <span>{count}</span>
                          </div>
                          <div className="h-2 bg-surfaceHighlight rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                                style={{ width: `${(count / maxConditionCount) * 100}%` }}
                              ></div>
                          </div>
                      </div>
                  ))}
                  {topConditions.length === 0 && <div className="text-center text-xs text-textSecondary">No condition data yet.</div>}
              </div>
          </div>

          {/* Activity Timeline */}
          <div className="glass-panel border border-white/5 rounded-2xl p-6 flex flex-col">
              <h3 className="text-xs font-bold text-textSecondary uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> Patient Volume
              </h3>
              <div className="flex-1 flex items-end gap-2 h-48 border-b border-white/10 pb-2 px-2">
                  {data.activityByDate.slice(-14).map((d, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                          <div 
                            className="w-full bg-secondary/50 rounded-t-sm hover:bg-secondary transition-all"
                            style={{ height: `${(d.count / maxActivity) * 100}%`, minHeight: '4px' }}
                          ></div>
                          <div className="absolute -top-8 bg-surfaceHighlight text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-white/10 pointer-events-none">
                              {d.date}: {d.count}
                          </div>
                      </div>
                  ))}
                  {data.activityByDate.length === 0 && <div className="w-full text-center text-xs text-textSecondary self-center">No activity recorded.</div>}
              </div>
              <div className="flex justify-between text-[10px] text-textSecondary mt-2 font-mono uppercase">
                  <span>14 Days Ago</span>
                  <span>Today</span>
              </div>
          </div>
      </div>
    </div>
  );
};
