import React, { useState, useEffect } from "react";
import { Phone, Menu, X, ArrowRight } from "lucide-react";

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

const DEFAULT_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
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

function Logo({ src, height }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 900,
            fontSize: 24,
            color: C.navy,
          }}
        >
          Eternal<span style={{ color: C.purple }}>Care</span>
        </span>
        <span
          style={{
            marginTop: 4,
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 700,
            fontSize: 9,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: C.gold,
          }}
        >
          Freezer Box on Rent
        </span>
      </span>
    );
  }
  return (
    <img
      src={src}
      alt="EternalCare"
      onError={() => setOk(false)}
      style={{ height, width: "auto", objectFit: "contain", display: "block" }}
    />
  );
}

function NavLink({ label, active, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-current={active ? "location" : undefined}
      style={{
        position: "relative",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "8px 2px",
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 600,
        fontSize: 14.5,
        color: active || hover ? C.navy : C.text,
        transition: "color .2s ease",
      }}
    >
      {label}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 2,
          width: active || hover ? "100%" : 0,
          background: C.gold,
          borderRadius: 2,
          transition: "width .3s ease",
        }}
      />
    </button>
  );
}

function ActionButton({ as = "button", base, hover, children, ...rest }) {
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
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 700,
        cursor: "pointer",
        textDecoration: "none",
        borderRadius: 12,
        transition: "transform .2s ease, box-shadow .2s ease, background .2s ease",
        transform: on ? "translateY(-1px)" : "none",
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
 *  - links: [{ label, id }]  section links (id = the section's id on the page)
 *  - onBook: function called by "Book Now"
 *  - phoneHref / phoneLabel: the call button
 *  - logoSrc: logo image in /public (default /eternalcare.webp)
 */
export default function Navbar({
  links = DEFAULT_LINKS,
  onBook,
  phoneHref = "tel:+918800680093",
  phoneLabel = "+91 8800680093",
  logoSrc = "/eternalcare.webp",
}) {
  const width = useScreenWidth();
  const isDesktop = width >= 1024;
  const isSmall = width < 480;
  const barHeight = isDesktop ? 76 : 68;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(links[0]?.id);

  const open = menuOpen && !isDesktop;

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    setMenuOpen(false);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - barHeight + 1;
    window.scrollTo({ top: id === links[0]?.id ? 0 : top, behavior: "smooth" });
  };

  // Shadow once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlights the link of the section that is on screen.
  useEffect(() => {
    const els = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Locks page scroll while the mobile menu is open, and closes it with Escape.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleBook = () => {
    setMenuOpen(false);
    if (onBook) onBook();
  };

  return (
    <>
      {/* Dim page behind the mobile menu */}
      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 998,
          background: "rgba(26,35,126,0.45)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .3s ease",
        }}
      />

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: `1px solid ${C.border}`,
          boxShadow:
            scrolled || open ? "0 6px 28px rgba(26,35,126,0.10)" : "none",
          transition: "box-shadow .3s ease",
        }}
      >
        <nav
          aria-label="Main"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            height: barHeight,
            padding: isSmall ? "0 16px" : "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <button
            type="button"
            onClick={() => scrollToId(links[0]?.id || "home")}
            aria-label="EternalCare, go to top"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <Logo src={logoSrc} height={isSmall ? 40 : isDesktop ? 52 : 46} />
          </button>

          {/* Desktop links */}
          {isDesktop && (
            <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
              {links.map((l) => (
                <NavLink
                  key={l.id}
                  label={l.label}
                  active={activeId === l.id}
                  onClick={() => scrollToId(l.id)}
                />
              ))}
            </div>
          )}

          {/* Right side actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {isDesktop ? (
              <>
                <ActionButton
                  as="a"
                  href={phoneHref}
                  base={{
                    height: 46,
                    padding: "0 18px",
                    fontSize: 14.5,
                    color: C.navy,
                    border: `1.5px solid ${C.border}`,
                    background: "#fff",
                  }}
                  hover={{ background: C.soft, borderColor: C.purple }}
                >
                  <Phone size={16} color={C.purple} aria-hidden="true" />
                  {phoneLabel}
                </ActionButton>
                <ActionButton
                  as="button"
                  type="button"
                  onClick={handleBook}
                  base={{
                    height: 46,
                    padding: "0 24px",
                    fontSize: 14.5,
                    color: "#fff",
                    background: C.red,
                    border: `1.5px solid ${C.red}`,
                  }}
                  hover={{ boxShadow: "0 8px 22px rgba(231,0,11,0.32)" }}
                >
                  Book Now
                </ActionButton>
              </>
            ) : (
              <>
                {/* Quick call button, always visible on phones */}
                <ActionButton
                  as="a"
                  href={phoneHref}
                  aria-label={`Call ${phoneLabel}`}
                  base={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: C.red,
                    color: "#fff",
                  }}
                  hover={{ boxShadow: "0 8px 22px rgba(231,0,11,0.32)" }}
                >
                  <Phone size={19} aria-hidden="true" />
                </ActionButton>
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    border: `1.5px solid ${C.border}`,
                    background: "#fff",
                    color: C.navy,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {open ? <X size={22} /> : <Menu size={22} />}
                </button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile menu: slides open */}
        {!isDesktop && (
          <div
            id="mobile-menu"
            style={{
              display: "grid",
              gridTemplateRows: open ? "1fr" : "0fr",
              transition: "grid-template-rows .3s ease",
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  maxHeight: `calc(100vh - ${barHeight}px)`,
                  overflowY: "auto",
                  padding: isSmall ? "6px 16px 24px" : "6px 24px 28px",
                  borderTop: `1px solid ${C.border}`,
                  visibility: open ? "visible" : "hidden",
                }}
              >
                {links.map((l) => {
                  const on = activeId === l.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => scrollToId(l.id)}
                      aria-current={on ? "location" : undefined}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        borderBottom: `1px solid ${C.soft}`,
                        padding: "16px 4px",
                        minHeight: 56,
                        cursor: "pointer",
                        fontFamily: "'Fraunces', serif",
                        fontWeight: 700,
                        fontSize: 20,
                        color: on ? C.purple : C.navy,
                      }}
                    >
                      {l.label}
                      <ArrowRight
                        size={18}
                        color={on ? C.gold : C.border}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}

                <div
                  style={{
                    display: "flex",
                    flexDirection: isSmall ? "column" : "row",
                    gap: 12,
                    marginTop: 22,
                  }}
                >
                  <ActionButton
                    as="a"
                    href={phoneHref}
                    base={{
                      flex: 1,
                      height: 52,
                      fontSize: 15,
                      color: C.navy,
                      border: `2px solid ${C.navy}`,
                      background: "#fff",
                    }}
                    hover={{ background: C.soft }}
                  >
                    <Phone size={17} aria-hidden="true" /> {phoneLabel}
                  </ActionButton>
                  <ActionButton
                    as="button"
                    type="button"
                    onClick={handleBook}
                    base={{
                      flex: 1,
                      height: 52,
                      fontSize: 15,
                      color: "#fff",
                      background: C.red,
                      border: `2px solid ${C.red}`,
                    }}
                    hover={{ boxShadow: "0 8px 22px rgba(231,0,11,0.32)" }}
                  >
                    Book Now
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}