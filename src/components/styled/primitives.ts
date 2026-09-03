import styled from 'styled-components'

// Design Tokens
export const tokens = {
  navy: '#0D1B2A',
  teal: '#1A7A6E',
  tealbg: '#E1F5EE',
  offWhite: '#FAFAFA',
  lightGrey: '#EEF2F5',
  border: '#D1D9E0',
  text: '#4A5568',
  muted: '#9AA5B1',
  footerBg: '#0A1520',
  hoverNavy: '#1a2f45',
  maxContent: '924px',
  navHeight: '64px',
} as const

// Section
export const Section = styled.section<{ bg?: keyof typeof bgMap; spacing?: 'none' | 'sm' | 'md' | 'lg' }>`
  background: ${props => bgMap[props.bg || 'white']};
  padding: ${props => spacingMap[props.spacing || 'lg']};
  position: relative;
  overflow: hidden;
`

const bgMap = {
  white: '#fff',
  offWhite: tokens.offWhite,
  lightGrey: tokens.lightGrey,
}

const spacingMap = {
  none: '0',
  sm: 'clamp(48px, 6vw, 80px) var(--section-px)',
  md: 'clamp(64px, 8vw, 100px) var(--section-px)',
  lg: 'clamp(72px, 10vw, 120px) var(--section-px)',
}

// Container
export const Container = styled.div<{ maxWidth?: 'content' | 'full' | 'narrow' | 'wide' | 'cta' }>`
  max-width: ${props => widthMap[props.maxWidth || 'content']};
  width: 100%;
  margin: 0 auto;
`

const widthMap = {
  content: tokens.maxContent,
  full: '100%',
  narrow: '800px',
  wide: '1100px',
  cta: '900px',
}

// Card
export const Card = styled.div<{ border?: boolean; padding?: 'sm' | 'md' | 'lg' }>`
  padding: ${props => paddingMap[props.padding || 'md']};
  background: #fff;
  border: ${props => (props.border !== false ? `0.5px solid ${tokens.border}` : 'none')};
  border-radius: 8px;
`

const paddingMap = {
  sm: '16px',
  md: '24px',
  lg: '32px',
}

// Button
export const Button = styled.a<{ variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  border-radius: 4px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${props => {
    if (props.variant === 'secondary') {
      return `
        background: transparent;
        color: ${tokens.navy};
        border: 0.5px solid ${tokens.border};

        &:hover {
          background: ${tokens.offWhite};
        }
      `
    }
    return `
      background: ${tokens.navy};
      color: ${tokens.offWhite};

      &:hover {
        background: ${tokens.hoverNavy};
        transform: scale(1.04);
        box-shadow: 0 6px 16px rgba(13, 27, 42, 0.18);
      }
    `
  }}
`

// Heading
export const Heading = styled.h2<{ as?: 'h1' | 'h2' | 'h3'; size?: 'lg' | 'md' | 'sm'; font?: 'serif' | 'sans' }>`
  font-family: ${props => (props.font === 'sans' ? "'DM Sans'" : "'Cormorant Garamond'")}, serif;
  font-size: ${props => sizeMap[props.size || 'lg']};
  font-weight: 600;
  color: ${tokens.navy};
  margin-bottom: 24px;
  line-height: 1.2;
`

const sizeMap = {
  lg: 'clamp(36px, 5vw, 60px)',
  md: 'clamp(28px, 4vw, 48px)',
  sm: 'clamp(24px, 3vw, 36px)',
}

// Text
export const Text = styled.p<{ size?: 'sm' | 'md' | 'lg'; color?: 'default' | 'muted' }>`
  font-size: ${props => textSizeMap[props.size || 'md']};
  color: ${props => (props.color === 'muted' ? tokens.muted : tokens.text)};
  line-height: 1.6;
`

const textSizeMap = {
  sm: '14px',
  md: '16px',
  lg: '20px',
}

// Grid
export const Grid = styled.div<{ cols?: number; gap?: 'sm' | 'md' | 'lg' }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => colsMap[props.cols || 3]}px, 1fr));
  gap: ${props => gapMap[props.gap || 'md']};
`

const colsMap: Record<number, number> = {
  2: 400,
  3: 260,
  4: 200,
}

const gapMap = {
  sm: '16px',
  md: '24px',
  lg: 'clamp(32px, 4vw, 48px)',
}

// GlobalStyle
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: ${tokens.navy} transparent;

    @media (prefers-reduced-motion: reduce) {
      scroll-behavior: auto;
    }
  }

  body {
    font-family: 'DM Sans', -apple-system, Helvetica, sans-serif;
    background: #fff;
    color: ${tokens.navy};
    -webkit-font-smoothing: antialiased;
  }

  img {
    display: block;
    max-width: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${tokens.navy};
    border-radius: 10px;
    border: 2px solid ${tokens.offWhite};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${tokens.teal};
  }

  main {
    flex: 1;
  }

  :root {
    --section-px: clamp(24px, 7.4vw, 80px);
    --nav-h: ${tokens.navHeight};
  }
`
