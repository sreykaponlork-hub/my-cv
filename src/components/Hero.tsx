import React, { useState, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { getProfilePhoto, saveProfilePhoto, DEFAULT_PROFILE_PHOTO } from '../data/portfolioData';
import {
  ArrowRight,
  FileText,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  GraduationCap,
  Briefcase,
  BookOpen,
  Camera,
  Upload,
  Link as LinkIcon,
  RotateCcw,
  X,
  Check
} from 'lucide-react';

interface HeroProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onNavigate }) => {
  const t = translations[language].hero;
  const [photo, setPhoto] = useState<string>(getProfilePhoto());
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle direct file upload from computer/phone
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPhoto(result);
        saveProfilePhoto(result);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          setShowPhotoModal(false);
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle saving URL
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      setPhoto(urlInput.trim());
      saveProfilePhoto(urlInput.trim());
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setShowPhotoModal(false);
      }, 1200);
    }
  };

  // Reset to default
  const handleResetPhoto = () => {
    setPhoto(DEFAULT_PROFILE_PHOTO);
    saveProfilePhoto(DEFAULT_PROFILE_PHOTO);
    setShowPhotoModal(false);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24">
      {/* Soft pink background gradients */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-pink-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-rose-50/70 rounded-full blur-2xl pointer-events-none" />

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Student Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-pink-700 text-xs sm:text-sm font-semibold shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              <span>{t.badge}</span>
            </div>

            {/* Main Headline with Playfair Display font */}
            <div className="space-y-2">
              <p className="text-pink-600 font-semibold tracking-wide text-xs sm:text-sm uppercase">
                {t.greeting}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-tight">
                {language === 'km' ? (
                  <span className="font-khmer font-bold">{t.name}</span>
                ) : (
                  <span className="font-serif-display font-bold">
                    Ponlork <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent">Sreyka</span>
                  </span>
                )}
              </h1>
              <h2 className="text-lg sm:text-xl font-medium text-stone-700">
                {t.role}
              </h2>
            </div>

            {/* Description */}
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.description}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => onNavigate('cv')}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm sm:text-base shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 transition cursor-pointer flex items-center gap-2 group"
              >
                <FileText className="w-4 h-4" />
                <span>{t.ctaCv}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="px-6 py-3 rounded-full bg-white hover:bg-pink-50 text-pink-700 font-semibold text-sm sm:text-base border border-pink-200 hover:border-pink-300 shadow-xs transition cursor-pointer flex items-center gap-2"
              >
                <span>{t.ctaProjects}</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-3 rounded-full text-stone-600 hover:text-pink-600 hover:bg-pink-50/70 font-medium text-sm sm:text-base transition cursor-pointer flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                <span>{t.ctaContact}</span>
              </button>
            </div>

            {/* Social & Contact Direct Links */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 text-stone-500">
              <a
                href="mailto:sreykaponlork@gmail.com"
                className="p-2.5 rounded-full bg-white border border-pink-100 hover:text-pink-600 hover:border-pink-300 transition shadow-2xs hover:scale-105"
                aria-label="Send direct email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/sreykaponlork"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white border border-pink-100 hover:text-pink-600 hover:border-pink-300 transition shadow-2xs hover:scale-105"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/sreyka-ponlork"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white border border-pink-100 hover:text-pink-600 hover:border-pink-300 transition shadow-2xs hover:scale-105"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <span className="text-xs text-stone-400 font-medium pl-1">sreykaponlork@gmail.com</span>
            </div>
          </div>

          {/* Right Column: Visual Portrait with Change Photo Action */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88">
              {/* Outer soft pink glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-pink-300 via-rose-200 to-pink-100 rotate-6 scale-95 opacity-80 blur-xs transition group-hover:rotate-12 duration-500" />
              
              {/* Portrait container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-b from-pink-50 to-rose-50 border-4 border-white shadow-xl shadow-pink-100/50 flex flex-col items-center justify-center p-6 text-center group">
                
                {/* Circular image with camera button */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-pink-400 via-rose-300 to-pink-200 p-1 shadow-inner mb-4">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={photo}
                      alt="Ponlork Sreyka"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Camera overlay button to change picture */}
                  <button
                    onClick={() => setShowPhotoModal(true)}
                    className="absolute bottom-1 right-1 p-2.5 rounded-full bg-pink-600 text-white hover:bg-pink-700 shadow-md transition hover:scale-110 cursor-pointer"
                    title="Change Profile Picture"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-serif-display font-bold text-lg sm:text-xl text-stone-800">Ponlork Sreyka</h3>
                <p className="text-xs text-pink-600 font-medium mt-0.5">Faculty of Digital Economy • NUM</p>
                
                {/* Quick button to change photo */}
                <button
                  onClick={() => setShowPhotoModal(true)}
                  className="mt-2 text-2xs text-pink-700 hover:text-pink-900 font-semibold underline underline-offset-2 cursor-pointer flex items-center gap-1"
                >
                  <Camera className="w-3 h-3" />
                  <span>Change Photo</span>
                </button>

                <div className="mt-3 flex gap-1.5 justify-center">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 font-medium">NUM</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-medium">WEduShare Intern</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 font-medium">Phnom Penh</span>
                </div>
              </div>

              {/* Floating Badge 1: Education */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-6 bg-white/95 backdrop-blur-md border border-pink-200/80 p-3 sm:p-3.5 rounded-2xl shadow-lg shadow-pink-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500 flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-medium">Education</p>
                  <p className="text-xs sm:text-sm font-bold text-stone-800">NUM • Digital Economy</p>
                </div>
              </div>

              {/* Floating Badge 2: Experience */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white/95 backdrop-blur-md border border-pink-200/80 p-3 rounded-2xl shadow-lg shadow-pink-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-800">HR Intern</p>
                  <p className="text-2xs text-pink-600 font-medium">WEduShare / Weduabroad</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Quick Stats Grid */}
        <div className="mt-14 sm:mt-18 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-pink-100/90 shadow-2xs hover:border-pink-200 transition">
            <div className="flex items-center gap-2 text-pink-500 mb-1">
              <GraduationCap className="w-4 h-4" />
              <span className="text-xl sm:text-2xl font-extrabold text-stone-900">NUM</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">National University of Management</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-pink-100/90 shadow-2xs hover:border-pink-200 transition">
            <div className="flex items-center gap-2 text-rose-500 mb-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-xl sm:text-2xl font-extrabold text-stone-900">Year 1</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">Completed Year 1 of Degree</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-pink-100/90 shadow-2xs hover:border-pink-200 transition">
            <div className="flex items-center gap-2 text-pink-500 mb-1">
              <Briefcase className="w-4 h-4" />
              <span className="text-xl sm:text-2xl font-extrabold text-stone-900">6 Months</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">HR Recruitment Internship</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-pink-100/90 shadow-2xs hover:border-pink-200 transition">
            <div className="flex items-center gap-2 text-rose-500 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xl sm:text-2xl font-extrabold text-stone-900">4 Languages</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">Khmer, English, Chinese, French</p>
          </div>
        </div>

      </div>

      {/* =========================================================================
          CHANGE PROFILE PHOTO MODAL
          Allows uploading from device OR pasting any image URL!
         ========================================================================= */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-pink-200 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-pink-600" />
                <h3 className="text-lg font-bold text-stone-900">Change Profile Picture</h3>
              </div>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {saveSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Photo updated successfully!</span>
              </div>
            )}

            {/* Current preview */}
            <div className="flex justify-center">
              <div className="w-28 h-28 rounded-full border-4 border-pink-200 overflow-hidden shadow-inner bg-pink-50">
                <img src={photo} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Option 1: Upload from Computer/Phone */}
            <div>
              <p className="text-xs font-bold text-stone-700 uppercase tracking-wide mb-2">
                Option 1: Upload from your Device
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 font-semibold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Choose Image from Phone / Computer</span>
              </button>
            </div>

            {/* Option 2: Enter Image URL */}
            <div>
              <p className="text-xs font-bold text-stone-700 uppercase tracking-wide mb-2">
                Option 2: Paste an Image URL
              </p>
              <form onSubmit={handleUrlSubmit} className="space-y-2">
                <div className="relative">
                  <LinkIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/my-photo.jpg"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-stone-50 border border-pink-200 focus:bg-white focus:border-pink-500 text-xs text-stone-800 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs transition cursor-pointer"
                >
                  Save URL
                </button>
              </form>
            </div>

            {/* Reset to Default */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleResetPhoto}
                className="text-2xs text-stone-500 hover:text-pink-600 flex items-center gap-1 transition cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to default photo</span>
              </button>

              <button
                type="button"
                onClick={() => setShowPhotoModal(false)}
                className="text-xs text-stone-600 hover:text-stone-900 font-medium"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
