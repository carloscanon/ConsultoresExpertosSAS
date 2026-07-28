import React, { useState } from 'react';
import { useTheme, THEMES, type ThemeId } from '../../../context/ThemeContext';
import { 
  Palette, 
  CheckCircle2, 
  Sparkles, 
  Monitor, 
  Sun, 
  Moon,
  Star,
  Zap,
  Eye,
  Upload,
  Save
} from 'lucide-react';

export const ThemeSelectorDomain: React.FC = () => {
  const { 
    theme: activeTheme, 
    setTheme, 
    currentThemeDef,
    logoUrl,
    logoSize,
    logoHeight,
    logoWidth,
    mobileLogoSize,
    mobileLogoHeight,
    mobileLogoWidth,
    setLogoUrl,
    setLogoSize,
    setLogoHeight,
    setLogoWidth,
    setMobileLogoSize,
    setMobileLogoHeight,
    setMobileLogoWidth,
    saveLogoConfigurationToDb
  } = useTheme();
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);
  const [logoTab, setLogoTab] = useState<'desktop' | 'mobile'>('desktop');
  const [savingLogo, setSavingLogo] = useState(false);

  const handleApplyTheme = (themeId: ThemeId, themeName: string) => {
    setTheme(themeId);
    setAppliedNotification(`✓ Tema "${themeName}" aplicado y guardado en toda la plataforma.`);
    setTimeout(() => setAppliedNotification(null), 3000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, suba un archivo de imagen válido (PNG, JPG, SVG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url) {
        setLogoUrl(base64Url);
        setAppliedNotification("✓ Logotipo corporativo subido e instalado con éxito.");
        setTimeout(() => setAppliedNotification(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const themeIcons: Record<ThemeId, React.ReactNode> = {
    dark_obsidian:   <Star className="w-4 h-4 text-cyan-400" />,
    midnight_indigo: <Moon className="w-4 h-4 text-indigo-400" />,
    emerald_slate:   <Zap className="w-4 h-4 text-emerald-400" />,
    govdata_cyan:    <Sparkles className="w-4 h-4 text-sky-400" />,
    executive_grey:  <Monitor className="w-4 h-4 text-slate-400" />,
    light_corporate: <Sun className="w-4 h-4 text-amber-500" />,
    light_clean_blue: <Sun className="w-4 h-4 text-blue-500" />,
    light_emerald_mint: <Sun className="w-4 h-4 text-emerald-500" />,
    light_minimal_sand: <Sun className="w-4 h-4 text-amber-600" />
  };


  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left">

      {/* Domain Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
            MÓDULO APARIENCIA & BRANDING • ENTERPRISE DXP PORTAL
          </span>
          <h2 className="text-2xl font-extrabold text-white font-heading flex items-center space-x-3">
            <Palette className="w-7 h-7 text-cyan-400" />
            <span>Selector de Tema & Experiencia Visual</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Personaliza completamente la apariencia del portal. Los cambios se aplican en tiempo real y se guardan automáticamente.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
            9 TEMAS ENTERPRISE
          </span>
        </div>
      </div>

      {/* Active Theme Status Banner */}
      <div 
        className="p-5 rounded-3xl border shadow-xl flex items-center justify-between"
        style={{
          background: `linear-gradient(135deg, ${currentThemeDef.preview.bg}, ${currentThemeDef.preview.card})`,
          borderColor: currentThemeDef.preview.accent + '40',
          boxShadow: `0 0 40px ${currentThemeDef.preview.accent}20`
        }}
      >
        <div className="flex items-center space-x-4">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border"
            style={{ background: currentThemeDef.preview.card, borderColor: currentThemeDef.preview.accent + '40' }}
          >
            {themeIcons[activeTheme]}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: currentThemeDef.preview.accent }}>
                TEMA ACTIVO ACTUALMENTE
              </span>
              {currentThemeDef.isDefault && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: currentThemeDef.preview.accent + '20', color: currentThemeDef.preview.accent }}>
                  DEFAULT
                </span>
              )}
            </div>
            <h3 className="text-lg font-extrabold font-heading" style={{ color: currentThemeDef.preview.text }}>
              {currentThemeDef.name}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: currentThemeDef.preview.text + 'AA' }}>
              {currentThemeDef.description}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-3">
          <div className="flex space-x-1.5">
            {currentThemeDef.tags.map((tag, i) => (
              <span key={i} className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono" 
                style={{ background: currentThemeDef.preview.accent + '20', color: currentThemeDef.preview.accent, border: `1px solid ${currentThemeDef.preview.accent}30` }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Applied notification */}
      {appliedNotification && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-in fade-in duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{appliedNotification}</span>
        </div>
      )}

      {/* 9 Theme Cards Grid */}
      <div>
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 font-mono">
          ELIGE TU EXPERIENCIA VISUAL
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {THEMES.map((themeDef) => {
            const isActive = activeTheme === themeDef.id;

            return (
              <div
                key={themeDef.id}
                className="group relative cursor-pointer"
                onClick={() => handleApplyTheme(themeDef.id, themeDef.name)}
              >
                {/* Theme Card */}
                <div
                  className="rounded-3xl border overflow-hidden shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between"
                  style={{
                    background: themeDef.preview.card,
                    borderColor: isActive ? themeDef.preview.accent : 'rgba(255,255,255,0.06)',
                    boxShadow: isActive ? `0 10px 30px ${themeDef.preview.accent}15` : 'none'
                  }}
                >
                  {/* Theme Preview Header (Mock layout preview) */}
                  <div className="p-4 space-y-3" style={{ background: themeDef.preview.bg }}>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: themeDef.preview.accent }} />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      </div>
                      <div className="h-4 rounded px-1.5 text-[9px] font-bold font-mono" style={{ background: themeDef.preview.accent + '20', color: themeDef.preview.accent }}>
                        PROT-DXP
                      </div>
                    </div>

                    <div 
                      className="rounded-xl p-4 mb-3 space-y-2"
                      style={{ background: `${themeDef.preview.bg}CC` }}
                    >
                      <div className="h-3 rounded-full w-3/4" style={{ background: themeDef.preview.text + '80' }} />
                      <div className="h-2 rounded-full w-1/2" style={{ background: themeDef.preview.text + '40' }} />
                      <div className="flex space-x-2 mt-2">
                        <div className="h-7 w-20 rounded-lg" style={{ background: themeDef.preview.accent }} />
                        <div className="h-7 w-20 rounded-lg border" style={{ borderColor: themeDef.preview.accent + '60', background: 'transparent' }} />
                      </div>
                    </div>

                    {/* KPI Cards row preview */}
                    <div className="grid grid-cols-3 gap-2">
                      {[48, 35, 22].map((w, i) => (
                        <div 
                          key={i}
                          className="rounded-lg p-2 space-y-1"
                          style={{ background: themeDef.preview.card, border: `1px solid ${themeDef.preview.accent}15` }}
                        >
                          <div className="h-1.5 rounded w-full" style={{ background: themeDef.preview.text + '30' }} />
                          <div className="h-3 rounded" style={{ background: themeDef.preview.accent + (i === 0 ? 'FF' : i === 1 ? 'CC' : '88'), width: `${w}%` }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Theme Info Footer */}
                  <div 
                    className="px-5 py-4 border-t"
                    style={{ borderColor: themeDef.preview.accent + '20', background: themeDef.preview.card + 'AA' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {themeIcons[themeDef.id]}
                        <div>
                          <h4 className="text-sm font-extrabold font-heading" style={{ color: themeDef.preview.text }}>
                            {themeDef.name}
                          </h4>
                          <p className="text-[10px] mt-0.5 leading-tight" style={{ color: themeDef.preview.text + '80' }}>
                            {themeDef.description.substring(0, 55)}...
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {themeDef.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[9px] font-bold font-mono"
                          style={{ background: themeDef.preview.accent + '20', color: themeDef.preview.accent }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyTheme(themeDef.id, themeDef.name);
                      }}
                      className="mt-4 w-full py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center justify-center space-x-2"
                      style={isActive ? {
                        background: themeDef.preview.accent,
                        color: themeDef.preview.bg,
                        cursor: 'default'
                      } : {
                        background: themeDef.preview.accent + '20',
                        color: themeDef.preview.accent,
                        border: `1px solid ${themeDef.preview.accent}40`
                      }}
                    >
                      {isActive ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Tema Activo</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          <span>Aplicar Este Tema</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 📥 CUSTOM BRAND LOGO PARAMETERIZATION PANEL */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white font-heading uppercase tracking-wider flex items-center space-x-2">
              <span>Gestión del Logotipo & Dimensiones Responsivas</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Suba su logotipo corporativo y configure tamaños independientes para pantallas Desktop y Dispositivos Móviles. Guardado en tiempo real en Supabase DB.
            </p>
          </div>

          {/* Desktop / Mobile Tab Switcher */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold font-mono">
            <button
              onClick={() => setLogoTab('desktop')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                logoTab === 'desktop' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              💻 ESCRITORIO (DESKTOP)
            </button>
            <button
              onClick={() => setLogoTab('mobile')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                logoTab === 'mobile' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              📱 MÓVIL (MOBILE)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Form Sliders */}
          <div className="space-y-5">
            <div className="space-y-1.5 text-left">
              <label className="block text-slate-300 font-bold font-sans">URL de la Imagen del Logo (Opcional)</label>
              <input
                type="text"
                placeholder="https://ejemplo.com/logo.png"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono"
              />
              <p className="text-[10px] text-slate-500">
                Deje en blanco para usar el logotipo predeterminado de "Consultores Expertos SAS".
              </p>
            </div>

            {logoTab === 'desktop' ? (
              <>
                {/* Desktop Sliders */}
                <div className="space-y-1.5 text-left bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex justify-between font-bold text-slate-300">
                    <span>📐 Ancho Contenedor Desktop</span>
                    <span className="text-cyan-400 font-mono">{logoSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="600"
                    step="5"
                    value={logoSize}
                    onChange={(e) => setLogoSize(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>80px</span>
                    <span>180px</span>
                    <span>600px</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-left bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex justify-between font-bold text-slate-300">
                    <span>↕️ Alto Máximo Imagen (Desktop)</span>
                    <span className="text-indigo-400 font-mono">{logoHeight}px</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="180"
                    step="2"
                    value={logoHeight}
                    onChange={(e) => setLogoHeight(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>20px</span>
                    <span>56px</span>
                    <span>180px</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-left bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex justify-between font-bold text-slate-300">
                    <span>↔️ Llenado Horizontal (Desktop %)</span>
                    <span className="text-emerald-400 font-mono">{logoWidth}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={logoWidth}
                    onChange={(e) => setLogoWidth(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Mobile Sliders */}
                <div className="space-y-1.5 text-left bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex justify-between font-bold text-slate-300">
                    <span>📱 Ancho Contenedor Móvil</span>
                    <span className="text-cyan-400 font-mono">{mobileLogoSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="350"
                    step="5"
                    value={mobileLogoSize}
                    onChange={(e) => setMobileLogoSize(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>60px</span>
                    <span>140px</span>
                    <span>350px</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-left bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex justify-between font-bold text-slate-300">
                    <span>↕️ Alto Máximo Imagen (Móvil)</span>
                    <span className="text-indigo-400 font-mono">{mobileLogoHeight}px</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="120"
                    step="2"
                    value={mobileLogoHeight}
                    onChange={(e) => setMobileLogoHeight(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                  />
                </div>

                <div className="space-y-1.5 text-left bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex justify-between font-bold text-slate-300">
                    <span>↔️ Llenado Horizontal (Móvil %)</span>
                    <span className="text-emerald-400 font-mono">{mobileLogoWidth}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={mobileLogoWidth}
                    onChange={(e) => setMobileLogoWidth(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>
              </>
            )}

            {/* Save Button for Logo Settings */}
            <div className="pt-4 border-t border-slate-800 flex items-center space-x-3">
              <button
                type="button"
                onClick={async () => {
                  setSavingLogo(true);
                  try {
                    await saveLogoConfigurationToDb();
                    setAppliedNotification("✓ Dimensiones y Logotipo guardados definitivamente en Supabase DB.");
                  } catch (e) {
                    setAppliedNotification("❌ Error al guardar en base de datos.");
                  } finally {
                    setSavingLogo(false);
                    setTimeout(() => setAppliedNotification(null), 4000);
                  }
                }}
                disabled={savingLogo}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs transition-all shadow-lg flex items-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <Save className={`w-4 h-4 ${savingLogo ? 'animate-spin' : ''}`} />
                <span>{savingLogo ? 'Guardando en Supabase DB...' : '💾 GUARDAR PARÁMETROS DEL LOGO DE FORMA DEFINITIVA'}</span>
              </button>
            </div>
          </div>

          {/* Real-time Preview Area */}
          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-850 flex flex-col items-center justify-center space-y-4 relative min-h-[220px] overflow-hidden">
            <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest absolute top-3 left-4">
              VISTA PREVIA DEL LOGO ({logoTab.toUpperCase()})
            </span>

            <div 
              className="p-3 border border-slate-850 rounded-xl bg-slate-900 flex items-center justify-start overflow-hidden transition-all duration-300"
              style={{ 
                width: `${logoTab === 'desktop' ? logoSize : mobileLogoSize}px`, 
                minHeight: '60px' 
              }}
            >
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt="Vista previa logo" 
                  className="object-contain transition-all" 
                  style={{ 
                    maxHeight: `${logoTab === 'desktop' ? logoHeight : mobileLogoHeight}px`, 
                    width: `${logoTab === 'desktop' ? logoWidth : mobileLogoWidth}%` 
                  }} 
                />
              ) : (
                <div className="text-left py-2 px-1">
                  <p className="text-[10px] text-cyan-400 font-mono font-bold uppercase">Consultores Expertos SAS</p>
                  <p className="text-[9px] text-slate-500 font-mono">Gobierno de Datos & IA</p>
                </div>
              )}
            </div>

            {logoUrl && (
              <button
                type="button"
                onClick={() => {
                  setLogoUrl("");
                  setAppliedNotification("Se restableció el logotipo por defecto.");
                  setTimeout(() => setAppliedNotification(null), 3000);
                }}
                className="text-[10px] font-bold text-red-400 hover:text-red-300 transition-colors"
              >
                Restablecer a Logotipo Original
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Live Preview Info & Palette */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white font-heading">
          🎨 Paleta de Colores del Tema: {currentThemeDef.name}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Fondo Principal', color: currentThemeDef.preview.bg },
            { label: 'Fondo Tarjeta', color: currentThemeDef.preview.card },
            { label: 'Color de Acento', color: currentThemeDef.preview.accent },
            { label: 'Texto Principal', color: currentThemeDef.preview.text }
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div 
                className="h-16 rounded-2xl border border-white/10 shadow-lg"
                style={{ background: item.color }}
              />
              <div>
                <p className="text-[10px] font-mono font-bold text-slate-400">{item.label}</p>
                <p className="text-[11px] font-mono font-bold text-white uppercase">{item.color}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-500 font-mono border-t border-slate-800 pt-3">
          💡 Los temas se guardan automáticamente en el navegador. El tema seleccionado persiste entre sesiones y se aplica en tiempo real sin recargar la página.
        </p>
      </div>

    </div>
  );
};
