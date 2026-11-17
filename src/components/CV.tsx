import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { cvData, getProfilePhoto } from '../data/portfolioData';
import {
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Briefcase,
  GraduationCap,
  Wrench,
  Award,
  Languages as LanguagesIcon,
  CheckCircle,
  Info
} from 'lucide-react';

interface CVProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const CV: React.FC<CVProps> = ({ language, setLanguage }) => {
  const [showPrintHint, setShowPrintHint] = useState(false);
  const t = translations[language].cv;

  /**
   * Handles opening the browser print dialog.
   * Configured via CSS @media print to print ONLY #cv-print-area in standard A4 format.
   */
  const handlePrint = () => {
    setShowPrintHint(true);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="py-8 sm:py-12 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* CV Actions Bar (Hidden during printing via .no-print) */}
        <div className="no-print bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-pink-200/80 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
              <h1 className="text-lg sm:text-xl font-serif-display font-bold text-stone-900">
                {t.title}
              </h1>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {t.printingNotice}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Bilingual Switcher inside CV header */}
            <div className="flex rounded-xl p-1 bg-pink-50 border border-pink-100">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-pink-700 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setLanguage('km')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  language === 'km'
                    ? 'bg-white text-pink-700 shadow-2xs font-khmer'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                🇰🇭 ភាសាខ្មែរ
              </button>
            </div>

            {/* Print / Save as PDF Primary Button */}
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 transition cursor-pointer"
              title="Open browser print dialog to print or save as PDF"
            >
              <Printer className="w-4 h-4" />
              <Download className="w-4 h-4" />
              <span>{t.printBtn}</span>
            </button>
          </div>
        </div>

        {/* Print Guide Notification (no-print) */}
        {showPrintHint && (
          <div className="no-print mb-6 p-3.5 bg-pink-50 border border-pink-200 rounded-xl text-xs text-pink-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Printing / Save as PDF Tip:</p>
              <p>In the print preview window, choose <span className="font-semibold">Destination: "Save as PDF"</span>, <span className="font-semibold">Paper size: "A4"</span>, and enable <span className="font-semibold">"Background graphics"</span> to preserve the colors and borders.</p>
            </div>
          </div>
        )}

        {/* =========================================================================
            CV PRINTABLE CONTAINER (#cv-print-area)
            A4 Dimensions: Formatted for standard paper with no clipping
           ========================================================================= */}
        <div
          id="cv-print-area"
          className="bg-white rounded-2xl shadow-xl shadow-pink-100/50 border border-pink-100 p-6 sm:p-10 lg:p-12 text-stone-800 transition-all"
        >
          {/* CV Header */}
          <div className="border-b-2 border-pink-500 pb-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 tracking-tight">
                  {language === 'km' ? cvData.name_km : cvData.name}
                </h1>
                <p className="text-base sm:text-lg font-semibold text-pink-600 mt-1">
                  {language === 'km' ? cvData.title_km : cvData.title}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  Faculty of Digital Economy • National University of Management (NUM)
                </p>
              </div>

              {/* Profile Photo */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-pink-200 shadow-2xs shrink-0">
                  <img
                    src={getProfilePhoto()}
                    alt="Ponlork Sreyka"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Contact Details Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mt-5 pt-4 border-t border-stone-100 text-xs sm:text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                <a href={`mailto:${cvData.email}`} className="hover:text-pink-600 font-medium">{cvData.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                <span>{cvData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                <span>{language === 'km' ? cvData.location_km : cvData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                <a href={cvData.portfolio_url} target="_blank" rel="noreferrer" className="hover:text-pink-600">{cvData.portfolio_url}</a>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                <span>github.com/sreykaponlork</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                <span>linkedin.com/in/sreyka-ponlork</span>
              </div>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="mb-7 cv-section avoid-break">
            <h2 className="text-xs font-bold uppercase tracking-wider text-pink-700 bg-pink-50/80 px-3 py-1.5 rounded-lg border-l-4 border-pink-500 mb-3 flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-pink-500" />
              <span>{t.summary}</span>
            </h2>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed px-1">
              {language === 'km' ? cvData.summary_km : cvData.summary}
            </p>
          </div>

          {/* Two Columns Grid for A4 Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">

            {/* Left Column (5 cols): Education, Skills, Languages */}
            <div className="lg:col-span-5 space-y-6">

              {/* Education */}
              <div className="cv-section avoid-break">
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-700 bg-pink-50/80 px-3 py-1.5 rounded-lg border-l-4 border-pink-500 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-pink-500" />
                  <span>{t.education}</span>
                </h3>
                <div className="space-y-3 px-1">
                  {cvData.education.map((edu, idx) => (
                    <div key={idx} className="border-l-2 border-pink-300 pl-3">
                      <h4 className="text-xs font-bold text-stone-900">
                        {language === 'km' ? edu.degree_km : edu.degree}
                      </h4>
                      <p className="text-xs text-pink-600 font-medium">{edu.institution}</p>
                      <p className="text-2xs text-stone-500">
                        {language === 'km' ? edu.period_km : edu.period}
                      </p>
                      {edu.details && (
                        <p className="text-2xs text-stone-600 mt-1">
                          {language === 'km' ? edu.details_km : edu.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="cv-section avoid-break">
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-700 bg-pink-50/80 px-3 py-1.5 rounded-lg border-l-4 border-pink-500 mb-3 flex items-center gap-2">
                  <Wrench className="w-3.5 h-3.5 text-pink-500" />
                  <span>{t.technicalSkills}</span>
                </h3>
                <div className="space-y-3 px-1">
                  {cvData.technical_skills.map((cat, idx) => (
                    <div key={idx}>
                      <p className="text-xs font-bold text-stone-800 mb-1">
                        {language === 'km' ? cat.category_km : cat.category}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {cat.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-2xs font-semibold px-2 py-0.5 rounded-md bg-pink-50 text-pink-800 border border-pink-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages (No invented proficiency levels) */}
              <div className="cv-section avoid-break">
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-700 bg-pink-50/80 px-3 py-1.5 rounded-lg border-l-4 border-pink-500 mb-3 flex items-center gap-2">
                  <LanguagesIcon className="w-3.5 h-3.5 text-pink-500" />
                  <span>{t.languages}</span>
                </h3>
                <div className="grid grid-cols-2 gap-2 px-1">
                  {cvData.languages.map((lang, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-800 bg-pink-50/50 p-2 rounded-lg border border-pink-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                      <span className="font-medium">{language === 'km' ? lang.language_km : lang.language}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (7 cols): Work Experience & Core Competencies */}
            <div className="lg:col-span-7 space-y-6">

              {/* Work Experience */}
              <div className="cv-section">
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-700 bg-pink-50/80 px-3 py-1.5 rounded-lg border-l-4 border-pink-500 mb-4 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-pink-500" />
                  <span>{t.experience}</span>
                </h3>

                <div className="space-y-6">
                  {cvData.experiences.map((exp, idx) => (
                    <div key={idx} className="cv-item avoid-break border-l-2 border-pink-300 pl-4 relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-pink-500" />

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                        <h4 className="text-sm font-bold text-stone-900">
                          {language === 'km' ? exp.role_km : exp.role}
                        </h4>
                        <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-pink-100 text-pink-800 self-start sm:self-auto">
                          {language === 'km' ? exp.period_km : exp.period}
                        </span>
                      </div>

                      <p className="text-xs font-medium text-pink-600 mb-2">
                        {exp.company} • {exp.location}
                      </p>

                      <ul className="space-y-1.5 text-xs text-stone-600 list-disc list-outside ml-3.5">
                        {(language === 'km' ? exp.description_km : exp.description).map((desc, dIdx) => (
                          <li key={dIdx} className="leading-relaxed">
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Competencies */}
              <div className="cv-section avoid-break">
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-700 bg-pink-50/80 px-3 py-1.5 rounded-lg border-l-4 border-pink-500 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-pink-500" />
                  <span>{t.softSkills}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-1">
                  {cvData.soft_skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 bg-pink-50/40 p-2.5 rounded-lg border border-pink-100/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                      <span>{language === 'km' ? skill.km : skill.en}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal Portfolio Website Highlight */}
              <div className="cv-section avoid-break p-3.5 rounded-xl bg-pink-50/60 border border-pink-200/70 text-xs text-stone-700">
                <p className="font-bold text-pink-700">Personal Portfolio Website</p>
                <p className="text-2xs text-stone-600 mt-0.5">
                  Bilingual portfolio with A4 printable CV, Supabase blog integration, and soft pink design.
                </p>
              </div>

            </div>

          </div>

          {/* CV Footer */}
          <div className="mt-8 pt-4 border-t border-stone-200 text-center text-2xs text-stone-400">
            <span>{cvData.name} • {cvData.email} • {cvData.portfolio_url} • Generated for A4 Print & PDF</span>
          </div>
        </div>

      </div>
    </div>
  );
};
