import React, { useState, useEffect, useRef } from 'react';
import { buildSimulationSteps } from '../utils/patternGenerator';
import { SimulationStep } from '../types';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Activity } from 'lucide-react';

export const StepDebugger: React.FC = () => {
  const [n, setN] = useState<number>(4);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 1x, 2x, 4x
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const steps = React.useMemo(() => buildSimulationSteps(n, '*'), [n]);
  const currentStep: SimulationStep = steps[currentStepIndex] || steps[0];

  // Auto-play effect
  useEffect(() => {
    if (isPlaying) {
      const delay = Math.max(100, Math.floor(400 / speed));
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, steps.length]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleNChange = (newN: number) => {
    setIsPlaying(false);
    setN(newN);
    setCurrentStepIndex(0);
  };

  // Progress percentage
  const progressPercent = Math.round((currentStepIndex / (steps.length - 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Top Controller Bar */}
      <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Parameter Picker */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-slate-300">Parametre (n):</span>
            <div className="flex items-center gap-1.5">
              {[2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleNChange(val)}
                  className={`px-3 py-1 text-xs font-mono font-medium rounded border transition-colors ${
                    n === val
                      ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  n = {val}
                </button>
              ))}
            </div>
            <span className="text-xs text-slate-400">
              (İzleyici için 3 veya 4 idealdir)
            </span>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 border border-slate-700 rounded-lg transition-colors"
              title="Başa Dön"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-800 disabled:opacity-40 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <SkipBack className="w-3.5 h-3.5" />
              <span>Geri</span>
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors shadow-sm ${
                isPlaying
                  ? 'bg-rose-500 hover:bg-rose-600 text-white'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Duraklat</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Otomatik Oynat</span>
                </>
              )}
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIndex >= steps.length - 1}
              className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-800 disabled:opacity-40 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <span>İleri</span>
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            {/* Speed Selector */}
            <div className="flex items-center gap-1 ml-3 p-1 bg-slate-950 border border-slate-800 rounded-lg">
              {[0.5, 1, 2, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                    speed === s
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-mono">
            <span>
              Adım {currentStepIndex + 1} / {steps.length}
            </span>
            <span className="text-amber-400 font-semibold">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Visual Simulator + Code Trace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Live Canvas & Variable Inspector */}
        <div className="lg:col-span-7 space-y-6">
          {/* Current Step Description Card */}
          <div className="p-4 bg-slate-900/90 border border-amber-500/30 rounded-xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
              <Activity className="w-4 h-4" />
              <span>Döngü İşlem Durumu:</span>
            </div>
            <div className="text-sm font-medium text-slate-100">
              {currentStep.description}
            </div>
          </div>

          {/* Variable Inspector Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-center">
              <div className="text-[11px] text-slate-400 mb-0.5">Döngü Bölümü</div>
              <div className="text-xs font-bold text-sky-400">
                {currentStep.section === 'upper' ? 'Üst Piramit' : 'Alt Piramit'}
              </div>
            </div>
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-center">
              <div className="text-[11px] text-slate-400 mb-0.5">Satır İndeksi (i)</div>
              <div className="text-base font-mono font-bold text-amber-400 tabular-nums">
                {currentStep.i}
              </div>
            </div>
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-center">
              <div className="text-[11px] text-slate-400 mb-0.5">Boşluk (n - i)</div>
              <div className="text-base font-mono font-bold text-slate-200 tabular-nums">
                {currentStep.currentRowSpaces} / {currentStep.targetSpaces}
              </div>
            </div>
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-center">
              <div className="text-[11px] text-slate-400 mb-0.5">Yıldız (2*i + 1)</div>
              <div className="text-base font-mono font-bold text-amber-400 tabular-nums">
                {currentStep.currentRowStars} / {currentStep.targetStars}
              </div>
            </div>
          </div>

          {/* Animated Canvas */}
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl min-h-[260px] flex flex-col justify-start">
            <div className="text-xs text-slate-400 font-mono mb-3 pb-2 border-b border-slate-850 flex items-center justify-between">
              <span>Canlı Çıktı Ekranı</span>
              <span className="text-slate-400">Hazırlayan: Enes Öztürk</span>
            </div>

            <div className="font-mono text-sm leading-snug">
              {currentStep.completedRows.map((rowStr, idx) => (
                <div key={idx} className="text-amber-400/90 whitespace-pre">
                  {rowStr}
                </div>
              ))}

              {/* Current actively drawing row */}
              {currentStep.phase !== 'complete' && (
                <div className="text-amber-300 font-bold whitespace-pre flex items-center">
                  <span>{currentStep.currentRowBuffer}</span>
                  <span className="w-2 h-4 bg-amber-400 inline-block ml-0.5 animate-pulse"></span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Code Line Pointer */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-5 font-mono text-xs shadow-sm">
          <div className="text-xs font-sans font-semibold text-slate-200 pb-3 mb-3 border-b border-slate-800 flex items-center justify-between">
            <span>Yürütülen Java Kod Bloğu</span>
            <span className="text-[11px] text-amber-400 font-mono">Satır İşaretçisi</span>
          </div>

          <div className="space-y-1.5 leading-relaxed">
            <div
              className={`p-1.5 rounded transition-colors ${
                currentStep.activeCodeLine === 1
                  ? 'bg-amber-400/20 text-amber-300 border-l-2 border-amber-400 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              for (int i = 0; i &lt;= n; i++) &#123;
            </div>
            <div
              className={`pl-4 p-1.5 rounded transition-colors ${
                currentStep.activeCodeLine === 2
                  ? 'bg-amber-400/20 text-amber-300 border-l-2 border-amber-400 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              for (int j = 0; j &lt; (n - i); j++) &#123; System.out.print(" "); &#125;
            </div>
            <div
              className={`pl-4 p-1.5 rounded transition-colors ${
                currentStep.activeCodeLine === 3
                  ? 'bg-amber-400/20 text-amber-300 border-l-2 border-amber-400 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              for (int k = 1; k &lt;= (2 * i + 1); k++) &#123; System.out.print("*"); &#125;
            </div>
            <div
              className={`pl-4 p-1.5 rounded transition-colors ${
                currentStep.activeCodeLine === 4
                  ? 'bg-amber-400/20 text-amber-300 border-l-2 border-amber-400 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              System.out.println();
            </div>
            <div className="text-slate-600">&#125;</div>

            <div className="py-1 text-slate-700 text-[10px]">
              // Alt Piramit Simetrisi
            </div>

            <div
              className={`p-1.5 rounded transition-colors ${
                currentStep.activeCodeLine === 5
                  ? 'bg-amber-400/20 text-amber-300 border-l-2 border-amber-400 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              for (int i = n - 1; i &gt;= 0; i--) &#123;
            </div>
            <div
              className={`pl-4 p-1.5 rounded transition-colors ${
                currentStep.activeCodeLine === 6
                  ? 'bg-amber-400/20 text-amber-300 border-l-2 border-amber-400 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              for (int j = 0; j &lt; (n - i); j++) &#123; System.out.print(" "); &#125;
            </div>
            <div
              className={`pl-4 p-1.5 rounded transition-colors ${
                currentStep.activeCodeLine === 7
                  ? 'bg-amber-400/20 text-amber-300 border-l-2 border-amber-400 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              for (int k = 1; k &lt;= (2 * i + 1); k++) &#123; System.out.print("*"); &#125;
            </div>
            <div
              className={`pl-4 p-1.5 rounded transition-colors ${
                currentStep.activeCodeLine === 8
                  ? 'bg-amber-400/20 text-amber-300 border-l-2 border-amber-400 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              System.out.println();
            </div>
            <div className="text-slate-600">&#125;</div>
          </div>
        </div>
      </div>
    </div>
  );
};
