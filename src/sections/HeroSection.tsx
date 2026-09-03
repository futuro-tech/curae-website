import { useState, useEffect, useRef, type PointerEvent as ReactPointerEvent, type MouseEvent as ReactMouseEvent } from "react";
import styled from "styled-components";
import PartnersLogos from "../components/PartnersLogos";
import PARTNERS from "../data/partners.json";
import { useLang } from "../context/LangContext";
import { Section, tokens } from "../components/styled";

const HERO_IMG =
  "https://api.builder.io/api/v1/image/assets/TEMP/505760c7436e51894b22ecc5f5665f883830b103?width=2976";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const BackgroundImg = styled.img`
  font-style: italic;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140%;
  min-width: 900px;
  mix-blend-mode: multiply;
  opacity: 0.75;
  pointer-events: none;
  user-select: none;
`;

const HeroGrid = styled.div`
  position: relative;
  max-width: 1244px;
  margin: 0 auto;
  padding: clamp(72px, 9vw, 120px) var(--section-px) clamp(52px, 7vw, 90px);
  display: grid;
  grid-template-columns: 5fr 3fr;
  gap: 40px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding-bottom: 40px;

    p {
      margin-left: 0;
    }
  }
`;

const HeroHeading = styled.h1`
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(46px, 7.4vw, 80px);
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: ${tokens.navy};
  font-weight: 300;
  font-style: italic;
`;

const HeroEmphasis = styled.span`
  font-weight: 600;
  font-style: italic;
  text-decoration: underline;
  text-underline-offset: 4px;
`;

const HeroParagraph = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: 18px;
  font-weight: 380;
  line-height: 1.62;
  color: ${tokens.text};
  max-width: 380px;
`;

const PartnersStrip = styled.div`
  max-width: 1244px;
  margin: 0 auto;
  padding: 0 var(--section-px);
  border-top: 0.5px solid ${tokens.border};
`;

const PartnersRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 18px 0;
  flex-wrap: wrap;
`;

const PartnersLabel = styled.span`
  font-family: "DM Sans", sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: ${tokens.muted};
  letter-spacing: 0.77px;
  text-transform: uppercase;
  flex-shrink: 0;
`;

const ArticleBar = styled.div<{ $hovered: boolean; $canDrag: boolean; $dragging: boolean }>`
  position: relative;
  background: ${(props) => (props.$hovered ? "#162435" : tokens.navy)};
  padding: 14px 0;
  transition: background 0.2s ease;
  border-top: ${(props) =>
    props.$hovered
      ? "0.5px solid rgba(94,204,195,0.25)"
      : "0.5px solid transparent"};
  overflow: hidden;
  touch-action: pan-y;
  cursor: ${(props) =>
    props.$canDrag ? (props.$dragging ? "grabbing" : "grab") : "default"};
  user-select: ${(props) => (props.$dragging ? "none" : "auto")};

  @media (max-width: 768px) {
    padding: 16px 0;
  }
`;

const ArticleTrack = styled.div`
  display: flex;
`;

const ArticleSlide = styled.div`
  min-width: 0;
`;

const ArticleDesktop = styled.div`
  max-width: 1244px;
  margin: 0 auto;
  padding: 0 var(--section-px);
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ArticleMobile = styled.div`
  max-width: 1244px;
  margin: 0 auto;
  padding: 0 var(--section-px);
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ArticleLink = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
`;

const ArticleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 2px;
  background: ${tokens.tealbg};
  font-family: "DM Sans", sans-serif;
  font-size: 10px;
  font-weight: 500;
  color: ${tokens.teal};
  letter-spacing: 0.8px;
  text-transform: uppercase;
  flex-shrink: 0;
`;

const ArticleSource = styled.span`
  font-family: "DM Sans", sans-serif;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.35);
  flex-shrink: 0;
`;

const ArticleDivider = styled.div`
  width: 1px;
  height: 14px;
  background: rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
`;

const ArticleTitle = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 19.5px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ArticleCta = styled.span<{ $hovered: boolean }>`
  font-family: "DM Sans", sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => (props.$hovered ? "#5ECCC3" : tokens.offWhite)};
  opacity: ${(props) => (props.$hovered ? 1 : 0.85)};
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.2s ease, opacity 0.2s ease;
`;

const MobileArticleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

const MobileArticleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 7px;
  border-radius: 2px;
  background: ${tokens.tealbg};
  font-family: "DM Sans", sans-serif;
  font-size: 9px;
  font-weight: 500;
  color: ${tokens.teal};
  letter-spacing: 0.7px;
  text-transform: uppercase;
  flex-shrink: 0;
`;

const MobileArticleSource = styled.span`
  font-family: "DM Sans", sans-serif;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.35);
`;

const MobileArticleTitle = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.5;
  margin-bottom: 10px;
`;

const MobileArticleCta = styled.span`
  font-family: "DM Sans", sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #5eccc3;
`;

const ArrowsWrapper = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const ArrowsInner = styled.div`
  max-width: 1244px;
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--section-px);
  position: relative;
`;

const ArrowButton = styled.button<{ $direction: 'left' | 'right'; $hoveredArrow: string | null; $articleHovered: boolean }>`
  position: absolute;
  ${(props) => (props.$direction === "left" ? "left: 0;" : "right: 0;")}
  top: 50%;
  transform: translateY(-50%);
  pointer-events: auto;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => {
    if (props.$hoveredArrow === props.$direction) return 1;
    return props.$articleHovered ? 0.55 : 0.3;
  }};
  transition: opacity 0.2s ease;
`;

export default function HeroSection({ partners }: { partners?: typeof PARTNERS } = {}) {
  const { t } = useLang();
  const { headline: h, articles } = t.HERO;
  const [articleHovered, setArticleHovered] = useState(false);
  const [hoveredArrow, setHoveredArrow] = useState<string | null>(null);
  const [articleIndex, setArticleIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragInfo = useRef({ startX: 0, width: 0, moved: false, currentX: 0 });
  const canDrag = articles.length > 1;

  useEffect(() => {
    setArticleIndex(0);
  }, [articles]);

  useEffect(() => {
    if (!canDrag || articleHovered || dragging) return;
    const id = setInterval(() => {
      setArticleIndex((i) => (i + 1) % articles.length);
    }, 3000);
    return () => clearInterval(id);
  }, [articles, articleHovered, dragging, canDrag]);

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    // Use window-level listeners instead of setPointerCapture so a plain
    // click (no movement) still lets the browser fire a native click on
    // the anchor underneath — capture would retarget mouseup and swallow it.
    dragInfo.current.startX = e.clientX;
    dragInfo.current.width = e.currentTarget.offsetWidth || 1;
    dragInfo.current.moved = false;
    dragInfo.current.currentX = 0;
    setDragging(true);

    function onMove(ev: PointerEvent) {
      const delta = ev.clientX - dragInfo.current.startX;
      if (Math.abs(delta) > 6) dragInfo.current.moved = true;
      dragInfo.current.currentX = delta;
      setDragX(delta);
    }

    function onUp() {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      setDragging(false);
      const width = dragInfo.current.width || 1;
      const threshold = width * 0.12;
      const finalX = dragInfo.current.currentX;
      if (finalX > threshold) {
        setArticleIndex((i) => (i - 1 + articles.length) % articles.length);
      } else if (finalX < -threshold) {
        setArticleIndex((i) => (i + 1) % articles.length);
      }
      setDragX(0);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  }

  function handleArticleLinkClick(e: ReactMouseEvent<HTMLAnchorElement>) {
    if (dragInfo.current.moved) e.preventDefault();
  }

  return (
    <Section id="produtos" bg="offWhite" spacing="none">
      <BackgroundImg src={HERO_IMG} alt="" aria-hidden />

      <HeroGrid>
        <HeroHeading>
          {h.line1}
          <br />
          {h.line2}
          <br />
          <HeroEmphasis>{h.emphasis1}</HeroEmphasis>
          {h.middle}
          <HeroEmphasis>{h.emphasis2}</HeroEmphasis>
          {h.end}
        </HeroHeading>

        <HeroParagraph>{t.HERO.paragraph}</HeroParagraph>
      </HeroGrid>

      <PartnersStrip>
        <PartnersRow>
          <PartnersLabel>{t.HERO.partnersLabel}</PartnersLabel>
          <PartnersLogos partners={(partners ?? PARTNERS).hero} gap={24} />
        </PartnersRow>
      </PartnersStrip>

      <ArticleBar
        onMouseEnter={() => setArticleHovered(true)}
        onMouseLeave={() => setArticleHovered(false)}
        onPointerDown={canDrag ? handlePointerDown : undefined}
        $hovered={articleHovered}
        $canDrag={canDrag}
        $dragging={dragging}
      >
        <ArticleTrack
          style={{
            width: `${articles.length * 100}%`,
            transform: `translateX(calc(${-articleIndex * (100 / articles.length)}% + ${dragX}px))`,
            transition: dragging
              ? "none"
              : "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {articles.map((a: { href: string; badge: string; source: string; title: string; cta: string }) => (
            <ArticleSlide key={a.href} style={{ flex: `0 0 ${100 / articles.length}%` }}>
              <ArticleDesktop>
                <ArticleLink
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  onClick={handleArticleLinkClick}
                >
                  <ArticleBadge>{a.badge}</ArticleBadge>
                  <ArticleSource>{a.source}</ArticleSource>
                  <ArticleDivider />
                  <ArticleTitle>{a.title}</ArticleTitle>
                  <ArticleCta $hovered={articleHovered}>{a.cta}</ArticleCta>
                </ArticleLink>
              </ArticleDesktop>

              <ArticleMobile>
                <ArticleLink
                  as="a"
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  onClick={handleArticleLinkClick}
                  style={{ display: "block" }}
                >
                  <MobileArticleHeader>
                    <MobileArticleBadge>{a.badge}</MobileArticleBadge>
                    <MobileArticleSource>{a.source}</MobileArticleSource>
                  </MobileArticleHeader>
                  <MobileArticleTitle>{a.title}</MobileArticleTitle>
                  <MobileArticleCta>{a.cta}</MobileArticleCta>
                </ArticleLink>
              </ArticleMobile>
            </ArticleSlide>
          ))}
        </ArticleTrack>

        {canDrag && (
          <ArrowsWrapper>
            <ArrowsInner>
              <ArrowButton
                aria-label="Artigo anterior"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() =>
                  setArticleIndex((i) => (i - 1 + articles.length) % articles.length)
                }
                onMouseEnter={() => setHoveredArrow("left")}
                onMouseLeave={() => setHoveredArrow(null)}
                $direction="left"
                $hoveredArrow={hoveredArrow}
                $articleHovered={articleHovered}
              >
                <ChevronIcon direction="left" />
              </ArrowButton>
              <ArrowButton
                aria-label="Próximo artigo"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setArticleIndex((i) => (i + 1) % articles.length)}
                onMouseEnter={() => setHoveredArrow("right")}
                onMouseLeave={() => setHoveredArrow(null)}
                $direction="right"
                $hoveredArrow={hoveredArrow}
                $articleHovered={articleHovered}
              >
                <ChevronIcon direction="right" />
              </ArrowButton>
            </ArrowsInner>
          </ArrowsWrapper>
        )}
      </ArticleBar>
    </Section>
  );
}
