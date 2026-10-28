import React, { useState, useEffect } from "react";
import {
  Snowflake,
  PawPrint,
  Headset,
  Truck,
  Ambulance,
  Flame,
  FileText,
  Phone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

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

// Put your freezer box photo at public/freezer-box.jpg (about 800 x 600 px).
const FREEZER_IMAGE = "/freezer-box.jpg";

/* Main service. The wording of the first sentence is from eternalcare.in. */
const featured = {
  Icon: Snowflake,
  title: "Freezer Box on Rent",
  desc: "Clean and well-maintained freezer box arrangements to preserve mortal remains with dignity and care for extended family gatherings. Our team delivers and sets up the box, so your family can focus on what matters.",
  features: [
    "Hygienic, well-maintained equipment",
    "Professional delivery and setup",
    "Available 24×7",
    "Transparent pricing, no hidden charges",
  ],
};

/* Descriptions are based on the wording used on eternalcare.in. */
const services = [
  {
    Icon: Truck,
    title: "Dead Body Transportation",
    desc: "Safe and respectful transportation of mortal remains by road, air or intercity coordination, with complete documentation support. Includes Shav Vahan and Antim Yatra Vahan services.",
  },
  {
    Icon: Ambulance,
    title: "Ambulance Services",
    desc: "Ambulance transport available 24×7 for emergency and non-emergency patient transfers, with trained paramedic staff.",
  },
  {
    Icon: Flame,
    title: "Funeral Arrangements",
    desc: "Cremation ground booking, wood or electric cremation arrangements, ritual coordination and on-ground assistance, managed from start to finish.",
  },
  {
    Icon: FileText,
    title: "Documentation Support",
    desc: "Death certificate, NOC and all required formalities handled professionally, so the family is not left to manage paperwork alone.",
  },
  {
    Icon: Headset,
    title: "24/7 Emergency Support",
    desc: "Call our 24×7 helpline at any hour. A care coordinator is assigned to your family straight away.",
  },
  {
    Icon: PawPrint,
    title: "Cat & Dog Funeral Services",
    desc: "Compassionate and respectful pet cremation for families who wish to honour the memory of a beloved companion.",
  },
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
        borderRadius: 12,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 700,
        fontSize: 15,
        cursor: "pointer",
        textDecoration: "none",
        transition: "transform .2s ease, box-shadow .2s ease",
        transform: on ? "translateY(-2px)" : "none",
        ...base,
        ...(on ? hover : {}),
      }}
    >
      {children}
    </Tag>
  );
}

function FeaturedImage() {
  const [ok, setOk] = useState(true);
  const alt = "Clean freezer box used to preserve mortal remains";
  const fill = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  };
  if (!ok) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{
          ...fill,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Snowflake size={56} color="#B8913E" aria-hidden="true" />
      </div>
    );
  }
  return (
    <img
      src="https://i.pinimg.com/736x/7e/b8/72/7eb872fd97890f87bb994f05dae0008c.jpg"
      alt={alt}
      loading="lazy"
      onError={() => setOk(false)}
      style={{ ...fill, objectFit: "cover", display: "block" }}
    />
  );
}

function ServiceCard({ item, onBook, compact }) {
  const [hover, setHover] = useState(false);
  const I = item.Icon;
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        border: `1.5px solid ${hover ? C.purple : C.border}`,
        borderRadius: 18,
        padding: compact ? "24px 20px" : "30px 28px",
        boxShadow: hover
          ? "0 16px 48px rgba(26,35,126,0.14)"
          : "0 4px 24px rgba(26,35,126,0.06)",
        transform: hover ? "translateY(-4px)" : "none",
        transition:
          "transform .3s ease, box-shadow .3s ease, border-color .3s ease",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: hover ? C.navy : C.soft,
          color: hover ? "#fff" : C.purple,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background .3s ease, color .3s ease",
        }}
      >
        <I size={24} />
      </span>
      <h3
        style={{
          margin: "20px 0 10px",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: 21,
          lineHeight: 1.3,
          color: C.navy,
        }}
      >
        {item.title}
      </h3>
      <p
        style={{
          margin: "0 0 20px",
          flex: 1,
          fontFamily: "'Poppins', sans-serif",
          fontSize: 15,
          lineHeight: 1.75,
          color: C.muted,
        }}
      >
        {item.desc}
      </p>
      <button
        type="button"
        onClick={() => onBook && onBook(item.title)}
        style={{
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: 14,
          color: hover ? C.navy : C.purple,
          transition: "color .2s ease",
        }}
      >
        Book this service <ArrowRight size={15} aria-hidden="true" />
      </button>
    </article>
  );
}

/**
 * Props (all optional):
 *  - onBook(serviceTitle): called by every "Book" button
 *  - phoneHref: tel link for "Call Now" (default is the EternalCare helpline)
 */
export default function Services({ onBook, phoneHref = "tel:+918800680093" }) {
  const width = useScreenWidth();
  const isDesktop = width >= 1024;
  const isTablet = width >= 640;
  const isMobile = width < 768;
  const isSmall = width < 480;

  const F = featured;
  const FI = F.Icon;

  // Uses your onBook function if you pass one. Otherwise scrolls to the contact section.
  const handleBook = (title) => {
    if (onBook) {
      onBook(title);
      return;
    }
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      style={{
        background: C.soft,
        padding: isSmall ? "56px 16px" : isMobile ? "64px 24px" : "100px 24px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Heading */}
        <div
          style={{
            maxWidth: 640,
            margin: `0 auto ${isMobile ? 36 : 52}px`,
            textAlign: "center",
          }}
        >
          <h2
            id="services-title"
            style={{
              margin: 0,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: isSmall ? 28 : isMobile ? 32 : 44,
              lineHeight: 1.15,
              color: C.navy,
            }}
          >
            Support for every step, in one call
          </h2>
          <div
            style={{
              width: 56,
              height: 3,
              background: C.gold,
              borderRadius: 2,
              margin: "18px auto 0",
            }}
          />
          <p
            style={{
              margin: "14px 0 0",
              fontFamily: "'Poppins', sans-serif",
              fontSize: 16,
              lineHeight: 1.75,
              color: C.muted,
            }}
          >
            Dignified, respectful services for families, available 24×7.
          </p>
        </div>

        {/* Featured: freezer box */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "1.2fr 0.8fr" : "1fr",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 16px 60px rgba(26,35,126,0.18)",
            marginBottom: isMobile ? 20 : 28,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${C.navy} 0%, ${C.purple} 100%)`,
              padding: isSmall ? "30px 20px" : isMobile ? "36px 28px" : "52px 48px",
              color: "#fff",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FI size={28} color="#fff" />
            </span>
            <h3
              style={{
                margin: "22px 0 12px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                fontSize: isSmall ? 26 : isMobile ? 30 : 36,
                lineHeight: 1.2,
                color: "#fff",
              }}
            >
              {F.title}
            </h3>
            <p
              style={{
                margin: "0 0 24px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: isSmall ? 15 : 16,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.88)",
              }}
            >
              {F.desc}
            </p>

            <ul
              style={{
                listStyle: "none",
                margin: "0 0 30px",
                padding: 0,
                display: "grid",
                gridTemplateColumns: isTablet ? "1fr 1fr" : "1fr",
                gap: 12,
              }}
            >
              {F.features.map((t) => (
                <li
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "#fff",
                  }}
                >
                  <CheckCircle
                    size={19}
                    color={C.gold}
                    aria-hidden="true"
                    style={{ flexShrink: 0, marginTop: 1 }}
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
                onClick={() => handleBook(F.title)}
                base={{ background: "#fff", color: C.navy, border: "2px solid #fff" }}
                hover={{ boxShadow: "0 10px 26px rgba(0,0,0,0.25)" }}
              >
                Book Freezer Box <ArrowRight size={16} />
              </HoverButton>
              <HoverButton
                as="a"
                href={phoneHref}
                base={{ background: C.red, color: "#fff", border: `2px solid ${C.red}` }}
                hover={{ boxShadow: "0 10px 26px rgba(231,0,11,0.4)" }}
              >
                <Phone size={16} /> Call Now
              </HoverButton>
            </div>
          </div>

          {/* Image */}
          <div
            style={{
              position: "relative",
              minHeight: isDesktop ? 420 : isSmall ? 220 : 300,
              background: `linear-gradient(135deg, #F4F1FB 0%, #E3DDF3 100%)`,
            }}
          >
            <FeaturedImage />
          </div>
        </div>

        {/* Other services */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isDesktop
              ? "repeat(3, 1fr)"
              : isTablet
                ? "repeat(2, 1fr)"
                : "1fr",
            gap: isMobile ? 16 : 24,
          }}
        >
          {services.map((s) => (
            <ServiceCard key={s.title} item={s} onBook={handleBook} compact={isSmall} />
          ))}
        </div>
      </div>
    </section>
  );
}