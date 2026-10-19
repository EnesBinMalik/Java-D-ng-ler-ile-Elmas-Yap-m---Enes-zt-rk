import React, { useState } from 'react';
import { JAVA_TEMPLATES, JavaSnippet } from '../data/javaCodeTemplates';
import { Copy, Check, Download, FileCode, Info, Sparkles } from 'lucide-react';

export const CodeViewer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('diamond-symmetric');
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet: JavaSnippet =
    JAVA_TEMPLATES.find((t) => t.id === selectedId) || JAVA_TEMPLATES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeSnippet.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeSnippet.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Template Selection Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl">
        {JAVA_TEMPLATES.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedId === item.id
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>{item.title}</span>
          </button>
        ))}
      </div>

      {/* Code Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {/* Code Header Bar */}
        <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-950/70 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-slate-200">
              {activeSnippet.filename}
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-slate-400">{activeSnippet.badge}</span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-amber-400 font-medium">Hazırlayan: Enes Öztürk</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
              title="Java dosyasını indir"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.java İndir</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kodu Kopyala</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code View with Syntax Colors */}
        <div className="p-6 bg-slate-950 overflow-x-auto">
          <pre className="font-mono text-xs text-slate-200 leading-relaxed">
            <code>
              {activeSnippet.code.split('\n').map((line, idx) => {
                // Simple high-contrast token coloring
                let formattedLine = line;
                const isComment = line.trim().startsWith('//') || line.trim().startsWith('*') || line.trim().startsWith('/*') || line.trim().startsWith('/**') || line.trim().startsWith('*/');
                
                return (
                  <div key={idx} className="table-row hover:bg-slate-900/60 transition-colors">
                    <span className="table-cell pr-6 select-none text-slate-600 text-right w-10 text-[11px] tabular-nums">
                      {idx + 1}
                    </span>
                    <span
                      className={`table-cell whitespace-pre ${
                        isComment
                          ? 'text-slate-500 italic'
                          : line.includes('import ') || line.includes('public class ') || line.includes('public static void ') || line.includes('for (') || line.includes('int ') || line.includes('if (') || line.includes('else')
                          ? 'text-sky-300'
                          : line.includes('System.out.print')
                          ? 'text-amber-300 font-medium'
                          : line.includes('"')
                          ? 'text-emerald-300'
                          : 'text-slate-200'
                      }`}
                    >
                      {formattedLine}
                    </span>
                  </div>
                );
              })}
            </code>
          </pre>
        </div>

        {/* Code Description & Logic Explanation */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/40">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">
              {activeSnippet.explanation.title}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSnippet.explanation.points.map((pt, pIdx) => (
              <div
                key={pIdx}
                className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs text-slate-300 leading-relaxed"
              >
                <div className="text-amber-400 font-semibold mb-1">
                  Adım {pIdx + 1}
                </div>
                <div>{pt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
