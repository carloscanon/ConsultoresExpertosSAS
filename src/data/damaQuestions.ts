import type { DAMADomainQuestion } from '../types';

export const damaQuestions: DAMADomainQuestion[] = [
  {
    id: 1,
    domain: 'Gobierno de Datos & Estrategia',
    domainShort: 'Gobierno',
    question: '¿Cómo está estructurado actualmente el Gobierno de Datos en su organización?',
    options: [
      { level: 1, title: 'Inicial / Ad-Hoc', description: 'No existen roles ni políticas formalizadas. Las iniciativas se realizan de forma aislada.' },
      { level: 2, title: 'Repetible', description: 'Existen definiciones básicas de roles y algunas políticas en documentos estáticos.' },
      { level: 3, title: 'Definido', description: 'Comité de Gobierno activo, Data Stewards asignados y políticas aprobadas por la gerencia.' },
      { level: 4, title: 'Gestionado', description: 'Métricas de gobierno automatizadas en tiempo real con plataforma centralizada.' },
      { level: 5, title: 'Optimizado', description: 'Gobierno continuo adaptativo con IA, self-healing data governance e innovación constante.' }
    ]
  },
  {
    id: 2,
    domain: 'Calidad de Datos & Anomaly Detection',
    domainShort: 'Calidad',
    question: '¿De qué manera evalúan y corrigen la calidad de los datos operativos y analíticos?',
    options: [
      { level: 1, title: 'Reactivo', description: 'Los errores se detectan cuando los usuarios de negocio o clientes se quejan de reportes malos.' },
      { level: 2, title: 'Manual', description: 'Se ejecutan scripts SQL manuales de forma esporádica antes de cierres de mes.' },
      { level: 3, title: 'Sistematizado', description: 'Reglas de validación en pipelines clave con alertas por correo electrónico.' },
      { level: 4, title: 'Automatizado', description: 'Profiling continuo con alertas en tiempo real y dashboards de calidad de datos.' },
      { level: 5, title: 'AI-Observed', description: 'Detección proactiva de anomalías impulsada por IA con autocorrección en vuelo.' }
    ]
  },
  {
    id: 3,
    domain: 'Gestión de Metadatos & Linaje',
    domainShort: 'Metadatos',
    question: '¿Qué grado de visibilidad tienen sobre el origen, transformaciones y linaje de sus datos?',
    options: [
      { level: 1, title: 'Nulo', description: 'Se desconoce el origen exacto de las métricas; el conocimiento reside en la cabeza de las personas.' },
      { level: 2, title: 'Documentación en Excel', description: 'Glosarios y diagramas manuales que se desactualizan rápidamente.' },
      { level: 3, title: 'Catálogo Central', description: 'Catálogo de datos en uso pero con actualización semimanual.' },
      { level: 4, title: 'Linaje Automático', description: 'Linaje dinámico a nivel de columna que se extrae automáticamente del código SQL/ETL.' },
      { level: 5, title: 'Active Metadata Mesh', description: 'Metadatos activos consumidos por IA y herramientas para autorregular la arquitectura.' }
    ]
  },
  {
    id: 4,
    domain: 'Arquitectura Empresarial & Cloud',
    domainShort: 'Arquitectura',
    question: '¿Cómo califica la modernidad y escalabilidad de su infraestructura de almacenamiento y procesamiento?',
    options: [
      { level: 1, title: 'Legacy On-Premise', description: 'Bases de datos relacionales saturadas con silos de información no integrados.' },
      { level: 2, title: 'Híbrido Básico', description: 'Primeras migraciones a cloud pero sin una arquitectura unificada.' },
      { level: 3, title: 'Modern Data Warehouse', description: 'Data Lakehouse centralizado en cloud (Snowflake / Databricks / Azure / AWS).' },
      { level: 4, title: 'Data Fabric / Mesh', description: 'Dominio de datos descentralizado con productos de datos gobernados e ingesta streaming.' },
      { level: 5, title: 'Autonomous Data Stack', description: 'Arquitectura autoescalable hiper-optimizada impulsada por IA y vector databases.' }
    ]
  },
  {
    id: 5,
    domain: 'Seguridad, Privacidad & Gobierno de IA',
    domainShort: 'Seguridad & IA',
    question: '¿Cómo garantizan la protección de datos sensibles y el cumplimiento de privacidad/IA?',
    options: [
      { level: 1, title: 'Básico', description: 'Permisos estándar a nivel de base de datos sin enmascaramiento dinámico.' },
      { level: 2, title: 'Políticas Estáticas', description: 'Documentos de privacidad firmados pero control de accesos manual.' },
      { level: 3, title: 'RBAC / ABAC Formal', description: 'Controles de acceso basados en roles y enmascaramiento en ambientes de desarrollo.' },
      { level: 4, title: 'Dynamic Protection', description: 'Enmascaramiento dinámico en producción con auditoría completa de consultas y PII.' },
      { level: 5, title: 'Zero Trust AI Governance', description: 'Gobierno de modelos de IA, observabilidad de LLMs y enmascaramiento inteligente global.' }
    ]
  }
];
