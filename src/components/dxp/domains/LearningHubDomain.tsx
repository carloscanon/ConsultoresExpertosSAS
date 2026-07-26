import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { 
  GraduationCap, 
  Plus, 
  Star,
  Users,
  BookOpen,
  X,
  Trash2,
  Edit2,
  RefreshCw,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const LearningHubDomain: React.FC = () => {
  const { 
    courses, 
    addCourse, 
    editCourse, 
    deleteCourse, 
    enrollments, 
    enrollStudent, 
    removeEnrollment,
    loading,
    refreshData 
  } = useData();

  // Modals
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Tabs: enrollments, catalog, masterclasses
  const [activeTab, setActiveTab] = useState<'enrollments' | 'catalog' | 'masterclasses'>('enrollments');

  // Forms State
  const [courseForm, setCourseForm] = useState({
    id: '',
    title: '',
    category: 'Gobernanza de Datos',
    duration: '40 Horas',
    instructorName: 'Ing. Carlos Cañón',
    certification: 'Certificado de Asistencia DAMA',
    upcomingDate: 'Agosto 2026',
    priceType: 'free',
    priceValue: 0,
    discountPriceValue: 0,
    description: '',
    format: 'Online en Vivo',
    level: 'Avanzado',
    modulesCount: 5,
    accessLink: '',
    conferenceLink: ''
  });

  const [enrollmentForm, setEnrollmentForm] = useState({
    id: '',
    courseTitle: '',
    fullName: '',
    email: '',
    company: '',
    paymentStatus: 'Preinscrito',
    cohortDate: 'Agosto 2026'
  });

  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Course / Masterclass operations
  const handleOpenCreateCourse = () => {
    setIsEditing(false);
    setCourseForm({
      id: '',
      title: '',
      category: 'Gobernanza de Datos',
      duration: '40 Horas',
      instructorName: 'Ing. Carlos Cañón',
      certification: 'Certificado de Asistencia DAMA',
      upcomingDate: 'Agosto 2026',
      priceType: 'free',
      priceValue: 0,
      discountPriceValue: 0,
      description: 'Especialidad académica en Gobierno de Datos.',
      format: 'Online en Vivo',
      level: 'Avanzado',
      modulesCount: 5,
      accessLink: '',
      conferenceLink: ''
    });
    setCourseModalOpen(true);
  };

  const handleOpenCreateMasterclass = () => {
    setIsEditing(false);
    setCourseForm({
      id: `tuesday-${Date.now()}`,
      title: 'Masterclass: ',
      category: 'Martes de Masterclass',
      duration: '2 Horas (Sesión Única)',
      instructorName: 'Ing. Carlos Cañón',
      certification: 'Asistencia Oficial Certificada',
      upcomingDate: 'Martes de Datos',
      priceType: 'free',
      priceValue: 0,
      discountPriceValue: 0,
      description: 'Sesión técnica en vivo de 2 horas.',
      format: 'Online en Vivo via Zoom',
      level: 'Intermedio',
      modulesCount: 1,
      accessLink: '',
      conferenceLink: ''
    });
    setCourseModalOpen(true);
  };

  const handleOpenEditCourse = (crs: any) => {
    setIsEditing(true);
    setCourseForm({
      id: crs.id,
      title: crs.title,
      category: crs.category,
      duration: crs.duration,
      instructorName: crs.instructor?.name || crs.instructorName || 'Ing. Carlos Cañón',
      certification: crs.certification,
      upcomingDate: crs.upcomingDate,
      priceType: crs.priceType || 'free',
      priceValue: crs.priceValue || 0,
      discountPriceValue: crs.discountPriceValue || 0,
      description: crs.description || '',
      format: crs.format || 'Online en Vivo',
      level: crs.level || 'Avanzado',
      modulesCount: crs.modulesCount || 5,
      accessLink: crs.accessLink || '',
      conferenceLink: crs.conferenceLink || ''
    });
    setCourseModalOpen(true);
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      editCourse({
        id: courseForm.id,
        title: courseForm.title,
        category: courseForm.category,
        duration: courseForm.duration,
        instructor: { name: courseForm.instructorName, role: 'Instructor Principal', experience: '' },
        certification: courseForm.certification,
        upcomingDate: courseForm.upcomingDate,
        description: courseForm.description,
        level: courseForm.level,
        format: courseForm.format,
        modulesCount: courseForm.modulesCount,
        priceType: courseForm.priceType as any,
        priceValue: courseForm.priceValue,
        discountPriceValue: courseForm.discountPriceValue,
        accessLink: courseForm.accessLink,
        conferenceLink: courseForm.conferenceLink
      });
      setSuccessBanner(`✓ "${courseForm.title}" actualizado.`);
    } else {
      addCourse({
        id: courseForm.id || `course-${Date.now()}`,
        title: courseForm.title,
        category: courseForm.category,
        duration: courseForm.duration,
        instructor: { name: courseForm.instructorName, role: 'Instructor Principal', experience: '' },
        certification: courseForm.certification,
        upcomingDate: courseForm.upcomingDate,
        description: courseForm.description,
        level: courseForm.level,
        format: courseForm.format,
        modulesCount: courseForm.modulesCount,
        priceType: courseForm.priceType as any,
        priceValue: courseForm.priceValue,
        discountPriceValue: courseForm.discountPriceValue,
        accessLink: courseForm.accessLink,
        conferenceLink: courseForm.conferenceLink
      });
      setSuccessBanner(`✓ "${courseForm.title}" creado.`);
    }
    setCourseModalOpen(false);
    setTimeout(() => setSuccessBanner(null), 3000);
  };

  const handleDeleteCourse = (id: string, title: string) => {
    if (!confirm(`¿Está seguro de eliminar el programa/masterclass "${title}"?`)) return;
    deleteCourse(id);
    setSuccessBanner(`✓ "${title}" eliminado.`);
    setTimeout(() => setSuccessBanner(null), 3000);
  };

  // Student enrollment operations
  const handleOpenCreateEnrollment = () => {
    setIsEditing(false);
    setEnrollmentForm({
      id: '',
      courseTitle: courses[0]?.title || '',
      fullName: '',
      email: '',
      company: '',
      paymentStatus: 'Preinscrito',
      cohortDate: 'Agosto 2026'
    });
    setEnrollmentModalOpen(true);
  };

  const handleOpenEditEnrollment = (enr: any) => {
    setIsEditing(true);
    setEnrollmentForm({
      id: enr.id,
      courseTitle: enr.course_title || enr.courseTitle,
      fullName: enr.full_name || enr.fullName,
      email: enr.email,
      company: enr.company_name || enr.company || '',
      paymentStatus: enr.payment_status || enr.paymentStatus || 'Preinscrito',
      cohortDate: enr.cohort_date || enr.cohortDate || 'Agosto 2026'
    });
    setEnrollmentModalOpen(true);
  };

  const handleEnrollmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await enrollStudent({
        id: enrollmentForm.id,
        courseId: courses.find(c => c.title === enrollmentForm.courseTitle)?.id || 'generic',
        courseTitle: enrollmentForm.courseTitle,
        fullName: enrollmentForm.fullName,
        email: enrollmentForm.email,
        company: enrollmentForm.company,
        paymentStatus: enrollmentForm.paymentStatus as any,
        cohortDate: enrollmentForm.cohortDate
      });
      setSuccessBanner(`✓ Matrícula de "${enrollmentForm.fullName}" actualizada.`);
    } else {
      await enrollStudent({
        id: `enroll-${Date.now()}`,
        courseId: courses.find(c => c.title === enrollmentForm.courseTitle)?.id || 'generic',
        courseTitle: enrollmentForm.courseTitle,
        fullName: enrollmentForm.fullName,
        email: enrollmentForm.email,
        company: enrollmentForm.company,
        paymentStatus: enrollmentForm.paymentStatus as any,
        cohortDate: enrollmentForm.cohortDate
      });
      setSuccessBanner(`✓ Alumno "${enrollmentForm.fullName}" matriculado.`);
    }
    setEnrollmentModalOpen(false);
    setTimeout(() => setSuccessBanner(null), 3000);
  };

  const handleDeleteEnrollment = async (id: string, name: string) => {
    if (!confirm(`¿Está seguro de anular la preinscripción de "${name}"?`)) return;
    await removeEnrollment(id);
    setSuccessBanner(`✓ Matrícula de "${name}" anulada.`);
    setTimeout(() => setSuccessBanner(null), 3000);
  };


  // Filter lists
  const regularCoursesList = courses.filter(c => c.category !== 'Martes de Masterclass');
  const tuesdayMasterclassesList = courses.filter(c => c.category === 'Martes de Masterclass');

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-left font-sans">
      
      {/* View Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest block">DOMINIO 4 DE 7 • LEARNING HUB LMS (MASTERCLASSNOW.ONLINE)</span>
          <h2 className="text-2xl font-extrabold text-white font-heading">Gestión LMS de Cursos & Certificaciones Internacionales</h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={refreshData}
            title="Sincronizar ahora"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={
              activeTab === 'catalog' 
                ? handleOpenCreateCourse 
                : activeTab === 'masterclasses' 
                ? handleOpenCreateMasterclass 
                : handleOpenCreateEnrollment
            }
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>
              {activeTab === 'catalog' 
                ? 'Crear Nuevo Programa' 
                : activeTab === 'masterclasses' 
                ? 'Añadir Masterclass' 
                : 'Registrar Alumno'}
            </span>
          </button>
        </div>
      </div>

      {successBanner && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* LMS KPI Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-400">Total Programas</span>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">{regularCoursesList.length} Cursos</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-400">Masterclass Únicas</span>
          <div className="text-2xl font-extrabold text-purple-400 font-mono mt-1">{tuesdayMasterclassesList.length} Clases</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-400">Preinscritos Activos</span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">{enrollments.length} Alumnos</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-400">Valoración Promedio</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1 flex items-center space-x-1">
            <span>4.95</span>
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
        </div>
      </div>

      {/* LMS Sub Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('enrollments')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${activeTab === 'enrollments' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <Users className="w-4 h-4" />
          <span>Matrículas & Estudiantes ({enrollments.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${activeTab === 'catalog' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Catálogo de Cursos ({regularCoursesList.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('masterclasses')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${activeTab === 'masterclasses' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <Calendar className="w-4 h-4" />
          <span>Martes de Masterclass ({tuesdayMasterclassesList.length})</span>
        </button>
      </div>

      {/* TAB 1: Enrollment leads from Supabase */}
      {activeTab === 'enrollments' && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl animate-in fade-in duration-200">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-heading">Estudiantes Preinscritos en la Academia (Live Supabase)</h3>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Sincronizado
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] bg-slate-950/40">
                  <th className="py-3.5 px-4 font-bold">Estudiante</th>
                  <th className="py-3.5 px-4 font-bold">Programa / Masterclass</th>
                  <th className="py-3.5 px-4 font-bold">Empresa</th>
                  <th className="py-3.5 px-4 font-bold">Cohorte / Fecha</th>
                  <th className="py-3.5 px-4 font-bold">Estado de Pago</th>
                  <th className="py-3.5 px-4 font-bold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                {enrollments.map((enr) => (
                  <tr key={enr.id} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white text-sm">{enr.full_name || enr.fullName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{enr.email}</div>
                    </td>
                    <td className="py-3 px-4 text-cyan-400 font-bold">{enr.course_title || enr.courseTitle}</td>
                    <td className="py-3 px-4 text-slate-300">{enr.company_name || enr.company || 'Particular'}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{enr.cohort_date || enr.cohortDate}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        (enr.payment_status || enr.paymentStatus) === 'Pagado'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {enr.payment_status || enr.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2 text-slate-500">
                        <button
                          onClick={() => handleOpenEditEnrollment(enr)}
                          className="p-1.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEnrollment(enr.id, enr.full_name || enr.fullName)}
                          className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Courses Catalog (Excludes Masterclasses) */}
      {activeTab === 'catalog' && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl animate-in fade-in duration-200">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-heading">Catálogo de Programas y Diplomados en MasterClassNow.online</h3>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Plataforma Certificada DAMA
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] bg-slate-950/40">
                  <th className="py-3.5 px-4 font-bold">Programa</th>
                  <th className="py-3.5 px-4 font-bold">Categoría</th>
                  <th className="py-3.5 px-4 font-bold">Duración</th>
                  <th className="py-3.5 px-4 font-bold">Instructor Principal</th>
                  <th className="py-3.5 px-4 font-bold">Esquema de Precio</th>
                  <th className="py-3.5 px-4 font-bold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                {regularCoursesList.map((crs) => (
                  <tr key={crs.id} className="hover:bg-slate-800/30">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{crs.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-cyan-400 font-mono">{crs.category}</td>
                    <td className="py-3.5 px-4 text-slate-350">{crs.duration}</td>
                    <td className="py-3.5 px-4 text-slate-300">{(crs as any).instructor?.name || (crs as any).instructorName || 'Ing. Carlos Cañón'}</td>
                    <td className="py-3.5 px-4 font-mono">
                      {crs.priceType === 'discount' ? (
                        <span className="text-emerald-400 font-bold">Desc (${crs.discountPriceValue?.toLocaleString()})</span>
                      ) : crs.priceType === 'paid' ? (
                        <span className="text-white font-bold">${crs.priceValue?.toLocaleString()}</span>
                      ) : (
                        <span className="text-emerald-500 font-semibold">Gratuito</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenEditCourse(crs)}
                          className="p-1.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(crs.id, crs.title)}
                          className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Tuesday Masterclasses Parameterizer */}
      {activeTab === 'masterclasses' && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl animate-in fade-in duration-200">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-heading">Programación Martes de Masterclass (Sesiones Únicas de los Martes)</h3>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Martes de Datos
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] bg-slate-950/40">
                  <th className="py-3.5 px-4 font-bold">Masterclass</th>
                  <th className="py-3.5 px-4 font-bold">Fecha Programada</th>
                  <th className="py-3.5 px-4 font-bold">Badge / Etiqueta</th>
                  <th className="py-3.5 px-4 font-bold">Instructor</th>
                  <th className="py-3.5 px-4 font-bold">Esquema de Precio</th>
                  <th className="py-3.5 px-4 font-bold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                {tuesdayMasterclassesList.map((crs) => (
                  <tr key={crs.id} className="hover:bg-slate-800/30">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>{crs.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-cyan-400 font-mono font-bold">{crs.upcomingDate}</td>
                    <td className="py-3.5 px-4 text-slate-350">{crs.badge || 'Martes'}</td>
                    <td className="py-3.5 px-4 text-slate-300">{(crs as any).instructor?.name || (crs as any).instructorName || 'Ing. Carlos Cañón'}</td>
                    <td className="py-3.5 px-4 font-mono">
                      {crs.priceType === 'discount' ? (
                        <span className="text-emerald-400 font-bold">Desc (${crs.discountPriceValue?.toLocaleString()})</span>
                      ) : crs.priceType === 'paid' ? (
                        <span className="text-white font-bold">${crs.priceValue?.toLocaleString()}</span>
                      ) : (
                        <span className="text-emerald-500 font-semibold">Gratuito</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenEditCourse(crs)}
                          className="p-1.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(crs.id, crs.title)}
                          className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* COURSE / MASTERCLASS REGISTRATION OR EDIT MODAL */}
      {courseModalOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl relative space-y-4 text-left font-sans">
            <button onClick={() => setCourseModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white font-heading">
              {isEditing ? 'Editar Registro' : (courseForm.category === 'Martes de Masterclass' ? 'Crear Nueva Masterclass del Martes' : 'Crear Nuevo Programa')}
            </h3>
            
            <form onSubmit={handleCourseSubmit} className="space-y-3 text-xs">
              
              <div>
                <label className="block text-slate-300 font-bold mb-1">Título del Programa / Clase</label>
                <input 
                  type="text" 
                  required 
                  value={courseForm.title} 
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} 
                  placeholder="Ej. Masterclass: RLS Policies in PostgreSQL" 
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-bold" 
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Categoría</label>
                <select 
                  value={courseForm.category} 
                  disabled={isEditing || courseForm.category === 'Martes de Masterclass'}
                  onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })} 
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-805 text-white outline-none focus:border-cyan-400 disabled:opacity-60"
                >
                  <option value="Gobernanza de Datos">Gobernanza de Datos (DAMA)</option>
                  <option value="Inteligencia Artificial">Inteligencia Artificial & IA Gen</option>
                  <option value="Arquitectura de Datos">Arquitectura & Big Data</option>
                  <option value="Analítica Avanzada">Analítica Avanzada & Business Intelligence</option>
                  <option value="Martes de Masterclass">Martes de Masterclass (Programación Especial)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Duración</label>
                <input 
                  type="text" 
                  required 
                  value={courseForm.duration} 
                  onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })} 
                  placeholder="Ej. 2 Horas" 
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" 
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Instructor Principal</label>
                <input 
                  type="text" 
                  required 
                  value={courseForm.instructorName} 
                  onChange={(e) => setCourseForm({ ...courseForm, instructorName: e.target.value })} 
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" 
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Tipo de Certificación</label>
                <input 
                  type="text" 
                  required 
                  value={courseForm.certification} 
                  onChange={(e) => setCourseForm({ ...courseForm, certification: e.target.value })} 
                  placeholder="Ej. Asistencia Oficial Certificada" 
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" 
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Próxima Cohorte / Fecha Programada</label>
                <input 
                  type="text" 
                  required 
                  value={courseForm.upcomingDate} 
                  onChange={(e) => setCourseForm({ ...courseForm, upcomingDate: e.target.value })} 
                  placeholder="Ej. Martes 15 de Septiembre, 2026" 
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-mono font-bold" 
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Descripción / Sinopsis del Curso</label>
                <textarea 
                  rows={3}
                  required 
                  value={courseForm.description} 
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} 
                  placeholder="Describa brevemente los objetivos y temas del curso..." 
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-sans" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Formato / Modalidad</label>
                  <select 
                    value={courseForm.format} 
                    onChange={(e) => setCourseForm({ ...courseForm, format: e.target.value })} 
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-semibold"
                  >
                    <option value="Online en Vivo">Online en Vivo</option>
                    <option value="Online en Vivo via Zoom">Online en Vivo via Zoom</option>
                    <option value="Laboratorios Prácticos 100%">Laboratorios Prácticos 100%</option>
                    <option value="Híbrido Presencial">Híbrido Presencial</option>
                    <option value="Autoformación Gratuita">Autoformación Gratuita</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Nivel</label>
                  <select 
                    value={courseForm.level} 
                    onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })} 
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-semibold"
                  >
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                    <option value="Especialista">Especialista</option>
                    <option value="Ejecutivo">Ejecutivo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Cantidad de Módulos (Clases)</label>
                <input 
                  type="number" 
                  required 
                  value={courseForm.modulesCount} 
                  onChange={(e) => setCourseForm({ ...courseForm, modulesCount: Number(e.target.value) })} 
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-mono font-bold" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Link de Acceso (Aula/LMS)</label>
                  <input 
                    type="text" 
                    value={courseForm.accessLink} 
                    onChange={(e) => setCourseForm({ ...courseForm, accessLink: e.target.value })} 
                    placeholder="https://aula.academy..." 
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-mono text-[10px]" 
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Link de Conferencia (Zoom/Teams)</label>
                  <input 
                    type="text" 
                    value={courseForm.conferenceLink} 
                    onChange={(e) => setCourseForm({ ...courseForm, conferenceLink: e.target.value })} 
                    placeholder="https://zoom.us/j/..." 
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-mono text-[10px]" 
                  />
                </div>
              </div>
              
              <div className="border-t border-slate-800 pt-3">
                <label className="block text-slate-300 font-bold mb-1 font-sans">Esquema de Precios</label>
                <select 
                  value={courseForm.priceType} 
                  onChange={(e) => setCourseForm({ ...courseForm, priceType: e.target.value as any })} 
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-bold"
                >
                  <option value="free">Gratuito (Sin Costo)</option>
                  <option value="paid">De Costo (Valor Fijo)</option>
                  <option value="discount">Con Descuento Especial</option>
                </select>
              </div>

              {(courseForm.priceType === 'paid' || courseForm.priceType === 'discount') && (
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Precio Regular ($ COP/USD)</label>
                  <input 
                    type="number" 
                    required 
                    value={courseForm.priceValue} 
                    onChange={(e) => setCourseForm({ ...courseForm, priceValue: Number(e.target.value) })} 
                    placeholder="Ej. 150000" 
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-mono font-bold" 
                  />
                </div>
              )}

              {courseForm.priceType === 'discount' && (
                <div>
                  <label className="block text-slate-300 font-bold mb-1 text-emerald-450">Precio con Descuento ($ COP/USD)</label>
                  <input 
                    type="number" 
                    required 
                    value={courseForm.discountPriceValue} 
                    onChange={(e) => setCourseForm({ ...courseForm, discountPriceValue: Number(e.target.value) })} 
                    placeholder="Ej. 79000" 
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-450 outline-none focus:border-emerald-400 font-mono font-bold" 
                  />
                </div>
              )}

              <button 
                type="submit" 
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg mt-4 uppercase"
              >
                {isEditing ? 'Actualizar Registro' : (courseForm.category === 'Martes de Masterclass' ? 'Crear Masterclass del Martes' : 'Crear Programa')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT REGISTRATION / EDIT MODAL */}
      {enrollmentModalOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl relative space-y-4 text-left">
            <button onClick={() => setEnrollmentModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white font-heading">{isEditing ? 'Editar Matrícula del Alumno' : 'Matricular Nuevo Alumno'}</h3>
            
            <form onSubmit={handleEnrollmentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  required 
                  value={enrollmentForm.fullName} 
                  onChange={(e) => setEnrollmentForm({ ...enrollmentForm, fullName: e.target.value })} 
                  placeholder="Ej. Carlos Cañón" 
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" 
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Correo Electrónico</label>
                <input 
                  type="email" 
                  required 
                  value={enrollmentForm.email} 
                  onChange={(e) => setEnrollmentForm({ ...enrollmentForm, email: e.target.value })} 
                  placeholder="carlos@consultores.com" 
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" 
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Empresa</label>
                <input 
                  type="text" 
                  value={enrollmentForm.company} 
                  onChange={(e) => setEnrollmentForm({ ...enrollmentForm, company: e.target.value })} 
                  placeholder="Particular" 
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" 
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 font-sans">Curso / Masterclass Relacionada</label>
                <select 
                  value={enrollmentForm.courseTitle} 
                  onChange={(e) => setEnrollmentForm({ ...enrollmentForm, courseTitle: e.target.value })} 
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-semibold"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Cohorte / Fecha de Carga</label>
                <input 
                  type="text" 
                  required 
                  value={enrollmentForm.cohortDate} 
                  onChange={(e) => setEnrollmentForm({ ...enrollmentForm, cohortDate: e.target.value })} 
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" 
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Estado de Pago</label>
                <select 
                  value={enrollmentForm.paymentStatus} 
                  onChange={(e) => setEnrollmentForm({ ...enrollmentForm, paymentStatus: e.target.value })} 
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
                >
                  <option value="Preinscrito">Preinscrito</option>
                  <option value="Pagado">Pagado (Aprobado)</option>
                  <option value="Anulado">Anulado</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg mt-2 uppercase"
              >
                {isEditing ? 'Actualizar Matrícula' : 'Confirmar Matrícula'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
