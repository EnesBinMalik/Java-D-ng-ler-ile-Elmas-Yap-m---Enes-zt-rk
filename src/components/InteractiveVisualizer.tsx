import React, { useState } from 'react';
import { PatternType } from '../types';
import { generatePatternRows, generateAsciiArt } from '../utils/patternGenerator';
import { Play, Copy, Check, Terminal, Grid3X3, RotateCcw, Sliders } from 'lucide-react';

export const InteractiveVisualizer: React.FC = () => {
  const [n, setN] = useState<number>(5);
  const [pattern, setPattern] = useState<PatternType>('diamond');
  const [starChar, setStarChar] = useState<string>('*');
  const [customChar, setCustomChar] = useState<string>('');
  const [activeView, setActiveView] = useState<'matrix' | 'terminal'>('matrix');
  const [copied, setCopied] = useState<boolean>(false);
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number; char: string; i: number } | null>(null);

  const activeChar = customChar ? customChar.slice(0, 2) : starChar;
  const rows = generatePatternRows(n, pattern, activeChar);
  const rawAscii = generateAsciiArt(n, pattern, activeChar);

  // Statistics calculation
  const totalRows = rows.length;
  const totalStars = rows.reduce((acc, r) => acc + (r.isHollow ? (r.stars > 1 ? 2 : 1) : r.stars), 0);
  const maxRowWidth = Math.max(...rows.map((r) => r.spaces + r.stars), 1);

  const handleCopyAscii = () => {
    navigator.clipboard.writeText(rawAscii);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Parameters & Configuration Card */}
      <div className="p-5 lg:p-6 bg-slate-900/70 border border-slate-800 rounded-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Slider & Number Selector */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="n-slider" className="text-sm font-semibold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Satır Parametresi (n Değeri):</span>
                <span className="font-mono text-amber-400 font-bold text-base px-2 py-0.5 bg-amber-400/10 rounded">
                  {n}
                </span>
              </label>
              <span className="text-xs text-slate-400">
                Aralık: 1 — 12 (Ödev için tavsiye: 5 veya 6)
              </span>
            </div>
            <div className="flex items-center gap-4">
              <input
                id="n-slider"
                type="range"
                min="1"
                max="12"
                value={n}
                onChange={(e) => setN(parseInt(e.target.value) || 1)}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex items-center gap-1 shrink-0">
                {[3, 5, 7].map((val) => (
                  <button
                    key={val}
                    onClick={() => setN(val)}
                    className={`px-2.5 py-1 text-xs font-mono font-medium rounded border transition-colors ${
                      n === val
                        ? 'bg-amber-400/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    n={val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Pattern Switcher */}
          <div className="space-y-2 shrink-0">
            <div className="text-xs font-medium text-slate-400">Desen Türü:</div>
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-950/70 border border-slate-800 rounded-lg">
              <button
                onClick={() => setPattern('diamond')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  pattern === 'diamond'
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Elmas (Ödev)
              </button>
              <button
                onClick={() => setPattern('triangle')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  pattern === 'triangle'
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Piramit (Ders)
              </button>
              <button
                onClick={() => setPattern('hollow_diamond')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  pattern === 'hollow_diamond'
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                İçi Boş Elmas
              </button>
              <button
                onClick={() => setPattern('hourglass')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  pattern === 'hourglass'
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Kum Saati
              </button>
            </div>
          </div>
        </div>

        {/* Character Picker Row */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-400">Yıldız Karakteri:</span>
            <div className="flex items-center gap-1.5">
              {['*', '◆', '★', '✦', '■', '▲'].map((char) => (
                <button
                  key={char}
                  onClick={() => {
                    setStarChar(char);
                    setCustomChar('');
                  }}
                  className={`w-7 h-7 flex items-center justify-center text-sm font-mono rounded transition-colors ${
                    starChar === char && !customChar
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="custom-char-input" className="text-xs text-slate-400">Özel Karakter:</label>
            <input
              id="custom-char-input"
              type="text"
              maxLength={2}
              placeholder="örn: @"
              value={customChar}
              onChange={(e) => setCustomChar(e.target.value)}
              className="w-16 px-2 py-1 text-xs font-mono bg-slate-950 border border-slate-700 rounded text-center text-amber-300 focus:outline-none focus:border-amber-400"
            />
            {customChar && (
              <button
                onClick={() => setCustomChar('')}
                className="text-xs text-slate-500 hover:text-slate-300"
                title="Sıfırla"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Display Area (Tabs for Matrix vs Terminal) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {/* Top toolbar */}
        <div className="px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('matrix')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeView === 'matrix'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5 text-amber-400" />
              Görsel Koordinat Matrisi
            </button>
            <button
              onClick={() => setActiveView('terminal')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeView === 'terminal'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              Sanal Java Terminali
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyAscii}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Çıktıyı Kopyala</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* View 1: Interactive Matrix Grid */}
        {activeView === 'matrix' ? (
          <div className="p-6">
            <div className="flex flex-col items-center justify-center overflow-x-auto py-4">
              <div className="inline-block min-w-fit font-mono text-center">
                {rows.map((row) => {
                  const chars = row.content.split('');
                  const isCenter = row.section === 'center';
                  const isUpper = row.section === 'upper';

                  return (
                    <div
                      key={row.rowIndex}
                      className="flex items-center justify-center my-0.5 group"
                    >
                      {/* Row index indicator */}
                      <span className="w-16 text-right pr-4 text-[10px] font-mono text-slate-400 select-none group-hover:text-amber-400">
                        {isCenter ? 'Merkez' : `${isUpper ? 'Üst' : 'Alt'} i=${row.i}`}
                      </span>

                      {/* Character cells */}
                      <div className="flex items-center justify-center">
                        {chars.map((ch, colIdx) => {
                          const isStar = ch !== ' ';
                          return (
                            <span
                              key={colIdx}
                              onMouseEnter={() =>
                                setHoveredCell({
                                  row: row.rowIndex,
                                  col: colIdx,
                                  char: ch,
                                  i: row.i,
                                })
                              }
                              onMouseLeave={() => setHoveredCell(null)}
                              className={`w-6 h-6 flex items-center justify-center text-sm font-bold select-none transition-all rounded-sm ${
                                isStar
                                  ? isCenter
                                    ? 'text-amber-300 bg-amber-500/20 ring-1 ring-amber-400/50 shadow-sm shadow-amber-500/10'
                                    : isUpper
                                    ? 'text-sky-300 bg-sky-500/15 ring-1 ring-sky-500/30'
                                    : 'text-amber-300 bg-amber-500/15 ring-1 ring-amber-500/30'
                                  : 'text-transparent hover:bg-slate-800/40'
                              }`}
                            >
                              {ch === ' ' ? '·' : ch}
                            </span>
                          );
                        })}
                      </div>

                      {/* Row stats */}
                      <span className="w-24 text-left pl-4 text-[10px] font-mono text-slate-400 select-none group-hover:text-slate-300">
                        {row.spaces}b + {row.stars}y
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hovered cell info footer */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-sky-500/30 ring-1 ring-sky-400/50"></span>
                  <span>Üst Piramit Döngüsü (i = 0..n)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/30 ring-1 ring-amber-400/50"></span>
                  <span>Alt Piramit Döngüsü (i = n-1..0)</span>
                </span>
              </div>
              <div>
                {hoveredCell ? (
                  <span className="text-amber-300 font-mono">
                    Hücre: [Satır {hoveredCell.row + 1}, Sütun {hoveredCell.col + 1}] — Karakter:{' '}
                    {hoveredCell.char === ' ' ? 'Boşluk (j döngüsü)' : `Yıldız '${hoveredCell.char}' (k döngüsü)`}
                  </span>
                ) : (
                  <span>Hücre detaylarını görmek için farenizi yıldızların üzerine getirin.</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* View 2: Virtual Java Terminal */
          <div className="p-6 bg-slate-950 font-mono text-xs leading-relaxed">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-800 text-slate-400">
              <span className="w-3 h-3 rounded-full bg-rose-500/70 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/70 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/70 inline-block"></span>
              <span className="ml-2 text-slate-400">bash — openjdk version "21.0.2"</span>
            </div>

            <div className="space-y-1 text-slate-300">
              <div className="text-slate-400">$ javac Main.java</div>
              <div className="text-slate-400">$ java Main</div>
              <div className="text-amber-400 pt-2 font-semibold">==========================================</div>
              <div className="text-amber-300 font-semibold">   YILDIZLAR İLE ELMAS YAPIMI PROGRAMI    </div>
              <div className="text-slate-200">         Hazırlayan: Enes Öztürk          </div>
              <div className="text-amber-400 font-semibold">==========================================</div>
              <div className="text-slate-100 flex items-center gap-1">
                <span>Bir Sayı Giriniz :</span>
                <span className="text-emerald-400 font-bold">{n}</span>
              </div>
              <div className="py-2 text-amber-300 whitespace-pre">
                {rawAscii}
              </div>
              <div className="text-amber-400 font-semibold">------------------------------------------</div>
              <div className="text-slate-400">Kod Tamamlandı! Hazırlayan: Enes Öztürk</div>
              <div className="pt-2 text-slate-400">
                <span>$ </span>
                <span className="w-2 h-4 bg-amber-400 inline-block align-middle animate-pulse"></span>
              </div>
            </div>
          </div>
        )}

        {/* Statistical Summary Strip */}
        <div className="px-6 py-3.5 bg-slate-950/80 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-slate-400">Toplam Satır: </span>
              <span className="font-mono font-semibold text-white tabular-nums">{totalRows}</span>
            </div>
            <div>
              <span className="text-slate-400">Toplam Yıldız: </span>
              <span className="font-mono font-semibold text-amber-400 tabular-nums">{totalStars}</span>
            </div>
            <div>
              <span className="text-slate-400">Merkez Genişliği: </span>
              <span className="font-mono font-semibold text-white tabular-nums">{2 * n + 1} karakter</span>
            </div>
          </div>
          <div className="text-slate-400">
            Formül: <span className="font-mono text-slate-200">2n + 1 = {2 * n + 1} satır</span>
          </div>
        </div>
      </div>
    </div>
  );
};
