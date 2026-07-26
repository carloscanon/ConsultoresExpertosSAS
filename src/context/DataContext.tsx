import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { coursesData as initialCourses } from '../data/coursesData';
import { useTheme } from './ThemeContext';
import { 
  getCRMDeals, 
  getDemoRequests, 
  getCourseEnrollments,
  saveCRMDeal, 
  saveCourseEnrollment, 
  saveDemoRequest,
  deleteCRMDeal, 
  deleteCourseEnrollment, 
  deleteDemoRequest,
  updateCRMDealStage,
  getCoursesCatalogFromDb,
  saveCourseInDb,
  deleteCourseFromDb,
  getBlogResourcesFromDb,
  saveBlogResourceInDb,
  deleteBlogResourceFromDb,
  getSiteConfigurationFromDb,
  saveSiteConfigurationInDb,
  saveSiteLayoutInDb,
  getSiteLayoutFromDb
} from '../lib/supabase';
import type { Course } from '../types';

export interface ContactInfo {
  companyName: string;
  companyNit: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  metaDescription: string;
  metaKeywords: string;
  initialScrollSection: string;
  earlyBirdDays: number;
  earlyBirdRegularPrice: number;
  earlyBirdDiscount: number;
  masterclassPageSize: number;
  coursePageSize: number;
  heroMarginTop?: number;
  heroHeight?: number;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: 'video' | 'podcast' | 'template' | 'whitepaper';
  description: string;
  durationOrSize: string;
  redirectUrl: string; // Redirection link
  imageUrl?: string; // Custom cover image URL (recommended: 1280x720 px)
  featured?: boolean; // Show in hero carousel banner
}

export function parseSpanishDate(dateStr: string): Date | null {
  try {
    if (!dateStr) return null;
    const clean = dateStr.toLowerCase().replace(/de\s+/g, '').replace(/,/g, '');
    const tokens = clean.split(/\s+/); 
    if (tokens.length < 4) {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? null : d;
    }
    const day = parseInt(tokens[1]);
    const year = parseInt(tokens[3]);
    const monthName = tokens[2];
    
    const months: Record<string, number> = {
      enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
      julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
    };
    
    const month = months[monthName];
    if (isNaN(day) || isNaN(year) || month === undefined) {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? null : d;
    }
    return new Date(year, month, day);
  } catch (e) {
    return null;
  }
}

export function calculateMasterclassPrice(course: Course, config: ContactInfo) {
  if (course.category !== 'Martes de Masterclass') {
    return {
      priceType: course.priceType || 'free',
      priceValue: course.priceValue || 0,
      discountPriceValue: course.discountPriceValue || 0
    };
  }

  if (course.priceType === 'free') {
    return {
      priceType: 'free',
      priceValue: 0,
      discountPriceValue: 0
    };
  }

  const daysThreshold = Number(config.earlyBirdDays ?? 8);
  const regularPrice = Number(config.earlyBirdRegularPrice ?? 150000);
  const discountPrice = Number(config.earlyBirdDiscount ?? 99000);

  const classDate = parseSpanishDate(course.upcomingDate);
  if (!classDate) {
    return {
      priceType: 'paid',
      priceValue: regularPrice,
      discountPriceValue: 0
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const classDateClean = new Date(classDate);
  classDateClean.setHours(0, 0, 0, 0);

  const diffTime = classDateClean.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays >= daysThreshold) {
    return {
      priceType: 'discount',
      priceValue: regularPrice,
      discountPriceValue: discountPrice
    };
  } else {
    return {
      priceType: 'paid',
      priceValue: regularPrice,
      discountPriceValue: 0
    };
  }
}

export interface MenuItem {
  id: string;
  label: string;
  link: string;
  icon: string;
  active: boolean;
  order: number;
}

const INITIAL_RESOURCES: ResourceItem[] = [
  { id: 'res-1', title: 'Introducción al CDMP DAMA Internacional', type: 'video', description: 'Video clase explicativa de 20 minutos detallando el plan de estudio y certificación CDMP.', durationOrSize: '20 Minutos', redirectUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'res-2', title: 'Estrategia de Gobierno de Datos Corporativa', type: 'whitepaper', description: 'Guía ejecutiva en PDF sobre cómo convencer a la junta directiva de financiar gobernanza.', durationOrSize: '2.4 MB', redirectUrl: 'https://www.govdatanexus.com/strategy' },
  { id: 'res-3', title: 'Datos con Gobierno: El Reto de la IA', type: 'podcast', description: 'Episodio de audio conversando con el arquitecto principal sobre gobernanza de IA.', durationOrSize: '35 Minutos', redirectUrl: 'https://masterclass.online/podcast-1' },
  { id: 'res-4', title: 'Plantilla Canvas de Gobierno de Datos', type: 'template', description: 'Plantilla editable de una página para modelar la gobernanza de su entidad.', durationOrSize: '850 KB', redirectUrl: 'https://www.govdatanexus.com/canvas' },
  { id: 'res-5', title: 'Optimización DAX en Power BI Enterprise', type: 'video', description: 'Taller práctico de optimización de consultas complejas en Power BI.', durationOrSize: '45 Minutos', redirectUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'res-6', title: 'Glosario de Negocio MIPG/DAMA', type: 'template', description: 'Catálogo de términos estándar del sector público colombiano.', durationOrSize: '1.2 MB', redirectUrl: 'https://legalcol.vercel.app/glosario' }
];

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: 'home', label: 'Inicio', link: 'home', icon: 'Home', active: true, order: 1 },
  { id: 'consulting', label: 'Consultoría', link: 'consulting', icon: 'Briefcase', active: true, order: 2 },
  { id: 'academy', label: 'Academia', icon: 'GraduationCap', link: 'academy', active: true, order: 3 },
  { id: 'legal', label: 'Centro Legal', icon: 'Scale', link: 'legal', active: true, order: 4 },
  { id: 'research', label: 'Investigación', icon: 'Search', link: 'research', active: true, order: 5 },
  { id: 'labs', label: 'Laboratorio IA', icon: 'Cpu', link: 'labs', active: true, order: 6 },
  { id: 'community', label: 'Comunidad', icon: 'Users', link: 'community', active: true, order: 7 },
  { id: 'resources', label: 'Recursos', icon: 'FileText', link: 'resources', active: true, order: 8 },
  { id: 'glossary', label: 'Conceptos SEO', icon: 'Award', link: 'glossary', active: true, order: 9 },
  { id: 'contact', label: 'Contacto', icon: 'Mail', link: 'contact', active: true, order: 10 }
];

export const DEFAULT_SECTION_ORDER = [
  'hero',
  'ai_features',
  'academy_banner',
  'govdata_nexus',
  'services',
  'academy_info',
  'specialized_ai',
  'case_studies',
  'blog_resources'
];

interface DataContextType {
  courses: Course[];
  enrollments: any[];
  deals: any[];
  leads: any[];
  loading: boolean;
  refreshData: () => Promise<void>;
  
  // Course actions
  addCourse: (course: Course) => Promise<void>;
  editCourse: (course: Course) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  
  // Enrollment actions
  enrollStudent: (enrollment: any) => Promise<boolean>;
  updateEnrollmentStatus: (id: string, status: string) => Promise<void>;
  removeEnrollment: (id: string) => Promise<void>;
  
  // Deal actions
  createDeal: (deal: any) => Promise<void>;
  moveDealStage: (id: string, currentStage: string) => Promise<void>;
  updateDealDetails: (deal: any) => Promise<void>;
  removeDeal: (id: string) => Promise<void>;
  
  // Lead actions
  submitLead: (lead: any) => Promise<boolean>;
  removeLead: (id: string) => Promise<void>;

  // Institutional Contact & SEO parameters
  contactInfo: ContactInfo;
  updateContactInfo: (info: ContactInfo) => Promise<void>;

  // Resources Library Manager CRUD
  resources: ResourceItem[];
  addResource: (item: ResourceItem) => Promise<void>;
  editResource: (item: ResourceItem) => Promise<void>;
  deleteResource: (id: string) => Promise<void>;

  // Layout Management (Menus & Sections)
  menuItems: MenuItem[];
  sectionOrder: string[];
  updateLayoutConfig: (menuItems: MenuItem[], sectionOrder: string[]) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { logoUrl, logoSize, setLogoUrl, setLogoSize } = useTheme();

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('dxp_courses');
    if (saved) return JSON.parse(saved);
    return initialCourses;
  });

  const [enrollments, setEnrollments] = useState<any[]>(() => {
    const saved = localStorage.getItem('dxp_enrollments');
    return saved ? JSON.parse(saved) : [];
  });

  const [deals, setDeals] = useState<any[]>(() => {
    const saved = localStorage.getItem('dxp_deals');
    return saved ? JSON.parse(saved) : [];
  });

  const [leads, setLeads] = useState<any[]>(() => {
    const saved = localStorage.getItem('dxp_leads');
    return saved ? JSON.parse(saved) : [];
  });

  // Institutional Info State
  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem('dxp_contact_info');
    if (saved) return JSON.parse(saved);
    return {
      companyName: 'Consultores Expertos SAS',
      companyNit: '900452089-9',
      email: 'info@consultoresexpertos.com',
      phone: '+57 300 123 4567',
      whatsapp: '573001234567',
      address: 'Bogotá, Colombia',
      metaDescription: 'Consultoría, Inteligencia Artificial, Arquitectura Empresarial, Academia y Cumplimiento Normativo reunidos en un único ecosistema.',
      metaKeywords: 'Gobierno de Datos, Inteligencia Artificial, DAMA, TOGAF, Ley 1581, COBIT, MIPG',
      initialScrollSection: 'hero',
      earlyBirdDays: 8,
      earlyBirdRegularPrice: 150000,
      earlyBirdDiscount: 99000,
      masterclassPageSize: 3,
      coursePageSize: 6,
      heroMarginTop: 0,
      heroHeight: 480
    };
  });

  // Resources CMS State
  const [resources, setResources] = useState<ResourceItem[]>(() => {
    const saved = localStorage.getItem('dxp_resources');
    if (saved) return JSON.parse(saved);
    return INITIAL_RESOURCES;
  });

  // Layout Management State
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('dxp_menu_items');
    if (saved) return JSON.parse(saved);
    return DEFAULT_MENU_ITEMS;
  });

  const [sectionOrder, setSectionOrder] = useState<string[]>(() => {
    const saved = localStorage.getItem('dxp_section_order');
    if (saved) return JSON.parse(saved);
    return DEFAULT_SECTION_ORDER;
  });

  const [loading, setLoading] = useState(true);

  // Sync to local storage for offline resiliency
  useEffect(() => {
    localStorage.setItem('dxp_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('dxp_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  useEffect(() => {
    localStorage.setItem('dxp_deals', JSON.stringify(deals));
  }, [deals]);

  useEffect(() => {
    localStorage.setItem('dxp_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('dxp_contact_info', JSON.stringify(contactInfo));
  }, [contactInfo]);

  useEffect(() => {
    localStorage.setItem('dxp_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('dxp_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('dxp_section_order', JSON.stringify(sectionOrder));
  }, [sectionOrder]);

  // Apply SEO parameters to index document in background
  useEffect(() => {
    document.querySelector('meta[name="description"]')?.setAttribute("content", contactInfo.metaDescription);
    document.querySelector('meta[name="keywords"]')?.setAttribute("content", contactInfo.metaKeywords);
    document.title = "GovData Nexus | Powered by Consultores Expertos SAS";
  }, [contactInfo]);

  const refreshData = async () => {
    setLoading(true);
    try {
      const fetchedDeals = await getCRMDeals();
      const fetchedLeads = await getDemoRequests();
      const fetchedEnrollments = await getCourseEnrollments();
      const fetchedCourses = await getCoursesCatalogFromDb();
      const fetchedResources = await getBlogResourcesFromDb();
      const fetchedConfig = await getSiteConfigurationFromDb();
      const fetchedLayout = await getSiteLayoutFromDb();

      if (fetchedDeals.length > 0) {
        setDeals(fetchedDeals.map((d: any) => ({
          id: d.id,
          title: d.deal_title,
          company: d.company_name,
          contact: d.contact_name,
          stage: d.deal_stage,
          val: `$${Number(d.deal_value || 0).toLocaleString()}`,
          score: d.probability_pct || 75,
          deal_value: Number(d.deal_value || 0)
        })));
      }
      
      if (fetchedLeads.length > 0) setLeads(fetchedLeads);
      if (fetchedEnrollments.length > 0) setEnrollments(fetchedEnrollments);
      
      if (fetchedCourses.length > 0) {
        setCourses(fetchedCourses);
        // Sync check: automatically insert any missing courses (e.g. Tuesday Masterclasses)
        const missing = initialCourses.filter(c => !fetchedCourses.some(fc => fc.id === c.id));
        if (missing.length > 0) {
          for (const course of missing) {
            await saveCourseInDb(course).catch(console.warn);
          }
          const updated = await getCoursesCatalogFromDb();
          if (updated.length > 0) setCourses(updated);
        }
      } else {
        // Database is empty, seed all initial courses
        for (const course of initialCourses) {
          await saveCourseInDb(course).catch(console.warn);
        }
        const updated = await getCoursesCatalogFromDb();
        if (updated.length > 0) setCourses(updated);
      }

      if (fetchedResources.length > 0) {
        setResources(fetchedResources);
      }

      if (fetchedConfig) {
        setContactInfo(fetchedConfig.contact);
        if (fetchedConfig.logoUrl) setLogoUrl(fetchedConfig.logoUrl, true);
        if (fetchedConfig.logoSize) setLogoSize(fetchedConfig.logoSize, true);
      }

      if (fetchedLayout) {
        if (fetchedLayout.menuItems && fetchedLayout.menuItems.length > 0) {
          setMenuItems(fetchedLayout.menuItems.sort((a: any, b: any) => a.order - b.order));
        }
        if (fetchedLayout.sectionOrder && fetchedLayout.sectionOrder.length > 0) {
          setSectionOrder(fetchedLayout.sectionOrder);
        }
      }
    } catch (e) {
      console.warn('Supabase refresh failed, falling back to local storage:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Course actions
  const addCourse = async (course: Course) => {
    setCourses(prev => [...prev, course]);
    const res = await saveCourseInDb(course);
    if (!res.success && res.error) {
      // Revert
      setCourses(prev => prev.filter(c => c.id !== course.id));
      throw new Error(res.error.message || 'Error guardando curso en Supabase');
    }
  };

  const editCourse = async (course: Course) => {
    const original = courses.find(c => c.id === course.id);
    setCourses(prev => prev.map(c => c.id === course.id ? course : c));
    const res = await saveCourseInDb(course);
    if (!res.success && res.error) {
      // Revert
      if (original) setCourses(prev => prev.map(c => c.id === course.id ? original : c));
      throw new Error(res.error.message || 'Error actualizando curso en Supabase');
    }
  };

  const deleteCourse = async (id: string) => {
    const original = courses.find(c => c.id === id);
    setCourses(prev => prev.filter(c => c.id !== id));
    const res = await deleteCourseFromDb(id);
    if (!res.success && res.error) {
      // Revert
      if (original) setCourses(prev => [...prev, original]);
      throw new Error(res.error.message || 'Error eliminando curso en Supabase');
    }
  };

  // Enrollment actions
  const enrollStudent = async (data: any) => {
    const tempId = `temp-enr-${Date.now()}`;
    const newEnr = {
      id: tempId,
      course_id: data.courseId,
      course_title: data.courseTitle,
      full_name: data.fullName,
      email: data.email,
      company: data.company || '',
      payment_status: data.paymentStatus || 'Preinscrito',
      cohort_date: data.cohortDate || 'Agosto 2026',
      created_at: new Date().toISOString()
    };

    setEnrollments(prev => [newEnr, ...prev]);

    const res = await saveCourseEnrollment(data);
    if (!res.success && res.error) {
      setEnrollments(prev => prev.filter(e => e.id !== tempId));
      throw new Error(res.error.message || 'Error guardando matrícula en Supabase');
    }
    await refreshData();
    return true;
  };

  const updateEnrollmentStatus = async (id: string, status: string) => {
    setEnrollments(prev => prev.map(e => e.id === id ? { ...e, payment_status: status } : e));
    
    const target = enrollments.find(e => e.id === id);
    if (target && !id.startsWith('temp-')) {
      const resDel = await deleteCourseEnrollment(id);
      if (!resDel.success && resDel.error) throw new Error(resDel.error.message);

      const resAdd = await saveCourseEnrollment({
        courseId: target.course_id || 'manual',
        courseTitle: target.course_title,
        fullName: target.full_name,
        email: target.email,
        company: target.company,
        cohortDate: target.cohort_date,
        paymentStatus: status
      });
      if (!resAdd.success && resAdd.error) throw new Error(resAdd.error.message);
      await refreshData();
    }
  };

  const removeEnrollment = async (id: string) => {
    const original = enrollments.find(e => e.id === id);
    setEnrollments(prev => prev.filter(e => e.id !== id));
    if (!id.startsWith('temp-')) {
      const res = await deleteCourseEnrollment(id);
      if (!res.success && res.error) {
        if (original) setEnrollments(prev => [...prev, original]);
        throw new Error(res.error.message || 'Error eliminando matrícula de Supabase');
      }
      await refreshData();
    }
  };

  // Deal actions
  const createDeal = async (data: any) => {
    const tempId = `temp-deal-${Date.now()}`;
    const newDeal = {
      id: tempId,
      title: data.dealTitle,
      company: data.companyName,
      contact: data.contactName,
      stage: 'Diagnóstico DAMA',
      val: `$${Number(data.dealValue || 0).toLocaleString()}`,
      deal_value: Number(data.dealValue || 0),
      score: 85
    };

    setDeals(prev => [newDeal, ...prev]);

    const res = await saveCRMDeal(data);
    if (!res.success && res.error) {
      setDeals(prev => prev.filter(d => d.id !== tempId));
      throw new Error(res.error.message || 'Error guardando negociación en Supabase');
    }
    await refreshData();
  };

  const moveDealStage = async (id: string, currentStage: string) => {
    const stages = ['Nuevo Lead', 'Diagnóstico DAMA', 'Oferta Formal', 'Negociación', 'Cierre Ganado'];
    const currentIndex = stages.indexOf(currentStage);
    const nextStage = stages[(currentIndex + 1) % stages.length];

    setDeals(prev => prev.map(d => d.id === id ? { ...d, stage: nextStage } : d));

    if (!id.startsWith('temp-')) {
      const res = await updateCRMDealStage(id, nextStage);
      if (!res.success && res.error) {
        // Revert
        setDeals(prev => prev.map(d => d.id === id ? { ...d, stage: currentStage } : d));
        throw new Error(res.error.message || 'Error actualizando etapa del negocio');
      }
      await refreshData();
    }
  };

  const updateDealDetails = async (data: any) => {
    const original = deals.find(d => d.id === data.id);
    setDeals(prev => prev.map(d => d.id === data.id ? {
      ...d,
      title: data.title,
      company: data.company,
      contact: data.contact,
      val: `$${Number(data.value || 0).toLocaleString()}`,
      deal_value: Number(data.value || 0),
      score: data.score,
      stage: data.stage
    } : d));

    if (!data.id.startsWith('temp-')) {
      const resDel = await deleteCRMDeal(data.id);
      if (!resDel.success && resDel.error) throw new Error(resDel.error.message);

      const resAdd = await saveCRMDeal({
        dealTitle: data.title,
        companyName: data.company,
        contactName: data.contact,
        contactEmail: data.email || 'info@consultoresexpertos.com',
        dealStage: data.stage,
        dealValue: Number(data.value),
        probabilityPct: data.score
      });
      if (!resAdd.success && resAdd.error) {
        if (original) setDeals(prev => prev.map(d => d.id === data.id ? original : d));
        throw new Error(resAdd.error.message || 'Error actualizando datos de negociación');
      }
      await refreshData();
    }
  };

  const removeDeal = async (id: string) => {
    const original = deals.find(d => d.id === id);
    setDeals(prev => prev.filter(d => d.id !== id));
    if (!id.startsWith('temp-')) {
      const res = await deleteCRMDeal(id);
      if (!res.success && res.error) {
        if (original) setDeals(prev => [...prev, original]);
        throw new Error(res.error.message || 'Error eliminando negociación de Supabase');
      }
      await refreshData();
    }
  };

  // Lead actions
  const submitLead = async (data: any) => {
    const tempId = `temp-lead-${Date.now()}`;
    const newLead = {
      id: tempId,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone || '',
      company: data.company || 'Independiente',
      role: data.role || 'N/A',
      topic_of_interest: data.interests?.[0] || 'GovData Nexus Platform Demo',
      preferred_schedule: data.preferredSchedule || 'Mañana 10:00 AM',
      message: data.message || '',
      status: 'Nuevo Lead',
      lead_score: 85,
      estimated_value: 25000.00,
      created_at: new Date().toISOString()
    };

    setLeads(prev => [newLead, ...prev]);

    const res = await saveDemoRequest(data);
    if (!res.success && res.error) {
      setLeads(prev => prev.filter(l => l.id !== tempId));
      throw new Error(res.error.message || 'Error enviando lead a Supabase');
    }
    await refreshData();
    return true;
  };

  const removeLead = async (id: string) => {
    const original = leads.find(l => l.id === id);
    setLeads(prev => prev.filter(l => l.id !== id));
    if (!id.startsWith('temp-')) {
      const res = await deleteDemoRequest(id);
      if (!res.success && res.error) {
        if (original) setLeads(prev => [...prev, original]);
        throw new Error(res.error.message || 'Error eliminando lead de Supabase');
      }
      await refreshData();
    }
  };

  // Institutional Info action
  const updateContactInfo = async (info: ContactInfo) => {
    setContactInfo(info);
    const res = await saveSiteConfigurationInDb(info, logoUrl, logoSize);
    if (!res.success && res.error) {
      throw new Error(res.error.message || 'Error guardando config SEO en Supabase');
    }
  };

  // Resources CMS actions
  const addResource = async (item: ResourceItem) => {
    setResources(prev => [item, ...prev]);
    const res = await saveBlogResourceInDb(item);
    if (!res.success && res.error) {
      // Revert
      setResources(prev => prev.filter(r => r.id !== item.id));
      throw new Error(res.error.message || 'Error guardando recurso en Supabase');
    }
  };

  const editResource = async (item: ResourceItem) => {
    const original = resources.find(r => r.id === item.id);
    setResources(prev => prev.map(r => r.id === item.id ? item : r));
    const res = await saveBlogResourceInDb(item);
    if (!res.success && res.error) {
      // Revert
      if (original) setResources(prev => prev.map(r => r.id === item.id ? original : r));
      throw new Error(res.error.message || 'Error actualizando recurso en Supabase');
    }
  };

  const deleteResource = async (id: string) => {
    const original = resources.find(r => r.id === id);
    setResources(prev => prev.filter(r => r.id !== id));
    const res = await deleteBlogResourceFromDb(id);
    if (!res.success && res.error) {
      // Revert
      if (original) setResources(prev => [...prev, original]);
      throw new Error(res.error.message || 'Error eliminando recurso en Supabase');
    }
  };

  const updateLayoutConfig = async (newMenuItems: MenuItem[], newSectionOrder: string[]) => {
    setMenuItems(newMenuItems.sort((a, b) => a.order - b.order));
    setSectionOrder(newSectionOrder);
    const res = await saveSiteLayoutInDb(newMenuItems, newSectionOrder);
    if (!res.success && res.error) {
      throw new Error(res.error.message || 'Error guardando diseño de menús y secciones en Supabase');
    }
  };

  return (
    <DataContext.Provider value={{
      courses,
      enrollments,
      deals,
      leads,
      loading,
      refreshData,
      addCourse,
      editCourse,
      deleteCourse,
      enrollStudent,
      updateEnrollmentStatus,
      removeEnrollment,
      createDeal,
      moveDealStage,
      updateDealDetails,
      removeDeal,
      submitLead,
      removeLead,
      contactInfo,
      updateContactInfo,
      resources,
      addResource,
      editResource,
      deleteResource,
      menuItems,
      sectionOrder,
      updateLayoutConfig
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
