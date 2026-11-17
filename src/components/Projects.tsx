import React from 'react';
import { Language, Project } from '../types';
import { translations } from '../data/translations';
import { portfolioProjects } from '../data/portfolioData';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

interface ProjectsProps {
  language: Language;
}

export const Projects: React.FC<ProjectsProps> = ({ language }) => {
  const t = translations[language].projects;

  return (
    <section id="projects" className="py-16 sm:py-20 bg-white/40">
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

        {/* Projects Display */}
        <div className="max-w-3xl mx-auto">
          {portfolioProjects.map((project: Project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-xl hover:shadow-pink-100/60 hover:border-pink-300 transition duration-300 flex flex-col md:flex-row group"
            >
              {/* Image Preview */}
              <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden bg-pink-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {project.featured && (
                  <div className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3 h-3" />
                    <span>{t.featured}</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif-display font-bold text-stone-900 group-hover:text-pink-600 transition-colors">
                    {language === 'km' ? project.title_km : project.title}
                  </h3>
                  <p className="mt-3 text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {language === 'km' ? project.description_km : project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-2xs font-semibold px-2.5 py-1 rounded-md bg-pink-50 text-pink-700 border border-pink-100/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  {project.demo_url ? (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-pink-600 hover:text-pink-700 transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{t.liveDemo}</span>
                    </a>
                  ) : <div />}

                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 transition"
                    >
                      <Github className="w-4 h-4" />
                      <span>{t.sourceCode}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
