import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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



const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router>
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
        
      </Routes>
    </Router>
  </StrictMode>
);