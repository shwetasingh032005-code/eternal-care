import React, { useState, useEffect, useRef } from "react";
import { Phone, Menu, X, ArrowRight, CheckCircle2 } from "lucide-react";

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
  { label: "Testimonial", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

const DURATIONS = [
  "1 day",
  "2 days",
  "3 days",
  "4 to 7 days",
  "More than a week",
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

/* ------------------------------------------------------------------ */
/* Booking modal                                                       */
/* ------------------------------------------------------------------ */

function Field({ id, label, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 600,
          fontSize: 14,
          color: C.navy,
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <span
          id={`${id}-error`}
          role="alert"
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: 13,
            color: C.red,
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

function inputStyle(hasError, focused) {
  return {
    width: "100%",
    boxSizing: "border-box",
    height: 48,
    padding: "0 14px",
    borderRadius: 10,
    border: `1.5px solid ${hasError ? C.red : focused ? C.purple : C.border}`,
    boxShadow: focused ? `0 0 0 3px ${hasError ? "rgba(231,0,11,0.12)" : "rgba(107,63,160,0.15)"}` : "none",
    outline: "none",
    background: "#fff",
    color: C.navy,
    fontFamily: "'Instrument Sans', sans-serif",
    fontSize: 16, // 16px stops iOS from zooming on focus
    transition: "border-color .2s ease, box-shadow .2s ease",
  };
}

function TextInput({ id, error, as = "input", inputRef, ...rest }) {
  const [focused, setFocused] = useState(false);
  const Tag = as;
  const base = inputStyle(!!error, focused);
  return (
    <Tag
      id={id}
      ref={inputRef}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={
        as === "textarea"
          ? { ...base, height: "auto", minHeight: 84, padding: "12px 14px", resize: "vertical", lineHeight: 1.5 }
          : base
      }
      {...rest}
    />
  );
}

const EMPTY_FORM = {
  name: "",
  phone: "",
  address: "",
  date: "",
  duration: DURATIONS[0],
  notes: "",
};

function BookingModal({ open, onClose, onSubmit, phoneHref, phoneLabel, isSmall }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | failed
  const firstFieldRef = useRef(null);
  const dialogRef = useRef(null);
  const lastFocusRef = useRef(null);

  // Reset whenever the modal opens; return focus to the trigger on close.
  useEffect(() => {
    if (open) {
      lastFocusRef.current = document.activeElement;
      setForm(EMPTY_FORM);
      setErrors({});
      setStatus("idle");
      const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
    lastFocusRef.current?.focus?.();
    return undefined;
  }, [open]);

  // Keeps Tab inside the dialog while it is open.
  const onKeyDown = (e) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const nodes = dialogRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea',
    );
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 2) er.name = "Enter your full name.";
    const digits = form.phone.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
    if (!/^[6-9]\d{9}$/.test(digits)) er.phone = "Enter a valid 10-digit mobile number.";
    if (form.address.trim().length < 6) er.address = "Enter the full pickup or delivery address.";
    if (!form.date) er.date = "Choose the date you need the box.";
    return er;
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus("sending");
    try {
      if (onSubmit) await onSubmit({ ...form });
      setStatus("done");
    } catch {
      setStatus("failed");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        display: "flex",
        alignItems: isSmall ? "flex-end" : "center",
        justifyContent: "center",
        padding: isSmall ? 0 : 24,
        background: "rgba(26,35,126,0.55)",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        visibility: open ? "visible" : "hidden",
        transition: "opacity .25s ease, visibility .25s ease",
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 520,
          maxHeight: isSmall ? "94vh" : "calc(100vh - 48px)",
          overflowY: "auto",
          background: "#fff",
          borderRadius: isSmall ? "20px 20px 0 0" : 20,
          borderTop: `4px solid ${C.gold}`,
          boxShadow: "0 24px 70px rgba(26,35,126,0.35)",
          padding: isSmall ? "24px 18px 28px" : "32px 32px 32px",
          transform: open ? "none" : isSmall ? "translateY(40px)" : "translateY(14px)",
          transition: "transform .3s ease",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close booking form"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 40,
            height: 40,
            borderRadius: 10,
            border: "none",
            background: C.soft,
            color: C.navy,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={20} />
        </button>

        {status === "done" ? (
          <div style={{ textAlign: "center", padding: "12px 0 4px" }}>
            <CheckCircle2 size={56} color={C.purple} aria-hidden="true" />
            <h2
              id="booking-title"
              style={{
                margin: "16px 0 8px",
                fontFamily: "'Fraunces', serif",
                fontWeight: 800,
                fontSize: 26,
                color: C.navy,
              }}
            >
              Request received
            </h2>
            <p
              style={{
                margin: "0 auto 24px",
                maxWidth: 380,
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 16,
                lineHeight: 1.6,
                color: C.text,
              }}
            >
              Thank you, {form.name.trim().split(" ")[0]}. Our team will call you
              on {form.phone} shortly to confirm the details.
            </p>
            <div style={{ display: "flex", flexDirection: isSmall ? "column" : "row", gap: 12 }}>
              <ActionButton
                as="a"
                href={phoneHref}
                base={{ flex: 1, height: 50, fontSize: 15, color: C.navy, border: `2px solid ${C.navy}`, background: "#fff" }}
                hover={{ background: C.soft }}
              >
                <Phone size={17} aria-hidden="true" /> {phoneLabel}
              </ActionButton>
              <ActionButton
                as="button"
                type="button"
                onClick={onClose}
                base={{ flex: 1, height: 50, fontSize: 15, color: "#fff", background: C.purple, border: `2px solid ${C.purple}` }}
                hover={{ boxShadow: "0 8px 22px rgba(107,63,160,0.32)" }}
              >
                Done
              </ActionButton>
            </div>
          </div>
        ) : (
          <>
            <h2
              id="booking-title"
              style={{
                margin: "0 40px 6px 0",
                fontFamily: "'Fraunces', serif",
                fontWeight: 800,
                fontSize: isSmall ? 24 : 28,
                lineHeight: 1.2,
                color: C.navy,
              }}
            >
              Book a freezer box
            </h2>
            <p
              style={{
                margin: "0 0 22px",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.55,
                color: C.muted,
              }}
            >
              Share a few details and we will call you back. For urgent help,
              call{" "}
              <a href={phoneHref} style={{ color: C.purple, fontWeight: 700, textDecoration: "none" }}>
                {phoneLabel}
              </a>
              .
            </p>

            <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Field id="bk-name" label="Your name" error={errors.name}>
                <TextInput
                  id="bk-name"
                  inputRef={firstFieldRef}
                  value={form.name}
                  onChange={set("name")}
                  error={errors.name}
                  autoComplete="name"
                />
              </Field>

              <Field id="bk-phone" label="Mobile number" error={errors.phone}>
                <TextInput
                  id="bk-phone"
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  error={errors.phone}
                  autoComplete="tel"
                  placeholder="10-digit number"
                />
              </Field>

              <Field id="bk-address" label="Delivery address" error={errors.address}>
                <TextInput
                  id="bk-address"
                  value={form.address}
                  onChange={set("address")}
                  error={errors.address}
                  autoComplete="street-address"
                  placeholder="House or building, area, city"
                />
              </Field>

              <div style={{ display: "grid", gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr", gap: 16 }}>
                <Field id="bk-date" label="Needed from" error={errors.date}>
                  <TextInput
                    id="bk-date"
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={set("date")}
                    error={errors.date}
                  />
                </Field>
                <Field id="bk-duration" label="For how long">
                  <TextInput as="select" id="bk-duration" value={form.duration} onChange={set("duration")}>
                    {DURATIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </TextInput>
                </Field>
              </div>

              <Field id="bk-notes" label="Anything we should know (optional)">
                <TextInput as="textarea" id="bk-notes" rows={3} value={form.notes} onChange={set("notes")} />
              </Field>

              {status === "failed" && (
                <p
                  role="alert"
                  style={{
                    margin: 0,
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "#FEF2F2",
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: 14,
                    color: C.red,
                  }}
                >
                  We could not send your request. Check your connection and try
                  again, or call {phoneLabel}.
                </p>
              )}

              <ActionButton
                as="button"
                type="submit"
                disabled={status === "sending"}
                base={{
                  height: 52,
                  marginTop: 4,
                  fontSize: 16,
                  color: "#fff",
                  background: C.red,
                  border: `2px solid ${C.red}`,
                  opacity: status === "sending" ? 0.7 : 1,
                  cursor: status === "sending" ? "wait" : "pointer",
                }}
                hover={{ boxShadow: "0 8px 22px rgba(231,0,11,0.32)" }}
              >
                {status === "sending" ? "Sending…" : "Send request"}
              </ActionButton>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Props (all optional):
 *  - links: [{ label, id }]  section links (id = the section's id on the page)
 *  - onBook: called when the booking modal opens (e.g. for analytics)
 *  - onSubmit: async (data) => void. Called with
 *      { name, phone, address, date, duration, notes }.
 *      Throw or reject to show the error message in the modal.
 *  - phoneHref / phoneLabel: the call button
 *  - logoSrc: logo image in /public (default /eternalcare.webp)
 */
export default function Navbar({
  links = DEFAULT_LINKS,
  onBook,
  onSubmit,
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
  const [bookingOpen, setBookingOpen] = useState(false);
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

  // Locks page scroll while the mobile menu or booking modal is open,
  // and closes whichever is open with Escape.
  useEffect(() => {
    document.body.style.overflow = open || bookingOpen ? "hidden" : "";
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (bookingOpen) setBookingOpen(false);
      else setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, bookingOpen]);

  const handleBook = () => {
    setMenuOpen(false);
    setBookingOpen(true);
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

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        onSubmit={onSubmit}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        isSmall={isSmall}
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
                {/* <ActionButton
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
                </ActionButton> */}
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
                      padding:"5px",
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
                      padding:"5px",
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