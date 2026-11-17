import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Sparkles, Github, Linkedin, Mail, Heart, Shield } from 'lucide-react';
import { PRIMARY_ADMIN_EMAIL } from '../lib/supabase';

interface FooterProps {
  language: Language;
  onNavigate: (tab: string) => void;
  isAdminLoggedIn: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate,
  isAdminLoggedIn,
}) => {
  const t = translations[language].footer;

  return (
    <footer className="no-print bg-white border-t border-pink-100/80 py-12 text-stone-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand info */}
          <div className="text-center md:text-left space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-pink-500 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                PS
              </div>
              <span className="font-bold text-stone-900 text-base">
                {language === 'km' ? 'ពន្លក ស្រីកា' : 'Ponlork Sreyka'}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            </div>
            <p className="text-xs text-stone-500">
              {t.designedBy}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-stone-600">
            <button onClick={() => onNavigate('home')} className="hover:text-pink-600 cursor-pointer">
              Home
            </button>
            <button onClick={() => onNavigate('projects')} className="hover:text-pink-600 cursor-pointer">
              Projects
            </button>
            <button onClick={() => onNavigate('blog')} className="hover:text-pink-600 cursor-pointer">
              Blog
            </button>
            <button onClick={() => onNavigate('cv')} className="hover:text-pink-600 cursor-pointer">
              CV / Resume
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-pink-600 cursor-pointer">
              Contact
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="hover:text-pink-600 cursor-pointer flex items-center gap-1 text-pink-700 bg-pink-50 px-2.5 py-1 rounded-full"
            >
              <Shield className="w-3 h-3 text-pink-500" />
              <span>Admin</span>
              {isAdminLoggedIn && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/sreykaponlork"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-pink-50 text-stone-600 hover:text-pink-600 hover:bg-pink-100 transition shadow-2xs"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/sreyka-ponlork"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-pink-50 text-stone-600 hover:text-pink-600 hover:bg-pink-100 transition shadow-2xs"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PRIMARY_ADMIN_EMAIL}`}
              className="p-2 rounded-xl bg-pink-50 text-stone-600 hover:text-pink-600 hover:bg-pink-100 transition shadow-2xs"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-2xs text-stone-400 gap-2 text-center">
          <p>© {new Date().getFullYear()} Ponlork Sreyka. {t.copyright}</p>
          <p className="flex items-center justify-center gap-1">
            <span>{t.builtWith}</span>
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
