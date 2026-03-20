import React from 'react';
import { ProtectedPageRoute } from '../ProtectedPageRoute';
import { ServicesPage } from './ServicesPage';
import { AboutPage } from './AboutPage';
import { PortfolioPage } from './PortfolioPage';
import { BlogPage } from './BlogPage';
import { PricingPage } from './PricingPage';
import { CareersPage } from './CareersPage';
import { TechnologiesPage } from './TechnologiesPage';

export function ProtectedServicesPage() {
  return (
    <ProtectedPageRoute visibilityKey="services">
      <ServicesPage />
    </ProtectedPageRoute>
  );
}

export function ProtectedAboutPage() {
  return (
    <ProtectedPageRoute visibilityKey="about">
      <AboutPage />
    </ProtectedPageRoute>
  );
}

export function ProtectedPortfolioPage() {
  return (
    <ProtectedPageRoute visibilityKey="portfolio">
      <PortfolioPage />
    </ProtectedPageRoute>
  );
}

export function ProtectedBlogPage() {
  return (
    <ProtectedPageRoute visibilityKey="blog">
      <BlogPage />
    </ProtectedPageRoute>
  );
}

export function ProtectedPricingPage() {
  return (
    <ProtectedPageRoute visibilityKey="pricing">
      <PricingPage />
    </ProtectedPageRoute>
  );
}

export function ProtectedCareersPage() {
  return (
    <ProtectedPageRoute visibilityKey="careers">
      <CareersPage />
    </ProtectedPageRoute>
  );
}

export function ProtectedTechnologiesPage() {
  return (
    <ProtectedPageRoute visibilityKey="technologies">
      <TechnologiesPage />
    </ProtectedPageRoute>
  );
}
