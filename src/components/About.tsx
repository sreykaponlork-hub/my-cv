import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { getProfilePhoto } from '../data/portfolioData';
import { GraduationCap, MapPin, Mail, Award, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const About: React.FC<AboutProps> = ({ language, onNavigate }) => {
  const t = translations[language].about;

  const realSkills = [
    { en: 'Microsoft Office (Word, Excel, PowerPoint)', km: 'កម្មវិធីការិយាល័យ (Word, Excel, PowerPoint)' },
    { en: 'Graphic Design (Canva & Basic Photoshop)', km: 'ការរចនារូបភាព (Canva និង Basic Photoshop)' },
    { en: 'HR Recruitment & Interview Assistance', km: 'ការជ្រើសរើសបុគ្គលិក និងជួយការសម្ភាសន៍' },
    { en: 'Candidate Follow-up & Telegram Communication', km: 'ការតាមដានបេក្ខជន និងទំនាក់ទំនង Telegram' },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-white/60 border-y border-pink-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold text-pink-600 tracking-wider uppercase bg-pink-100/80 px-3 py-1 rounded-full">
            {t.subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 mt-3 tracking-tight">
            {t.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 p-1 rounded-3xl shadow-xl shadow-pink-200/50">
              <div className="bg-white rounded-[22px] p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-pink-100 overflow-hidden border-2 border-pink-200 shrink-0">
                    <img
                      src={getProfilePhoto()}
                      alt="Ponlork Sreyka"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif-display font-bold text-stone-900">
                      {language === 'km' ? 'ពន្លក ស្រីកា' : 'Ponlork Sreyka'}
                    </h3>
                    <p className="text-sm text-pink-600 font-medium">Digital Economy Student</p>
                  </div>
                </div>

                <div className="space-y-3.5 pt-2 border-t border-stone-100 text-sm text-stone-600">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-pink-500 shrink-0" />
                    <span>{t.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-pink-500 shrink-0" />
                    <span className="font-mono text-xs sm:text-sm">{t.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-pink-500 shrink-0" />
                    <span>{t.educationHighlight}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-pink-500 shrink-0" />
                    <span>{t.experienceYears}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('cv')}
                    className="w-full py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold text-sm transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{language === 'km' ? 'ចូលទៅកាន់ទំព័រ CV' : 'View Complete CV'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Key Strengths */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed">
              {t.bio1}
            </p>
            <p className="text-stone-600 text-base leading-relaxed">
              {t.bio2}
            </p>

            <div className="pt-2 space-y-3">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                {language === 'km' ? 'ជំនាញ និងបទពិសោធន៍សំខាន់ៗ' : 'Key Skills & Experience'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {realSkills.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-pink-100 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-stone-700 font-medium">
                      {language === 'km' ? item.km : item.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
