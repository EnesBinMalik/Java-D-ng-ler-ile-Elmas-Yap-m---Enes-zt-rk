import React, { useState } from 'react';
import { Award, CheckCircle, Terminal, Copy, Check, BookOpen } from 'lucide-react';

export const AuthorSignature: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const signatureText = `==========================================
   YILDIZLAR İLE ELMAS YAPIMI PROGRAMI    
         Hazırlayan: Enes Öztürk          
==========================================`;

  const handleCopySig = () => {
    navigator.clipboard.writeText(signatureText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Primary Signature Card */}
      <div className="p-6 lg:p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Award className="w-4 h-4" />
              <span>Resmi Ödev Teslim Künyesi</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Hazırlayan: <span className="text-amber-400">Enes Öztürk</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Java SE 21 · İç İçe Döngüler (Nested Loops) ile Algoritmik Desen Çözümü
            </p>
          </div>

          <button
            onClick={handleCopySig}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">İmza Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Konsol Başlığını Kopyala</span>
              </>
            )}
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="space-y-1.5">
            <div className="text-xs text-slate-400">Ders & Konu</div>
            <div className="text-sm font-semibold text-white">Java Temel Programlama</div>
            <div className="text-xs text-slate-400">Döngüler, Scanner ve Matris Çizimi</div>
          </div>

          <div className="space-y-1.5">
            <div className="text-xs text-slate-400">Algoritmik Yöntem</div>
            <div className="text-sm font-semibold text-white">Çift Yönlü Simetrik Döngü</div>
            <div className="text-xs text-slate-400">Üst: i=0..n | Alt: i=n-1..0</div>
          </div>

          <div className="space-y-1.5">
            <div className="text-xs text-slate-400">Durum</div>
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
              <CheckCircle className="w-4 h-4" />
              <span>Test Edildi & Doğrulandı</span>
            </div>
            <div className="text-xs text-slate-400">Kusursuz Hizalama Garantisi</div>
          </div>
        </div>

        {/* Assignment Prompt Card Recap */}
        <div className="mt-8 p-5 bg-slate-950/70 border border-slate-800/80 rounded-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Ödev Metni:</span>
          </div>
          <div className="text-xs text-slate-400 font-mono space-y-1 leading-relaxed">
            <div>"Java'da döngüler kullanarak yıldızlar ile elmas yapınız."</div>
            <div className="text-slate-500">enes öztürk imzasıyla yap güzelce</div>
          </div>
        </div>

        {/* Terminal Run Instructions */}
        <div className="mt-6 p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-300">
          <div className="text-slate-500 mb-2 font-sans text-[11px] font-medium">Terminal Derleme & Çalıştırma Yönergesi:</div>
          <div className="text-slate-400">$ javac Main.java</div>
          <div className="text-slate-400">$ java Main</div>
        </div>
      </div>
    </div>
  );
};
