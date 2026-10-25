import React, { useState, useEffect } from "react";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronDown,
  Snowflake,
  CheckCircle,
  Users,
 HeartHandshake,
  Eye ,
  Star,
  Shield,
  Heart,
  ArrowRight,
  Zap,
  ShieldCheck,
} from "lucide-react";
import Footer from "../component/Footer.jsx";
import Contact from "../component/home/Contact.jsx";
import WhyChooseUs from "../component/home/WhyChooseUs.jsx";
import Process from "../component/home/Process.jsx";
import About from "../component/home/About.jsx";
import Hero from '../component/home/Hero.jsx'
import TestimonialsShowcase from "../component/home/Testimoinal.jsx";
import Services from "../component/home/Service.jsx";
import Navbar from "../component/home/Navbar.jsx";


// ✅ Google Ads conversion tracking helper
const trackLeadConversion = () => {
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-18495362028/gOwWCMi-6pIdEOyno_NE",
    });
  }
};
function PopupForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);


  // ✅ Popup form submit - conversion fire hota hai
  const submit = (e) => {
    e.preventDefault();
    trackLeadConversion();
    setSent(true);
    setTimeout(onClose, 2400);
  };

  const inp = {
    width: "100%",
    padding: "8px 11px",
    border: "1.5px solid #e0e7f0",
    borderRadius: 8,
    fontSize: 13,
    fontFamily: "inherit",
    color: "#1a1a2e",
    background: "#fafbff",
    outline: "none",
    boxSizing: "border-box",
  };
  const lbl = {
    display: "block",
    fontSize: 10,
    fontWeight: 700,
    color: "#666",
    marginBottom: 4,
    letterSpacing: "0.6px",
    textTransform: "uppercase",
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(26,58,92,0.65)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "12px" : "16px",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          width: "100%",
          maxWidth: isMobile ? "100%" : 440,
          maxHeight: "90vh",
          overflowY: "auto",
          overflowX: "hidden",
          boxShadow: "0 32px 80px rgba(26,58,92,0.25)",
          margin: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg,#1a3a5c,#1565c0)",
            padding: isMobile ? "12px 16px 12px" : "16px 18px 14px",
            position: "relative",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "rgba(255,255,255,0.18)",
              border: "none",
              color: "#fff",
              width: 28,
              height: 28,
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: isMobile ? 8 : 10,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: 8,
                padding: "6px",
                display: "flex",
                flexShrink: 0,
              }}
            >
              <Snowflake size={16} color="#fff" />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "'Fraunces',serif",
                  fontSize: isMobile ? 15 : 17,
                  fontWeight: 700,
                  color: "#fff",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Book a Freezer Box
              </h2>
              <p
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.72)",
                  margin: "2px 0 0",
                }}
              >
                30–60 min delivery · Greater Noida
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {["✅ 24/7", "❄️ Medical Grade", "⚡ Fast"].map((t) => (
              <span
                key={t}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 10,
                  padding: "2px 8px",
                  borderRadius: 20,
                  fontWeight: 600,
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div
          style={{ padding: isMobile ? "14px 16px 24px" : "18px 20px 24px" }}
        >
          {sent ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ fontSize: 44, marginBottom: 10 }}>✅</div>
              <h3
                style={{
                  fontFamily: "'Fraunces',serif",
                  fontSize: 18,
                  color: "#1a3a5c",
                  marginBottom: 6,
                }}
              >
                Request Received!
              </h3>
              <p style={{ color: "#666", fontSize: 13 }}>
                Our team will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: "0 12px",
                }}
              >
                <div style={{ marginBottom: 9 }}>
                  <label style={lbl}>Full Name *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    style={inp}
                  />
                </div>
                <div style={{ marginBottom: 9 }}>
                  <label style={lbl}>Phone *</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+91 XXXXX XXXXX"
                    style={inp}
                  />
                </div>
              </div>
              <div style={{ marginBottom: 9 }}>
                <label style={lbl}>Area / Sector</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  placeholder="Sector, Greater Noida"
                  style={inp}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={lbl}>Message</label>
                <textarea
                  rows={isMobile ? 2 : 3}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Any special requirements..."
                  style={{ ...inp, resize: "none" }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg,#c0392b,#e74c3c)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "11px",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                📲 Submit Request
              </button>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 11,
                  color: "#aaa",
                  marginTop: 10,
                }}
              >
                Or call:{" "}
                <a
                  href="tel:+919999741394"
                  style={{ color: "#1565c0", fontWeight: 700 }}
                >
                  +91 9999741394
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LastCare() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeService, setActiveService] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    message: "",
  });

  useEffect(() => {
    const t = setTimeout(() => setShowPopup(true), 3500);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // ✅ Contact form submit - conversion fire hota hai
  const handleContact = (e) => {
    e.preventDefault();
    trackLeadConversion();
    alert("Thank you! We will contact you shortly.");
    setContactForm({
      name: "",
      phone: "",
      email: "",
      location: "",
      message: "",
    });
  };

  const services = [
    {
      icon: "❄️",
      title: "Freezer Box on Rent",
      desc: "Medical-grade dead body freezer boxes maintaining 0°C to –5°C. Quick delivery and professional setup anywhere in Greater Noida within 30–60 minutes of booking.",
      features: [
        "0°C to –5°C controlled temperature",
        "Hygienic & certified equipment",
        "24 to 72 hrs body preservation",
      ],
    },
    {
      icon: "🐾",
      title: "Cat & Dog Funeral Services",
      desc: "Dignified and respectful funeral services for cats and dogs. We provide compassionate support for pet cremation, transportation, and final farewell arrangements.",
      features: [
        "Cat & dog cremation support",
        "Pet body transportation",
        "Respectful & hygienic handling",
      ],
    },
    {
      icon: "🚨",
      title: "24/7 Emergency Support",
      desc: "Round-the-clock emergency response team ready to assist you. We understand urgency — our team is always just one call away, every hour of every day.",
      features: [
        "Immediate phone response",
        "Night & public holiday service",
        "Dedicated support personnel",
      ],
    },
    {
      icon: "🚐",
      title: "Dead Body Transportation",
      desc: "Safe and dignified dead body transportation within Greater Noida and to other cities. All vehicles are properly equipped and staff are professionally trained.",
      features: [
        "Intercity transport available",
        "Proper refrigerated vehicles",
        "Trained & respectful staff",
      ],
    },
    {
      icon: "🚑",
      title: "Ambulance Services",
      desc: "Fully equipped ambulances for hospital-to-home transfer, home pickup, and emergency situations — handled with the utmost level of care and professionalism.",
      features: [
        "Hospital to home transfer",
        "Emergency response capability",
        "All areas of Greater Noida covered",
      ],
    },
    {
      icon: "🕉️",
      title: "Funeral Arrangements",
      desc: "Complete funeral and cremation coordination — from pandit arrangements and cremation ground booking to full ceremony management for your loved ones.",
      features: [
        "Pandit & priest coordination",
        "Cremation ground booking",
        "Full ceremony management",
      ],
    },
    {
      icon: "📋",
      title: "Documentation Support",
      desc: "End-to-end assistance with death certificates, legal formalities, and all required paperwork so your family can focus on what truly matters.",
      features: [
        "Death certificate processing",
        "Legal documentation help",
        "Step-by-step guidance",
      ],
    },
  ];

  const faqs = [
    {
      q: "What is a dead body freezer box and why is it needed?",
      a: "A dead body freezer box preserves the body at a controlled low temperature, preventing decomposition. It is needed when the last rites are delayed due to family travel, legal formalities, or religious reasons.",
    },
    {
      q: "Do you provide freezer box services on rent in Greater Noida?",
      a: "Yes, we provide dead body freezer box rental services across all sectors of Greater Noida 24/7, with quick delivery and professional handling by our trained team.",
    },
    {
      q: "How fast can the freezer box be delivered after booking?",
      a: "We understand the urgency in such situations. Our team can deliver and install the freezer box within 30–60 minutes anywhere in Greater Noida after confirmation.",
    },
    {
      q: "What temperature does the freezer box maintain?",
      a: "Our freezer boxes maintain a temperature between 0°C to –5°C, ensuring safe and hygienic preservation of the body for extended hours or days.",
    },
    {
      q: "How long can the body be preserved in the freezer box?",
      a: "Depending on environmental conditions, the body can be preserved for 24 to 72 hours, allowing families sufficient time to complete all necessary arrangements.",
    },
    {
      q: "What are the rental charges?",
      a: "Our charges are affordable and fully transparent — based on duration and location with no hidden fees. Please contact us for exact pricing details.",
    },
  ];

  const navLinks = ["Home", "About", "Services", "Contact"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,700&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Instrument Sans', sans-serif; background: #fff; color: #1a1a2e; overflow-x: hidden; }

        :root {
          --blue:   #1a3a5c;
          --blue2:  #1565c0;
          --ice:    #e8f4fd;
          --ice2:   #bbdefb;
          --red:    #c0392b;
          --red2:   #e74c3c;
          --text:   #1a1a2e;
          --muted:  #6b7280;
          --border: #e5e7eb;
          --shadow: 0 4px 24px rgba(26,58,92,0.10);
          --shadow-lg: 0 16px 60px rgba(26,58,92,0.15);
        }

        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:scale(1)} }
        @keyframes floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(192,57,43,0.4)} 60%{box-shadow:0 0 0 12px rgba(192,57,43,0)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .anim-fade { animation: fadeIn .7s ease both; }
        .anim-up   { animation: slideUp .8s ease both; }

        /* ── POPUP ── */
        .popup-overlay { position:fixed;inset:0;z-index:9999;background:rgba(26,58,92,0.6);backdrop-filter:blur(6px);display:flex;align-items:flex-end;justify-content:center;padding:0;animation:fadeIn .3s ease; }
        @media(min-width:600px){ .popup-overlay { align-items:center;padding:16px; } }
        .popup-box { background:#fff;border-radius:20px 20px 0 0;width:100%;max-width:100%;max-height:92vh;overflow-y:auto;overflow-x:hidden;animation:slideUp .35s ease;box-shadow:0 -8px 40px rgba(26,58,92,0.22); }
        @media(min-width:600px){ .popup-box { border-radius:20px;max-width:460px;animation:scaleIn .4s ease;box-shadow:0 40px 100px rgba(26,58,92,0.25); } }
        .popup-header { background:linear-gradient(135deg,#1a3a5c 0%,#1565c0 100%);padding:18px 18px 16px;position:relative; }
        .popup-close { position:absolute;top:12px;right:12px;background:rgba(255,255,255,0.18);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center; }
        .popup-icon-wrap { background:rgba(255,255,255,0.2);border-radius:10px;padding:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
        .popup-title { font-family:'Fraunces',serif;font-size:17px;font-weight:700;color:#fff;margin:0; }
        .popup-sub   { font-size:12px;color:rgba(255,255,255,0.75);margin:2px 0 0;font-weight:500; }
        .popup-badge { background:rgba(255,255,255,0.15);color:rgba(255,255,255,0.9);font-size:10px;padding:3px 9px;border-radius:20px;font-weight:600;border:1px solid rgba(255,255,255,0.2); }
        .popup-body  { padding:18px 18px 28px; }

        /* ── FIELDS ── */
        .field-wrap  { margin-bottom:14px; }
        .field-label { display:block;font-size:11px;font-weight:700;color:#555;margin-bottom:6px;letter-spacing:0.7px;text-transform:uppercase; }
        .field-input { width:100%;padding:11px 14px;border:1.5px solid #e0e7f0;border-radius:10px;font-size:14px;font-family:inherit;color:var(--text);background:#fafbff;outline:none;transition:border-color .2s,box-shadow .2s; }
        .field-input:focus { border-color:var(--blue2);box-shadow:0 0 0 3px rgba(21,101,192,0.10); }

        /* ── BUTTONS ── */
        .btn-red { background:linear-gradient(135deg,var(--red),var(--red2));color:#fff;border:none;border-radius:12px;padding:14px 32px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;letter-spacing:0.2px;transition:transform .2s,box-shadow .2s;animation:pulse 2.5s ease-in-out infinite;display:inline-flex;align-items:center;gap:8px; }
        .btn-red:hover { transform:translateY(-2px);box-shadow:0 10px 28px rgba(192,57,43,0.38); }
        .btn-blue { background:linear-gradient(135deg,var(--blue),var(--blue2));color:#fff;border:none;border-radius:12px;padding:14px 32px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:transform .2s,box-shadow .2s;display:inline-flex;align-items:center;gap:8px; }
        .btn-blue:hover { transform:translateY(-2px);box-shadow:0 10px 28px rgba(26,58,92,0.30); }
        .btn-outline-blue { background:transparent;border:2px solid var(--blue);color:var(--blue);border-radius:12px;padding:13px 28px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;display:inline-flex;align-items:center;gap:8px;text-decoration:none; }
        .btn-outline-blue:hover { background:var(--blue);color:#fff; }
        .btn-outline-white { background:transparent;border:2px solid rgba(255,255,255,0.55);color:#fff;border-radius:12px;padding:14px 28px;font-weight:600;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;display:inline-flex;align-items:center;gap:8px;text-decoration:none; }
        .btn-outline-white:hover { background:rgba(255,255,255,0.12);border-color:#fff; }

        /* ── NAVBAR — ALWAYS WHITE ── */
        .navbar { position:fixed;top:0;width:100%;z-index:1000;transition:all .3s;padding:0 24px;height:72px;display:flex;align-items:center;background:rgba(255,255,255,0.97);backdrop-filter:blur(16px);box-shadow:0 2px 24px rgba(26,58,92,0.09);border-bottom:1px solid #edf2f7; }
        .navbar.scrolled { box-shadow:0 4px 32px rgba(26,58,92,0.13); }
        .navbar-inner { max-width:1280px;margin:0 auto;width:100%;display:flex;align-items:center;justify-content:space-between; }
        .nav-link { background:none;border:none;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;padding:6px 0;position:relative;color:#444;transition:color .2s;letter-spacing:0.2px; }
        .nav-link::after { content:'';position:absolute;bottom:-2px;left:0;width:0;height:2px;background:var(--blue2);border-radius:2px;transition:width .3s; }
        .nav-link:hover { color:var(--blue2) !important; }
        .nav-link:hover::after { width:100%; }
        .nav-phone { display:flex;align-items:center;gap:8px;color:var(--blue);text-decoration:none;font-weight:700;font-size:14px;padding:8px 16px;border:1.5px solid rgba(26,58,92,0.25);border-radius:10px;transition:all .2s; }
        .nav-phone:hover { background:var(--ice);border-color:var(--blue); }

        /* ── SECTION LABEL ── */
        .section-label { display:inline-flex; align-items:center;gap:8px;background:var(--ice);border:1px solid var(--ice2);color:var(--blue);padding:6px 16px;border-radius:30px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:18px; }

        /* ── HERO ── */
        .hero-section { min-height:100vh;position:relative;display:flex;align-items:center;overflow:hidden; }
        .hero-bg { position:absolute;inset:0; }
        .hero-bg img { width:100%;height:100%;object-fit:cover;object-position:center; }
        .hero-overlay { position:absolute;inset:0;background:linear-gradient(70deg,rgba(10,30,60,0.90) 0%,rgba(10,30,60,0.75) 50%,rgba(10,30,60,0.45) 60%); }
        .hero-content { position:relative;z-index:2;max-width:1280px;margin:0 auto;padding:clamp(100px,12vw,140px) 24px 60px;width:100%; }
        .hero-headline { font-family:'Fraunces',serif;font-size:clamp(20px,4vw,54px);font-weight:900;line-height:1.1;color:#fff;margin-bottom:18px;white-space:nowrap; }
        .hero-headline span { color:#1A237F;font-style:italic; }
        .hero-sub { font-size:clamp(14px,1.6vw,17px);color:rgba(255,255,255,0.78);line-height:1.75;max-width:500px;margin-bottom:36px; }
        .hero-btns { display:flex;gap:14px;flex-wrap:wrap;margin-bottom:44px; }
        .hero-trust { display:flex;gap:20px;flex-wrap:wrap;padding-top:24px;border-top:1px solid rgba(255,255,255,0.15); }
        .trust-item { display:flex;align-items:center;gap:8px;color:rgba(255,255,255,0.72);font-size:13px;font-weight:600; }


        /* ── ABOUT ── */
        .about-grid { display:grid;grid-template-columns:1fr ;gap:72px;align-items:center; }
        .about-imgs { position:relative; }
        .about-img-main { width:100%;height:460px;object-fit:cover;border-radius:24px;display:block;box-shadow:var(--shadow-lg); }
        .about-badge { position:absolute;bottom:-24px;left:24px;background:var(--blue);color:#fff;border-radius:18px;padding:18px 24px;box-shadow:var(--shadow-lg); }
        .about-badge-num { font-family:'Fraunces',serif;font-size:38px;font-weight:900;line-height:1; }
        .about-badge-lbl { font-size:12px;color:rgba(255,255,255,0.7);font-weight:600;margin-top:4px; }
        .about-img-sm { position:absolute;top:24px;right:-24px;width:140px;height:140px;object-fit:cover;border-radius:16px;border:4px solid #fff;box-shadow:var(--shadow-lg);display:block; }
        .about-title { font-family:'Fraunces',serif;font-size:clamp(26px,3.5vw,48px);font-weight:900;line-height:1.12;color:var(--text);margin-bottom:20px; }
        .check-list { display:flex;flex-direction:column;gap:12px;margin-bottom:32px; }
        .check-item { display:flex;align-items:center;gap:12px;font-size:15px;color:#374151;font-weight:500;margin-top:12px }

        /* ── SERVICES ── */
        .services-wrap { display:flex;gap:32px;align-items:flex-start; }
        .service-tabs { display:flex;flex-direction:column;gap:8px;width:260px;flex-shrink:0; }
        .s-tab { cursor:pointer;padding:14px 18px;border-radius:12px;border:1.5px solid var(--border);background:#fff;font-family:inherit;text-align:left;width:100%;transition:all .25s;display:flex;align-items:center;gap:12px; }
        .s-tab.active { background:var(--ice);border-color:var(--blue2); }
        .s-tab:hover  { background:var(--ice);border-color:rgba(21,101,192,0.3); }
        .s-tab-icon   { font-size:22px;flex-shrink:0; }
        .s-tab-title  { font-size:14px;font-weight:700;color:var(--text);line-height:1.3; }
        .s-tab.active .s-tab-title { color:var(--blue2); }
        .service-detail { flex:1;background:#fff;border:1.5px solid var(--border);border-radius:24px;padding:44px 48px;min-height:320px;box-shadow:var(--shadow); }
        .service-detail-icon  { font-size:52px;margin-bottom:20px; }
        .service-detail-title { font-family:'Fraunces',serif;font-size:clamp(22px,2.5vw,34px);font-weight:800;color:var(--text);margin-bottom:14px; }
        .service-detail-desc  { font-size:16px;color:var(--muted);line-height:1.8;margin-bottom:24px; }
        .service-chips { display:flex;flex-wrap:wrap;gap:10px;margin-bottom:32px; }
        .chip { background:var(--ice);border:1px solid var(--ice2);color:var(--blue);padding:7px 16px;border-radius:30px;font-size:13px;font-weight:600; }
        /* mobile service grid */
        .service-grid-mobile { display:none; }

        /* ── WHY US ── */
        .why-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px; }
        .why-card { background:#fff;border:1.5px solid var(--border);border-radius:18px;padding:28px 20px;text-align:center;transition:all .3s; }
        .why-card:hover { border-color:var(--blue2);transform:translateY(-5px);box-shadow:var(--shadow); }
        .why-icon  { font-size:36px;margin-bottom:14px; }
        .why-title { font-weight:700;color:var(--text);font-size:15px;margin-bottom:6px; }
        .why-desc  { color:var(--muted);font-size:13px; }

        /* ── CONTACT ── */
        .contact-grid { display:grid;grid-template-columns:1fr 1.1fr;gap:48px;align-items:start; }
        .contact-info-card  { background:var(--blue);border-radius:24px;overflow:hidden;box-shadow:var(--shadow-lg); }
        .contact-info-img   { width:100%;height:240px;object-fit:cover;display:block; }
        .contact-info-body  { padding:28px 28px 32px; }
        .contact-info-title { font-family:'Fraunces',serif;font-size:22px;font-weight:800;color:#fff;margin-bottom:20px; }
        .contact-row      { display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.1);text-decoration:none; }
        .contact-row:last-child { border-bottom:none; }
        .contact-row-icon { width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0; }
        .contact-row-main { color:#fff;font-weight:600;font-size:14px;word-break:break-all; }
        .contact-row-sub  { color:rgba(255,255,255,0.5);font-size:12px;margin-top:2px; }
        .contact-form-card  { background:#fff;border:1.5px solid var(--border);border-radius:24px;padding:40px 40px 44px;box-shadow:var(--shadow); }
        .contact-form-title { font-family:'Fraunces',serif;font-size:26px;font-weight:800;color:var(--text);margin-bottom:28px; }
        .form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }

        

        /* ── FAQ ── */
        .faq-grid { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
        .faq-card { background:#fff;border:1.5px solid var(--border);border-radius:16px;overflow:hidden; }
        .faq-q-btn { width:100%;background:none;border:none;cursor:pointer;font-family:inherit;display:flex;align-items:flex-start;justify-content:space-between;padding:20px 22px;gap:14px;text-align:left; }
        .faq-q-btn:hover { background:var(--ice); }
        .faq-q-text  { font-size:15px;font-weight:700;color:var(--text);flex:1;line-height:1.5; }
        .faq-answer  { padding:14px 22px 18px;font-size:14px;color:var(--muted);line-height:1.75;border-top:1px solid var(--border); }

        /* ── MAP ── */
        .map-frame { border-radius:20px;overflow:hidden;box-shadow:var(--shadow-lg);border:3px solid #fff; }

        /* ── FOOTER ── */
        .footer-wrap { background:var(--blue);color:#fff;padding:64px 24px 28px; }
        .footer-grid { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1.6fr 1fr 1fr;gap:48px;margin-bottom:48px; }
        .footer-brand-desc { color:rgba(255,255,255,0.6);font-size:14px;line-height:1.75;max-width:340px;margin-top:16px; }
        .footer-heading { font-weight:800;font-size:15px;margin-bottom:18px;color:#fff; }
        .footer-link { background:none;border:none;color:rgba(255,255,255,0.6);font-family:inherit;font-size:14px;cursor:pointer;padding:0;margin-bottom:10px;display:block;transition:color .2s;text-align:left; }
        .footer-link:hover { color:#fff; }
        .footer-contact-row { display:flex;gap:10px;align-items:flex-start;margin-bottom:14px; }
        .footer-contact-txt { color:rgba(255,255,255,0.65);font-size:14px;text-decoration:none; }
        .footer-contact-txt:hover { color:#fff; }
        .footer-divider { max-width:1280px;margin:0 auto;border-top:1px solid rgba(255,255,255,0.12);padding-top:24px;text-align:center;color:rgba(255,255,255,0.38);font-size:13px; }

        /* ══════════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ══════════════════════════════════════ */

        /* Tablet landscape — 1024px */
        @media(max-width:1024px){
          .about-grid    { grid-template-columns:1fr;gap:48px; }
          .about-img-sm  { display:none; }
          .about-badge   { bottom:16px;left:16px; }
          .services-wrap { flex-direction:column; }
          .service-tabs  { width:100%;flex-direction:row;overflow-x:auto;padding-bottom:4px;scrollbar-width:none; }
          .service-tabs::-webkit-scrollbar { display:none; }
          .s-tab         { min-width:150px;flex-shrink:0; }
          .contact-grid  { grid-template-columns:1fr; }
          .footer-grid   { grid-template-columns:1fr 1fr; }
          .hero-headline { white-space:normal; }
        }

        /* Tablet portrait — 768px */
        @media(max-width:768px){
          .nav-desktop    { display:none !important; }
          .nav-mobile-btn { display:flex !important; }
          .stats-inner    { grid-template-columns:1fr 1fr; }
          .stat-cell      { border-right:none;border-bottom:1px solid rgba(255,255,255,0.12); }
          .stat-cell:nth-child(odd)  { border-right:1px solid rgba(255,255,255,0.12); }
          .stat-cell:last-child,
          .stat-cell:nth-last-child(2):nth-child(odd) { border-bottom:none; }
          .faq-grid       { grid-template-columns:1fr; }
          .form-row       { grid-template-columns:1fr; }
          .footer-grid    { grid-template-columns:1fr;gap:32px; }
          .about-grid     { gap:32px; }
          .service-tabs  { display:grid;grid-template-columns:repeat(3,1fr);flex-direction:unset;overflow-x:unset;gap:8px;width:100%;padding-bottom:0; }
          .s-tab         { min-width:unset;width:100%;flex-direction:column;align-items:center;text-align:center;padding:14px 8px;gap:6px; }
          .s-tab-icon    { font-size:26px; }
          .s-tab-title   { font-size:12px; }
          .s-tab .arrow-hide { display:none; }
          .service-detail { padding:28px 20px; }
          .contact-form-card { padding:28px 24px; }
          .hero-btns      { flex-direction:column;align-items:flex-start; }
          .hero-trust     { gap:14px; }
          .hero-headline  { white-space:normal;font-size:clamp(22px,6vw,42px); }
          .hero-sub       { font-size:15px; }
          .about-img-main { height:320px; }
          .contact-info-img { height:200px; }
          .why-grid       { grid-template-columns:repeat(2,1fr); }
        }

        /* Mobile — 480px */
        @media(max-width:480px){
          .hero-content   { padding:88px 16px 48px; }
          .hero-headline  { font-size:clamp(20px,7vw,34px); }
          .hero-btns      { gap:10px; }
          .btn-red, .btn-blue, .btn-outline-white { padding:12px 22px;font-size:14px; }
          .stats-inner    { grid-template-columns:1fr 1fr; }
          .stat-cell      { padding:22px 12px; }
          .marquee-item   { padding:0 20px;font-size:12px; }
          .service-tabs   { grid-template-columns:repeat(2,1fr);gap:6px; }
          .s-tab          { min-width:unset;padding:12px 8px; }
          .s-tab-title    { font-size:11px; }
          .service-detail { padding:20px 16px; }
          .service-detail-icon { font-size:36px; }
          .why-grid       { grid-template-columns:1fr 1fr; }
          .why-card       { padding:20px 14px; }
          .faq-q-btn      { padding:16px 16px; }
          .faq-q-text     { font-size:14px; }
          .contact-form-card { padding:22px 18px; }
          .footer-wrap    { padding:44px 16px 24px; }
          .footer-grid    { gap:28px; }

          .trust-item     { font-size:12px; }
          .hero-trust     { gap:10px; }
          .section-label  { font-size:11px;padding:5px 12px; }
        }

        /* Small mobile — 360px */
        @media(max-width:360px){
          .hero-headline  { font-size:20px; }
          .why-grid       { grid-template-columns:1fr; }
          .s-tab          { min-width:120px; }
        }
      `}</style>

      {/* {showPopup && <PopupForm onClose={() => setShowPopup(false)} />} */}

      {/* ══ NAVBAR ══ */}
    <Navbar/>

      {/* ══ HERO ══ */}
    <Hero/>
  

      {/* ══ ABOUT ══ */}
<About/>

      {/* ══ SERVICES ══ */}
     \<Services/>

        {/* ══ Process ══ */}
        <Process/>

      {/* ══ WHY US ══ */}
  <WhyChooseUs/>

      {/* ══ CONTACT ══ */}
    <Contact/>

     {/* ══ Testimonial ══ */}
     <TestimonialsShowcase/>

    

     

      {/* ══ FOOTER ══ */}
     <Footer/>
    </>
  );
}