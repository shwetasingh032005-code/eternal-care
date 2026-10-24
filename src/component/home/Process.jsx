import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  ClipboardCheck,
  Truck,
  Snowflake,
  CheckCircle,
} from "lucide-react";

/* ───────── CONFIG: edit these for your business ───────── */
const PHONE_HREF = "tel:+918800680093";
const PHONE_LABEL = "+91-8800680093";
const NAVY = "#1A237E";
const RED = "#E7000B";

// Medium blue background (lighter than navy, not too dark)
const BLUE_A = "#1A237E";
const BLUE_B = "#1A237E";
const SOFT_WHITE = "#CFE0FF"; // light accent used for labels and icons

const steps = [
  {
    Icon: Phone,
    title: "Call or book",
    text: "Call our 24×7 helpline or send a request. Tell us the location, the date and how long you need the freezer box.",
  },
  {
    Icon: ClipboardCheck,
    title: "Confirm the details",
    text: "We confirm availability, timing and charges with you before anything is sent, so there are no surprises.",
  },
  {
    Icon: Truck,
    title: "Delivery & setup",
    text: "Our team delivers a clean, sanitized freezer box to your home, hospital or venue and sets it up.",
  },
  {
    Icon: Snowflake,
    title: "Preserved with care",
    text: "A steady low temperature keeps remains preserved with dignity while the family gathers. We are a call away if you need anything.",
  },
  {
    Icon: CheckCircle,
    title: "Pickup & next steps",
    text: "When your family is ready, we collect the freezer box and help with whatever comes next.",
  },
];

const assurances = [
  "Sanitized before every use",
  "Steady low temperature",
  "Delivery and pickup included",
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
        transform: shown ? "none" : "translateY(22px)",
        transition: `opacity .6s ease ${delay}ms, transform .6s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ───────── TIMELINE STEP ───────── */

const GAP = 14;

function Step({ Icon, title, text, index, total, reached, onReach, size }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const [hover, setHover] = useState(false);

  // Mark this step as reached when it scrolls into the lower part of the screen.
  useEffect(() => {
    if (prefersReducedMotion()) {
      setSeen(true);
      onReach(index);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          onReach(index);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -18% 0px" },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const done = reached >= index;
  const center = size / 2;

  return (
    <li
      ref={ref}
      style={{
        position: "relative",
        listStyle: "none",
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        opacity: seen ? 1 : 0,
        transform: seen ? "none" : "translateX(22px)",
        transition: "opacity .6s ease, transform .6s cubic-bezier(.22,.61,.36,1)",
      }}
    >
      {/* rail segment down to the next step */}
      {index < total - 1 && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: center,
            left: center - 1,
            width: 2,
            height: `calc(100% + ${GAP}px)`,
            background: "rgba(255,255,255,0.25)",
          }}
        >
          <span
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              background: "#fff",
              transformOrigin: "top",
              transform: reached >= index + 1 ? "scaleY(1)" : "scaleY(0)",
              transition: "transform .8s ease",
            }}
          />
        </span>
      )}

      {/* number circle */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          flexShrink: 0,
          width: size,
          height: size,
          borderRadius: "50%",
          background: done ? "#fff" : BLUE_A,
          color: done ? NAVY : "#fff",
          border: `2px solid ${done ? "#fff" : "rgba(255,255,255,0.45)"}`,
          boxShadow: done ? "0 0 0 5px rgba(255,255,255,0.18)" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Fraunces', serif",
          fontSize: size > 44 ? 20 : 18,
          fontWeight: 900,
          transition: "all .5s ease",
        }}
      >
        {index + 1}
      </span>

      {/* card (hover: only a small slide and soft shadow, no colour change) */}
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "relative",
          overflow: "hidden",
          flex: 1,
          minWidth: 0,
          padding: "14px 18px 16px",
          borderRadius: 14,
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.22)",
          boxShadow: hover ? "0 10px 26px rgba(0,0,0,0.18)" : "none",
          transform: hover ? "translateX(4px)" : "none",
          transition: "transform .3s ease, box-shadow .3s ease",
        }}
      >
        {/* big faded step number */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -2,
            right: 14,
            fontFamily: "'Fraunces', serif",
            fontSize: 54,
            fontWeight: 900,
            lineHeight: 1,
            color: "rgba(255,255,255,0.09)",
            userSelect: "none",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 8,
          }}
        >
          <span
            style={{
              flexShrink: 0,
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "rgba(255,255,255,0.16)",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={20} color="#fff" />
          </span>
          <div style={{ minWidth: 0 }}>
            <span
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: SOFT_WHITE,
                marginBottom: 1,
              }}
            >
              Step {index + 1}
            </span>
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 18.5,
                fontWeight: 800,
                color: "#fff",
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              {title}
            </h3>
          </div>
        </div>

        <p
          style={{
            position: "relative",
            fontSize: 14,
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.88)",
            margin: 0,
          }}
        >
          {text}
        </p>
      </div>
    </li>
  );
}

/* ───────── CALL BUTTON (currently switched off in the section below) ───────── */

function CallButton() {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const pulse = ref.current?.animate(
      [
        { boxShadow: "0 0 0 0 rgba(231,0,11,0.55)" },
        { boxShadow: "0 0 0 16px rgba(231,0,11,0)" },
      ],
      { duration: 2200, iterations: Infinity, easing: "ease-out" },
    );
    return () => pulse?.cancel();
  }, []);

  return (
    <a
      ref={ref}
      href={PHONE_HREF}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: "100%",
        minHeight: 52,
        borderRadius: 12,
        background: hover ? "#c4000a" : RED,
        color: "#fff",
        fontSize: 16,
        fontWeight: 700,
        textDecoration: "none",
        transform: hover ? "translateY(-3px)" : "none",
        transition: "transform .25s ease, background .25s ease",
      }}
    >
      <Phone size={18} /> Call now
    </a>
  );
}

/* ───────── SECTION ───────── */

export default function Process() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isPhone = useMediaQuery("(max-width: 639px)");
  const [reached, setReached] = useState(-1);
  const onReach = (i) => setReached((r) => Math.max(r, i));

  return (
    <section
      id="process"
      style={{
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Instrument Sans', sans-serif",
        // less height: smaller top and bottom padding
        padding: "clamp(36px,5vw,60px) clamp(16px,4vw,32px)",
        backgroundColor: BLUE_A,
        backgroundImage: [
          "radial-gradient(circle at 88% 6%, rgba(140,175,255,0.40), transparent 42%)",
          "radial-gradient(circle at 6% 96%, rgba(140,175,255,0.22), transparent 40%)",
          "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          `linear-gradient(135deg, ${BLUE_A} 0%, ${BLUE_B} 100%)`,
        ].join(","),
        backgroundSize: "auto, auto, 24px 24px, auto",
      }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isDesktop ? "0.82fr 1.18fr" : "1fr",
          gap: isDesktop ? 48 : 28,
          alignItems: "start",
        }}
      >
        {/* Left: intro + helpline (sticky on desktop) */}
        <div
          style={
            isDesktop ? { position: "sticky", top: 100, alignSelf: "start" } : {}
          }
        >
          <Reveal>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              <Snowflake size={14} /> Freezer Box Service
            </span>

            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(28px,3.8vw,42px)",
                fontWeight: 900,
                lineHeight: 1.12,
                color: "#fff",
                margin: "14px 0 0",
              }}
            >
              How it works,
              <br />
              <span style={{ color: SOFT_WHITE }}>step by step</span>
            </h2>

            <span
              style={{
                display: "block",
                width: 52,
                height: 3,
                background: "#fff",
                borderRadius: 2,
                margin: "14px 0",
              }}
            />

            <p
              style={{
                fontSize: 15.5,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.9)",
                margin: 0,
                maxWidth: 440,
              }}
            >
              You do not have to arrange anything alone. From your first call to
              pickup, we handle every step with care.
            </p>

            <ul style={{ margin: "16px 0 0", padding: 0 }}>
              {assurances.map((a) => (
                <li
                  key={a}
                  style={{
                    listStyle: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "4px 0",
                    fontSize: 14.5,
                    fontWeight: 500,
                    color: "#fff",
                  }}
                >
                  <CheckCircle size={17} color={SOFT_WHITE} style={{ flexShrink: 0 }} />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150} style={{ marginTop: 20 }}>
            <div
              style={{
                padding: "16px 20px 18px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.28)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                maxWidth: 440,
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: SOFT_WHITE,
                }}
              >
                24×7 helpline
              </span>
              <a
                href={PHONE_HREF}
                style={{
                  display: "block",
                  margin: "4px 0 0",
                  fontFamily: "'Fraunces', serif",
                  fontSize: isPhone ? 24 : 28,
                  fontWeight: 800,
                  color: "#fff",
                  textDecoration: "none",
                  wordBreak: "break-word",
                }}
              >
                {PHONE_LABEL}
              </a>
              {/* <CallButton /> */}
            </div>
          </Reveal>
        </div>

        {/* Right: timeline */}
        <ol
          style={{
            margin: 0,
            padding: 0,
            display: "grid",
            gap: GAP,
          }}
        >
          {steps.map((s, i) => (
            <Step
              key={s.title}
              {...s}
              index={i}
              total={steps.length}
              reached={reached}
              onReach={onReach}
              size={isPhone ? 42 : 48}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}