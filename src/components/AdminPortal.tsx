import React, { useState } from 'react';
import { Database, AlertTriangle, FileText, PlusCircle, LayoutDashboard, Folder, MessageSquare, Megaphone, Image, Mail, Users, Settings, ArrowLeft, Lock, Mail as MailIcon } from 'lucide-react';
import CvEditor from '../admin/CvEditor';

interface AdminPortalProps {
  onReturnHome?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onReturnHome }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [supabaseConfig] = useState({ isConfigured: true });

  // មុខងារផ្ទៀងផ្ទាត់ Email និង Password របស់អ្នក
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === 'Sreykaponlork@gmail.com'.toLowerCase() && password === '261127') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Email ឬ Password មិនត្រឹមត្រូវទេ សូមព្យាយាមម្តងទៀត។');
    }
  };

  // បើមិនទាន់ Login គឺបង្ហាញ Form ឱ្យវាយ Email និង Password
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-stone-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-pink-600 rounded-2xl mx-auto flex items-center justify-center text-white font-bold text-lg shadow-md shadow-pink-600/30">
              PS
            </div>
            <h1 className="text-xl font-bold text-stone-900">PONLORK SREYKA</h1>
            <p className="text-xs text-stone-500">សូមបញ្ចូល Email និង Password របស់អ្នកដើម្បីចូលកាន់ Admin Portal</p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Email Address</label>
              <div className="relative">
                <MailIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Sreykaponlork@gmail.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm bg-stone-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm bg-stone-50/50"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl shadow-md shadow-pink-600/20 transition cursor-pointer text-sm"
            >
              Login to Admin Panel
            </button>
          </form>

          {onReturnHome && (
            <div className="text-center pt-2">
              <button
                onClick={onReturnHome}
                className="text-xs text-stone-500 hover:text-pink-600 transition inline-flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> ប្រាំទៅកាន់ទំព័រដើម (Home)
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // បើ Login ជាប់ហើយ វានឹងបង្ហាញ Sidebar ពេញលេញ
  return (
    <div className="min-h-screen bg-stone-50 flex">
      
      {/* Left Sidebar Menu */}
      <aside className="w-64 bg-white border-r border-stone-200 flex flex-col shrink-0 hidden md:flex">
        <div className="p-6 border-b border-stone-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-pink-600 flex items-center justify-center text-white font-bold shadow-sm">
            PS
          </div>
          <div>
            <h1 className="font-bold text-stone-900 text-sm tracking-wide">PONLORK SREYKA</h1>
            <p className="text-[10px] text-stone-500 tracking-wider font-medium">ADMIN PANEL</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 text-sm overflow-y-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-medium transition cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-pink-600 text-white shadow-md shadow-pink-600/20' : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('cv-editor')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'cv-editor' ? 'bg-pink-50 text-pink-600' : 'text-stone-500 hover:bg-stone-50'
            }`}
          >
            <FileText className="w-4 h-4" /> <span>CV Editor</span>
          </button>

          <button
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-rose-600 hover:bg-rose-50 transition cursor-pointer mt-6"
          >
            <ArrowLeft className="w-4 h-4" /> <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Right Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-stone-200 px-8 py-4 flex items-center justify-between">
          <span className="text-sm font-bold text-stone-800 capitalize">{activeTab}</span>
          {onReturnHome && (
            <button
              onClick={onReturnHome}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-pink-600 bg-stone-100 hover:bg-pink-50 rounded-xl transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> View Portfolio
            </button>
          )}
        </header>

        <div className="p-6 sm:p-10 space-y-6 max-w-5xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-900">Dashboard Overview</h2>
              <p className="text-sm text-stone-500">Welcome back, Ponlork Sreyka!</p>
            </div>
          )}

          {activeTab === 'cv-editor' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 mb-4">CV & Resume Editor</h2>
              <CvEditor />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPortal;