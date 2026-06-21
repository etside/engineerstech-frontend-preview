import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { SettingsProvider } from "@/hooks/useSettings";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminLogos from "./pages/admin/AdminLogos";
import AdminSubmissions from "./pages/admin/AdminSubmissions";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminNavigation from "./pages/admin/AdminNavigation";
import AdminCaseStudies from "./pages/admin/AdminCaseStudies";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Team from "./pages/Team";
import Career from "./pages/Career";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import DataProtectionPolicy from "./pages/DataProtectionPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products" element={<Products />} />
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
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
    </SettingsProvider>
  </QueryClientProvider>
);

export default App;
