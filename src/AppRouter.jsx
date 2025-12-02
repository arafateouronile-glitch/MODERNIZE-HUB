import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Public pages
import App from './App'
import { Admin } from './pages/Admin'
import { Blog } from './pages/Blog'
import { Services } from './pages/Services'
import { CreationSiteWeb } from './pages/CreationSiteWeb'
import { RefonteSite } from './pages/RefonteSite'
import { Portfolio } from './pages/Portfolio'
import { DemoPage } from './pages/DemoPage'
import { Contact } from './pages/Contact'
import { Process } from './pages/Process'

// Landing pages par industrie
import { RestaurantLanding } from './pages/landing/RestaurantLanding'
import { AvocatLanding } from './pages/landing/AvocatLanding'
import { ImmobilierLanding } from './pages/landing/ImmobilierLanding'
import { FitnessLanding } from './pages/landing/FitnessLanding'
import { ArtisanLanding } from './pages/landing/ArtisanLanding'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/nos-services" element={<Services />} />
        <Route path="/creation-site-web" element={<CreationSiteWeb />} />
        <Route path="/refonte-site" element={<RefonteSite />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/demo/:id" element={<DemoPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/process" element={<Process />} />
        
        {/* Landing Pages par Industrie */}
        <Route path="/landing/restaurant" element={<RestaurantLanding />} />
        <Route path="/landing/avocat" element={<AvocatLanding />} />
        <Route path="/landing/immobilier" element={<ImmobilierLanding />} />
        <Route path="/landing/fitness" element={<FitnessLanding />} />
        <Route path="/landing/artisan" element={<ArtisanLanding />} />
        
        {/* Redirections pour compatibilité */}
        <Route path="/offres" element={<Navigate to="/nos-services" replace />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />} />
        
        {/* 404 - Redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

