import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import type { ServiceItem } from '../types';
import { 
  ShieldCheck, 
  Layers, 
  BarChart3, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight,
  X,
  Check
} from 'lucide-react';

interface ServicesExplorerProps {
  onOpenDemo: () => void;
}

export const ServicesExplorer: React.FC<ServicesExplorerProps> = ({ onOpenDemo }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-blue-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-blue-600" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-blue-600" />;
      case 'Layers': return <Layers className="w-6 h-6 text-blue-600" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-blue-600" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-blue-600" />;
      default: return <ShieldCheck className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="services" className="py-24 relative bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading mb-4 text-slate-900">
            Soluciones que Generan Impacto
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Combinamos experiencia, tecnología y metodologías probadas para resolver los desafíos más complejos de gestión de datos.
          </p>
        </div>

        {/* 6 Clean White Service Cards Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {servicesData.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-xl transition-all cursor-pointer text-center group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 transition-colors inline-block mx-auto">
                  {getServiceIcon(service.icon)}
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {service.overview}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Link */}
        <div className="text-center">
          <button
            onClick={onOpenDemo}
            className="inline-flex items-center space-x-2 text-sm font-bold text-blue-600 hover:text-blue-500 transition-colors"
          >
            <span>Ver todos nuestros servicios</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Service Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative space-y-6 text-left">
            <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="p-3.5 rounded-2xl bg-blue-50">
                {getServiceIcon(selectedService.icon)}
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{selectedService.category}</span>
                <h3 className="text-2xl font-bold text-slate-900 font-heading">{selectedService.title}</h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{selectedService.overview}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h5 className="text-xs font-bold text-slate-700 uppercase mb-2">Beneficios Clave</h5>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {selectedService.benefits.map((b, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h5 className="text-xs font-bold text-slate-700 uppercase mb-2">Entregables</h5>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {selectedService.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button onClick={() => { setSelectedService(null); onOpenDemo(); }} className="w-full py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md">
              Solicitar este Servicio
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
