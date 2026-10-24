import React from 'react'
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

const Hero = () => {
  return (
     <section id="home" className="hero-section">
        <div className="hero-bg">
          <img src="/Elegant Memorial Chamber with Candlelit Florals.png" alt="Funeral services" />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <div style={{ maxWidth: 620 }}>
            <h1
              className="hero-headline anim-up"
              style={{ animationDelay: ".1s" }}
            >
              A Final Goodbye,With <br/> <span className="">Love and Dignity</span>
            </h1>
            <p className="hero-sub anim-up text-2xl" style={{ animationDelay: ".2s" }}>
              Every farewell deserves care, respect, and peace of mind. Eternal Care offers dependable freezer box services to support families during difficult times, ensuring your loved one is treated with the utmost dignity and respect.
            </p>
            <div
              className="hero-btns anim-up"
              style={{ animationDelay: ".3s" }}
            >
              <button
                className="rounded-2xl bg-[#6B3FA0] flex gap-2 items-center cursor-pointer hover:bg-purple-400/15 text-white"
                onClick={() => setShowPopup(true)}
                style={{ fontSize: 15, padding: "14px 28px" }}
              >
                Request a Freezer Box <ArrowRight size={16} />
              </button>
              <a
                href="#contact"
                className="btn-outline-white rounded-full"
                style={{ fontSize: 15, padding: "14px 24px" }}
              >
             Contact Us <ArrowRight size={16} />
              </a>
            </div>
  </div>

  <div className="pt-5 text-white flex items-center gap-2">
    
    {/*icon start-1 */}
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-900 text-blue-700">
      <ShieldCheck size={20} color="white" strokeWidth={2}/>
    </div>

    <div className="text-base">
<h1 className="text-sm">Safe & Hygenic</h1>

    </div>

 {/*icon start-2 */}
     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-900 ">
      <Clock size={20} color="white" strokeWidth={2}/>
    </div>

    <div className="text-base">
<h1 className="text-sm">Timely Support</h1>
    </div>

 {/*icon start-2 */}
     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 bg-blue-900">
      <Heart size={20} color="white" strokeWidth={2}/>
    </div>

    <div className="text-base">
<h1 className="text-sm">Dignity & Respect</h1>
    </div> 
    </div>
  </div>

   {/*icon end */}

       
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            opacity: 0.5,
          }}
        >
          <div
            style={{
              width: 1,
              height: 36,
              background: "linear-gradient(to bottom,transparent,#fff)",
            }}
          />
          <ChevronDown size={18} color="#fff" />
        </div>

      
      </section>
  )
}

export default Hero