import React from 'react';
import { 
  Globe, 
  Award, 
  Download
} from 'lucide-react';

interface RankingItem {
  rank: number;
  sector: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  samples: number;
}

const SECTOR_RANKING: RankingItem[] = [
  { rank: 1, sector: 'Seguros & Previsión Social', score: 3.8, trend: 'up', samples: 14 },
  { rank: 2, sector: 'Banca & Servicios Financieros', score: 3.6, trend: 'up', samples: 22 },
  { rank: 3, sector: 'Telecomunicaciones & Cloud', score: 3.4, trend: 'stable', samples: 9 },
  { rank: 4, sector: 'Energía & Minería', score: 2.9, trend: 'up', samples: 11 },
  { rank: 5, sector: 'Servicios Públicos (Gobierno)', score: 2.4, trend: 'down', samples: 34 },
  { rank: 6, sector: 'Salud & Clínicas', score: 2.1, trend: 'stable', samples: 18 }
];

export const ResearchPortal: React.FC = () => {
  return (
    <div className="py-24 bg-slate-950 text-white min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Globe className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>GovData Research • Observatorio Latinoamericano</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Centro de Investigación & Rankings
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            "Los datos no generan valor. Las decisiones sí." – Descubra rankings sectoriales de madurez DAMA e informes del Observatorio de IA.
          </p>
        </div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: DAMA Latin American Maturity Ranking */}
          <div className="lg:col-span-7 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white font-heading uppercase tracking-wider flex items-center space-x-2">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Ranking de Madurez de Datos LATAM 2026</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold font-mono">
                DAMA INDEX
              </span>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 font-mono text-[10px]">
                    <th className="py-2.5 px-2">RANK</th>
                    <th className="py-2.5 px-2">SECTOR INDUSTRIAL</th>
                    <th className="py-2.5 px-2">MADUREZ DAMA (1-5)</th>
                    <th className="py-2.5 px-2">ENTIDADES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-medium">
                  {SECTOR_RANKING.map((item) => (
                    <tr key={item.rank} className="hover:bg-slate-950/40">
                      <td className="py-3 px-2 font-mono font-bold text-cyan-400">#{item.rank}</td>
                      <td className="py-3 px-2 text-white font-bold">{item.sector}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-cyan-300 font-bold">{item.score}</span>
                          {/* Visual progress bar */}
                          <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div 
                              className="h-full bg-cyan-500 rounded-full" 
                              style={{ width: `${(item.score / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-slate-400 font-mono">{item.samples} Org</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 font-mono">
              * Datos recopilados mediante la auditoría anual GovData Nexus Index.
            </div>

          </div>

          {/* Right Column: Research Whitepapers & Observatories */}
          <div className="lg:col-span-5 bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl space-y-4">
            
            <h3 className="text-sm font-bold text-white font-heading uppercase tracking-wider border-b border-slate-800 pb-3">
              Observatorio de IA & Reportes
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { name: 'Adopción de IA en Sector Público 2026', type: 'Observatorio de IA', date: 'Julio 2026' },
                { name: 'Manual de Linaje de Datos y Metadata', type: 'Guía de Mejores Prácticas', date: 'Junio 2026' },
                { name: 'Estado del Gobierno de Datos en Colombia', type: 'Estudio de Madurez', date: 'Mayo 2026' }
              ].map((rep, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-850 flex items-start justify-between space-x-3 group">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest">{rep.type}</span>
                    <h4 className="font-bold text-white leading-tight">{rep.name}</h4>
                    <p className="text-[10px] text-slate-500 font-mono">Publicado: {rep.date}</p>
                  </div>
                  <button className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white group-hover:bg-cyan-600 transition-all shrink-0">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
