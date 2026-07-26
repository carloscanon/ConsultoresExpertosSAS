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
  CheckCircle2
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

  const [activeTab, setActiveTab] = useState<'enrollments' | 'catalog'>('enrollments');

  // Modals
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
    discountPriceValue: 0
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

  // Course operations
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
      discountPriceValue: 0
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
      discountPriceValue: crs.discountPriceValue || 0
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
        description: courses.find(c => c.id === courseForm.id)?.description || 'Especialidad académica en Gobierno de Datos.',
        level: 'Intermedio',
        format: 'Online en Vivo',
        modulesCount: 5,
        priceType: courseForm.priceType as any,
        priceValue: courseForm.priceValue,
        discountPriceValue: courseForm.discountPriceValue
      });
      setSuccessBanner(`✓ Programa "${courseForm.title}" actualizado.`);
    } else {
      addCourse({
        id: `course-${Date.now()}`,
        title: courseForm.title,
        category: courseForm.category,
        duration: courseForm.duration,
        instructor: { name: courseForm.instructorName, role: 'Instructor Principal', experience: '' },
        certification: courseForm.certification,
        upcomingDate: courseForm.upcomingDate,
        description: 'Especialidad académica en Gobierno de Datos.',
        level: 'Intermedio',
        format: 'Online en Vivo',
        modulesCount: 5,
        priceType: courseForm.priceType as any,
        priceValue: courseForm.priceValue,
        discountPriceValue: courseForm.discountPriceValue
      });
      setSuccessBanner(`✓ Programa "${courseForm.title}" creado.`);
    }
    setCourseModalOpen(false);
    setTimeout(() => setSuccessBanner(null), 3000);
  };

  const handleDeleteCourse = (id: string, title: string) => {
    if (!confirm(`¿Está seguro de eliminar el programa "${title}"?`)) return;
    deleteCourse(id);
    setSuccessBanner(`✓ Programa "${title}" eliminado.`);
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
      courseTitle: enr.course_title,
      fullName: enr.full_name,
      email: enr.email,
      company: enr.company || '',
      paymentStatus: enr.payment_status,
      cohortDate: enr.cohort_date || 'Agosto 2026'
    });
    setEnrollmentModalOpen(true);
  };

  const handleEnrollmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      // For updates, we replace the enrollment with the new values
      await removeEnrollment(enrollmentForm.id);
      await enrollStudent({
        courseId: 'manual',
        courseTitle: enrollmentForm.courseTitle,
        fullName: enrollmentForm.fullName,
        email: enrollmentForm.email,
        company: enrollmentForm.company,
        cohortDate: enrollmentForm.cohortDate,
        paymentStatus: enrollmentForm.paymentStatus
      });
      setSuccessBanner(`✓ Matrícula de "${enrollmentForm.fullName}" actualizada.`);
    } else {
      await enrollStudent({
        courseId: 'manual',
        courseTitle: enrollmentForm.courseTitle,
        fullName: enrollmentForm.fullName,
        email: enrollmentForm.email,
        company: enrollmentForm.company,
        cohortDate: enrollmentForm.cohortDate,
        paymentStatus: enrollmentForm.paymentStatus
      });
      setSuccessBanner(`✓ Estudiante "${enrollmentForm.fullName}" matriculado.`);
    }
    setEnrollmentModalOpen(false);
    setTimeout(() => setSuccessBanner(null), 3000);
  };

  const handleDeleteEnrollment = async (id: string, name: string) => {
    if (!confirm(`¿Está seguro de eliminar la matrícula de "${name}"?`)) return;
    await removeEnrollment(id);
    setSuccessBanner(`✓ Matrícula de "${name}" eliminada.`);
    setTimeout(() => setSuccessBanner(null), 3000);
  };

  const totalRevenue = enrollments.reduce((sum, e) => sum + (Number(e.amount_paid) || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left">
      
      {/* Header Bar */}
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
            onClick={activeTab === 'catalog' ? handleOpenCreateCourse : handleOpenCreateEnrollment}
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{activeTab === 'catalog' ? 'Crear Nuevo Programa' : 'Registrar Alumno'}</span>
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
          <div className="text-2xl font-extrabold text-white font-mono mt-1">{courses.length} Cursos</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-400">Preinscritos Activos</span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">{enrollments.length} Leads</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-400">Ingresos LMS</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">${(totalRevenue || 12450).toLocaleString()}</div>
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
      <div className="flex gap-2 border-b border-slate-800 pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('enrollments')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${activeTab === 'enrollments' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <Users className="w-4 h-4" />
          <span>Matrículas & Estudiantes ({enrollments.length} Registrados)</span>
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${activeTab === 'catalog' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Catálogo de Programas ({courses.length} Especialidades)</span>
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
            {enrollments.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-mono">
                No hay matrículas registradas. Presione "Registrar Alumno" para matricular uno.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                    <th className="py-3 px-4 font-bold">Estudiante</th>
                    <th className="py-3 px-4 font-bold">Programa / Masterclass</th>
                    <th className="py-3 px-4 font-bold">Empresa / Entidad</th>
                    <th className="py-3 px-4 font-bold">Estado de Pago</th>
                    <th className="py-3 px-4 font-bold">Cohorte / Fecha</th>
                    <th className="py-3 px-4 font-bold">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-medium">
                  {enrollments.map((enr) => (
                    <tr key={enr.id} className="hover:bg-slate-800/50">
                      <td className="py-3.5 px-4 text-white">
                        <div>
                          <p className="font-bold">{enr.full_name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{enr.email}</p>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-cyan-400">
                        <div className="flex items-center space-x-1">
                          <GraduationCap className="w-3.5 h-3.5" />
                          <span>{enr.course_title}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{enr.company || 'Independiente'}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          enr.payment_status === 'Confirmado' || enr.payment_status === 'Certificado'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {enr.payment_status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 font-mono">{enr.cohort_date || 'N/A'}</td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleOpenEditEnrollment(enr)}
                            className="p-1 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
                            title="Editar Matrícula"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteEnrollment(enr.id, enr.full_name)}
                            className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                            title="Eliminar Matrícula"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Courses Catalog */}
      {activeTab === 'catalog' && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl animate-in fade-in duration-200">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-heading">Catálogo de Programas en MasterClassNow.online</h3>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Plataforma Certificada DAMA
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="py-3 px-4 font-bold">Programa</th>
                  <th className="py-3 px-4 font-bold">Categoría</th>
                  <th className="py-3 px-4 font-bold">Duración</th>
                  <th className="py-3 px-4 font-bold">Instructor Principal</th>
                  <th className="py-3 px-4 font-bold">Certificación</th>
                  <th className="py-3 px-4 font-bold">Próxima Cohorte</th>
                  <th className="py-3 px-4 font-bold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                {courses.map((crs) => (
                  <tr key={crs.id} className="hover:bg-slate-800/50">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{crs.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-cyan-400 font-mono">{crs.category}</td>
                    <td className="py-3.5 px-4 text-slate-300">{crs.duration}</td>
                    <td className="py-3.5 px-4 text-slate-300">{(crs as any).instructor?.name || (crs as any).instructorName || 'Ing. Carlos Cañón'}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {crs.certification}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-cyan-400">{crs.upcomingDate}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenEditCourse(crs)}
                          className="p-1.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
                          title="Editar Programa"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(crs.id, crs.title)}
                          className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                          title="Eliminar Programa"
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

      {/* COURSE CREATION/EDIT MODAL */}
      {courseModalOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl relative space-y-4 text-left">
            <button onClick={() => setCourseModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white font-heading">{isEditing ? 'Editar Programa Académico' : 'Crear Nuevo Programa Académico'}</h3>
            <form onSubmit={handleCourseSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Título del Programa</label>
                <input type="text" required value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} placeholder="Ej. Bootcamp CDMP DAMA" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-bold" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Categoría</label>
                <select value={courseForm.category} onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400">
                  <option value="Gobernanza de Datos">Gobernanza de Datos (DAMA)</option>
                  <option value="Inteligencia Artificial">Inteligencia Artificial & IA Gen</option>
                  <option value="Arquitectura de Datos">Arquitectura & Big Data</option>
                  <option value="Analítica Avanzada">Analítica Avanzada & Business Intelligence</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Duración</label>
                <input type="text" required value={courseForm.duration} onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })} placeholder="Ej. 40 Horas" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Instructor Principal</label>
                <input type="text" required value={courseForm.instructorName} onChange={(e) => setCourseForm({ ...courseForm, instructorName: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Tipo de Certificación</label>
                <input type="text" required value={courseForm.certification} onChange={(e) => setCourseForm({ ...courseForm, certification: e.target.value })} placeholder="Ej. Certificado de Asistencia DAMA" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Próxima Cohorte</label>
                <input type="text" required value={courseForm.upcomingDate} onChange={(e) => setCourseForm({ ...courseForm, upcomingDate: e.target.value })} placeholder="Ej. Agosto 2026" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-mono" />
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
                  <label className="block text-slate-300 font-bold mb-1 text-emerald-400">Precio con Descuento ($ COP/USD)</label>
                  <input 
                    type="number" 
                    required 
                    value={courseForm.discountPriceValue} 
                    onChange={(e) => setCourseForm({ ...courseForm, discountPriceValue: Number(e.target.value) })} 
                    placeholder="Ej. 79000" 
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 outline-none focus:border-emerald-400 font-mono font-bold" 
                  />
                </div>
              )}

              <button type="submit" className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg mt-4 uppercase">
                {isEditing ? 'Actualizar Programa' : 'Crear Programa'}
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
            <h3 className="text-lg font-bold text-white font-heading">{isEditing ? 'Editar Matrícula de Alumno' : 'Registrar/Matricular Alumno Manualmente'}</h3>
            <form onSubmit={handleEnrollmentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Programa / Masterclass de Interés</label>
                <select value={enrollmentForm.courseTitle} onChange={(e) => setEnrollmentForm({ ...enrollmentForm, courseTitle: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400">
                  {courses.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Nombre Completo del Alumno</label>
                <input type="text" required value={enrollmentForm.fullName} onChange={(e) => setEnrollmentForm({ ...enrollmentForm, fullName: e.target.value })} placeholder="Ej. Carlos Cañón" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Correo Electrónico</label>
                <input type="email" required value={enrollmentForm.email} onChange={(e) => setEnrollmentForm({ ...enrollmentForm, email: e.target.value })} placeholder="carlos@empresa.com" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Empresa / Entidad</label>
                <input type="text" value={enrollmentForm.company} onChange={(e) => setEnrollmentForm({ ...enrollmentForm, company: e.target.value })} placeholder="Ej. Positiva Compañía de Seguros" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Estado de Pago / Matrícula</label>
                <select value={enrollmentForm.paymentStatus} onChange={(e) => setEnrollmentForm({ ...enrollmentForm, paymentStatus: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400">
                  <option value="Preinscrito">Preinscrito</option>
                  <option value="Confirmado">Confirmado (Pago Recibido)</option>
                  <option value="En Cursado">En Cursado</option>
                  <option value="Certificado">Certificado Emitido</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Fecha / Cohorte</label>
                <input type="text" required value={enrollmentForm.cohortDate} onChange={(e) => setEnrollmentForm({ ...enrollmentForm, cohortDate: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-mono" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg mt-2">
                {isEditing ? 'Guardar Cambios' : 'Matricular Estudiante'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
