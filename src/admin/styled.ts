import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { tokens } from '../components/styled/primitives'

export const AdminGlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'DM Sans', -apple-system, Helvetica, sans-serif;
    background: ${tokens.offWhite};
    color: ${tokens.navy};
    -webkit-font-smoothing: antialiased;
  }

  button {
    font-family: inherit;
  }
`

// ---- Login screen ----

export const LoginShell = styled.div`
  display: flex;
  min-height: 100vh;

  @media (max-width: 760px) {
    flex-direction: column;
  }
`

export const LoginPanel = styled.div`
  width: 38%;
  min-width: 320px;
  background: ${tokens.navy};
  color: ${tokens.offWhite};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 56px 48px;

  @media (max-width: 760px) {
    width: 100%;
    min-width: 0;
    padding: 32px 24px;
  }
`

export const Wordmark = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 600;
  font-size: 24px;

  &::before {
    content: '';
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${tokens.teal};
  }
`

export const LoginHeadline = styled.div`
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  font-size: 44px;
  line-height: 1.15;
  max-width: 380px;
`

export const LoginSubtext = styled.p`
  margin-top: 18px;
  font-size: 15px;
  line-height: 1.6;
  color: ${tokens.muted};
  max-width: 340px;
`

export const LoginFootnote = styled.div`
  font-size: 13px;
  color: #6b7885;
`

export const LoginContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`

export const LoginCard = styled.div`
  width: 100%;
  max-width: 380px;
`

export const LoginTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${tokens.navy};
  margin: 0 0 6px;
`

export const LoginLead = styled.p`
  font-size: 14px;
  color: ${tokens.text};
  margin: 0 0 28px;
`

export const ErrorBanner = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: #fdeeee;
  border: 0.5px solid #f0b7b7;
  border-radius: 8px;
  padding: 12px 14px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #9b2c2c;
  line-height: 1.5;

  svg {
    flex-shrink: 0;
    margin-top: 1px;
  }
`

export const InfoBanner = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  background: ${tokens.tealbg};
  border: 0.5px solid #a9d9cd;
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #145c53;
  line-height: 1.5;
`

export const InfoBannerDismiss = styled.button`
  background: none;
  border: none;
  color: #145c53;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  flex-shrink: 0;
`

export const HelperBox = styled.div`
  margin-top: 24px;
  background: ${tokens.lightGrey};
  border-radius: 8px;
  padding: 16px 18px;
  font-size: 13px;
  color: ${tokens.text};
  line-height: 1.7;
`

export const HelperTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${tokens.text};
  margin-bottom: 10px;
`

// ---- Shared form controls ----

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const FieldLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${tokens.text};
`

const controlStyle = `
  width: 100%;
  font-size: 14px;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid ${tokens.border};
  font-family: inherit;
  background: #fff;
  color: ${tokens.navy};

  &::placeholder {
    color: ${tokens.muted};
  }

  &:focus {
    outline: none;
    border-color: ${tokens.teal};
    box-shadow: 0 0 0 3px rgba(26, 122, 110, 0.15);
  }
`

export const TextInput = styled.input<{ $warn?: boolean }>`
  ${controlStyle}
  ${(props) =>
    props.$warn &&
    `
    border-color: #dd8a1a;
    background: #fffbf0;
  `}
`

export const TextArea = styled.textarea<{ $warn?: boolean }>`
  ${controlStyle}
  resize: vertical;
  ${(props) =>
    props.$warn &&
    `
    border-color: #dd8a1a;
    background: #fffbf0;
  `}
`

export const Toggle = styled.button<{ $on: boolean }>`
  width: 38px;
  height: 22px;
  flex-shrink: 0;
  border-radius: 20px;
  border: none;
  position: relative;
  cursor: pointer;
  background: ${(props) => (props.$on ? tokens.teal : tokens.border)};
  transition: background 0.15s;

  &::after {
    content: '';
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    top: 3px;
    left: ${(props) => (props.$on ? '19px' : '3px')};
    transition: left 0.15s;
  }
`

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'ghost' | 'navy' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s, opacity 0.15s;
  border: none;

  ${(props) => {
    switch (props.$variant) {
      case 'secondary':
        return `
          background: transparent;
          border: 0.5px solid ${tokens.border};
          color: ${tokens.text};

          &:hover:not(:disabled) {
            background: ${tokens.lightGrey};
          }
        `
      case 'ghost':
        return `
          background: none;
          border: none;
          color: ${tokens.muted};

          &:hover:not(:disabled) {
            color: #c53030;
          }
        `
      case 'navy':
        return `
          background: ${tokens.navy};
          color: ${tokens.offWhite};
          width: 100%;
          padding: 13px;

          &:hover:not(:disabled) {
            background: ${tokens.hoverNavy};
          }
        `
      default:
        return `
          background: ${tokens.teal};
          color: #fff;

          &:hover:not(:disabled) {
            background: #145c53;
          }
        `
    }
  }}

  &:disabled {
    background: ${tokens.muted};
    color: #fff;
    cursor: default;
  }
`

// ---- JSON editor ----

export const FieldStack = styled.div<{ $nested?: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px 24px;
  align-items: start;
  padding-left: ${(props) => (props.$nested ? '16px' : '0')};
  border-left: ${(props) => (props.$nested ? `2px solid ${tokens.lightGrey}` : 'none')};
`

export const FieldSpanFull = styled(FieldGroup)`
  grid-column: 1 / -1;
`

export const ArrayList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ArrayItemCard = styled.div<{ $compact?: boolean }>`
  display: flex;
  align-items: ${(props) => (props.$compact ? 'center' : 'flex-start')};
  gap: 10px;
  border: 0.5px solid ${tokens.border};
  border-radius: 8px;
  padding: ${(props) => (props.$compact ? '4px 10px' : '14px')};
  background: ${(props) => (props.$compact ? 'transparent' : '#FAFBFC')};
  transition: border-color 0.15s;

  &:hover {
    border-color: #b9c3cc;
  }
`

export const DragHandle = styled.div`
  color: ${tokens.muted};
  flex-shrink: 0;
  padding-top: 2px;
`

export const IconButtonGroup = styled.div`
  display: flex;
  gap: 4px;
  flex-shrink: 0;
`

export const IconButton = styled.button<{ $danger?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$danger ? tokens.muted : tokens.text)};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${(props) => (props.$danger ? '#fdeeee' : tokens.lightGrey)};
    color: ${(props) => (props.$danger ? '#c53030' : tokens.navy)};
  }

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }
`

export const GroupHeader = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  margin-bottom: 4px;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
`

export const ChevronButton = styled.span<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: ${tokens.muted};
  transition: transform 0.15s;
  transform: rotate(${(props) => (props.$open ? '90deg' : '0deg')});
`

export const GroupMeta = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${tokens.muted};
  margin-left: auto;
  padding-left: 12px;
  flex-shrink: 0;
`

export const ItemBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
`

export const ItemHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`

export const ItemSummary = styled.button`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
`

export const ItemSummaryText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${tokens.navy};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ImageFieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Spinner = styled.div`
  width: 14px;
  height: 14px;
  border: 2px solid ${tokens.border};
  border-top-color: ${tokens.teal};
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`

export const FieldError = styled.div`
  font-size: 12px;
  color: #c53030;
  margin-top: 4px;
`

export const ThumbBox = styled.div<{ $empty?: boolean }>`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid ${tokens.border};
  background: ${(props) => (props.$empty ? tokens.lightGrey : '#fff')};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: ${tokens.muted};
`

export const AddItemButton = styled.button`
  border: 1px dashed ${tokens.border};
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: ${tokens.muted};
  background: none;
  cursor: pointer;
  align-self: stretch;
  transition: border-color 0.15s, color 0.15s;

  &:hover {
    border-color: ${tokens.teal};
    color: ${tokens.teal};
  }
`

// ---- Draft preview ----

export const PreviewBleed = styled.div`
  width: 100vw;
  max-width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  overflow-x: hidden;
  border-top: 1px solid ${tokens.border};
`

export const PreviewNotice = styled.div`
  padding: 60px 24px;
  text-align: center;
  font-size: 14px;
  color: ${tokens.muted};
`

export const ModeToggle = styled.div`
  display: inline-flex;
  background: ${tokens.lightGrey};
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
`

export const ModeToggleButton = styled.button<{ $active: boolean }>`
  font-size: 13px;
  font-weight: 500;
  padding: 7px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: ${(props) => (props.$active ? '#fff' : 'transparent')};
  color: ${(props) => (props.$active ? tokens.navy : tokens.text)};
  box-shadow: ${(props) => (props.$active ? '0 1px 3px rgba(13,27,42,0.12)' : 'none')};
  transition: background 0.15s, color 0.15s;
`

export const PreviewToolbar = styled.div`
  max-width: 924px;
  margin: 0 auto;
  padding: 20px 24px 0;
  display: flex;
  justify-content: flex-end;
`

export const PreviewBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

// ---- Dashboard shell ----

export const Header = styled.div`
  height: ${tokens.navHeight};
  flex-shrink: 0;
  background: #fff;
  border-bottom: 1px solid ${tokens.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
`

export const HeaderBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const HeaderWordmark = styled.div`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 600;
  font-size: 21px;
  color: ${tokens.navy};
`

export const Badge = styled.div`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${tokens.teal};
  background: ${tokens.tealbg};
  padding: 3px 9px;
  border-radius: 20px;
`

export const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 13px;
`

export const HeaderLink = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${tokens.text};

  &:hover {
    color: ${tokens.navy};
  }
`

export const HeaderDivider = styled.div`
  width: 1px;
  height: 16px;
  background: ${tokens.border};
`

export const HeaderAction = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  background: none;
  border: none;
  color: ${tokens.muted};
  font-size: 13px;
  cursor: pointer;

  &:hover {
    color: #c53030;
  }
`

export const Main = styled.div`
  flex: 1;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 24px 140px;
`

export const PageTitle = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  font-size: 34px;
  color: ${tokens.navy};
  margin: 0;
`

export const PageSubtitle = styled.p`
  font-size: 14px;
  color: ${tokens.text};
  margin: 6px 0 0;
`

export const Tabs = styled.div`
  display: flex;
  gap: 4px;
  border-bottom: 1px solid ${tokens.border};
  margin: 28px 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  /* Fade the trailing edge so a scrollable tab bar (e.g. on mobile, where
     "Carreiras" can sit past the fold) visibly hints there's more to see. */
  @media (max-width: 700px) {
    mask-image: linear-gradient(to right, black calc(100% - 24px), transparent 100%);
    -webkit-mask-image: linear-gradient(to right, black calc(100% - 24px), transparent 100%);
  }
`

export const TabItem = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  padding: 11px 16px;
  border: none;
  background: none;
  border-bottom: 2px solid ${(props) => (props.$active ? tokens.teal : 'transparent')};
  font-size: 14px;
  font-weight: ${(props) => (props.$active ? 600 : 400)};
  color: ${(props) => (props.$active ? tokens.navy : tokens.text)};
  cursor: pointer;

  &:hover {
    color: ${tokens.navy};
  }
`

export const ContentCard = styled.div`
  background: #fff;
  border: 0.5px solid ${tokens.border};
  border-radius: 8px;
  padding: 32px;
`

export const SectionLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: ${tokens.muted};
  text-transform: uppercase;
  margin-bottom: 18px;
`

export const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

export const StatusText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${tokens.text};
`

export const StatusDot = styled.div<{ $dirty?: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${(props) => (props.$dirty ? '#dd8a1a' : tokens.teal)};
`

// ---- Save bar & modal ----

export const SaveBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid ${tokens.border};
  box-shadow: 0 -4px 16px rgba(13, 27, 42, 0.06);
`

export const SaveBarInner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(13, 27, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 100;
`

export const ModalCard = styled.div`
  width: 100%;
  max-width: 440px;
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 20px 50px rgba(13, 27, 42, 0.25);
`

export const ModalIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${tokens.tealbg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
`

export const ModalTitle = styled.div`
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  font-size: 24px;
  color: ${tokens.navy};
  margin-bottom: 8px;
`

export const ModalBody = styled.p`
  font-size: 14px;
  color: ${tokens.text};
  line-height: 1.6;
  margin: 0 0 24px;
`

export const ChangesBox = styled.div`
  background: ${tokens.lightGrey};
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 24px;
  max-height: 220px;
  overflow-y: auto;
`

export const ChangesTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: ${tokens.muted};
  text-transform: uppercase;
  margin-bottom: 10px;
`

export const ChangeItem = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  font-size: 13px;
  color: ${tokens.text};
  line-height: 1.5;

  & + & {
    margin-top: 7px;
  }
`

export const ChangeDot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${tokens.teal};
  margin-top: 6px;
  flex-shrink: 0;
`

export const ModalButtonsRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`
