import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  CheckCircle2, 
  AlertCircle,
  Hash
} from 'lucide-react';
import { saveSuperAdminAuditLog } from '../../../lib/supabase';

export const OrgSettingsDomain: React.FC = () => {
  const { contactInfo, updateContactInfo } = useData();
  const [form, setForm] = useState({ ...contactInfo });
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg('Guardando configuración corporativa en Supabase...');
    try {
      await updateContactInfo(form);
      setStatusMsg('✓ Configuración corporativa y Google SEO guardados con éxito.');
      
      saveSuperAdminAuditLog({
        actionType: 'ORG_SETTINGS_UPDATE',
        confirmationCode: 'ORG-SET-2026',
        affectedRecords: 1
      }).catch(console.warn);

      setTimeout(() => setStatusMsg(null), 4000);
    } catch (err: any) {
      setStatusMsg(`❌ Error de Base de Datos: ${err.message || 'No se pudo guardar la configuración'}`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
          DXP COMMAND CENTER • CONFIGURACIÓN GLOBAL
        </span>
        <h2 className="text-2xl font-extrabold text-white font-heading flex items-center space-x-2.5">
          <Building className="w-7 h-7 text-cyan-400" />
          <span>Datos de la Organización & SEO Google</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Administre la identidad institucional compartida orgánicamente en buscadores (nombre, NIT, datos de contacto) y metadatos SEO.
        </p>
      </div>

      {/* Status banner alert */}
      {statusMsg && (
        <div 
          className={`p-3.5 rounded-xl border text-xs font-bold flex items-center space-x-2 animate-in fade-in duration-200 ${
            statusMsg.startsWith('❌') 
              ? 'bg-red-500/10 border-red-500/30 text-red-400' 
              : statusMsg.startsWith('✓') 
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
              : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
          }`}
        >
          {statusMsg.startsWith('❌') ? (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
          )}
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 text-xs text-slate-300">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: Corporate Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-850 pb-2 flex items-center space-x-1.5">
              <Building className="w-4 h-4" />
              <span>Identidad Institucional</span>
            </h3>

            <div className="space-y-1.5">
              <label className="block text-slate-350 font-bold">Nombre Oficial de la Organización</label>
              <div className="relative flex items-center">
                <Building className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="text"
                  required
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-350 font-bold">Número de Identificación Tributaria (NIT)</label>
              <div className="relative flex items-center">
                <Hash className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="text"
                  required
                  value={form.companyNit}
                  onChange={(e) => setForm({ ...form, companyNit: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-semibold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-350 font-bold">Correo Corporativo</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-350 font-bold">Número de Contacto Celular</label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="text"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-350 font-bold">ID WhatsApp (Con indicativo sin espacios)</label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="text"
                  required
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  placeholder="Ej: 573001234567"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>
              <p className="text-[10px] text-slate-500">
                Determina el enlace directo del botón de asistencia flotante y accesos rápidos.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-350 font-bold">Dirección Física / Ubicación</label>
              <div className="relative flex items-center">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Google SEO */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-850 pb-2 flex items-center space-x-1.5">
              <Globe className="w-4 h-4" />
              <span>Optimización Google SEO (Metadatos)</span>
            </h3>

            <div className="space-y-1.5">
              <label className="block text-slate-350 font-bold font-sans">Google Meta Keywords (Separados por comas)</label>
              <textarea
                rows={3}
                required
                value={form.metaKeywords}
                onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })}
                placeholder="Ej: Gobierno de Datos, Inteligencia Artificial, DAMA, TOGAF..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-cyan-400 font-mono leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-350 font-bold font-sans">Google Meta Description (Resumen Orgánico)</label>
              <textarea
                rows={5}
                required
                value={form.metaDescription}
                onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                placeholder="Escriba la descripción comercial corta que indexará Google en sus resultados de búsqueda..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-cyan-400 leading-normal"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-2 leading-relaxed">
              <p className="font-bold text-white flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>¿Cómo funciona la indexación?</span>
              </p>
              <p className="text-[10px] text-slate-400 leading-normal">
                Al guardar esta configuración, se inyectan dinámicamente los metadatos en la estructura interna de la página web. Los indexadores de Google y otros buscadores asocian estos valores para clasificar de manera orgánica tus contenidos en los resultados de búsqueda.
              </p>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl font-extrabold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-xl flex items-center space-x-2"
          >
            <Building className="w-4 h-4" />
            <span>Guardar Configuración en Supabase</span>
          </button>
        </div>

      </form>

    </div>
  );
};
