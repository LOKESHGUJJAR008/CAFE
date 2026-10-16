import React from 'react';
import { MapPin, Phone, Clock, Mail, ExternalLink, Copy, Check, PhoneCall } from 'lucide-react';
import {
  PHONE_DISPLAY, PHONE_RAW,
  CAFE_ADDRESS, CAFE_EMAIL, MAPS_LINK, INSTAGRAM, HOURS,
  GOOGLE_REVIEW_URL
} from '../../config';

const ContactDirectory = ({ isOpen, statusLabel, onCopy, copiedKey }) => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 xl:px-16 bg-foam border-b-2 border-ink">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b-2 border-ink">
          <div>
            <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.3em] text-caramel block mb-1">
              Archival Specimen Directory · Kota Dispatch
            </span>
            <h2 className="font-grotesk font-black text-3xl sm:text-4xl text-ink uppercase tracking-tight">
              Coordinates & Direct Channels
            </h2>
          </div>
          <p className="font-grotesk text-xs text-ink/70 uppercase tracking-wider max-w-sm">
            All direct channels are monitored daily. Click any copy button to duplicate coordinates to your clipboard.
          </p>
        </div>

        {/* Constructivist 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-2 border-ink bg-foam divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink shadow-[6px_6px_0px_#1F1612]">
          
          {/* Card 1: Physical Sanctuary Coordinates */}
          <div className="p-6 flex flex-col justify-between bg-foam hover:bg-almond/20 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-black text-caramel">SPECIMEN // LOC-01</span>
                <span className="font-grotesk text-[9px] font-black uppercase tracking-wider bg-ink text-foam px-2 py-0.5">
                  SANCTUARY
                </span>
              </div>
              <div className="w-10 h-10 border-2 border-ink bg-foam flex items-center justify-center mb-4 shadow-[2px_2px_0px_#1F1612]">
                <MapPin className="w-5 h-5 text-caramel" />
              </div>
              <h3 className="font-grotesk font-black text-lg uppercase tracking-tight text-ink mb-1">
                Café Sanctuary
              </h3>
              <p className="font-grotesk text-xs text-ink/80 leading-relaxed mb-4">
                {CAFE_ADDRESS}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-ink/20">
              <button
                type="button"
                onClick={() => onCopy(CAFE_ADDRESS, 'Address copied to clipboard', 'address')}
                className="w-full py-2 px-3 border border-ink text-ink font-grotesk text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-ink hover:text-foam transition-colors"
              >
                {copiedKey === 'address' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-caramel" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              {MAPS_LINK && (
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 bg-almond border border-ink text-ink font-grotesk text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-latte transition-colors"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Card 2: Operating Hours */}
          <div className="p-6 flex flex-col justify-between bg-foam hover:bg-almond/20 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-black text-caramel">SPECIMEN // HRS-02</span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`} />
                  <span className="font-grotesk text-[9px] font-black uppercase tracking-wider text-ink">
                    {statusLabel}
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 border-2 border-ink bg-foam flex items-center justify-center mb-4 shadow-[2px_2px_0px_#1F1612]">
                <Clock className="w-5 h-5 text-caramel" />
              </div>
              <h3 className="font-grotesk font-black text-lg uppercase tracking-tight text-ink mb-2">
                Service Schedule
              </h3>
              
              <div className="border border-ink/20 bg-ink/5 p-2.5 space-y-1.5 font-grotesk text-[11px] mb-3">
                {HOURS.map(({ days, hours }) => (
                  <div key={days} className="flex justify-between items-center border-b border-ink/10 pb-1 last:border-none last:pb-0">
                    <span className="font-bold uppercase text-ink">{days}</span>
                    <span className="font-mono font-bold text-caramel">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-ink/20">
              <p className="font-grotesk text-[10px] text-ink/60 uppercase tracking-wide italic">
                * Espresso bar dial-in closes 30 mins prior to final shutdown.
              </p>
            </div>
          </div>

          {/* Card 3: Direct Voice Telephone Line */}
          <div className="p-6 flex flex-col justify-between bg-foam hover:bg-almond/20 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-black text-caramel">SPECIMEN // TEL-03</span>
                <span className="font-grotesk text-[9px] font-black uppercase tracking-wider border border-ink px-2 py-0.5">
                  VOICE LINE
                </span>
              </div>
              <div className="w-10 h-10 border-2 border-ink bg-foam flex items-center justify-center mb-4 shadow-[2px_2px_0px_#1F1612]">
                <Phone className="w-5 h-5 text-caramel" />
              </div>
              <h3 className="font-grotesk font-black text-lg uppercase tracking-tight text-ink mb-1">
                Direct Line
              </h3>
              <p className="font-grotesk text-xs text-ink/70 mb-3">
                Immediate desk check, lost belongings, and quick takeaway questions.
              </p>
              <div className="font-grotesk font-black text-base text-ink mb-3 tracking-tight font-mono">
                {PHONE_DISPLAY}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-ink/20">
              <a
                href={`tel:${PHONE_RAW}`}
                className="w-full py-2 px-3 bg-ink text-foam font-grotesk text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-caramel transition-colors"
              >
                <PhoneCall className="w-3 h-3 text-foam" />
                <span>Call Directly</span>
              </a>
              <button
                type="button"
                onClick={() => onCopy(PHONE_RAW, 'Phone number copied to clipboard', 'phone')}
                className="w-full py-2 px-3 border border-ink text-ink font-grotesk text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-almond/50 transition-colors"
              >
                {copiedKey === 'phone' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-caramel" />
                    <span>Copy Phone</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 4: Digital Registry & Social */}
          <div className="p-6 flex flex-col justify-between bg-foam hover:bg-almond/20 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-black text-caramel">SPECIMEN // NET-04</span>
                <span className="font-grotesk text-[9px] font-black uppercase tracking-wider bg-ink text-foam px-2 py-0.5">
                  DIGITAL
                </span>
              </div>
              <div className="w-10 h-10 border-2 border-ink bg-foam flex items-center justify-center mb-4 shadow-[2px_2px_0px_#1F1612]">
                <Mail className="w-5 h-5 text-caramel" />
              </div>
              <h3 className="font-grotesk font-black text-lg uppercase tracking-tight text-ink mb-1">
                Digital Lounge
              </h3>
              <p className="font-grotesk text-xs text-ink/70 mb-3">
                Written inquiries, press, collaborations, and community feedback.
              </p>
              
              <div className="space-y-1.5 font-grotesk text-[11px] mb-3">
                <div className="text-ink font-mono font-bold truncate">
                  {CAFE_EMAIL}
                </div>
                <div>
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noreferrer"
                    className="text-caramel hover:text-ink font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Instagram (@tatvacafe)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-ink/20">
              <button
                type="button"
                onClick={() => onCopy(CAFE_EMAIL, 'Email address copied to clipboard', 'email')}
                className="w-full py-2 px-3 border border-ink text-ink font-grotesk text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-almond/50 transition-colors"
              >
                {copiedKey === 'email' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-caramel" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              {GOOGLE_REVIEW_URL && (
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 bg-almond border border-ink text-ink font-grotesk text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 hover:bg-latte transition-colors"
                >
                  <span>Google Reviews</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactDirectory;
