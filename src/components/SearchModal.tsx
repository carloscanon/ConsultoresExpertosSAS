import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { govDataModules } from '../data/govDataModules';
import { servicesData } from '../data/servicesData';
import { Search, X, Database, ShieldCheck, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (id: string, type: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectResult }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const term = searchTerm.toLowerCase().trim();

  const matchedModules = term ? govDataModules.filter(m => m.title.toLowerCase().includes(term) || m.description.toLowerCase().includes(term)) : [];
  const matchedServices = term ? servicesData.filter(s => s.title.toLowerCase().includes(term) || s.overview.toLowerCase().includes(term)) : [];

  const hasResults = matchedModules.length > 0 || matchedServices.length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl glass-panel rounded-2xl border border-cyan-500/40 shadow-2xl overflow-hidden">
        
        <div className="p-4 border-b border-slate-800 flex items-center space-x-3 bg-slate-950">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 outline-none"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto space-y-4 custom-scrollbar">
          {!searchTerm ? (
            <div className="text-center py-8 text-xs text-slate-500 space-y-2">
              <p>Escribe cualquier término como "Linaje", "DAMA", "Calidad", "MDM" o "GenAI"...</p>
              <div className="flex justify-center gap-2">
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">GovData Nexus</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">DAMA-DMBOK</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Snowflake</span>
              </div>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No se encontraron resultados para "{searchTerm}". Intenta buscar con otros términos.
            </div>
          ) : (
            <div className="space-y-4">
              
              {matchedModules.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">Módulos GovData Nexus</h4>
                  <div className="space-y-1">
                    {matchedModules.map(m => (
                      <div key={m.id} onClick={() => { onSelectResult(m.id, 'platform'); onClose(); }} className="p-2.5 rounded-xl hover:bg-slate-900 cursor-pointer flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Database className="w-4 h-4 text-cyan-400" />
                          <span className="text-xs font-bold text-white">{m.title}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedServices.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-mono font-bold text-indigo-400 uppercase tracking-widest mb-2">Servicios Especializados</h4>
                  <div className="space-y-1">
                    {matchedServices.map(s => (
                      <div key={s.id} onClick={() => { onSelectResult(s.id, 'services'); onClose(); }} className="p-2.5 rounded-xl hover:bg-slate-900 cursor-pointer flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <ShieldCheck className="w-4 h-4 text-indigo-400" />
                          <span className="text-xs font-bold text-white">{s.title}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
