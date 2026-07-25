import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { ConsultoresLogo } from './ConsultoresLogo';
import { useData } from '../context/DataContext';
import type { Language } from '../types';
import { 
  Search, 
  Sun, 
  Moon, 
  Globe, 
  Menu, 
  X, 
  ChevronDown, 
  LogIn,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: any) => void;
  onOpenDemo: () => void;
  onOpenSearch: () => void;
  onOpenAICopilot: () => void;
  onOpenCMSAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentTab, 
  onNavigate, 
  onOpenDemo, 
  onOpenSearch, 
  onOpenCMSAdmin 
}) => {
  const { language, setLanguage } = useLanguage();
  const { isLight, toggleTheme, logoUrl, logoSize } = useTheme();
  const { contactInfo } = useData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'es', label: 'ES', flag: '🇪🇸' },
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'pt', label: 'PT', flag: '🇧🇷' }
  ];

  const menuItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'consulting', label: 'Consultoría' },
    { id: 'academy', label: 'Academia' },
    { id: 'legal', label: 'Centro Legal' },
    { id: 'research', label: 'Investigación' },
    { id: 'labs', label: 'Laboratorio IA & Labs' },
    { id: 'community', label: 'Comunidad' },
    { id: 'resources', label: 'Recursos' },
    { id: 'glossary', label: 'Conceptos SEO' },
    { id: 'contact', label: 'Contacto' }
  ];

  const handleTabClick = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-950/90 backdrop-blur-xl py-2.5 border-b border-slate-800 shadow-xl' : 'bg-slate-950 py-3.5 border-b border-slate-800/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Logo with powered by seal */}
          <div 
            onClick={() => handleTabClick('home')}
            className="cursor-pointer hover:opacity-95 transition-opacity shrink-0 flex items-center"
            style={{ width: `${logoSize}px` }}
          >
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="max-h-28 object-contain" style={{ width: '100%' }} />
            ) : (
              <div className="flex flex-col text-left">
                <ConsultoresLogo showNit={false} />
                <span className="text-[8px] font-mono font-bold tracking-widest text-slate-500 uppercase -mt-1 block">
                  Powered by {contactInfo.companyName}
                </span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-0.5 text-[11px] font-bold text-slate-300">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleTabClick(item.id)} 
                className={`px-2 py-1.5 rounded-lg transition-all ${
                  currentTab === item.id 
                    ? 'text-cyan-400 bg-cyan-500/10 font-extrabold shadow-sm' 
                    : 'hover:text-cyan-400 hover:bg-slate-900/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center space-x-1.5 shrink-0">
            {onOpenCMSAdmin && (
              <button
                onClick={onOpenCMSAdmin}
                title="Enterprise DXP Portal (HubSpot & Salesforce Level)"
                className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-[10px] font-extrabold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-md transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Enterprise DXP</span>
              </button>
            )}

            <button
              onClick={onOpenSearch}
              title="Buscar (Ctrl+K)"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all border border-slate-800"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-0.5 px-2 py-1.5 rounded-lg text-[10px] font-bold text-slate-300 hover:bg-slate-800/80 transition-all border border-slate-800"
              >
                <Globe className="w-3 h-3 text-cyan-400" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-28 py-1 bg-slate-900 rounded-xl shadow-2xl z-50 border border-slate-800">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1 text-[10px] flex items-center space-x-1.5 hover:bg-slate-800 ${
                        language === lang.code ? 'text-cyan-400 font-bold bg-cyan-500/10' : 'text-slate-300'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title="Cambiar Modo Claro/Oscuro"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-all"
            >
              {isLight ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            </button>

            {/* Direct Platform Link */}
            <a
              href="https://www.govdatanexus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-[10px] font-bold text-cyan-400 bg-slate-900 border border-cyan-500/30 hover:bg-slate-800 transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Ingresar a GovData</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={onOpenDemo}
              className="px-3 py-1.5 rounded-xl text-[10px] font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all animate-float"
            >
              <span>Solicitar Demo</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 mt-3 space-y-1.5 animate-in slide-in-from-top duration-300 text-left">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => handleTabClick(item.id)} 
              className={`block w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                currentTab === item.id ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <a 
              href="https://www.govdatanexus.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full text-center py-2 rounded-xl text-xs font-bold text-cyan-400 bg-slate-950 border border-cyan-500/25"
            >
              Ingresar a Plataforma (Login)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
