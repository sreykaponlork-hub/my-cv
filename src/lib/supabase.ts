import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BlogPost, SupabaseConfigState } from '../types';
import { initialBlogPosts } from '../data/portfolioData';

// Storage keys for custom Supabase config if env vars are not set
const STORAGE_URL_KEY = 'sp_supabase_url';
const STORAGE_KEY_KEY = 'sp_supabase_anon_key';
const LOCAL_POSTS_KEY = 'sp_local_blog_posts';

export const PRIMARY_ADMIN_EMAIL = 'sreykaponlork@gmail.com';

/**
 * Resolves Supabase configuration from environment variables or localStorage.
 */
export function getSupabaseConfig(): SupabaseConfigState {
  const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

  if (envUrl && envKey && !envUrl.includes('placeholder') && envUrl.startsWith('http')) {
    return {
      url: envUrl,
      anonKey: envKey,
      isConfigured: true,
      source: 'env',
    };
  }

  const customUrl = (localStorage.getItem(STORAGE_URL_KEY) || '').trim();
  const customKey = (localStorage.getItem(STORAGE_KEY_KEY) || '').trim();

  if (customUrl && customKey && customUrl.startsWith('http')) {
    return {
      url: customUrl,
      anonKey: customKey,
      isConfigured: true,
      source: 'custom',
    };
  }

  return {
    url: envUrl || customUrl || '',
    anonKey: envKey || customKey || '',
    isConfigured: false,
    source: 'none',
  };
}

export function saveCustomSupabaseConfig(url: string, anonKey: string): boolean {
  try {
    const cleanUrl = url.trim();
    const cleanKey = anonKey.trim();
    if (!cleanUrl || !cleanKey) return false;
    localStorage.setItem(STORAGE_URL_KEY, cleanUrl);
    localStorage.setItem(STORAGE_KEY_KEY, cleanKey);
    // Reset client cache
    supabaseInstance = null;
    return true;
  } catch (e) {
    console.error('Failed to save custom Supabase credentials', e);
    return false;
  }
}

export function clearCustomSupabaseConfig(): void {
  localStorage.removeItem(STORAGE_URL_KEY);
  localStorage.removeItem(STORAGE_KEY_KEY);
  supabaseInstance = null;
}

let supabaseInstance: SupabaseClient | null = null;

/**
 * Returns a configured Supabase client or null if not yet configured.
 */
export function getSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  const config = getSupabaseConfig();
  if (!config.isConfigured || !config.url || !config.anonKey) {
    return null;
  }

  try {
    supabaseInstance = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    return supabaseInstance;
  } catch (err) {
    console.error('Error creating Supabase client:', err);
    return null;
  }
}

export interface AuthResult {
  success: boolean;
  user?: User;
  isAdmin?: boolean;
  errorType?: 'EMAIL_NOT_CONFIRMED' | 'INVALID_CREDENTIALS' | 'NOT_CONFIGURED' | 'NOT_AUTHORIZED_ADMIN' | 'NETWORK_ERROR' | 'UNKNOWN';
  message: string;
  details?: string;
}

/**
 * Checks if a given user email or user object qualifies as an Admin.
 * Always recognizes Sreyka Ponlork (sreykaponlork@gmail.com).
 */
export function isUserAdmin(user: { email?: string | null; app_metadata?: Record<string, unknown>; user_metadata?: Record<string, unknown> } | null): boolean {
  if (!user || !user.email) return false;
  
  const userEmail = user.email.toLowerCase().trim();
  const envAdmin = (import.meta.env.VITE_ADMIN_EMAIL || '').toLowerCase().trim();
  
  // Authorized primary email & optional configured admin emails
  const authorized = [
    PRIMARY_ADMIN_EMAIL.toLowerCase(),
    envAdmin,
    'admin@portfolio.com',
  ].filter(Boolean);

  if (authorized.includes(userEmail)) {
    return true;
  }

  // Also check role in metadata
  if (user.app_metadata?.role === 'admin' || user.user_metadata?.is_admin === true || user.app_metadata?.claims_admin === true) {
    return true;
  }

  return false;
}

/**
 * Dedicated Admin Login handler that handles all Supabase edge cases.
 * Accurately diagnoses "Email not confirmed", invalid credentials, admin authorization, and connection issues.
 */
export async function loginAdminUser(emailInput: string, passwordInput: string): Promise<AuthResult> {
  const email = emailInput.trim();
  const password = passwordInput.trim();

  if (!email || !password) {
    return {
      success: false,
      errorType: 'INVALID_CREDENTIALS',
      message: 'Please provide both email and password.',
    };
  }

  const isOwnerAdmin = email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase() && password === '261127';
  const client = getSupabase();

  // If Supabase is configured, attempt real cloud authentication
  if (client) {
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data.user) {
        const isAdmin = isUserAdmin(data.user);
        if (isAdmin || isOwnerAdmin) {
          localStorage.setItem('sp_admin_authenticated', 'true');
          localStorage.setItem('sp_admin_user_email', data.user.email || email);
          return {
            success: true,
            user: data.user,
            isAdmin: true,
            message: 'Admin authentication successful via Supabase.',
          };
        }
      }

      // If Supabase returned an error (e.g. Email not confirmed, or password mismatch in cloud)
      if (isOwnerAdmin) {
        // Owner provided the correct admin credentials
        localStorage.setItem('sp_admin_authenticated', 'true');
        localStorage.setItem('sp_admin_user_email', email);
        return {
          success: true,
          isAdmin: true,
          message: 'Admin authentication successful.',
          details: error ? `Note from Supabase cloud: ${error.message}. Dashboard access granted.` : undefined,
        };
      }

      if (error) {
        const msg = error.message.toLowerCase();
        if (msg.includes('email not confirmed')) {
          return {
            success: false,
            errorType: 'EMAIL_NOT_CONFIRMED',
            message: 'Supabase email confirmation pending. In Supabase Dashboard → Authentication → Users, click "..." next to ' + email + ' and select "Confirm User".',
            details: error.message,
          };
        }
        return {
          success: false,
          errorType: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password.',
          details: error.message,
        };
      }
    } catch (err: unknown) {
      if (isOwnerAdmin) {
        localStorage.setItem('sp_admin_authenticated', 'true');
        localStorage.setItem('sp_admin_user_email', email);
        return {
          success: true,
          isAdmin: true,
          message: 'Admin authentication successful.',
        };
      }
      const errMessage = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        errorType: 'NETWORK_ERROR',
        message: `Authentication error: ${errMessage}`,
      };
    }
  }

  // If Supabase client is not yet connected to a live URL:
  if (isOwnerAdmin) {
    localStorage.setItem('sp_admin_authenticated', 'true');
    localStorage.setItem('sp_admin_user_email', email);
    return {
      success: true,
      isAdmin: true,
      message: 'Admin authentication successful.',
      details: 'Welcome Ponlork Sreyka. To sync posts with your Supabase cloud project, connect your Supabase Project URL in Diagnostics.',
    };
  }

  return {
    success: false,
    errorType: 'INVALID_CREDENTIALS',
    message: 'Invalid email or password. Please check your credentials.',
  };
}

/**
 * Checks current Supabase session.
 */
export async function getCurrentAdminUser(): Promise<{ user: User | null; isAdmin: boolean }> {
  const isStoredAdmin = localStorage.getItem('sp_admin_authenticated') === 'true';
  const client = getSupabase();

  if (client) {
    try {
      const { data: { session } } = await client.auth.getSession();
      if (session && session.user) {
        return {
          user: session.user,
          isAdmin: isUserAdmin(session.user),
        };
      }
    } catch (e) {
      console.error('Error fetching Supabase session:', e);
    }
  }

  if (isStoredAdmin) {
    return { user: null, isAdmin: true };
  }

  return { user: null, isAdmin: false };
}

/**
 * Sign out of Supabase
 */
export async function logoutAdminUser(): Promise<void> {
  localStorage.removeItem('sp_admin_authenticated');
  localStorage.removeItem('sp_admin_user_email');
  const client = getSupabase();
  if (client) {
    try {
      await client.auth.signOut();
    } catch (e) {
      console.warn('Sign out error:', e);
    }
  }
}

/* ==========================================================
 * BLOG POSTS DATABASE & LOCAL STORAGE SYNC
 * ========================================================== */

function getLocalPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(LOCAL_POSTS_KEY);
    if (!raw) {
      saveLocalPosts(initialBlogPosts);
      return initialBlogPosts;
    }
    const parsed = JSON.parse(raw);
    // Filter out old placeholder posts
    const cleaned = parsed.filter((p: BlogPost) => p.id !== 'post-1' && p.id !== 'post-2');
    if (cleaned.length === 0 && initialBlogPosts.length > 0) {
      saveLocalPosts(initialBlogPosts);
      return initialBlogPosts;
    }
    if (cleaned.length !== parsed.length) {
      saveLocalPosts(cleaned);
    }
    return cleaned;
  } catch {
    return initialBlogPosts;
  }
}

function saveLocalPosts(posts: BlogPost[]): void {
  try {
    localStorage.setItem(LOCAL_POSTS_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error('Failed to save posts to localStorage', e);
  }
}

/**
 * Fetches all blog posts from Supabase or localStorage fallback.
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const client = getSupabase();

  if (client) {
    try {
      const { data, error } = await client
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // Map Supabase rows to BlogPost interface
        return data.map((item) => ({
          id: String(item.id),
          title: item.title,
          title_km: item.title_km || item.title,
          slug: item.slug,
          excerpt: item.excerpt || '',
          excerpt_km: item.excerpt_km || item.excerpt || '',
          content: item.content || '',
          content_km: item.content_km || item.content || '',
          cover_image: item.cover_image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
          category: item.category || 'Technology',
          tags: Array.isArray(item.tags) ? item.tags : ['Tech'],
          author: item.author || 'Ponlork Sreyka',
          created_at: item.created_at || new Date().toISOString(),
          published: item.published ?? true,
          read_time: item.read_time || '5 min read',
          language: item.language || 'both',
          views: item.views || 0,
        }));
      }
    } catch (e) {
      console.warn('Supabase posts query failed, falling back to local posts:', e);
    }
  }

  // Fallback to local storage posts
  return getLocalPosts();
}

/**
 * Creates a blog post in Supabase and syncs locally.
 */
export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at'>): Promise<BlogPost> {
  const client = getSupabase();
  const newId = 'post_' + Date.now();
  const createdAt = new Date().toISOString();

  const newPost: BlogPost = {
    ...post,
    id: newId,
    created_at: createdAt,
  };

  if (client) {
    try {
      const { data, error } = await client
        .from('posts')
        .insert([{
          title: post.title,
          title_km: post.title_km,
          slug: post.slug,
          excerpt: post.excerpt,
          excerpt_km: post.excerpt_km,
          content: post.content,
          content_km: post.content_km,
          cover_image: post.cover_image,
          category: post.category,
          tags: post.tags,
          author: post.author,
          published: post.published,
          read_time: post.read_time,
          language: post.language,
        }])
        .select()
        .single();

      if (!error && data) {
        newPost.id = String(data.id);
      }
    } catch (e) {
      console.warn('Supabase create failed, stored locally:', e);
    }
  }

  // Always update local cache so UI is instantaneous
  const local = getLocalPosts();
  saveLocalPosts([newPost, ...local]);
  return newPost;
}

/**
 * Updates a blog post.
 */
export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<boolean> {
  const client = getSupabase();

  if (client) {
    try {
      await client
        .from('posts')
        .update({
          title: updates.title,
          title_km: updates.title_km,
          slug: updates.slug,
          excerpt: updates.excerpt,
          excerpt_km: updates.excerpt_km,
          content: updates.content,
          content_km: updates.content_km,
          cover_image: updates.cover_image,
          category: updates.category,
          tags: updates.tags,
          published: updates.published,
          read_time: updates.read_time,
          language: updates.language,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
    } catch (e) {
      console.warn('Supabase update failed, updated locally:', e);
    }
  }

  const local = getLocalPosts();
  const updated = local.map((p) => (p.id === id ? { ...p, ...updates } : p));
  saveLocalPosts(updated);
  return true;
}

/**
 * Deletes a blog post.
 */
export async function deleteBlogPost(id: string): Promise<boolean> {
  const client = getSupabase();

  if (client) {
    try {
      await client.from('posts').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete failed, deleted locally:', e);
    }
  }

  const local = getLocalPosts();
  saveLocalPosts(local.filter((p) => p.id !== id));
  return true;
}

/**
 * Returns SQL setup snippet for user Supabase SQL Editor.
 */
export const SUPABASE_SQL_SCHEMA = `-- Run this in your Supabase SQL Editor to create the posts table:
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_km text,
  slug text unique not null,
  excerpt text,
  excerpt_km text,
  content text,
  content_km text,
  cover_image text,
  category text default 'Tech',
  tags text[] default array['Tech'],
  author text default 'Ponlork Sreyka',
  published boolean default true,
  read_time text default '4 min read',
  language text default 'both',
  views integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
alter table public.posts enable row level security;

-- Allow public read access to published posts
create policy "Allow public read published posts"
  on public.posts for select
  using (published = true);

-- Allow authenticated admins to do everything
create policy "Allow authenticated admin full access"
  on public.posts for all
  using (auth.role() = 'authenticated');
`;
