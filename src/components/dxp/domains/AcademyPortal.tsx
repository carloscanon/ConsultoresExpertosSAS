import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { 
  GraduationCap, 
  ArrowRight,
  CheckCircle,
  ExternalLink,
  X
} from 'lucide-react';

export const AcademyPortal: React.FC = () => {
  const { courses, enrollStudent } = useData();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [enrollForm, setEnrollForm] = useState({ name: '', email: '', company: '' });
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'todos' | 'dama' | 'ia' | 'arquitectura'>('todos');

  const filteredCourses = activeCategory === 'todos' 
    ? courses 
    : courses.filter(c => {
        const cat = c.category.toLowerCase();
        if (activeCategory === 'dama') return cat.includes('dama') || cat.includes('gobernanza');
        if (activeCategory === 'ia') return cat.includes('ia') || cat.includes('artificial') || cat.includes('inteligencia');
        if (activeCategory === 'arquitectura') return cat.includes('arquitectura') || cat.includes('datos');
        return true;
      });

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
              href="https://masterclass.online"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold text-purple-300 bg-purple-500/10 border border-purple-500/25 hover:bg-purple-500/20 transition-all flex items-center space-x-1.5"
            >
              <span>Ir a MasterClass.online</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Feature categories pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 text-xs font-bold">
          {['todos', 'dama', 'ia', 'arquitectura'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
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
          {filteredCourses.map((course) => (
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
                    <span className="text-slate-500">Certificación:</span>
                    <span className="font-bold text-purple-400">{course.certification}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cohorte:</span>
                    <span className="font-bold text-cyan-400">{course.upcomingDate}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center space-x-2">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Preinscribirme</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

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
