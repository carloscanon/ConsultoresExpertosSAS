import React, { useState } from 'react';
import { 
  Megaphone, 
  Plus, 
  Layers
} from 'lucide-react';

export const MarketingHubDomain: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'landings' | 'campaigns'>('landings');

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left">
      
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">DOMINIO 6 DE 7 • MARKETING & GROWTH HUB (HUBSPOT & UNBOUNCE LEVEL)</span>
          <h2 className="text-2xl font-extrabold text-white font-heading">Constructor de Landing Pages & Campañas de Conversión</h2>
        </div>
        <button className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-xl flex items-center space-x-1.5">
          <Plus className="w-4 h-4" />
          <span>Nueva Landing Page (Visual Builder)</span>
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-800 pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('landings')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${activeTab === 'landings' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <Layers className="w-4 h-4" />
          <span>Landing Pages & A/B Testing</span>
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${activeTab === 'campaigns' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Campañas Email & Newsletters</span>
        </button>
      </div>

      {activeTab === 'landings' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex justify-between items-center text-[10px] font-mono font-bold text-cyan-400">
              <span>A/B TEST ACTIVO</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Publicado</span>
            </div>
            <h3 className="text-base font-bold text-white font-heading">Landing Diagnóstico DAMA Sector Salud</h3>
            <div className="text-xs text-slate-400 font-mono space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between"><span>Conversión:</span><span className="text-emerald-400 font-bold">14.2%</span></div>
              <div className="flex justify-between"><span>Leads Capturados:</span><span className="text-white font-bold">428</span></div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex justify-between items-center text-[10px] font-mono font-bold text-purple-400">
              <span>MASTERCLASSNOW LANDING</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Publicado</span>
            </div>
            <h3 className="text-base font-bold text-white font-heading">Bootcamp CDMP® DAMA International 2026</h3>
            <div className="text-xs text-slate-400 font-mono space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between"><span>Conversión:</span><span className="text-emerald-400 font-bold">18.9%</span></div>
              <div className="flex justify-between"><span>Leads Capturados:</span><span className="text-white font-bold">612</span></div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex justify-between items-center text-[10px] font-mono font-bold text-blue-400">
              <span>ENTERPRISE GOVDATA</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Publicado</span>
            </div>
            <h3 className="text-base font-bold text-white font-heading">GovData Nexus Demo 360°</h3>
            <div className="text-xs text-slate-400 font-mono space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between"><span>Conversión:</span><span className="text-emerald-400 font-bold">11.5%</span></div>
              <div className="flex justify-between"><span>Leads Capturados:</span><span className="text-white font-bold">380</span></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-heading">Campañas de Email Marketing & Newsletter Activas</h3>
          <div className="space-y-3">
            {[
              { name: 'Newsletter Semanal DAMA Insights', subscribers: '3,840', openRate: '41.2%', status: 'Activa' },
              { name: 'Campaña GovData Nexus Lanzamiento V4', subscribers: '1,280', openRate: '58.4%', status: 'Activa' },
              { name: 'Secuencia de Bienvenida MasterClassNow', subscribers: '842', openRate: '62.1%', status: 'Activa' }
            ].map((camp, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{camp.name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono">{camp.subscribers} suscriptores • Open Rate: {camp.openRate}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400">{camp.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
