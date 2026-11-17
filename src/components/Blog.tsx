import React, { useState } from 'react';
import { BlogPost, Language } from '../types';
import { translations } from '../data/translations';
import { Search, Calendar, Clock, ArrowRight, ArrowLeft, Share2, Tag, BookOpen, Check, Sparkles } from 'lucide-react';

interface BlogProps {
  posts: BlogPost[];
  language: Language;
}

export const Blog: React.FC<BlogProps> = ({ posts, language }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedLink, setCopiedLink] = useState(false);

  const t = translations[language].blog;

  // Categories list
  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    // Only show published posts to visitors
    if (!post.published) return false;

    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    const term = searchTerm.toLowerCase();
    const titleMatch =
      post.title.toLowerCase().includes(term) ||
      (post.title_km && post.title_km.toLowerCase().includes(term));
    const excerptMatch =
      post.excerpt.toLowerCase().includes(term) ||
      (post.excerpt_km && post.excerpt_km.toLowerCase().includes(term));
    const tagMatch = post.tags.some((tag) => tag.toLowerCase().includes(term));

    return matchesCategory && (titleMatch || excerptMatch || tagMatch);
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // If a post is selected, render full reading mode
  if (selectedPost) {
    const postTitle = (language === 'km' && selectedPost.title_km) ? selectedPost.title_km : selectedPost.title;
    const postContent = (language === 'km' && selectedPost.content_km) ? selectedPost.content_km : selectedPost.content;

    return (
      <article className="py-10 sm:py-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          {/* Back button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-pink-100 text-stone-700 hover:text-pink-600 hover:border-pink-300 font-medium text-xs sm:text-sm mb-8 transition cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-pink-500" />
            <span>{t.backToBlog}</span>
          </button>

          {/* Post Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-bold uppercase tracking-wider">
                {selectedPost.category}
              </span>
              <span className="text-xs text-stone-400">•</span>
              <span className="text-xs text-stone-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedPost.read_time}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 tracking-tight leading-tight">
              {postTitle}
            </h1>

            {/* Author & Meta */}
            <div className="flex items-center justify-between py-4 border-y border-pink-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-500 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  SP
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-900">{selectedPost.author}</p>
                  <p className="text-xs text-stone-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(selectedPost.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-pink-200 bg-white hover:bg-pink-50 text-xs font-semibold text-pink-700 transition cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied Link!' : t.share}</span>
              </button>
            </div>
          </div>

          {/* Cover image */}
          {selectedPost.cover_image && (
            <div className="my-8 rounded-2xl overflow-hidden shadow-md max-h-96">
              <img
                src={selectedPost.cover_image}
                alt={postTitle}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Post Markdown Body */}
          <div className="prose prose-pink max-w-none text-stone-800 leading-relaxed space-y-4 py-4 text-base sm:text-lg">
            {postContent.split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-bold text-stone-900 mt-6 mb-2">
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('#### ')) {
                return (
                  <h4 key={idx} className="text-lg sm:text-xl font-bold text-stone-900 mt-5 mb-2">
                    {trimmed.replace('#### ', '')}
                  </h4>
                );
              }
              if (trimmed.startsWith('```')) {
                const codeLines = trimmed.split('\n');
                const codeContent = codeLines.slice(1, -1).join('\n');
                return (
                  <pre key={idx} className="bg-stone-900 text-pink-200 p-4 rounded-xl overflow-x-auto text-xs sm:text-sm font-mono my-4 shadow-inner">
                    <code>{codeContent}</code>
                  </pre>
                );
              }
              return (
                <p key={idx} className="text-stone-700">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Tags Footer */}
          <div className="mt-10 pt-6 border-t border-pink-100 flex flex-wrap gap-2">
            {selectedPost.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-pink-50 text-pink-700 text-xs font-medium border border-pink-100"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

        </div>
      </article>
    );
  }

  return (
    <section id="blog" className="py-16 sm:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold text-pink-600 tracking-wider uppercase bg-pink-100/80 px-3 py-1 rounded-full">
            {t.subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 mt-3 tracking-tight">
            {t.title}
          </h2>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white/80 rounded-3xl border border-pink-100 max-w-lg mx-auto shadow-sm space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center mx-auto shadow-xs">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif-display font-bold text-xl text-stone-900">
              {language === 'km' ? 'អត្ថបទនឹងមកដល់ឆាប់ៗនេះ' : 'Articles Coming Soon'}
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
              {language === 'km'
                ? 'ពន្លក ស្រីកា នឹងចេញផ្សាយអត្ថបទ និងការចែករំលែកបទពិសោធន៍នៅទីនេះឆាប់ៗ។ សូមរង់ចាំតាមដានទាំងអស់គ្នា!'
                : 'Ponlork Sreyka will be publishing new articles and career reflections here. Stay tuned!'}
            </p>
          </div>
        ) : (
          <>
            {/* Search & Categories Bar */}
            <div className="max-w-4xl mx-auto mb-10 space-y-4">
              <div className="relative">
                <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-pink-200 focus:border-pink-500 focus:ring-3 focus:ring-pink-100 text-stone-800 placeholder:text-stone-400 text-sm shadow-xs outline-none transition"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-pink-600 text-white shadow-2xs'
                        : 'bg-white hover:bg-pink-50 text-stone-600 border border-pink-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-white/60 rounded-3xl border border-pink-100 max-w-lg mx-auto">
                <BookOpen className="w-12 h-12 text-pink-300 mx-auto mb-3" />
                <p className="text-stone-600 font-medium text-sm">{t.noPosts}</p>
              </div>
            ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const displayTitle = (language === 'km' && post.title_km) ? post.title_km : post.title;
              const displayExcerpt = (language === 'km' && post.excerpt_km) ? post.excerpt_km : post.excerpt;

              return (
                <div
                  key={post.id}
                  onClick={() => {
                    setSelectedPost(post);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-3xl overflow-hidden border border-pink-100/90 shadow-sm hover:shadow-xl hover:shadow-pink-100/60 hover:border-pink-300 transition duration-300 flex flex-col cursor-pointer group"
                >
                  {/* Cover */}
                  <div className="relative h-48 overflow-hidden bg-pink-100">
                    <img
                      src={post.cover_image}
                      alt={displayTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-pink-600/90 text-white text-2xs font-bold px-2.5 py-1 rounded-full uppercase">
                      {post.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-2xs text-stone-500 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-pink-500" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-pink-500" />
                          {post.read_time}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-stone-900 group-hover:text-pink-600 transition-colors line-clamp-2">
                        {displayTitle}
                      </h3>

                      <p className="mt-2 text-stone-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                        {displayExcerpt}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-pink-50 flex items-center justify-between text-pink-600 text-xs font-semibold group-hover:translate-x-0.5 transition-transform">
                      <span>{t.readMore}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    )}

      </div>
    </section>
  );
};
