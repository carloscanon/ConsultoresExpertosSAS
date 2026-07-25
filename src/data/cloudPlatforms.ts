import type { CloudPlatform } from '../types';

export const cloudPlatforms: CloudPlatform[] = [
  { name: 'Microsoft Azure', category: 'Cloud Infrastructure', badge: 'Certified Partner', icon: 'Cloud', description: 'Integración nativa con Purview, Synapse, Fabric & Azure OpenAI.' },
  { name: 'Amazon Web Services', category: 'Cloud Infrastructure', badge: 'Premier Tier', icon: 'Server', description: 'Conectividad bidireccional con Glue, Redshift, Bedrock & S3.' },
  { name: 'Google Cloud Platform', category: 'Cloud Infrastructure', badge: 'Gold Partner', icon: 'Globe', description: 'Integración directa con BigQuery, Dataplex & Vertex AI.' },
  { name: 'Snowflake', category: 'Data Cloud', badge: 'Elite Partner', icon: 'Snowflake', description: 'Gobierno de metadatos, Tagging & Dynamic Data Masking en Snowflake.' },
  { name: 'Databricks', category: 'Lakehouse & AI', badge: 'Premier Partner', icon: 'Flame', description: 'Sincronización con Unity Catalog, Delta Lake & MLflow.' },
  { name: 'OpenAI Enterprise', category: 'Generative AI', badge: 'Enterprise AI', icon: 'Bot', description: 'Enrutamiento seguro de prompts y gobierno de modelos RAG.' },
  { name: 'Power BI / Fabric', category: 'Analytics & BI', badge: 'Gold BI', icon: 'BarChart', description: 'Incrustación de linaje de datos y semántica en reportes ejecutivos.' },
  { name: 'SAP & Oracle ERP', category: 'Enterprise Applications', badge: 'Certified Connector', icon: 'Database', description: 'Extracción de metadatos y gobierno de datos maestros de negocio.' }
];
