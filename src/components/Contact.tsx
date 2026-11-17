import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Mail, Send, CheckCircle2, MapPin, Phone, MessageSquare } from 'lucide-react';
import { PRIMARY_ADMIN_EMAIL } from '../lib/supabase';

interface ContactProps {
  language: Language;
}

export const Contact: React.FC<ContactProps> = ({ language }) => {
  const t = translations[language].contact;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSent(false), 5000);
    }, 600);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-gradient-to-b from-white/40 to-pink-50/60 border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold text-pink-600 tracking-wider uppercase bg-pink-100/80 px-3 py-1 rounded-full">
            {t.subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 mt-3 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-pink-100 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-medium">{t.directEmail}</p>
                  <a
                    href={`mailto:${PRIMARY_ADMIN_EMAIL}`}
                    className="text-sm font-bold text-stone-900 hover:text-pink-600 transition"
                  >
                    {PRIMARY_ADMIN_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-pink-50">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-medium">{t.locationText}</p>
                  <p className="text-sm font-bold text-stone-900">
                    Phnom Penh, Cambodia
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-pink-50">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-medium">Telegram / Social</p>
                  <p className="text-sm font-bold text-stone-900">
                    @sreykaponlork
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200">
              <h3 className="font-serif-display font-bold text-lg mb-1">Open for Opportunities</h3>
              <p className="text-xs sm:text-sm text-pink-100 leading-relaxed">
                Available for internships, HR recruitment assistance, and digital economy academic collaboration.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm">
            {sent ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">Message Delivered!</h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  {t.successMsg}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                    {t.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-pink-200 focus:bg-white focus:border-pink-500 text-xs sm:text-sm text-stone-800 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                    {t.emailLabel} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-pink-200 focus:bg-white focus:border-pink-500 text-xs sm:text-sm text-stone-800 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                    {t.messageLabel} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project or inquiry..."
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-pink-200 focus:bg-white focus:border-pink-500 text-xs sm:text-sm text-stone-800 outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-xs sm:text-sm shadow-md shadow-pink-200 hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t.sendingBtn : t.sendBtn}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
