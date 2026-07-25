import React, { useState } from 'react';
import { 
  Cpu, 
  CheckCircle,
  ChevronRight
} from 'lucide-react';

interface Specialty {
  id: string;
  title: string;
  category: 'datos' | 'arquitectura' | 'gobierno' | 'ia';
  overview: string;
  problem: string;
  diagnosis: string;
  methodology: string;
  cases: string;
  results: string;
  checklist: string[];
}

const SPECIALTIES: Specialty[] = [
  {
    id: 'gobierno_datos',
    title: 'Gobierno de Datos (DAMA-DMBOK2)',
    category: 'datos',
    overview: 'Marco estructurado para tratar los datos como activo estratégico de la organización.',
    problem: 'Silos de información, duplicación de esfuerzos comerciales, y decisiones basadas en reportes contradictorios.',
    diagnosis: 'Evaluación del nivel de madurez DAMA de 1 a 5 (usualmente las empresas inician en nivel 1.5). Mapeo de la propiedad (Data Owners) y custodios (Stewards).',
    methodology: 'Fases DAMA-DMBOK2: Estrategia, Modelo Operativo de Gobernanza, Glosario de Negocio unificado, y Linaje de Datos de extremo a extremo.',
    cases: 'Implementación del Gobierno de Datos en POSITIVA Seguros, alineando 12 áreas críticas de negocio.',
    results: 'Reducción del 45% en tiempos de consolidación de reportes regulatorios.',
    checklist: ['Definición de Data Stewards y Owners', 'Creación del Diccionario de Datos Unificado', 'Implementación de Políticas de Datos en GovData Nexus™']
  },
  {
    id: 'calidad_datos',
    title: 'Calidad de Datos & MDM',
    category: 'datos',
    overview: 'Sistemas de control continuo para asegurar la exactitud, consistencia y completitud de sus datos maestros.',
    problem: 'Pérdidas de facturación, direcciones erróneas de clientes, y registros duplicados en el CRM corporativo (Golden Record ausente).',
    diagnosis: 'Perfilamiento automatizado de bases de datos mediante algoritmos heurísticos para detectar anomalías relacionales.',
    methodology: 'Definición de umbrales de SLAs de Calidad (Integridad, Validez, Precisión). Despliegue de paneles de remediación en tiempo real.',
    cases: 'Saneamiento del Maestro de Pensionados en FONCEP, identificando inconsistencias en registros históricos.',
    results: 'Exactitud de datos de pago superior al 99.8%.',
    checklist: ['Establecer Umbrales de Calidad de Datos', 'Implementar Remediación Automática en Ingestas', 'Diseñar Tableros de Control de Reglas de Calidad']
  },
  {
    id: 'arquitectura_empresarial',
    title: 'Arquitectura Empresarial (TOGAF & COBIT)',
    category: 'arquitectura',
    overview: 'Diseño integral de la infraestructura, aplicaciones y procesos de negocio para garantizar la escalabilidad.',
    problem: 'Portafolio de software fragmentado, licencias redundantes, y falta de alineación entre TI y el negocio.',
    diagnosis: 'Mapeo de la Arquitectura Actual (AS-IS) frente al Modelo Deseado (TO-BE). Análisis de brechas estructurado.',
    methodology: 'Despliegue del Ciclo ADM de TOGAF 10. Estructuración del Repositorio de Arquitectura y Gobierno con COBIT 2019.',
    cases: 'Rediseño del mapa de aplicaciones para el IDRD Bogotá, logrando una reducción de complejidad de TI.',
    results: 'Ahorro del 28% anual en licenciamiento redundante.',
    checklist: ['Diseñar Diagrama de Arquitectura AS-IS / TO-BE', 'Alinear Procesos bajo Capas de Negocio de TOGAF', 'Establecer Mesa de Control de Gobierno de TI']
  },
  {
    id: 'inteligencia_artificial',
    title: 'IA Generativa & Modelos de Lenguaje (LLMs)',
    category: 'ia',
    overview: 'Despliegue seguro de agentes de IA y automatización semántica sobre repositorios privados de la empresa.',
    problem: 'Pérdida de productividad en análisis documental, y riesgos de fuga de información al usar IA comercial sin gobierno.',
    diagnosis: 'Evaluación de viabilidad de casos de uso (ROI/Factibilidad) y auditoría de la calidad de los datos fuentes que nutrirán la IA.',
    methodology: 'Implementación de arquitecturas RAG (Retrieval-Augmented Generation) integrando bases vectoriales seguras y modelos locales de lenguaje.',
    cases: 'Despliegue de un asistente virtual de IA para análisis de expedientes jurídicos en LegalCol.',
    results: 'Reducción del 70% en el tiempo de revisión documental de contratos corporativos.',
    checklist: ['Definición de Políticas de Uso Ético y Seguro de IA', 'Arquitectura de Datos Vectoriales con Embeddings Privados', 'Monitoreo de Consumos y Alucinaciones (SLAs)']
  },
  {
    id: 'peti',
    title: 'Planeación Estratégica de TI (PETI)',
    category: 'gobierno',
    overview: 'Estructuración del plan de tecnología a 4 años para apalancar el cumplimiento de metas organizacionales.',
    problem: 'Gasto en tecnología reactivo, sin proyectos transversales de gran impacto, y fallas de alineación institucional.',
    diagnosis: 'Evaluación de capacidades tecnológicas, madurez de procesos de TI, e impacto regulatorio de lineamientos estatales.',
    methodology: 'Guía PETI del MinTIC: Definición del Modelo de TI, Estrategia de Información, Plan de Proyectos con presupuesto y ruta.',
    cases: 'Diseño e inscripción del PETI en tres entidades distritales de salud.',
    results: 'Cumplimiento del 100% de los lineamientos nacionales de Gobierno Digital.',
    checklist: ['Análisis DAFO de la Dirección de Tecnología', 'Definición del Mapa de Proyectos de Inversión Tecnológica', 'Indicadores de Cumplimiento de Gobierno Digital']
  },
  {
    id: 'mipg',
    title: 'MIPG & Gobierno Digital',
    category: 'gobierno',
    overview: 'Alineación de la infraestructura de información pública bajo el Modelo Integrado de Planeación y Gestión.',
    problem: 'Sanciones regulatorias por incumplimiento del Decreto 1008 de Gobierno Digital y Ley de Transparencia.',
    diagnosis: 'Auditoría del autodiagnóstico institucional frente al índice de Transparencia de la Información.',
    methodology: 'Políticas de Seguridad Digital, Datos Abiertos, y Servicios Ciudadanos Digitales integrados en el ecosistema MIPG.',
    cases: 'Asesoría técnica para auditorías estatales en el sector educativo.',
    results: 'Calificación de MIPG superior a 95 puntos en el indicador de Gestión de TI.',
    checklist: ['Auditoría de Cumplimiento de Datos Abiertos', 'Esquema de Seguridad Digital ISO 27001', 'Publicación del Portal de Transparencia del Sitio']
  }
];

export const ConsultingPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'todos' | 'datos' | 'arquitectura' | 'gobierno' | 'ia'>('todos');
  const [selectedId, setSelectedId] = useState<string>(SPECIALTIES[0].id);

  const selectedSpecialty = SPECIALTIES.find(s => s.id === selectedId) || SPECIALTIES[0];

  const filteredList = activeTab === 'todos' 
    ? SPECIALTIES 
    : SPECIALTIES.filter(s => s.category === activeTab);

  return (
    <div className="py-24 bg-slate-950 text-white min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>GovData Consulting • Gartner-Level Insights</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading mb-4">
            Consultoría Estratégica & Arquitectura
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            "No implementamos Gobierno de Datos. Construimos organizaciones inteligentes."
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 text-xs font-bold">
          {['todos', 'datos', 'arquitectura', 'gobierno', 'ia'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2.5 rounded-xl capitalize transition-all ${
                activeTab === tab 
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' 
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {tab === 'todos' ? 'Todos los Servicios' : tab === 'ia' ? 'Inteligencia Artificial' : tab}
            </button>
          ))}
        </div>

        {/* Main 2-Column Portal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Specialty Selector Selector */}
          <div className="lg:col-span-4 bg-slate-900/60 p-4 rounded-3xl border border-slate-800/80 space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest px-2 pb-2 border-b border-slate-800">
              Micrositios de Servicios ({filteredList.length})
            </h3>
            
            <div className="space-y-1.5 max-h-[450px] overflow-y-auto pr-1">
              {filteredList.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedId(spec.id)}
                  className={`w-full text-left p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between group ${
                    selectedId === spec.id
                      ? 'bg-cyan-600 text-white shadow-lg'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <span className={`w-2 h-2 rounded-full ${selectedId === spec.id ? 'bg-white' : 'bg-cyan-400'} shrink-0`} />
                    <span className="truncate">{spec.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50 shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Detailed Sheet Display */}
          <div className="lg:col-span-8 bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl space-y-6">
            
            {/* Header info */}
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                DIAGNÓSTICO ESTRATÉGICO DIRECTO
              </span>
              <h3 className="text-2xl font-extrabold text-white font-heading mt-1">
                {selectedSpecialty.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 italic">
                "{selectedSpecialty.overview}"
              </p>
            </div>

            {/* Content Sheets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider block">
                  ⚠️ El Problema Corporativo
                </span>
                <p className="text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {selectedSpecialty.problem}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                  🔍 Diagnóstico Inicial
                </span>
                <p className="text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {selectedSpecialty.diagnosis}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider block">
                  🛠️ Metodología de Implementación
                </span>
                <p className="text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {selectedSpecialty.methodology}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  🏆 Caso de Éxito & Resultados
                </span>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-1.5">
                  <p className="font-bold text-white">{selectedSpecialty.cases}</p>
                  <p className="text-emerald-400 font-mono font-bold">{selectedSpecialty.results}</p>
                </div>
              </div>

            </div>

            {/* Checklist Box */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-3">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                📋 Checklist para Líderes & Directivos
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedSpecialty.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Panel */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-white">¿Requiere un diagnóstico para su organización?</p>
                <p className="text-[10px] text-slate-500">Agende una sesión técnica de 30 minutos con un arquitecto senior.</p>
              </div>
              <button className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md">
                Agendar Diagnóstico Especializado
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
