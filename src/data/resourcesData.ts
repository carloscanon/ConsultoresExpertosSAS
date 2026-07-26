import type { BlogPost } from '../types';

export const resourcesData: BlogPost[] = [
  {
    id: 'whitepaper-ai-governance-2026',
    title: 'Guía Definitiva de Gobierno de IA y Model Observability para Entornos Corporativos',
    category: 'Whitepapers',
    summary: 'Cómo estructurar el gobierno de agentes autónomos, modelos RAG y LLMs sin frenar la innovación ni comprometer la confidencialidad de la información.',
    readTime: '12 min de lectura',
    date: '18 de Julio, 2026',
    author: 'Dr. Carlos Mendoza',
    authorRole: 'Principal Architect & DAMA Fellow',
    tags: ['IA Generativa', 'DAMA-DMBOK', 'LLMOps', 'Compliance'],
    aiSummary: 'Este documento expone las 5 dimensiones clave para auditar modelos de inteligencia artificial generativa en producción.',
    featured: true
  },
  {
    id: 'masterclass-governance-intro',
    title: 'Video Masterclass: Introducción Práctica al Gobierno de Datos Moderno (DAMA-DMBOK2)',
    category: 'Videos & Grabaciones',
    summary: 'Una sesión técnica en vivo detallando el framework DAMA, el rol del CDO y la implementación del Catálogo de Metadatos 2.0.',
    readTime: '45 min de video',
    date: '24 de Julio, 2026',
    author: 'Ing. Carlos Cañón',
    authorRole: 'Principal Consultant',
    tags: ['DAMA', 'Framework', 'Webinar', 'YouTube'],
    aiSummary: 'Video explicativo en el cual aprenderás paso a paso las fases iniciales de una estrategia de gobernanza empresarial.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'data-mesh-vs-data-fabric',
    title: 'Data Mesh vs. Data Fabric: ¿Cuál es la Arquitectura Adecuada para tu Organización?',
    category: 'Arquitectura de Datos',
    summary: 'Un análisis comparativo profundo entre la descentralización por dominios (Data Mesh) y la capa de automatización de metadatos (Data Fabric).',
    readTime: '8 min de lectura',
    date: '10 de Junio, 2026',
    author: 'Ing. Sofía Valenzuela',
    authorRole: 'Chief AI Architect',
    tags: ['Data Mesh', 'Data Fabric', 'Snowflake', 'Databricks'],
    aiSummary: 'Compara patrones descentralizados vs. centralizados y propone una arquitectura híbrida optimizada con GovData Nexus.'
  },
  {
    id: 'dmbok2-checklist',
    title: 'Checklist Práctico: 50 Controles Esenciales del DAMA-DMBOK2 para Auditorías',
    category: 'Checklists & Plantillas',
    summary: 'Plantilla interactiva en Excel y PDF con la lista de verificación que utilizan nuestros consultores sénior en diagnósticos corporativos.',
    readTime: '5 min de lectura',
    date: '02 de Mayo, 2026',
    author: 'Lic. Fernando Gómez',
    authorRole: 'Senior Data Governance Manager',
    tags: ['DAMA', 'Auditoría', 'Checklist', 'Descargable'],
    aiSummary: 'Proporciona una guía rápida estructurada por dominios de conocimiento DAMA para preparar auditorías internas.'
  }
];
