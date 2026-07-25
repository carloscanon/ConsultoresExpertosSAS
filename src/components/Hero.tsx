import React, { useEffect, useState } from 'react';
import { DataConstellationCanvas } from './DataConstellationCanvas';
import { 
  Database, 
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  onOpenDiagnosis: () => void;
  onExploreNexus: () => void;
  onTalkExpert: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenDiagnosis,
  onExploreNexus,
  onTalkExpert
}) => {
  const clientLogos = [
    { name: 'POSITIVA Compañía de Seguros', badge: 'POSITIVA' },
    { name: 'IDRD', badge: 'IDRD' },
    { name: 'FONCEP', badge: 'FONCEP' },
    { name: 'SURA', badge: 'SURA' },
    { name: 'ALCALDÍA DE BOGOTÁ', badge: 'BOGOTÁ' }
  ];

  // Animated counters state
  const [counts, setCounts] = useState({
    projects: 100,
    orgs: 10,
    sectors: 5,
    professionals: 100,
    resources: 20,
    articles: 50
  });

  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const steps = 50;
    const intervalTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      setCounts({
        projects: Math.floor((500 / steps) * step),
        orgs: Math.floor((50 / steps) * step),
        sectors: Math.floor((20 / steps) * step),
        professionals: Math.floor((1000 / steps) * step),
        resources: Math.floor((100 / steps) * step),
        articles: Math.floor((300 / steps) * step)
      });

      if (step >= steps) {
        clearInterval(interval);
        setCounts({
          projects: 500,
          orgs: 50,
          sectors: 20,
          professionals: 1000,
          resources: 100,
          articles: 300
        });
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-slate-950 text-white">
      <DataConstellationCanvas />

      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>GovData Nexus Ecosystem Vision 2030</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-heading">
              Donde el Gobierno de Datos <br />
              se convierte en <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                ventaja competitiva.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Consultoría, Inteligencia Artificial, Arquitectura Empresarial, Academia y Cumplimiento Normativo reunidos en un único ecosistema.
            </p>

            <blockquote className="border-l-4 border-cyan-500 pl-4 py-1 italic text-slate-400 text-xs my-4 font-serif">
              "No implementamos Gobierno de Datos. Construimos organizaciones inteligentes."
            </blockquote>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreNexus}
                className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl transition-all flex items-center space-x-2 animate-float"
              >
                <span>Explorar Ecosistema</span>
                <span className="text-xs">→</span>
              </button>
              <button
                onClick={onOpenDiagnosis}
                className="px-6 py-3 rounded-xl font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all"
              >
                Solicitar Diagnóstico
              </button>
              <button
                onClick={onTalkExpert}
                className="px-6 py-3 rounded-xl font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all text-xs"
              >
                Hablar con un Experto
              </button>
            </div>
          </div>

          {/* Right Column: 3D Digital Globe Neural Network Graphic */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-cyan-500/30 glass-panel shadow-2xl flex items-center justify-center p-8 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950">
              
              {/* Animated Glowing Globe Nodes */}
              <div className="absolute inset-0 bg-radial-gradient from-cyan-500/20 via-blue-600/10 to-transparent animate-pulse-glow" />

              <div className="relative z-10 w-64 h-64 rounded-full border-2 border-cyan-400/40 flex items-center justify-center animate-spin" style={{ animationDuration: '25s' }}>
                <div className="w-48 h-48 rounded-full border border-indigo-500/50 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-cyan-500/20 blur-sm flex items-center justify-center">
                    <Database className="w-12 h-12 text-cyan-400 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Floating UI Widget Overlays */}
              <div className="absolute top-6 left-6 p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 shadow-xl backdrop-blur-md text-[11px] text-cyan-300 font-mono flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>GovData AI Engine 4.0 Active</span>
              </div>

              <div className="absolute bottom-6 right-6 p-2.5 rounded-xl bg-slate-900/90 border border-indigo-500/40 shadow-xl backdrop-blur-md text-[11px] text-indigo-300 font-mono flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span>Accuracy 99.8%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Client Trust Marquee Bar */}
        <div className="pt-6 pb-8 border-t border-slate-800/80 text-left">
          <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-3">
            RESPALDADO POR ORGANIZACIONES LÍDERES DE LATINOAMÉRICA:
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            {clientLogos.map((client, idx) => (
              <div key={idx} className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                <span className="text-[11px] font-extrabold font-heading text-slate-300">{client.badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Stats Pill Bar */}
        <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
          
          <div className="p-2 border-r border-slate-800/50 last:border-0">
            <div className="text-cyan-400 text-xl font-extrabold font-heading">
              +{counts.projects}
            </div>
            <div className="text-[10px] text-slate-400 font-mono font-bold mt-1 uppercase">Proyectos</div>
          </div>

          <div className="p-2 border-r border-slate-800/50 last:border-0">
            <div className="text-cyan-400 text-xl font-extrabold font-heading">
              +{counts.orgs}
            </div>
            <div className="text-[10px] text-slate-400 font-mono font-bold mt-1 uppercase">Organizaciones</div>
          </div>

          <div className="p-2 border-r border-slate-800/50 last:border-0">
            <div className="text-cyan-400 text-xl font-extrabold font-heading">
              +{counts.sectors}
            </div>
            <div className="text-[10px] text-slate-400 font-mono font-bold mt-1 uppercase">Sectores</div>
          </div>

          <div className="p-2 border-r border-slate-800/50 last:border-0">
            <div className="text-cyan-400 text-xl font-extrabold font-heading">
              +{counts.professionals}
            </div>
            <div className="text-[10px] text-slate-400 font-mono font-bold mt-1 uppercase">Profesionales</div>
          </div>

          <div className="p-2 border-r border-slate-800/50 last:border-0">
            <div className="text-cyan-400 text-xl font-extrabold font-heading">
              +{counts.resources}
            </div>
            <div className="text-[10px] text-slate-400 font-mono font-bold mt-1 uppercase">Recursos</div>
          </div>

          <div className="p-2 col-span-2 md:col-span-1">
            <div className="text-cyan-400 text-xl font-extrabold font-heading">
              +{counts.articles}
            </div>
            <div className="text-[10px] text-slate-400 font-mono font-bold mt-1 uppercase">Artículos</div>
          </div>

        </div>

      </div>
    </section>
  );
};
