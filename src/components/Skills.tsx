import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { cvData } from '../data/portfolioData';
import { FileSpreadsheet, Palette, Users, Globe2, Check } from 'lucide-react';

interface SkillsProps {
  language: Language;
}

export const Skills: React.FC<SkillsProps> = ({ language }) => {
  const t = translations[language].skills;

  const categoryIcons = [FileSpreadsheet, Users];

  return (
    <section id="skills" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold text-pink-600 tracking-wider uppercase bg-pink-100/80 px-3 py-1 rounded-full">
            {t.subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 mt-3 tracking-tight">
            {t.title}
          </h2>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {cvData.technical_skills.map((group, idx) => {
            const IconComponent = categoryIcons[idx] || Palette;
            return (
              <div
                key={idx}
                className="bg-white/95 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-pink-100 shadow-sm hover:shadow-md hover:border-pink-300 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white mb-5 shadow-xs shadow-pink-200 group-hover:scale-105 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-stone-900 mb-4">
                  {language === 'km' ? group.category_km : group.category}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-pink-50 text-pink-800 text-xs font-medium border border-pink-100 hover:bg-pink-100 transition"
                    >
                      <Check className="w-3.5 h-3.5 text-pink-500" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Languages Bar - No invented proficiency levels */}
        <div className="mt-8 max-w-4xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-pink-50/80 via-white to-pink-50/80 border border-pink-200/70 shadow-2xs">
          <div className="flex items-center gap-2 mb-4">
            <Globe2 className="w-5 h-5 text-pink-500" />
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
              {language === 'km' ? 'ភាសាដែលចេះប្រើប្រាស់' : 'Languages Spoken'}
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cvData.languages.map((l, idx) => (
              <div key={idx} className="p-3 bg-white rounded-xl border border-pink-100 shadow-2xs text-center">
                <span className="font-bold text-stone-800 text-sm block">
                  {language === 'km' ? l.language_km : l.language}
                </span>
                <span className="text-2xs text-pink-600 font-medium">
                  {l.language}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
