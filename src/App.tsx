import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { GlobalStyle } from './components/styled'
import styled from 'styled-components'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import ScrollToTopFab from './components/ScrollToTopFab'
import HeroSection from './sections/HeroSection'
import PositioningSection from './sections/PositioningSection'
import ProductsSection from './sections/ProductsSection'
import BenefitsSection from './sections/BenefitsSection'
import DiferenciaisSection from './sections/DiferenciaisSection'
import TeamSection from './sections/TeamSection'
import CTASection from './sections/CTASection'
import CareersPage from './pages/CareersPage'

const AppWrapper = styled.div`
  background: #fff;
  overflow-x: hidden;
  padding-top: var(--nav-h);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

function HomePage() {
  return (
    <>
      <HeroSection />
      <PositioningSection />
      <ProductsSection />
      <BenefitsSection />
      <DiferenciaisSection />
      <TeamSection />
      <CTASection />
    </>
  )
}

function ScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppWrapper>
          <Navbar />
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/carreiras" element={<CareersPage />} />
          </Routes>
          <Footer />
          <ScrollToTopFab />
        </AppWrapper>
      </BrowserRouter>
    </>
  )
}
