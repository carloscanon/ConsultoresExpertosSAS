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
      experience: '25+ años liderando proyectos de gobernanza en Latinoamérica'
    },
    modulesCount: 5,
    certification: 'Acreditación Oficial CDMP DAMA',
    upcomingDate: '15 de Agosto, 2026',
    priceType: 'paid',
    priceValue: 1500000
  },
  {
    id: 'ia-gen-corporate',
    title: 'Diplomado: Inteligencia Artificial Generativa y Gobierno Corporativo de IA',
    level: 'Avanzado',
    duration: '60 Horas (6 Semanas)',
    format: 'Clases en Vivo via Teams + Labs',
    category: 'Inteligencia Artificial',
    badge: 'Tendencia 2026',
    description: 'Aprenda a diseñar e implementar arquitecturas corporativas con modelos LLM y RAG, estableciendo lineamientos éticos, control de costos, seguridad e ingeniería de prompts.',
    instructor: {
      name: 'Dra. María Paula Gómez',
      role: 'Head of AI Research & Ethics Board Member',
      experience: 'Ph.D. en Ciencias de la Computación, investigadora senior'
    },
    modulesCount: 6,
    certification: 'Certificado de Especialización IA Generativa',
    upcomingDate: '24 de Agosto, 2026',
    priceType: 'paid',
    priceValue: 1800000
  },
  {
    id: 'enterprise-arch-togaf',
    title: 'Arquitectura Empresarial en la Práctica con TOGAF® 10',
    level: 'Avanzado',
    duration: '32 Horas (3 Semanas)',
    format: 'Online en Vivo + Material de Examen',
    category: 'Arquitectura de Datos',
    badge: 'Más Vendido',
    description: 'Domine el framework TOGAF® 10 Standard. Aprenda el ADM (Architecture Development Method) para alinear las estrategias de negocio y tecnología de su empresa.',
    instructor: {
      name: 'Dr. Jorge Eliécer Silva',
      role: 'Enterprise Architect Advisor & TOGAF Trainer',
      experience: '20+ años estructurando arquitecturas TI empresariales'
    },
    modulesCount: 4,
    certification: 'Simulación TOGAF® Enterprise',
    upcomingDate: '07 de Septiembre, 2026',
    priceType: 'paid',
    priceValue: 1200000
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
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
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
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
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
    priceValue: 150000,
    discountPriceValue: 99000
  },
  {
    id: 'tuesday-data-quality',
    title: 'Masterclass: Calidad de Datos Práctica y Reglas de Negocio en Producción',
    level: 'Intermedio',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 25 Ago',
    description: 'Definición, medición y remediación de incidentes de calidad de datos usando tableros automatizados en producción.',
    instructor: {
      name: 'Ing. Carlos Cañón',
      role: 'Principal Consultant',
      experience: '25+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 25 de Agosto, 2026',
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
  },
  {
    id: 'tuesday-ai-governance',
    title: 'Masterclass: Gobierno de Datos y Seguridad para IA Generativa (LLMs)',
    level: 'Avanzado',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 01 Sep',
    description: 'Control de privacidad de datos sensibles, trazabilidad y gobernanza de la información corporativa alimentada en modelos LLM y RAG.',
    instructor: {
      name: 'Dra. María Paula Gómez',
      role: 'Chief Technology Officer (CTO)',
      experience: '18+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 01 de Septiembre, 2026',
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
  },
  {
    id: 'tuesday-catalog-classification',
    title: 'Masterclass: Catálogo de Datos y Clasificación Automática de Activos',
    level: 'Intermedio',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 08 Sep',
    description: 'Cómo implementar catálogos que auto-descubran metadatos y etiqueten información personal/sensible de forma ágil.',
    instructor: {
      name: 'Ing. Carlos Cañón',
      role: 'Principal Consultant',
      experience: '25+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 08 de Septiembre, 2026',
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
  },
  {
    id: 'tuesday-maturity-models',
    title: 'Masterclass: Modelos de Madurez de Gobierno de Datos (DAMA DMBOK2)',
    level: 'Avanzado',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 15 Sep',
    description: 'Evaluación práctica del estado de la gobernanza de datos en su organización utilizando las directrices y estándares del DMBOK2.',
    instructor: {
      name: 'Dr. Jorge Eliécer Silva',
      role: 'Senior Data Governance Director',
      experience: '20+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 15 de Septiembre, 2026',
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
  },
  {
    id: 'tuesday-privacy-1581',
    title: 'Masterclass: Privacidad de Datos y Cumplimiento de la Ley 1581',
    level: 'Intermedio',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 22 Sep',
    description: 'Mejores prácticas técnicas y legales para cumplir la regulación de protección de datos personales de la SIC en Colombia.',
    instructor: {
      name: 'Ing. Carlos Cañón',
      role: 'Principal Consultant',
      experience: '25+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 22 de Septiembre, 2026',
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
  },
  {
    id: 'tuesday-pipeline-architecture',
    title: 'Masterclass: Arquitectura de Pipelines de Datos Seguros y Auditables',
    level: 'Avanzado',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 29 Sep',
    description: 'Diseño de flujos de datos auditables con trazabilidad robusta, control de accesos e integración de linaje automatizado.',
    instructor: {
      name: 'Dra. María Paula Gómez',
      role: 'Chief Technology Officer (CTO)',
      experience: '18+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 29 de Septiembre, 2026',
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
  },
  {
    id: 'tuesday-cloud-metadata',
    title: 'Masterclass: Estrategia de Metadatos y Linaje de Datos en la Nube',
    level: 'Especialista',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 06 Oct',
    description: 'Construcción y análisis de diagramas de linaje de datos dinámicos en plataformas multinube (Azure, AWS y GCP).',
    instructor: {
      name: 'Dr. Jorge Eliécer Silva',
      role: 'Senior Data Governance Director',
      experience: '20+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 06 de Octubre, 2026',
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
  },
  {
    id: 'tuesday-stewards-owners',
    title: 'Masterclass: Roles y Responsabilidades de Data Stewards y Owners',
    level: 'Intermedio',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 13 Oct',
    description: 'Cómo conformar y empoderar la oficina de gobierno de datos mediante roles operativos definidos y funcionales.',
    instructor: {
      name: 'Ing. Carlos Cañón',
      role: 'Principal Consultant',
      experience: '25+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 13 de Octubre, 2026',
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
  },
  {
    id: 'tuesday-kpi-board',
    title: 'Masterclass: Indicadores Clave de Gobierno de Datos para la Junta',
    level: 'Ejecutivo',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 20 Oct',
    description: 'Métricas de valor comercial, riesgos mitigados e incremento de eficiencia para presentar a comités ejecutivos y juntas directivas.',
    instructor: {
      name: 'Dr. Jorge Eliécer Silva',
      role: 'Senior Data Governance Director',
      experience: '20+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 20 de Octubre, 2026',
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
  },
  {
    id: 'tuesday-security-rbac',
    title: 'Masterclass: Seguridad de Datos Basada en Roles (RBAC) y Encriptación',
    level: 'Avanzado',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 27 Oct',
    description: 'Cómo implementar encriptación de datos en reposo y tránsito combinada con políticas dinámicas de control de acceso.',
    instructor: {
      name: 'Dra. María Paula Gómez',
      role: 'Chief Technology Officer (CTO)',
      experience: '18+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 27 de Octubre, 2026',
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
  },
  {
    id: 'tuesday-integration-git',
    title: 'Masterclass: Integración de Datos con Gobierno y Control de Versiones',
    level: 'Intermedio',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 03 Nov',
    description: 'Mejores prácticas para versionar flujos de integración y catalogar transformaciones de datos usando git.',
    instructor: {
      name: 'Ing. Carlos Cañón',
      role: 'Principal Consultant',
      experience: '25+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 03 de Noviembre, 2026',
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
  },
  {
    id: 'tuesday-mesh-lakehouse',
    title: 'Masterclass: Arquitectura de Datos Modernos (Data Lakehouse vs Mesh)',
    level: 'Avanzado',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 10 Nov',
    description: 'Comparativa de paradigmas modernos de almacenamiento descentralizado y gobernabilidad nativa del dato.',
    instructor: {
      name: 'Dra. María Paula Gómez',
      role: 'Chief Technology Officer (CTO)',
      experience: '18+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 10 de Noviembre, 2026',
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
  },
  {
    id: 'tuesday-pipeline-observability',
    title: 'Masterclass: Monitoreo de pipelines de datos y observabilidad en vivo',
    level: 'Avanzado',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 17 Nov',
    description: 'Cómo prevenir caídas silenciosas en los pipelines de producción mediante alertas tempranas y perfiles de calidad dinámica.',
    instructor: {
      name: 'Dra. María Paula Gómez',
      role: 'Chief Technology Officer (CTO)',
      experience: '18+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 17 de Noviembre, 2026',
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
  },
  {
    id: 'tuesday-retention-history',
    title: 'Masterclass: Automatización de Políticas de Retención e Históricos',
    level: 'Intermedio',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 24 Nov',
    description: 'Estrategias técnicas para el archivado seguro, depuración regulada e históricos eficientes de bases de datos.',
    instructor: {
      name: 'Ing. Carlos Cañón',
      role: 'Principal Consultant',
      experience: '25+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 24 de Noviembre, 2026',
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
  },
  {
    id: 'tuesday-trends-2027',
    title: 'Masterclass: Cierre de Año - Tendencias de Gobierno de Datos 2027',
    level: 'Ejecutivo',
    duration: '2 Horas (Sesión Única)',
    format: 'Online en Vivo via Zoom',
    category: 'Martes de Masterclass',
    badge: 'Martes 01 Dic',
    description: 'Visión de futuro sobre los nuevos retos de gobernabilidad, regulación mundial e integración nativa de IA en las organizaciones.',
    instructor: {
      name: 'Ing. Carlos Cañón',
      role: 'Principal Consultant',
      experience: '25+ años de experiencia'
    },
    modulesCount: 1,
    certification: 'Asistencia Oficial Certificada',
    upcomingDate: 'Martes 01 de Diciembre, 2026',
    priceType: 'discount',
    priceValue: 150000,
    discountPriceValue: 99000
  }
];
