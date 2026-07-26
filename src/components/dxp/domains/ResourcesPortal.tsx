import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { 
  FileText, 
  Video as VideoIcon, 
  Volume2, 
  BookMarked, 
  Search,
  Download,
  Play,
  Info,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const ResourcesPortal: React.FC = () => {
  const { resources, contactInfo } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  // Helper to extract YouTube video ID and get thumbnail (prefers maxresdefault for HD, falls back to hqdefault)
  const getYoutubeThumbnail = (url: string) => {
    if (!url) return '';
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
    const match = url.match(regExp) || url.match(/v=([\w-]{11})/);
    if (match && match[1]) {
      // Use maxresdefault for crisp HD, browser will display hqdefault if 404
      return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
    }
    return '';
  };

  // Helper to extract YouTube embed URL
  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
    }
    const secondaryMatch = url.match(/v=([\w-]{11})/);
    if (secondaryMatch && secondaryMatch[1]) {
      return `https://www.youtube.com/embed/${secondaryMatch[1]}?autoplay=1`;
    }
    return '';
  };

  const getFallbackGradient = (type: string) => {
    if (type === 'video') return 'from-cyan-950 via-cyan-900 to-indigo-950';
    if (type === 'podcast') return 'from-indigo-950 via-purple-950 to-slate-950';
    if (type === 'template') return 'from-emerald-950 via-teal-900 to-slate-950';
    return 'from-purple-950 via-blue-950 to-slate-950';
  };

  const getIcon = (type: string) => {
    if (type === 'video') return <VideoIcon className="w-8 h-8 text-cyan-400" />;
    if (type === 'podcast') return <Volume2 className="w-8 h-8 text-indigo-400" />;
    if (type === 'template') return <BookMarked className="w-8 h-8 text-emerald-400" />;
    return <FileText className="w-8 h-8 text-purple-400" />;
  };

  // Filter resources based on query
  const searchedResources = resources.filter(item => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Categorize for Netflix Rows
  const videos = searchedResources.filter(item => item.type === 'video');
  const whitepapers = searchedResources.filter(item => item.type === 'whitepaper');
  const templates = searchedResources.filter(item => item.type === 'template');
  const podcasts = searchedResources.filter(item => item.type === 'podcast');

  const [heroIndex, setHeroIndex] = useState(0);

  // Featured Banner Resources (Resources marked as featured, or falling back to searched ones)
  const featuredResourcesList = searchedResources.filter(item => item.featured).length > 0
    ? searchedResources.filter(item => item.featured)
    : searchedResources;

  const currentHero = featuredResourcesList[heroIndex % featuredResourcesList.length] || searchedResources[0];

  const handlePrevHero = () => {
    setHeroIndex(prev => (prev - 1 + featuredResourcesList.length) % featuredResourcesList.length);
  };

  const handleNextHero = () => {
    setHeroIndex(prev => (prev + 1) % featuredResourcesList.length);
  };

  const handleAccessResource = (item: any) => {
    const embed = getYoutubeEmbedUrl(item.redirectUrl);
    if (item.type === 'video' && embed) {
      setActiveVideoUrl(embed);
    } else if (item.redirectUrl) {
      window.open(item.redirectUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // 3-by-3 Pagination State for Videos (Matching Academy/Course functionality)
  const [videoPage, setVideoPage] = useState(0);
  const pageSize = 3;
  const totalVideoPages = Math.ceil(videos.length / pageSize);
  const paginatedVideos = videos.slice(videoPage * pageSize, (videoPage + 1) * pageSize);

  return (
    <div className="bg-[#141414] text-white min-h-screen text-left pb-24 font-sans selection:bg-red-600 selection:text-white">
      
      {/* Netflix Hero Carousel Banner */}
      {currentHero && (
        <div 
          className="relative w-full overflow-hidden bg-black select-none group/hero transition-all duration-300" 
          style={{ 
            marginTop: `${contactInfo.heroMarginTop ?? 0}px`,
            height: `${contactInfo.heroHeight ?? 480}px` 
          }}
        >
          {/* Cover image or gradient */}
          <div className="absolute inset-0 transition-all duration-700">
            {(currentHero as any).imageUrl ? (
              <img 
                key={currentHero.id}
                src={(currentHero as any).imageUrl} 
                alt={currentHero.title} 
                className="w-full h-full object-cover object-center opacity-95 transition-all duration-700 animate-in fade-in duration-500" 
              />
            ) : getYoutubeThumbnail(currentHero.redirectUrl) ? (
              <img 
                key={currentHero.id}
                src={getYoutubeThumbnail(currentHero.redirectUrl)} 
                alt={currentHero.title} 
                onError={(e) => {
                  // Fallback to hqdefault if maxresdefault 404s
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes('maxresdefault.jpg')) {
                    target.src = target.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
                  }
                }}
                className="w-full h-full object-cover object-center opacity-90 transition-all duration-700 animate-in fade-in duration-500" 
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-tr ${getFallbackGradient(currentHero.type)} opacity-85`} />
            )}
            {/* Gradient overlays — Netflix Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent z-10" />
          </div>

          {/* Carousel Navigation Arrows */}
          {featuredResourcesList.length > 1 && (
            <>
              <button 
                onClick={handlePrevHero}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-red-600/90 transition-all backdrop-blur-sm opacity-0 group-hover/hero:opacity-100"
                title="Anterior Recurso Destacado"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={handleNextHero}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-red-600/90 transition-all backdrop-blur-sm opacity-0 group-hover/hero:opacity-100"
                title="Siguiente Recurso Destacado"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Featured Content Details — shifted right for comfortable margins and no clipping */}
          <div className="absolute left-10 sm:left-16 lg:left-20 bottom-10 sm:bottom-14 z-20 max-w-xl sm:max-w-2xl space-y-3 pr-12">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-red-600 text-[10px] font-extrabold uppercase tracking-wider shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>Destacado Premium</span>
              </span>
              {featuredResourcesList.length > 1 && (
                <span className="text-[10px] font-mono text-slate-300">
                  {heroIndex % featuredResourcesList.length + 1} de {featuredResourcesList.length}
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight drop-shadow-xl text-white">
              {currentHero.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed drop-shadow-md max-w-xl">
              {currentHero.description}
            </p>

            <div className="flex items-center space-x-3 pt-1">
              <button 
                onClick={() => handleAccessResource(currentHero)}
                className="px-5 py-2 rounded-md bg-white text-black font-extrabold text-xs sm:text-sm flex items-center space-x-2 hover:bg-slate-200 transition-all active:scale-95 shadow-md"
              >
                {currentHero.type === 'video' && getYoutubeEmbedUrl(currentHero.redirectUrl) ? (
                  <>
                    <Play className="w-4 h-4 fill-black" />
                    <span>Reproducir</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Acceder</span>
                  </>
                )}
              </button>
              {currentHero.redirectUrl && (
                <a 
                  href={currentHero.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md bg-slate-500/30 text-white border border-slate-500/25 font-bold text-xs sm:text-sm flex items-center space-x-1.5 hover:bg-slate-500/50 transition-all"
                >
                  <Info className="w-4 h-4" />
                  <span>Ver Más</span>
                </a>
              )}
            </div>

            {/* Dots Indicator */}
            {featuredResourcesList.length > 1 && (
              <div className="flex items-center space-x-1.5 pt-2">
                {featuredResourcesList.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === (heroIndex % featuredResourcesList.length)
                        ? 'w-6 bg-red-600'
                        : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12 relative z-20">
        
        {/* Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="text-left">
            <h2 className="text-2xl font-extrabold text-white">Ecosistema Multimedia</h2>
            <p className="text-xs text-slate-400">Canal exclusivo de transferencia de conocimiento para el CDO.</p>
          </div>

          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVideoPage(0);
              }}
              placeholder="Buscar título o descripción..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-red-600 transition-all"
            />
          </div>
        </div>

        {/* NETFLIX CATEGORY ROWS */}

        {/* Row 1: Videos (Paginated 3-by-3) */}
        {videos.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-350 flex items-center space-x-2">
                <span className="w-1 h-4 bg-red-600 rounded-full" />
                <span>🎬 Grabaciones y Videos Técnicos ({videos.length})</span>
              </h3>

              {/* 3-by-3 Pagination Controls */}
              {totalVideoPages > 1 && (
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-mono text-slate-400">
                    Página {videoPage + 1} de {totalVideoPages}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setVideoPage(prev => Math.max(0, prev - 1))}
                      disabled={videoPage === 0}
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-all"
                      title="Página Anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setVideoPage(prev => Math.min(totalVideoPages - 1, prev + 1))}
                      disabled={videoPage >= totalVideoPages - 1}
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-all"
                      title="Siguiente Página"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3 Grid Columns (3 en 3) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paginatedVideos.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleAccessResource(item)}
                  className="flex flex-col group cursor-pointer"
                >
                  {/* Poster Box */}
                  <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-805 group-hover:border-red-600 group-hover:scale-102 transition-all relative shadow-lg select-none">
                    {/* Thumbnail Image — custom imageUrl > YouTube auto > gradient */}
                    {(item as any).imageUrl ? (
                      <img 
                        src={(item as any).imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-all duration-500" 
                      />
                    ) : getYoutubeThumbnail(item.redirectUrl) ? (
                      <img 
                        src={getYoutubeThumbnail(item.redirectUrl)} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-500" 
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-tr ${getFallbackGradient(item.type)} flex items-center justify-center p-4`}>
                        {getIcon(item.type)}
                      </div>
                    )}

                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-4.5 h-4.5 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Text underneath */}
                  <div className="text-left mt-2 space-y-0.5">
                    <div className="flex items-center justify-between text-[8px] text-slate-500 font-mono">
                      <span className="uppercase font-bold text-red-500">{item.type}</span>
                      <span>{item.durationOrSize}</span>
                    </div>
                    <h4 className="text-[11px] font-bold text-white group-hover:text-red-500 transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Row 2: Whitepapers */}
        {whitepapers.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-350 flex items-center space-x-2">
              <span className="w-1 h-4 bg-red-600 rounded-full" />
              <span>📄 Whitepapers y Informes Especializados ({whitepapers.length})</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whitepapers.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleAccessResource(item)}
                  className="flex flex-col group cursor-pointer"
                >
                  {/* Poster Box */}
                  <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-805 group-hover:border-red-600 group-hover:scale-102 transition-all relative shadow-lg select-none">
                    {(item as any).imageUrl ? (
                      <img 
                        src={(item as any).imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-all duration-500" 
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-tr ${getFallbackGradient(item.type)} flex items-center justify-center p-4`}>
                        {getIcon(item.type)}
                      </div>
                    )}

                    {/* Download Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Download className="w-4.5 h-4.5" />
                      </div>
                    </div>
                  </div>

                  {/* Text underneath */}
                  <div className="text-left mt-2 space-y-0.5">
                    <div className="flex items-center justify-between text-[8px] text-slate-500 font-mono">
                      <span className="uppercase font-bold text-red-500">{item.type}</span>
                      <span>{item.durationOrSize}</span>
                    </div>
                    <h4 className="text-[11px] font-bold text-white group-hover:text-red-500 transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Row 3: Templates */}
        {templates.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-350 flex items-center space-x-2">
              <span className="w-1 h-4 bg-red-600 rounded-full" />
              <span>🛠️ Checklists y Plantillas de Trabajo ({templates.length})</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleAccessResource(item)}
                  className="flex flex-col group cursor-pointer"
                >
                  {/* Poster Box */}
                  <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-805 group-hover:border-red-600 group-hover:scale-102 transition-all relative shadow-lg select-none">
                    {(item as any).imageUrl ? (
                      <img 
                        src={(item as any).imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-all duration-500" 
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-tr ${getFallbackGradient(item.type)} flex items-center justify-center p-4`}>
                        {getIcon(item.type)}
                      </div>
                    )}

                    {/* Download Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Download className="w-4.5 h-4.5" />
                      </div>
                    </div>
                  </div>

                  {/* Text underneath */}
                  <div className="text-left mt-2 space-y-0.5">
                    <div className="flex items-center justify-between text-[8px] text-slate-500 font-mono">
                      <span className="uppercase font-bold text-red-500">{item.type}</span>
                      <span>{item.durationOrSize}</span>
                    </div>
                    <h4 className="text-[11px] font-bold text-white group-hover:text-red-500 transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Row 4: Podcasts */}
        {podcasts.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-350 flex items-center space-x-2">
              <span className="w-1 h-4 bg-red-600 rounded-full" />
              <span>🎙️ Podcasts y Charlas Técnicas ({podcasts.length})</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {podcasts.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleAccessResource(item)}
                  className="flex flex-col group cursor-pointer"
                >
                  {/* Poster Box */}
                  <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-805 group-hover:border-red-600 group-hover:scale-102 transition-all relative shadow-lg select-none">
                    {(item as any).imageUrl ? (
                      <img 
                        src={(item as any).imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-all duration-500" 
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-tr ${getFallbackGradient(item.type)} flex items-center justify-center p-4`}>
                        {getIcon(item.type)}
                      </div>
                    )}

                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-4.5 h-4.5 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Text underneath */}
                  <div className="text-left mt-2 space-y-0.5">
                    <div className="flex items-center justify-between text-[8px] text-slate-500 font-mono">
                      <span className="uppercase font-bold text-red-500">{item.type}</span>
                      <span>{item.durationOrSize}</span>
                    </div>
                    <h4 className="text-[11px] font-bold text-white group-hover:text-red-500 transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchedResources.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
            <Info className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-white">No se encontraron recursos</h4>
            <p className="text-xs text-slate-400 mt-1">Pruebe ajustando el criterio de búsqueda.</p>
          </div>
        )}

      </div>

      {/* YouTube Video Embed Player Modal */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-4xl aspect-video bg-slate-950 rounded-2xl overflow-hidden relative border border-slate-850 shadow-2xl">
            <button 
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors z-55"
              title="Cerrar reproductor"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={activeVideoUrl}
              title="YouTube Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}

    </div>
  );
};
