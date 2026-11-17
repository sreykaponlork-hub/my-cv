import React, { useState, useEffect } from 'react';
import { BlogPost, Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Blog } from './components/Blog';
import { CV } from './components/CV';
import { AdminPortal } from './components/AdminPortal';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { fetchBlogPosts, getCurrentAdminUser } from './lib/supabase';

export default function App() {
  // Navigation state
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Language state (persisted)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('sp_language');
    return saved === 'km' ? 'km' : 'en';
  });

  // Blog posts state
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  // Admin Auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Persist language choice
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('sp_language', lang);
  };

  // Load blog posts on mount
  const loadPosts = async () => {
    setIsLoadingPosts(true);
    try {
      const data = await fetchBlogPosts();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  useEffect(() => {
    loadPosts();

    // Check if admin is already signed in
    async function checkAuth() {
      const { user, isAdmin } = await getCurrentAdminUser();
      if (user && isAdmin) {
        setIsAdminLoggedIn(true);
      }
    }
    checkAuth();
  }, []);

  return (
    <div className={`min-h-screen flex flex-col bg-pink-50/30 text-stone-800 ${language === 'km' ? 'font-khmer' : ''}`}>
      
      {/* Top Navigation Bar (Hidden during printing via .no-print) */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={handleSetLanguage}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div>
            <Hero language={language} onNavigate={setCurrentTab} />
            <About language={language} onNavigate={setCurrentTab} />
            <Skills language={language} />
            <Projects language={language} />
            <Blog posts={posts} language={language} />
            <Contact language={language} />
          </div>
        )}

        {currentTab === 'about' && (
          <div className="py-6">
            <About language={language} onNavigate={setCurrentTab} />
          </div>
        )}

        {currentTab === 'skills' && (
          <div className="py-6">
            <Skills language={language} />
          </div>
        )}

        {currentTab === 'projects' && (
          <div className="py-6">
            <Projects language={language} />
          </div>
        )}

        {currentTab === 'blog' && (
          <div className="py-6">
            <Blog posts={posts} language={language} />
          </div>
        )}

        {/* Dedicated CV Page with Print / Save as PDF (Problem 1) */}
        {currentTab === 'cv' && (
          <CV language={language} setLanguage={handleSetLanguage} />
        )}

        {/* Dedicated Admin Portal with Login & Diagnostics (Problem 2) */}
        {currentTab === 'admin' && (
          <AdminPortal
            language={language}
            posts={posts}
            onRefreshPosts={loadPosts}
            onNavigateHome={() => setCurrentTab('home')}
            isAdminLoggedIn={isAdminLoggedIn}
            setIsAdminLoggedIn={setIsAdminLoggedIn}
          />
        )}

        {currentTab === 'contact' && (
          <div className="py-6">
            <Contact language={language} />
          </div>
        )}
      </main>

      {/* Footer (Hidden during printing via .no-print) */}
      <Footer
        language={language}
        onNavigate={setCurrentTab}
        isAdminLoggedIn={isAdminLoggedIn}
      />

    </div>
  );
}
