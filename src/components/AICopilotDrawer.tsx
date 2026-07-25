import React, { useState } from 'react';
import { saveAIChatLog } from '../lib/supabase';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  ArrowRight
} from 'lucide-react';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDemo: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({
  isOpen,
  onClose,
  onOpenDemo
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: '¡Hola! Soy el Copilot IA de Consultores Expertos SAS. Estoy especializado en Gobierno de Datos, DAMA-DMBOK, Arquitectura de datos e Inteligencia Artificial corporativa. ¿En qué puedo asistirte hoy?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    '¿Qué es DAMA-DMBOK y por qué lo necesita mi empresa?',
    '¿Cómo nos ayuda GovData Nexus en auditorías normativas?',
    '¿Cuál es la diferencia entre Data Mesh y Data Fabric?',
    '¿Cómo gobernar modelos de Inteligencia Artificial Generativa?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      const lower = query.toLowerCase();

      if (lower.includes('dama') || lower.includes('dmbok')) {
        replyText = 'DAMA-DMBOK2 es el marco estándar internacional de gestión de datos elaborado por DAMA International. Estructura 14 dominios de conocimiento incluyendo Gobierno, Calidad, Metadatos, Arquitectura y Seguridad. En Consultores Expertos SAS contamos con la mayor cantidad de profesionales certificados CDMP® en la región y nuestra plataforma GovData Nexus automatiza más del 70% de los controles recomendados.';
      } else if (lower.includes('nexus') || lower.includes('auditor')) {
        replyText = 'GovData Nexus™ actúa como un mapa de linaje y catálogo activo que registra cada transformación de datos a nivel de columna. Cuando un ente regulador exige evidencias de trazabilidad o protección PII, Nexus genera el expediente de auditoría completo en menos de 2 minutos.';
      } else if (lower.includes('mesh') || lower.includes('fabric')) {
        replyText = 'Data Mesh es un paradigma organizacional descentralizado por dominios de negocio orientados a Data Products. Data Fabric es la capa de tecnología y metadatos activos que conecta esos dominios de forma automatizada. GovData Nexus combina ambos mundos permitiendo Data Products gobernados sin fricción.';
      } else if (lower.includes('ia') || lower.includes('generativa') || lower.includes('llm')) {
        replyText = 'El Gobierno de IA requiere tres pilares: 1) Custodia de prompts y vectores (RAG Observability), 2) Auditoría de sesgos y alucinaciones en modelos, 3) Enmascaramiento dinámico para evitar que datos sensibles de la empresa alimenten LLMs externos. GovData Nexus ofrece un módulo especializado de Model Observability.';
      } else {
        replyText = `Entiendo tu inquietud sobre "${query}". En Consultores Expertos SAS diseñamos soluciones a medida respaldadas por 25 años de experiencia. Te sugiero agendar una sesión de diagnóstico estratégica de 30 minutos con nuestros consultores sénior para analizar tu caso específico.`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);

      // Persist to Supabase
      saveAIChatLog({
        sessionId: 'copilot-web-client',
        userPrompt: query,
        aiResponse: replyText,
        topicCategory: query.toLowerCase().includes('dama') || query.toLowerCase().includes('dmbok') 
          ? 'DAMA-DMBOK' 
          : query.toLowerCase().includes('ia') || query.toLowerCase().includes('generativa') 
            ? 'Inteligencia Artificial' 
            : 'Gobierno de Datos'
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col h-full">
        
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-heading">
                Copilot IA • Consultores Expertos
              </h3>
              <p className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Asistente Activo (DAMA & AI Expert)</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-indigo-600/30 border border-indigo-500/30 text-indigo-400'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-500 text-slate-950 font-medium'
                  : 'bg-slate-800/80 border border-slate-700 text-slate-200'
              }`}>
                <p>{msg.text}</p>
                <span className={`text-[9px] mt-1 block ${
                  msg.sender === 'user' ? 'text-slate-800' : 'text-slate-500'
                }`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-xs text-slate-400 p-2">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
              <span>Generando respuesta experta...</span>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 overflow-x-auto whitespace-nowrap space-x-2 custom-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="inline-block text-[11px] px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Pregunta sobre Gobierno, DAMA o GovData Nexus..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-cyan-400 outline-none"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 disabled:opacity-40 font-bold transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          
          <div className="mt-3 text-center">
            <button
              onClick={() => {
                onClose();
                onOpenDemo();
              }}
              className="text-[11px] text-cyan-400 hover:underline inline-flex items-center space-x-1"
            >
              <span>¿Prefieres agendar con un especialista humano?</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
