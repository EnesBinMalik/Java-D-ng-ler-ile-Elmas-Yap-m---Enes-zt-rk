import React from 'react';
import { Sparkles, Terminal, ArrowRight, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  onExploreCode: () => void;
  onExploreSimulator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCode,
  onExploreSimulator,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Main Headline & Context */}
          <div className="max-w-3xl">
            {/* Unboxed metadata without pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-3">
              <span className="text-amber-400 font-medium">Java Programlama</span>
              <span aria-hidden="true">·</span>
              <span>İç İçe For Döngüleri</span>
              <span aria-hidden="true">·</span>
              <span>Matematiksel Seri: (2i + 1)</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-200">Hazırlayan: Enes Öztürk</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              Java'da Döngüler ile <span className="text-amber-400">Yıldızlardan Elmas</span> Yapımı
            </h1>

            <p className="text-base text-slate-300 leading-relaxed mb-6 max-w-2xl">
              Ders örneğinde yapılan tek yönlü piramidin algoritması genişletilerek, tepe noktasından merkeze artan ve merkezden tabana eksilen simetrik elmas deseni oluşturulmuştur.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreSimulator}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shadow-sm"
              >
                <Terminal className="w-4 h-4" />
                İnteraktif Konsolu Dene
              </button>
              <button
                onClick={onExploreCode}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4" />
                Java Ödev Kodunu İncele
              </button>
            </div>
          </div>

          {/* Quick Preview Badge / Diamond Visual representation */}
          <div className="hidden lg:flex flex-col items-center justify-center p-6 bg-slate-900/60 border border-slate-800 rounded-xl min-w-[320px] shadow-inner">
            <div className="text-xs text-slate-400 mb-2 font-mono">Döngü Çıktısı (n = 4)</div>
            <pre className="font-mono text-xs text-amber-300/90 leading-tight select-none text-center bg-slate-950/80 px-6 py-4 rounded-lg border border-slate-800/80">
{`    *    
   ***   
  *****  
 ******* 
*********
 ******* 
  *****  
   ***   
    *    `}
            </pre>
            <div className="mt-3 text-[11px] text-slate-400 text-center font-mono">
              Hazırlayan: <span className="text-slate-200 font-semibold">Enes Öztürk</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
