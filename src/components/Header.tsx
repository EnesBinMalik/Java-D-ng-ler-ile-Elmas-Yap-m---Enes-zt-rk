import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal } from 'lucide-react';
import { JAVA_TEMPLATES } from '../data/javaCodeTemplates';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [copied, setCopied] = useState(false);

  const handleQuickCopy = () => {
    const primaryCode = JAVA_TEMPLATES[0].code;
    navigator.clipboard.writeText(primaryCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="text-base font-semibold tracking-tight text-white whitespace-nowrap">
            Java Loop Studio · Enes Öztürk
          </span>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'simulator' ? 'text-amber-400 font-semibold' : 'text-slate-400'
            }`}
          >
            İnteraktif Konsol
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'code' ? 'text-amber-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Java Kaynak Kodu
          </button>
          <button
            onClick={() => setActiveTab('debugger')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'debugger' ? 'text-amber-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Adım Adım İzleyici
          </button>
          <button
            onClick={() => setActiveTab('math')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'math' ? 'text-amber-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Algoritma Analizi
          </button>
          <button
            onClick={() => setActiveTab('signature')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'signature' ? 'text-amber-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Ödev Künyesi
          </button>
        </nav>

        {/* Zone 3: 1 Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleQuickCopy}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Java Kodunu Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
