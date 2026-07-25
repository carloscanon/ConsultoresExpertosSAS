import React, { useState } from 'react';
import { CommandCenterDomain } from './domains/CommandCenterDomain';
import { ExperienceCMSDomain } from './domains/ExperienceCMSDomain';
import { SalesCRMDomain } from './domains/SalesCRMDomain';
import { LearningHubDomain } from './domains/LearningHubDomain';
import { GovDataNexusDomain } from './domains/GovDataNexusDomain';
import { MarketingHubDomain } from './domains/MarketingHubDomain';
import { EnterpriseAdminDomain } from './domains/EnterpriseAdminDomain';
import { ThemeSelectorDomain } from './domains/ThemeSelectorDomain';
import { 
  X, 
  LayoutDashboard, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  Database, 
  Target, 
  ShieldCheck, 
  Search, 
  ChevronRight,
  Sparkles,
  LogOut,
  Palette,
  Lock,
  Mail,
  KeyRound,
  AlertCircle
} from 'lucide-react';

interface EnterpriseDXPPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnterpriseDXPPortal: React.FC<EnterpriseDXPPortalProps> = ({ isOpen, onClose }) => {
  const [activeDomain, setActiveDomain] = useState<
    'command_center' | 'experience_cms' | 'sales_crm' | 'learning_hub' | 'govdata_nexus' | 'marketing_hub' | 'enterprise_admin' | 'theme_selector'
  >('command_center');

  const [searchQuery, setSearchQuery] = useState('');
  
  // Admin Login States
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('dxp_authenticated') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Exact requested admin credentials
    if (adminEmail === 'admin@consultoresexpertos.com' && adminPassword === 'expertos2030') {
      setIsAuthenticated(true);
      sessionStorage.setItem('dxp_authenticated', 'true');
      setLoginError('');
    } else {
      setLoginError('Usuario o contraseña incorrectos. Por favor verifique.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('dxp_authenticated');
    onClose();
  };

  const domainsList = [
    { id: 'command_center', name: '1. Command Center', icon: LayoutDashboard, category: 'Analytics & KPIs' },
    { id: 'experience_cms', name: '2. Experience CMS', icon: Globe, category: 'Web & Contenidos' },
    { id: 'sales_crm', name: '3. Sales & CRM Hub', icon: Briefcase, category: 'Pipeline & Leads' },
    { id: 'learning_hub', name: '4. Learning Hub', icon: GraduationCap, category: 'MasterClassNow.online' },
    { id: 'govdata_nexus', name: '5. GovData Nexus™', icon: Database, category: 'SaaS Product Center' },
    { id: 'marketing_hub', name: '6. Marketing Hub', icon: Target, category: 'Landings & Growth' },
    { id: 'enterprise_admin', name: '7. Administration', icon: ShieldCheck, category: 'RBAC, IA & Security' },
    { id: 'theme_selector', name: '8. Temas & Apariencia', icon: Palette, category: '6 Temas Enterprise' }
  ];

  // Secure Auth Guard Panel (Apple/Stripe Premium Design style)
  if (!isAuthenticated) {
    return (
      <div className="dxp-portal-container fixed inset-0 z-50 overflow-hidden bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 text-slate-100 font-sans">
        
        {/* Background mesh grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12),transparent_50%)] pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          
          {/* Close button to escape */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 border border-slate-850 hover:bg-slate-850 text-slate-400 hover:text-white transition-all"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Logo Identity */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-xl shadow-cyan-500/20 mx-auto animate-float">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold font-heading text-white">Administración DXP Portal</h3>
              <p className="text-[10px] text-slate-400 font-mono">NIT 900452089-9 • CONEXIÓN ESTRATÉGICA SEGURA</p>
            </div>
          </div>

          {/* Error Banner */}
          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center space-x-2 animate-in fade-in duration-300">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5 text-left">
              <label className="block text-slate-300 font-bold">Usuario / Correo Electrónico</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@consultoresexpertos.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-slate-300 font-bold">Contraseña Administrativa</label>
              <div className="relative flex items-center">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg shadow-cyan-600/10 transition-all text-xs uppercase tracking-wider"
            >
              Autenticar Administrador
            </button>
          </form>

          {/* Help Prompt */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 text-[10px] text-slate-400 space-y-1 text-left font-mono">
            <p className="font-bold text-slate-300">🔑 CREDENCIALES DE DESARROLLO:</p>
            <p><strong>Usuario:</strong> admin@consultoresexpertos.com</p>
            <p><strong>Contraseña:</strong> expertos2030</p>
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="dxp-portal-container fixed inset-0 z-50 overflow-hidden bg-slate-950/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-200 text-slate-100 font-sans">
      
      {/* Top DXP Enterprise Header Bar */}
      <header className="h-16 bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0">
        
        {/* Left Brand Identity */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/30">
            <Sparkles className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-extrabold text-sm text-white">Consultores Expertos SAS</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">ENTERPRISE DXP</span>
            </div>
            <p className="text-[10px] font-mono text-slate-400">NIT 900452089-9 • GovData Nexus™ • MasterClassNow.online</p>
          </div>
        </div>

        {/* Middle Global Command Search Bar (Ctrl+K) */}
        <div className="hidden md:flex items-center relative w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar en DXP (CRM, Cursos, CMS, Leads)..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400"
          />
          <span className="absolute right-2 text-[10px] font-mono text-slate-500 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">⌘K</span>
        </div>

        {/* Right Status & Close */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-mono text-[11px]">Super Admin Activo</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Cerrar Panel DXP"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </header>

      {/* Main DXP Body Container: Sidebar + Content Panel */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Fixed Collapsible Sidebar */}
        <aside className="w-64 bg-slate-900/60 border-r border-slate-800 flex flex-col justify-between shrink-0 p-3 space-y-4 overflow-y-auto">
          
          <div className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">
              DOMINIOS OPERATIVOS DXP
            </div>

            {domainsList.map((domain) => {
              const Icon = domain.icon;
              const isActive = activeDomain === domain.id;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomain(domain.id as any)}
                  className={`w-full text-left p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                    <span className="truncate">{domain.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-white shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer User Card */}
          <div className="pt-3 border-t border-slate-800 text-xs text-left space-y-2">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs">
                CC
              </div>
              <div className="truncate">
                <p className="font-bold text-white text-xs truncate">Carlos Cañón</p>
                <p className="text-[10px] text-slate-400 font-mono truncate">SuperAdmin (NIT 900452089-9)</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full p-2 rounded-xl text-[11px] font-bold text-slate-400 hover:text-red-400 hover:bg-slate-800 flex items-center justify-center space-x-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión (Cerrar DXP)</span>
            </button>
          </div>

        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-950 text-slate-100">
          
          {activeDomain === 'command_center' && <CommandCenterDomain />}
          {activeDomain === 'experience_cms' && <ExperienceCMSDomain />}
          {activeDomain === 'sales_crm' && <SalesCRMDomain />}
          {activeDomain === 'learning_hub' && <LearningHubDomain />}
          {activeDomain === 'govdata_nexus' && <GovDataNexusDomain />}
          {activeDomain === 'marketing_hub' && <MarketingHubDomain />}
          {activeDomain === 'enterprise_admin' && <EnterpriseAdminDomain />}
          {activeDomain === 'theme_selector' && <ThemeSelectorDomain />}

        </main>

      </div>

    </div>
  );
};
