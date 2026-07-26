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
  X
} from 'lucide-react';

export const ResourcesPortal: React.FC = () => {
  const { resources } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  // Helper to extract YouTube video ID and get thumbnail
  const getYoutubeThumbnail = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
    }
    return '';
  };

  // Helper to extract YouTube embed URL
  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
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

  // Featured Banner Resource (Default to first video or first resource)
  const featuredResource = searchedResources.find(item => item.type === 'video') || searchedResources[0];

  const handleAccessResource = (item: any) => {
    const embed = getYoutubeEmbedUrl(item.redirectUrl);
    if (item.type === 'video' && embed) {
      setActiveVideoUrl(embed);
    } else if (item.redirectUrl) {
      window.open(item.redirectUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-[#141414] text-white min-h-screen text-left pb-24 font-sans selection:bg-red-600 selection:text-white">
      
      {/* Netflix Hero Banner */}
      {featuredResource && (
        <div className="relative h-[56.25vw] max-h-[550px] min-h-[350px] w-full overflow-hidden bg-black select-none">
          {/* Cover image or gradient */}
          <div className="absolute inset-0">
            {featuredResource.type === 'video' && getYoutubeThumbnail(featuredResource.redirectUrl) ? (
              <img 
                src={getYoutubeThumbnail(featuredResource.redirectUrl)} 
                alt={featuredResource.title} 
                className="w-full h-full object-cover opacity-60 scale-105 blur-[2px] sm:blur-none transition-all duration-700" 
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-tr ${getFallbackGradient(featuredResource.type)} opacity-75`} />
            )}
            {/* Gradient overlays to replicate Netflix banner fade */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#141414] to-transparent z-10" />
          </div>

          {/* Featured Content Details */}
          <div className="absolute left-6 sm:left-12 bottom-12 sm:bottom-20 z-20 max-w-xl space-y-4">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-red-600 text-[10px] font-extrabold uppercase tracking-wider shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>Destacado</span>
            </span>
            <h1 className="text-xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
              {featuredResource.title}
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-350 leading-relaxed drop-shadow line-clamp-3">
              {featuredResource.description}
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <button 
                onClick={() => handleAccessResource(featuredResource)}
                className="px-6 py-2.5 rounded-md bg-white text-black font-extrabold text-xs sm:text-sm flex items-center space-x-2 hover:bg-slate-200 transition-all active:scale-95 shadow-md"
              >
                {featuredResource.type === 'video' && getYoutubeEmbedUrl(featuredResource.redirectUrl) ? (
                  <>
                    <Play className="w-4 h-4 fill-black" />
                    <span>Reproducir</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Descargar / Acceder</span>
                  </>
                )}
              </button>
              {featuredResource.redirectUrl && (
                <a 
                  href={featuredResource.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-md bg-slate-500/30 text-white border border-slate-500/25 font-bold text-xs sm:text-sm flex items-center space-x-1.5 hover:bg-slate-500/50 transition-all"
                >
                  <Info className="w-4 h-4" />
                  <span>Enlace Externo</span>
                </a>
              )}
            </div>
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
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar título o descripción..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-red-600 transition-all"
            />
          </div>
        </div>

        {/* NETFLIX CATEGORY ROWS */}

        {/* Row 1: Videos */}
        {videos.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-350 flex items-center space-x-2">
              <span className="w-1 h-4 bg-red-600 rounded-full" />
              <span>🎬 Grabaciones y Videos Técnicos ({videos.length})</span>
            </h3>
            <div className="flex space-x-4 overflow-x-auto pb-4 pt-1 scrollbar-hide custom-scrollbar">
              {videos.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleAccessResource(item)}
                  className="flex-shrink-0 w-[260px] sm:w-[320px] aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-805 hover:border-red-600 hover:scale-102 transition-all cursor-pointer relative group shadow-lg"
                >
                  {/* Thumbnail Image */}
                  {getYoutubeThumbnail(item.redirectUrl) ? (
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

                  {/* Poster Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3.5 space-y-1">
                    <span className="text-[9px] font-bold text-red-500 font-mono tracking-wider flex items-center space-x-1">
                      <Play className="w-2.5 h-2.5 fill-red-500" />
                      <span>{item.durationOrSize || 'VIDEO'}</span>
                    </span>
                    <h4 className="text-xs font-bold text-white leading-snug line-clamp-1 group-hover:line-clamp-none transition-all">
                      {item.title}
                    </h4>
                    <p className="text-[9px] text-slate-400 line-clamp-2 hidden group-hover:block transition-all">
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
            <div className="flex space-x-4 overflow-x-auto pb-4 pt-1 scrollbar-hide custom-scrollbar">
              {whitepapers.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleAccessResource(item)}
                  className="flex-shrink-0 w-[260px] sm:w-[320px] aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-805 hover:border-red-600 hover:scale-102 transition-all cursor-pointer relative group shadow-lg"
                >
                  <div className={`w-full h-full bg-gradient-to-tr ${getFallbackGradient(item.type)} flex items-center justify-center p-4`}>
                    {getIcon(item.type)}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-3.5 flex flex-col justify-end space-y-1">
                    <span className="text-[9px] font-bold text-red-500 font-mono tracking-wider">
                      {item.durationOrSize || 'PDF'}
                    </span>
                    <h4 className="text-xs font-bold text-white leading-snug line-clamp-1 group-hover:line-clamp-none transition-all">
                      {item.title}
                    </h4>
                    <p className="text-[9px] text-slate-400 line-clamp-2 hidden group-hover:block transition-all">
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
            <div className="flex space-x-4 overflow-x-auto pb-4 pt-1 scrollbar-hide custom-scrollbar">
              {templates.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleAccessResource(item)}
                  className="flex-shrink-0 w-[260px] sm:w-[320px] aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-805 hover:border-red-600 hover:scale-102 transition-all cursor-pointer relative group shadow-lg"
                >
                  <div className={`w-full h-full bg-gradient-to-tr ${getFallbackGradient(item.type)} flex items-center justify-center p-4`}>
                    {getIcon(item.type)}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-3.5 flex flex-col justify-end space-y-1">
                    <span className="text-[9px] font-bold text-red-500 font-mono tracking-wider">
                      {item.durationOrSize || 'DESCARGABLE'}
                    </span>
                    <h4 className="text-xs font-bold text-white leading-snug line-clamp-1 group-hover:line-clamp-none transition-all">
                      {item.title}
                    </h4>
                    <p className="text-[9px] text-slate-400 line-clamp-2 hidden group-hover:block transition-all">
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
            <div className="flex space-x-4 overflow-x-auto pb-4 pt-1 scrollbar-hide custom-scrollbar">
              {podcasts.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleAccessResource(item)}
                  className="flex-shrink-0 w-[260px] sm:w-[320px] aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-805 hover:border-red-600 hover:scale-102 transition-all cursor-pointer relative group shadow-lg"
                >
                  <div className={`w-full h-full bg-gradient-to-tr ${getFallbackGradient(item.type)} flex items-center justify-center p-4`}>
                    {getIcon(item.type)}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-3.5 flex flex-col justify-end space-y-1">
                    <span className="text-[9px] font-bold text-red-500 font-mono tracking-wider">
                      {item.durationOrSize || 'PODCAST'}
                    </span>
                    <h4 className="text-xs font-bold text-white leading-snug line-clamp-1 group-hover:line-clamp-none transition-all">
                      {item.title}
                    </h4>
                    <p className="text-[9px] text-slate-400 line-clamp-2 hidden group-hover:block transition-all">
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
