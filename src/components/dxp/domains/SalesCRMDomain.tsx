import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { 
  Users, 
  Plus, 
  MessageCircle, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  X,
  RefreshCw,
  Mail,
  Phone,
  Trash2,
  Edit2
} from 'lucide-react';

export const SalesCRMDomain: React.FC = () => {
  const { 
    deals, 
    leads, 
    loading, 
    refreshData, 
    createDeal, 
    moveDealStage, 
    updateDealDetails, 
    removeDeal, 
    removeLead 
  } = useData();

  const [activeView, setActiveView] = useState<'kanban' | 'leads'>('kanban');

  // Modals & Form State
  const [newDealModal, setNewDealModal] = useState(false);
  const [editDealModal, setEditDealModal] = useState(false);
  const [dealForm, setDealForm] = useState({ id: '', title: '', company: '', contact: '', email: '', value: '35000', score: 85, stage: 'Diagnóstico DAMA' });
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const stages = ['Nuevo Lead', 'Diagnóstico DAMA', 'Oferta Formal', 'Negociación', 'Cierre Ganado'];

  const handleCreateDealSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dealValueNum = Number(dealForm.value);

    await createDeal({
      dealTitle: dealForm.title,
      companyName: dealForm.company,
      contactName: dealForm.contact,
      contactEmail: dealForm.email || 'carlos@empresa.com',
      dealStage: 'Diagnóstico DAMA',
      dealValue: dealValueNum
    });

    setSuccessBanner(`✓ Oportunidad "${dealForm.title}" creada con éxito.`);
    setNewDealModal(false);
    setDealForm({ id: '', title: '', company: '', contact: '', email: '', value: '35000', score: 85, stage: 'Diagnóstico DAMA' });
    setTimeout(() => setSuccessBanner(null), 3000);
  };

  const handleOpenEditDeal = (deal: any) => {
    const rawValue = deal.val.replace(/[^0-9]/g, '');
    setDealForm({
      id: deal.id,
      title: deal.title,
      company: deal.company,
      contact: deal.contact,
      email: deal.email || '',
      value: rawValue,
      score: deal.score,
      stage: deal.stage
    });
    setEditDealModal(true);
  };

  const handleEditDealSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateDealDetails(dealForm);
    setEditDealModal(false);
    setSuccessBanner(`✓ Oportunidad "${dealForm.title}" actualizada.`);
    setTimeout(() => setSuccessBanner(null), 3000);
  };

  const handleDeleteDeal = async (id: string, title: string) => {
    if (!confirm(`¿Está seguro de eliminar la oportunidad "${title}"?`)) return;
    await removeDeal(id);
    setSuccessBanner(`✓ Oportunidad "${title}" eliminada.`);
    setTimeout(() => setSuccessBanner(null), 3000);
  };

  const handleDeleteLead = async (id: string, name: string) => {
    if (!confirm(`¿Está seguro de eliminar el lead de "${name}"?`)) return;
    await removeLead(id);
    setSuccessBanner(`✓ Lead de "${name}" eliminado.`);
    setTimeout(() => setSuccessBanner(null), 3000);
  };

  const handleMoveStage = async (dealId: string, currentStage: string) => {
    await moveDealStage(dealId, currentStage);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">DOMINIO 3 DE 7 • SALES & CRM ENTERPRISE (HUBSPOT & SALESFORCE LEVEL)</span>
          <h2 className="text-2xl font-extrabold text-white font-heading">Gestión Comercial & Pipeline de Ventas</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={refreshData}
            title="Sincronizar ahora"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setNewDealModal(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-xl flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Oportunidad / Deal</span>
          </button>
        </div>
      </div>

      {successBanner && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successBanner}</span>
        </div>
      )}

      <div className="flex gap-2 border-b border-slate-800 pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveView('kanban')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${activeView === 'kanban' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Pipeline Kanban ({deals.length} Oportunidades)</span>
        </button>
        <button
          onClick={() => setActiveView('leads')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${activeView === 'leads' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <Users className="w-4 h-4" />
          <span>Tabla de Leads & Captura de Demo ({leads.length} Registrados)</span>
        </button>
      </div>

      {activeView === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-left">
          {stages.map((stg) => {
            const stageDeals = deals.filter(d => d.stage === stg);
            return (
              <div key={stg} className="bg-slate-900 p-4 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">{stg}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 font-mono text-[10px] font-bold">{stageDeals.length}</span>
                </div>
                <div className="space-y-3 min-h-[350px]">
                  {stageDeals.map((deal) => (
                    <div key={deal.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2 shadow-lg group cursor-pointer relative">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">Score: {deal.score}</span>
                        <span className="text-xs font-mono font-extrabold text-emerald-400">{deal.val}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors pr-6">{deal.title}</h4>
                      <div className="text-[11px] text-slate-400 space-y-0.5 font-sans">
                        <p className="font-semibold text-slate-300 flex items-center space-x-1">
                          <Building2 className="w-3 h-3 text-slate-500" />
                          <span>{deal.company}</span>
                        </p>
                        <p className="flex items-center space-x-1">
                          <Users className="w-3 h-3 text-slate-500" />
                          <span>{deal.contact}</span>
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-900 flex justify-between items-center">
                        <div className="flex space-x-1.5">
                          <a
                            href={`https://wa.me/573001234567?text=Hola%20${encodeURIComponent(deal.contact)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                            title="WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleOpenEditDeal(deal)}
                            className="p-1 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
                            title="Editar Oportunidad"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteDeal(deal.id, deal.title)}
                            className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                            title="Eliminar Oportunidad"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleMoveStage(deal.id, deal.stage)}
                          className="text-[10px] font-bold text-cyan-400 hover:underline flex items-center space-x-1"
                        >
                          <span>Avanzar</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeView === 'leads' && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl text-left">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-heading">Leads Capturados (Solicitudes de Demo en la Web)</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-400">Live Supabase</span>
          </div>
          <div className="overflow-x-auto">
            {leads.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-mono">
                No hay leads registrados.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                    <th className="py-3 px-4 font-bold">Contacto</th>
                    <th className="py-3 px-4 font-bold">Empresa / Cargo</th>
                    <th className="py-3 px-4 font-bold">Interés / Tema</th>
                    <th className="py-3 px-4 font-bold">Horario Pref.</th>
                    <th className="py-3 px-4 font-bold">Estado / Lead Score</th>
                    <th className="py-3 px-4 font-bold">Valor Estimado</th>
                    <th className="py-3 px-4 font-bold">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-medium">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-800/50">
                      <td className="py-3 px-4 text-white">
                        <div>
                          <p className="font-bold">{lead.full_name}</p>
                          <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5">
                            <span className="flex items-center"><Mail className="w-3 h-3 mr-1" />{lead.email}</span>
                            {lead.phone && <span className="flex items-center"><Phone className="w-3 h-3 mr-1" />{lead.phone}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-slate-200">{lead.company}</p>
                        <p className="text-[10px] text-slate-400">{lead.role || 'N/A'}</p>
                      </td>
                      <td className="py-3 px-4 text-cyan-400 font-bold">
                        <p>{lead.topic_of_interest}</p>
                        {lead.message && <p className="text-[10px] text-slate-500 italic mt-0.5 font-normal truncate max-w-xs" title={lead.message}>"{lead.message}"</p>}
                      </td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{lead.preferred_schedule || 'Sin especificar'}</td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 block w-max">{lead.status}</span>
                          <span className="text-[10px] font-mono text-blue-400 font-bold block">Score: {lead.lead_score || 50}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-emerald-400 font-bold">
                        ${Number(lead.estimated_value || 15000).toLocaleString()} USD
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDeleteLead(lead.id, lead.full_name)}
                            className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                            title="Eliminar Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* NEW DEAL MODAL */}
      {newDealModal && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl relative space-y-4 text-left">
            <button onClick={() => setNewDealModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white font-heading">Nueva Oportunidad Comercial</h3>
            <form onSubmit={handleCreateDealSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Nombre de la Oportunidad</label>
                <input type="text" required value={dealForm.title} onChange={(e) => setDealForm({ ...dealForm, title: e.target.value })} placeholder="Ej. Implementación GovData Nexus" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-bold" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Empresa Cliente</label>
                <input type="text" required value={dealForm.company} onChange={(e) => setDealForm({ ...dealForm, company: e.target.value })} placeholder="Ej. Banco de Bogotá" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Contacto Principal</label>
                <input type="text" required value={dealForm.contact} onChange={(e) => setDealForm({ ...dealForm, contact: e.target.value })} placeholder="Ej. Ing. Carlos Cañón" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Correo Corporativo</label>
                <input type="email" required value={dealForm.email} onChange={(e) => setDealForm({ ...dealForm, email: e.target.value })} placeholder="carlos@empresa.com" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Valor Estimado ($ USD)</label>
                <input type="number" required value={dealForm.value} onChange={(e) => setDealForm({ ...dealForm, value: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-mono font-bold outline-none focus:border-cyan-400" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg mt-2">
                Guardar Oportunidad
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT DEAL MODAL */}
      {editDealModal && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl relative space-y-4 text-left">
            <button onClick={() => setEditDealModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white font-heading">Editar Oportunidad Comercial</h3>
            <form onSubmit={handleEditDealSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Nombre de la Oportunidad</label>
                <input type="text" required value={dealForm.title} onChange={(e) => setDealForm({ ...dealForm, title: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-bold" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Empresa Cliente</label>
                <input type="text" required value={dealForm.company} onChange={(e) => setDealForm({ ...dealForm, company: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Contacto Principal</label>
                <input type="text" required value={dealForm.contact} onChange={(e) => setDealForm({ ...dealForm, contact: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Etapa Actual</label>
                <select value={dealForm.stage} onChange={(e) => setDealForm({ ...dealForm, stage: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400">
                  {stages.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Valor ($ USD)</label>
                <input type="number" required value={dealForm.value} onChange={(e) => setDealForm({ ...dealForm, value: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-mono font-bold outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Score de Probabilidad (0 - 100)</label>
                <input type="number" min="0" max="100" required value={dealForm.score} onChange={(e) => setDealForm({ ...dealForm, score: Number(e.target.value) })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-mono" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg mt-2">
                Actualizar Oportunidad
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
