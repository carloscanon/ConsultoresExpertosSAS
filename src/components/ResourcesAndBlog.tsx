import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Sparkles, 
  Download, 
  BookOpen,
  X,
  Play,
  FileText,
  Volume2,
  BookMarked
} from 'lucide-react';

interface ResourcesAndBlogProps {
  onOpenDemo: () => void;
}

export const ResourcesAndBlog: React.FC<ResourcesAndBlogProps> = ({ onOpenDemo }) => {
  const { resources } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const categories = ['All', 'video', 'podcast', 'template', 'whitepaper'];

  const categoryLabels: Record<string, string> = {
    'All': 'Todos los Recursos',
    'video': 'Videos & Grabaciones',
    'podcast': 'Podcasts',
    'template': 'Checklists & Plantillas',
    'whitepaper': 'Whitepapers'
  };

  // Convert ResourceItem from DataContext to display model
  const displayPosts = resources.map(res => ({
    id: res.id,
    title: res.title,
    category: res.type,
    summary: res.description,
    readTime: res.durationOrSize,
    date: 'Actualizado',
    imageUrl: res.imageUrl,
    redirectUrl: res.redirectUrl,
    type: res.type,
    featured: res.featured
  }));

  const filteredPosts = selectedCategory === 'All'
    ? displayPosts
    : displayPosts.filter(p => p.category === selectedCategory);

  // Helper to extract YouTube video ID and get thumbnail
  const getYoutubeThumbnail = (url?: string) => {
    if (!url) return '';
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
    const secondaryMatch = url.match(/v=([\w-]{11})/);
    if (secondaryMatch && secondaryMatch[1]) {
      return `https://img.youtube.com/vi/${secondaryMatch[1]}/hqdefault.jpg`;
    }
    return '';
  };

  // Helper to extract YouTube embed URL
  const getYoutubeEmbedUrl = (url?: string) => {
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

  const getFallbackGradient = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('video') || cat.includes('grabaciones')) return 'from-cyan-950 via-cyan-900 to-indigo-950';
    if (cat.includes('podcast')) return 'from-indigo-950 via-purple-950 to-slate-950';
    if (cat.includes('checklist') || cat.includes('plantilla')) return 'from-emerald-950 via-teal-900 to-slate-950';
    return 'from-purple-950 via-blue-950 to-slate-950';
  };

  const getIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('video') || cat.includes('grabaciones')) return <Play className="w-8 h-8 text-cyan-400 fill-cyan-400" />;
    if (cat.includes('podcast')) return <Volume2 className="w-8 h-8 text-indigo-400" />;
    if (cat.includes('checklist') || cat.includes('plantilla')) return <BookMarked className="w-8 h-8 text-emerald-400" />;
    return <FileText className="w-8 h-8 text-purple-400" />;
  };

  const handleCardClick = (post: any) => {
    const embed = getYoutubeEmbedUrl(post.redirectUrl);
    if (post.type === 'video' && embed) {
      setActiveVideoUrl(embed);
    } else if (post.redirectUrl) {
      window.open(post.redirectUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="resources" className="py-24 relative bg-[#141414] text-white border-t border-slate-900 transition-colors overflow-hidden text-left">
      
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-4 h-4 text-red-500 animate-pulse" />
            <span>Biblioteca Multimedia</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-heading mb-4 text-white">
            Centro de Contenidos & Recursos DXP
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Descubre guías estratégicas, checklists descargables y video-lecciones con interfaz interactiva tipo Netflix.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 border border-red-500/30'
                  : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-805'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Netflix Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <div 
              key={post.id} 
              onClick={() => handleCardClick(post)}
              className="flex flex-col group cursor-pointer"
            >
              {/* Card Poster Container */}
              <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-805 group-hover:border-red-600 group-hover:scale-102 transition-all relative shadow-lg select-none">
                {/* Cover Image — imageUrl > YouTube auto > gradient */}
                {post.imageUrl ? (
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-all duration-500" 
                  />
                ) : getYoutubeThumbnail(post.redirectUrl) ? (
                  <img 
                    src={getYoutubeThumbnail(post.redirectUrl)} 
                    alt={post.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-500" 
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-tr ${getFallbackGradient(post.type)} flex items-center justify-center p-4`}>
                    {getIcon(post.type)}
                  </div>
                )}

                {/* Card Hover Play/Download Button Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    {post.type === 'video' ? <Play className="w-5 h-5 fill-white ml-0.5" /> : <Download className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Text Description below the Resource (Always visible) */}
              <div className="text-left mt-2.5 space-y-1">
                <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono">
                  <span className="uppercase font-bold text-red-500">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-red-500 transition-colors line-clamp-1">
                  {post.title}
                </h4>
                <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                  {post.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6 text-white text-left">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase text-red-500 bg-red-500/10 px-2.5 py-1 rounded border border-red-500/30 font-mono">
                {selectedPost.category}
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-3 font-heading">
                {selectedPost.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Por {selectedPost.author} • {selectedPost.authorRole} • {selectedPost.date}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-805 text-xs space-y-1">
              <div className="flex items-center space-x-1 text-red-500 font-bold">
                <Sparkles className="w-4 h-4 text-red-500" />
                <span>Executive AI Synthesis</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{selectedPost.aiSummary}</p>
            </div>

            <div className="space-y-3 text-xs text-slate-350 leading-relaxed">
              <p>{selectedPost.summary}</p>
              <p>
                En esta publicación, analizamos cómo las organizaciones líderes evitan la fragmentación de datos mediante la combinación de metodologías DAMA-DMBOK y la plataforma GovData Nexus.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {(selectedPost.tags || []).map((tag: string, i: number) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-red-500 border border-slate-805">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedPost(null);
                  onOpenDemo();
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:scale-105 transition-all shadow-lg flex items-center space-x-1"
              >
                <Download className="w-4 h-4" />
                <span>Descargar PDF Completo</span>
              </button>
            </div>
          </div>
        </div>
      )}

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

    </section>
  );
};
