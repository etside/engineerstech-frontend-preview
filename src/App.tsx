import { lazy, Suspense, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { SettingsProvider } from "@/hooks/useSettings";
import Layout from "./components/Layout";
import Index from "./pages/Index";

const NotFound = lazy(() => import("./pages/NotFound"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const IndustryDetail = lazy(() => import("./pages/IndustryDetail"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Discover = lazy(() => import("./pages/Discover"));
const BusinessDetail = lazy(() => import("./pages/BusinessDetail"));
const Resources = lazy(() => import("./pages/Resources"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const Team = lazy(() => import("./pages/Team"));
const Career = lazy(() => import("./pages/Career"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const DataProtectionPolicy = lazy(() => import("./pages/DataProtectionPolicy"));

const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminServices = lazy(() => import("./pages/admin/AdminServices"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminTeam = lazy(() => import("./pages/admin/AdminTeam"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminLogos = lazy(() => import("./pages/admin/AdminLogos"));
const AdminSubmissions = lazy(() => import("./pages/admin/AdminSubmissions"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminNavigation = lazy(() => import("./pages/admin/AdminNavigation"));
const AdminCaseStudies = lazy(() => import("./pages/admin/AdminCaseStudies"));
const AdminIndustries = lazy(() => import("./pages/admin/AdminIndustries"));
const AdminResources = lazy(() => import("./pages/admin/AdminResources"));
const AdminBusinesses = lazy(() => import("./pages/admin/AdminBusinesses"));
const AdminMcpConfig = lazy(() => import("./pages/admin/AdminMcpConfig"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
  </div>
);

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const titleMap: Record<string, string> = {
      "/": "engineersTech — Software, Apps & AI",
      "/services": "Services | engineersTech",
      "/products": "Products | engineersTech",
      "/blog": "Blog | engineersTech",
      "/contact": "Contact | engineersTech",
      "/admin": "Admin Dashboard | engineersTech",
      "/admin/login": "Admin Login | engineersTech",
    };
    document.title = titleMap[location.pathname] || "engineersTech";
  }, [location.pathname]);

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/businesses/:slug" element={<BusinessDetail />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/team" element={<Team />} />
          <Route path="/career" element={<Career />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/data-protection-policy" element={<DataProtectionPolicy />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="logos" element={<AdminLogos />} />
          <Route path="submissions" element={<AdminSubmissions />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="navigation" element={<AdminNavigation />} />
          <Route path="case-studies" element={<AdminCaseStudies />} />
          <Route path="industries" element={<AdminIndustries />} />
          <Route path="resources" element={<AdminResources />} />
          <Route path="businesses" element={<AdminBusinesses />} />
          <Route path="mcp-configs" element={<AdminMcpConfig />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </SettingsProvider>
  </QueryClientProvider>
);

export default App;
