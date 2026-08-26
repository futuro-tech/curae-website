import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import HeroSection from './sections/HeroSection'
import PositioningSection from './sections/PositioningSection'
import ProductsSection from './sections/ProductsSection'
import BenefitsSection from './sections/BenefitsSection'
import DiferenciaisSection from './sections/DiferenciaisSection'
import TeamSection from './sections/TeamSection'
import CTASection from './sections/CTASection'
import CareersPage from './pages/CareersPage'

export default function App() {
  const careersPath = (import.meta.env.BASE_URL + 'carreiras').replace(/\/+/g, '/')
  const isCareers = window.location.pathname.replace(/\/+$/, '') === careersPath.replace(/\/+$/, '')

  if (isCareers) {
    return (
      <div style={{ background: '#ffffff', overflowX: 'hidden', paddingTop: 64 }}>
        <Navbar />
        <CareersPage />
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ background: '#ffffff', overflowX: 'hidden', paddingTop: 64 }}>
      <Navbar />
      <HeroSection />
      <PositioningSection />
      <ProductsSection />
      <BenefitsSection />
      <DiferenciaisSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </div>
  )
}
