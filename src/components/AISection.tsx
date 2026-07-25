import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { saveAIChatLog } from '../lib/supabase';
import { 
  Sparkles, 
  Bot, 
  Send, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Workflow, 
  BrainCircuit,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface AISectionProps {
  onOpenDemo: () => void;
  onOpenAICopilot?: () => void;
}

export const AISection: React.FC<AISectionProps> = ({ onOpenDemo }) => {
  const { t } = useLanguage();
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: '¡Hola! Soy el Copiloto IA de Gobierno de Datos de Consultores Expertos SAS. ¿Cómo puedo ayudarte a optimizar la calidad o catalogación de tus datos hoy?'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setIsTyping(true);

    let aiReply = 'Entendido. Basado en el marco DAMA-DMBOK2 y GovData Nexus Engine 4.0, la recomendación es establecer reglas de perfilamiento automático con linaje en grafo 3D para mitigar riesgos operacionales.';
    if (userMessage.toLowerCase().includes('calidad') || userMessage.toLowerCase().includes('duplicado')) {
      aiReply = 'Para problemas de calidad y registros duplicados, recomendamos activar la regla de Fuzzy Matching con resolución de Golden Record en GovData Nexus™ Master Data Management.';
    } else if (userMessage.toLowerCase().includes('dama') || userMessage.toLowerCase().includes('cdmp')) {
      aiReply = 'Nuestros programas de certificación internacional CDMP® DAMA cubren los 11 dominios del DMBOK2. Puedes preinscribirte directamente en la sección GovData Academy.';
    }

    setTimeout(async () => {
      setIsTyping(false);
      setChatMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);

      // Log to Supabase
      await saveAIChatLog({
        sessionId: 'session_web_' + Date.now(),
        userPrompt: userMessage,
        aiResponse: aiReply
      });
    }, 1000);
  };

  const featureChips = [
    { title: 'Generación Automática de Reglas de Calidad', icon: CheckCircle2 },
    { title: 'Clasificación Semántica PII & GDPR', icon: ShieldCheck },
    { title: 'Trazabilidad de Linaje 3D en Grafo', icon: Workflow },
    { title: 'Resolución de Entidades Maestras (MDM)', icon: Database },
    { title: 'Detección de Anomalías en Tiempo Real', icon: Cpu },
    { title: 'Asistente RAG Auditado Enterprise', icon: BrainCircuit }
  ];

  return (
    <section id="ai-section" className="py-24 relative bg-white text-slate-900 border-t border-slate-200 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>{t('aiBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading mb-4 text-slate-900">
            Inteligencia Artificial <span className="text-blue-600">al Servicio de tus Datos</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('aiSub')}
          </p>
        </div>

        {/* Grid: 6 Feature Chips + Live Interactive AI Chat Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left 6 Feature Chips */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <h3 className="text-2xl font-extrabold text-slate-900 font-heading mb-6">
              Capacidades de IA Generativa & Gobierno Auditado
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featureChips.map((f, idx) => {
                const Icon = f.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500/50 hover:bg-white transition-all shadow-xs flex items-start space-x-3 group cursor-pointer"
                  >
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">
                      {f.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenDemo}
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center space-x-2"
              >
                <span>Conocer Más de GovData Nexus IA</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Floating Dark Glass Interactive AI Chat Box + Glowing Neural Brain */}
          <div className="lg:col-span-6 relative">
            
            {/* Glowing 3D Orbs */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative z-10 space-y-4 text-left">
              
              {/* Header Chat Box */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/40">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-heading">Copiloto IA GovData Nexus</h4>
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Conectado • Supabase Sync</span>
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  RAG Enterprise
                </span>
              </div>

              {/* Chat Stream Messages */}
              <div className="h-64 overflow-y-auto space-y-3 pr-2 font-sans text-xs">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                          : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="p-3 rounded-2xl bg-slate-900 text-slate-400 border border-slate-800 text-[11px] font-mono flex items-center space-x-2">
                      <span className="animate-pulse">Copiloto procesando consulta...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSendChat} className="flex items-center space-x-2 pt-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Haz una pregunta sobre tu calidad de datos o DAMA..."
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
