import React, { useState } from 'react';
import clsx from 'clsx';

interface BodyMapProps {
  onSelect: (part: string) => void;
  selectedPart: string | null;
}

export const BodyMap: React.FC<BodyMapProps> = ({ onSelect, selectedPart }) => {
  const [view, setView] = useState<'front' | 'back'>('front');

  const frontParts = [
    { id: 'head', label: 'Head & Face' },
    { id: 'neck', label: 'Neck' },
    { id: 'chest', label: 'Chest' },
    { id: 'abdomen', label: 'Abdomen' },
    { id: 'arms', label: 'Arms & Hands' },
    { id: 'legs', label: 'Legs & Feet' },
    { id: 'skin', label: 'General Skin' },
    { id: 'general', label: 'Whole Body' },
  ];

  const backParts = [
    { id: 'head', label: 'Head (Rear)' },
    { id: 'neck', label: 'Neck (Spine)' },
    { id: 'back', label: 'Upper Back' },
    { id: 'back', label: 'Lower Back' },
    { id: 'back', label: 'Spine' },
    { id: 'legs', label: 'Legs (Rear)' },
    { id: 'skin', label: 'General Skin' },
    { id: 'general', label: 'Whole Body' },
  ];

  const currentParts = view === 'front' ? frontParts : backParts;

  return (
    <div className="flex flex-col items-center w-full">
      {/* View Toggle */}
      <div className="bg-surfaceHighlight/30 backdrop-blur-sm p-1.5 rounded-2xl mb-8 shadow-lg border border-white/5 w-full max-w-sm flex">
         <button 
           onClick={() => setView('front')}
           className={clsx(
             "flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2",
             view === 'front' 
               ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-glow" 
               : "text-textSecondary hover:text-white hover:bg-white/5"
           )}
         >
           Front View
         </button>
         <button 
           onClick={() => setView('back')}
           className={clsx(
             "flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2",
             view === 'back' 
               ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-glow" 
               : "text-textSecondary hover:text-white hover:bg-white/5"
           )}
         >
           Back View
         </button>
      </div>

      {/* Grid of Parts - Text Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
         {currentParts.map((part, index) => (
             <button
                key={`${part.id}-${index}`}
                onClick={() => onSelect(part.id)}
                className={clsx(
                    "group relative h-32 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center overflow-hidden",
                    selectedPart === part.id 
                      ? "border-accent bg-gradient-to-br from-accent/20 to-primary/20 shadow-glow-accent -translate-y-2 scale-105" 
                      : "border-white/5 bg-surfaceHighlight/20 backdrop-blur-sm hover:bg-surfaceHighlight/40 hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl"
                )}
             >
                {/* Background Glow Effect on Hover */}
                <div className={clsx(
                    "absolute inset-0 bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent opacity-0 transition-opacity duration-500",
                    selectedPart === part.id ? "opacity-100" : "group-hover:opacity-100"
                )}></div>

                {/* Label */}
                <div className="text-center relative z-10 p-4">
                    <span className={clsx(
                        "block font-black text-lg tracking-tight transition-colors duration-300",
                        selectedPart === part.id ? "text-white drop-shadow-md" : "text-textSecondary group-hover:text-white"
                    )}>
                        {part.label}
                    </span>
                    <span className={clsx(
                         "text-[10px] uppercase tracking-widest mt-2 block transition-all duration-300",
                         selectedPart === part.id ? "text-accent font-bold" : "text-textSecondary/50 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2"
                    )}>
                        Select Region
                    </span>
                </div>

                {/* Active Indicator Bar */}
                {selectedPart === part.id && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent shadow-[0_-2px_10px_cyan]" />
                )}
             </button>
         ))}
      </div>
    </div>
  );
};