import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { 
  FileText, 
  Video, 
  Volume2, 
  BookMarked, 
  Search,
  Download
} from 'lucide-react';

export const ResourcesPortal: React.FC = () => {
  const { resources } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'todos' | 'video' | 'podcast' | 'template' | 'whitepaper'>('todos');

  const filteredResources = resources.filter(item => {
    const matchesFilter = filterType === 'todos' || item.type === filterType;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getIcon = (type: string) => {
    if (type === 'video') return <Video className="w-5 h-5 text-cyan-400" />;
    if (type === 'podcast') return <Volume2 className="w-5 h-5 text-indigo-400" />;
    if (type === 'template') return <BookMarked className="w-5 h-5 text-emerald-400" />;
    return <FileText className="w-5 h-5 text-purple-400" />;
  };

  return (
    <div className="py-24 bg-slate-950 text-white min-h-screen text-left animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <BookMarked className="w-4 h-4 text-cyan-400" />
            <span>Biblioteca de Recursos Premium</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Centro de Conocimiento Digital
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Descargue o visualice nuestros recursos especializados en Gobierno de Datos e IA.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="max-w-xl mx-auto relative mb-8">
          <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar en biblioteca de recursos..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400 shadow-lg"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10 text-xs font-bold">
          {['todos', 'video', 'podcast', 'template', 'whitepaper'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t as any)}
              className={`px-4 py-2.5 rounded-xl capitalize transition-all ${
                filterType === t 
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' 
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {t === 'todos' ? 'Todos' : t === 'whitepaper' ? 'Whitepapers' : t + 's'}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredResources.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-850">
                    {getIcon(item.type)}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500">{item.durationOrSize}</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">{item.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-850/50 mt-4 flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold uppercase text-slate-500 tracking-wider">{item.type}</span>
                
                <a 
                  href={item.redirectUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-bold text-cyan-400 hover:text-white hover:bg-cyan-600 hover:border-cyan-600 transition-all flex items-center space-x-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Acceder / Ver</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
