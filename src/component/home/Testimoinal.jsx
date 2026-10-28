import React, { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

/* Testimonials as shown on eternalcare.in.
   Confirm with the client that they have permission to use them. */
const testimonials = [
  {
    quote:
      "During our most difficult hour, EternalCare was a true blessing. They handled every ritual with utmost respect and made the entire process seamless. The pandit they arranged was experienced and compassionate throughout.",
    name: "Rajesh Sharma",
    place: "Chandigarh, Punjab",
    faith: "Sikh",
  },
  {
    quote:
      "We needed to repatriate our father's mortal remains from India to UAE. EternalCare managed all embassy documentation, airline coordination, and the entire logistics flawlessly. Deeply grateful for their professionalism.",
    name: "Mohammed Al-Farouk",
    place: "Dubai, UAE",
    faith: "Muslim",
  },
  {
    quote:
      "The team organized everything for our Ardas ceremony and coordinated with the Gurudwara beautifully. The live streaming service allowed our family in Canada to participate fully. Truly a world-class service.",
    name: "Gurpreet Kaur",
    place: "Chandigarh, Punjab",
    faith: "Sikh",
  },
  {
    quote:
      "My father passed away in London and we needed to bring him back to Kerala. EternalCare handled UK documentation, international transport, and all local arrangements with zero stress on our part. Incredible support.",
    name: "Priya Nair",
    place: "Kerala → London",
    faith: "Christian",
  },
];

const C = {
  navy: "#1A237E",
  purple: "#6B3FA0",
  gold: "#B8913E",
  text: "#4a5565",
  muted: "#667085",
  border: "#E3DDF3",
  soft: "#F4F1FB",
};

const AUTOPLAY_MS = 8000;

// Inline styles cannot use media queries, so we read the screen width instead.
function useScreenWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280,
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

export default function TestimonialsShowcase() {
  const width = useScreenWidth();
  const isDesktop = width >= 1024;
  const isMobile = width < 768;
  const isSmall = width < 480;

  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  const tabRefs = useRef([]);

  const count = testimonials.length;
  const current = testimonials[active];

  const goTo = (index) => {
    const next = (index + count) % count;
    if (next === active) return;
    setVisible(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setActive(next);
      setVisible(true);
    }, 220);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  // Gentle auto-advance. Stops on hover or focus, and for reduced-motion users.
  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const id = setTimeout(() => goTo(active + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused]);

  const onTabKey = (e) => {
    let next = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active - 1;
    if (next === null) return;
    e.preventDefault();
    const idx = (next + count) % count;
    goTo(idx);
    tabRefs.current[idx]?.focus();
  };

  const arrowBtn = {
    width: 46,
    height: 46,
    borderRadius: "50%",
    border: "1.5px solid rgba(255,255,255,0.4)",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{
        background: "#fff",
        padding: isSmall ? "56px 16px" : isMobile ? "64px 24px" : "104px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isDesktop ? "0.85fr 1.15fr" : "1fr",
          columnGap: 56,
          rowGap: isMobile ? 28 : 36,
          alignItems: "start",
        }}
      >
        {/* Heading */}
        <div
          style={{
            gridColumn: isDesktop ? 1 : "auto",
            gridRow: isDesktop ? 1 : "auto",
          }}
        >
          <h2
            id="testimonials-title"
            style={{
              margin: 0,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: isSmall ? 28 : isMobile ? 32 : 42,
              lineHeight: 1.15,
              color: C.navy,
            }}
          >
            Families who trusted us
          </h2>
          <div
            style={{
              width: 56,
              height: 3,
              background: C.gold,
              borderRadius: 2,
              margin: "18px 0 16px",
            }}
          />
          <p
            style={{
              margin: 0,
              maxWidth: 460,
              fontFamily: "'Poppins', sans-serif",
              fontSize: 16,
              lineHeight: 1.8,
              color: C.muted,
            }}
          >
            Words from families across India and abroad, in their most difficult
            hours.
          </p>
        </div>

        {/* Featured quote card */}
        <div
          style={{
            gridColumn: isDesktop ? 2 : "auto",
            gridRow: isDesktop ? "1 / span 2" : "auto",
            position: "relative",
            overflow: "hidden",
            borderRadius: 24,
            background: `linear-gradient(135deg, ${C.navy} 0%, ${C.purple} 100%)`,
            padding: isSmall
              ? "32px 22px 26px"
              : isMobile
                ? "40px 30px 30px"
                : "52px 52px 40px",
            boxShadow: "0 16px 60px rgba(26,35,126,0.22)",
            color: "#fff",
          }}
        >
          <Quote
            aria-hidden="true"
            size={isSmall ? 70 : 110}
            color={C.gold}
            fill={C.gold}
            style={{
              position: "absolute",
              top: isSmall ? -6 : -10,
              right: isSmall ? 6 : 24,
              opacity: 0.22,
            }}
          />

          <div
            role="tabpanel"
            id="testimonial-panel"
            aria-labelledby={`testimonial-tab-${active}`}
            aria-live="off"
            style={{
              position: "relative",
              minHeight: isSmall ? 0 : isMobile ? 0 : 300,
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(10px)",
              transition: "opacity .25s ease, transform .25s ease",
            }}
          >
            <div
              role="img"
              aria-label="5 out of 5 stars"
              style={{ display: "flex", gap: 4, marginBottom: 22 }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={20} color={C.gold} fill={C.gold} />
              ))}
            </div>

            <blockquote
              style={{
                margin: 0,
                fontFamily: "'Poppins', sans-serif",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: isSmall ? 18 : isMobile ? 20 : 25,
                lineHeight: 1.6,
                color: "#fff",
              }}
            >
              “{current.quote}”
            </blockquote>

            <div style={{ marginTop: 28 }}>
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: 19,
                  color: "#fff",
                }}
              >
                {current.name}
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.78)",
                }}
              >
                {current.place} · {current.faith}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div
            style={{
              position: "relative",
              marginTop: 32,
              paddingTop: 22,
              borderTop: "1px solid rgba(255,255,255,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", gap: 8 }} aria-hidden="true">
              {testimonials.map((t, i) => (
                <span
                  key={t.name}
                  style={{
                    height: 6,
                    width: i === active ? 28 : 8,
                    borderRadius: 4,
                    background:
                      i === active ? C.gold : "rgba(255,255,255,0.35)",
                    transition: "width .3s ease, background .3s ease",
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => goTo(active - 1)}
                style={arrowBtn}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => goTo(active + 1)}
                style={arrowBtn}
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Name selector */}
        <div
          role="tablist"
          aria-label="Choose a testimonial"
          aria-orientation={isMobile ? "horizontal" : "vertical"}
          onKeyDown={onTabKey}
          style={{
            gridColumn: isDesktop ? 1 : "auto",
            gridRow: isDesktop ? 2 : "auto",
            display: "grid",
            gridTemplateColumns: isDesktop || isSmall ? "1fr" : "1fr 1fr",
            gap: 12,
          }}
        >
          {testimonials.map((t, i) => {
            const on = i === active;
            return (
              <button
                key={t.name}
                ref={(el) => (tabRefs.current[i] = el)}
                id={`testimonial-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="testimonial-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => goTo(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  padding: "14px 16px",
                  borderRadius: 14,
                  border: `1.5px solid ${on ? C.navy : C.border}`,
                  background: on ? C.soft : "#fff",
                  boxShadow: on ? "0 6px 24px rgba(26,35,126,0.1)" : "none",
                  transition:
                    "background .25s ease, border-color .25s ease, box-shadow .25s ease",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 44,
                    height: 44,
                    flexShrink: 0,
                    borderRadius: "50%",
                    background: on ? C.navy : C.purple,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    transition: "background .25s ease",
                  }}
                >
                  {t.name.charAt(0)}
                </span>
                <span style={{ minWidth: 0 }}>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      color: C.navy,
                      lineHeight: 1.3,
                    }}
                  >
                    {t.name}
                  </span>
                  <span
                    style={{
                      display: "block",
                      marginTop: 2,
                      fontSize: 13,
                      color: C.muted,
                    }}
                  >
                    {t.place} · {t.faith}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
