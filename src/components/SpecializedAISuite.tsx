import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Database, 
  FileText, 
  ShieldCheck, 
  Code, 
  Award,
  Sparkles,
  RefreshCw,
  User
} from 'lucide-react';
import { saveAIChatLog } from '../lib/supabase';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: any;
  color: string;
  promptGuideline: string;
  initialMessage: string;
}

const AGENTS: Agent[] = [
  {
    id: 'ia_dama',
    name: 'IA Gobierno Datos (DAMA)',
    role: 'Especialista DAMA-DMBOK2',
    icon: Database,
    color: 'text-cyan-400',
    promptGuideline: 'Actúa como un experto certificado CDMP de DAMA Internacional. Responde consultas técnicas sobre gobierno de datos, metadata, calidad y roles como Data Owners y Stewards.',
    initialMessage: 'Saludos. Soy su asistente DAMA-DMBOK2. ¿En qué dimensión del Gobierno de Datos (Metadata, Calidad, Arquitectura) le gustaría profundizar hoy?'
  },
  {
    id: 'ia_peti',
    name: 'IA PETI & MIPG',
    role: 'Consultor Gobierno Digital',
    icon: FileText,
    color: 'text-purple-400',
    promptGuideline: 'Actúa como un arquitecto estratégico especializado en PETI (Plan Estratégico de TI) y el Modelo Integrado de Planeación y Gestión (MIPG) de Colombia.',
    initialMessage: 'Hola. Estoy listo para asesorarle en la formulación de su PETI y alineación con los lineamientos de MIPG y Gobierno Digital. ¿Por dónde empezamos?'
  },
  {
    id: 'ia_togaf',
    name: 'IA Arquitectura (TOGAF)',
    role: 'Enterprise Architect',
    icon: Award,
    color: 'text-indigo-400',
    promptGuideline: 'Actúa como un Arquitecto Empresarial certificado en TOGAF 10 y COBIT. Diseña soluciones corporativas y mapea procesos organizacionales.',
    initialMessage: 'Bienvenido. Analicemos su Arquitectura Empresarial bajo el ADM de TOGAF. ¿Desea estructurar la arquitectura de Negocio, Datos, Aplicación o Tecnología?'
  },
  {
    id: 'ia_normativa',
    name: 'IA Privacidad (Ley 1581)',
    role: 'Auditor de Datos LegalCol',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    promptGuideline: 'Actúa como especialista legal en cumplimiento normativo, Ley 1581 de 2012 (Protección de Datos Personales en Colombia) y Ley 1712 de Transparencia.',
    initialMessage: 'Buen día. Soy su asesor en regulación de datos de LegalCol. ¿Tiene alguna consulta sobre el Registro Nacional de Bases de Datos (RNBD) o políticas de privacidad?'
  },
  {
    id: 'ia_fabric',
    name: 'IA Fabric & Power BI',
    role: 'Principal Data Engineer',
    icon: Code,
    color: 'text-amber-400',
    promptGuideline: 'Actúa como principal ingeniero en datos experto en Microsoft Fabric, Azure, AWS y optimización de modelos de datos DAX en Power BI.',
    initialMessage: '¡Hola! Hablemos de flujos de datos en Fabric, arquitectura Lakehouse con Delta Parquet o fórmulas DAX complejas. ¿Cuál es su desafío técnico hoy?'
  }
];

export const SpecializedAISuite: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(AGENTS[0]);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'assistant', text: AGENTS[0].initialMessage, timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Switch agent reset chat
  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent);
    setMessages([
      { sender: 'assistant', text: agent.initialMessage, timestamp: new Date() }
    ]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    const userQuery = inputText;
    setInputText('');
    setIsTyping(true);

    // Save to Supabase (non-blocking audit log)
    saveAIChatLog({
      sessionId: 'vision-2030-session',
      userPrompt: userQuery,
      aiResponse: 'Simulación del asistente virtual Vision 2030',
      topicCategory: selectedAgent.name
    }).catch(e => console.warn('Supabase chat audit failed:', e));

    // Simulated AI response stream
    setTimeout(() => {
      let aiResponseText = '';
      if (selectedAgent.id === 'ia_dama') {
        aiResponseText = `Bajo el marco de referencia DAMA-DMBOK2, para responder su consulta sobre "${userQuery}", considero clave establecer las siguientes prioridades:\n\n1. **Establecer Roles de Stewardship**: Definir quién es el Data Owner (responsabilidad de negocio) y quién es el Data Steward (operación del dato).\n2. **Calidad de Datos por Diseño**: Implementar reglas de validación en la fase de ingesta dentro de su arquitectura.\n3. **Gobernanza de Metadatos**: Cataloge la información en GovData Nexus™ para registrar linaje completo.`;
      } else if (selectedAgent.id === 'ia_peti') {
        aiResponseText = `Para estructurar adecuadamente el PETI alineado con MIPG, le sugiero abordar su consulta sobre "${userQuery}" mediante los siguientes ejes:\n\n- **Análisis de Capacidad de TI**: Diagnosticar la infraestructura y software actual.\n- **Alineación Estratégica**: Mapear los objetivos del Plan de Desarrollo Institucional con soluciones tecnológicas.\n- **Plan de Ruta a 4 Años**: Definir portafolio de proyectos evaluando riesgos de adopción.`;
      } else if (selectedAgent.id === 'ia_togaf') {
        aiResponseText = `El ADM (Architecture Development Method) de TOGAF plantea que para "${userQuery}", el curso de acción óptimo es:\n\n- **Fase A (Visión)**: Obtener patrocinio ejecutivo y definir el alcance arquitectónico.\n- **Fase B, C, D**: Mapear arquitectura de Negocio, Sistemas de Información (Datos/Aplicaciones) y Tecnología.\n- **Fase E & F**: Plan de migración, identificando bloques de construcción reutilizables.`;
      } else if (selectedAgent.id === 'ia_normativa') {
        aiResponseText = `Respecto al cumplimiento de la Ley 1581 de 2012 de Habeas Data en Colombia en relación a "${userQuery}", recuerde aplicar estos principios de oro:\n\n1. **Autorización Previa y Expresa**: Todo tratamiento de datos sensibles requiere el consentimiento explícito del titular.\n2. **Finalidad y Seguridad**: Los datos deben utilizarse únicamente para la finalidad informada.\n3. **Políticas de Tratamiento**: Su manual interno debe estar publicado e inscrito en el Registro Nacional de Bases de Datos (RNBD).`;
      } else {
        aiResponseText = `Desde una perspectiva de ingeniería con Microsoft Fabric y Power BI, abordar "${userQuery}" requiere:\n\n- **Lakehouse / OneLake**: Centralice la ingesta de datos en tablas Delta Parquet para lectura unificada.\n- **Direct Lake Mode**: Utilice Direct Lake para reportes de Power BI para evitar tiempos de recarga de importación tradicionales.\n- **Optimización DAX**: Use variables (\`VAR\`) en sus medidas para mejorar el rendimiento del motor Vertipaq.`;
      }

      setMessages(prev => [...prev, {
        sender: 'assistant',
        text: aiResponseText,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const AgentIcon = selectedAgent.icon;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-3xl border border-slate-800/80 shadow-2xl text-left max-w-7xl mx-auto my-12">
      
      {/* Left Column: Select Specialized Assistant */}
      <div className="lg:col-span-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            <div>
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">COGNITIVE SUITE 2030</h4>
              <h3 className="text-sm font-bold text-white font-heading">Asistentes IA Especializados</h3>
            </div>
          </div>

          <div className="space-y-1.5">
            {AGENTS.map((agent) => {
              const Icon = agent.icon;
              const isSelected = selectedAgent.id === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => handleAgentSelect(agent)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-600 text-white shadow-lg'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800/50 border border-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/20' : 'bg-slate-900'}`}>
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : agent.color}`} />
                    </div>
                    <div className="truncate">
                      <p className="font-bold truncate">{agent.name}</p>
                      <p className={`text-[10px] truncate ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>{agent.role}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[10px] text-slate-400 space-y-1 font-mono leading-relaxed">
          <p className="font-bold text-slate-300">💡 IA DE COGNICIÓN DIRECTA</p>
          <p>Cada chatbot está preconfigurado con directrices técnicas del framework seleccionado (DAMA, TOGAF, Ley 1581).</p>
        </div>
      </div>

      {/* Right Column: Chat Console */}
      <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between min-h-[480px]">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800">
              <AgentIcon className={`w-5 h-5 ${selectedAgent.color}`} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white leading-tight">{selectedAgent.name}</h4>
              <p className="text-[10px] text-slate-400 font-mono">{selectedAgent.role}</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-mono font-bold animate-pulse">ONLINE</span>
        </div>

        {/* Messages List Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[380px] bg-slate-950/40">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                  <AgentIcon className={`w-4 h-4 ${selectedAgent.color}`} />
                </div>
              )}
              <div className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-cyan-600 text-white rounded-tr-none' 
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
              }`}>
                {msg.text}
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                <AgentIcon className={`w-4 h-4 ${selectedAgent.color}`} />
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-500 rounded-tl-none flex items-center space-x-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Streaming respuesta...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar Form */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Hacer una consulta sobre ${selectedAgent.name.replace('IA ', '')}...`}
            className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="p-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
