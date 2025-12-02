import { lazy, Suspense } from 'react'
import { Header } from './components/common/Header'
import { Footer } from './components/common/Footer'
import { CustomCursor } from './components/common/CustomCursor'
import { LiveChat } from './components/common/LiveChat'
import { Marquee } from './components/common/Marquee'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Portfolio } from './components/sections/Portfolio'
import { Pricing } from './components/sections/Pricing'
import { PricingCreation } from './components/sections/PricingCreation'
import { Contact } from './components/sections/Contact'
import { MetaTags } from './components/seo/MetaTags'
import { faqs } from './components/sections/FAQ'

// Lazy load sections below the fold for better performance
const Story = lazy(() => import('./components/sections/Story').then(m => ({ default: m.Story })))
const Process = lazy(() => import('./components/sections/Process').then(m => ({ default: m.Process })))
const PricingJustification = lazy(() => import('./components/sections/PricingJustification').then(m => ({ default: m.PricingJustification })))
const Certifications = lazy(() => import('./components/sections/Certifications').then(m => ({ default: m.Certifications })))
const FeaturedIn = lazy(() => import('./components/sections/FeaturedIn').then(m => ({ default: m.FeaturedIn })))
const Testimonials = lazy(() => import('./components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const VideoTestimonials = lazy(() => import('./components/sections/VideoTestimonials').then(m => ({ default: m.VideoTestimonials })))
const ClientLogos = lazy(() => import('./components/sections/ClientLogos').then(m => ({ default: m.ClientLogos })))
const FAQ = lazy(() => import('./components/sections/FAQ').then(m => ({ default: m.FAQ })))
const BlogSection = lazy(() => import('./components/blog/BlogSection').then(m => ({ default: m.BlogSection })))
const SiteAuditGenerator = lazy(() => import('./components/leadmagnet/SiteAuditGenerator').then(m => ({ default: m.SiteAuditGenerator })))

// Loading component
const SectionLoader = () => (
  <div className="h-96 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#D9FF00] border-t-transparent rounded-full animate-spin" />
  </div>
)

import { useTheme } from './contexts/ThemeContext'
import { ThemeDebug } from './components/common/ThemeDebug'

function App() {
  const { theme } = useTheme()

  return (
    <div 
      data-theme={theme}
      className="min-h-screen bg-background text-text-main selection:bg-primary selection:text-background overflow-x-hidden transition-colors duration-300"
      style={{
        backgroundColor: theme === 'light' ? '#FFFFFF' : 'var(--color-background)',
        color: 'var(--color-text-main)',
      }}
    >
      {/* SEO Meta Tags */}
      <MetaTags faqs={faqs} />
      
      <ThemeDebug />
      <CustomCursor />
      <LiveChat />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <div className="relative z-10 bg-background">
          <About />
          <Portfolio />
          <Pricing />
          <PricingCreation />
          
          {/* Lazy loaded sections */}
          <Suspense fallback={<SectionLoader />}>
            <Story />
            <Process />
            <PricingJustification />
            <Certifications />
            <FeaturedIn />
            <Testimonials />
            <VideoTestimonials />
            <ClientLogos />
            <FAQ />
            <BlogSection />
            <SiteAuditGenerator />
          </Suspense>
          
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
