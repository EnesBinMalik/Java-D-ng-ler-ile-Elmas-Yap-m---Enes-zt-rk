import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InteractiveVisualizer } from './components/InteractiveVisualizer';
import { CodeViewer } from './components/CodeViewer';
import { StepDebugger } from './components/StepDebugger';
import { AlgorithmAnalysis } from './components/AlgorithmAnalysis';
import { AuthorSignature } from './components/AuthorSignature';
import { Terminal, Code2, PlayCircle, BarChart3, UserCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('simulator');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Section */}
      <HeroSection
        onExploreCode={() => setActiveTab('code')}
        onExploreSimulator={() => setActiveTab('simulator')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'simulator'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>İnteraktif Konsol & Matris</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'code'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Java Kaynak Kodu (.java)</span>
          </button>

          <button
            onClick={() => setActiveTab('debugger')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'debugger'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <PlayCircle className="w-4 h-4" />
            <span>Adım Adım Döngü İzleyici</span>
          </button>

          <button
            onClick={() => setActiveTab('math')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'math'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Algoritma Mantığı & Tablo</span>
          </button>

          <button
            onClick={() => setActiveTab('signature')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'signature'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Ödev Künyesi & İmza</span>
          </button>
        </div>

        {/* Tab Views */}
        {activeTab === 'simulator' && <InteractiveVisualizer />}
        {activeTab === 'code' && <CodeViewer />}
        {activeTab === 'debugger' && <StepDebugger />}
        {activeTab === 'math' && <AlgorithmAnalysis />}
        {activeTab === 'signature' && <AuthorSignature />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 px-4 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            Java ile Yıldızlardan Elmas Yapımı Ödev Çözümü
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Hazırlayan & Geliştirici:</span>
            <span className="font-semibold text-slate-200">Enes Öztürk</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
