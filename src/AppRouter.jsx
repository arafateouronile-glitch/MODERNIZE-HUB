import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import App from './App'

const Admin = lazy(() => import('./pages/Admin').then(m => ({ default: m.Admin })))
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })))
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })))
const CreationSiteWeb = lazy(() => import('./pages/CreationSiteWeb').then(m => ({ default: m.CreationSiteWeb })))
const RefonteSite = lazy(() => import('./pages/RefonteSite').then(m => ({ default: m.RefonteSite })))
const Portfolio = lazy(() => import('./pages/Portfolio').then(m => ({ default: m.Portfolio })))
const DemoPage = lazy(() => import('./pages/DemoPage').then(m => ({ default: m.DemoPage })))
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })))
const Process = lazy(() => import('./pages/Process').then(m => ({ default: m.Process })))

const RestaurantLanding = lazy(() => import('./pages/landing/RestaurantLanding').then(m => ({ default: m.RestaurantLanding })))
const AvocatLanding = lazy(() => import('./pages/landing/AvocatLanding').then(m => ({ default: m.AvocatLanding })))
const ImmobilierLanding = lazy(() => import('./pages/landing/ImmobilierLanding').then(m => ({ default: m.ImmobilierLanding })))
const FitnessLanding = lazy(() => import('./pages/landing/FitnessLanding').then(m => ({ default: m.FitnessLanding })))
const ArtisanLanding = lazy(() => import('./pages/landing/ArtisanLanding').then(m => ({ default: m.ArtisanLanding })))

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-10 h-10 border-2 border-[#88A9C3] border-t-transparent rounded-full animate-spin" />
  </div>
)

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/nos-services" element={<Services />} />
          <Route path="/creation-site-web" element={<CreationSiteWeb />} />
          <Route path="/refonte-site" element={<RefonteSite />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/demo/:id" element={<DemoPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/process" element={<Process />} />

          <Route path="/landing/restaurant" element={<RestaurantLanding />} />
          <Route path="/landing/avocat" element={<AvocatLanding />} />
          <Route path="/landing/immobilier" element={<ImmobilierLanding />} />
          <Route path="/landing/fitness" element={<FitnessLanding />} />
          <Route path="/landing/artisan" element={<ArtisanLanding />} />

          <Route path="/offres" element={<Navigate to="/nos-services" replace />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

