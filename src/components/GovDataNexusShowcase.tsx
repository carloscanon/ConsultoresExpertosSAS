import React, { useState } from 'react';
import { govDataModules } from '../data/govDataModules';
import { saveSuperAdminAuditLog, saveCDOChallengeResponse } from '../lib/supabase';
import { 
  Database, 
  GitCommit, 
  CheckCircle2, 
  ShieldCheck, 
  ShoppingBag, 
  Activity, 
  Cpu, 
  Sparkles, 
  FileText,
  AlertTriangle,
  BarChart3,
  Workflow,
  Users,
  Layers,
  TrendingUp,
  X,
  Search,
  RefreshCw,
  Download,
  Check,
  Award,
  LogIn,
  Target,
  Trash2,
  AlertOctagon,
  ShieldAlert,
  Key
} from 'lucide-react';

interface GovDataNexusShowcaseProps {
  onOpenDemo: () => void;
}

export const GovDataNexusShowcase: React.FC<GovDataNexusShowcaseProps> = ({ onOpenDemo }) => {
  const [activeTabMode, setActiveTabMode] = useState<'command_center' | 'metadata' | 'journey_cdo' | 'launchpad' | 'login' | 'modules'>('command_center');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  // Metadata Intelligence Search State
  const [metadataSearchQuery, setMetadataSearchQuery] = useState('');
  const [metadataActiveSubTab, setMetadataActiveSubTab] = useState<'fuentes' | 'clasificacion' | 'linaje' | 'glosario' | 'diccionario' | 'dominios'>('fuentes');

  // Journey CDO Quiz State
  const [cdoQuizSelectedOption, setCdoQuizSelectedOption] = useState<'A' | 'B' | null>(null);
  const [cdoQuizFeedback, setCdoQuizFeedback] = useState<string | null>(null);

  // Launchpad Wizard State
  const [launchpadStep, setLaunchpadStep] = useState<number>(1);

  // Super Admin Emergency Purge State (Cortes de Orden / Calidad)
  const [purgeModalOpen, setPurgeModalOpen] = useState<boolean>(false);
  const [purgeConfirmationCode, setPurgeConfirmationCode] = useState<string>('');
  const [purgeProgress, setPurgeProgress] = useState<number>(0);
  const [isPurging, setIsPurging] = useState<boolean>(false);
  const [purgeSuccess, setPurgeSuccess] = useState<boolean>(false);
  const [orderPurgedBanner, setOrderPurgedBanner] = useState<boolean>(false);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <Database className="w-5 h-5 text-blue-600" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
      case 'GitCommit': return <GitCommit className="w-5 h-5 text-blue-600" />;
      case 'Database': return <Database className="w-5 h-5 text-blue-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5 text-blue-600" />;
      case 'FileText': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-blue-600" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-blue-600" />;
      case 'Workflow': return <Workflow className="w-5 h-5 text-blue-600" />;
      case 'Users': return <Users className="w-5 h-5 text-blue-600" />;
      case 'Layers': return <Layers className="w-5 h-5 text-blue-600" />;
      case 'Activity': return <Activity className="w-5 h-5 text-blue-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-blue-600" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-600" />;
      default: return <Database className="w-5 h-5 text-blue-600" />;
    }
  };

  const selectedModule = govDataModules.find(m => m.id === selectedModuleId);

  const metadataAssets = [
    { name: 'MAESTRO RESULTADOS', source: 'SAP', records: '-', status: 'Vigente', date: '17/6/2026' },
    { name: 'usuarios_2', source: 'HILTOIN', records: '15', status: 'Vigente', date: '17/6/2026' },
    { name: 'usuarios_1', source: 'HILTOIN', records: '15', status: 'Vigente', date: '17/6/2026' },
    { name: 'Maestro Clientes', source: 'SAP ERP', records: '-', status: 'Vigente', date: '17/6/2026' },
    { name: 'operaciones', source: 'ColmotoresBD', records: '-', status: 'Vigente', date: '17/6/2026' },
    { name: 'Ventas años 2026', source: 'HILTOIN', records: '-', status: 'Vigente', date: '17/6/2026' },
    { name: 'Maestro talentos humanos', source: 'ColmotoresBD', records: '-', status: 'Vigente', date: '17/6/2026' }
  ].filter(a => a.name.toLowerCase().includes(metadataSearchQuery.toLowerCase()) || a.source.toLowerCase().includes(metadataSearchQuery.toLowerCase()));

  const handleCdoQuizChoice = async (option: 'A' | 'B') => {
    setCdoQuizSelectedOption(option);
    const isCorrect = option === 'A';
    if (isCorrect) {
      setCdoQuizFeedback('¡Correcto! Bajo DAMA-DMBOK, asignar formalmente la propiedad al Data Steward y unificar el identificador único es la decisión organizativa correcta.');
    } else {
      setCdoQuizFeedback('Incorrecto. Requerir verificación manual duplica el trabajo y no resuelve el problema de fondo de los datos duplicados.');
    }

    // Save CDO challenge response to Supabase
    await saveCDOChallengeResponse({
      selectedOption: option,
      isCorrect,
      scoreGained: isCorrect ? 25 : 0
    });
  };

  const handleExecuteSuperAdminPurge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (purgeConfirmationCode !== 'CONFIRMAR PURGA O-2026' && purgeConfirmationCode !== '900452089') {
      alert('Código de seguridad incorrecto. Escriba "CONFIRMAR PURGA O-2026" o el NIT de Super Administrador.');
      return;
    }

    setIsPurging(true);
    setPurgeProgress(20);

    // Save Super Admin Audit Log in Supabase
    await saveSuperAdminAuditLog({
      actionType: 'PURGA_CORTES_ORDEN',
      confirmationCode: purgeConfirmationCode,
      affectedRecords: 7
    });

    setTimeout(() => setPurgeProgress(50), 600);
    setTimeout(() => setPurgeProgress(85), 1200);
    setTimeout(() => {
      setPurgeProgress(100);
      setIsPurging(false);
      setPurgeSuccess(true);
      setOrderPurgedBanner(true);
      setTimeout(() => {
        setPurgeModalOpen(false);
        setPurgeSuccess(false);
        setPurgeConfirmationCode('');
        setPurgeProgress(0);
      }, 2000);
    }, 1800);
  };

  return (
    <section id="platform" className="py-24 relative bg-white text-slate-900 overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>PLATAFORMA OFICIAL • GOVDATANEXUS.COM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading mb-4 text-slate-900">
            GovData <span className="text-blue-600">Nexus™</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Explora en vivo los módulos oficiales de la plataforma de Gobierno de Datos Inteligente.
          </p>
        </div>



        {orderPurgedBanner && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500 text-emerald-900 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold font-heading uppercase">Orden Deshecha y Purgada Exitosamente</h4>
                <p className="text-xs text-slate-700">Se han eliminado por completo todos los registros, ejecuciones de calidad y cortes de orden sin dejar ninguna traza. Estado restablecido a cero y registrado en Supabase Audit.</p>
              </div>
            </div>
            <button onClick={() => setOrderPurgedBanner(false)} className="text-slate-400 hover:text-slate-900 p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Live Platform Module Mode Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTabMode('command_center')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
              activeTabMode === 'command_center'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Command Center 360°</span>
          </button>

          <button
            onClick={() => setActiveTabMode('metadata')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
              activeTabMode === 'metadata'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Metadata Intelligence 2.0</span>
          </button>

          <button
            onClick={() => setActiveTabMode('journey_cdo')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
              activeTabMode === 'journey_cdo'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Journey CDO (Simulador)</span>
          </button>

          <button
            onClick={() => setActiveTabMode('launchpad')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
              activeTabMode === 'launchpad'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Workflow className="w-4 h-4" />
            <span>GovData Launchpad</span>
          </button>

          <button
            onClick={() => setActiveTabMode('login')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
              activeTabMode === 'login'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Portal de Acceso</span>
          </button>

          <button
            onClick={() => setActiveTabMode('modules')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
              activeTabMode === 'modules'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Ver Todos los 16 Módulos</span>
          </button>
        </div>

        {/* TAB 1: COMMAND CENTER 360° (Exact Screen 2) */}
        {activeTabMode === 'command_center' && (
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 text-left">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                  GovData Nexus Command Center
                </h3>
                <p className="text-xs text-slate-500">
                  Visión ejecutiva consolidada 360° del estado de gobierno de datos.
                </p>
              </div>
              
              <div className="px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-semibold flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>👑 Repetible (Nivel 2) — Se aplican mínimos procesos y estándares básicos, pero de forma aislada.</span>
              </div>
            </div>

            {/* Top 5 Executive KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 border-t-4 border-t-blue-600 shadow-xs">
                <div className="text-[10px] font-bold uppercase text-slate-400">MADUREZ GLOBAL</div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">{orderPurgedBanner ? '0%' : '46%'}</div>
                <div className="text-[10px] text-slate-500 font-medium">{orderPurgedBanner ? 'Restablecido' : 'Nivel: Inicial'}</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 border-t-4 border-t-emerald-500 shadow-xs">
                <div className="text-[10px] font-bold uppercase text-slate-400">ÍNDICE OPERATIVO</div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">0%</div>
                <div className="text-[10px] text-emerald-600 font-medium">Operación fluida</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 border-t-4 border-t-amber-500 shadow-xs">
                <div className="text-[10px] font-bold uppercase text-slate-400">RIESGO GLOBAL</div>
                <div className="text-2xl font-extrabold text-amber-600 font-mono mt-1">{orderPurgedBanner ? 'Cero' : 'Medio'}</div>
                <div className="text-[10px] text-slate-500 font-medium">Incidentes críticos: 0</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 border-t-4 border-t-purple-500 shadow-xs">
                <div className="text-[10px] font-bold uppercase text-slate-400">ADOPCIÓN ORG.</div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">0%</div>
                <div className="text-[10px] text-slate-500 font-medium">Uso activo de plataforma</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 border-t-4 border-t-cyan-500 shadow-xs">
                <div className="text-[10px] font-bold uppercase text-slate-400">AVANCE DOCUMENTAL</div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">0%</div>
                <div className="text-[10px] text-slate-500 font-medium">Docs, Estándares & Proced.</div>
              </div>
            </div>

            {/* Dashboard Panels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Salud Operacional */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-blue-600 text-white">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading">Salud Operacional (Workflows)</h4>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
                  <div>
                    <span className="text-slate-500">Solicitudes Totales:</span>
                    <span className="font-bold text-slate-900 ml-2 font-mono">0</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Pendientes:</span>
                    <span className="font-bold text-slate-900 ml-2 font-mono">0</span>
                  </div>
                  <div>
                    <span className="text-slate-500">SLA Cumplido:</span>
                    <span className="font-bold text-emerald-600 ml-2 font-mono">100%</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Aprobados:</span>
                    <span className="font-bold text-slate-900 ml-2 font-mono">0</span>
                  </div>
                </div>
              </div>

              {/* Activos Gobernados */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-blue-600 text-white">
                    <Database className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading">Activos Gobernados (Catálogo)</h4>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
                  <div>
                    <span className="text-slate-500">Total Activos:</span>
                    <span className="font-bold text-slate-900 ml-2 font-mono">0</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Con Owner:</span>
                    <span className="font-bold text-slate-900 ml-2 font-mono">0%</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Clasificados:</span>
                    <span className="font-bold text-slate-900 ml-2 font-mono">0%</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Con Linaje:</span>
                    <span className="font-bold text-slate-900 ml-2 font-mono">0%</span>
                  </div>
                </div>
              </div>

              {/* Riesgos y Cumplimiento */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-red-600 text-white">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading">Riesgos y Cumplimiento</h4>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
                  <div>
                    <span className="text-slate-500">Riesgos Críticos:</span>
                    <span className="font-bold text-slate-900 ml-2 font-mono">0</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Riesgos Altos:</span>
                    <span className="font-bold text-amber-600 ml-2 font-mono">0</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Políticas Vencidas:</span>
                    <span className="font-bold text-slate-900 ml-2 font-mono">0</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Cumplimiento Norm.:</span>
                    <span className="font-bold text-emerald-600 ml-2 font-mono">{orderPurgedBanner ? '100%' : '89%'}</span>
                  </div>
                </div>
              </div>

              {/* Gestión Documental Normativa */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-cyan-600 text-white">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading">Gestión Documental Normativa</h4>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
                  <div>
                    <span className="text-slate-500">Avance Total:</span>
                    <span className="font-bold text-slate-900 ml-2 font-mono">0%</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Docs Críticos:</span>
                    <span className="font-bold text-slate-900 ml-2 font-mono">0</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Total Docs:</span>
                    <span className="font-bold text-slate-900 ml-2 font-mono">0</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Políticas:</span>
                    <span className="font-bold text-slate-900 ml-2 font-mono">0</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: METADATA INTELLIGENCE 2.0 (Exact Screen 5) */}
        {activeTabMode === 'metadata' && (
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 text-left">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                  🧠 Metadata Intelligence 2.0
                </h3>
                <p className="text-xs text-slate-500">
                  Gestión automatizada de taxonomías, glosarios semánticos de negocio, trazabilidad de linaje y catálogo empresarial.
                </p>
              </div>

              <button className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center space-x-1">
                <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                <span>Refrescar Catálogo</span>
              </button>
            </div>

            {/* Top 4 Summary Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600"><Database className="w-5 h-5" /></div>
                <div><p className="text-[10px] text-slate-400 font-bold">Activos Descubiertos</p><p className="text-sm font-extrabold font-mono text-slate-900">...</p></div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600"><Sparkles className="w-5 h-5" /></div>
                <div><p className="text-[10px] text-slate-400 font-bold">Columnas Analizadas</p><p className="text-sm font-extrabold font-mono text-slate-900">...</p></div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-red-50 text-red-600"><ShieldCheck className="w-5 h-5" /></div>
                <div><p className="text-[10px] text-slate-400 font-bold">Campos Sensibles</p><p className="text-sm font-extrabold font-mono text-slate-900">...</p></div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600"><FileText className="w-5 h-5" /></div>
                <div><p className="text-[10px] text-slate-400 font-bold">Términos del Glosario</p><p className="text-sm font-extrabold font-mono text-slate-900">...</p></div>
              </div>
            </div>

            {/* Smart Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                <Search className="w-4 h-4 text-blue-600" />
                <span>Buscador Inteligente de Metadatos</span>
              </div>
              <p className="text-[11px] text-slate-500">Encuentra campos, conceptos de negocio, dueños o reglas de calidad de manera inmediata.</p>
              <input
                type="text"
                value={metadataSearchQuery}
                onChange={(e) => setMetadataSearchQuery(e.target.value)}
                placeholder="Escribe el nombre de un campo, concepto o tabla... (ej: 'email', 'cliente_id', 'monto')"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600"
              />
            </div>

            {/* Subtabs Bar */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2 text-xs font-semibold">
              <button onClick={() => setMetadataActiveSubTab('fuentes')} className={`px-3 py-1.5 rounded-lg ${metadataActiveSubTab === 'fuentes' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>🗃️ Fuentes Conectadas</button>
              <button onClick={() => setMetadataActiveSubTab('clasificacion')} className={`px-3 py-1.5 rounded-lg ${metadataActiveSubTab === 'clasificacion' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>🛡️ Clasificación de Campos</button>
              <button onClick={() => setMetadataActiveSubTab('linaje')} className={`px-3 py-1.5 rounded-lg ${metadataActiveSubTab === 'linaje' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>🌿 Trazabilidad Lógica</button>
              <button onClick={() => setMetadataActiveSubTab('glosario')} className={`px-3 py-1.5 rounded-lg ${metadataActiveSubTab === 'glosario' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>📖 Glosario Corporativo</button>
              <button onClick={() => setMetadataActiveSubTab('diccionario')} className={`px-3 py-1.5 rounded-lg ${metadataActiveSubTab === 'diccionario' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>📝 Diccionario de Datos</button>
              <button onClick={() => setMetadataActiveSubTab('dominios')} className={`px-3 py-1.5 rounded-lg ${metadataActiveSubTab === 'dominios' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>📁 Dominios de Negocio</button>
            </div>

            {/* Imported Technical Assets Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 font-heading">Activos Técnicos Importados del Catálogo</h4>
                {orderPurgedBanner && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">Cortes de Orden Purgados (0 registros)</span>}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-mono text-[11px]">
                      <th className="py-3 px-4 font-bold">Activo</th>
                      <th className="py-3 px-4 font-bold">Fuente de Origen</th>
                      <th className="py-3 px-4 font-bold">Registros</th>
                      <th className="py-3 px-4 font-bold">Estado</th>
                      <th className="py-3 px-4 font-bold">Fecha Importación</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {orderPurgedBanner ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400 text-xs font-mono">
                          🚫 No hay registros de orden ni cortes activos. Todo deshecho y purgado por el Super Administrador. Registrado en Supabase Audit.
                        </td>
                      </tr>
                    ) : (
                      metadataAssets.map((asset, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-slate-900 font-mono">{asset.name}</td>
                          <td className="py-3 px-4 text-slate-600">{asset.source}</td>
                          <td className="py-3 px-4 text-slate-600 font-mono">{asset.records}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {asset.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500 font-mono">{asset.date}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: JOURNEY CDO (Exact Screen 4) */}
        {activeTabMode === 'journey_cdo' && (
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 text-left">
            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-heading flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <span>Journey CDO – Simulador de Transformación</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Caso Activo: <strong className="text-white">Sector Salud</strong></p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 rounded-xl bg-blue-600 text-xs font-bold text-white hover:bg-blue-500">👁️ Ver Proyecto de Transformación</button>
                <button className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300">🔄 Validando...</button>
              </div>
            </div>

            {/* 4 Score Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 border-l-4 border-l-purple-600 shadow-xs">
                <div className="text-[10px] font-bold uppercase text-slate-400">SCORE DE TRANSFORMACIÓN</div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">0 / 100</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 border-l-4 border-l-emerald-500 shadow-xs">
                <div className="text-[10px] font-bold uppercase text-slate-400">PROGRESO BASE DE DATOS</div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">0 / 60 Puntos</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 border-l-4 border-l-amber-500 shadow-xs">
                <div className="text-[10px] font-bold uppercase text-slate-400">ALINEACIÓN DE DECISIONES</div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">0 / 40 Puntos</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 border-l-4 border-l-cyan-500 shadow-xs">
                <div className="text-[10px] font-bold uppercase text-slate-400">INSIGNIA OBTENIDA</div>
                <div className="text-sm font-extrabold text-indigo-600 font-heading mt-2">CDO Junior</div>
              </div>
            </div>

            {/* Main Phase Stepper & Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Stepper Side */}
              <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase font-heading">FASES DEL CASO</h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 font-bold text-blue-900">
                    ① Fundamentos y Diagnóstico <span className="text-[10px] block font-normal text-blue-600">0/8 Actividades (0%)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 text-slate-600">
                    ② Políticas, Seguridad y Riesgos <span className="text-[10px] block text-slate-400">0/8 Actividades (0%)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 text-slate-600">
                    ③ Calidad y Metadatos <span className="text-[10px] block text-slate-400">0/8 Actividades (0%)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 text-slate-600">
                    ④ Operación y Madurez <span className="text-[10px] block text-slate-400">0/8 Actividades (0%)</span>
                  </div>
                </div>
              </div>

              {/* Reto del CDO DAMA Challenge */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">FASE 1</span>
                  <h4 className="text-xl font-bold text-slate-900 font-heading">Fundamentos y Diagnóstico</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Establecer la madurez base y la estructura del equipo de gobierno de datos.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <button className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center space-x-1">
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar Entregable PDF</span>
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center space-x-1">
                      <Download className="w-3.5 h-3.5" />
                      <span>Exportar Evidencias Excel</span>
                    </button>
                  </div>
                </div>

                {/* Reto del CDO Decision Box */}
                <div className="bg-amber-500/10 border-2 border-amber-500/30 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold">
                    <Target className="w-4 h-4 text-amber-600" />
                    <span>Reto del CDO: Decisión Estratégica DAMA</span>
                  </div>

                  <p className="text-xs text-amber-950 leading-relaxed">
                    El diagnóstico DAMA de 100 preguntas califica la gestión de Datos Maestros en la Clínica en Nivel 1 (Inicial). La clínica registra un 12% de pacientes duplicados debido a la integración de nuevos centros médicos. ¿Cuál es tu primera decisión organizativa bajo DAMA?
                  </p>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleCdoQuizChoice('A')}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                        cdoQuizSelectedOption === 'A' ? 'bg-blue-600 text-white border-blue-600 font-bold' : 'bg-white text-slate-800 border-amber-200 hover:border-amber-400'
                      }`}
                    >
                      A. Asignar al Data Steward de Admisiones la responsabilidad formal de definir reglas de negocio para un Identificador Único de Paciente y unificar el catálogo clínico.
                    </button>

                    <button
                      onClick={() => handleCdoQuizChoice('B')}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                        cdoQuizSelectedOption === 'B' ? 'bg-red-600 text-white border-red-600 font-bold' : 'bg-white text-slate-800 border-amber-200 hover:border-amber-400'
                      }`}
                    >
                      B. Pedirle a los médicos y enfermeras que verifiquen la cédula dos veces manualmente en cada consulta para corregir en caliente.
                    </button>
                  </div>

                  {cdoQuizFeedback && (
                    <div className={`p-3 rounded-xl text-xs font-bold ${cdoQuizSelectedOption === 'A' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-red-100 text-red-900 border border-red-300'}`}>
                      {cdoQuizFeedback}
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 4: GOVDATA LAUNCHPAD (Exact Screen 3) */}
        {activeTabMode === 'launchpad' && (
          <div className="bg-slate-950 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-8 text-center max-w-3xl mx-auto">
            
            {/* Stepper Bar */}
            <div className="flex items-center justify-between max-w-md mx-auto relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  onClick={() => setLaunchpadStep(step)}
                  className={`w-9 h-9 rounded-full font-bold text-xs relative z-10 transition-all ${
                    launchpadStep === step ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-600/50' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {step}
                </button>
              ))}
            </div>

            <div className="flex justify-between text-[11px] font-mono font-bold text-slate-400 max-w-md mx-auto">
              <span>1 EMPRESA</span>
              <span>2 FRAMEWORK</span>
              <span>3 EVALUACIÓN</span>
              <span>4 LANZAMIENTO</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-full bg-blue-600/20 text-blue-400 w-12 h-12 mx-auto flex items-center justify-center">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-extrabold text-white font-heading">
                GovData Nexus Launchpad
              </h3>
              <p className="text-xs text-slate-400">
                Asistente de implementación y parametrización Bootstrap
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Empresa Actual</label>
                <input type="text" readOnly value="Demo Corp (Enterprise)" className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Sector de Industria *</label>
                <select className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-blue-500">
                  <option>Servicios Financieros & Banca</option>
                  <option>Salud & Protección Social</option>
                  <option>Sector Público & Gobierno</option>
                  <option>Retail & Comercio Electrónico</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Tamaño (Empleados)</label>
                <select className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-blue-500">
                  <option>500 - 2,500 empleados</option>
                  <option>&gt; 2,500 empleados (Enterprise)</option>
                  <option>100 - 500 empleados</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setLaunchpadStep(prev => (prev < 4 ? prev + 1 : 1))}
                className="px-8 py-3.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/40 transition-all"
              >
                Siguiente &gt;
              </button>
            </div>

          </div>
        )}

        {/* TAB 5: LOGIN & PORTAL DE ACCESO (Exact Screen 1) */}
        {activeTabMode === 'login' && (
          <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch max-w-5xl mx-auto text-left">
            
            {/* Left Dual Panel (Deep Blue Earth Globe) */}
            <div className="lg:col-span-6 bg-slate-950 text-white p-8 sm:p-12 relative flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-blue-600/30 via-slate-950 to-slate-950 animate-pulse-glow" />

              <div className="relative z-10 space-y-6">
                {/* Official GD Logo Emblem */}
                <div className="p-4 rounded-2xl border border-cyan-500/30 bg-slate-900/80 inline-block">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center font-extrabold text-slate-950 text-lg">
                      GD
                    </div>
                    <div>
                      <h4 className="font-heading font-extrabold text-lg text-white">GovData Nexus</h4>
                      <p className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">GOBIERNO DE DATOS INTELIGENTE</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <h3 className="text-3xl font-extrabold text-white font-heading">
                    La nueva era del <br />
                    <span className="text-cyan-400">Gobierno de Datos</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Centraliza el control, garantiza la calidad y potencia la toma de decisiones estratégicas en un solo lugar.
                  </p>
                </div>

                <ul className="space-y-2 text-xs font-semibold text-slate-200 pt-2">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Seguridad Nivel Enterprise</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Cumplimiento Global</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>UX/UI de Próxima Generación</span>
                  </li>
                </ul>
              </div>

              <div className="relative z-10 text-[10px] text-slate-500 pt-8 border-t border-slate-800">
                www.govdatanexus.com • ISO 27001 Certified
              </div>
            </div>

            {/* Right Form Panel (Clean White Login Form) */}
            <div className="lg:col-span-6 bg-white p-8 sm:p-12 space-y-6 flex flex-col justify-center">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 font-heading">Bienvenido</h3>
                <p className="text-xs text-slate-500">Ingresa tus credenciales corporativas</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); onOpenDemo(); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Corporativo</label>
                  <input type="email" defaultValue="admin@govdata.io" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-600" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contraseña</label>
                  <input type="password" defaultValue="••••••••" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-600" />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                    <span>Recordarme</span>
                  </label>
                  <a href="#" className="text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
                </div>

                <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-blue-700 hover:bg-blue-600 transition-colors shadow-lg">
                  Iniciar Sesión &rarr;
                </button>
              </form>

              <div className="text-center space-y-3 pt-2">
                <p className="text-[11px] text-slate-400">O ingresa con</p>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center space-x-1">
                    <span>Microsoft 365</span>
                  </button>
                  <button className="p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center space-x-1">
                    <span>Google Workspace</span>
                  </button>
                </div>
              </div>

              {/* Demo Request Card */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
                <p className="text-xs font-bold text-amber-900">¿Quieres conocer la plataforma?</p>
                <p className="text-[10px] text-amber-800">Solicita una demostración guiada y personalizada para tu organización.</p>
                <button onClick={onOpenDemo} className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-md">
                  Solicitar una Demo
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 6: 16 MODULES GRID */}
        {activeTabMode === 'modules' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {govDataModules.map((module) => (
              <div
                key={module.id}
                onClick={() => setSelectedModuleId(module.id)}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-xl transition-all cursor-pointer text-center group flex flex-col items-center justify-center space-y-2.5"
              >
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 transition-colors">
                  {getModuleIcon(module.icon)}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {module.title}
                </h4>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* SUPER ADMIN EMERGENCY PURGE MODAL */}
      {purgeModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-slate-900 border-2 border-red-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative space-y-6 text-left">
            <button onClick={() => setPurgeModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <div className="p-3 rounded-2xl bg-red-600/20 text-red-500 border border-red-600/40">
                <AlertOctagon className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest block">👑 EXCLUSIVO SUPER ADMINISTRADOR</span>
                <h3 className="text-xl font-extrabold text-white font-heading">Deshacer & Purgar Todo (Cortes de Orden)</h3>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-red-950/60 border border-red-800/80 text-xs space-y-2 text-red-200">
              <p className="font-bold flex items-center space-x-1.5 text-red-400">
                <ShieldAlert className="w-4 h-4" />
                <span>¡ADVERTENCIA DE PURGA DE ORDEN NIVEL CERO!</span>
              </p>
              <p>
                Esta acción deshará y eliminará por completo todos los registros, perfilamientos de calidad y puntos de corte de la orden activa. Todo el estado volverá a cero sin dejar registros ni trazas en el sistema.
              </p>
            </div>

            {!isPurging && !purgeSuccess && (
              <form onSubmit={handleExecuteSuperAdminPurge} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Ingrese Código de Confirmación de SuperAdmin:
                  </label>
                  <p className="text-[11px] text-slate-400 mb-2">Escriba exactamente: <code className="bg-slate-950 px-2 py-0.5 rounded text-red-400 font-mono">CONFIRMAR PURGA O-2026</code> o ingrese el NIT de SuperAdmin</p>
                  <div className="relative">
                    <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      value={purgeConfirmationCode}
                      onChange={(e) => setPurgeConfirmationCode(e.target.value)}
                      placeholder="CONFIRMAR PURGA O-2026"
                      className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setPurgeModalOpen(false)}
                    className="flex-1 py-3 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-xl flex items-center justify-center space-x-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Ejecutar Purga de Orden</span>
                  </button>
                </div>
              </form>
            )}

            {isPurging && (
              <div className="py-6 text-center space-y-4">
                <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">PROCESANDO DESHACER & PURGA TOTAL...</p>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 transition-all duration-300"
                    style={{ width: `${purgeProgress}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400">Deshaciendo cortes de orden, purgando perfilamientos y registrando en Supabase Audit...</p>
              </div>
            )}

            {purgeSuccess && (
              <div className="py-6 text-center space-y-3 text-emerald-400">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400 animate-bounce" />
                <h4 className="text-lg font-bold">¡Purga Completada Exitosamente!</h4>
                <p className="text-xs text-slate-300">Todos los registros y cortes han sido eliminados por completo y la auditoría fue almacenada en Supabase.</p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Module Detail Modal */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 border border-slate-200 shadow-2xl relative space-y-4 text-left">
            <button onClick={() => setSelectedModuleId(null)} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-blue-50">
                {getModuleIcon(selectedModule.icon)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">{selectedModule.title}</h3>
                <span className="text-xs text-blue-600 font-semibold">{selectedModule.category}</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{selectedModule.description}</p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <h5 className="text-[11px] font-bold text-slate-700 uppercase mb-2">Características Clave</h5>
              <ul className="space-y-1 text-xs text-slate-600">
                {selectedModule.keyFeatures.map((f, i) => (
                  <li key={i} className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => { setSelectedModuleId(null); onOpenDemo(); }} className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500">
              Solicitar Demo del Módulo
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
