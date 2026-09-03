import { useState } from "react";
import { useLang } from "../context/LangContext";
import mapStrip from "../assets/map-strip.jpeg";
import futuroTechLogo from "../assets/logo.svg";

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

function Icon({ children, color = "var(--teal)" }) {
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

function Hero({ data }) {
  return (
    <header
      style={{ background: "var(--navy)", color: "#fff", textAlign: "center" }}
    >
      <div
        style={{
          maxWidth: 920,
          margin: "0 auto",
          padding:
            "clamp(80px, 12vw, 150px) var(--section-px) clamp(64px, 8vw, 110px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(38px, 6vw, 76px)",
            lineHeight: 1.1,
            margin: "0 0 20px",
          }}
        >
          {data.title}
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15.5,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 440,
            marginBottom: 32,
          }}
        >
          {data.subtitle}
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="#vagas"
            style={{
              padding: "13px 22px",
              borderRadius: 4,
              background: "#fff",
              color: "var(--navy)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14.5,
              fontWeight: 500,
            }}
          >
            {data.ctaJobs}
          </a>
          <a
            href="#como-trabalhamos"
            style={{
              padding: "13px 22px",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.28)",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14.5,
              fontWeight: 500,
            }}
          >
            {data.ctaHow}
          </a>
        </div>
      </div>
    </header>
  );
}

function Company({ data }) {
  return (
    <section
      style={{
        background: "#fff",
        borderBottom: "1px solid var(--border)",
        padding: "clamp(64px, 10vw, 110px) var(--section-px)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-content)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(30px, 3.4vw, 44px)",
              lineHeight: 1.3,
              marginBottom: 22,
            }}
          >
            {data.titleStart}{" "}
            <img
              src={futuroTechLogo}
              alt="Futuro Tech"
              style={{
                height: "0.85em",
                verticalAlign: "middle",
                display: "inline-block",
              }}
            />
            .
          </h2>
          <p
            style={{
              color: "var(--text)",
              fontSize: 16.5,
              marginBottom: 16,
              lineHeight: 1.6,
            }}
          >
            {data.p1}
          </p>
          <p style={{ color: "var(--text)", fontSize: 16.5, lineHeight: 1.6 }}>
            {data.p2}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {data.statsLabel}
          </span>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            {data.stats.map((s) => (
              <div
                key={s.k}
                style={{
                  background: "var(--teal-bg)",
                  borderRadius: 10,
                  padding: "22px 20px",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: 11,
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    color: "var(--teal)",
                    fontWeight: 600,
                    marginBottom: 10,
                  }}
                >
                  {s.k}
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 40,
                    color: "var(--teal)",
                    marginBottom: 10,
                  }}
                >
                  {s.num}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: 13,
                    color: "var(--navy)",
                    fontWeight: 500,
                  }}
                >
                  {s.desc}
                </span>
              </div>
            ))}
            <div
              style={{
                position: "relative",
                gridColumn: "1/-1",
                background: "var(--teal-bg)",
                borderRadius: 10,
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "auto minmax(140px, 1fr)",
                height: 88,
              }}
            >
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  data.locationAddress ??
                    "Rua Madre de Deus, 300, Recife Antigo, Recife, PE",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${data.locationLabel} ${data.locationCity}`}
                style={{ position: "absolute", inset: 0, zIndex: 2 }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "0 16px",
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "var(--teal)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon color="#fff">
                    <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
                    <circle cx="12" cy="10" r="2.6" />
                  </Icon>
                </span>
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    color: "var(--teal)",
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {data.locationLabel}
                </span>
                <span
                  style={{
                    width: 1,
                    height: 14,
                    background: "rgba(13,27,42,0.12)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 12.5,
                    color: "var(--navy)",
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {data.locationCity}
                </span>
              </div>
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <img
                  src={mapStrip}
                  alt={`Mapa: ${
                    data.locationAddress ??
                    "Rua Madre de Deus, 300, Recife Antigo, Recife, PE"
                  }`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  loading="lazy"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to right, var(--teal-bg) 0%, rgba(225,245,238,0) 22%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Beliefs({ data }) {
  return (
    <section
      id="como-trabalhamos"
      style={{
        background: "var(--light-grey)",
        padding: "clamp(64px, 10vw, 110px) var(--section-px)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "var(--max-content)", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(32px, 4.6vw, 56px)",
            maxWidth: 900,
            margin: "0 auto 48px",
            lineHeight: 1.2,
          }}
        >
          {data.heading}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {data.items.map((item, i) => (
            <div
              key={item.title}
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "20px 18px",
                textAlign: "left",
              }}
            >
              <div style={{ marginBottom: 12 }}>
                <Icon>{beliefIcons[i]}</Icon>
              </div>
              <span
                style={{
                  display: "block",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 19,
                  lineHeight: 1.22,
                  marginBottom: 6,
                }}
              >
                {item.title}
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: 13,
                  color: "var(--text)",
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ({ data }) {
  const [open, setOpen] = useState(() => data.items.map(() => false));
  return (
    <section
      style={{
        background: "var(--navy)",
        color: "#fff",
        padding: "clamp(64px, 10vw, 120px) var(--section-px)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-content)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 60,
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(30px, 3.8vw, 46px)",
              color: "#fff",
            }}
          >
            {data.heading}
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.55)",
              marginTop: 20,
              maxWidth: 300,
            }}
          >
            {data.subheading}
          </p>
        </div>
        <div>
          {data.items.map((item, i) => (
            <div
              key={item.q}
              style={{
                borderTop:
                  i === 0 ? "1px solid rgba(255,255,255,0.13)" : "none",
                borderBottom: "1px solid rgba(255,255,255,0.13)",
              }}
            >
              <button
                onClick={() =>
                  setOpen((o) => o.map((v, idx) => (idx === i ? !v : v)))
                }
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 24,
                  padding: "28px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 25,
                    lineHeight: 1.25,
                    color: "#fff",
                    flex: 1,
                  }}
                >
                  {item.q}
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  {open[i] ? "−" : "+"}
                </span>
              </button>
              {open[i] && (
                <p
                  style={{
                    padding: "0 40px 30px 0",
                    color: "rgba(255,255,255,0.66)",
                    fontSize: 15.5,
                    maxWidth: 640,
                    lineHeight: 1.6,
                  }}
                >
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Jobs({ data }) {
  return (
    <section
      id="vagas"
      style={{
        background: "#fff",
        padding: "clamp(64px, 10vw, 120px) var(--section-px)",
      }}
    >
      <div style={{ maxWidth: "var(--max-content)", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(30px, 3.8vw, 46px)",
            marginBottom: 40,
          }}
        >
          {data.heading}
        </h2>

        {data.list.map((job, i) => (
          <div
            key={job.title + job.level + i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 28,
              flexWrap: "wrap",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "26px 30px",
              marginBottom: 12,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 10,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    padding: "5px 11px",
                    borderRadius: 3,
                    background: "var(--light-grey)",
                    color: "var(--text)",
                  }}
                >
                  {data.modality}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    padding: "5px 11px",
                    borderRadius: 3,
                    background:
                      job.level === "intern" ? "var(--teal-bg)" : "#E7EEF4",
                    color: job.level === "intern" ? "var(--teal)" : "#3D6B8C",
                  }}
                >
                  {job.level === "intern" ? data.internTag : data.juniorTag}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 27,
                }}
              >
                {job.title}
              </div>
            </div>
            {job.href ? (
              <a
                href={job.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 14.5,
                  fontWeight: 500,
                  color: "var(--navy)",
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 4,
                  whiteSpace: "nowrap",
                }}
              >
                {data.applyLabel} →
              </a>
            ) : (
              <span
                style={{
                  fontSize: 14.5,
                  fontWeight: 500,
                  color: "var(--muted)",
                  whiteSpace: "nowrap",
                }}
              >
                {data.comingSoon}
              </span>
            )}
          </div>
        ))}

        <div
          style={{
            marginTop: 30,
            padding: "26px 30px",
            border: "1px dashed var(--border)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 28,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
              }}
            >
              {data.talent.title}
            </div>
            <div style={{ fontSize: 14.5, color: "var(--text)" }}>
              {data.talent.desc}
            </div>
          </div>
          <a
            href={data.talent.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "13px 22px",
              borderRadius: 4,
              background: "var(--navy)",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14.5,
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {data.talent.cta}
          </a>
        </div>
      </div>
    </section>
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

