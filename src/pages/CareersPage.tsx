import { useState, type ReactNode } from "react";
import styled from "styled-components";
import { useLang } from "../context/LangContext";
import mapStrip from "../assets/map-strip.jpeg";
import futuroTechLogo from "../assets/logo.svg";
import { Container, tokens } from "../components/styled";

const beliefIcons = [
  <path key="a" d="M3 12h4l2 6 4-14 2 8h6" />,
  <>
    <circle key="b1" cx="12" cy="12" r="3.4" />
    <path
      key="b2"
      d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"
    />
  </>,
  <path key="c" d="M4 19V9M10 19V5M16 19v-7M22 19H2" />,
  <path
    key="d"
    d="M20.5 8.5a4.6 4.6 0 0 0-8.5-2.4A4.6 4.6 0 0 0 3.5 8.5c0 5 8.5 10 8.5 10s8.5-5 8.5-10Z"
  />,
];

function Icon({ children, color = tokens.teal }: { children: ReactNode; color?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

// ---------- Hero ----------

const HeroHeader = styled.header`
  background: ${tokens.navy};
  color: #fff;
  text-align: center;
`;

const HeroInner = styled.div`
  max-width: 920px;
  margin: 0 auto;
  padding: clamp(80px, 12vw, 150px) var(--section-px) clamp(64px, 8vw, 110px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroTitle = styled.h1`
  font-family: "Cormorant Garamond", serif;
  font-weight: 400;
  font-size: clamp(38px, 6vw, 76px);
  line-height: 1.1;
  margin: 0 0 20px;
`;

const HeroSubtitle = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: 15.5px;
  color: rgba(255, 255, 255, 0.6);
  max-width: 440px;
  margin-bottom: 32px;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
`;

const HeroPrimaryButton = styled.a`
  padding: 13px 22px;
  border-radius: 4px;
  background: #fff;
  color: ${tokens.navy};
  font-family: "DM Sans", sans-serif;
  font-size: 14.5px;
  font-weight: 500;
`;

const HeroSecondaryButton = styled.a`
  padding: 13px 22px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: #fff;
  font-family: "DM Sans", sans-serif;
  font-size: 14.5px;
  font-weight: 500;
`;

function Hero({ data }: { data: any }) {
  return (
    <HeroHeader>
      <HeroInner>
        <HeroTitle>{data.title}</HeroTitle>
        <HeroSubtitle>{data.subtitle}</HeroSubtitle>
        <HeroActions>
          <HeroPrimaryButton href="#vagas">{data.ctaJobs}</HeroPrimaryButton>
          <HeroSecondaryButton href="#como-trabalhamos">
            {data.ctaHow}
          </HeroSecondaryButton>
        </HeroActions>
      </HeroInner>
    </HeroHeader>
  );
}

// ---------- Company ----------

const CompanySection = styled.section`
  background: #fff;
  border-bottom: 1px solid ${tokens.border};
  padding: clamp(64px, 10vw, 110px) var(--section-px);
`;

const CompanyGrid = styled.div`
  max-width: var(--max-content);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 64px;
  align-items: center;
`;

const CompanyHeading = styled.h2`
  font-family: "Cormorant Garamond", serif;
  font-weight: 400;
  font-size: clamp(30px, 3.4vw, 44px);
  line-height: 1.3;
  margin-bottom: 22px;
`;

const CompanyLogoInline = styled.img`
  height: 0.85em;
  vertical-align: middle;
  display: inline-block;
`;

const CompanyParagraph = styled.p`
  color: ${tokens.text};
  font-size: 16.5px;
  margin-bottom: 16px;
  line-height: 1.6;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const StatsCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StatsLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${tokens.muted};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
`;

const StatCard = styled.div`
  background: ${tokens.tealbg};
  border-radius: 10px;
  padding: 22px 20px;
`;

const StatKey = styled.span`
  display: block;
  font-size: 11px;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: ${tokens.teal};
  font-weight: 600;
  margin-bottom: 10px;
`;

const StatNum = styled.span`
  display: block;
  font-family: "Cormorant Garamond", serif;
  font-size: 40px;
  color: ${tokens.teal};
  margin-bottom: 10px;
`;

const StatDesc = styled.span`
  display: block;
  font-size: 13px;
  color: ${tokens.navy};
  font-weight: 500;
`;

const LocationCard = styled.div`
  position: relative;
  grid-column: 1/-1;
  background: ${tokens.tealbg};
  border-radius: 10px;
  overflow: hidden;
  display: grid;
  grid-template-columns: auto minmax(140px, 1fr);
  height: 88px;
`;

const LocationLink = styled.a`
  position: absolute;
  inset: 0;
  z-index: 2;
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
`;

const LocationIconWrap = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${tokens.teal};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const LocationLabel = styled.span`
  font-size: 10px;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: ${tokens.teal};
  font-weight: 600;
  flex-shrink: 0;
`;

const LocationDivider = styled.span`
  width: 1px;
  height: 14px;
  background: rgba(13, 27, 42, 0.12);
  flex-shrink: 0;
`;

const LocationCity = styled.span`
  font-size: 12.5px;
  color: ${tokens.navy};
  font-weight: 600;
  flex-shrink: 0;
`;

const MapWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MapImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const MapFade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    ${tokens.tealbg} 0%,
    rgba(225, 245, 238, 0) 22%
  );
  pointer-events: none;
`;

function Company({ data }: { data: any }) {
  const address =
    data.locationAddress ?? "Rua Madre de Deus, 300, Recife Antigo, Recife, PE";
  return (
    <CompanySection>
      <CompanyGrid>
        <div>
          <CompanyHeading>
            {data.titleStart}{" "}
            <CompanyLogoInline src={futuroTechLogo} alt="Futuro Tech" />.
          </CompanyHeading>
          <CompanyParagraph>{data.p1}</CompanyParagraph>
          <CompanyParagraph>{data.p2}</CompanyParagraph>
        </div>
        <StatsCol>
          <StatsLabel>{data.statsLabel}</StatsLabel>
          <StatsGrid>
            {data.stats.map((s: { k: string; num: string; desc: string }) => (
              <StatCard key={s.k}>
                <StatKey>{s.k}</StatKey>
                <StatNum>{s.num}</StatNum>
                <StatDesc>{s.desc}</StatDesc>
              </StatCard>
            ))}
            <LocationCard>
              <LocationLink
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  address,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${data.locationLabel} ${data.locationCity}`}
              />
              <LocationInfo>
                <LocationIconWrap>
                  <Icon color="#fff">
                    <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
                    <circle cx="12" cy="10" r="2.6" />
                  </Icon>
                </LocationIconWrap>
                <LocationLabel>{data.locationLabel}</LocationLabel>
                <LocationDivider />
                <LocationCity>{data.locationCity}</LocationCity>
              </LocationInfo>
              <MapWrap>
                <MapImg src={mapStrip} alt={`Mapa: ${address}`} loading="lazy" />
                <MapFade />
              </MapWrap>
            </LocationCard>
          </StatsGrid>
        </StatsCol>
      </CompanyGrid>
    </CompanySection>
  );
}

// ---------- Beliefs ----------

const BeliefsSection = styled.section`
  background: ${tokens.lightGrey};
  padding: clamp(64px, 10vw, 110px) var(--section-px);
  text-align: center;
`;

const BeliefsHeading = styled.h2`
  font-family: "Cormorant Garamond", serif;
  font-weight: 400;
  font-size: clamp(32px, 4.6vw, 56px);
  max-width: 900px;
  margin: 0 auto 48px;
  line-height: 1.2;
`;

const BeliefsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const BeliefCard = styled.div`
  background: #fff;
  border: 1px solid ${tokens.border};
  border-radius: 8px;
  padding: 20px 18px;
  text-align: left;
`;

const BeliefIconWrap = styled.div`
  margin-bottom: 12px;
`;

const BeliefTitle = styled.span`
  display: block;
  font-family: "Cormorant Garamond", serif;
  font-size: 19px;
  line-height: 1.22;
  margin-bottom: 6px;
`;

const BeliefDesc = styled.span`
  display: block;
  font-size: 13px;
  color: ${tokens.text};
  line-height: 1.5;
`;

function Beliefs({ data }: { data: any }) {
  return (
    <BeliefsSection id="como-trabalhamos">
      <Container maxWidth="content">
        <BeliefsHeading>{data.heading}</BeliefsHeading>
        <BeliefsGrid>
          {data.items.map((item: { title: string; desc: string }, i: number) => (
            <BeliefCard key={item.title}>
              <BeliefIconWrap>
                <Icon>{beliefIcons[i]}</Icon>
              </BeliefIconWrap>
              <BeliefTitle>{item.title}</BeliefTitle>
              <BeliefDesc>{item.desc}</BeliefDesc>
            </BeliefCard>
          ))}
        </BeliefsGrid>
      </Container>
    </BeliefsSection>
  );
}

// ---------- FAQ ----------

const FAQSection = styled.section`
  background: ${tokens.navy};
  color: #fff;
  padding: clamp(64px, 10vw, 120px) var(--section-px);
`;

const FAQGrid = styled.div`
  max-width: var(--max-content);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 60px;
`;

const FAQHeading = styled.h2`
  font-family: "Cormorant Garamond", serif;
  font-weight: 400;
  font-size: clamp(30px, 3.8vw, 46px);
  color: #fff;
`;

const FAQSubheading = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 20px;
  max-width: 300px;
`;

const FAQItem = styled.div<{ $first: boolean }>`
  border-top: ${(props) =>
    props.$first ? "1px solid rgba(255,255,255,0.13)" : "none"};
  border-bottom: 1px solid rgba(255, 255, 255, 0.13);
`;

const FAQButton = styled.button`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 28px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
`;

const FAQQuestion = styled.span`
  font-family: "Cormorant Garamond", serif;
  font-size: 25px;
  line-height: 1.25;
  color: #fff;
  flex: 1;
`;

const FAQToggleIcon = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 22px;
  flex-shrink: 0;
`;

const FAQAnswer = styled.p`
  padding: 0 40px 30px 0;
  color: rgba(255, 255, 255, 0.66);
  font-size: 15.5px;
  max-width: 640px;
  line-height: 1.6;
`;

function FAQ({ data }: { data: any }) {
  const [open, setOpen] = useState<boolean[]>(() => data.items.map(() => false));
  return (
    <FAQSection>
      <FAQGrid>
        <div>
          <FAQHeading>{data.heading}</FAQHeading>
          <FAQSubheading>{data.subheading}</FAQSubheading>
        </div>
        <div>
          {data.items.map((item: { q: string; a: string }, i: number) => (
            <FAQItem key={item.q} $first={i === 0}>
              <FAQButton
                onClick={() =>
                  setOpen((o) => o.map((v: boolean, idx: number) => (idx === i ? !v : v)))
                }
              >
                <FAQQuestion>{item.q}</FAQQuestion>
                <FAQToggleIcon>{open[i] ? "−" : "+"}</FAQToggleIcon>
              </FAQButton>
              {open[i] && <FAQAnswer>{item.a}</FAQAnswer>}
            </FAQItem>
          ))}
        </div>
      </FAQGrid>
    </FAQSection>
  );
}

// ---------- Jobs ----------

const JobsSection = styled.section`
  background: #fff;
  padding: clamp(64px, 10vw, 120px) var(--section-px);
`;

const JobsHeading = styled.h2`
  font-family: "Cormorant Garamond", serif;
  font-weight: 400;
  font-size: clamp(30px, 3.8vw, 46px);
  margin-bottom: 40px;
`;

const JobRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  flex-wrap: wrap;
  border: 1px solid ${tokens.border};
  border-radius: 8px;
  padding: 26px 30px;
  margin-bottom: 12px;
`;

const JobTags = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const JobTag = styled.span`
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
  padding: 5px 11px;
  border-radius: 3px;
  background: ${tokens.lightGrey};
  color: ${tokens.text};
`;

const JobLevelTag = styled.span<{ $intern: boolean }>`
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
  padding: 5px 11px;
  border-radius: 3px;
  background: ${(props) => (props.$intern ? tokens.tealbg : "#E7EEF4")};
  color: ${(props) => (props.$intern ? tokens.teal : "#3D6B8C")};
`;

const JobTitle = styled.div`
  font-family: "Cormorant Garamond", serif;
  font-size: 27px;
`;

const JobApplyLink = styled.a`
  font-size: 14.5px;
  font-weight: 500;
  color: ${tokens.navy};
  border-bottom: 1px solid ${tokens.border};
  padding-bottom: 4px;
  white-space: nowrap;
`;

const JobComingSoon = styled.span`
  font-size: 14.5px;
  font-weight: 500;
  color: ${tokens.muted};
  white-space: nowrap;
`;

const TalentCard = styled.div`
  margin-top: 30px;
  padding: 26px 30px;
  border: 1px dashed ${tokens.border};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  flex-wrap: wrap;
`;

const TalentTitle = styled.div`
  font-family: "Cormorant Garamond", serif;
  font-size: 22px;
`;

const TalentDesc = styled.div`
  font-size: 14.5px;
  color: ${tokens.text};
`;

const TalentButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 13px 22px;
  border-radius: 4px;
  background: ${tokens.navy};
  color: #fff;
  font-family: "DM Sans", sans-serif;
  font-size: 14.5px;
  font-weight: 500;
  white-space: nowrap;
`;

function Jobs({ data }: { data: any }) {
  return (
    <JobsSection id="vagas">
      <Container maxWidth="content">
        <JobsHeading>{data.heading}</JobsHeading>

        {data.list.map((job: { title: string; level: string; href?: string }, i: number) => (
          <JobRow key={job.title + job.level + i}>
            <div>
              <JobTags>
                <JobTag>{data.modality}</JobTag>
                <JobLevelTag $intern={job.level === "intern"}>
                  {job.level === "intern" ? data.internTag : data.juniorTag}
                </JobLevelTag>
              </JobTags>
              <JobTitle>{job.title}</JobTitle>
            </div>
            {job.href ? (
              <JobApplyLink href={job.href} target="_blank" rel="noopener noreferrer">
                {data.applyLabel} →
              </JobApplyLink>
            ) : (
              <JobComingSoon>{data.comingSoon}</JobComingSoon>
            )}
          </JobRow>
        ))}

        <TalentCard>
          <div>
            <TalentTitle>{data.talent.title}</TalentTitle>
            <TalentDesc>{data.talent.desc}</TalentDesc>
          </div>
          <TalentButton href={data.talent.href} target="_blank" rel="noopener noreferrer">
            {data.talent.cta}
          </TalentButton>
        </TalentCard>
      </Container>
    </JobsSection>
  );
}

export default function CareersPage() {
  const { t } = useLang();
  const C = t.CAREERS;
  return (
    <div>
      <Hero data={C.hero} />
      <Company data={C.company} />
      <Beliefs data={C.beliefs} />
      <FAQ data={C.faq} />
      <Jobs data={C.jobs} />
    </div>
  );
}
