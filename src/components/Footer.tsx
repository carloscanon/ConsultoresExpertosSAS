import React from 'react';
import { ConsultoresLogo } from './ConsultoresLogo';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { 
  MessageCircle, 
  Share2, 
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award
} from 'lucide-react';

interface FooterProps {
  onOpenDemo: () => void;
  onOpenAICopilot: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemo }) => {
  const { logoUrl, logoSize } = useTheme();
  const { contactInfo } = useData();

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white text-slate-900 border-t border-slate-200 pt-16 pb-12 overflow-hidden">
      
      {/* Floating WhatsApp Widget with Live Tooltip */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
        <div className="hidden sm:block px-3.5 py-2 rounded-xl bg-white text-slate-900 border border-slate-200 shadow-xl text-xs font-semibold animate-bounce">
          ¿Necesitas ayuda? <br />
          <span className="text-emerald-600 font-bold">¡Estamos en línea!</span>
        </div>
        <a
          href={`https://wa.me/${contactInfo.whatsapp}?text=Hola,%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20GovData%20Nexus%20y%20sus%20servicios%25.`}
          target="_blank"
          rel="noopener noreferrer"
          title="Hablar por WhatsApp"
          className="p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6 font-bold" />
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 5 Columns Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12 text-left">
          
          {/* Col 1: Official Corporate Logo & Info (2 cols wide) */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              className="cursor-pointer flex items-center" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ width: `${logoSize}px` }}
            >
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="max-h-28 object-contain" style={{ width: '100%' }} />
              ) : (
                <ConsultoresLogo variant="light" showNit={true} />
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pr-4">
              Líderes en Gobierno de Datos, Analítica e Inteligencia Artificial. Transformamos datos en valor para su organización. Creadores de la plataforma GovData Nexus™.
            </p>

            <div className="flex items-center space-x-3 text-slate-500">
              <a href="#" className="p-2 rounded-lg bg-slate-100 hover:text-red-600 hover:bg-slate-200 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <span className="text-xs font-mono font-bold text-slate-400">NIT: {contactInfo.companyNit}</span>
            </div>
          </div>

          {/* Col 2: Servicios */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 font-heading">
              Servicios
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><button onClick={() => handleNavClick('services')} className="hover:text-red-600 transition-colors">Gobierno de Datos</button></li>
              <li><button onClick={() => handleNavClick('services')} className="hover:text-red-600 transition-colors">Inteligencia Artificial</button></li>
              <li><button onClick={() => handleNavClick('services')} className="hover:text-red-600 transition-colors">Analítica Avanzada</button></li>
              <li><button onClick={() => handleNavClick('services')} className="hover:text-red-600 transition-colors">Arquitectura Empresarial</button></li>
              <li><button onClick={() => handleNavClick('services')} className="hover:text-red-600 transition-colors">Ver todos los servicios</button></li>
            </ul>
          </div>

          {/* Col 3: Plataforma */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 font-heading">
              Plataforma
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><button onClick={() => handleNavClick('platform')} className="hover:text-red-600 transition-colors">GovData Nexus™</button></li>
              <li><button onClick={() => handleNavClick('platform')} className="hover:text-red-600 transition-colors">Command Center 360°</button></li>
              <li><button onClick={() => handleNavClick('platform')} className="hover:text-red-600 transition-colors">Metadata Intelligence 2.0</button></li>
              <li><button onClick={() => handleNavClick('cases')} className="hover:text-red-600 transition-colors">Casos de Éxito</button></li>
              <li><button onClick={onOpenDemo} className="hover:text-red-600 transition-colors">Solicitar Demo</button></li>
            </ul>
          </div>

          {/* Col 4: Recursos */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 font-heading">
              Recursos
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><button onClick={() => handleNavClick('resources')} className="hover:text-red-600 transition-colors">Blog</button></li>
              <li><button onClick={() => handleNavClick('resources')} className="hover:text-red-600 transition-colors">Whitepapers DAMA</button></li>
              <li><button onClick={() => handleNavClick('academy')} className="hover:text-red-600 transition-colors">GovData Academy</button></li>
              <li><button onClick={() => handleNavClick('resources')} className="hover:text-red-600 transition-colors">Plantillas & Guías</button></li>
            </ul>
          </div>

          {/* Col 5: Contacto */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 font-heading">
              Contacto Directo
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>{contactInfo.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>{contactInfo.email}</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>{contactInfo.address}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-slate-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>ISO/IEC 27001 Certified</span>
            </span>
            <span className="flex items-center space-x-1 text-slate-700 font-semibold">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Gobernanza Certificada DAMA</span>
            </span>
          </div>

          <p>© {new Date().getFullYear()} {contactInfo.companyName}. Todos los derechos reservados. NIT {contactInfo.companyNit}.</p>
        </div>

      </div>
    </footer>
  );
};
