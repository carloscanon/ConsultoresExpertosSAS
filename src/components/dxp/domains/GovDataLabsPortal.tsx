import React, { useState } from 'react';
import { 
  Cpu, 
  RefreshCw, 
  Download, 
  Activity
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: { label: string; value: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: '¿Existe un modelo de Gobierno de Datos formalizado en su organización?',
    options: [
      { label: 'No existe ninguna iniciativa (Nivel 1)', value: 1.0 },
      { label: 'Existen iniciativas informales aisladas en áreas técnicas (Nivel 2)', value: 2.0 },
      { label: 'Modelo definido y documentado formalmente (Nivel 3)', value: 3.0 },
      { label: 'Políticas operando y monitoreadas con KPIs de negocio (Nivel 4)', value: 4.0 },
      { label: 'Gobierno optimizado continuamente con IA (Nivel 5)', value: 5.0 }
    ]
  },
  {
    id: 2,
    text: '¿Cómo se gestiona el diccionario de datos y los metadatos?',
    options: [
      { label: 'No se documentan metadatos (Nivel 1)', value: 1.0 },
      { label: 'Archivos Excel manuales desactualizados (Nivel 2)', value: 2.0 },
      { label: 'Catálogo de datos corporativo unificado (Nivel 3)', value: 3.0 },
      { label: 'Automatización e integración de linaje de datos (Nivel 4)', value: 4.0 },
      { label: 'Metadatos activos guiando decisiones automáticas (Nivel 5)', value: 5.0 }
    ]
  },
  {
    id: 3,
    text: '¿Cuál es el nivel de control sobre la Calidad de Datos?',
    options: [
      { label: 'Reactivo: solo se resuelven fallas cuando explotan (Nivel 1)', value: 1.0 },
      { label: 'Perfilamientos ocasionales en silos de bases de datos (Nivel 2)', value: 2.0 },
      { label: 'Reglas de negocio validadas formalmente (Nivel 3)', value: 3.0 },
      { label: 'Monitoreo preventivo mediante tableros y alarmas (Nivel 4)', value: 4.0 },
      { label: 'Autolimpieza y remedición heurística (Nivel 5)', value: 5.0 }
    ]
  },
  {
    id: 4,
    text: '¿Quiénes asumen la responsabilidad sobre los datos en su empresa?',
    options: [
      { label: 'Nadie asume la responsabilidad (Nivel 1)', value: 1.0 },
      { label: 'Solo el área de TI es responsable (Nivel 2)', value: 2.0 },
      { label: 'Data Stewards asignados informalmente en algunas áreas (Nivel 3)', value: 3.0 },
      { label: 'Matriz formal de Data Owners corporativos operando (Nivel 4)', value: 4.0 },
      { label: 'Comité de gobernanza integrado en la junta directiva (Nivel 5)', value: 5.0 }
    ]
  },
  {
    id: 5,
    text: '¿Qué tan alineados están los datos con las decisiones de negocio?',
    options: [
      { label: 'Las decisiones se toman por intuición de directivos (Nivel 1)', value: 1.0 },
      { label: 'Reportes de Power BI desorganizados sin auditoría (Nivel 2)', value: 2.0 },
      { label: 'Estrategia de datos alineada con objetivos anuales (Nivel 3)', value: 3.0 },
      { label: 'Fábrica de datos automatizada soportando decisiones (Nivel 4)', value: 4.0 },
      { label: 'Modelos predictivos e IA conduciendo operaciones (Nivel 5)', value: 5.0 }
    ]
  }
];

export const GovDataLabsPortal: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState(1.0);

  const activeQuestion = QUESTIONS[activeQuestionIdx];

  const handleOptionSelect = (val: number) => {
    const updatedAnswers = { ...answers, [activeQuestion.id]: val };
    setAnswers(updatedAnswers);

    if (activeQuestionIdx < QUESTIONS.length - 1) {
      setActiveQuestionIdx(prev => prev + 1);
    } else {
      // Calculate average score
      const sum = Object.values(updatedAnswers).reduce((a, b) => a + b, 0);
      const avg = sum / QUESTIONS.length;
      setCalculatedScore(Number(avg.toFixed(1)));
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setActiveQuestionIdx(0);
    setShowResult(false);
    setCalculatedScore(1.0);
  };

  // SVG Gauge calculations
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  // Map score (1.0 to 5.0) to arc length (0 to circumference)
  const scorePercent = (calculatedScore - 1) / 4; // 0 to 1
  const strokeDashoffset = circumference - scorePercent * circumference;

  const getMaturityLabel = (score: number) => {
    if (score < 2.0) return 'Inexistente o Reactivo (Nivel 1)';
    if (score < 3.0) return 'Informal o Repetible (Nivel 2)';
    if (score < 4.0) return 'Definido y Formalizado (Nivel 3)';
    if (score < 5.0) return 'Administrado y Medido (Nivel 4)';
    return 'Optimizado Continuo (Nivel 5)';
  };

  return (
    <div className="py-24 bg-slate-950 text-white min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>GovData Labs • Frameworks & Tools</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Laboratorio de Madurez & Canvas
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Diagnostique el nivel de madurez DAMA-DMBOK de su organización y explore plantillas estratégicas de arquitectura de datos.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive DAMA Maturity Calculator */}
          <div className="lg:col-span-7 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl flex flex-col justify-between min-h-[420px]">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white font-heading uppercase tracking-wider flex items-center space-x-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Calculadora de Madurez DAMA-DMBOK2</span>
              </h3>
              {!showResult && (
                <span className="text-[10px] font-mono text-slate-500 font-bold">
                  PREGUNTA {activeQuestionIdx + 1} DE {QUESTIONS.length}
                </span>
              )}
            </div>

            {!showResult ? (
              <div className="space-y-6 py-6 text-xs">
                <p className="text-base font-bold text-slate-200">{activeQuestion.text}</p>
                
                <div className="space-y-2">
                  {activeQuestion.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(opt.value)}
                      className="w-full text-left p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 text-slate-300 transition-all font-semibold"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-6 flex flex-col sm:flex-row items-center sm:space-x-8 text-xs text-slate-300">
                
                {/* SVG Gauge */}
                <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="72"
                      cy="72"
                      r={radius}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth={strokeWidth}
                      fill="transparent"
                    />
                    <circle
                      cx="72"
                      cy="72"
                      r={radius}
                      stroke="#06b6d4"
                      strokeWidth={strokeWidth}
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-3xl font-extrabold font-mono text-cyan-400">{calculatedScore}</span>
                    <span className="text-[10px] text-slate-500 block">DAMA Rating</span>
                  </div>
                </div>

                {/* Score Summary */}
                <div className="space-y-3 mt-4 sm:mt-0">
                  <h4 className="text-sm font-bold text-white font-heading">DIAGNÓSTICO OBTENIDO</h4>
                  <p className="font-bold text-cyan-400 font-mono text-xs">{getMaturityLabel(calculatedScore)}</p>
                  <p className="text-slate-400 leading-relaxed max-w-sm">
                    Su organización muestra un nivel operativo basado en procesos desarticulados. Le aconsejamos agendar un diagnóstico detallado para priorizar un plan de remediación DAMA.
                  </p>
                  <button
                    onClick={handleReset}
                    className="p-2 px-4 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-bold text-slate-400 hover:text-white flex items-center space-x-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reiniciar Calculadora</span>
                  </button>
                </div>

              </div>
            )}

            <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
              💡 Este test representa un análisis indicativo preliminar. El diagnóstico corporativo completo evalúa más de 120 variables de negocio.
            </div>

          </div>

          {/* Right Column: Downloadable Strategic Framework Canvases */}
          <div className="lg:col-span-5 bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white font-heading uppercase tracking-wider border-b border-slate-800 pb-3">
              Descarga de Canvas & Frameworks
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { name: 'Canvas de Gobierno de Datos', type: 'Framework de Negocio', desc: 'Plantilla de una página para modelar Owners, Stewards, y KPIs de gobernanza.' },
                { name: 'Roadmap de Metadatos DAMA', type: 'Guía Técnica', desc: 'Matriz técnica de planificación para ingesta de linaje de datos.' },
                { name: 'Framework de Reglas de Calidad', type: 'Template Operativo', desc: 'Plantilla XLS con 30 reglas estandarizadas para perfiles de bases de datos.' }
              ].map((tmpl, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-850 flex items-start justify-between space-x-3 group">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest">{tmpl.type}</span>
                    <h4 className="font-bold text-white leading-tight">{tmpl.name}</h4>
                    <p className="text-[10px] text-slate-400 leading-normal">{tmpl.desc}</p>
                  </div>
                  <button className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white group-hover:bg-cyan-600 transition-all shrink-0">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
