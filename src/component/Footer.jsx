import React, { useState, useEffect, useRef } from "react";
import { MapPin, Phone, Mail, Heart, ChevronRight } from "lucide-react";

/* ───────── CONFIG: edit these for your business ───────── */
const BRAND_NAME = "EternalCare";
const PHONE_HREF = "tel:+918800680093";
const PHONE_LABEL = "+91-8800680093";
const EMAIL = "care@eternalcare.in";
const LOGO_SRC = "/eternalcare-logo.png";
const NAVY = "#1A237E";
const GOLD = "#B8913E";

const ADDRESS = [
  "Office No. C-131, Block C, 1st Floor,",
  "Golden 1, Plot No. 11, Techzone 4,",
  "Amrapali Leisure, Greater Noida,",
  "Uttar Pradesh, INDIA",
];

// target = the id of a section on your page, e.g. <section id="services">
const quickLinks = [
  { label: "Home", target: "home" },
  { label: "About Us", target: "about" },
  { label: "Our Services", target: "services" },
  // { label: "FAQ", target: "faq" },
  { label: "Contact Us", target: "contact" },
];

const freezerServices = [
  { label: "Freezer Box on Rent", target: "services" },
  { label: "Home & Hospital Delivery", target: "services" },
  { label: "Freezer Box for Funeral Gatherings", target: "services" },
  { label: "Dead Body Preservation", target: "services" },
  { label: "Pickup After Use", target: "services" },
  { label: "24×7 Booking Support", target: "contact" },
];

const faiths = [
  { sym: "ॐ", color: "#F97316", name: "Hindu" },
  { sym: "☪", color: "#16A34A", name: "Muslim" },
  { sym: "☬", color: "#2563EB", name: "Sikh" },
  { sym: "✝", color: "#1D4ED8", name: "Christian" },
];

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

function Heading({ children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h3
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#fff",
          margin: 0,
        }}
      >
        {children}
      </h3>
      <span
        style={{
          display: "block",
          width: 36,
          height: 3,
          borderRadius: 2,
          background: GOLD,
          marginTop: 10,
        }}
      />
    </div>
  );
}

function FooterLink({ label, target }) {
  const [hover, setHover] = useState(false);
  const go = (e) => {
    e.preventDefault();
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <li style={{ listStyle: "none" }}>
      <a
        href={`#${target}`}
        onClick={go}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 0",
          minHeight: 36,
          fontSize: 15,
          textDecoration: "none",
          color: hover ? "#fff" : "rgba(255,255,255,0.82)",
          transform: hover ? "translateX(6px)" : "none",
          transition: "color .25s ease, transform .25s ease",
        }}
      >
        <ChevronRight
          size={15}
          color={GOLD}
          style={{
            flexShrink: 0,
            transform: hover ? "translateX(3px)" : "none",
            transition: "transform .25s ease",
          }}
        />
        {label}
      </a>
    </li>
  );
}

function FaithDot({ sym, color, name }) {
  const [hover, setHover] = useState(false);
  return (
    <span
      title={name}
      aria-label={name}
      role="img"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: color,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 23,
        cursor: "default",
        transform: hover ? "translateY(-5px) scale(1.1)" : "none",
        boxShadow: hover ? "0 10px 22px rgba(0,0,0,0.3)" : "none",
        transition: "transform .3s ease, box-shadow .3s ease",
      }}
    >
      {sym}
    </span>
  );
}

function ContactRow({ icon: Icon, title, children, href }) {
  const [hover, setHover] = useState(false);
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        marginBottom: 20,
        textDecoration: "none",
        color: "#fff",
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: 40,
          height: 40,
          borderRadius: 12,
          background: hover ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: hover ? "scale(1.08)" : "none",
          transition: "all .25s ease",
        }}
      >
        <Icon size={19} color={GOLD} />
      </span>
      <span style={{ minWidth: 0, wordBreak: "break-word" }}>
        {title && (
          <strong
            style={{
              display: "block",
              fontSize: 17,
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            {title}
          </strong>
        )}
        <span
          style={{
            display: "block",
            fontSize: 15,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          {children}
        </span>
      </span>
    </Tag>
  );
}

/* ───────── FOOTER ───────── */

export default function Footer() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px)");
  const [logoOk, setLogoOk] = useState(true);

  const columns = isDesktop
    ? "1.3fr 1fr 1fr 1.25fr"
    : isTablet
      ? "1fr 1fr"
      : "1fr";

  return (
    <footer
      style={{
        background: NAVY,
        color: "#fff",
        fontFamily: "'Instrument Sans', sans-serif",
        padding:
          "clamp(48px,7vw,80px) clamp(16px,4vw,32px) calc(24px + env(safe-area-inset-bottom, 0px))",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: columns,
          gap: isDesktop ? 48 : 40,
        }}
      >
        {/* Brand */}
        <Reveal delay={0}>
          <div
            style={{
              display: "inline-block",
              background: "#fff",
              borderRadius: 12,
              padding: "10px 16px",
            }}
          >
            {logoOk ? (
              <img
                src={LOGO_SRC}
                alt={BRAND_NAME}
                onError={() => setLogoOk(false)}
                style={{ height: 44, width: "auto", display: "block" }}
              />
            ) : (
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 900,
                  fontSize: 24,
                  color: NAVY,
                }}
              >
                Eternal<span style={{ color: "#6B3FA0" }}>Care</span>
              </span>
            )}
          </div>

          <p
            style={{
              marginTop: 22,
              maxWidth: 360,
              fontSize: 16,
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.86)",
            }}
          >
            Clean, reliable freezer box service for families, delivered quickly
            and handled with dignity when you need it most.
          </p>

          <div
            style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}
          >
            {faiths.map((f) => (
              <FaithDot key={f.name} {...f} />
            ))}
          </div>

          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 24,
              fontSize: 15,
              fontWeight: 500,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            <Heart size={20} color="#9FA8DA" />
            Serving all faiths with compassion
          </p>
        </Reveal>

        {/* Quick links */}
        <Reveal delay={120}>
          <Heading>Quick Links</Heading>
          <ul style={{ margin: 0, padding: 0 }}>
            {quickLinks.map((l) => (
              <FooterLink key={l.label} {...l} />
            ))}
          </ul>
        </Reveal>

        {/* Freezer services */}
        <Reveal delay={240}>
          <Heading>Freezer Services</Heading>
          <ul style={{ margin: 0, padding: 0 }}>
            {freezerServices.map((l) => (
              <FooterLink key={l.label} {...l} />
            ))}
          </ul>
        </Reveal>

        {/* Contact */}
        <Reveal delay={360}>
          <Heading>Contact Us</Heading>

          <ContactRow icon={MapPin} title="Head Office">
            {ADDRESS.map((line) => (
              <span key={line} style={{ display: "block" }}>
                {line}
              </span>
            ))}
          </ContactRow>

          <ContactRow icon={Phone} title="Customer Care" href={PHONE_HREF}>
            {PHONE_LABEL}
          </ContactRow>

          <ContactRow icon={Mail} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </ContactRow>
        </Reveal>
      </div>

      {/* Bottom bar */}
      <Reveal delay={200}>
        <div
          style={{
            maxWidth: 1280,
            margin: "48px auto 0",
            paddingTop: 22,
            borderTop: "1px solid rgba(255,255,255,0.16)",
            textAlign: "center",
            fontSize: 13,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
        </div>
      </Reveal>
    </footer>
  );
}