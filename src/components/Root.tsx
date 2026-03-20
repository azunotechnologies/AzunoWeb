import { Outlet, useLocation } from 'react-router';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { ContentProvider, useContent } from '../contexts/ContentContext';
import { useEffect } from 'react';

function RootContent() {
  const { siteSettings } = useContent();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  // Update page title based on current page
  useEffect(() => {
    const pageName = location.pathname === '/' ? 'Home' :
      location.pathname.split('/')[1].charAt(0).toUpperCase() +
      location.pathname.split('/')[1].slice(1);

    document.title = `${pageName} | ${siteSettings.companyName}`;
  }, [location, siteSettings.companyName]);

  // Update favicon dynamically from siteSettings
  useEffect(() => {
    if (siteSettings?.favicon) {
      let faviconLink = document.querySelector("link[rel='icon']") as HTMLLinkElement;

      if (!faviconLink) {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        document.head.appendChild(faviconLink);
      }

      faviconLink.href = siteSettings.favicon;
      faviconLink.type = 'image/x-icon';
    }
  }, [siteSettings?.favicon]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-500">
      {!isAdminPage && <Navigation />}
      <main>
        <Outlet />
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
}

export function Root() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          <RootContent />
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}