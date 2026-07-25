import type { CaseStudy } from '../types';

export const caseStudiesData: CaseStudy[] = [
  {
    id: 'positiva-seguros',
    client: 'POSITIVA Compañía de Seguros',
    industry: 'Seguros & Protección Social',
    logo: 'Landmark',
    challenge: 'Integración de datos masivos dispersos, asegurando gobernabilidad y confiabilidad en reportes financieros y regulatorios.',
    solution: 'Despliegue de GovData Nexus para automatizar reglas de calidad, catálogo de metadatos y linaje de datos.',
    kpis: [
      { label: 'Mejora en Calidad de Datos', value: '90%', change: 'Incremento directo' },
      { label: 'Tiempo en Reportes', value: '-75%', change: 'Optimización' },
      { label: 'Confianza de Información', value: '99.9%', change: 'Auditado' }
    ],
    quote: 'Consultores Expertos SAS transformó nuestra gestión de datos. Hoy tomamos decisiones basadas en información confiable y oportuna.',
    author: 'María Claudia García',
    role: 'Directora de Transformación, Positiva Compañía de Seguros',
    year: '2025 - 2026'
  },
  {
    id: 'idrd-bogota',
    client: 'IDRD - Instituto Distrital de Recreación y Deporte',
    industry: 'Sector Público & Gobierno',
    logo: 'Landmark',
    challenge: 'Dispersión de información institucional y necesidad de tableros de control ejecutivos centralizados.',
    solution: 'Implementación de marco de Gobierno DAMA-DMBOK2, arquitectura analítica y automatización con GovData Nexus.',
    kpis: [
      { label: 'Reducción en Tiempos de Reportes', value: '75%', change: 'Aceleración' },
      { label: 'Tableros Unificados', value: '100%', change: 'Visibilidad total' },
      { label: 'Cumplimiento MINTIC', value: '100%', change: 'Normativo' }
    ],
    quote: 'Logramos centralizar nuestra analítica con estándares internacionales. La asesoría de Consultores Expertos fue determinante.',
    author: 'Ing. Fernando Alarcón',
    role: 'Director de Sistemas & Información',
    year: '2025'
  },
  {
    id: 'foncep-bogota',
    client: 'FONCEP - Fondo de Prestaciones Económicas',
    industry: 'Servicios Financieros Pensionales',
    logo: 'Landmark',
    challenge: 'Garantizar la calidad y seguridad de datos pensionales e históricos de miles de beneficiarios.',
    solution: 'Despliegue de GovData Nexus Security & MDM para consolidación de registro único de verdad.',
    kpis: [
      { label: 'Eficiencia Operacional Alcanzada', value: '60%', change: 'Ahorro' },
      { label: 'Precisión en Datos Pensionales', value: '99.8%', change: 'Golden Record' },
      { label: 'Auditoría Cumplida', value: '100%', change: 'Cero hallazgos' }
    ],
    quote: 'La rigurosidad metodológica de Consultores Expertos garantizó una transición transparente y segura en nuestra gestión de datos.',
    author: 'Dra. Patricia Restrepo',
    role: 'Subdirectora de Tecnología',
    year: '2024 - 2026'
  }
];
