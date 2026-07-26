import React, { useState } from 'react';
import { useData, calculateMasterclassPrice } from '../../../context/DataContext';
import { 
  GraduationCap, 
  ArrowRight,
  CheckCircle,
  ExternalLink,
  X,
  Calendar,
  Video,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const AcademyPortal: React.FC = () => {
  const { courses, enrollStudent, contactInfo } = useData();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [enrollForm, setEnrollForm] = useState({ name: '', email: '', company: '' });
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'todos' | 'dama' | 'ia' | 'arquitectura'>('todos');

  // Pagination states
  const [tuesdayPage, setTuesdayPage] = useState(0);
  const [coursesPage, setCoursesPage] = useState(0);

  // Separate Tuesday Masterclasses from standard professional programs
  const tuesdayMasterclasses = courses.filter(c => c.category === 'Martes de Masterclass');
  const regularCourses = courses.filter(c => c.category !== 'Martes de Masterclass');

  const filteredCourses = activeCategory === 'todos' 
    ? regularCourses 
    : regularCourses.filter(c => {
        const cat = c.category.toLowerCase();
        if (activeCategory === 'dama') return cat.includes('dama') || cat.includes('gobernanza');
        if (activeCategory === 'ia') return cat.includes('ia') || cat.includes('artificial') || cat.includes('inteligencia');
        if (activeCategory === 'arquitectura') return cat.includes('arquitectura') || cat.includes('datos');
        return true;
      });

  const handleCategoryChange = (cat: 'todos' | 'dama' | 'ia' | 'arquitectura') => {
    setActiveCategory(cat);
    setCoursesPage(0);
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;

    await enrollStudent({
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title,
      fullName: enrollForm.name,
      email: enrollForm.email,
      company: enrollForm.company,
      paymentStatus: 'Preinscrito',
      cohortDate: selectedCourse.upcomingDate
    });

    setEnrollSuccess(true);
    setTimeout(() => {
      setEnrollSuccess(false);
      setSelectedCourse(null);
      setEnrollForm({ name: '', email: '', company: '' });
    }, 2500);
  };

  // Pagination config
  const masterclassSize = Number(contactInfo.masterclassPageSize || 3);
  const courseSize = Number(contactInfo.coursePageSize || 6);

  const totalTuesdayPages = Math.ceil(tuesdayMasterclasses.length / masterclassSize);
  const totalCoursePages = Math.ceil(filteredCourses.length / courseSize);

  const paginatedMasterclasses = tuesdayMasterclasses.slice(tuesdayPage * masterclassSize, (tuesdayPage + 1) * masterclassSize);
  const paginatedCourses = filteredCourses.slice(coursesPage * courseSize, (coursesPage + 1) * courseSize);

  return (
    <div className="py-24 bg-slate-950 text-white min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-purple-400 animate-bounce" />
            <span>GovData Academy • MasterClass Online</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Centro de Formación y Certificación
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Formación especializada de primer nivel en Gobierno de Datos (DAMA-DMBOK2), Arquitectura Empresarial e Inteligencia Artificial.
          </p>
          
          <div className="pt-2 flex justify-center space-x-3">
            <a
              href="https://masterclassnow.online"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold text-purple-300 bg-purple-500/10 border border-purple-500/25 hover:bg-purple-500/20 transition-all flex items-center space-x-1.5"
            >
              <span>Ir a MasterClassNow.online</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* TUESDAY MASTERCLASSES LINE SECTION */}
        {tuesdayMasterclasses.length > 0 && (
          <div className="mb-20 bg-slate-900/40 rounded-3xl p-6 sm:p-8 border border-purple-900/30">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest block mb-1">
                  📅 PROGRAMACIÓN SEMANAL EXCLUSIVA
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading flex items-center space-x-2">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  <span>Martes de Masterclass (Sesiones Únicas)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Una clase en vivo única cada martes hasta fin de año. Sesiones técnicas y estratégicas independientes.
                </p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-300 font-mono">
                Página {tuesdayPage + 1} de {totalTuesdayPages} ({tuesdayMasterclasses.length} Clases)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paginatedMasterclasses.map((course) => {
                const priceInfo = calculateMasterclassPrice(course, contactInfo);
                return (
                  <div
                    key={course.id}
                    className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between group shadow-lg animate-in fade-in-50"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-purple-500/15 text-purple-400 border border-purple-500/20">
                          {course.badge || 'Martes'}
                        </span>
                        <span className="text-[9px] font-mono font-bold text-slate-400">
                          {course.duration}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white mb-2 group-hover:text-purple-300 transition-colors font-heading leading-snug">
                        {course.title}
                      </h4>

                      <p className="text-[11px] text-slate-400 leading-relaxed mb-4 line-clamp-3">
                        {course.description}
                      </p>

                      <div className="space-y-1 text-[10px] text-slate-400 bg-slate-900/40 p-2.5 rounded-xl border border-slate-805 font-mono mb-4">
                        <div className="flex justify-between">
                          <span>Instructor:</span>
                          <span className="font-bold text-white">{course.instructor?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Modalidad:</span>
                          <span className="font-bold text-slate-350">{course.format || 'Online en Vivo'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Nivel:</span>
                          <span className="font-bold text-slate-350">{course.level || 'Intermedio'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fecha:</span>
                          <span className="font-bold text-cyan-400">{course.upcomingDate}</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-800/80 pt-1.5 mt-1.5 font-bold">
                          <span>Inversión:</span>
                          {priceInfo.priceType === 'discount' ? (
                            <div className="flex items-center space-x-1.5">
                              <span className="text-[9px] text-slate-500 line-through">
                                ${Number(priceInfo.priceValue || 0).toLocaleString()}
                              </span>
                              <span className="text-emerald-450 font-extrabold">
                                ${Number(priceInfo.discountPriceValue || 0).toLocaleString()}
                              </span>
                            </div>
                          ) : priceInfo.priceType === 'paid' ? (
                            <span className="text-white font-extrabold">
                              ${Number(priceInfo.priceValue || 0).toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-emerald-400 font-extrabold uppercase text-[9px]">
                              Gratis (Sin Costo)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex flex-col space-y-2">
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="w-full py-2 rounded-xl text-[11px] font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all flex items-center justify-center space-x-1"
                      >
                        <span>{priceInfo.priceType === 'free' ? 'Inscribirse Gratis' : 'Preinscribirme'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {course.conferenceLink && (
                        <a
                          href={course.conferenceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 rounded-xl text-[10px] font-bold text-center text-cyan-400 bg-cyan-950/20 border border-cyan-500/20 hover:bg-cyan-950/40 transition-all flex items-center justify-center space-x-1"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Conectarse a Clase (Zoom)</span>
                        </a>
                      )}

                      {course.accessLink && (
                        <a
                          href={course.accessLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 rounded-xl text-[10px] font-bold text-center text-purple-300 bg-purple-950/20 border border-purple-500/20 hover:bg-purple-950/40 transition-all flex items-center justify-center space-x-1"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Aula & Materiales</span>
                        </a>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Tuesday Pagination Buttons */}
            {totalTuesdayPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8 pt-4 border-t border-slate-800/60 text-xs font-bold">
                <button
                  disabled={tuesdayPage === 0}
                  onClick={() => setTuesdayPage(prev => prev - 1)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>
                <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-900 text-slate-400 font-mono">
                  {tuesdayPage + 1} / {totalTuesdayPages}
                </span>
                <button
                  disabled={tuesdayPage >= totalTuesdayPages - 1}
                  onClick={() => setTuesdayPage(prev => prev + 1)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center space-x-1"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        )}

        {/* Regular Catalog Section Header */}
        <div className="border-t border-slate-800 pt-10 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading mb-2">
              Programas y Certificaciones Ejecutivas
            </h3>
            <p className="text-xs text-slate-400">
              Diplomados, Bootcamps y Cursos con certificación CDMP® y acompañamiento experto.
            </p>
          </div>
          {totalCoursePages > 1 && (
            <span className="px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-300 font-mono">
              Página {coursesPage + 1} de {totalCoursePages} ({filteredCourses.length} Programas)
            </span>
          )}
        </div>

        {/* Feature categories pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 text-xs font-bold">
          {['todos', 'dama', 'ia', 'arquitectura'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat as any)}
              className={`px-4 py-2.5 rounded-xl capitalize transition-all ${
                activeCategory === cat 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {cat === 'todos' ? 'Todos los Programas' : cat === 'ia' ? 'Inteligencia Artificial' : cat}
            </button>
          ))}
        </div>

        {/* Course Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paginatedCourses.map((course) => {
            const priceInfo = calculateMasterclassPrice(course, contactInfo);
            return (
              <div
                key={course.id}
                className="glass-panel rounded-3xl p-6 border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between group shadow-xl bg-slate-900/60"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20">
                      {course.category}
                    </span>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors font-heading leading-tight">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {course.description || 'Especialidad académica en Gobierno de Datos.'}
                  </p>

                  <div className="space-y-1.5 text-[11px] text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800 font-mono mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Instructor:</span>
                      <span className="font-bold text-white">{(course as any).instructor?.name || 'Ing. Carlos Cañón'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Modalidad:</span>
                      <span className="font-bold text-slate-350">{course.format || 'Online en Vivo'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Nivel:</span>
                      <span className="font-bold text-slate-350">{course.level || 'Avanzado'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Certificación:</span>
                      <span className="font-bold text-purple-400">{course.certification}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cohorte:</span>
                      <span className="font-bold text-cyan-400">{course.upcomingDate}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800/80 pt-1.5 mt-1.5 font-bold">
                      <span className="text-slate-500">Inversión:</span>
                      {priceInfo.priceType === 'discount' ? (
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[9px] text-slate-500 line-through">
                            ${Number(priceInfo.priceValue || 0).toLocaleString()}
                          </span>
                          <span className="text-emerald-450 font-extrabold">
                            ${Number(priceInfo.discountPriceValue || 0).toLocaleString()}
                          </span>
                        </div>
                      ) : priceInfo.priceType === 'paid' ? (
                        <span className="text-white font-extrabold">
                          ${Number(priceInfo.priceValue || 0).toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-emerald-450 font-extrabold uppercase text-[10px]">
                          Gratuito
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex flex-col space-y-2">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>Preinscribirme</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {course.conferenceLink && (
                    <a
                      href={course.conferenceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 rounded-xl text-[10px] font-bold text-center text-cyan-400 bg-cyan-950/20 border border-cyan-500/20 hover:bg-cyan-950/40 transition-all flex items-center justify-center space-x-1"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Conectarse a Clase (Zoom)</span>
                    </a>
                  )}

                  {course.accessLink && (
                    <a
                      href={course.accessLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 rounded-xl text-[10px] font-bold text-center text-purple-300 bg-purple-950/20 border border-purple-500/20 hover:bg-purple-950/40 transition-all flex items-center justify-center space-x-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Aula & Materiales</span>
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Regular Catalog Pagination Buttons */}
        {totalCoursePages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-12 text-xs font-bold">
            <button
              disabled={coursesPage === 0}
              onClick={() => setCoursesPage(prev => prev - 1)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>
            <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-350 font-mono">
              Página {coursesPage + 1} de {totalCoursePages}
            </span>
            <button
              disabled={coursesPage >= totalCoursePages - 1}
              onClick={() => setCoursesPage(prev => prev + 1)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center space-x-1"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

      {/* Pre-enrollment modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-purple-500/40 rounded-3xl p-6 text-white shadow-2xl relative space-y-4 text-left">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!enrollSuccess ? (
              <div className="space-y-4 text-xs">
                <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
                  <GraduationCap className="w-8 h-8 text-purple-400" />
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">Preinscripción al Programa</h3>
                    <p className="text-[10px] text-purple-400 truncate max-w-xs">{selectedCourse.title}</p>
                  </div>
                </div>

                <form onSubmit={handleEnrollSubmit} className="space-y-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={enrollForm.name}
                      onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                      placeholder="Ej. Carlos Cañón"
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-purple-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={enrollForm.email}
                      onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                      placeholder="carlos@empresa.com"
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Empresa / Institución</label>
                    <input
                      type="text"
                      value={enrollForm.company}
                      onChange={(e) => setEnrollForm({ ...enrollForm, company: e.target.value })}
                      placeholder="Ej. Consultores Expertos SAS"
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-purple-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg mt-2"
                  >
                    Confirmar Preinscripción
                  </button>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white font-heading">¡Preinscripción Registrada!</h4>
                <p className="text-xs text-slate-400">Su cupo tentativo ha sido bloqueado. Un asesor le enviará la propuesta comercial a su correo.</p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
