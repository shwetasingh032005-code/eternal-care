import React, { useState, useEffect, useRef } from "react";
import { MapPin, Phone, Mail, Navigation, ArrowRight } from "lucide-react";

/* ───────── CONFIG: edit these for your business ───────── */
const BRAND_NAME = "EternalCare";
const PHONE_HREF = "tel:+918800680093";
const PHONE_LABEL = "+91-8800680093";
const EMAIL = "care@eternalcare.in";

const NAVY = "#1A237E";
const PURPLE = "#6B3FA0";
const GOLD = "#B8913E";
const RED = "#E7000B";
const SOFT = "#F4F1FB";
const BORDER = "#E3DDF3";

// Same address as the footer
const ADDRESS = [
  "Office No. C-131, Block C, 1st Floor,",
  "Golden 1, Plot No. 11, Techzone 4,",
  "Amrapali Leisure, Greater Noida,",
  "Uttar Pradesh, INDIA",
];

const MAP_QUERY =
  "Golden 1, Plot No. 11, Techzone 4, Amrapali Leisure, Greater Noida, Uttar Pradesh";
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
const DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;

/* ───────── HELPERS ───────── */

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Fades and slides its children up once, when they scroll into view.
function Reveal({ children, delay = 0, style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(28px)",
        transition: `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function InfoCard({ icon: Icon, title, href, children }) {
  const [hover, setHover] = useState(false);
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={{
        display: "flex",
        gap: 16,
        alignItems: "flex-start",
        padding: "20px 22px",
        background: "#fff",
        border: `1.5px solid ${hover ? PURPLE : BORDER}`,
        borderRadius: 16,
        textDecoration: "none",
        color: "#4a5565",
        boxShadow: hover
          ? "0 16px 40px rgba(26,35,126,0.14)"
          : "0 4px 24px rgba(26,35,126,0.06)",
        transform: hover ? "translateY(-4px)" : "none",
        transition: "all .3s ease",
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: 48,
          height: 48,
          borderRadius: 14,
          background: hover ? NAVY : SOFT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background .3s ease",
        }}
      >
        <Icon size={22} color={hover ? "#fff" : PURPLE} />
      </span>
      <span style={{ minWidth: 0, wordBreak: "break-word" }}>
        <strong
          style={{
            display: "block",
            fontFamily: "'Poppins', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: NAVY,
            marginBottom: 4,
          }}
        >
          {title}
        </strong>
        <span style={{ display: "block", fontSize: 15, lineHeight: 1.7 }}>
          {children}
        </span>
      </span>
    </Tag>
  );
}

function CtaButton({ href, children, variant = "red", icon: Icon }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  const isRed = variant === "red";

  // Pulse ring on the main button (inline styles cannot hold keyframes).
  useEffect(() => {
    if (!isRed || prefersReducedMotion()) return undefined;
    const pulse = ref.current?.animate(
      [
        { boxShadow: "0 0 0 0 rgba(231,0,11,0.55)" },
        { boxShadow: "0 0 0 16px rgba(231,0,11,0)" },
      ],
      { duration: 2200, iterations: Infinity, easing: "ease-out" },
    );
    return () => pulse?.cancel();
  }, [isRed]);

  return (
    <a
      ref={ref}
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        minHeight: 56,
        padding: "0 30px",
        borderRadius: 12,
        fontFamily: "inherit",
        fontSize: 16,
        fontWeight: 700,
        textDecoration: "none",
        color: "#fff",
        background: isRed
          ? hover
            ? "#c4000a"
            : RED
          : hover
            ? "rgba(255,255,255,0.14)"
            : "transparent",
        border: isRed
          ? "2px solid transparent"
          : "2px solid rgba(255,255,255,0.6)",
        transform: hover ? "translateY(-3px)" : "none",
        transition: "transform .25s ease, background .25s ease",
      }}
    >
      {Icon && <Icon size={18} />}
      {children}
    </a>
  );
}

/* ───────── CONTACT SECTION ───────── */

export default function Contact() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isPhone = useMediaQuery("(max-width: 639px)");
  const [mapHover, setMapHover] = useState(false);

  return (
    <section
      id="contact"
      style={{
        background: "#fff",
        fontFamily: "'Poppins', sans-serif",
        padding:
          "clamp(64px,8vw,104px) clamp(16px,4vw,32px) clamp(64px,8vw,104px)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Heading */}
        <Reveal
          style={{ maxWidth: 640, margin: "0 auto 48px", textAlign: "center" }}
        >
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: NAVY,
              margin: 0,
            }}
          >
            Contact Us
          </h2>
          <span
            style={{
              display: "block",
              width: 56,
              height: 3,
              background: GOLD,
              borderRadius: 2,
              margin: "18px auto 0",
            }}
          />
          <p
            style={{
              marginTop: 16,
              fontSize: 16,
              lineHeight: 1.75,
              color: "#667085",
            }}
          >
            Call us any time, or visit our office. Our team is ready to help
            your family.
          </p>
        </Reveal>

        {/* Info cards + map */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "0.9fr 1.1fr" : "1fr",
            gap: isDesktop ? 36 : 28,
            alignItems: "stretch",
          }}
        >
          <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <Reveal delay={0}>
              <InfoCard icon={MapPin} title="Head Office">
                {ADDRESS.map((line) => (
                  <span key={line} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </InfoCard>
            </Reveal>
            <Reveal delay={100}>
              <InfoCard icon={Phone} title="Customer Care" href={PHONE_HREF}>
                {PHONE_LABEL}
              </InfoCard>
            </Reveal>
            <Reveal delay={200}>
              <InfoCard icon={Mail} title="Email Us" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </InfoCard>
            </Reveal>
          </div>

          <Reveal delay={150} style={{ display: "flex" }}>
            <div
              onMouseEnter={() => setMapHover(true)}
              onMouseLeave={() => setMapHover(false)}
              style={{
                position: "relative",
                width: "100%",
                minHeight: isPhone ? 300 : 380,
                borderRadius: 20,
                overflow: "hidden",
                border: `1.5px solid ${BORDER}`,
                boxShadow: mapHover
                  ? "0 16px 60px rgba(26,35,126,0.2)"
                  : "0 4px 24px rgba(26,35,126,0.08)",
                transition: "box-shadow .3s ease",
              }}
            >
              <iframe
                title={`${BRAND_NAME} office location`}
                src={MAP_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
              <a
                href={DIRECTIONS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: "absolute",
                  left: 14,
                  bottom: 14,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  minHeight: 44,
                  padding: "0 18px",
                  borderRadius: 999,
                  background: NAVY,
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 8px 22px rgba(26,35,126,0.35)",
                }}
              >
                <Navigation size={16} /> Get directions
              </a>
            </div>
          </Reveal>
        </div>

        {/* CTA band */}
        <Reveal delay={100} style={{ marginTop: isDesktop ? 64 : 48 }}>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 24,
              background: `linear-gradient(135deg, ${NAVY} 0%, ${PURPLE} 100%)`,
              padding: "clamp(32px,6vw,64px) clamp(20px,5vw,56px)",
              textAlign: "center",
              boxShadow: "0 16px 60px rgba(26,35,126,0.25)",
            }}
          >
            {/* soft decorative circles */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.07)",
              }}
            />
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: -80,
                left: -50,
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: "rgba(184,145,62,0.18)",
              }}
            />

            <div
              style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}
            >
              <h2
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(26px,4vw,40px)",
                  fontWeight: 900,
                  lineHeight: 1.2,
                  color: "#fff",
                  margin: 0,
                }}
              >
                Need help right now?
              </h2>
              <span
                style={{
                  display: "block",
                  width: 56,
                  height: 3,
                  background: GOLD,
                  borderRadius: 2,
                  margin: "16px auto 0",
                }}
              />
              <p
                style={{
                  marginTop: 18,
                  fontSize: "clamp(15px,1.6vw,17px)",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.88)",
                }}
              >
                Our helpline is open 24×7. Call now and a care coordinator will
                guide you through every step.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: isPhone ? "column" : "row",
                  alignItems: "stretch",
                  justifyContent: "center",
                  gap: 14,
                  marginTop: 30,
                }}
              >
                <CtaButton href={PHONE_HREF} icon={Phone}>
                  Call {PHONE_LABEL}
                </CtaButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
