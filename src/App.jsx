import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import HeroSection from './sections/HeroSection'
import PositioningSection from './sections/PositioningSection'
import ProductsSection from './sections/ProductsSection'
import BenefitsSection from './sections/BenefitsSection'
import DiferenciaisSection from './sections/DiferenciaisSection'
import TeamSection from './sections/TeamSection'
import CTASection from './sections/CTASection'

export default function App() {
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
