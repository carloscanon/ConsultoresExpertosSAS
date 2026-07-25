import React from 'react';
import { Quote, ArrowRight } from 'lucide-react';

interface CaseStudiesTimelineProps {
  onOpenDemo: () => void;
}

export const CaseStudiesTimeline: React.FC<CaseStudiesTimelineProps> = ({ onOpenDemo }) => {
  const techLogos = [
    'Microsoft Azure', 'AWS', 'Google Cloud', 'databricks', 'snowflake', 'Power BI', 'ORACLE', 'SAP'
  ];

  return (
    <section id="cases" className="py-24 relative bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading mb-4 text-slate-900">
            Casos de Éxito
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Resultados reales que generamos para organizaciones líderes.
          </p>
        </div>

        {/* Grid: 3 Case Cards + High Contrast Quote Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left: 3 Case Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Positiva Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl transition-all text-left flex flex-col justify-between">
              <div>
                <div className="h-10 flex items-center mb-3">
                  <span className="font-heading font-extrabold text-sm text-amber-600">POSITIVA</span>
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">90%</div>
                <p className="text-xs text-slate-600 font-medium mt-1">Mejora en calidad de datos</p>
              </div>
              <button 
                onClick={onOpenDemo}
                className="pt-4 text-[11px] font-bold text-blue-600 hover:text-blue-500 flex items-center space-x-1"
              >
                <span>Ver caso completo</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* IDRD Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl transition-all text-left flex flex-col justify-between">
              <div>
                <div className="h-10 flex items-center mb-3">
                  <span className="font-heading font-extrabold text-sm text-blue-600">IDRD</span>
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">75%</div>
                <p className="text-xs text-slate-600 font-medium mt-1">Reducción en tiempos de reportes</p>
              </div>
              <button 
                onClick={onOpenDemo}
                className="pt-4 text-[11px] font-bold text-blue-600 hover:text-blue-500 flex items-center space-x-1"
              >
                <span>Ver caso completo</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* FONCEP Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl transition-all text-left flex flex-col justify-between">
              <div>
                <div className="h-10 flex items-center mb-3">
                  <span className="font-heading font-extrabold text-sm text-emerald-600">FONCEP</span>
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">60%</div>
                <p className="text-xs text-slate-600 font-medium mt-1">Eficiencia operacional alcanzada</p>
              </div>
              <button 
                onClick={onOpenDemo}
                className="pt-4 text-[11px] font-bold text-blue-600 hover:text-blue-500 flex items-center space-x-1"
              >
                <span>Ver caso completo</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>

          {/* Right: High Contrast Dark Quote Box */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl relative flex flex-col justify-between">
            <Quote className="w-8 h-8 text-blue-500 mb-4 opacity-80" />
            
            <p className="text-sm sm:text-base italic font-serif leading-relaxed text-slate-200 mb-6">
              "Consultores Expertos SAS transformó nuestra gestión de datos. Hoy tomamos decisiones basadas en información confiable y oportuna."
            </p>

            <div className="flex items-center space-x-3 pt-4 border-t border-slate-800">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs text-white">
                MC
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-heading">María Claudia García</h4>
                <p className="text-[11px] text-slate-400">Directora de Transformación, Positiva Compañía de Seguros</p>
              </div>
            </div>
          </div>

        </div>

        {/* Partner Tech Marquee Bar */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-6 opacity-80 hover:opacity-100 transition-opacity">
            {techLogos.map((tech, i) => (
              <span key={i} className="text-xs sm:text-sm font-bold text-slate-600 font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
