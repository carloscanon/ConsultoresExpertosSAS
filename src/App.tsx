import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AISection } from './components/AISection';
import { AcademyBanner } from './components/AcademyBanner';
import { GovDataNexusShowcase } from './components/GovDataNexusShowcase';
import { ServicesExplorer } from './components/ServicesExplorer';
import { AcademySection } from './components/AcademySection';
import { CaseStudiesTimeline } from './components/CaseStudiesTimeline';
import { ResourcesAndBlog } from './components/ResourcesAndBlog';
import { DemoModal } from './components/DemoModal';
import { SearchModal } from './components/SearchModal';
import { AICopilotDrawer } from './components/AICopilotDrawer';
import { EnterpriseDXPPortal } from './components/dxp/EnterpriseDXPPortal';
import { Footer } from './components/Footer';

// Vision 2030 Portals
import { ConsultingPortal } from './components/dxp/domains/ConsultingPortal';
import { AcademyPortal } from './components/dxp/domains/AcademyPortal';
import { LegalIntelligencePortal } from './components/dxp/domains/LegalIntelligencePortal';
import { GovDataLabsPortal } from './components/dxp/domains/GovDataLabsPortal';
import { ResearchPortal } from './components/dxp/domains/ResearchPortal';
import { CommunityPortal } from './components/dxp/domains/CommunityPortal';
import { ResourcesPortal } from './components/dxp/domains/ResourcesPortal';
import { SEOGlossaryPortal } from './components/SEOGlossaryPortal';
import { SpecializedAISuite } from './components/SpecializedAISuite';

import { savePageViewTelemetry } from './lib/supabase';
import { DataProvider, useData } from './context/DataContext';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'home' | 'consulting' | 'academy' | 'legal' | 'research' | 'labs' | 'community' | 'resources' | 'contact' | 'glossary'>('home');
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [dxpPortalOpen, setDxpPortalOpen] = useState(false);
  const [demoInitialFocus, setDemoInitialFocus] = useState<string | undefined>(undefined);

  const { sectionOrder, contactInfo } = useData();

  // Secure /nimda hidden admin panel access route effect and legacy URL matching
  useEffect(() => {
    const checkRoutes = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash;
      
      // Admin Panel
      if (path === '/nimda' || path === '/nimda/' || hash === '#nimda' || hash === '#/nimda' || hash.includes('nimda')) {
        setDxpPortalOpen(true);
        window.history.replaceState(null, '', '/');
        return;
      }

      // Legacy SEO routes mapping
      if (path.startsWith('/academia') || path.startsWith('/cursos')) {
        setCurrentTab('academy');
      } else if (path.startsWith('/consultoria') || path.startsWith('/servicios')) {
        setCurrentTab('consulting');
      } else if (path.startsWith('/contacto')) {
        setCurrentTab('contact');
      } else if (path.startsWith('/recursos') || path.startsWith('/blog')) {
        setCurrentTab('resources');
      }
    };
    
    checkRoutes();
    window.addEventListener('popstate', checkRoutes);
    window.addEventListener('hashchange', checkRoutes);
    return () => {
      window.removeEventListener('popstate', checkRoutes);
      window.removeEventListener('hashchange', checkRoutes);
    };
  }, []);

  // Telemetry page view tracker
  useEffect(() => {
    savePageViewTelemetry(`tab_${currentTab}`);
  }, [currentTab]);

  // Auto-scroll to default focus section configured by admin on load
  useEffect(() => {
    if (!window.location.hash) {
      const targetSec = contactInfo.initialScrollSection || 'hero';
      if (targetSec && targetSec !== 'hero') {
        setTimeout(() => {
          const el = document.getElementById(targetSec);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 1200); // Allow rendering and translations to settle
      } else {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'instant' as any });
        }, 300);
      }
    }
  }, [contactInfo.initialScrollSection]);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentTab]);

  const handleOpenDemoWithTopic = (topic?: string) => {
    setDemoInitialFocus(topic);
    setDemoModalOpen(true);
  };

  const handleSelectSearchResult = (_id: string, type: string) => {
    const el = document.getElementById(type);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'hero':
        return (
          <Hero 
            key="hero"
            onOpenDiagnosis={() => handleOpenDemoWithTopic('Diagnóstico Estratégico DAMA')}
            onExploreNexus={() => setCurrentTab('consulting')}
            onTalkExpert={() => handleOpenDemoWithTopic('Consultoría con Experto DXP')}
          />
        );
      case 'ai_features':
        return (
          <AISection 
            key="ai_features"
            onOpenDemo={() => handleOpenDemoWithTopic('IA & Asistente GovData')}
            onOpenAICopilot={() => setCopilotOpen(true)}
          />
        );
      case 'academy_banner':
        return <AcademyBanner key="academy_banner" />;
      case 'govdata_nexus':
        return (
          <GovDataNexusShowcase 
            key="govdata_nexus"
            onOpenDemo={() => handleOpenDemoWithTopic('GovData Nexus Engine Demo')}
          />
        );
      case 'services':
        return (
          <ServicesExplorer 
            key="services"
            onOpenDemo={() => handleOpenDemoWithTopic('Consultoría de Servicios')}
          />
        );
      case 'academy_info':
        return <AcademySection key="academy_info" />;
      case 'specialized_ai':
        return <SpecializedAISuite key="specialized_ai" />;
      case 'case_studies':
        return (
          <CaseStudiesTimeline 
            key="case_studies"
            onOpenDemo={() => handleOpenDemoWithTopic('Casos de Éxito & Benchmark')}
          />
        );
      case 'blog_resources':
        return (
          <ResourcesAndBlog 
            key="blog_resources"
            onOpenDemo={() => handleOpenDemoWithTopic('Descarga de Whitepapers')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <Header 
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        onOpenDemo={() => handleOpenDemoWithTopic()}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      <main className="pt-16">
        {currentTab === 'home' && (
          <>
            {sectionOrder.map(sectionId => renderSection(sectionId))}
          </>
        )}

        {currentTab === 'consulting' && <ConsultingPortal />}
        {currentTab === 'academy' && <AcademyPortal />}
        {currentTab === 'legal' && <LegalIntelligencePortal />}
        {currentTab === 'labs' && <GovDataLabsPortal />}
        {currentTab === 'research' && <ResearchPortal />}
        {currentTab === 'community' && <CommunityPortal />}
        {currentTab === 'resources' && <ResourcesPortal />}
        {currentTab === 'glossary' && <SEOGlossaryPortal />}
        {currentTab === 'contact' && (
          <div className="py-24 bg-slate-950 text-white text-center space-y-6">
            <h2 className="text-3xl font-extrabold font-heading">Contáctenos</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Consolide su Gobierno de Datos con el respaldo de Consultores Expertos SAS.</p>
            <button onClick={() => handleOpenDemoWithTopic('Formulario de Contacto')} className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold shadow-lg shadow-blue-600/30">
              Iniciar Conversación Estratégica
            </button>
          </div>
        )}
      </main>

      <Footer 
        onOpenDemo={() => handleOpenDemoWithTopic()}
        onOpenAICopilot={() => setCopilotOpen(true)}
      />

      <DemoModal 
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialFocus={demoInitialFocus}
      />

      <SearchModal 
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      <AICopilotDrawer 
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
        onOpenDemo={() => handleOpenDemoWithTopic('Consulta desde Copilot IA')}
      />

      <EnterpriseDXPPortal
        isOpen={dxpPortalOpen}
        onClose={() => setDxpPortalOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
