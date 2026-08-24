import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import './styles.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthGate from './components/AuthGate';
import { CartProvider } from './context/CartContext';
import Hero from './landingpage/Hero';
import PersonalizedCare from './landingpage/PersonalizedCare';
import WellnessServices from './landingpage/WellnessServices';
import HealthCare from './landingpage/HealthCare';
import Testimonials from './landingpage/Testimonials';
import HealthBlogs from './landingpage/HealthBlogs';
import AdvancedDiagnostics from './components/AdvancedDiagnostics';
import AIAssistant from './pages/AIAssistant'; // AI Assistant page
import HealthInsights from './pages/HealthInsights'; // Health Insights page
import SymptomChecker from './pages/SymptomChecker'; // Symptom Checker page
import PrakritiAnalysis from './pages/PrakritiAnalysis'; // Prakriti Analysis page
import ProductsPage from './pages/ProductsPage';
import GuidancePage from './pages/GuidancePage';
import DoctorConsultation from './pages/DoctorConsultation'; 
import AuthPage from './landingpage/AuthPage'; // Auth page
import AdminAddProduct from './pages/AdminAddProduct';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import ReviewsPage from './pages/ReviewsPage';



const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router>
      <AuthGate>
        <CartProvider>
        <div className="app-shell">
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <PersonalizedCare />
                    <WellnessServices />
                    <HealthCare />
                    <Testimonials />
                    <HealthBlogs />
                  </>
                }
              />
              <Route path="/advanced-diagnostics" element={<AdvancedDiagnostics />} />
              <Route path="/advanced-diagnostics/ai-assistant" element={<AIAssistant />} />
              <Route path="/advanced-diagnostics/health-insights" element={<HealthInsights />} />
              <Route path="/advanced-diagnostics/symptom-checker" element={<SymptomChecker />} />
              <Route path="/advanced-diagnostics/prakriti-analysis" element={<PrakritiAnalysis />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/guidance" element={<GuidancePage />} />
              <Route path="/doctor-consultation" element={<DoctorConsultation />} /> {/* New route */}
              <Route path="/authpage" element={<AuthPage />} />
              <Route path="/admin/add-product" element={<AdminAddProduct />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />

            </Routes>
          </main>
          <Footer />
        </div>
        </CartProvider>
      </AuthGate>
    </Router>
  </StrictMode>
);