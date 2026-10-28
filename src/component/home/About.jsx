import React, { useState, useEffect } from "react";
import { Phone, Heart, ArrowRight, CheckCircle } from "lucide-react";

const C = {
  navy: "#1A237E",
  purple: "#6B3FA0",
  gold: "#B8913E",
  red: "#E7000B",
  text: "#4a5565",
  muted: "#667085",
  border: "#E3DDF3",
  soft: "#F4F1FB",
};

const paragraphs = [
  "At Eternal Care, we are dedicated to making difficult moments a little easier for families by providing dependable funeral support services with sensitivity and respect.",
  "From freezer box rentals to ambulance services and transportation assistance, we help families manage essential arrangements with care and attention. We understand the importance of timely support, clean equipment, and a respectful approach at every step.",
  "Our goal is to provide a service families can rely on when every moment matters. Through responsible service, compassionate assistance, and a commitment to dignity, we strive to make the entire process more manageable for those experiencing loss.",
];

const reasons = [
  "Support Through Every Difficult Moment",
  "A Helping Hand When You Need It Most",
  "Care That Honors Every Life",
  "Respectful Services, Compassionate Support",
];

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

function HoverButton({ as = "button", base, hover, children, ...rest }) {
  const [on, setOn] = useState(false);
  const Tag = as;
  return (
    <Tag
      {...rest}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        minHeight: 50,
        padding: "0 26px",
        borderRadius: 999,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 700,
        fontSize: 15,
        cursor: "pointer",
        textDecoration: "none",
        transition: "transform .2s ease, box-shadow .2s ease, background .2s ease",
        transform: on ? "translateY(-2px)" : "none",
        ...base,
        ...(on ? hover : {}),
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Props (all optional):
 *  - onBook: function called when "Book Freezer Box" is clicked
 *  - phoneHref: tel link used by "Call Now" (default is the number from your old code)
 */
export default function About({ onBook, phoneHref = "tel:+918800680093" }) {
  const width = useScreenWidth();
  const isDesktop = width >= 1024;
  const isMobile = width < 768;
  const isSmall = width < 480;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      style={{
        background: "#fff",
        padding: isSmall ? "56px 16px" : isMobile ? "64px 24px" : "100px 24px",
      }}
    >
      {/* Loads the Lobster Two font used for the paragraphs */}
      {/* <style>{`@import url('https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@0,400;0,700;1,700&display=swap');`}</style> */}

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isDesktop ? "1.1fr 0.9fr" : "1fr",
          gap: isDesktop ? 64 : isMobile ? 32 : 44,
          alignItems: "center",
        }}
      >
        {/* LEFT: story */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: C.soft,
              border: `1px solid ${C.border}`,
              color: C.navy,
              padding: "7px 16px",
              borderRadius: 999,
              fontFamily: "'Poppins', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            <Heart size={14} color={C.purple} /> About Us
          </div>

          <h2
            id="about-title"
            style={{
              margin: "0 0 14px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: isSmall ? 30 : isMobile ? 36 : 46,
              lineHeight: 1.15,
              color: C.navy,
            }}
          >
            Every Farewell Deserves
            <br />
            <span style={{ color: C.purple }}>Dignity and Care</span>
          </h2>

          <div
            style={{
              width: 56,
              height: 3,
              background: C.gold,
              borderRadius: 2,
              marginBottom: 24,
            }}
          />

          {paragraphs.map((p) => (
            <p
              key={p}
              style={{
                margin: "0 0 16px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: isSmall ? 17 : 19,
                lineHeight: 1.3,
                color: C.text,
              }}
            >
              {p}
            </p>
          ))}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 26,
              paddingTop: 22,
              borderTop: `1px solid ${C.border}`,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 48,
                height: 4,
                flexShrink: 0,
                borderRadius: 4,
                background: C.gold,
              }}
            />
            <p
              style={{
                margin: 0,
                fontFamily: "'Poppins', sans-serif",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: isSmall ? 18 : 21,
                lineHeight: 1.5,
                color: C.navy,
              }}
            >
              Eternal Care — Here for you when it matters most.
            </p>
          </div>
        </div>

        {/* RIGHT: why families choose us */}
        <div
          style={{
            background: `linear-gradient(135deg, ${C.navy} 0%, ${C.purple} 100%)`,
            borderRadius: 24,
            padding: isSmall ? "28px 20px" : isMobile ? "34px 28px" : "44px 40px",
            boxShadow: "0 16px 60px rgba(26,35,126,0.22)",
          }}
        >
          <h3
            style={{
              margin: "0 0 22px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: isSmall ? 24 : 30,
              lineHeight: 1.2,
              color: "#fff",
            }}
          >
            Why Families <span style={{ color: C.gold }}>Choose Us</span>
          </h3>

          <ul
            style={{
              listStyle: "none",
              margin: "0 0 30px",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {reasons.map((t) => (
              <li
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 14,
                  padding: isSmall ? "14px 14px" : "16px 18px",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: isSmall ? 15 : 16,
                  lineHeight: 1.45,
                  color: "#fff",
                }}
              >
                <CheckCircle
                  size={22}
                  color={C.gold}
                  style={{ flexShrink: 0 }}
                  aria-hidden="true"
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div
            style={{
              display: "flex",
              flexDirection: isSmall ? "column" : "row",
              gap: 14,
            }}
          >
            <HoverButton
              as="button"
              type="button"
              onClick={onBook}
              base={{
                background: "#fff",
                color: C.navy,
                border: "2px solid #fff",
                flex: isSmall ? "none" : 1,
              }}
              hover={{ boxShadow: "0 10px 26px rgba(0,0,0,0.25)" }}
            >
              Book Freezer Box <ArrowRight size={16} />
            </HoverButton>
            <HoverButton
              as="a"
              href={phoneHref}
              base={{
                background: C.red,
                color: "#fff",
                border: `2px solid ${C.red}`,
                flex: isSmall ? "none" : 1,
              }}
              hover={{ boxShadow: "0 10px 26px rgba(231,0,11,0.4)" }}
            >
              <Phone size={16} /> Call Now
            </HoverButton>
          </div>
        </div>
      </div>
    </section>
  );
}