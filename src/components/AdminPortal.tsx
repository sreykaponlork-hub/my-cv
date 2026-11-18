import React, { useState } from 'react';
import { Database, AlertTriangle, FileText, PlusCircle, LayoutDashboard, Folder, MessageSquare, Megaphone, Image, Mail, Users, Settings, ArrowLeft } from 'lucide-react';
import CvEditor from '../admin/CvEditor';

interface AdminPortalProps {
  onReturnHome?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onReturnHome }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [authError] = useState<{ message: string } | null>(null);
  const [supabaseConfig] = useState({ isConfigured: true });

  return (
    <div className="min-h-screen bg-stone-50 flex">
      
      {/* Left Sidebar Menu */}
      <aside className="w-64 bg-white border-r border-stone-200 flex flex-col shrink-0 hidden md:flex">
        {/* Brand Header - Ponlork Sreyka */}
        <div className="p-6 border-b border-stone-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-pink-600 flex items-center justify-center text-white font-bold shadow-sm">
            PS
          </div>
          <div>
            <h1 className="font-bold text-stone-900 text-sm tracking-wide">PONLORK SREYKA</h1>
            <p className="text-[10px] text-stone-500 tracking-wider font-medium">ADMIN PANEL</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 text-sm overflow-y-auto">
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-medium transition cursor-pointer ${
              activeTab === 'dashboard' 
                ? 'bg-pink-600 text-white shadow-md shadow-pink-600/20' 
                : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> 
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'posts' ? 'bg-pink-50 text-pink-600' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <FileText className="w-4 h-4" /> 
            <span>All Posts</span>
          </button>

          <button
            onClick={() => setActiveTab('new-post')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'new-post' ? 'bg-pink-50 text-pink-600' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <PlusCircle className="w-4 h-4" /> 
            <span>New Post</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'categories' ? 'bg-pink-50 text-pink-600' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <Folder className="w-4 h-4" /> 
            <span>Categories</span>
          </button>

          <button
            onClick={() => setActiveTab('comments')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'comments' ? 'bg-pink-50 text-pink-600' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> 
            <span>Comments</span>
          </button>

          <button
            onClick={() => setActiveTab('advertisements')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'advertisements' ? 'bg-pink-50 text-pink-600' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <Megaphone className="w-4 h-4" /> 
            <span>Advertisements</span>
          </button>

          <button
            onClick={() => setActiveTab('media-library')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'media-library' ? 'bg-pink-50 text-pink-600' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <Image className="w-4 h-4" /> 
            <span>Media Library</span>
          </button>

          {/* CV Editor */}
          <button
            onClick={() => setActiveTab('cv-editor')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'cv-editor' ? 'bg-pink-50 text-pink-600' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <FileText className="w-4 h-4" /> 
            <span>CV Editor</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'messages' ? 'bg-pink-50 text-pink-600' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <Mail className="w-4 h-4" /> 
            <span>Messages</span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'subscribers' ? 'bg-pink-50 text-pink-600' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <Users className="w-4 h-4" /> 
            <span>Subscribers</span>
          </button>

          <button
            onClick={() => setActiveTab('site-settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'site-settings' ? 'bg-pink-50 text-pink-600' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <Settings className="w-4 h-4" /> 
            <span>Site Settings</span>
          </button>
        </nav>
      </aside>

      {/* Right Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-stone-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Panel /</span>
            <span className="text-sm font-bold text-stone-800 capitalize">
              {activeTab === 'cv-editor' ? 'CV Editor' : activeTab.replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              supabaseConfig.isConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {supabaseConfig.isConfigured ? 'Connected (Live)' : 'Local Mode'}
            </span>

            {onReturnHome && (
              <button
                onClick={onReturnHome}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-pink-600 bg-stone-100 hover:bg-pink-50 rounded-xl transition cursor-pointer"
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
              <p className="text-sm text-stone-500">Welcome to your admin panel, Ponlork Sreyka! Select any menu from the left sidebar to manage your website content.</p>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-900">All Posts</h2>
              <p className="text-sm text-stone-500">Manage all your published articles here.</p>
            </div>
          )}

          {activeTab === 'new-post' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-900">New Post</h2>
              <p className="text-sm text-stone-500">Create and publish a new blog post.</p>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-900">Categories</h2>
              <p className="text-sm text-stone-500">Organize your content into categories.</p>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-900">Comments</h2>
              <p className="text-sm text-stone-500">Review and moderate user comments.</p>
            </div>
          )}

          {activeTab === 'advertisements' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-900">Advertisements</h2>
              <p className="text-sm text-stone-500">Manage banner ads and promotions.</p>
            </div>
          )}

          {activeTab === 'media-library' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-900">Media Library</h2>
              <p className="text-sm text-stone-500">Upload and manage images and files.</p>
            </div>
          )}

          {/* CV Editor Panel */}
          {activeTab === 'cv-editor' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm">
              <div className="mb-6 pb-4 border-b border-pink-100">
                <h2 className="text-lg sm:text-xl font-bold text-stone-900">CV & Resume Editor</h2>
                <p className="text-xs text-stone-500 mt-0.5">Manage and customize your professional resume data.</p>
              </div>
              <CvEditor />
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-900">Messages</h2>
              <p className="text-sm text-stone-500">View contact inquiries sent by visitors.</p>
            </div>
          )}

          {activeTab === 'subscribers' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-900">Subscribers</h2>
              <p className="text-sm text-stone-500">Manage newsletter subscribers list.</p>
            </div>
          )}

          {activeTab === 'site-settings' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-900">Site Settings</h2>
              <p className="text-sm text-stone-500">Configure global website settings.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminPortal;