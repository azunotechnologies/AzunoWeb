import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { NotFound } from './pages/NotFound';

interface ProtectedPageRouteProps {
  visibilityKey: keyof PageVisibility;
  children: React.ReactNode;
}

interface PageVisibility {
  services: boolean;
  technologies: boolean;
  pricing: boolean;
  careers: boolean;
  blog: boolean;
  portfolio: boolean;
  about: boolean;
}

export function ProtectedPageRoute({ visibilityKey, children }: ProtectedPageRouteProps) {
  const { siteSettings } = useContent();

  // Check if page is visible
  const isPageVisible = siteSettings?.pageVisibility?.[visibilityKey] !== false;

  // If page is not visible, show 404
  if (!isPageVisible) {
    return <NotFound />;
  }

  // If page is visible, render the children
  return <>{children}</>;
}
