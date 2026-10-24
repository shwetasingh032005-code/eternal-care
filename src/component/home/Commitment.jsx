import React, { useState, useEffect, useRef } from "react";
import {
  Globe,
  ShieldCheck,
  Landmark,
  Ambulance,
  IndianRupee,
  UserCheck,
  BookOpen,
  Video,
} from "lucide-react";

/* ───────── CONFIG ───────── */
const BRAND_NAME = "EternalCare";
const NAVY = "#1A237E";
const BLUE_BORDER = "#CFE0F6";

const commitments = [
  {
    Icon: Globe,
    title: "Pan-India Network",
    text: "500+ partner locations across every major city and town in India.",
  },
  {
    Icon: ShieldCheck,
    title: "Government Certified",
    text: "Registered & certified social venture with full legal compliance.",
  },
  {
    Icon: Landmark,
    title: "Embassy Accredited",
    text: "Globally accredited team for international repatriation services.",
  },
  {
    Icon: Ambulance,
    title: "24 × 7 Fleet Ready",
    text: "20+ ambulances on standby across Delhi NCR and Pan India at all times.",
  },
  {
    Icon: IndianRupee,
    title: "Transparent Pricing",
    text: "No hidden charges — ever. Clear, honest pricing for every service.",
  },
  {
    Icon: UserCheck,
    title: "Dedicated Manager",
    text: "A personal relationship manager is assigned to every grieving family.",
  },
  {
    Icon: BookOpen,
    title: "Ritual Guidance",
    text: "Assistance with Pind Daan, Tehravin & all post-funeral ceremonies.",
  },
  {
    Icon: Video,
    title: "Live Streaming",
    text: "Digital services including live streaming for overseas family members.",
  },
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
      { threshold: 0.1 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(22px)",
        transition: `opacity .6s ease ${delay}ms, transform .6s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Compact horizontal card: icon on the left, text on the right.
function CommitCard({ Icon, title, text }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        padding: "16px 16px 16px 20px",
        background: "#fff",
        border: `1.5px solid ${BLUE_BORDER}`,
        borderRadius: 14,
        // hover: only a slight lift and a soft shadow, no colour change
        boxShadow: hover
          ? "0 10px 26px rgba(0,0,0,0.10)"
          : "0 2px 12px rgba(0,0,0,0.04)",
        transform: hover ? "translateY(-3px)" : "none",
        transition: "transform .3s ease, box-shadow .3s ease",
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "#E6F0FD",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={21} color={NAVY} />
      </span>

      <div style={{ minWidth: 0 }}>
        <h3
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 16.5,
            fontWeight: 800,
            color: NAVY,
            margin: "1px 0 4px",
            lineHeight: 1.25,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 13.5,
            lineHeight: 1.6,
            color: "#4a5565",
            margin: 0,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

/* ───────── SECTION ───────── */

export default function Commitment() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px)");

  const columns = isDesktop
    ? "repeat(4, 1fr)"
    : isTablet
      ? "repeat(2, 1fr)"
      : "1fr";

  return (
    <section
      id="commitment"
      style={{
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Instrument Sans', sans-serif",
        padding: "clamp(40px,5vw,64px) clamp(16px,4vw,32px)",
        backgroundColor: "#E9F2FE",
        backgroundImage: [
          "radial-gradient(circle at 92% 0%, rgba(26,35,126,0.10), transparent 40%)",
          "radial-gradient(circle at 0% 100%, rgba(63,91,216,0.10), transparent 40%)",
          "radial-gradient(rgba(26,35,126,0.07) 1px, transparent 1px)",
        ].join(","),
        backgroundSize: "auto, auto, 22px 22px",
      }}
    >
      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
        {/* Heading row: title on the left, intro on the right (desktop) */}
        <Reveal
          style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "1.1fr 0.9fr" : "1fr",
            gap: isDesktop ? 40 : 12,
            alignItems: "end",
            marginBottom: isDesktop ? 28 : 22,
            textAlign: isDesktop ? "left" : "center",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                padding: "6px 14px",
                borderRadius: 999,
                background: "#fff",
                border: `1px solid ${BLUE_BORDER}`,
                color: NAVY,
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Our Commitment
            </span>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(26px,3.4vw,38px)",
                fontWeight: 900,
                lineHeight: 1.15,
                color: NAVY,
                margin: 0,
              }}
            >
              Why Families Trust {BRAND_NAME}
            </h2>
            <span
              style={{
                display: "block",
                width: 52,
                height: 3,
                background: NAVY,
                borderRadius: 2,
                margin: isDesktop ? "14px 0 0" : "14px auto 0",
              }}
            />
          </div>
          <p
            style={{
              fontSize: 15.5,
              lineHeight: 1.7,
              color: "#4a5565",
              margin: 0,
              maxWidth: isDesktop ? 460 : "none",
            }}
          >
            Every promise we make is kept — with compassion, professionalism,
            and complete transparency.
          </p>
        </Reveal>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: columns,
            gap: 14,
          }}
        >
          {commitments.map((c, i) => (
            <Reveal
              key={c.title}
              delay={(i % 4) * 70}
              style={{ height: "100%" }}
            >
              <CommitCard {...c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}