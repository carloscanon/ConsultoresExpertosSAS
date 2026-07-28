import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { saveSiteConfigurationInDb } from '../lib/supabase';

// 9 Available Themes for Consultores Expertos SAS Enterprise DXP
export type ThemeId = 
  | 'dark_obsidian'      // Deep Obsidian Black
  | 'midnight_indigo'    // Deep Navy Blue + Indigo
  | 'emerald_slate'      // Dark Slate + Emerald Corporate
  | 'govdata_cyan'       // GovData Brand: Dark + Cyan
  | 'executive_grey'     // Premium Charcoal + Silver Executive
  | 'light_corporate'    // Pure White Corporate (Light Mode 1)
  | 'light_clean_blue'   // Clean Ice Blue (Light Mode 2)
  | 'light_emerald_mint' // Emerald Mint (Light Mode 3)
  | 'light_minimal_sand';// Warm Minimal Sand (Light Mode 4)

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  description: string;
  preview: { bg: string; card: string; accent: string; text: string };
  isDefault?: boolean;
  tags: string[];
}

export const THEMES: ThemeDefinition[] = [
  {
    id: 'dark_obsidian',
    name: 'Obsidian Dark',
    description: 'Tema oscuro signature de Consultores Expertos SAS. Fondo negro profundo con acentos cyan y glow azul premium.',
    preview: { bg: '#02040a', card: '#080e1a', accent: '#06B6D4', text: '#F8FAFC' },
    isDefault: true,
    tags: ['Default', 'Dark', 'Premium', 'GovData']
  },
  {
    id: 'midnight_indigo',
    name: 'Midnight Indigo',
    description: 'Azul marino profundo con acentos índigo violeta. Elegancia ejecutiva para presentaciones corporativas.',
    preview: { bg: '#080b11', card: '#111827', accent: '#6366F1', text: '#EEF2FF' },
    isDefault: false,
    tags: ['Dark', 'Corporate', 'Executive']
  },
  {
    id: 'emerald_slate',
    name: 'Emerald Slate',
    description: 'Pizarra oscura con acentos esmeralda. Transmite confianza y solidez financiera y de datos.',
    preview: { bg: '#050807', card: '#0d110e', accent: '#10B981', text: '#F0FDF4' },
    isDefault: false,
    tags: ['Dark', 'Finance', 'Data Quality']
  },
  {
    id: 'govdata_cyan',
    name: 'GovData Nexus™',
    description: 'Tema oficial de la plataforma GovData Nexus™. Identidad de marca con cyan brillante sobre azul espacial.',
    preview: { bg: '#010813', card: '#041224', accent: '#22D3EE', text: '#E0F2FE' },
    isDefault: false,
    tags: ['Dark', 'GovData Brand', 'SaaS']
  },
  {
    id: 'executive_grey',
    name: 'Executive Charcoal',
    description: 'Carbón ejecutivo premium con plata y blanco. Diseñado para entornos corporativos de alta dirección.',
    preview: { bg: '#121212', card: '#1a1a1a', accent: '#E5E7EB', text: '#F9FAFB' },
    isDefault: false,
    tags: ['Dark', 'Minimal', 'Enterprise']
  },
  {
    id: 'light_corporate',
    name: 'White Corporate',
    description: 'Modo claro corporativo puro con azul ejecutivo. Ideal para presentaciones externas y propuestas comerciales.',
    preview: { bg: '#FFFFFF', card: '#F1F5F9', accent: '#2563EB', text: '#0F172A' },
    isDefault: false,
    tags: ['Light', 'Corporate', 'Presentation']
  },
  {
    id: 'light_clean_blue',
    name: 'Clean Ice Blue',
    description: 'Azul helado muy claro y fresco con acentos de color azul rey. Limpieza visual, frescura y legibilidad.',
    preview: { bg: '#F0F4F8', card: '#FFFFFF', accent: '#2563EB', text: '#0F172A' },
    isDefault: false,
    tags: ['Light', 'Tech', 'Clean']
  },
  {
    id: 'light_emerald_mint',
    name: 'Emerald Mint',
    description: 'Fondo menta sumamente claro y fresco con verde esmeralda. Ideal para consultoría ambiental y de calidad.',
    preview: { bg: '#F4FBF7', card: '#FFFFFF', accent: '#059669', text: '#062F22' },
    isDefault: false,
    tags: ['Light', 'Mint', 'Sustainability']
  },
  {
    id: 'light_minimal_sand',
    name: 'Warm Executive Sand',
    description: 'Fondo arena cálido y elegante con acentos bronce/tierra. Estilo editorial minimalista de alta gama.',
    preview: { bg: '#FAF9F6', card: '#FFFFFF', accent: '#8C7853', text: '#2C2518' },
    isDefault: false,
    tags: ['Light', 'Sand', 'Minimal']
  }
];

interface ThemeContextType {
  theme: ThemeId;
  toggleTheme: () => void;
  setTheme: (id: ThemeId) => void;
  currentThemeDef: ThemeDefinition;
  isLight: boolean;
  logoUrl: string;
  logoSize: number;
  logoHeight: number;
  logoWidth: number;
  mobileLogoSize: number;
  mobileLogoHeight: number;
  mobileLogoWidth: number;
  setLogoUrl: (url: string, skipDb?: boolean) => void;
  setLogoSize: (size: number, skipDb?: boolean) => void;
  setLogoHeight: (height: number) => void;
  setLogoWidth: (width: number) => void;
  setMobileLogoSize: (size: number) => void;
  setMobileLogoHeight: (height: number) => void;
  setMobileLogoWidth: (width: number) => void;
  saveLogoConfigurationToDb: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Apply CSS custom properties for each theme
function applyTheme(themeId: ThemeId) {
  const root = document.documentElement;
  
  // Remove all theme classes first
  root.classList.remove('dark', 'light', 
    'theme-dark-obsidian', 'theme-midnight-indigo', 'theme-emerald-slate',
    'theme-govdata-cyan', 'theme-executive-grey', 'theme-light-corporate',
    'theme-light-clean-blue', 'theme-light-emerald-mint', 'theme-light-minimal-sand');

  switch (themeId) {
    case 'dark_obsidian':
      root.classList.add('dark', 'theme-dark-obsidian');
      root.style.setProperty('--dxp-bg', '#02040a');
      root.style.setProperty('--dxp-bg2', '#070b13');
      root.style.setProperty('--dxp-card', 'rgba(8, 14, 26, 0.85)');
      root.style.setProperty('--dxp-border', 'rgba(6, 182, 212, 0.15)');
      root.style.setProperty('--dxp-accent', '#06b6d4');
      root.style.setProperty('--dxp-accent2', '#3b82f6');
      root.style.setProperty('--dxp-text', '#f0f3f8');
      root.style.setProperty('--dxp-text-muted', '#8a99ad');
      root.style.setProperty('--dxp-glow', 'rgba(6, 182, 212, 0.3)');
      break;

    case 'midnight_indigo':
      root.classList.add('dark', 'theme-midnight-indigo');
      root.style.setProperty('--dxp-bg', '#080b11');
      root.style.setProperty('--dxp-bg2', '#0f131a');
      root.style.setProperty('--dxp-card', 'rgba(20, 20, 35, 0.9)');
      root.style.setProperty('--dxp-border', 'rgba(99, 102, 241, 0.22)');
      root.style.setProperty('--dxp-accent', '#6366f1');
      root.style.setProperty('--dxp-accent2', '#4f46e5');
      root.style.setProperty('--dxp-text', '#f8fafc');
      root.style.setProperty('--dxp-text-muted', '#a5b4fc');
      root.style.setProperty('--dxp-glow', 'rgba(99, 102, 241, 0.25)');
      break;

    case 'emerald_slate':
      root.classList.add('dark', 'theme-emerald-slate');
      root.style.setProperty('--dxp-bg', '#050807');
      root.style.setProperty('--dxp-bg2', '#0b110e');
      root.style.setProperty('--dxp-card', 'rgba(13, 22, 18, 0.95)');
      root.style.setProperty('--dxp-border', 'rgba(16, 185, 129, 0.25)');
      root.style.setProperty('--dxp-accent', '#10b981');
      root.style.setProperty('--dxp-accent2', '#059669');
      root.style.setProperty('--dxp-text', '#e6f7ec');
      root.style.setProperty('--dxp-text-muted', '#82cfa2');
      root.style.setProperty('--dxp-glow', 'rgba(16, 185, 129, 0.25)');
      break;

    case 'govdata_cyan':
      root.classList.add('dark', 'theme-govdata-cyan');
      root.style.setProperty('--dxp-bg', '#010813');
      root.style.setProperty('--dxp-bg2', '#041224');
      root.style.setProperty('--dxp-card', 'rgba(6, 21, 40, 0.88)');
      root.style.setProperty('--dxp-border', 'rgba(34, 211, 238, 0.3)');
      root.style.setProperty('--dxp-accent', '#22d3ee');
      root.style.setProperty('--dxp-accent2', '#0284c7');
      root.style.setProperty('--dxp-text', '#e0f2fe');
      root.style.setProperty('--dxp-text-muted', '#64b5f6');
      root.style.setProperty('--dxp-glow', 'rgba(34, 211, 238, 0.4)');
      break;

    case 'executive_grey':
      root.classList.add('dark', 'theme-executive-grey');
      root.style.setProperty('--dxp-bg', '#121212');
      root.style.setProperty('--dxp-bg2', '#1a1a1a');
      root.style.setProperty('--dxp-card', '#242424');
      root.style.setProperty('--dxp-border', 'rgba(255, 255, 255, 0.12)');
      root.style.setProperty('--dxp-accent', '#E5E7EB');
      root.style.setProperty('--dxp-accent2', '#9CA3AF');
      root.style.setProperty('--dxp-text', '#F9FAFB');
      root.style.setProperty('--dxp-text-muted', '#a1a1a6');
      root.style.setProperty('--dxp-glow', 'rgba(255, 255, 255, 0.1)');
      break;

    case 'light_corporate':
      root.classList.add('light', 'theme-light-corporate');
      root.style.setProperty('--dxp-bg', '#ffffff');
      root.style.setProperty('--dxp-bg2', '#f8fafc');
      root.style.setProperty('--dxp-card', 'rgba(241, 245, 249, 0.95)');
      root.style.setProperty('--dxp-border', 'rgba(15, 23, 42, 0.08)');
      root.style.setProperty('--dxp-accent', '#2563eb');
      root.style.setProperty('--dxp-accent2', '#1d4ed8');
      root.style.setProperty('--dxp-text', '#0f172a');
      root.style.setProperty('--dxp-text-muted', '#475569');
      root.style.setProperty('--dxp-glow', 'rgba(37, 99, 235, 0.12)');
      break;

    case 'light_clean_blue':
      root.classList.add('light', 'theme-light-clean-blue');
      root.style.setProperty('--dxp-bg', '#F0F4F8');
      root.style.setProperty('--dxp-bg2', '#E2E8F0');
      root.style.setProperty('--dxp-card', '#FFFFFF');
      root.style.setProperty('--dxp-border', 'rgba(37, 99, 235, 0.1)');
      root.style.setProperty('--dxp-accent', '#2563EB');
      root.style.setProperty('--dxp-accent2', '#3B82F6');
      root.style.setProperty('--dxp-text', '#0F172A');
      root.style.setProperty('--dxp-text-muted', '#475569');
      root.style.setProperty('--dxp-glow', 'rgba(37, 99, 235, 0.08)');
      break;

    case 'light_emerald_mint':
      root.classList.add('light', 'theme-light-emerald-mint');
      root.style.setProperty('--dxp-bg', '#F4FBF7');
      root.style.setProperty('--dxp-bg2', '#E6F4EA');
      root.style.setProperty('--dxp-card', '#FFFFFF');
      root.style.setProperty('--dxp-border', 'rgba(5, 150, 105, 0.12)');
      root.style.setProperty('--dxp-accent', '#059669');
      root.style.setProperty('--dxp-accent2', '#10B981');
      root.style.setProperty('--dxp-text', '#062F22');
      root.style.setProperty('--dxp-text-muted', '#1E6B52');
      root.style.setProperty('--dxp-glow', 'rgba(5, 150, 105, 0.08)');
      break;

    case 'light_minimal_sand':
      root.classList.add('light', 'theme-light-minimal-sand');
      root.style.setProperty('--dxp-bg', '#FAF9F6');
      root.style.setProperty('--dxp-bg2', '#F5F2EB');
      root.style.setProperty('--dxp-card', '#FFFFFF');
      root.style.setProperty('--dxp-border', 'rgba(140, 120, 83, 0.12)');
      root.style.setProperty('--dxp-accent', '#8C7853');
      root.style.setProperty('--dxp-accent2', '#A3906B');
      root.style.setProperty('--dxp-text', '#2C2518');
      root.style.setProperty('--dxp-text-muted', '#60523C');
      root.style.setProperty('--dxp-glow', 'rgba(140, 120, 83, 0.08)');
      break;
  }
}

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('dxp_theme') as ThemeId;
    const validIds: ThemeId[] = [
      'dark_obsidian', 'midnight_indigo', 'emerald_slate', 'govdata_cyan', 'executive_grey', 
      'light_corporate', 'light_clean_blue', 'light_emerald_mint', 'light_minimal_sand'
    ];
    if (saved && validIds.includes(saved)) return saved;
    return 'dark_obsidian'; // Default: Obsidian Dark
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('dxp_theme', theme);
  }, [theme]);

  const setTheme = (id: ThemeId) => {
    setThemeState(id);
  };

  const toggleTheme = () => {
    setThemeState(prev => {
      if (prev === 'light_corporate') return 'dark_obsidian';
      if (prev === 'light_clean_blue') return 'dark_obsidian';
      if (prev === 'light_emerald_mint') return 'dark_obsidian';
      if (prev === 'light_minimal_sand') return 'dark_obsidian';
      return 'light_corporate';
    });
  };

  const currentThemeDef = THEMES.find(t => t.id === theme) || THEMES[0];
  const isLight = theme.startsWith('light_');

  const [logoUrl, setLogoUrlState] = useState<string>(() => {
    return localStorage.getItem('dxp_logo_url') || '';
  });

  const [logoSize, setLogoSizeState] = useState<number>(() => {
    const saved = localStorage.getItem('dxp_logo_size');
    return saved ? parseInt(saved, 10) : 180;
  });

  const setLogoUrl = (url: string, skipDb = false) => {
    setLogoUrlState(url);
    localStorage.setItem('dxp_logo_url', url);
    if (skipDb) return;
    saveLogoConfigurationToDb().catch(console.warn);
  };

  const setLogoSize = (size: number, skipDb = false) => {
    setLogoSizeState(size);
    localStorage.setItem('dxp_logo_size', String(size));
    if (skipDb) return;
    saveLogoConfigurationToDb().catch(console.warn);
  };

  const [logoHeight, setLogoHeightState] = useState<number>(() => {
    const saved = localStorage.getItem('dxp_logo_height');
    return saved ? parseInt(saved, 10) : 56;
  });

  const [logoWidth, setLogoWidthState] = useState<number>(() => {
    const saved = localStorage.getItem('dxp_logo_width');
    return saved ? parseInt(saved, 10) : 100; // pct
  });

  const [mobileLogoSize, setMobileLogoSizeState] = useState<number>(() => {
    const saved = localStorage.getItem('dxp_mobile_logo_size');
    return saved ? parseInt(saved, 10) : 140;
  });

  const [mobileLogoHeight, setMobileLogoHeightState] = useState<number>(() => {
    const saved = localStorage.getItem('dxp_mobile_logo_height');
    return saved ? parseInt(saved, 10) : 44;
  });

  const [mobileLogoWidth, setMobileLogoWidthState] = useState<number>(() => {
    const saved = localStorage.getItem('dxp_mobile_logo_width');
    return saved ? parseInt(saved, 10) : 100;
  });

  const setLogoHeight = (height: number, skipDb = false) => {
    setLogoHeightState(height);
    localStorage.setItem('dxp_logo_height', String(height));
    if (skipDb) return;
    saveLogoConfigurationToDb().catch(console.warn);
  };

  const setLogoWidth = (width: number, skipDb = false) => {
    setLogoWidthState(width);
    localStorage.setItem('dxp_logo_width', String(width));
    if (skipDb) return;
    saveLogoConfigurationToDb().catch(console.warn);
  };

  const setMobileLogoSize = (size: number, skipDb = false) => {
    setMobileLogoSizeState(size);
    localStorage.setItem('dxp_mobile_logo_size', String(size));
    if (skipDb) return;
    saveLogoConfigurationToDb().catch(console.warn);
  };

  const setMobileLogoHeight = (height: number, skipDb = false) => {
    setMobileLogoHeightState(height);
    localStorage.setItem('dxp_mobile_logo_height', String(height));
    if (skipDb) return;
    saveLogoConfigurationToDb().catch(console.warn);
  };

  const setMobileLogoWidth = (width: number, skipDb = false) => {
    setMobileLogoWidthState(width);
    localStorage.setItem('dxp_mobile_logo_width', String(width));
    if (skipDb) return;
    saveLogoConfigurationToDb().catch(console.warn);
  };

  const saveLogoConfigurationToDb = async () => {
    const savedContact = localStorage.getItem('dxp_contact_info');
    const contact = savedContact ? JSON.parse(savedContact) : {
      companyName: 'Consultores Expertos SAS',
      companyNit: '900452089-9',
      email: 'info@consultoresexpertos.com',
      phone: '+57 300 123 4567',
      whatsapp: '573001234567',
      address: 'Bogotá, Colombia',
      metaDescription: 'Consultoría, Inteligencia Artificial, Arquitectura Empresarial, Academia y Cumplimiento Normativo.',
      metaKeywords: 'Gobierno de Datos, Inteligencia Artificial, DAMA',
      initialScrollSection: 'hero',
      earlyBirdDays: 8,
      earlyBirdRegularPrice: 150000,
      earlyBirdDiscount: 99000,
      masterclassPageSize: 3,
      coursePageSize: 6
    };
    await saveSiteConfigurationInDb(
      contact, 
      logoUrl, 
      logoSize, 
      logoHeight, 
      logoWidth, 
      mobileLogoSize, 
      mobileLogoHeight, 
      mobileLogoWidth
    );
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      setTheme, 
      currentThemeDef, 
      isLight,
      logoUrl,
      logoSize,
      logoHeight,
      logoWidth,
      mobileLogoSize,
      mobileLogoHeight,
      mobileLogoWidth,
      setLogoUrl,
      setLogoSize,
      setLogoHeight,
      setLogoWidth,
      setMobileLogoSize,
      setMobileLogoHeight,
      setMobileLogoWidth,
      saveLogoConfigurationToDb
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
