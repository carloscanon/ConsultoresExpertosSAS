-- ==============================================================================
-- CONSULTORRES EXPERTOS SAS • ENTERPRISE DXP & OPERATIONS CENTER
-- SUPABASE POSTGRESQL COMPLETE DDL SCHEMA
-- NIT: 900452089-9 | GOVDATANEXUS.COM | MASTERCLASSNOW.ONLINE
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. TABLA: SOLICITUDES DE DEMO Y LEADS (CRM PIPELINE)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.demo_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100),
    company VARCHAR(255) NOT NULL,
    role VARCHAR(150),
    topic_of_interest VARCHAR(255) DEFAULT 'GovData Nexus Platform Demo',
    preferred_schedule VARCHAR(100),
    interests TEXT[],
    message TEXT,
    status VARCHAR(50) DEFAULT 'Nuevo Lead', -- Nuevo Lead, Contactado, Diagnóstico, Cotización, Ganado, Perdido
    lead_score INT DEFAULT 50,
    estimated_value NUMERIC(12,2) DEFAULT 15000.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. TABLA: MATRÍCULAS Y ALUMNOS (MasterClassNow.online LMS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.course_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id VARCHAR(100) NOT NULL,
    course_title VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    payment_status VARCHAR(50) DEFAULT 'Preinscrito', -- Preinscrito, Confirmado, En Cursado, Certificado
    cohort_date VARCHAR(100),
    amount_paid NUMERIC(10,2) DEFAULT 0.00,
    progress_pct INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. TABLA: CRM PIPELINE & NEGOCIACIONES CORPORATIVAS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.crm_deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    deal_stage VARCHAR(100) NOT NULL DEFAULT 'Diagnóstico DAMA', -- Nuevo Lead, Contactado, Diagnóstico DAMA, Oferta Formal, Negociación, Cierre Ganado
    deal_value NUMERIC(12,2) NOT NULL DEFAULT 25000.00,
    probability_pct INT DEFAULT 60,
    owner_name VARCHAR(255) DEFAULT 'Ing. Carlos Cañón',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. TABLA: MENSAJES Y TICKETS DE SOPORTE CENTRALIZADOS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority VARCHAR(50) DEFAULT 'Media', -- Alta, Media, Baja
    assigned_to VARCHAR(255) DEFAULT 'Soporte Consultores Expertos',
    status VARCHAR(50) DEFAULT 'Nuevo', -- Nuevo, En Proceso, Resuelto, Archivado
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. TABLA: HISTORIAL DE CHAT IA & COPILOTE GOVDATA
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_chat_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255) NOT NULL,
    user_prompt TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    topic_category VARCHAR(100) DEFAULT 'Gobierno de Datos',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. TABLA: REGISTRO DE AUDITORÍA Y SEGURIDAD DXP
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.super_admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user VARCHAR(255) DEFAULT 'Super Admin (NIT 900452089-9)',
    action_type VARCHAR(100) NOT NULL,
    confirmation_code VARCHAR(100),
    affected_records INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Exitoso',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. TABLA: CATÁLOGO DE CURSOS LMS (MasterClassNow.online)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.courses_catalog (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    level VARCHAR(100) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    format VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    badge VARCHAR(100),
    description TEXT NOT NULL,
    instructor_name VARCHAR(255) NOT NULL,
    instructor_role VARCHAR(255) NOT NULL,
    instructor_experience VARCHAR(255),
    modules_count INT DEFAULT 1,
    certification VARCHAR(255) NOT NULL,
    upcoming_date VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. TABLA: WHITEPAPERS, RECURSOS Y BLOG TÉCNICO
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_resources (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    read_time VARCHAR(50) NOT NULL,
    summary TEXT NOT NULL,
    ai_summary TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    author_role VARCHAR(255) NOT NULL,
    tags TEXT[],
    date VARCHAR(100) NOT NULL,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- POLÍTICAS RLS (Row Level Security)
-- ------------------------------------------------------------------------------
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.super_admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Inserción pública de demo_requests" ON public.demo_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Inserción pública de course_enrollments" ON public.course_enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Inserción pública de crm_deals" ON public.crm_deals FOR INSERT WITH CHECK (true);
CREATE POLICY "Inserción pública de contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Inserción pública de ai_chat_logs" ON public.ai_chat_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Inserción pública de super_admin_audit_logs" ON public.super_admin_audit_logs FOR INSERT WITH CHECK (true);

CREATE POLICY "Lectura pública de courses_catalog" ON public.courses_catalog FOR SELECT USING (true);
CREATE POLICY "Lectura pública de blog_resources" ON public.blog_resources FOR SELECT USING (true);
