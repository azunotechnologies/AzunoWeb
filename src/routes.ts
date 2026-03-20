import React from "react";
import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { HomePage } from "./components/pages/HomePage";
import { ProtectedServicesPage, ProtectedAboutPage, ProtectedPortfolioPage, ProtectedBlogPage, ProtectedPricingPage, ProtectedCareersPage, ProtectedTechnologiesPage } from "./components/pages/ProtectedPages";
import { ContactPage } from "./components/pages/ContactPage";
import { CaseStudyPage } from "./components/pages/CaseStudyPage";
import { LoginPage } from "./components/admin/LoginPage";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { ProtectedAdminRoute } from "./components/admin/ProtectedAdminRoute";
import { NotFound } from "./components/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "services", Component: ProtectedServicesPage },
      { path: "about", Component: ProtectedAboutPage },
      { path: "portfolio", Component: ProtectedPortfolioPage },
      { path: "blog", Component: ProtectedBlogPage },
      { path: "contact", Component: ContactPage },
      { path: "pricing", Component: ProtectedPricingPage },
      { path: "careers", Component: ProtectedCareersPage },
      { path: "technologies", Component: ProtectedTechnologiesPage },
      { path: "case-study", Component: CaseStudyPage },
      { path: "admin/login", Component: LoginPage },
      { path: "admin/dashboard", Component: ProtectedAdminRoute },
      { path: "*", Component: NotFound },
    ],
  },
]);