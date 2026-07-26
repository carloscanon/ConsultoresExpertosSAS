import type { Course } from '../types';

export const coursesData: Course[] = [
  {
    id: 'dama-bootcamp',
    title: 'Bootcamp Intensivo CDMP® DAMA International',
    level: 'Avanzado',
    duration: '40 Horas (4 Semanas)',
    format: 'En Vivo Online + Simulador DMBOK2',
    category: 'Gobierno de Datos',
    badge: 'Certificación Oficial',
    description: 'Preparación integral para la certificación internacional CDMP® (Certified Data Management Professional) de DAMA International. Cubre los 11 dominios del DAMA-DMBOK2 con simulador de examen real.',
    instructor: {
      name: 'Ing. Carlos Cañón',
      role: 'Presidente DAMA Chapter & Principal Consultant',
      experience: '25+ años de experiencia'
    },
    modulesCount: 11,
    certification: 'CDMP® Certified Data Management Professional',
    upcomingDate: '15 de Agosto, 2026'
  },
  {
    id: 'nexus-architect',
    title: 'GovData Nexus™ Certified Solutions Architect',
    level: 'Especialista',
    duration: '32 Horas (3 Semanas)',
    format: 'Laboratorios Prácticos 100%',
    category: 'Plataforma & IA',
    badge: 'Insignia Digital',
    description: 'Masterclass técnica sobre despliegue, parametrización, linaje automático en grafo 3D y reglas de calidad con IA Generativa sobre GovData Nexus Engine 4.0.',
    instructor: {
      name: 'Dra. María Paula Gómez',
      role: 'Chief Technology Officer (CTO)',
      experience: '18+ años en Arquitectura de Datos'
    },
    modulesCount: 8,
    certification: 'GovData Nexus Enterprise Architect',
    upcomingDate: '01 de Septiembre, 2026'
  },
  {
    id: 'data-stewards',
    title: 'Programa de Certificación de Data Stewards & Quality Leaders',
    level: 'Intermedio',
    duration: '24 Horas (2 Semanas)',
    format: 'Executive Hybrid Workshop',
    category: 'Calidad & Custodia',
    badge: 'Alta Demanda',
    description: 'Capacitación práctica para custodios de negocio y técnicos. Metodologías de perfilamiento de datos, definición de reglas de calidad, matriz RACI y workflows de remediación.',
    instructor: {
      name: 'Dr. Jorge Eliécer Silva',
      role: 'Senior Data Governance Director',
      experience: '20+ años en Sector Financiero'
    },
    modulesCount: 6,
    certification: 'Certified Data Steward Professional (CDSP)',
    upcomingDate: '22 de Septiembre, 2026'
  },
  {
    id: 'genai-llm-governance',
    title: 'GenAI & LLM Governance Master: IA Ética y RAG Auditado',
    level: 'Avanzado',
    duration: '40 Horas (4 Semanas)',
    format: 'Live Online + Hands-On LLMOps Lab',
    category: 'Inteligencia Artificial',
    badge: 'Nuevo 2026',
    description: 'Gobierno de modelos de IA Generativa, prevención de alucinaciones, auditoría de vectores en arquitecturas RAG y custodia de privacidad en LLMs corporativos.',
    instructor: {
      name: 'Dra. Claudia Mendoza',
      role: 'Head of AI Governance & LLMOps',
      experience: '14+ años en Inteligencia Artificial'
    },
    modulesCount: 9,
    certification: 'Certified GenAI & LLM Auditor (CGIA)',
    upcomingDate: '05 de Octubre, 2026'
  },
  {
    id: 'lakehouse-engineer',
    title: 'Data Architecture & Lakehouse Engineer (Databricks, Snowflake & Fabric)',
    level: 'Avanzado',
    duration: '60 Horas (6 Semanas)',
    format: 'Laboratorios Multi-Cloud en Vivo',
    category: 'Arquitectura Cloud',
    badge: 'Multi-Cloud',
    description: 'Diseño e implementación de arquitecturas Medallion (Bronze, Silver, Gold), dbt, Delta Lake, Snowflake, Microsoft Fabric y pipelines de datos de ultra baja latencia.',
    instructor: {
      name: 'Ing. Roberto Silva',
      role: 'Principal Cloud Data Architect',
      experience: '16+ años en Big Data & Cloud'
    },
    modulesCount: 12,
    certification: 'Certified Enterprise Lakehouse Architect (CELA)',
    upcomingDate: '12 de Octubre, 2026'
  },
  {
    id: 'mdm-golden-record',
    title: 'Master Data Management (MDM) & Golden Record Architecture',
    level: 'Intermedio',
    duration: '35 Horas (3.5 Semanas)',
    format: 'Workshop de Caso de Negocio Real',
    category: 'Datos Maestros',
    badge: 'Estratégico',
    description: 'Consolidación de la vista 360° del cliente y producto. Algoritmos de Fuzzy Matching con IA, resolución de entidades maestras y sincronización bidireccional ERP/CRM.',
    instructor: {
      name: 'Dr. Alejandro Restrepo',
      role: 'MDM Practice Lead',
      experience: '19+ años en Gestión de Datos Maestros'
    },
    modulesCount: 7,
    certification: 'Certified MDM Specialist (CMDS)',
    upcomingDate: '26 de Octubre, 2026'
  },
  {
    id: 'cdo-executive-program',
    title: 'Chief Data Officer (CDO) Executive Leadership Program',
    level: 'Ejecutivo',
    duration: '50 Horas (5 Semanas)',
    format: 'Sesiones Ejecutivas + Mentoría 1-a-1',
    category: 'Estrategia Ejecutiva',
    badge: 'Nivel C-Suite',
    description: 'Programa exclusivo para directores y vicepresidentes de tecnología. Monetización de datos, cálculo de ROI de gobierno, presentación a la Junta Directiva y cultura data-driven.',
    instructor: {
      name: 'Dr. Fernando Alarcón',
      role: 'Ex-CDO & Senior Board Advisor',
      experience: '28+ años en Dirección Estratégica'
    },
    modulesCount: 10,
    certification: 'Certified Chief Data Officer (CCDO)',
    upcomingDate: '02 de Noviembre, 2026'
  },
  {
    id: 'data-mesh-ownership',
    title: 'Data Mesh & Data Product Ownership Masterclass',
    level: 'Avanzado',
    duration: '30 Horas (3 Semanas)',
    format: 'Descentralización & Casos Prácticos',
    category: 'Arquitectura & Negocio',
    badge: 'Data Mesh',
    description: 'Descentralización del gobierno de datos mediante dominios autónomos, definición de Data Products, acuerdos SLA de negocio y mercado interno de datos.',
    instructor: {
      name: 'Ing. Sofía Valenzuela',
      role: 'Lead Data Mesh & Domain Consultant',
      experience: '15+ años en Modelado de Dominio'
    },
    modulesCount: 6,
    certification: 'Certified Data Product Owner (CDPO)',
    upcomingDate: '16 de Noviembre, 2026'
  },
  {
    id: 'cybersecurity-gdpr-compliance',
    title: 'Cybersecurity, Data Privacy & GDPR/Habeas Data Compliance',
    level: 'Intermedio',
    duration: '25 Horas (2.5 Semanas)',
    format: 'Legal-Tech & Auditoría Normativa',
    category: 'Seguridad & Legal',
    badge: 'Cumplimiento',
    description: 'Protección de datos personales, enmascaramiento dinámico PII, derecho al olvido, ISO/IEC 27001, Ley 1581 Habeas Data y mitigación de riesgos de fuga de información.',
    instructor: {
      name: 'Abg. Mauricio Vargas',
      role: 'Privacy & Data Protection Specialist',
      experience: '17+ años en Derecho Tecnológico'
    },
    modulesCount: 5,
    certification: 'Certified Data Privacy Officer (CDPO-Legal)',
    upcomingDate: '30 de Noviembre, 2026'
  },
  {
    id: 'tuesday-rls-postgres',
    title: 'Masterclass: Diseño de Políticas RLS Eficientes en PostgreSQL/Supabase',
    level: 'Intermedio',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 04 Ago',
    description: 'Clase técnica práctica sobre cómo asegurar bases de datos a nivel de fila y evitar fugas de información en entornos de producción SaaS.',
    instructor: {
      name: 'Ing. Carlos Cañón',
      role: 'Principal Consultant',
      experience: '25+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 04 de Agosto, 2026',
    priceType: 'free',
    priceValue: 0
  },
  {
    id: 'tuesday-snowflake-dimensional',
    title: 'Masterclass: Modelado Dimensional y Copo de Nieve en Databricks SQL',
    level: 'Avanzado',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 11 Ago',
    description: 'Taller práctico sobre optimización del rendimiento en almacenes de datos tipo Lakehouse y mejores prácticas de diseño de esquemas estrella.',
    instructor: {
      name: 'Dra. María Paula Gómez',
      role: 'Chief Technology Officer (CTO)',
      experience: '18+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 11 de Agosto, 2026',
    priceType: 'paid',
    priceValue: 149000
  },
  {
    id: 'tuesday-metadata-lineage',
    title: 'Masterclass: Gobierno de Metadatos Activo en Grafos 3D',
    level: 'Especialista',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 18 Ago',
    description: 'Cómo implementar linaje de datos de extremo a extremo automatizado y reglas de impacto en modelos de negocio complejos.',
    instructor: {
      name: 'Dr. Jorge Eliécer Silva',
      role: 'Senior Data Governance Director',
      experience: '20+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 18 de Agosto, 2026',
    priceType: 'discount',
    priceValue: 199000,
    discountPriceValue: 79000
  }
];
