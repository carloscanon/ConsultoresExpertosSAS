import React, { useState } from 'react';
import { 
  Users, 
  Database, 
  Sparkles, 
  Bot,
  Plus,
  Trash2,
  Edit2,
  X,
  CheckCircle2
} from 'lucide-react';
import { saveSuperAdminAuditLog } from '../../../lib/supabase';

export const EnterpriseAdminDomain: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'rbac' | 'ai_generator' | 'supabase'>('rbac');

  // RBAC Users State
  const [rbacUsers, setRbacUsers] = useState([
    { id: '1', name: 'Ing. Carlos Cañón', role: 'SuperAdmin (NIT 900452089-9)', email: 'carlos@consultoresexpertos.com', status: 'Activo' },
    { id: '2', name: 'Dra. María Paula Gómez', role: 'Director de Gobierno de Datos', email: 'maria@consultoresexpertos.com', status: 'Activo' },
    { id: '3', name: 'Ing. Roberto Silva', role: 'Instructor MasterClassNow', email: 'roberto@masterclassnow.online', status: 'Activo' }
  ]);

  // Modals & Form State
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userForm, setUserForm] = useState({ id: '', name: '', role: 'Data Steward', email: '', status: 'Activo' });
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // AI Content Generator State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiContentType, setAiContentType] = useState('articulo_dama');
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAIContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);

    // Log the AI generation action
    await saveSuperAdminAuditLog({
      actionType: 'AI_CONTENT_GENERATION',
      confirmationCode: `AI-GEN-${aiContentType.toUpperCase()}`,
      affectedRecords: 1
    });

    setTimeout(() => {
      setIsGenerating(false);
      if (aiContentType === 'articulo_dama') {
        setGeneratedOutput(`# Claves para una Gobernanza de Datos Exitosa bajo DAMA-DMBOK2\n\nEn la era de la Inteligencia Artificial Generativa, las organizaciones líderes están adoptando marcos formalizados de gobierno de datos para garantizar la calidad, linaje y custodia de sus activos de información...\n\n- **Punto 1:** Asignación formal de Data Stewards.\n- **Punto 2:** Automatización de perfilamiento en GovData Nexus™.\n- **Punto 3:** Monitoreo continuo de SLAs de negocio.`);
      } else if (aiContentType === 'linkedin') {
        setGeneratedOutput(`🚀 ¿Sabías que el 80% de los proyectos de IA fracasan debido a datos deficientes?\n\nEn Consultores Expertos SAS ayudamos a empresas enterprise a consolidar su Gobierno de Datos bajo estándares DAMA-DMBOK2 y nuestra plataforma GovData Nexus™.\n\n👉 Solicita tu diagnóstico estratégico en: www.consultoresexpertos.org\n#DataGovernance #GenAI #DAMA #GovDataNexus`);
      } else {
        setGeneratedOutput(`Potencia tu organización con Gobierno de Datos Inteligente. Conoce los 16 módulos de GovData Nexus™.`);
      }
    }, 1200);
  };

  // RBAC handlers
  const handleOpenCreateUser = () => {
    setIsEditing(false);
    setUserForm({ id: '', name: '', role: 'Data Steward', email: '', status: 'Activo' });
    setUserModalOpen(true);
  };

  const handleOpenEditUser = (usr: any) => {
    setIsEditing(true);
    setUserForm({ ...usr });
    setUserModalOpen(true);
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setRbacUsers(rbacUsers.map(u => u.id === userForm.id ? { ...userForm } : u));
      setSuccessBanner(`✓ Usuario "${userForm.name}" actualizado con éxito.`);
    } else {
      const newUser = {
        ...userForm,
        id: `user-${Date.now()}`
      };
      setRbacUsers([...rbacUsers, newUser]);
      setSuccessBanner(`✓ Usuario "${userForm.name}" registrado en RBAC.`);
    }
    setUserModalOpen(false);
    setTimeout(() => setSuccessBanner(null), 3000);
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (rbacUsers.length <= 1) {
      alert('Debe mantener al menos 1 usuario SuperAdmin.');
      return;
    }
    if (!confirm(`¿Está seguro de eliminar el usuario "${name}"?`)) return;
    setRbacUsers(rbacUsers.filter(u => u.id !== id));
    setSuccessBanner(`✓ Usuario "${name}" eliminado de la administración.`);
    setTimeout(() => setSuccessBanner(null), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left">
      
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">DOMINIO 7 DE 7 • ENTERPRISE ADMINISTRATION & GOVERNANCE</span>
          <h2 className="text-2xl font-extrabold text-white font-heading">Seguridad ISO 27001, Roles RBAC & IA Content Generator</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
          SUPABASE BACKUP ACTIVE
        </span>
      </div>

      {successBanner && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successBanner}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('rbac')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${activeSubTab === 'rbac' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <Users className="w-4 h-4" />
          <span>Usuarios & Roles (RBAC)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('ai_generator')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${activeSubTab === 'ai_generator' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Generador de Contenidos IA</span>
        </button>
        <button
          onClick={() => setActiveSubTab('supabase')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${activeSubTab === 'supabase' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <Database className="w-4 h-4" />
          <span>Configuración Supabase & Keys</span>
        </button>
      </div>

      {activeSubTab === 'rbac' && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white font-heading">Gestión de Usuarios Corporativos & Permisos Granulares</h3>
            <button
              onClick={handleOpenCreateUser}
              className="px-3.5 py-2 rounded-xl text-xs font-extrabold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Usuario</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {rbacUsers.map((usr) => (
              <div key={usr.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs">
                    {usr.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{usr.name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">{usr.role} • {usr.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${usr.status === 'Activo' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>{usr.status}</span>
                  <div className="flex space-x-1.5">
                    <button
                      onClick={() => handleOpenEditUser(usr)}
                      className="p-1 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
                      title="Editar Usuario"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(usr.id, usr.name)}
                      className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      title="Eliminar Usuario"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'ai_generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white font-heading flex items-center space-x-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Generador de Copys & Artículos con IA</span>
            </h3>
            <form onSubmit={handleGenerateAIContent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Tipo de Contenido</label>
                <select value={aiContentType} onChange={(e) => setAiContentType(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400">
                  <option value="articulo_dama">Artículo Técnico DAMA-DMBOK</option>
                  <option value="linkedin">Post para LinkedIn (Lead Gen)</option>
                  <option value="landing_copy">Copy para Landing Page</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Tema / Palabras Clave</label>
                <textarea rows={3} value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="Ej: Calidad de Datos en Sector Salud bajo DAMA y GovData Nexus..." className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" />
              </div>
              <button type="submit" disabled={isGenerating} className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? 'Generando Contenido...' : 'Generar con IA Enterprise'}</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono">VISTA PREVIA DEL CONTENIDO GENERADO</h3>
            {generatedOutput ? (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-line leading-relaxed max-h-80 overflow-y-auto">
                {generatedOutput}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs font-mono">
                Introduce un tema y presiona "Generar con IA Enterprise" para ver el resultado.
              </div>
            )}
          </div>
        </div>
      )}

      {activeSubTab === 'supabase' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 animate-in fade-in duration-200">
          <h3 className="text-sm font-bold text-white font-heading flex items-center space-x-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Configuración de Supabase Realtime & Keys</span>
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-mono mb-1">SUPABASE URL</label>
              <input type="text" readOnly value="https://mrhmfrwzdrmulfqpmgq.supabase.co" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-cyan-400" />
            </div>
            <div>
              <label className="block text-slate-400 font-mono mb-1">SUPABASE PUBLISHABLE KEY</label>
              <input type="text" readOnly value="sb_publishable_-Spj1AbnYzptfmQAQoByNg_gC6-OdBD" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-slate-300" />
            </div>
          </div>
        </div>
      )}

      {/* USER CREATION/EDIT MODAL */}
      {userModalOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl relative space-y-4 text-left">
            <button onClick={() => setUserModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white font-heading">{isEditing ? 'Editar Usuario RBAC' : 'Registrar Nuevo Usuario'}</h3>
            <form onSubmit={handleUserSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Nombre Completo</label>
                <input type="text" required value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} placeholder="Ej. Carlos Cañón" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Rol / Cargo Corporativo</label>
                <input type="text" required value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })} placeholder="Ej. Data Steward" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Correo Corporativo</label>
                <input type="email" required value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} placeholder="carlos@empresa.com" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Estado</label>
                <select value={userForm.status} onChange={(e) => setUserForm({ ...userForm, status: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400">
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg mt-2">
                {isEditing ? 'Actualizar Usuario' : 'Registrar Usuario'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
