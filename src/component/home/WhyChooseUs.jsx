import React, { useState, useEffect, useRef } from "react";
import { Snowflake, Truck, ShieldCheck, HeartHandshake } from "lucide-react";

/* ───────── CONFIG ───────── */
const BRAND_NAME = "EternalCare";
const NAVY = "#1A237E";
const PURPLE = "#6B3FA0";
const GOLD = "#B8913E";
const SOFT = "#F4F1FB";
const BORDER = "#E3DDF3";

const whyUs = [
  {
    Icon: ShieldCheck,
    title: "Clean & hygienic",
    text: "Every freezer box is cleaned and sanitized before and after use, so preservation always happens in a safe, spotless unit.",
  },
  {
    Icon: Snowflake,
    title: "Reliable cooling",
    text: "Well-maintained units hold a steady low temperature, so remains stay preserved through extended family gatherings.",
  },
  {
    Icon: Truck,
    title: "Fast 24×7 delivery",
    text: "Book any day, any time. We deliver and set up the freezer box at your home, hospital or venue, and collect it when you are done.",
  },
  {
    Icon: HeartHandshake,
    title: "Care with dignity",
    text: "Our team handles every freezer box arrangement with respect, so your family can gather without worry.",
  },
];

const faiths = [
  { sym: "ॐ", color: "#F97316", name: "Hindu" },
  { sym: "☪", color: "#16A34A", name: "Muslim" },
  { sym: "☬", color: "#2563EB", name: "Sikh" },
  { sym: "✝", color: "#1D4ED8", name: "Christian" },
  { sym: "☸", color: "#B8913E", name: "Buddhist" },
  { sym: "", color: PURPLE, name: "Jain" },
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

function WhyCard({ Icon, title, text, index }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        height: "100%",
        overflow: "hidden",
        padding: "30px 26px 28px",
        background: "#fff",
        border: `1.5px solid ${hover ? PURPLE : BORDER}`,
        borderTop: `4px solid ${hover ? GOLD : NAVY}`,
        borderRadius: 18,
        boxShadow: hover
          ? "0 18px 46px rgba(26,35,126,0.16)"
          : "0 4px 24px rgba(26,35,126,0.07)",
        transform: hover ? "translateY(-6px)" : "none",
        transition: "all .35s ease",
      }}
    >
      {/* big faded number */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 6,
          right: 18,
          fontFamily: "'Poppins', sans-serif",
          fontSize: 64,
          fontWeight: 900,
          lineHeight: 1,
          color: hover ? "rgba(184,145,62,0.22)" : "rgba(26,35,126,0.07)",
          transition: "color .35s ease",
          userSelect: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: hover ? NAVY : SOFT,
          transform: hover ? "scale(1.08) rotate(-6deg)" : "none",
          transition: "all .35s ease",
        }}
      >
        <Icon size={26} color={hover ? "#fff" : PURPLE} />
      </span>

      <h3
        style={{
          position: "relative",
          fontFamily: "'Poppins', sans-serif",
          fontSize: 20,
          fontWeight: 800,
          color: NAVY,
          margin: "20px 0 8px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          position: "relative",
          fontSize: 15,
          lineHeight: 1.75,
          color: "#4a5565",
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
}

function FaithChip({ sym, color, name }) {
  const [hover, setHover] = useState(false);
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        minHeight: 42,
        padding: "0 16px 0 8px",
        borderRadius: 999,
        background: "#fff",
        border: `1.5px solid ${hover ? color : BORDER}`,
        color: NAVY,
        fontSize: 14,
        fontWeight: 600,
        transform: hover ? "translateY(-3px)" : "none",
        boxShadow: hover ? "0 8px 20px rgba(26,35,126,0.12)" : "none",
        transition: "all .25s ease",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: color,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        {sym || name.charAt(0)}
      </span>
      {name}
    </span>
  );
}

/* ───────── SECTION ───────── */

export default function WhyChooseUs() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isPhone = useMediaQuery("(max-width: 639px)");

  return (
    <section
      id="why-us"
      style={{
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(180deg, ${SOFT} 0%, #ffffff 100%)`,
        fontFamily: "'Poppins', sans-serif",
        padding: "clamp(64px,8vw,104px) clamp(16px,4vw,32px)",
      }}
    >
      {/* soft decorative shapes */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -120,
          right: -100,
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "rgba(107,63,160,0.08)",
          pointerEvents: "none",
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -140,
          left: -120,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "rgba(184,145,62,0.10)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isDesktop ? "0.85fr 1.15fr" : "1fr",
          gap: isDesktop ? 56 : 40,
          alignItems: "center",
        }}
      >
        {/* Left: text */}
        <Reveal>
          <span
            style={{
              display: "inline-block",
              paddingLeft: 14,
              borderLeft: `3px solid ${GOLD}`,
              color: NAVY,
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Eternal Care
          </span>
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(28px,4vw,46px)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: NAVY,
              margin: 0,
            }}
          >
            Why choose our Freezer Box Services
          </h2>
          <span
            style={{
              display: "block",
              width: 56,
              height: 3,
              background: GOLD,
              borderRadius: 2,
              margin: "18px 0 20px",
            }}
          />
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.85,
              color: "#4a5565",
              margin: 0,
              maxWidth: 520,
            }}
          >
            {BRAND_NAME} provides clean, well-maintained freezer box
            arrangements to preserve mortal remains with dignity and care.
            Whether your family needs a day or several days for relatives to
            arrive, we deliver the freezer box, set it up and collect it
            afterwards, so you can focus on your loved ones while we handle the
            rest.
          </p>

          <div style={{ marginTop: 32 }}>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: NAVY,
                margin: "0 0 14px",
              }}
            >
              Serving all faiths
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {faiths.map((f) => (
                <FaithChip key={f.name} {...f} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right: cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isPhone ? "1fr" : "1fr 1fr",
            gap: 20,
          }}
        >
          {whyUs.map((w, i) => (
            <Reveal key={w.title} delay={i * 110} style={{ height: "100%" }}>
              <WhyCard {...w} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
