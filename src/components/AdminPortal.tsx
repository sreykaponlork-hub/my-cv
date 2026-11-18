import React, { useState } from 'react';
import { Database, AlertTriangle, FileText, PlusCircle, LayoutDashboard, Folder, MessageSquare, Megaphone, Image, Mail, Users, Settings, ArrowLeft } from 'lucide-react';
import CvEditor from '../admin/CvEditor';

interface AdminPortalProps {
  onReturnHome?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onReturnHome }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'posts' | 'new-post' | 'cv-editor' | 'diagnostics'>('dashboard');
  const [authError] = useState<{ message: string } | null>(null);
  const [supabaseConfig] = useState({ isConfigured: true });

  return (
    <div className="min-h-screen bg-stone-50 flex">
      
      {/* Left Sidebar Menu */}
      <aside className="w-64 bg-white border-r border-stone-200 flex flex-col shrink-0 hidden md:flex">
        {/* Brand Header */}
        <div className="p-6 border-b border-stone-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-pink-600 flex items-center justify-center text-white font-bold shadow-sm">
            P
          </div>
          <div>
            <h1 className="font-bold text-stone-900 text-sm">PORCHING.</h1>
            <p className="text-[10px] text-stone-500 tracking-wider font-medium">ADMIN PANEL</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 text-sm overflow-y-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-pink-50 text-pink-600 shadow-xs' : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'posts' ? 'bg-pink-50 text-pink-600 shadow-xs' : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <FileText className="w-4 h-4" /> All Posts
          </button>

          <button
            onClick={() => setActiveTab('new-post')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'new-post' ? 'bg-pink-50 text-pink-600 shadow-xs' : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <PlusCircle className="w-4 h-4" /> New Post
          </button>

          <div className="pt-2 pb-1 px-3 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Management</div>

          <button
            onClick={() => setActiveTab('cv-editor')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'cv-editor' ? 'bg-pink-50 text-pink-600 shadow-xs' : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <FileText className="w-4 h-4" /> CV Editor
          </button>

          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'diagnostics' ? 'bg-pink-50 text-pink-600 shadow-xs' : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Settings className="w-4 h-4" /> Site Settings
          </button>
        </nav>
      </aside>

      {/* Right Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Bar inside Content */}
        <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-stone-700 capitalize">
              {activeTab === 'cv-editor' ? 'CV Editor' : activeTab}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              supabaseConfig.isConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {supabaseConfig.isConfigured ? 'Connected (Live)' : 'Local Mode'}
            </span>

            {onReturnHome && (
              <button
                onClick={onReturnHome}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-pink-600 bg-stone-100 hover:bg-pink-50 rounded-lg transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> View Portfolio
              </button>
            )}
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-6 max-w-5xl w-full mx-auto">
          
          {authError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-700">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <p className="text-xs">{authError.message}</p>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-900">Dashboard Overview</h2>
              <p className="text-sm text-stone-500">Welcome to your admin panel. Select a menu from the sidebar to start managing your portfolio.</p>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-900">All Blog Posts</h2>
              <p className="text-sm text-stone-500">View and manage your published articles.</p>
            </div>
          )}

          {activeTab === 'new-post' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-900">Create New Post</h2>
              <p className="text-sm text-stone-500">Write and publish a new article.</p>
            </div>
          )}

          {activeTab === 'diagnostics' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-900">Site Settings & Diagnostics</h2>
              <p className="text-sm text-stone-500">Check system configurations and database connectivity.</p>
            </div>
          )}

          {/* CV Editor Panel Content */}
          {activeTab === 'cv-editor' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm">
              <div className="mb-6 pb-4 border-b border-pink-100">
                <h2 className="text-lg sm:text-xl font-bold text-stone-900">CV & Resume Editor</h2>
                <p className="text-xs text-stone-500 mt-0.5">Manage and customize your professional resume data.</p>
              </div>
              <CvEditor />
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminPortal;