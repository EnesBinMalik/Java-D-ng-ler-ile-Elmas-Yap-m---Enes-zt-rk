import React, { useState } from 'react';
import { generatePatternRows } from '../utils/patternGenerator';
import { Calculator, CheckCircle2, Split, ArrowUpDown } from 'lucide-react';

export const AlgorithmAnalysis: React.FC = () => {
  const [analysisN, setAnalysisN] = useState<number>(4);
  const rows = generatePatternRows(analysisN, 'diamond', '*');

  return (
    <div className="space-y-6">
      {/* 3 Pedagogical Principles Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-3">
            <Calculator className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white mb-1.5">
            1. Tek Sayılar Kuralı: (2 * i + 1)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Piramit ve elmasın dengeli olması için her satırda tek sayıda yıldız (1, 3, 5, 7, 9...) olmalıdır. i = 0 iken 1, i = 1 iken 3, i = 2 iken 5 yıldız basılır.
          </p>
        </div>

        <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
            <Split className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white mb-1.5">
            2. Merkezleme Boşluğu: (n - i)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Yıldızların piramit gibi görünmesi için sola boşluk eklenir. Tepe satırında maksimum n boşluk varken, merkez satırda (n - n = 0) hiç boşluk kalmaz.
          </p>
        </div>

        <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
            <ArrowUpDown className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white mb-1.5">
            3. Ayna Simetrisi: i = (n - 1) .. 0
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Enes Öztürk ödev çözümünde alt yarı için formülleri değiştirmek yerine döngü sayacını tersine çevirerek (n-1'den 0'a) aynı temiz formülleri yeniden kullanırız.
          </p>
        </div>
      </div>

      {/* Dynamic Table Card */}
      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Dinamik Döngü İterasyon Tablosu
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Seçilen n değeri için her satırdaki değişken durumları ve üretilen çıktılar.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">n Değeri:</span>
            {[3, 4, 5, 6].map((val) => (
              <button
                key={val}
                onClick={() => setAnalysisN(val)}
                className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                  analysisN === val
                    ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                n = {val}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-3">Satır #</th>
                <th className="py-2.5 px-3">Bölüm</th>
                <th className="py-2.5 px-3">Sayaç (i)</th>
                <th className="py-2.5 px-3">Boşluk Hesabı (n - i)</th>
                <th className="py-2.5 px-3">Yıldız Hesabı (2*i + 1)</th>
                <th className="py-2.5 px-3 font-sans">Satır Çıktısı</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {rows.map((r, idx) => {
                const isCenter = r.section === 'center';
                const isUpper = r.section === 'upper';
                return (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-850/50 transition-colors ${
                      isCenter ? 'bg-amber-400/5' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 text-slate-400 tabular-nums">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`text-[11px] font-sans font-medium ${
                          isCenter
                            ? 'text-amber-300 font-semibold'
                            : isUpper
                            ? 'text-sky-300'
                            : 'text-emerald-300'
                        }`}
                      >
                        {isCenter ? 'Merkez Satır' : isUpper ? 'Üst Piramit' : 'Alt Piramit'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-200 font-bold tabular-nums">
                      {r.i}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {analysisN} - {r.i} = <span className="font-bold text-white">{r.spaces}</span>
                    </td>
                    <td className="py-2.5 px-3 text-amber-300">
                      2 * {r.i} + 1 = <span className="font-bold text-amber-400">{r.stars}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 bg-slate-950 text-amber-300 rounded border border-slate-800 whitespace-pre text-[11px]">
                        {r.content}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
