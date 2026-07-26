import React, { useState } from 'react';
import { useData, type ResourceItem, type ContactInfo } from '../../../context/DataContext';
import { 
  Globe, 
  Layers, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  FileText, 
  Video, 
  Volume2, 
  BookMarked, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles,
  Link2,
  Star
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { saveSuperAdminAuditLog } from '../../../lib/supabase';

export const ExperienceCMSDomain: React.FC = () => {
  const { logoUrl, logoSize, setLogoUrl, setLogoSize } = useTheme();
  const { 
    contactInfo, 
    updateContactInfo, 
    resources, 
    addResource, 
    editResource, 
    deleteResource 
  } = useData();

  const [activeTab, setActiveTab] = useState<'services' | 'resources' | 'seo'>('resources');
  
  // SEO Form State
  const [seoForm, setSeoForm] = useState<ContactInfo>({ ...contactInfo });
  
  // Resource CRUD Form State
  const [selectedResId, setSelectedResId] = useState<string | null>(null);
  const [isEditingRes, setIsEditingRes] = useState(false);
  const [resForm, setResForm] = useState<Omit<ResourceItem, 'id'>>({
    title: '',
    type: 'video',
    description: '',
    durationOrSize: '',
    redirectUrl: '',
    imageUrl: '',
    featured: false
  });

  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Handlers
  const handleSaveSEO = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('Guardando parámetros SEO en Supabase...');
    try {
      await updateContactInfo(seoForm);
      setSaveStatus('✓ Parámetros Institucionales y SEO de Google actualizados en vivo en Supabase.');
      saveSuperAdminAuditLog({
        actionType: 'SEO_PARAMETERS_UPDATE',
        confirmationCode: 'SEO-UPD-2026',
        affectedRecords: 1
      }).catch(console.warn);
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err: any) {
      setSaveStatus(`❌ Error de Base de Datos: ${err.message || 'No se pudo guardar la configuración de SEO'}`);
    }
  };

  const handleCreateResource = async (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `res-${Date.now()}`;
    setSaveStatus('Publicando recurso en Supabase...');
    try {
      await addResource({
        id: newId,
        ...resForm
      });
      setSaveStatus('✓ Nuevo recurso CMS creado y guardado en la base de datos.');
      saveSuperAdminAuditLog({
        actionType: 'CMS_RESOURCE_CREATE',
        confirmationCode: 'CMS-RES-ADD',
        affectedRecords: 1
      }).catch(console.warn);
      
      // Reset
      setResForm({
        title: '',
        type: 'video',
        description: '',
        durationOrSize: '',
        redirectUrl: '',
        imageUrl: '',
        featured: false
      });
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err: any) {
      setSaveStatus(`❌ Error de Base de Datos: ${err.message || 'Verifica permisos RLS de la tabla blog_resources'}`);
    }
  };

  const handleUpdateResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResId) return;
    setSaveStatus('Actualizando recurso en Supabase...');
    try {
      await editResource({
        id: selectedResId,
        ...resForm
      });
      setSaveStatus('✓ Cambios en el recurso CMS guardados en la base de datos.');
      setIsEditingRes(false);
      setSelectedResId(null);
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err: any) {
      setSaveStatus(`❌ Error al actualizar: ${err.message || 'Verifica la conexión'}`);
    }
  };

  const handleDeleteResource = async (id: string) => {
    setSaveStatus('Eliminando recurso de Supabase...');
    try {
      await deleteResource(id);
      setSaveStatus('✓ Recurso CMS eliminado de la base de datos.');
      if (selectedResId === id) {
        setIsEditingRes(false);
        setSelectedResId(null);
      }
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err: any) {
      setSaveStatus(`❌ Error al eliminar: ${err.message || 'Verifica la conexión'}`);
    }
  };

  const startEditResource = (item: ResourceItem) => {
    setSelectedResId(item.id);
    setResForm({
      title: item.title,
      type: item.type,
      description: item.description,
      durationOrSize: item.durationOrSize,
      redirectUrl: item.redirectUrl || '',
      imageUrl: item.imageUrl || '',
      featured: item.featured || false
    });
    setIsEditingRes(true);
  };

  const handleToggleFeatured = async (item: ResourceItem) => {
    setSaveStatus('Actualizando destacado...');
    try {
      await editResource({ ...item, featured: !item.featured });
      setSaveStatus(item.featured ? '✓ Recurso removido del banner destacado.' : '✓ Recurso marcado como destacado en el banner.');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err: any) {
      setSaveStatus(`❌ Error: ${err.message}`);
    }
  };

  const getResIcon = (type: string) => {
    if (type === 'video') return <Video className="w-4 h-4 text-cyan-400" />;
    if (type === 'podcast') return <Volume2 className="w-4 h-4 text-indigo-400" />;
    if (type === 'template') return <BookMarked className="w-4 h-4 text-emerald-400" />;
    return <FileText className="w-4 h-4 text-purple-400" />;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
            DOMINIO EXPERIENCE CMS • ADMINISTRADOR DE CONTENIDOS Y SEO
          </span>
          <h2 className="text-2xl font-extrabold text-white font-heading">
            Gestor de Contenidos & Sincronización Google SEO
          </h2>
        </div>
      </div>

      {/* Save Notification Alert */}
      {saveStatus && (
        <div 
          className={`p-3.5 rounded-xl border text-xs font-bold flex items-center space-x-2 animate-in fade-in duration-200 ${
            saveStatus.startsWith('❌') 
              ? 'bg-red-500/10 border-red-500/30 text-red-400' 
              : saveStatus.startsWith('✓') 
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
              : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
          }`}
        >
          <CheckCircle2 className={`w-4 h-4 shrink-0 ${saveStatus.startsWith('❌') ? 'text-red-400' : 'text-emerald-400'}`} />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Tabs Menu navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${
            activeTab === 'resources' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Gestor de Recursos ({resources.length} Multimedia)</span>
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${
            activeTab === 'seo' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Parámetros de Contacto & SEO Google</span>
        </button>
      </div>

      {/* RESOURCES TAB (CMS CRUD) */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in slide-in-from-bottom-3 duration-300">
          
          {/* Left Column: Resources List */}
          <div className="lg:col-span-7 bg-slate-900/60 p-4 rounded-3xl border border-slate-800/80 space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest px-2 pb-2 border-b border-slate-800">
              Listado de Recursos Publicados ({resources.length})
            </h3>

            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1 text-xs">
              {resources.map((item) => (
                <div 
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-850 flex items-start justify-between space-x-3 group hover:border-cyan-500/30 transition-all"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 rounded bg-slate-900 border border-slate-800">
                        {getResIcon(item.type)}
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-500">{item.type}</span>
                      <span className="text-[9px] font-mono text-cyan-400">({item.durationOrSize})</span>
                    </div>
                    <h4 className="font-bold text-white truncate max-w-xs sm:max-w-md">{item.title}</h4>
                    {item.featured && (
                      <span className="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">⭐ Banner</span>
                    )}
                    {item.imageUrl && (
                      <span className="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">🖼️ Imagen</span>
                    )}
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>
                    
                    {item.redirectUrl && (
                      <a 
                        href={item.redirectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center space-x-1 text-[9px] text-cyan-400 hover:underline pt-1 font-mono"
                      >
                        <Link2 className="w-3 h-3" />
                        <span className="truncate max-w-[180px]">{item.redirectUrl}</span>
                      </a>
                    )}
                  </div>

                  <div className="flex space-x-1 shrink-0">
                    <button
                      onClick={() => handleToggleFeatured(item)}
                      className={`p-2 rounded-xl transition-all border ${
                        item.featured 
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-white' 
                          : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-amber-400'
                      }`}
                      title={item.featured ? 'Quitar del Banner' : 'Mostrar en Banner Destacado'}
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => startEditResource(item)}
                      className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 rounded-xl transition-all"
                      title="Editar"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteResource(item.id)}
                      className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Add/Edit Form */}
          <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white font-heading border-b border-slate-800 pb-2 flex items-center space-x-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>{isEditingRes ? 'Editar Recurso CMS' : 'Publicar Nuevo Recurso'}</span>
            </h3>

            <form onSubmit={isEditingRes ? handleUpdateResource : handleCreateResource} className="space-y-4 text-xs">
              <div className="space-y-1.5 text-left">
                <label className="block text-slate-300 font-bold">Título del Recurso</label>
                <input
                  type="text"
                  required
                  value={resForm.title}
                  onChange={(e) => setResForm({ ...resForm, title: e.target.value })}
                  placeholder="Ej: Podcast 04 - Gobernanza de Metadatos"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5 text-left">
                  <label className="block text-slate-300 font-bold">Tipo de Recurso</label>
                  <select
                    value={resForm.type}
                    onChange={(e) => setResForm({ ...resForm, type: e.target.value as any })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-bold"
                  >
                    <option value="video">Video Clase</option>
                    <option value="podcast">Podcast Audio</option>
                    <option value="template">Plantilla / Excel</option>
                    <option value="whitepaper">PDF Whitepaper</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="block text-slate-300 font-bold">Duración o Tamaño</label>
                  <input
                    type="text"
                    required
                    value={resForm.durationOrSize}
                    onChange={(e) => setResForm({ ...resForm, durationOrSize: e.target.value })}
                    placeholder="Ej: 30 Minutos o 2.4 MB"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-slate-300 font-bold">URL de Enlace de Redirección (Google SEO Target)</label>
                <input
                  type="url"
                  required
                  value={resForm.redirectUrl}
                  onChange={(e) => setResForm({ ...resForm, redirectUrl: e.target.value })}
                  placeholder="Ej: https://youtube.com/watch?v=..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-mono text-[11px]"
                />
                <p className="text-[10px] text-slate-500 font-mono">
                  Enlace externo o interno que indexarán los motores de búsqueda para posicionar orgánicamente.
                </p>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-slate-300 font-bold">🖼️ URL de Imagen de Portada (Cover Thumbnail)</label>
                <input
                  type="url"
                  value={resForm.imageUrl || ''}
                  onChange={(e) => setResForm({ ...resForm, imageUrl: e.target.value })}
                  placeholder="Ej: https://i.imgur.com/mi-imagen-1280x720.jpg"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-mono text-[11px]"
                />
                <p className="text-[10px] text-slate-500 font-mono">
                  Suba una imagen de <strong className="text-cyan-400">1280 × 720 px</strong> (proporción 16:9) para que se vea nítida en el banner y las tarjetas tipo Netflix. Puede usar Imgur, Cloudinary o cualquier CDN público.
                </p>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-slate-300 font-bold">Breve Descripción</label>
                <textarea
                  rows={3}
                  required
                  value={resForm.description}
                  onChange={(e) => setResForm({ ...resForm, description: e.target.value })}
                  placeholder="Describa el contenido técnico del recurso para el indexador semántico..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={resForm.featured || false}
                  onChange={(e) => setResForm({ ...resForm, featured: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
                <label htmlFor="featured-check" className="text-slate-300 font-bold cursor-pointer">
                  ⭐ Mostrar en el Banner Destacado (carrusel superior)
                </label>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg text-xs"
                >
                  {isEditingRes ? 'Guardar Cambios' : 'Publicar Recurso'}
                </button>
                {isEditingRes && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingRes(false);
                      setSelectedResId(null);
                      setResForm({ title: '', type: 'video', description: '', durationOrSize: '', redirectUrl: '', imageUrl: '', featured: false });
                    }}
                    className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SEO & CONTACT PARAMETERS TAB */}
      {activeTab === 'seo' && (
        <form onSubmit={handleSaveSEO} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 text-left animate-in slide-in-from-bottom-3 duration-250 text-xs">
          
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white font-heading flex items-center space-x-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span>Parametrización de Información de Google SEO</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Configure las variables de contacto de la landing page y las etiquetas meta orgánicas de indexación de Google.
            </p>
          </div>

          {/* Logo Branding & Size Slider */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-850 pb-2">
              🎨 LOGOTIPO INSTITUCIONAL & TAMAÑO CABECERA
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-slate-350 font-bold">URL del Logo Institucional</label>
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-[11px]"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-slate-350 font-bold">Ancho del Logo en Cabecera</label>
                  <span className="text-cyan-400 font-mono font-bold">{logoSize}px</span>
                </div>
                <input
                  type="range"
                  min={120}
                  max={380}
                  step={5}
                  value={logoSize}
                  onChange={(e) => setLogoSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <p className="text-[10px] text-slate-500 font-mono">
                  Deslice para ampliar el tamaño de la imagen del logo en el menú superior.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Side: Contact Information */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-850 pb-2">
                📞 DATOS DE CONTACTO DIRECTO
              </h4>

              <div className="space-y-1.5">
                <label className="block text-slate-350 font-bold">Correo Corporativo Principal</label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type="email"
                    required
                    value={seoForm.email}
                    onChange={(e) => setSeoForm({ ...seoForm, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-350 font-bold">Número de Teléfono Público</label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type="text"
                    required
                    value={seoForm.phone}
                    onChange={(e) => setSeoForm({ ...seoForm, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-350 font-bold">WhatsApp ID (Solo Números e Indicativo)</label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type="text"
                    required
                    value={seoForm.whatsapp}
                    onChange={(e) => setSeoForm({ ...seoForm, whatsapp: e.target.value })}
                    placeholder="Ej: 573001234567"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
                <p className="text-[10px] text-slate-500 font-mono">
                  Enlaza el widget flotante del pie de página automáticamente.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-350 font-bold">Dirección de Oficina</label>
                <div className="relative flex items-center">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type="text"
                    required
                    value={seoForm.address}
                    onChange={(e) => setSeoForm({ ...seoForm, address: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Right Side: SEO Meta Parameters */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-850 pb-2">
                🔍 GOOGLE SEARCH ENGINE OPTIMIZATION (SEO)
              </h4>

              <div className="space-y-1.5">
                <label className="block text-slate-350 font-bold">Google Meta Keywords (Separadas por Comas)</label>
                <textarea
                  rows={2}
                  required
                  value={seoForm.metaKeywords}
                  onChange={(e) => setSeoForm({ ...seoForm, metaKeywords: e.target.value })}
                  placeholder="Gobierno de Datos, DAMA, TOGAF, Ley 1581..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-cyan-400 font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-350 font-bold">Google Meta Description (Resumen Orgánico)</label>
                <textarea
                  rows={4}
                  required
                  value={seoForm.metaDescription}
                  onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
                  placeholder="Escriba la descripción que indexará Google en sus resultados orgánicos..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-cyan-400 leading-normal"
                />
              </div>
            </div>

          </div>

          {/* Action button */}
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
            <p className="text-[10px] text-slate-500 font-mono leading-relaxed max-w-md">
              💡 Al guardar estos datos, el sistema inyecta en caliente los descriptores meta en el DOM del navegador. Google y Bing rastrearán los valores indexados.
            </p>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-xl"
            >
              Guardar Parámetros & SEO Google
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
