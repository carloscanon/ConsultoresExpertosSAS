import React, { useState } from 'react';
import { 
  Search, 
  Scale, 
  ExternalLink, 
  Bookmark
} from 'lucide-react';

interface LawItem {
  id: string;
  title: string;
  type: 'ley' | 'decreto' | 'conpes' | 'iso' | 'togaf';
  description: string;
  highlights: string;
  origin: string;
}

const DATABASE_LEGAL: LawItem[] = [
  {
    id: 'ley-1581',
    title: 'Ley 1581 de 2012 (Habeas Data)',
    type: 'ley',
    description: 'Disposiciones generales para la protección de datos personales en el territorio colombiano.',
    highlights: 'Obligación del consentimiento previo, expreso e informado. Registro de bases de datos ante la SIC (RNBD).',
    origin: 'Congreso de la República de Colombia'
  },
  {
    id: 'ley-1712',
    title: 'Ley 1712 de 2014 (Transparencia y Acceso)',
    type: 'ley',
    description: 'Regula el derecho de acceso a la información pública, los sujetos obligados y las excepciones de reserva.',
    highlights: 'Obligatoriedad de publicación proactiva del directorio de información y catálogo de activos de información.',
    origin: 'Congreso de la República de Colombia'
  },
  {
    id: 'conpes-3975',
    title: 'CONPES 3975 de 2019 (Política Nacional de Big Data)',
    type: 'conpes',
    description: 'Lineamientos estatales para promover la explotación de datos y el desarrollo de Inteligencia Artificial.',
    highlights: 'Fomento al uso comercial y público de datos, creación del Sandbox regulatorio para IA y analítica de datos.',
    origin: 'Departamento Nacional de Planeación'
  },
  {
    id: 'decreto-1008',
    title: 'Decreto 1008 de 2018 (Política de Gobierno Digital)',
    type: 'decreto',
    description: 'Establece los lineamientos y directrices de la Política de Gobierno Digital en Colombia.',
    highlights: 'Obligatoriedad del marco de interoperabilidad, seguridad y privacidad de datos públicos (MIPG).',
    origin: 'Ministerio de las TIC'
  },
  {
    id: 'iso-27001',
    title: 'ISO/IEC 27001:2022 (Sistemas de Seguridad)',
    type: 'iso',
    description: 'Estándar internacional para la administración y gobierno de la Seguridad de la Información.',
    highlights: 'Establece los controles de confidencialidad, integridad y disponibilidad del activo de información.',
    origin: 'Organización Internacional de Normalización'
  },
  {
    id: 'iso-38500',
    title: 'ISO/IEC 38500 (Gobernanza de TI)',
    type: 'iso',
    description: 'Principios y directrices para que las juntas directivas gobiernen el uso de la tecnología.',
    highlights: 'Tres tareas clave: Evaluar, Dirigir y Monitorear la estrategia de TI organizacional.',
    origin: 'Organización Internacional de Normalización'
  },
  {
    id: 'conpes-4011',
    title: 'CONPES 4011 de 2020 (Gobernanza de Infraestructura de Datos)',
    type: 'conpes',
    description: 'Lineamientos para estructurar la Infraestructura Colombiana de Datos (ICDE) y gobernanza de datos abiertos.',
    highlights: 'Promueve la compartición y apertura de datos geográficos e institucionales públicos.',
    origin: 'Departamento Nacional de Planeación'
  }
];

export const LegalIntelligencePortal: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'todos' | 'ley' | 'decreto' | 'conpes' | 'iso'>('todos');
  const [selectedLaw, setSelectedLaw] = useState<LawItem | null>(DATABASE_LEGAL[0]);

  const filteredDatabase = DATABASE_LEGAL.filter(item => {
    const matchesFilter = filterType === 'todos' || item.type === filterType;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.highlights.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-24 bg-slate-950 text-white min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Legal Intelligence • LegalCol Powered</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Centro de Inteligencia Normativa & Leyes
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            El buscador jurídico especializado en tecnología de datos. Explore Leyes, Decretos, Conpes y Estándares ISO/TOGAF.
          </p>

          <div className="pt-2 flex justify-center space-x-3">
            <a
              href="https://legalcol.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 transition-all flex items-center space-x-1.5"
            >
              <span>Ir a LegalCol Platform</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Google-like Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-10">
          <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar normativa (Ej: Ley 1581, Gobierno Digital, Interoperabilidad)..."
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-400 shadow-xl"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-xs text-slate-500 hover:text-white"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 text-xs font-bold">
          {['todos', 'ley', 'decreto', 'conpes', 'iso'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t as any)}
              className={`px-4 py-2 rounded-xl capitalize transition-all ${
                filterType === t 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {t === 'todos' ? 'Todos' : t === 'iso' ? 'Normas ISO/TOGAF' : t + 's'}
            </button>
          ))}
        </div>

        {/* Search Results Display Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Results List */}
          <div className="lg:col-span-5 space-y-3 max-h-[500px] overflow-y-auto pr-1">
            <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest px-2 pb-2 border-b border-slate-800">
              RESULTADOS DE BÚSQUEDA ({filteredDatabase.length})
            </h3>

            {filteredDatabase.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs font-mono">
                No se encontraron normativas que coincidan.
              </div>
            ) : (
              filteredDatabase.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedLaw(item)}
                  className={`w-full text-left p-4 rounded-2xl text-xs transition-all border flex flex-col space-y-2 group ${
                    selectedLaw?.id === item.id
                      ? 'bg-emerald-950/30 border-emerald-500 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 hover:bg-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-extrabold text-sm group-hover:text-emerald-400 transition-colors">{item.title}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-slate-950 text-slate-400 border border-slate-800">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>
                </button>
              ))
            )}
          </div>

          {/* Detailed Document View */}
          <div className="lg:col-span-7 bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl space-y-6">
            {selectedLaw ? (
              <>
                <div className="border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-2">
                    <Scale className="w-5 h-5 text-emerald-400" />
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                      DOCUMENTO CONVALIDADO POR LEGALCOL
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white font-heading mt-2">
                    {selectedLaw.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">Origen: {selectedLaw.origin}</p>
                </div>

                <div className="space-y-4 text-xs leading-relaxed">
                  <div>
                    <h4 className="text-[11px] font-mono font-bold text-slate-400 uppercase mb-1">Descripción del Documento</h4>
                    <p className="text-slate-200 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                      {selectedLaw.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-mono font-bold text-slate-400 uppercase mb-1">Artículos Claves & Aspectos de Interés</h4>
                    <p className="text-slate-200 bg-slate-950/40 p-4 rounded-xl border border-slate-800 border-l-4 border-l-emerald-500">
                      {selectedLaw.highlights}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs flex items-center space-x-3">
                  <Bookmark className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-bold text-white">¿Tiene dudas sobre el impacto de esta norma?</p>
                    <p className="text-[10px] text-slate-400">Pregunte al Asistente de IA Normativa para una respuesta detallada.</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-8 text-center text-slate-500 text-xs font-mono">
                Seleccione un documento legal para visualizar su ficha técnica.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
