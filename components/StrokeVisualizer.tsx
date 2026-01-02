import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCcw } from 'lucide-react';

export interface StrokeData {
  char: string;
  paths: string[];
}

interface StrokeVisualizerProps {
  strokeData: StrokeData;
  size?: number;
  showControls?: boolean;
  autoPlay?: boolean;
}

export const StrokeVisualizer: React.FC<StrokeVisualizerProps> = ({ 
  strokeData, 
  size = 180, 
  showControls = true,
  autoPlay = false 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    // Reset state when character changes
    setCurrentStep(0);
    setIsPlaying(autoPlay);
  }, [strokeData.char, autoPlay]);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      if (currentStep > strokeData.paths.length) {
        setIsPlaying(false);
        setCurrentStep(strokeData.paths.length); // Keep full character
        return;
      }
      
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 800); // Speed of transition
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, strokeData.paths.length]);

  const togglePlay = () => {
    if (currentStep >= strokeData.paths.length) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-white border-4 border-slate-100 rounded-xl shadow-inner mb-4" style={{ width: size, height: size }}>
        {/* Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute w-full h-full" 
                style={{ backgroundImage: `linear-gradient(45deg, transparent 49.5%, #ef4444 49.5%, #ef4444 50.5%, transparent 50.5%), linear-gradient(-45deg, transparent 49.5%, #ef4444 49.5%, #ef4444 50.5%, transparent 50.5%)` }}>
            </div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-red-500 border-t border-dashed border-red-500/50"></div>
            <div className="absolute top-0 left-1/2 h-full w-px bg-red-500 border-l border-dashed border-red-500/50"></div>
        </div>
        
        {/* Ghost Character (Full) */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-10">
          {strokeData.paths.map((d, i) => (
             <path key={i} d={d} stroke="black" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          ))}
        </svg>

        {/* Animated Strokes */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          {strokeData.paths.map((d, i) => (
             <path 
               key={i} 
               d={d} 
               stroke={i < currentStep ? "#1e40af" : "transparent"} 
               strokeWidth="8" 
               strokeLinecap="round" 
               strokeLinejoin="round" 
               fill="none" 
               className="transition-all duration-300"
             />
          ))}
        </svg>
      </div>

      {showControls && (
        <>
          <div className="flex gap-2">
             <button 
               onClick={togglePlay}
               className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
             >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
             </button>
             <button 
               onClick={reset}
               className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
             >
                <RefreshCcw className="w-5 h-5" />
             </button>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">
             {currentStep === 0 ? "Nhấn Play để xem thứ tự" : 
              currentStep > strokeData.paths.length ? "Hoàn thành" : 
              `Nét thứ ${currentStep}`}
          </p>
        </>
      )}
    </div>
  );
};