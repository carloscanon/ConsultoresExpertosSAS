import React, { useState } from 'react';
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

import { DataProvider } from './context/DataContext';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'home' | 'consulting' | 'academy' | 'legal' | 'research' | 'labs' | 'community' | 'resources' | 'contact' | 'glossary'>('home');
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [dxpPortalOpen, setDxpPortalOpen] = useState(false);
  const [demoInitialFocus, setDemoInitialFocus] = useState<string | undefined>(undefined);

  const handleOpenDemoWithTopic = (topic?: string) => {
    setDemoInitialFocus(topic);
    setDemoModalOpen(true);
  };

  const handleSelectSearchResult = (_id: string, type: string) => {
    const el = document.getElementById(type);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <Header 
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        onOpenDemo={() => handleOpenDemoWithTopic()}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenAICopilot={() => setCopilotOpen(true)}
        onOpenCMSAdmin={() => setDxpPortalOpen(true)}
      />

      <main className="pt-16">
        {currentTab === 'home' && (
          <>
            <Hero 
              onOpenDiagnosis={() => handleOpenDemoWithTopic('Diagnóstico Estratégico DAMA')}
              onExploreNexus={() => setCurrentTab('consulting')}
              onTalkExpert={() => handleOpenDemoWithTopic('Consultoría con Experto DXP')}
            />
            <AISection 
              onOpenDemo={() => handleOpenDemoWithTopic('IA & Asistente GovData')}
              onOpenAICopilot={() => setCopilotOpen(true)}
            />
            <AcademyBanner />
            <GovDataNexusShowcase 
              onOpenDemo={() => handleOpenDemoWithTopic('GovData Nexus Engine Demo')}
            />
            <ServicesExplorer 
              onOpenDemo={() => handleOpenDemoWithTopic('Consultoría de Servicios')}
            />
            <AcademySection />
            <SpecializedAISuite />
            <CaseStudiesTimeline 
              onOpenDemo={() => handleOpenDemoWithTopic('Casos de Éxito & Benchmark')}
            />
            <ResourcesAndBlog 
              onOpenDemo={() => handleOpenDemoWithTopic('Descarga de Whitepapers')}
            />
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
