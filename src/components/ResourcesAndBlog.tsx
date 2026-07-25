import React, { useState } from 'react';
import { resourcesData } from '../data/resourcesData';
import { useLanguage } from '../context/LanguageContext';
import type { BlogPost } from '../types';
import { 
  Sparkles, 
  Clock, 
  Download, 
  ArrowRight, 
  BookOpen,
  X
} from 'lucide-react';

interface ResourcesAndBlogProps {
  onOpenDemo: () => void;
}

export const ResourcesAndBlog: React.FC<ResourcesAndBlogProps> = ({ onOpenDemo }) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Whitepapers', 'Arquitectura de Datos', 'Checklists & Plantillas'];

  const filteredPosts = selectedCategory === 'All'
    ? resourcesData
    : resourcesData.filter(p => p.category === selectedCategory);

  return (
    <section id="resources" className="py-24 relative bg-slate-950 text-white border-t border-slate-800 transition-colors overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>{t('resourcesBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading mb-4 text-white">
            Whitepapers, Checklists & Blog Técnico
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            {t('resourcesSub')}
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
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30 border border-cyan-400/40'
                  : 'glass-panel text-slate-300 hover:bg-slate-800 border-slate-800 bg-slate-900/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/50 transition-all card-hover-tilt cursor-pointer flex flex-col justify-between group shadow-2xl bg-slate-900/80 text-white"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center space-x-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors font-heading">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {post.summary}
                </p>

                <div className="p-3 rounded-xl bg-slate-950 border border-indigo-500/30 text-[11px] text-slate-300 mb-4">
                  <div className="flex items-center space-x-1 text-indigo-400 font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Resumen IA</span>
                  </div>
                  <p className="line-clamp-2 text-slate-400">{post.aiSummary}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">{post.date}</span>
                <span className="text-xs font-bold text-cyan-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Leer Artículo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/40 shadow-2xl relative space-y-6 bg-slate-900 text-white">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
                {selectedPost.category}
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-3 font-heading">
                {selectedPost.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Por {selectedPost.author} • {selectedPost.authorRole} • {selectedPost.date}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 text-xs space-y-1">
              <div className="flex items-center space-x-1 text-indigo-400 font-bold">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Executive AI Synthesis</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{selectedPost.aiSummary}</p>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>{selectedPost.summary}</p>
              <p>
                En esta publicación, analizamos cómo las organizaciones líderes evitan la fragmentación de datos mediante la combinación de metodologías DAMA-DMBOK y la plataforma GovData Nexus.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {selectedPost.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedPost(null);
                  onOpenDemo();
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:scale-105 transition-all shadow-lg flex items-center space-x-1"
              >
                <Download className="w-4 h-4" />
                <span>Descargar PDF Completo</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
