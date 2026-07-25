import { createClient } from '@supabase/supabase-js';
import type { Course } from '../types';
import type { ResourceItem, ContactInfo } from '../context/DataContext';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mrhmfrwzdrmulfqgpmgj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yaG1mcnd6ZHJtdWxmcWdwbWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MzMwNzgsImV4cCI6MjEwMDUwOTA3OH0.11czHevZA0NXb40xfp3PN-8DhIvohTznhaa5D-llPPc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper to wrap any promise in a timeout to prevent frontend hangs
 */
function withTimeout(promise: PromiseLike<any> | Promise<any> | any, timeoutMs = 2500): Promise<any> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<any>((_, reject) => setTimeout(() => reject(new Error('Supabase request timeout')), timeoutMs))
  ]);
}

/**
 * Guardar Solicitud de Demostración (GovData Nexus™ & Consultoría)
 */
export async function saveDemoRequest(data: {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  topicOfInterest?: string;
  preferredSchedule?: string;
  interests?: string[];
  message?: string;
}) {
  try {
    const { data: result, error } = await withTimeout(supabase
      .from('demo_requests')
      .insert([{
        full_name: data.fullName,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        role: data.role || '',
        topic_of_interest: data.topicOfInterest || 'GovData Nexus Platform Demo',
        preferred_schedule: data.preferredSchedule || '',
        interests: data.interests || [],
        message: data.message || '',
        status: 'Nuevo Lead',
        lead_score: 85,
        estimated_value: 25000.00,
        created_at: new Date().toISOString()
      }]));
    
    if (error) console.warn('Supabase save notice (demo_requests):', error.message);
    return { success: !error, result, error };
  } catch (err) {
    console.warn('Supabase demo request save note:', err);
    return { success: false, error: err };
  }
}

/**
 * Eliminar una solicitud de demostración / lead
 */
export async function deleteDemoRequest(id: string) {
  try {
    const { data, error } = await withTimeout(supabase
      .from('demo_requests')
      .delete()
      .eq('id', id));
    if (error) console.warn('Supabase delete notice (demo_requests):', error.message);
    return { success: !error, data, error };
  } catch (err) {
    console.warn('Supabase error deleting demo_request:', err);
    return { success: false, error: err };
  }
}

/**
 * Guardar Preinscripción a Programa (MasterClassNow.online / GovData Academy)
 */
export async function saveCourseEnrollment(data: {
  courseId: string;
  courseTitle: string;
  fullName: string;
  email: string;
  company?: string;
  cohortDate?: string;
  paymentStatus?: string;
  amountPaid?: number;
}) {
  try {
    const { data: result, error } = await withTimeout(supabase
      .from('course_enrollments')
      .insert([{
        course_id: data.courseId,
        course_title: data.courseTitle,
        full_name: data.fullName,
        email: data.email,
        company: data.company || '',
        cohort_date: data.cohortDate || '',
        payment_status: data.paymentStatus || 'Preinscrito',
        amount_paid: data.amountPaid || 0,
        progress_pct: 0,
        created_at: new Date().toISOString()
      }]));

    if (error) console.warn('Supabase save notice (course_enrollments):', error.message);
    return { success: !error, result, error };
  } catch (err) {
    console.warn('Supabase course enrollment save note:', err);
    return { success: false, error: err };
  }
}

/**
 * Eliminar una matrícula / preinscripción
 */
export async function deleteCourseEnrollment(id: string) {
  try {
    const { data, error } = await withTimeout(supabase
      .from('course_enrollments')
      .delete()
      .eq('id', id));
    if (error) console.warn('Supabase delete notice (course_enrollments):', error.message);
    return { success: !error, data, error };
  } catch (err) {
    console.warn('Supabase error deleting course_enrollment:', err);
    return { success: false, error: err };
  }
}

/**
 * Guardar Oportunidad / Negociación en el Pipeline CRM
 */
export async function saveCRMDeal(data: {
  dealTitle: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  dealStage?: string;
  dealValue?: number;
  probabilityPct?: number;
}) {
  try {
    const { data: result, error } = await withTimeout(supabase
      .from('crm_deals')
      .insert([{
        deal_title: data.dealTitle,
        company_name: data.companyName,
        contact_name: data.contactName,
        contact_email: data.contactEmail,
        deal_stage: data.dealStage || 'Diagnóstico DAMA',
        deal_value: data.dealValue || 35000.00,
        probability_pct: data.probabilityPct || 65,
        owner_name: 'Ing. Carlos Cañón',
        created_at: new Date().toISOString()
      }]));

    if (error) console.warn('Supabase save notice (crm_deals):', error.message);
    return { success: !error, result, error };
  } catch (err) {
    console.warn('Supabase crm_deal save note:', err);
    return { success: false, error: err };
  }
}

/**
 * Eliminar oportunidad / deal del CRM
 */
export async function deleteCRMDeal(id: string) {
  try {
    const { data, error } = await withTimeout(supabase
      .from('crm_deals')
      .delete()
      .eq('id', id));
    if (error) console.warn('Supabase delete notice (crm_deals):', error.message);
    return { success: !error, data, error };
  } catch (err) {
    console.warn('Supabase error deleting crm_deal:', err);
    return { success: false, error: err };
  }
}

/**
 * Guardar Mensaje de Contacto y Solicitud de Asesoría Expresa
 */
export async function saveContactMessage(data: {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  priority?: string;
}) {
  try {
    const { data: result, error } = await withTimeout(supabase
      .from('contact_messages')
      .insert([{
        full_name: data.fullName,
        email: data.email,
        phone: data.phone || '',
        subject: data.subject,
        message: data.message,
        priority: data.priority || 'Media',
        status: 'Nuevo',
        created_at: new Date().toISOString()
      }]));

    if (error) console.warn('Supabase save notice (contact_messages):', error.message);
    return { success: !error, result, error };
  } catch (err) {
    console.warn('Supabase contact message save note:', err);
    return { success: false, error: err };
  }
}

/**
 * Registrar Interacciones del Copiloto IA
 */
export async function saveAIChatLog(data: {
  sessionId: string;
  userPrompt: string;
  aiResponse: string;
  topicCategory?: string;
}) {
  try {
    const { data: result, error } = await withTimeout(supabase
      .from('ai_chat_logs')
      .insert([{
        session_id: data.sessionId,
        user_prompt: data.userPrompt,
        ai_response: data.aiResponse,
        topic_category: data.topicCategory || 'Gobierno de Datos',
        created_at: new Date().toISOString()
      }]));

    if (error) console.warn('Supabase save notice (ai_chat_logs):', error.message);
    return { success: !error, result, error };
  } catch (err) {
    console.warn('Supabase ai_chat_log save note:', err);
    return { success: false, error: err };
  }
}

/**
 * Registrar Respuestas del Simulador Journey CDO (Reto DAMA International)
 */
export async function saveCDOChallengeResponse(data: {
  sessionId?: string;
  questionId?: string;
  selectedOption: string;
  isCorrect: boolean;
  score?: number;
  scoreGained?: number;
}) {
  try {
    const { data: result, error } = await withTimeout(supabase
      .from('cdo_challenge_responses')
      .insert([{
        session_id: data.sessionId || 'anonymous',
        question_id: data.questionId || 'q1',
        selected_option: data.selectedOption,
        is_correct: data.isCorrect,
        score: data.scoreGained ?? data.score ?? 0,
        created_at: new Date().toISOString()
      }]));

    if (error) console.warn('Supabase save notice (cdo_challenge_responses):', error.message);
    return { success: !error, result, error };
  } catch (err) {
    console.warn('Supabase cdo_challenge save note:', err);
    return { success: false, error: err };
  }
}

/**
 * Registrar auditoría en el sistema
 */
export async function saveSuperAdminAuditLog(data: {
  actionType: string;
  confirmationCode: string;
  affectedRecords: number;
}) {
  try {
    const { data: result, error } = await withTimeout(supabase
      .from('super_admin_audit_logs')
      .insert([{
        admin_user: 'Super Admin (NIT 900452089-9)',
        action_type: data.actionType,
        confirmation_code: data.confirmationCode,
        affected_records: data.affectedRecords,
        status: 'Exitoso',
        created_at: new Date().toISOString()
      }]));

    if (error) console.warn('Supabase save notice (super_admin_audit_logs):', error.message);
    return { success: !error, result, error };
  } catch (err) {
    console.warn('Supabase super_admin_audit_log save note:', err);
    return { success: false, error: err };
  }
}

/**
 * Obtener todas las oportunidades / deals del CRM
 */
export async function getCRMDeals() {
  try {
    const { data, error } = await withTimeout(supabase
      .from('crm_deals')
      .select('*')
      .order('created_at', { ascending: false }));
    
    if (error) console.warn('Supabase fetch notice (crm_deals):', error.message);
    return data || [];
  } catch (err) {
    console.warn('Supabase error fetching crm_deals:', err);
    return [];
  }
}

/**
 * Actualizar la etapa de una oportunidad en el CRM
 */
export async function updateCRMDealStage(dealId: string, stage: string) {
  try {
    const { data, error } = await withTimeout(supabase
      .from('crm_deals')
      .update({ deal_stage: stage })
      .eq('id', dealId)
      .select());
    
    if (error) console.warn('Supabase update notice (crm_deals):', error.message);
    return { success: !error, data, error };
  } catch (err) {
    console.warn('Supabase error updating crm_deal:', err);
    return { success: false, error: err };
  }
}

/**
 * Obtener todos los leads / solicitudes de demo
 */
export async function getDemoRequests() {
  try {
    const { data, error } = await withTimeout(supabase
      .from('demo_requests')
      .select('*')
      .order('created_at', { ascending: false }));
    
    if (error) console.warn('Supabase fetch notice (demo_requests):', error.message);
    return data || [];
  } catch (err) {
    console.warn('Supabase error fetching demo_requests:', err);
    return [];
  }
}

/**
 * Obtener todas las matrículas / inscripciones a cursos
 */
export async function getCourseEnrollments() {
  try {
    const { data, error } = await withTimeout(supabase
      .from('course_enrollments')
      .select('*')
      .order('created_at', { ascending: false }));
    
    if (error) console.warn('Supabase fetch notice (course_enrollments):', error.message);
    return data || [];
  } catch (err) {
    console.warn('Supabase error fetching course_enrollments:', err);
    return [];
  }
}

/**
 * Obtener todos los mensajes de contacto
 */
export async function getContactMessages() {
  try {
    const { data, error } = await withTimeout(supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false }));
    
    if (error) console.warn('Supabase fetch notice (contact_messages):', error.message);
    return data || [];
  } catch (err) {
    console.warn('Supabase error fetching contact_messages:', err);
    return [];
  }
}

/**
 * Obtener logs de chat de IA
 */
export async function getAIChatLogs() {
  try {
    const { data, error } = await withTimeout(supabase
      .from('ai_chat_logs')
      .select('*')
      .order('created_at', { ascending: false }));
    
    if (error) console.warn('Supabase fetch notice (ai_chat_logs):', error.message);
    return data || [];
  } catch (err) {
    console.warn('Supabase error fetching ai_chat_logs:', err);
    return [];
  }
}

/**
 * Obtener logs de auditoría de Super Admin
 */
export async function getSuperAdminAuditLogs() {
  try {
    const { data, error } = await withTimeout(supabase
      .from('super_admin_audit_logs')
      .select('*')
      .order('created_at', { ascending: false }));
    
    if (error) console.warn('Supabase fetch notice (super_admin_audit_logs):', error.message);
    return data || [];
  } catch (err) {
    console.warn('Supabase error fetching super_admin_audit_logs:', err);
    return [];
  }
}

/**
 * Obtener logs de Journey CDO Challenge Responses
 */
export async function getCDOChallengeResponses() {
  try {
    const { data, error } = await withTimeout(supabase
      .from('cdo_challenge_responses')
      .select('*')
      .order('created_at', { ascending: false }));
    
    if (error) console.warn('Supabase fetch notice (cdo_challenge_responses):', error.message);
    return data || [];
  } catch (err) {
    console.warn('Supabase error fetching cdo_challenge_responses:', err);
    return [];
  }
}


/* ==============================================================================
 * DYNAMIC DATABASE CRUD OPERATIONS FOR LMS COURSES & MEDIA RESOURCES
 * ============================================================================== */

/**
 * Obtener catálogo de cursos de la Base de Datos
 */
export async function getCoursesCatalogFromDb(): Promise<Course[]> {
  try {
    const { data, error } = await withTimeout(supabase
      .from('courses_catalog')
      .select('*')
      .eq('is_active', true));

    if (error) {
      console.warn('Supabase fetch notice (courses_catalog):', error.message);
      return [];
    }

    if (!data || data.length === 0) return [];

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      level: item.level,
      duration: item.duration,
      format: item.format,
      category: item.category,
      badge: item.badge || '',
      description: item.description,
      instructor: {
        name: item.instructor_name,
        role: item.instructor_role,
        experience: item.instructor_experience || ''
      },
      modulesCount: item.modules_count || 1,
      certification: item.certification,
      upcomingDate: item.upcoming_date
    }));
  } catch (err) {
    console.warn('Supabase error getting courses catalog:', err);
    return [];
  }
}

/**
 * Guardar / Upsert curso en la Base de Datos
 */
export async function saveCourseInDb(course: Course) {
  try {
    const { data, error } = await withTimeout(supabase
      .from('courses_catalog')
      .upsert({
        id: course.id,
        title: course.title,
        level: course.level,
        duration: course.duration,
        format: course.format,
        category: course.category,
        badge: course.badge || '',
        description: course.description,
        instructor_name: course.instructor.name,
        instructor_role: course.instructor.role,
        instructor_experience: course.instructor.experience || '',
        modules_count: course.modulesCount,
        certification: course.certification,
        upcoming_date: course.upcomingDate,
        is_active: true,
        created_at: new Date().toISOString()
      }));

    if (error) console.warn('Supabase save error (courses_catalog):', error.message);
    return { success: !error, data, error };
  } catch (err) {
    console.warn('Supabase exception saving course:', err);
    return { success: false, error: err };
  }
}

/**
 * Desactivar / Eliminar curso de la Base de Datos
 */
export async function deleteCourseFromDb(id: string) {
  try {
    const { data, error } = await withTimeout(supabase
      .from('courses_catalog')
      .delete()
      .eq('id', id));

    if (error) console.warn('Supabase delete error (courses_catalog):', error.message);
    return { success: !error, data, error };
  } catch (err) {
    console.warn('Supabase exception deleting course:', err);
    return { success: false, error: err };
  }
}

/**
 * Obtener todos los Recursos del CMS (podcasts, videos, artículos) de la Base de Datos
 */
export async function getBlogResourcesFromDb(): Promise<ResourceItem[]> {
  try {
    const { data, error } = await withTimeout(supabase
      .from('blog_resources')
      .select('*')
      .eq('is_published', true));

    if (error) {
      console.warn('Supabase fetch notice (blog_resources):', error.message);
      return [];
    }

    if (!data || data.length === 0) return [];

    // Filter out the configuration config row
    const filtered = data.filter((item: any) => item.id !== 'site_seo_settings');

    return filtered.map((item: any) => ({
      id: item.id,
      title: item.title,
      type: item.category as any, // category column maps to resource type
      description: item.ai_summary || '',
      durationOrSize: item.read_time || '',
      redirectUrl: item.summary || '' // summary column stores the redirection url
    }));
  } catch (err) {
    console.warn('Supabase error getting blog resources:', err);
    return [];
  }
}

/**
 * Guardar / Upsert recurso CMS en la Base de Datos
 */
export async function saveBlogResourceInDb(res: ResourceItem) {
  try {
    const { data, error } = await withTimeout(supabase
      .from('blog_resources')
      .upsert({
        id: res.id,
        title: res.title,
        category: res.type,
        read_time: res.durationOrSize,
        summary: res.redirectUrl || '', // Store redirect link in summary
        ai_summary: res.description, // Store description in ai_summary
        author: 'Super Admin',
        author_role: 'Consultor Senior',
        date: new Date().toLocaleDateString('es-ES'),
        is_published: true,
        created_at: new Date().toISOString()
      }));

    if (error) console.warn('Supabase save error (blog_resources):', error.message);
    return { success: !error, data, error };
  } catch (err) {
    console.warn('Supabase exception saving blog resource:', err);
    return { success: false, error: err };
  }
}

/**
 * Eliminar recurso CMS de la Base de Datos
 */
export async function deleteBlogResourceFromDb(id: string) {
  try {
    const { data, error } = await withTimeout(supabase
      .from('blog_resources')
      .delete()
      .eq('id', id));

    if (error) console.warn('Supabase delete error (blog_resources):', error.message);
    return { success: !error, data, error };
  } catch (err) {
    console.warn('Supabase exception deleting blog resource:', err);
    return { success: false, error: err };
  }
}

/**
 * Guardar Parámetros de Contacto, SEO y Logo de Marca en la Base de Datos (en fila especial)
 */
export async function saveSiteConfigurationInDb(contact: ContactInfo, logoUrl: string, logoSize: number) {
  try {
    const { data, error } = await withTimeout(supabase
      .from('blog_resources')
      .upsert({
        id: 'site_seo_settings',
        title: 'Configuración DXP Centralizada',
        category: 'site_config',
        read_time: String(logoSize), // Store logoSize as read_time string
        summary: JSON.stringify(contact), // Store contact info object as JSON in summary
        ai_summary: logoUrl || '', // Store logoUrl string in ai_summary
        author: 'Super Admin',
        author_role: 'System settings',
        date: new Date().toLocaleDateString('es-ES'),
        is_published: true,
        created_at: new Date().toISOString()
      }));

    if (error) console.warn('Supabase save error (site_config):', error.message);
    return { success: !error, data, error };
  } catch (err) {
    console.warn('Supabase exception saving site configurations:', err);
    return { success: false, error: err };
  }
}

/**
 * Obtener Parámetros de Contacto, SEO y Logo de Marca de la Base de Datos
 */
export async function getSiteConfigurationFromDb() {
  try {
    const { data, error } = await withTimeout(supabase
      .from('blog_resources')
      .select('*')
      .eq('id', 'site_seo_settings')
      .single());

    if (error || !data) {
      return null;
    }

    const contact = JSON.parse(data.summary) as ContactInfo;
    const logoUrl = data.ai_summary || '';
    const logoSize = Number(data.read_time) || 180;

    return { contact, logoUrl, logoSize };
  } catch (err) {
    console.warn('Supabase exception reading site configurations:', err);
    return null;
  }
}
