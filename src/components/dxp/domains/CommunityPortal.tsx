import React from 'react';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Volume2, 
  ArrowRight
} from 'lucide-react';

export const CommunityPortal: React.FC = () => {
  return (
    <div className="py-24 bg-slate-950 text-white min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Users className="w-4 h-4 text-cyan-400 animate-bounce" />
            <span>GovData Community • Networking & Knowledge</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Comunidad Latinoamericana de Datos
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Únase a la red más importante de habla hispana en Gobierno de Datos e IA. Participe en foros, webinars mensuales y networking ejecutivo.
          </p>
        </div>

        {/* 3-Column Community Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Foros & Discusión */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 w-max">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Foro de Discusión DAMA</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interactúe con profesionales certificados CDMP. Resuelva dudas sobre calidad de datos, gobierno corporativo y políticas DAMA.
              </p>
            </div>
            <button className="py-2.5 rounded-xl text-xs font-bold text-cyan-400 hover:text-white hover:bg-cyan-600 border border-cyan-500/30 transition-all flex items-center justify-center space-x-1.5">
              <span>Ingresar al Foro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Webinars & Eventos */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 w-max">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Webinars & Masterclasses</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prográmese para nuestras transmisiones mensuales sobre gobernanza de IA, Azure, Microsoft Fabric y normativas estatales.
              </p>
            </div>
            <button className="py-2.5 rounded-xl text-xs font-bold text-purple-400 hover:text-white hover:bg-purple-600 border border-purple-500/30 transition-all flex items-center justify-center space-x-1.5">
              <span>Ver Calendario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Canales & Podcast */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 w-max">
                <Volume2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Podcast & YouTube</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Escuche nuestro podcast semanal "Datos & Decisiones" e ingrese a las transmisiones y tutoriales técnicos de nuestro canal.
              </p>
            </div>
            <button className="py-2.5 rounded-xl text-xs font-bold text-emerald-400 hover:text-white hover:bg-emerald-600 border border-emerald-500/30 transition-all flex items-center justify-center space-x-1.5">
              <span>Escuchar Podcast</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
