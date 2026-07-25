import React, { useState } from 'react';
import { damaQuestions } from '../data/damaQuestions';
import { cloudPlatforms } from '../data/cloudPlatforms';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw
} from 'lucide-react';

interface InteractiveAISuiteProps {
  onOpenDemo: () => void;
}

export const InteractiveAISuite: React.FC<InteractiveAISuiteProps> = ({ onOpenDemo }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'dama' | 'arch' | 'roadmap'>('dama');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Microsoft Azure', 'Snowflake', 'Databricks', 'Power BI / Fabric', 'OpenAI Enterprise']);

  const [companyScale, setCompanyScale] = useState<'medium' | 'large' | 'enterprise'>('large');
  const [primaryGoal, setPrimaryGoal] = useState<'governance' | 'ai' | 'compliance'>('governance');

  const handleSelectOption = (questionId: number, level: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: level }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < damaQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const resetDama = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  const totalScore = Object.values(answers).reduce((acc, val) => acc + val, 0);
  const avgScore = answers && Object.keys(answers).length > 0
    ? (totalScore / Object.keys(answers).length).toFixed(1)
    : '1.0';

  const getMaturityLabel = (score: number) => {
    if (score < 2) return 'Nivel 1: Inicial / Ad-Hoc';
    if (score < 3) return 'Nivel 2: Repetible / Silos';
    if (score < 4) return 'Nivel 3: Definido (Estandarizado)';
    if (score < 4.8) return 'Nivel 4: Gestionado & Automatizado';
    return 'Nivel 5: Optimizado & IA Cognitiva';
  };

  const togglePlatform = (name: string) => {
    if (selectedPlatforms.includes(name)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== name));
    } else {
      setSelectedPlatforms([...selectedPlatforms, name]);
    }
  };

  return (
    <section id="ai-suite" className="py-24 relative bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 transition-colors">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <span>{t('aiSuiteBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white mb-4">
            {t('aiSuiteTitle')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            {t('aiSuiteSub')}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab('dama')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
              activeTab === 'dama'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/40'
                : 'glass-panel text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>{t('tabDama')}</span>
          </button>

          <button
            onClick={() => setActiveTab('arch')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
              activeTab === 'arch'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/40'
                : 'glass-panel text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700'
            }`}
          >
            <Layers className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <span>{t('tabArch')}</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
              activeTab === 'roadmap'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 border border-emerald-400/40'
                : 'glass-panel text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>{t('tabRoadmap')}</span>
          </button>
        </div>

        {activeTab === 'dama' && (
          <div className="glass-panel rounded-2xl p-6 sm:p-10 border border-cyan-500/30 shadow-2xl max-w-4xl mx-auto">
            {!isCompleted ? (
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono">
                  <span>DOMINIO {currentQuestionIndex + 1} DE {damaQuestions.length}</span>
                  <span>{Math.round(((currentQuestionIndex + 1) / damaQuestions.length) * 100)}% COMPLETADO</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-8">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / damaQuestions.length) * 100}%` }}
                  />
                </div>

                <div className="mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                    {damaQuestions[currentQuestionIndex].domain}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-3 font-heading">
                    {damaQuestions[currentQuestionIndex].question}
                  </h3>
                </div>

                <div className="space-y-3 mb-8">
                  {damaQuestions[currentQuestionIndex].options.map((option) => {
                    const isSelected = answers[damaQuestions[currentQuestionIndex].id] === option.level;
                    return (
                      <button
                        key={option.level}
                        onClick={() => handleSelectOption(damaQuestions[currentQuestionIndex].id, option.level)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-4 ${
                          isSelected
                            ? 'bg-cyan-50/90 dark:bg-cyan-950/80 border-cyan-500 dark:border-cyan-400 shadow-lg shadow-cyan-500/10'
                            : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                          isSelected ? 'bg-cyan-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}>
                          L{option.level}
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-sm font-bold ${isSelected ? 'text-cyan-700 dark:text-cyan-300' : 'text-slate-900 dark:text-white'}`}>
                            {option.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                            {option.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30"
                  >
                    Anterior
                  </button>

                  <button
                    disabled={!answers[damaQuestions[currentQuestionIndex].id]}
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:scale-105 transition-all disabled:opacity-40 flex items-center space-x-2 shadow-lg"
                  >
                    <span>{currentQuestionIndex === damaQuestions.length - 1 ? 'Ver Resultado DAMA' : 'Siguiente Dominio'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8 text-center">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>DIAGNÓSTICO DAMA-DMBOK COMPLETADO</span>
                </div>

                <div>
                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading mb-2">
                    Nivel de Madurez Evaluado: <span className="text-cyan-600 dark:text-cyan-400">{getMaturityLabel(Number(avgScore))}</span>
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                    Su organización obtuvo un puntaje promedio de <span className="font-bold text-slate-900 dark:text-white font-mono">{avgScore} / 5.0</span> en los dominios fundamentales del DAMA-DMBOK2.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 bg-white/90 dark:bg-slate-900/80 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                  {damaQuestions.map((q) => {
                    const score = answers[q.id] || 1;
                    return (
                      <div key={q.id} className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                        <div className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">L{score}</div>
                        <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 mt-1">{q.domainShort}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <button
                    onClick={onOpenDemo}
                    className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:scale-105 transition-all shadow-lg"
                  >
                    Solicitar Diagnóstico Profundo con un Consultor Principal
                  </button>

                  <button
                    onClick={resetDama}
                    className="px-4 py-3 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reiniciar Quiz</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'arch' && (
          <div className="glass-panel rounded-2xl p-6 sm:p-10 border border-indigo-500/30 shadow-2xl space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-2">
                {t('archTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {t('archSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {cloudPlatforms.map((plat) => {
                const isSelected = selectedPlatforms.includes(plat.name);
                return (
                  <button
                    key={plat.name}
                    onClick={() => togglePlatform(plat.name)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-500 dark:border-indigo-400 shadow-md shadow-indigo-500/10'
                        : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{plat.name}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{plat.category}</p>
                  </button>
                );
              })}
            </div>

            <div className="text-center">
              <button
                onClick={onOpenDemo}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg"
              >
                Hablar con un Principal Data Architect
              </button>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="glass-panel rounded-2xl p-6 sm:p-10 border border-emerald-500/30 shadow-2xl space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-2">
                {t('roadmapTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {t('roadmapSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">Tamaño de la Empresa</label>
                <select
                  value={companyScale}
                  onChange={(e) => setCompanyScale(e.target.value as any)}
                  className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:border-emerald-500 outline-none shadow-sm"
                >
                  <option value="medium">Mediana (100 - 500 empleados)</option>
                  <option value="large">Grande (500 - 2,500 empleados)</option>
                  <option value="enterprise">Corporación Multinacional (&gt; 2,500)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">Prioridad Principal</label>
                <select
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value as any)}
                  className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:border-emerald-500 outline-none shadow-sm"
                >
                  <option value="governance">Gobierno de Datos & DAMA</option>
                  <option value="ai">Habilitación de IA & LLMs</option>
                  <option value="compliance">Privacidad & Cumplimiento Normativo</option>
                </select>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={onOpenDemo}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-lg"
              >
                Solicitar Roadmap Personalizado en PDF
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
