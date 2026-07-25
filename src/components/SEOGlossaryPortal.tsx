import React, { useState } from 'react';
import { BookOpen, Search, HelpCircle, ChevronRight, ShieldCheck } from 'lucide-react';

interface GlossaryItem {
  term: string;
  category: string;
  definition: string;
  roleOrImpact: string;
}

const GLOSSARY_DATABASE: GlossaryItem[] = [
  {
    term: 'Data Steward (Custodio de Datos)',
    category: 'Gobierno de Datos',
    definition: 'Es el rol responsable de velar por la calidad, consistencia y cumplimiento operativo del dato en el día a día, actuando como enlace entre el área de negocio y los ingenieros de TI.',
    roleOrImpact: 'Asegura que el diccionario de datos esté documentado y que se resuelvan las alarmas de calidad en la ingesta.'
  },
  {
    term: 'Data Owner (Propietario del Dato)',
    category: 'Gobierno de Datos',
    definition: 'Directivo o líder de área corporativa que tiene la autoridad y responsabilidad final sobre la definición, uso y autorización de acceso a un conjunto específico de datos.',
    roleOrImpact: 'Aprueba quién puede visualizar reportes críticos y define la semántica del negocio.'
  },
  {
    term: 'Metadata (Metadatos)',
    category: 'Arquitectura de Datos',
    definition: 'Se define de forma clásica como "datos que describen otros datos". Proporciona el contexto técnico y de negocio sobre la procedencia, tipo, linaje e histórico de la información corporativa.',
    roleOrImpact: 'Permite buscar y perfilar bases de datos estructuradas de forma veloz.'
  },
  {
    term: 'Master Data (Datos Maestros)',
    category: 'Arquitectura de Datos',
    definition: 'Es el conjunto de datos de negocio de referencia clave e invariables de la organización (ej: clientes, productos, proveedores) consolidados para formar el "Golden Record".',
    roleOrImpact: 'Evita duplicaciones de registros y reportes cruzados erróneos.'
  },
  {
    term: 'PETI (Plan Estratégico de TI)',
    category: 'Gobierno Corporativo',
    definition: 'Es la bitácora obligatoria para entidades del Estado que alinea los objetivos y presupuesto de tecnología con la estrategia institucional a 4 años.',
    roleOrImpact: 'Mapea la compra de licencias, desarrollo de Edge Functions e inversiones en la nube.'
  },
  {
    term: 'MIPG (Modelo Integrado de Planeación y Gestión)',
    category: 'Gobierno Digital',
    definition: 'Es el marco de referencia en Colombia que unifica las políticas de gestión y control del Estado, integrando en su Dimensión de TI los planes de Gobierno Digital y Seguridad.',
    roleOrImpact: 'Obliga a las organizaciones públicas a perfilar su nivel de transparencia y datos abiertos.'
  },
  {
    term: 'Ley 1581 de 2012 (Protección de Datos)',
    category: 'Cumplimiento Legal',
    definition: 'La ley marco de Habeas Data en Colombia que regula la recolección, autorización y almacenamiento de datos sensibles de personas naturales.',
    roleOrImpact: 'Establece multas millonarias por fugas de datos y obliga a inscribir las bases de datos en la SIC.'
  },
  {
    term: 'Ley 1712 de 2014 (Ley de Transparencia)',
    category: 'Cumplimiento Legal',
    definition: 'Regula el derecho fundamental de acceso a la información pública nacional, obligando a disponibilizar datos de forma proactiva y estructurada.',
    roleOrImpact: 'Fuerza a publicar contratos, directores y organigramas de forma legible.'
  },
  {
    term: 'TOGAF (The Open Group Architecture Framework)',
    category: 'Arquitectura Empresarial',
    definition: 'Es el framework líder a nivel global para diseñar y gobernar arquitecturas de TI de grandes corporaciones mediante el método ADM.',
    roleOrImpact: 'Estructura las fases de negocio, datos, aplicación e infraestructura.'
  }
];

export const SEOGlossaryPortal: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryItem | null>(GLOSSARY_DATABASE[0]);

  const filteredGlossary = GLOSSARY_DATABASE.filter(item => 
    item.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-24 bg-slate-950 text-white min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Glosario Técnico de Datos & Cumplimiento</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Índice de Conceptos & Definiciones SEO
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Encuentre respuestas precisas y definiciones avaladas sobre el ecosistema de Gobernanza de Datos y Normatividad.
          </p>
        </div>

        {/* Search Input */}
        <div className="max-w-xl mx-auto relative mb-10">
          <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar término o definición..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400 shadow-lg"
          />
        </div>

        {/* Glossary Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* List Terms */}
          <div className="lg:col-span-5 space-y-2 max-h-[480px] overflow-y-auto pr-1">
            <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest px-2 pb-2 border-b border-slate-800">
              TÉRMINOS DISPONIBLES ({filteredGlossary.length})
            </h3>
            
            {filteredGlossary.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTerm(item)}
                className={`w-full text-left p-3.5 rounded-2xl text-xs transition-all border flex items-center justify-between group ${
                  selectedTerm?.term === item.term
                    ? 'bg-cyan-950/20 border-cyan-500 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-bold truncate">{item.term}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50 shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>

          {/* Definition Panel */}
          <div className="lg:col-span-7 bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl space-y-6">
            {selectedTerm ? (
              <>
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                    CATEGORÍA: {selectedTerm.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-white font-heading mt-2">
                    {selectedTerm.term}
                  </h3>
                </div>

                <div className="space-y-4 text-xs leading-relaxed">
                  <div>
                    <h4 className="text-[11px] font-mono font-bold text-slate-400 uppercase mb-1">Definición Estratégica</h4>
                    <p className="text-slate-200 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                      {selectedTerm.definition}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-mono font-bold text-slate-400 uppercase mb-1">Impacto Organizacional</h4>
                    <p className="text-slate-200 bg-slate-950/50 p-4 rounded-xl border border-slate-800 border-l-4 border-l-cyan-500">
                      {selectedTerm.roleOrImpact}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 text-xs flex items-center space-x-2.5">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="font-bold text-white">Cumplimiento Avalado DAMA</p>
                    <p className="text-[10px] text-slate-400">Esta definición sigue las especificaciones normativas oficiales.</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-8 text-center text-slate-500 text-xs font-mono">
                Seleccione un término para visualizar su definición estructurada.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
