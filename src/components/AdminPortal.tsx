import React, { useState, useEffect } from 'react';
import { BlogPost, Language } from '../types';
import { translations } from '../data/translations';
import {
  loginAdminUser,
  logoutAdminUser,
  getCurrentAdminUser,
  getSupabaseConfig,
  saveCustomSupabaseConfig,
  clearCustomSupabaseConfig,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  PRIMARY_ADMIN_EMAIL,
  SUPABASE_SQL_SCHEMA,
  AuthResult,
} from '../lib/supabase';
import {
  Shield,
  Lock,
  Mail,
  Key,
  AlertTriangle,
  CheckCircle,
  Plus,
  Edit2,
  Trash2,
  Eye,
  LogOut,
  Database,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Settings,
  HelpCircle,
  FileText
} from 'lucide-react';

interface AdminPortalProps {
  language: Language;
  posts: BlogPost[];
  onRefreshPosts: () => Promise<void>;
  onNavigateHome: () => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (logged: boolean) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  language,
  posts,
  onRefreshPosts,
  onNavigateHome,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
}) => {
  const t = translations[language].admin;

  // Login form state
  const [email, setEmail] = useState(PRIMARY_ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<{ message: string; details?: string; type?: string } | null>(null);
  const [activeAdminEmail, setActiveAdminEmail] = useState<string>(PRIMARY_ADMIN_EMAIL);

  // Dashboard active tab
  const [activeTab, setActiveTab] = useState<'posts' | 'editor' | 'diagnostics'>('posts');

  // Post Editor state
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formTitleKm, setFormTitleKm] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formExcerptKm, setFormExcerptKm] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formContentKm, setFormContentKm] = useState('');
  const [formCoverImage, setFormCoverImage] = useState('');
  const [formCategory, setFormCategory] = useState('Engineering');
  const [formTags, setFormTags] = useState('React, Supabase');
  const [formPublished, setFormPublished] = useState(true);
  const [formLanguage, setFormLanguage] = useState<'en' | 'km' | 'both'>('both');
  const [isSavingPost, setIsSavingPost] = useState(false);
  const [postSaveSuccess, setPostSaveSuccess] = useState(false);

  // Diagnostics & Config state
  const [supabaseConfig, setSupabaseConfig] = useState(getSupabaseConfig());
  const [configUrlInput, setConfigUrlInput] = useState(supabaseConfig.url || '');
  const [configKeyInput, setConfigKeyInput] = useState(supabaseConfig.anonKey || '');
  const [copiedSql, setCopiedSql] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configSuccessMsg, setConfigSuccessMsg] = useState('');

  // Delete confirmation
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  // Check existing session on mount
  useEffect(() => {
    async function checkAuth() {
      const { user, isAdmin } = await getCurrentAdminUser();
      if (isAdmin) {
        setIsAdminLoggedIn(true);
        setActiveAdminEmail(localStorage.getItem('sp_admin_user_email') || user?.email || PRIMARY_ADMIN_EMAIL);
      }
    }
    checkAuth();
  }, [setIsAdminLoggedIn]);

  // Handle Admin Login with comprehensive error diagnosis
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError(null);

    const result: AuthResult = await loginAdminUser(email, password);

    if (result.success) {
      setIsAdminLoggedIn(true);
      setActiveAdminEmail(result.user?.email || email);
      setAuthError(null);
    } else {
      setAuthError({
        message: result.message,
        details: result.details,
        type: result.errorType,
      });
    }

    setIsSubmitting(false);
  };

  // Demo Login for instantaneous testing
  const handleDemoLogin = () => {
    setIsAdminLoggedIn(true);
    setActiveAdminEmail('sreykaponlork@gmail.com (Demo Admin)');
    setAuthError(null);
  };

  const handleLogout = async () => {
    await logoutAdminUser();
    setIsAdminLoggedIn(false);
    setPassword('');
  };

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingPostId) {
      const slugified = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormSlug(slugified);
    }
  };

  // Start new post
  const handleStartNewPost = () => {
    setEditingPostId(null);
    setFormTitle('');
    setFormTitleKm('');
    setFormSlug('');
    setFormExcerpt('');
    setFormExcerptKm('');
    setFormContent('');
    setFormContentKm('');
    setFormCoverImage('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&q=80');
    setFormCategory('Engineering');
    setFormTags('React, TypeScript, Supabase');
    setFormPublished(true);
    setFormLanguage('both');
    setActiveTab('editor');
  };

  // Start editing existing post
  const handleStartEditPost = (post: BlogPost) => {
    setEditingPostId(post.id);
    setFormTitle(post.title);
    setFormTitleKm(post.title_km || '');
    setFormSlug(post.slug);
    setFormExcerpt(post.excerpt || '');
    setFormExcerptKm(post.excerpt_km || '');
    setFormContent(post.content || '');
    setFormContentKm(post.content_km || '');
    setFormCoverImage(post.cover_image || '');
    setFormCategory(post.category);
    setFormTags(post.tags.join(', '));
    setFormPublished(post.published);
    setFormLanguage(post.language);
    setActiveTab('editor');
  };

  // Save post (Create or Update)
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    setIsSavingPost(true);
    setPostSaveSuccess(false);

    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: formTitle.trim(),
      title_km: formTitleKm.trim() || formTitle.trim(),
      slug: formSlug.trim() || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: formExcerpt.trim(),
      excerpt_km: formExcerptKm.trim() || formExcerpt.trim(),
      content: formContent.trim(),
      content_km: formContentKm.trim() || formContent.trim(),
      cover_image: formCoverImage.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&q=80',
      category: formCategory.trim() || 'Tech',
      tags: tagsArray.length > 0 ? tagsArray : ['Tech'],
      author: 'Ponlork Sreyka',
      published: formPublished,
      read_time: `${Math.max(2, Math.ceil(formContent.split(' ').length / 180))} min read`,
      language: formLanguage,
    };

    if (editingPostId) {
      await updateBlogPost(editingPostId, payload);
    } else {
      await createBlogPost(payload);
    }

    await onRefreshPosts();
    setIsSavingPost(false);
    setPostSaveSuccess(true);

    setTimeout(() => {
      setPostSaveSuccess(false);
      setActiveTab('posts');
    }, 1200);
  };

  // Delete post
  const handleConfirmDelete = async () => {
    if (!postToDelete) return;
    await deleteBlogPost(postToDelete.id);
    await onRefreshPosts();
    setPostToDelete(null);
  };

  // Copy SQL
  const handleCopySql = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    }
  };

  // Save custom Supabase credentials
  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    const saved = saveCustomSupabaseConfig(configUrlInput, configKeyInput);
    if (saved) {
      setSupabaseConfig(getSupabaseConfig());
      setConfigSuccessMsg('Supabase credentials saved successfully!');
      setTimeout(() => setConfigSuccessMsg(''), 3000);
    }
  };

  const handleResetCredentials = () => {
    clearCustomSupabaseConfig();
    setSupabaseConfig(getSupabaseConfig());
    setConfigUrlInput('');
    setConfigKeyInput('');
    setConfigSuccessMsg('Credentials reset to defaults.');
    setTimeout(() => setConfigSuccessMsg(''), 3000);
  };

  // =========================================================================
  // VIEW 1: AUTHENTICATION SCREEN (When user is NOT logged in)
  // Fixes Problem 2: Admin Portal Login with crystal-clear error diagnosis
  // =========================================================================
  if (!isAdminLoggedIn) {
    return (
      <div className="py-12 sm:py-20 min-h-screen">
        <div className="max-w-xl mx-auto px-4 sm:px-6">

          {/* Admin Header Box */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-pink-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-pink-200 mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-pink-600 uppercase tracking-wider bg-pink-100 px-3 py-1 rounded-full">
              {t.subtitle}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">
              {t.loginTitle}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {t.loginSubtitle}
            </p>
          </div>

          {/* Main Login Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-200/80 shadow-xl shadow-pink-100/50 space-y-6">

            {/* Supabase Status Pill */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-pink-50/70 border border-pink-100 text-xs">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-pink-500" />
                <span className="font-semibold text-stone-700">Supabase Connection:</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full font-bold text-2xs ${
                supabaseConfig.isConfigured
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {supabaseConfig.isConfigured ? 'Connected (Live)' : 'Local Storage Mode'}
              </span>
            </div>

            {/* Authorized Admin Notice */}
            <div className="p-3.5 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-2xl flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
              <div className="text-xs text-stone-700">
                <span className="font-bold text-pink-700">{t.authorizedEmailNote}</span>
                <p className="text-stone-500 text-2xs mt-0.5">
                  Your registered account in Supabase Authentication is automatically verified as Administrator.
                </p>
              </div>
            </div>

            {/* ERROR DIAGNOSTICS BANNER (Direct fix for Problem 2) */}
            {authError && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-start gap-2.5 text-rose-800">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold">Authentication Issue Detected</h4>
                    <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                      {authError.message}
                    </p>
                  </div>
                </div>

                {authError.details && (
                  <div className="mt-2 p-2.5 rounded-xl bg-white/90 border border-rose-200 text-2xs text-stone-700 font-mono">
                    <span className="font-bold text-rose-600">Supabase Diagnostics: </span>
                    {authError.details}
                  </div>
                )}

                {/* Specific Action Guidance for "Email Not Confirmed" */}
                {authError.type === 'EMAIL_NOT_CONFIRMED' && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-2xs text-amber-900 space-y-1">
                    <p className="font-bold">⚡ How to fix in Supabase:</p>
                    <ol className="list-decimal list-inside space-y-1 pl-1">
                      <li>Open your Supabase Project Dashboard.</li>
                      <li>Go to <strong>Authentication → Users</strong>.</li>
                      <li>Find <strong>sreykaponlork@gmail.com</strong>.</li>
                      <li>Click the <strong>"..."</strong> button on the right and select <strong>"Confirm User"</strong>.</li>
                      <li>Return here and log in again!</li>
                    </ol>
                  </div>
                )}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sreykaponlork@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-pink-200 focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-100 text-xs sm:text-sm text-stone-800 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                  {t.passwordLabel}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-pink-200 focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-100 text-xs sm:text-sm text-stone-800 outline-none transition"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm shadow-md shadow-pink-200 hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t.signingIn}</span>
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    <span>{t.signInBtn}</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Mode & Config Buttons */}
            <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="flex-1 py-2 px-3 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>{t.demoBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowConfigModal(!showConfigModal)}
                className="py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5 text-stone-500" />
                <span>Supabase Settings</span>
              </button>
            </div>

            {/* In-app Supabase Connection Settings Drawer */}
            {showConfigModal && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-pink-200 text-xs space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-stone-800 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-pink-500" />
                    <span>Supabase Project Credentials</span>
                  </h4>
                  <span className="text-2xs text-stone-500">Stored in browser localStorage</span>
                </div>

                <form onSubmit={handleSaveCredentials} className="space-y-2.5">
                  <div>
                    <label className="text-2xs font-semibold text-stone-600">Supabase Project URL</label>
                    <input
                      type="text"
                      placeholder="https://your-project.supabase.co"
                      value={configUrlInput}
                      onChange={(e) => setConfigUrlInput(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-2xs font-semibold text-stone-600">Supabase Anon Key</label>
                    <input
                      type="password"
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      value={configKeyInput}
                      onChange={(e) => setConfigKeyInput(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-mono"
                    />
                  </div>

                  {configSuccessMsg && (
                    <p className="text-2xs text-emerald-600 font-medium">{configSuccessMsg}</p>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      className="flex-1 py-1.5 bg-pink-600 text-white rounded-lg text-xs font-semibold hover:bg-pink-700"
                    >
                      Save & Connect
                    </button>
                    <button
                      type="button"
                      onClick={handleResetCredentials}
                      className="px-3 py-1.5 bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-300"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>

          {/* Quick return button */}
          <div className="text-center mt-6">
            <button
              onClick={onNavigateHome}
              className="text-xs text-stone-500 hover:text-pink-600 transition cursor-pointer"
            >
              ← Return to Portfolio Homepage
            </button>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // Features: Full CRUD blog post manager, markdown post editor, Supabase diagnostics
  // =========================================================================
  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.filter((p) => !p.published).length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  return (
    <div id="admin-portal-root" className="py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Admin Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-pink-200/90 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                {t.dashboardTitle}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              {t.welcome} <span className="font-semibold text-pink-600">({activeAdminEmail})</span>
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={handleStartNewPost}
              className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs sm:text-sm transition cursor-pointer flex items-center gap-1.5 shadow-sm shadow-pink-200"
            >
              <Plus className="w-4 h-4" />
              <span>{t.createPostBtn}</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-pink-50 text-stone-700 hover:text-pink-700 font-semibold text-xs sm:text-sm transition cursor-pointer flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>View Portfolio</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-700 font-semibold text-xs sm:text-sm transition cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>{t.signOutBtn}</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-2xs">
            <p className="text-xs text-stone-500 font-medium">{t.totalPosts}</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">{posts.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-2xs">
            <p className="text-xs text-stone-500 font-medium">{t.publishedCount}</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">{publishedCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-2xs">
            <p className="text-xs text-stone-500 font-medium">{t.draftCount}</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">{draftCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-2xs">
            <p className="text-xs text-stone-500 font-medium">{t.totalViews}</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-pink-600 mt-1">{totalViews.toLocaleString()}</p>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-pink-100 pb-2">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'posts'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-pink-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t.tabPosts}</span>
            <span className="text-2xs bg-white/20 px-1.5 py-0.5 rounded-full">{posts.length}</span>
          </button>

          <button
            onClick={() => {
              if (activeTab !== 'editor') handleStartNewPost();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'editor'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-pink-50'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{editingPostId ? 'Edit Article' : t.tabCreate}</span>
          </button>

          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'diagnostics'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-pink-50'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>{t.tabDiagnostics}</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: POSTS LIST TABLE
           ========================================================================= */}
        {activeTab === 'posts' && (
          <div className="bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-pink-50/70 border-b border-pink-100 text-stone-700 uppercase font-bold text-2xs tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Article</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4">Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-pink-50/40 transition">
                      <td className="py-4 px-6">
                        <div className="font-bold text-stone-900 line-clamp-1">{post.title}</div>
                        {post.title_km && (
                          <div className="text-2xs text-stone-500 font-khmer line-clamp-1">{post.title_km}</div>
                        )}
                        <div className="text-2xs text-pink-600 font-mono mt-0.5">/{post.slug}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-md bg-pink-50 text-pink-700 font-semibold text-2xs border border-pink-100">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-2xs font-bold ${
                          post.published
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-200 text-stone-700'
                        }`}>
                          {post.published ? t.statusPublished : t.statusDraft}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-2xs text-stone-500 whitespace-nowrap">
                        {new Date(post.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => handleStartEditPost(post)}
                          className="p-1.5 rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100 transition cursor-pointer"
                          title="Edit post"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setPostToDelete(post)}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition cursor-pointer"
                          title="Delete post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: POST EDITOR (Create / Edit Post)
           ========================================================================= */}
        {activeTab === 'editor' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-pink-100">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                {editingPostId ? t.postForm.editTitle : t.postForm.newTitle}
              </h2>
              <button
                onClick={() => setActiveTab('posts')}
                className="text-xs text-stone-500 hover:text-stone-800"
              >
                Cancel & Return
              </button>
            </div>

            {postSaveSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Article saved successfully! Syncing with Supabase and local cache...</span>
              </div>
            )}

            <form onSubmit={handleSavePost} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                    {t.postForm.titleLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Building Modern Full-Stack Web Apps"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-pink-200 focus:bg-white focus:border-pink-500 text-xs sm:text-sm text-stone-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5 font-khmer">
                    {t.postForm.titleKmLabel}
                  </label>
                  <input
                    type="text"
                    value={formTitleKm}
                    onChange={(e) => setFormTitleKm(e.target.value)}
                    placeholder="ឧទាហរណ៍៖ ការកសាងកម្មវិធី Full-Stack ទំនើប"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-pink-200 focus:bg-white focus:border-pink-500 text-xs sm:text-sm text-stone-800 outline-none font-khmer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                    {t.postForm.slugLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="article-slug"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-pink-200 focus:bg-white focus:border-pink-500 text-xs sm:text-sm text-stone-800 font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                    {t.postForm.categoryLabel}
                  </label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="Engineering"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-pink-200 focus:bg-white focus:border-pink-500 text-xs sm:text-sm text-stone-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                    {t.postForm.tagsLabel}
                  </label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="React, Supabase, TypeScript"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-pink-200 focus:bg-white focus:border-pink-500 text-xs sm:text-sm text-stone-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                  {t.postForm.coverImageLabel}
                </label>
                <input
                  type="url"
                  value={formCoverImage}
                  onChange={(e) => setFormCoverImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-pink-200 focus:bg-white focus:border-pink-500 text-xs sm:text-sm text-stone-800 font-mono outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                    {t.postForm.excerptLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={formExcerpt}
                    onChange={(e) => setFormExcerpt(e.target.value)}
                    placeholder="A brief summary for previews..."
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-pink-200 focus:bg-white focus:border-pink-500 text-xs sm:text-sm text-stone-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5 font-khmer">
                    {t.postForm.excerptKmLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={formExcerptKm}
                    onChange={(e) => setFormExcerptKm(e.target.value)}
                    placeholder="សេចក្តីសង្ខេបជាភាសាខ្មែរ..."
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-pink-200 focus:bg-white focus:border-pink-500 text-xs sm:text-sm text-stone-800 outline-none font-khmer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                  {t.postForm.contentLabel}
                </label>
                <textarea
                  rows={8}
                  required
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Write in Markdown. Use ### for subheadings, ``` for code blocks, and double newlines for paragraphs."
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-pink-200 focus:bg-white focus:border-pink-500 text-xs sm:text-sm text-stone-800 font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5 font-khmer">
                  {t.postForm.contentKmLabel}
                </label>
                <textarea
                  rows={6}
                  value={formContentKm}
                  onChange={(e) => setFormContentKm(e.target.value)}
                  placeholder="ខ្លឹមសារជាភាសាខ្មែរ..."
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-pink-200 focus:bg-white focus:border-pink-500 text-xs sm:text-sm text-stone-800 outline-none font-khmer"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                    className="w-4 h-4 rounded-sm text-pink-600 focus:ring-pink-500 border-pink-300"
                  />
                  <span className="text-xs font-semibold text-stone-800">
                    {t.postForm.publishToggle}
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-pink-100">
                <button
                  type="submit"
                  disabled={isSavingPost}
                  className="px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs sm:text-sm transition cursor-pointer shadow-sm shadow-pink-200"
                >
                  {isSavingPost ? t.postForm.savingBtn : t.postForm.saveBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('posts')}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs sm:text-sm"
                >
                  {t.postForm.cancelBtn}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =========================================================================
            TAB 3: SUPABASE DIAGNOSTICS & SQL SCHEMA
           ========================================================================= */}
        {activeTab === 'diagnostics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Database className="w-5 h-5 text-pink-500" />
                  <span>{t.diagnostics.title}</span>
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Inspect the live Supabase client status, verified admin privileges, and database configuration.
                </p>
              </div>

              {/* Status Overview Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 font-semibold">{t.diagnostics.status}:</span>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-2xs ${
                      supabaseConfig.isConfigured
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {supabaseConfig.isConfigured ? t.diagnostics.connected : t.diagnostics.notConnected}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 font-semibold">{t.diagnostics.configuredSource}:</span>
                    <span className="font-mono text-stone-800">{supabaseConfig.source.toUpperCase()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 font-semibold">{t.diagnostics.currentUser}:</span>
                    <span className="font-semibold text-pink-600">{activeAdminEmail}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 font-semibold">{t.diagnostics.adminVerified}:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> YES
                    </span>
                  </div>
                </div>

                {/* Setup Guide */}
                <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 text-xs space-y-2">
                  <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-pink-500" />
                    <span>{t.diagnostics.setupTitle}</span>
                  </h4>
                  <ul className="text-2xs text-stone-700 space-y-1.5 leading-relaxed">
                    <li>{t.diagnostics.step1}</li>
                    <li>{t.diagnostics.step2}</li>
                    <li>{t.diagnostics.step3}</li>
                    <li className="font-bold text-pink-800">{t.diagnostics.step4}</li>
                  </ul>
                </div>
              </div>

              {/* SQL Schema Box */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                    {t.diagnostics.sqlSnippetTitle}
                  </h4>
                  <button
                    onClick={handleCopySql}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-lg text-xs font-semibold transition cursor-pointer"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? t.diagnostics.copied : t.diagnostics.copySql}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-stone-900 text-pink-200 font-mono text-2xs overflow-x-auto shadow-inner leading-relaxed">
                  <code>{SUPABASE_SQL_SCHEMA}</code>
                </pre>
              </div>

              {/* Credentials Configuration Form */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                  Configure Live Supabase Project
                </h4>
                <form onSubmit={handleSaveCredentials} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-2xs font-semibold text-stone-600 block mb-1">
                        VITE_SUPABASE_URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://xyz.supabase.co"
                        value={configUrlInput}
                        onChange={(e) => setConfigUrlInput(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-2xs font-semibold text-stone-600 block mb-1">
                        VITE_SUPABASE_ANON_KEY
                      </label>
                      <input
                        type="password"
                        placeholder="eyJhbGciOiJIUzI1NiIs..."
                        value={configKeyInput}
                        onChange={(e) => setConfigKeyInput(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>

                  {configSuccessMsg && (
                    <p className="text-2xs text-emerald-600 font-bold">{configSuccessMsg}</p>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-pink-600 text-white font-semibold text-xs rounded-xl hover:bg-pink-700 transition"
                    >
                      {t.diagnostics.saveCustomConfig}
                    </button>
                    <button
                      type="button"
                      onClick={handleResetCredentials}
                      className="px-4 py-2 bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl hover:bg-stone-300 transition"
                    >
                      {t.diagnostics.clearConfig}
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {postToDelete && (
          <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-pink-200 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-stone-900">Delete Blog Post</h3>
                <p className="text-xs text-stone-600 mt-1">
                  {t.confirmDelete}
                </p>
                <p className="text-xs font-semibold text-pink-600 mt-2 font-mono">
                  "{postToDelete.title}"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition cursor-pointer"
                >
                  Yes, Delete Post
                </button>
                <button
                  onClick={() => setPostToDelete(null)}
                  className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
