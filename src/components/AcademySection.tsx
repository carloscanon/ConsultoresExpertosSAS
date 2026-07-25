import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import type { Course } from '../types';
import { 
  GraduationCap, 
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';

export const AcademySection: React.FC = () => {
  const { t } = useLanguage();
  const { courses, enrollStudent } = useData();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledCourse, setEnrolledCourse] = useState<Course | null>(null);
  const [enrollForm, setEnrollForm] = useState({ name: '', email: '', company: '' });
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnrollSuccess(true);

    if (enrolledCourse) {
      await enrollStudent({
        courseId: enrolledCourse.id,
        courseTitle: enrolledCourse.title,
        fullName: enrollForm.name,
        email: enrollForm.email,
        company: enrollForm.company,
        paymentStatus: 'Preinscrito',
        cohortDate: enrolledCourse.upcomingDate
      });
    }

    setTimeout(() => {
      setEnrollSuccess(false);
      setEnrolledCourse(null);
      setEnrollForm({ name: '', email: '', company: '' });
    }, 2500);
  };

  return (
    <section id="academy" className="py-24 relative bg-slate-950 text-white border-y border-slate-800 transition-colors overflow-hidden">
      
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>{t('academyBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading mb-4 text-white">
            Formación y Certificaciones Internacionales
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            {t('academySub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/50 transition-all card-hover-tilt flex flex-col justify-between group shadow-2xl bg-slate-900/80 text-white"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {course.category}
                  </span>
                  {course.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {course.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors font-heading">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-6 line-clamp-3">
                  {course.description}
                </p>

                <div className="space-y-2 text-xs text-slate-300 mb-6 bg-slate-950/60 p-3 rounded-xl border border-slate-800 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duración:</span>
                    <span className="font-bold text-white">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Modalidad:</span>
                    <span className="font-bold text-white">{course.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Próxima Cohorte:</span>
                    <span className="font-bold text-cyan-400">{course.upcomingDate}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                    {course.instructor.name.substring(0, 2)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{course.instructor.name}</div>
                    <div className="text-[10px] text-slate-400">{course.instructor.role}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
                  >
                    Ver Contenido
                  </button>
                  <button
                    onClick={() => setEnrolledCourse(course)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 transition-all shadow-lg flex items-center justify-center space-x-1"
                  >
                    <span>Preinscribirme</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/40 shadow-2xl relative space-y-6 bg-slate-900 text-white">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
                {selectedCourse.category}
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-3 font-heading">
                {selectedCourse.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{selectedCourse.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
              <div>
                <span className="text-slate-400">Duración Total:</span>
                <p className="font-bold text-white mt-0.5">{selectedCourse.duration}</p>
              </div>
              <div>
                <span className="text-slate-400">Certificación Otorgada:</span>
                <p className="font-bold text-cyan-400 mt-0.5">{selectedCourse.certification}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Instructor Principal</h5>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                  {selectedCourse.instructor.name.substring(0, 2)}
                </div>
                <div>
                  <h6 className="text-xs font-bold text-white">{selectedCourse.instructor.name}</h6>
                  <p className="text-[11px] text-slate-400">{selectedCourse.instructor.role} • {selectedCourse.instructor.experience}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-cyan-400 font-mono font-bold">Cohorte: {selectedCourse.upcomingDate}</span>
              <button
                onClick={() => {
                  const c = selectedCourse;
                  setSelectedCourse(null);
                  setEnrolledCourse(c);
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:scale-105 transition-all shadow-lg"
              >
                Reservar Cupo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pre-enrollment Form Modal */}
      {enrolledCourse && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/40 shadow-2xl relative space-y-6 bg-slate-900 text-white">
            <button
              onClick={() => setEnrolledCourse(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!enrollSuccess ? (
              <form onSubmit={handleEnrollSubmit} className="space-y-4 text-left">
                <div>
                  <span className="text-xs font-bold uppercase text-cyan-400">Preinscripción a Cohorte</span>
                  <h3 className="text-xl font-bold text-white font-heading mt-1">
                    {enrolledCourse.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Inicio: {enrolledCourse.upcomingDate}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Nombre Completo *</label>
                  <input
                    required
                    type="text"
                    value={enrollForm.name}
                    onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                    placeholder="Ej. Ing. Carlos Cañón"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Correo Corporativo *</label>
                  <input
                    required
                    type="email"
                    value={enrollForm.email}
                    onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                    placeholder="tu.correo@empresa.com"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Empresa / Organización</label>
                  <input
                    type="text"
                    value={enrollForm.company}
                    onChange={(e) => setEnrollForm({ ...enrollForm, company: e.target.value })}
                    placeholder="Ej. Consultores Expertos SAS"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:scale-105 transition-all shadow-lg"
                >
                  Confirmar Preinscripción
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white">¡Preinscripción Exitosa!</h3>
                <p className="text-xs text-slate-300">
                  Te enviamos la información detallada del programa y los métodos de pago a tu correo.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
