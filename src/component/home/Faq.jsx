import React from 'react'
import {
  Phone,
 
  ChevronDown,

} from "lucide-react";

const Faq = () => {
  return (
    <section id='faq'
        style={{ padding: "clamp(60px,8vw,90px) 24px", background: "#f7faff" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>
              ❓ FAQs
            </div>
            <h2
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "clamp(26px,3.5vw,44px)",
                fontWeight: 900,
                color: "#1a1a2e",
              }}
            >
              Frequently Asked{" "}
              <span style={{ color: "#1565c0" }}>Questions</span>
            </h2>
          </div>
          <div className="faq-grid">
            {faqs.map((f, i) => (
              <div key={i} className="faq-card">
                <button
                  className="faq-q-btn"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="faq-q-text">{f.q}</span>
                  <ChevronDown
                    size={19}
                    color="#1565c0"
                    style={{
                      flexShrink: 0,
                      transform: openFaq === i ? "rotate(180deg)" : "none",
                      transition: "transform .3s",
                    }}
                  />
                </button>
                {openFaq === i && <div className="faq-answer">{f.a}</div>}
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 52,
              textAlign: "center",
              background: "#fff",
              padding: "clamp(24px,5vw,44px)",
              borderRadius: 24,
              border: "1.5px solid #e0e7ff",
              boxShadow: "0 4px 24px rgba(26,58,92,0.07)",
            }}
          >
            <h3
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: 24,
                fontWeight: 800,
                color: "#1a1a2e",
                marginBottom: 8,
              }}
            >
              Still Have Questions?
            </h3>
            <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 24 }}>
              We're available 24/7 — call us or send a message anytime
            </p>
            <div
              style={{
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="tel:+919999741394"
                className="btn-red"
                style={{ textDecoration: "none", animation: "none" }}
              >
                <Phone size={16} /> Call Now
              </a>
              <button
                className="btn-outline-blue"
                onClick={() => scrollTo("contact")}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Faq