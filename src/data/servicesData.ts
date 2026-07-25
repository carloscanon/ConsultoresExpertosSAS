import type { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'data-governance',
    title: 'Gobierno de Datos',
    subtitle: 'Marco DAMA-DMBOK2 & Operacionalización',
    category: 'Estrategia & Gobierno',
    icon: 'ShieldCheck',
    overview: 'Estrategias y marcos de gobierno alineados a DAMA-DMBOK2. Definición de roles RACI (Data Stewards, Owners), políticas, métricas de adopción y modelo de sostenibilidad.',
    benefits: [
      'Disminución del riesgo regulatorio y de cumplimiento.',
      'Claridad de propiedad (Data Ownership) en todas las áreas de negocio.',
      'Cultura data-driven con procesos estandarizados.'
    ],
    deliverables: [
      'Roadmap estratégico de Gobierno a 1, 2 y 3 años',
      'Matriz RACI de roles y responsabilidades de datos',
      'Catálogo de políticas y procedimientos de datos',
      'Tablero de control de madurez de datos'
    ],
    supportedTech: ['GovData Nexus', 'Collibra', 'Alation', 'Informatica', 'Microsoft Purview'],
    kpi: { value: '4.8/5.0', label: 'Madurez Promedio Alcanzada' }
  },
  {
    id: 'ai-solutions',
    title: 'Inteligencia Artificial',
    subtitle: 'GenAI, Agentes Autónomos & Machine Learning',
    category: 'Inteligencia Artificial',
    icon: 'Sparkles',
    overview: 'Soluciones de IA para automatización y análisis predictivo. Implementación de casos de uso RAG, ajuste de LLMs y modelos predictivos gobernados para producción.',
    benefits: [
      'Automatización inteligente de procesos analíticos complejos.',
      'Consultas a bases de datos corporativas en lenguaje natural.',
      'Monitoreo continuo de sesgos y seguridad en modelos de IA.'
    ],
    deliverables: [
      'Agentes de IA corporativos integrados a la base de metadatos',
      'Infraestructura RAG segura con aislamiento de datos',
      'Plataforma MLOps y Gobierno de Modelos (LLMOps)'
    ],
    supportedTech: ['OpenAI', 'Azure AI', 'LangChain', 'Pinecone', 'Databricks Mosaic'],
    kpi: { value: '85%', label: 'Reducción de Tiempo Operativo' }
  },
  {
    id: 'advanced-analytics',
    title: 'Analítica Avanzada',
    subtitle: 'BI Ejecutivo & Prescriptivo',
    category: 'Analítica',
    icon: 'BarChart3',
    overview: 'Transformamos datos en insights accionables. Dashboards ejecutivos de alto impacto, analítica prescriptiva y visualización interactiva para la alta gerencia.',
    benefits: [
      'Acceso instantáneo a KPIs críticos en tiempo real.',
      'Eliminación de reportes manuales en hojas de cálculo.',
      'Toma de decisiones estratégica basada en evidencia.'
    ],
    deliverables: [
      'Dashboards ejecutivos en Power BI, Tableau o Looker',
      'Semántica unificada de negocio (Semantic Layer)',
      'Modelos analíticos predictivos'
    ],
    supportedTech: ['Power BI', 'Fabric', 'Tableau', 'Looker', 'dbt'],
    kpi: { value: '98%', label: 'Adopción por Alta Gerencia' }
  },
  {
    id: 'enterprise-architecture',
    title: 'Arquitectura Empresarial',
    subtitle: 'Modern Data Stack & Cloud Lakehouse',
    category: 'Arquitectura & Plataformas',
    icon: 'Layers',
    overview: 'Diseñamos arquitecturas escalables y seguras. Data Fabric, Data Mesh y Lakehouses multi-cloud de alto rendimiento y bajo costo.',
    benefits: [
      'Escalabilidad ilimitada para volúmenes de petabytes.',
      'Optimización de costos cloud hasta en un 40%.',
      'Integración fluida de datos estructurados e IA.'
    ],
    deliverables: [
      'Blueprint de Arquitectura Objetivo (TOGAF / DAMA)',
      'Diseño de Pipeline Medallion (Bronze, Silver, Gold)',
      'Estrategia de ingesta streaming'
    ],
    supportedTech: ['Snowflake', 'Databricks', 'AWS', 'Azure', 'Google Cloud', 'Fabric'],
    kpi: { value: '6x', label: 'Velocidad de Procesamiento' }
  },
  {
    id: 'quality-metadata',
    title: 'Calidad y Metadatos',
    subtitle: 'Confianza de Datos & Linaje 360°',
    category: 'Data Quality & Metadatos',
    icon: 'CheckCircle2',
    overview: 'Aseguramos la confianza y el entendimiento de tus datos. Perfilamiento automático, reglas de calidad y linaje extremo a extremo.',
    benefits: [
      'Confianza renovada en las decisiones analíticas.',
      'Detección automática de anomalías antes de producción.',
      'Linaje visual a nivel de columna.'
    ],
    deliverables: [
      'Diagnóstico inicial de salud de datos corporativos',
      'Batería de reglas de calidad automatizadas',
      'Mapa de linaje técnico y de negocio'
    ],
    supportedTech: ['GovData Nexus', 'Great Expectations', 'Soda.io', 'Purview'],
    kpi: { value: '99.5%', label: 'Índice de Confiabilidad' }
  },
  {
    id: 'digital-transformation',
    title: 'Transformación Digital',
    subtitle: 'Change Management & GovData Academy',
    category: 'Consultoría & Formación',
    icon: 'TrendingUp',
    overview: 'Acompañamos a tu organización en su evolución digital. Gestión del cambio cultural, alfabetización de datos (Data Literacy) y capacitación directiva.',
    benefits: [
      'Superación de la resistencia al cambio en los equipos.',
      'Alineación entre metas de tecnología y negocio.',
      'Equipos internos autónomos y certificados.'
    ],
    deliverables: [
      'Plan de gestión del cambio e alfabetización de datos',
      'Talleres ejecutivos y cursos de certificación GovData Academy',
      'Programa de adopción comunitaria de Data Stewards'
    ],
    supportedTech: ['GovData Academy', 'DAMA Framework', 'TOGAF'],
    kpi: { value: '10K+', label: 'Profesionales Formados' }
  }
];
