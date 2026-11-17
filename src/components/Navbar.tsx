import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Sparkles, Shield, Menu, X, Globe, FileText, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  isAdminLoggedIn,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language].nav;

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'about', label: t.about },
    { id: 'skills', label: t.skills },
    { id: 'projects', label: t.projects },
    { id: 'blog', label: t.blog },
    { id: 'cv', label: t.cv, icon: FileText },
    { id: 'contact', label: t.contact },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    // Smooth scroll to top when switching main views
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'km' : 'en');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 border-b border-pink-100/80 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Monogram */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group transition cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-400 to-pink-300 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-pink-200 group-hover:scale-105 transition-transform duration-200">
              PS
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-stone-800 tracking-tight text-base sm:text-lg group-hover:text-pink-600 transition-colors">
                <span>{language === 'km' ? 'ពន្លក ស្រីកា' : 'Ponlork Sreyka'}</span>
                <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
              </div>
              <p className="text-xs text-pink-500 font-medium">Digital Economy • NUM</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-pink-600 bg-pink-50 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-pink-600 hover:bg-pink-50/50'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-pink-500" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Language Switcher & Admin Portal Button */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-pink-200 bg-white/90 text-stone-700 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50/50 transition-all text-xs font-semibold cursor-pointer shadow-2xs"
              title={language === 'en' ? 'Switch to ភាសាខ្មែរ' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5 text-pink-500" />
              <span>{language === 'en' ? '🇰🇭 ភាសាខ្មែរ' : '🇬🇧 EN'}</span>
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                currentTab === 'admin'
                  ? 'bg-stone-900 text-white'
                  : isAdminLoggedIn
                  ? 'bg-pink-600 text-white hover:bg-pink-700 shadow-pink-200'
                  : 'bg-stone-100 hover:bg-pink-100 text-stone-700 hover:text-pink-700'
              }`}
            >
              <Shield className={`w-3.5 h-3.5 ${isAdminLoggedIn ? 'text-pink-200' : 'text-stone-500'}`} />
              <span>{t.admin}</span>
              {isAdminLoggedIn && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-pink-200 bg-pink-50 text-xs font-semibold text-stone-700"
            >
              {language === 'en' ? '🇰🇭' : '🇬🇧'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-600 hover:text-pink-600 hover:bg-pink-50 transition cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-pink-100 bg-white/98 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                  isActive
                    ? 'text-pink-600 bg-pink-50 font-semibold'
                    : 'text-stone-700 hover:bg-pink-50/50 hover:text-pink-600'
                }`}
              >
                <span className="flex items-center gap-2">
                  {Icon && <Icon className="w-4 h-4 text-pink-500" />}
                  {item.label}
                </span>
                {isActive && <ArrowRight className="w-4 h-4 text-pink-500" />}
              </button>
            );
          })}

          <div className="pt-3 border-t border-pink-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-pink-500 text-white font-medium text-sm hover:bg-pink-600 transition shadow-sm shadow-pink-200 cursor-pointer"
            >
              <Shield className="w-4 h-4" />
              <span>{t.admin}</span>
              {isAdminLoggedIn && <span className="text-xs bg-pink-700 px-2 py-0.5 rounded-full">Active</span>}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
