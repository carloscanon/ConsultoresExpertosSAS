import React from 'react';
import { 
  GraduationCap, 
  Users, 
  Award, 
  UserCheck, 
  ArrowRight
} from 'lucide-react';

interface AcademyBannerProps {
  onOpenDemo?: () => void;
}

export const AcademyBanner: React.FC<AcademyBannerProps> = () => {
  const handleScrollToAcademy = () => {
    const el = document.getElementById('academy');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text */}
          <div className="lg:col-span-6 space-y-3 text-left relative z-10">
            <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Potencia tu Carrera en Datos
            </h3>
            <p className="text-sm sm:text-base text-blue-100 max-w-lg">
              Con nuestra academia especializada en Gobierno de Datos, Analítica e IA.
            </p>
            <div className="pt-2">
              <button
                onClick={handleScrollToAcademy}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-blue-700 bg-white hover:bg-blue-50 transition-colors shadow-lg flex items-center space-x-2"
              >
                <span>Explorar Academia</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right 4 Stats Pills */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
            
            <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center">
              <Users className="w-5 h-5 text-cyan-300 mx-auto mb-1" />
              <div className="text-xl font-extrabold font-mono text-white">50+</div>
              <div className="text-[11px] text-blue-100 font-medium">Cursos</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center">
              <GraduationCap className="w-5 h-5 text-emerald-300 mx-auto mb-1" />
              <div className="text-xl font-extrabold font-mono text-white">5000+</div>
              <div className="text-[11px] text-blue-100 font-medium">Estudiantes</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center">
              <Award className="w-5 h-5 text-amber-300 mx-auto mb-1" />
              <div className="text-xl font-extrabold font-mono text-white">100+</div>
              <div className="text-[11px] text-blue-100 font-medium">Certificaciones</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center">
              <UserCheck className="w-5 h-5 text-purple-300 mx-auto mb-1" />
              <div className="text-xl font-extrabold font-mono text-white">20+</div>
              <div className="text-[11px] text-blue-100 font-medium">Instructores Expertos</div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
