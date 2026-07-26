import React, { useState } from 'react';
import { useData, type MenuItem } from '../../../context/DataContext';
import { 
  Menu, 
  Layers, 
  ArrowUp, 
  ArrowDown, 
  Plus, 
  Trash2, 
  Edit2, 
  CheckCircle2, 
  AlertCircle,
  Home,
  Briefcase,
  GraduationCap,
  Scale,
  Search,
  Cpu,
  Users,
  FileText,
  Award,
  Mail,
  ExternalLink,
  Globe,
  X
} from 'lucide-react';
import { saveSuperAdminAuditLog } from '../../../lib/supabase';

// Map icon names to Lucide elements for the preview
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Home,
  Briefcase,
  GraduationCap,
  Scale,
  Search,
  Cpu,
  Users,
  FileText,
  Award,
  Mail,
  ExternalLink,
  Globe
};

// Friendly section names mapping
const SECTION_NAMES: Record<string, string> = {
  hero: '1. Introducción Principal (Hero Banner)',
  ai_features: '2. Asistente IA & Copiloto Interactivo',
  academy_banner: '3. Especialidad CDMP Banner Rápido',
  govdata_nexus: '4. GovData Nexus Showcase (GovTech SaaS)',
  services: '5. Servicios DAMA & MIPG Explorer',
  academy_info: '6. Estructura Académica (GovData Academy)',
  specialized_ai: '7. Suite de IA Especializada',
  case_studies: '8. Casos de Éxito (Línea de Tiempo)',
  blog_resources: '9. Biblioteca de Recursos & Blog'
};

export const MenuLayoutDomain: React.FC = () => {
  const { menuItems, sectionOrder, updateLayoutConfig } = useData();

  const [activeSubTab, setActiveSubTab] = useState<'menus' | 'sections'>('menus');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Menu items list state
  const [localMenus, setLocalMenus] = useState<MenuItem[]>([...menuItems]);
  // Section order state
  const [localSections, setLocalSections] = useState<string[]>([...sectionOrder]);

  // Modal for creating/editing menu item
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [isEditingMenu, setIsEditingMenu] = useState(false);
  const [menuForm, setMenuForm] = useState<MenuItem>({
    id: '',
    label: '',
    link: 'home',
    icon: 'Home',
    active: true,
    order: 1
  });

  // Handle Menu Actions
  const handleOpenCreateMenu = () => {
    setIsEditingMenu(false);
    setMenuForm({
      id: `menu-${Date.now()}`,
      label: '',
      link: 'home',
      icon: 'Home',
      active: true,
      order: localMenus.length + 1
    });
    setMenuModalOpen(true);
  };

  const handleOpenEditMenu = (item: MenuItem) => {
    setIsEditingMenu(true);
    setMenuForm({ ...item });
    setMenuModalOpen(true);
  };

  const handleMenuSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingMenu) {
      setLocalMenus(prev => prev.map(m => m.id === menuForm.id ? menuForm : m));
    } else {
      setLocalMenus(prev => [...prev, menuForm]);
    }
    setMenuModalOpen(false);
  };

  const handleDeleteMenu = (id: string) => {
    if (!confirm('¿Está seguro de eliminar esta opción de menú?')) return;
    setLocalMenus(prev => prev.filter(m => m.id !== id));
  };

  const toggleMenuVisibility = (id: string) => {
    setLocalMenus(prev => prev.map(m => m.id === id ? { ...m, active: !m.active } : m));
  };

  // Section Order operations
  const moveSectionUp = (index: number) => {
    if (index === 0) return;
    const newSections = [...localSections];
    const temp = newSections[index];
    newSections[index] = newSections[index - 1];
    newSections[index - 1] = temp;
    setLocalSections(newSections);
  };

  const moveSectionDown = (index: number) => {
    if (index === localSections.length - 1) return;
    const newSections = [...localSections];
    const temp = newSections[index];
    newSections[index] = newSections[index + 1];
    newSections[index + 1] = temp;
    setLocalSections(newSections);
  };

  // Save changes to Supabase
  const handleSaveLayout = async () => {
    setSaveStatus('Guardando cambios de diseño en Supabase...');
    try {
      // Re-assign order numbers to menus based on current index
      const orderedMenus = localMenus.map((m, idx) => ({
        ...m,
        order: idx + 1
      }));
      setLocalMenus(orderedMenus);

      await updateLayoutConfig(orderedMenus, localSections);
      setSaveStatus('✓ Menús y Orden de Secciones sincronizados correctamente.');
      
      saveSuperAdminAuditLog({
        actionType: 'MENU_LAYOUT_SETTINGS_UPDATE',
        confirmationCode: 'LAYOUT-UPD-2026',
        affectedRecords: 2
      }).catch(console.warn);

      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err: any) {
      setSaveStatus(`❌ Error de Base de Datos: ${err.message || 'No se pudo guardar la configuración de menús'}`);
    }
  };

  const getMenuIcon = (iconName: string) => {
    const IconComponent = ICON_MAP[iconName] || Home;
    return <IconComponent className="w-4 h-4 text-cyan-400" />;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
            DXP COMMAND CENTER • CONFIGURACIÓN GLOBAL DE APARIENCIA
          </span>
          <h2 className="text-2xl font-extrabold text-white font-heading flex items-center space-x-2.5">
            <Layers className="w-7 h-7 text-cyan-400" />
            <span>Gestor de Menús & Orden de Secciones</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Gestione las opciones de navegación principal, asocie enlaces directos, defina los accesos y ordene gráficamente las secciones de la página principal.
          </p>
        </div>

        <button
          onClick={handleSaveLayout}
          className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-xl flex items-center space-x-1.5"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Publicar Cambios de Diseño</span>
        </button>
      </div>

      {/* Save Notification */}
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
          {saveStatus.startsWith('❌') ? (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
          )}
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Sub Tabs Navigation */}
      <div className="flex gap-2 border-b border-slate-800 pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('menus')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${
            activeSubTab === 'menus' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-850 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Menu className="w-4 h-4" />
          <span>Opciones de Menú de Navegación ({localMenus.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('sections')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${
            activeSubTab === 'sections' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-850 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Ordenación Gráfica de Secciones ({localSections.length})</span>
        </button>
      </div>

      {/* SUBTAB 1: Menu Items Editor */}
      {activeSubTab === 'menus' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white font-heading">
              Enlaces y Accesos Directos de la Web (Header & Footer)
            </h3>
            <button
              onClick={handleOpenCreateMenu}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 text-cyan-400 text-xs font-bold flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Enlace / Menú</span>
            </button>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] bg-slate-950/40">
                  <th className="py-3.5 px-4 font-bold">Orden</th>
                  <th className="py-3.5 px-4 font-bold">Nombre de la Opción</th>
                  <th className="py-3.5 px-4 font-bold">Ícono</th>
                  <th className="py-3.5 px-4 font-bold">Dirección / Enlace (Link)</th>
                  <th className="py-3.5 px-4 font-bold">Estado Visible</th>
                  <th className="py-3.5 px-4 font-bold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                {localMenus.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-850/40">
                    <td className="py-3 px-4 font-mono text-cyan-400 font-bold">{index + 1}</td>
                    <td className="py-3 px-4 text-white font-bold text-sm">{item.label}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-850 w-fit">
                        {getMenuIcon(item.icon)}
                        <span className="text-[10px] text-slate-400 font-mono">{item.icon}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-950 text-slate-300 border border-slate-850 font-mono truncate max-w-[200px] block">
                        {item.link}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleMenuVisibility(item.id)}
                        className={`px-3 py-1 rounded-xl text-[10px] font-bold border transition-colors ${
                          item.active 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' 
                            : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                        }`}
                      >
                        {item.active ? 'Visible' : 'Oculto'}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2 text-slate-500">
                        <button
                          onClick={() => handleOpenEditMenu(item)}
                          className="p-1.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteMenu(item.id)}
                          className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 2: Section Order Editor */}
      {activeSubTab === 'sections' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white font-heading">
              Ordenador de Bloques de la Página Principal (Home)
            </h3>
            <p className="text-[11px] text-slate-400">
              Desplace las secciones arriba o abajo gráficamente. Esto modificará instantáneamente el orden de carga visual de la página principal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* List Order Control */}
            <div className="space-y-3">
              {localSections.map((sectId, index) => (
                <div 
                  key={sectId} 
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-bold text-white group hover:border-cyan-500/40 transition-all shadow-xl"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {index + 1}
                    </span>
                    <span>{SECTION_NAMES[sectId] || sectId}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => moveSectionUp(index)}
                      disabled={index === 0}
                      className="p-2 rounded-lg bg-slate-950 border border-slate-850 hover:bg-slate-850 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Subir Sección"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveSectionDown(index)}
                      disabled={index === localSections.length - 1}
                      className="p-2 rounded-lg bg-slate-950 border border-slate-850 hover:bg-slate-850 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Bajar Sección"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Layout Map Graphic Concept (Apple Style) */}
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-850 pb-2 flex items-center space-x-1.5">
                  <Layers className="w-4 h-4" />
                  <span>Previsualización del Diseño Estructural</span>
                </h4>
                
                <p className="text-[10px] text-slate-400 leading-normal">
                  A continuación se muestra el esquema gráfico de tu embudo de ventas en el Home en el orden seleccionado:
                </p>

                <div className="space-y-2 border-l-2 border-dashed border-cyan-500/30 pl-4 py-1">
                  {localSections.map((sectId, i) => (
                    <div key={sectId} className="p-2 rounded-xl bg-slate-950 border border-slate-850 text-[10px] font-mono text-slate-350">
                      [{i + 1}] {sectId.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400 leading-normal mt-6">
                💡 <strong>Consejo SEO:</strong> Mantener el banner principal (Hero) de primero para evitar penalizaciones de Google Core Web Vitals (LCP).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE/EDIT MENU MODAL */}
      {menuModalOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl relative space-y-4 text-left">
            <button onClick={() => setMenuModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-lg font-bold text-white font-heading">
              {isEditingMenu ? 'Editar Opción de Menú' : 'Crear Nueva Opción de Menú'}
            </h3>

            <form onSubmit={handleMenuSubmit} className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className="block text-slate-300 font-bold">Nombre / Etiqueta Visible</label>
                <input
                  type="text"
                  required
                  value={menuForm.label}
                  onChange={(e) => setMenuForm({ ...menuForm, label: e.target.value })}
                  placeholder="Ej: Blog Corporativo"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-bold">Dirección / Enlace (Link)</label>
                <select 
                  value={menuForm.link} 
                  onChange={(e) => setMenuForm({ ...menuForm, link: e.target.value })} 
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
                >
                  <option value="home">Inicio (home)</option>
                  <option value="consulting">Consultoría (consulting)</option>
                  <option value="academy">Academia (academy)</option>
                  <option value="legal">Centro Legal (legal)</option>
                  <option value="research">Investigación (research)</option>
                  <option value="labs">Laboratorio IA (labs)</option>
                  <option value="community">Comunidad (community)</option>
                  <option value="resources">Recursos (resources)</option>
                  <option value="glossary">Glosario de Conceptos (glossary)</option>
                  <option value="contact">Contacto (contact)</option>
                  <option value="https://wa.me/573001234567">WhatsApp Directo</option>
                  <option value="https://legalcol.vercel.app">Link Externo</option>
                </select>
                <p className="text-[10px] text-slate-500 mt-1">
                  Puedes editar este valor libremente escribiendo una URL externa en el código si es necesario.
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-bold">Ícono Representativo</label>
                <select
                  value={menuForm.icon}
                  onChange={(e) => setMenuForm({ ...menuForm, icon: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-mono"
                >
                  <option value="Home">Home (Inicio)</option>
                  <option value="Briefcase">Briefcase (Maletín / Servicios)</option>
                  <option value="GraduationCap">GraduationCap (Sombrero / Academia)</option>
                  <option value="Scale">Scale (Balanza / Legal)</option>
                  <option value="Search">Search (Lupa / Buscar)</option>
                  <option value="Cpu">Cpu (Chip / Inteligencia Artificial)</option>
                  <option value="Users">Users (Grupo / Comunidad)</option>
                  <option value="FileText">FileText (Documento / Recursos)</option>
                  <option value="Award">Award (Medalla / Conceptos SEO)</option>
                  <option value="Mail">Mail (Correo / Contacto)</option>
                  <option value="Globe">Globe (Planeta / Enlace)</option>
                  <option value="ExternalLink">ExternalLink (Link Externo)</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="menu-active-checkbox"
                  checked={menuForm.active}
                  onChange={(e) => setMenuForm({ ...menuForm, active: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-cyan-400"
                />
                <label htmlFor="menu-active-checkbox" className="text-slate-300 font-bold cursor-pointer">
                  Activo (Visible en Navegación)
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg mt-4 text-xs uppercase"
              >
                {isEditingMenu ? 'Guardar Cambios' : 'Añadir al Menú'}
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
