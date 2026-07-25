import React from 'react';
import { govDataModules } from '../../../data/govDataModules';
import { CheckCircle2 } from 'lucide-react';

export const GovDataNexusDomain: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left">
      
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">DOMINIO 5 DE 7 • GOVDATA NEXUS™ ENGINE & SAAS PRODUCT CENTER</span>
          <h2 className="text-2xl font-extrabold text-white font-heading">Gestión Comercial & Módulos de Plataforma GovData Nexus™</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
          ENGINE VERSION 4.0 RELEASED
        </span>
      </div>

      {/* Product KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-400">Módulos Activos</span>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">16 Módulos</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-400">Instancias Desplegadas</span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">150+ Nubes</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-400">Cumplimiento DAMA</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">100% DMBOK2</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-400">Disponibilidad SLA</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">99.99% Enterprise</div>
        </div>
      </div>

      {/* 16 Modules Grid */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white font-heading">Catálogo Oficial de los 16 Módulos de GovData Nexus™</h3>
          <span className="text-xs text-slate-400 font-mono">16 de 16 Habilitados</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {govDataModules.map((mod) => (
            <div key={mod.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 font-bold">{mod.category}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <h4 className="text-xs font-bold text-white leading-snug">{mod.title}</h4>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
