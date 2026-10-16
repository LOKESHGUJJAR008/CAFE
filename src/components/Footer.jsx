import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUp, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Calendar, 
  Check, 
  Copy,
  Volume2, 
  VolumeX, 
  Radio, 
  Compass, 
  ChevronDown,
  ChevronUp,
  Disc
} from 'lucide-react';
import { siteData } from '../data/site';
import { footerData } from '../data/footer';
import { GOOGLE_REVIEW_URL, GOOGLE_MAPS_URL } from '../config';
import Logo from './Logo';
import FooterExtractionTerminal from './FooterExtractionTerminal';
import { 
  playHoverBlip, 
  playSelectSound, 
  playRewardChime, 
  startSanctuaryAmbience, 
  stopSanctuaryAmbience,
  setMuted
} from '../lib/soundFx';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const NAV_LINKS = [
  { to: '/',        label: 'Home',          code: '01' },
  { to: '/menu',    label: 'Artisan Menu',  code: '02' },
  { to: '/about',   label: 'Our Story',     code: '03' },
  { to: '/gallery', label: 'Prime Archive', code: '04' },
  { to: '/reserve', label: 'Reserve Table', code: '05' },
  { to: '/contact', label: 'Contact & Lab', code: '06' },
];

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  
  // Tactical Game HUD states
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [audioMuted, setAudioMuted] = useState(false);
  const [ambiencePlaying, setAmbiencePlaying] = useState(false);

  // Live real-time clock and status for Kota (IST)
  useEffect(() => {
    const updateClockAndStatus = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-GB', { 
          timeZone: 'Asia/Kolkata', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        });
        setCurrentTime(timeStr);

        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const istDate = new Date(utc + (3600000 * 5.5));
        const hours = istDate.getHours();
        setIsOpenNow(hours >= 10 && hours < 23);
      } catch {
        setCurrentTime('22:45:10');
        setIsOpenNow(true);
      }
    };
    updateClockAndStatus();
    const interval = setInterval(updateClockAndStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      playRewardChime();
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  const toggleSoundFX = () => {
    const nextMuted = !audioMuted;
    setAudioMuted(nextMuted);
    setMuted(nextMuted);
    if (nextMuted && ambiencePlaying) {
      stopSanctuaryAmbience();
      setAmbiencePlaying(false);
    } else if (!nextMuted) {
      playSelectSound();
    }
  };

  const toggleAmbience = () => {
    if (audioMuted) {
      setAudioMuted(false);
      setMuted(false);
    }
    if (ambiencePlaying) {
      stopSanctuaryAmbience();
      setAmbiencePlaying(false);
    } else {
      const started = startSanctuaryAmbience(0.06);
      if (started) {
        setAmbiencePlaying(true);
      }
    }
  };

  const copyCoordinates = () => {
    navigator.clipboard.writeText("25.1388° N, 75.8362° E");
    playSelectSound();
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  const copyAddressText = () => {
    navigator.clipboard.writeText(footerData.contact.address);
    playSelectSound();
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const scrollToTop = () => {
    playSelectSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#120E0C] text-[#FAF7F2] border-t-2 border-[#FAF7F2]/15 relative selection:bg-[#FAF7F2] selection:text-[#14100E] overflow-hidden">
      
      {/* ── Background Giant Brutalist Watermark ── */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.025] font-cormorant font-black text-[18vw] leading-none whitespace-nowrap text-[#FAF7F2] tracking-tighter z-0"
        aria-hidden="true"
      >
        TATVA SANCTUARY
      </div>

      {/* ── Top Running Archival Ticker & Game HUD Header (Edge-to-Edge) ── */}
      <div className="w-full border-b border-[#FAF7F2]/15 bg-[#090706] py-2.5 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-x-auto scrollbar-none relative z-10">
        <div className="w-full flex items-center justify-between gap-6 whitespace-nowrap text-[10px] sm:text-xs font-grotesk font-black uppercase tracking-[0.22em] text-[#FAF7F2]/70">
          
          {/* Identity & Sanctuary Name */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#C9A27E] shadow-[0_0_8px_#C9A27E]" />
            <span className="text-[#FAF7F2] font-black">TATVA ARTISAN COFFEE HOUSE</span>
          </div>

          <span className="text-[#FAF7F2]/20">/</span>

          {/* Live Telemetry Radar Coordinates */}
          <button 
            onClick={copyCoordinates}
            onMouseEnter={playHoverBlip}
            className="flex items-center gap-1.5 hover:text-[#C9A27E] transition-colors cursor-pointer group"
            title="Click to copy GPS coordinates"
          >
            <Compass className="w-3.5 h-3.5 text-[#C9A27E] group-hover:rotate-45 transition-transform" />
            <span>LAT: 25.1388° N • LON: 75.8362° E</span>
            <span className="font-mono text-[9px] text-[#C9A27E] bg-[#1C1613] px-1 py-0.2 border border-[#C9A27E]/30">
              {copiedCoords ? 'COPIED!' : 'ALT 271M'}
            </span>
          </button>

          <span className="text-[#FAF7F2]/20">/</span>

          {/* Live Digital Clock (Kota IST) */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#C9A27E] bg-[#17120F] px-2.5 py-0.5 border border-[#FAF7F2]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>KOTA IST: {currentTime || '22:48:30'}</span>
          </div>

          <span className="text-[#FAF7F2]/20">/</span>

          {/* Real-time Open Status */}
          <div className="flex items-center gap-2">
            {isOpenNow ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981] animate-pulse" />
                <span className="text-emerald-400">SANCTUARY OPEN • UNTIL 11:00 PM</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#F59E0B]" />
                <span className="text-amber-400">SANCTUARY DORMANT • REOPENS 10:00 AM</span>
              </>
            )}
          </div>

          <span className="text-[#FAF7F2]/20">/</span>

          {/* Audio Engine / Sound FX & Ambience Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAmbience}
              onMouseEnter={playHoverBlip}
              className={`flex items-center gap-1.5 px-2.5 py-1 border text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                ambiencePlaying 
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                  : 'border-[#FAF7F2]/20 hover:border-[#C9A27E] text-[#FAF7F2]/70'
              }`}
              title="Toggle calming rain & coffee steam soundscape"
            >
              <Disc className={`w-3 h-3 ${ambiencePlaying ? 'animate-spin text-emerald-400' : ''}`} />
              <span>{ambiencePlaying ? 'AMBIENCE: ACTIVE' : 'CAFE LO-FI AUDIO'}</span>
              {ambiencePlaying && (
                <span className="flex gap-0.5 items-end h-2.5">
                  <span className="w-0.5 bg-emerald-400 animate-pulse h-2" />
                  <span className="w-0.5 bg-emerald-400 animate-pulse h-1" />
                  <span className="w-0.5 bg-emerald-400 animate-pulse h-2.5" />
                </span>
              )}
            </button>

            <button
              onClick={toggleSoundFX}
              onMouseEnter={playHoverBlip}
              className="p-1 border border-[#FAF7F2]/20 hover:border-[#C9A27E] text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors cursor-pointer"
              title={audioMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            >
              {audioMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#C9A27E]" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Main Container ── */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-10 sm:pt-14 pb-12 relative z-10">
        
        {/* ── UNIQUE GAME HUD MODULE: TATVA EXTRACTION TERMINAL // PROTOCOL MK-IV ── */}
        <div className="mb-10">
          <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]/15 mb-4">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-[#C9A27E] text-[#14100E] uppercase tracking-widest">
                GAME HUD MODULE
              </span>
              <h3 className="font-grotesk text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-[#FAF7F2] flex items-center gap-2">
                <span>EXTRACTION CONSOLE & BARISTA CODEX</span>
                <span className="text-[#C9A27E] text-xs font-mono">// MK-IV</span>
              </h3>
            </div>

            <button
              onClick={() => { setTerminalOpen(!terminalOpen); playSelectSound(); }}
              onMouseEnter={playHoverBlip}
              className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#FAF7F2]/60 hover:text-[#C9A27E] uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>{terminalOpen ? '[COLLAPSE TERMINAL]' : '[EXPAND TERMINAL]'}</span>
              {terminalOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Render the Game Terminal */}
          {terminalOpen && (
            <FooterExtractionTerminal />
          )}
        </div>

        {/* ── Core Footer Content Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#FAF7F2]/15">
          
          {/* ── Col 1: Brand Identity & Tactical Archive Newsletter (4 cols) ── */}
          <div className="lg:col-span-4 flex flex-col justify-between pr-0 lg:pr-6">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Logo size="md" theme="dark" />
              </div>

              <p className="font-cormorant italic text-[#C9A27E] text-xl sm:text-2xl leading-snug max-w-sm mb-4">
                "{footerData.tagline}"
              </p>

              <p className="font-grotesk text-xs uppercase tracking-wider text-[#FAF7F2]/60 leading-relaxed max-w-sm mb-7">
                A serene brutalist sanctuary devoted to slow extraction, single-origin peaberry coffees, and intentional conversation in Talwandi.
              </p>

              {/* Tactical Newsletter Signup */}
              <div className="mb-6 max-w-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-grotesk text-[10px] font-black uppercase tracking-[0.25em] text-[#FAF7F2]/90 flex items-center gap-1.5">
                    <Radio className="w-3 h-3 text-[#C9A27E] animate-pulse" />
                    <span>SUBSCRIBE TO ARCHIVE TRANSMISSIONS</span>
                  </span>
                </div>
                <form onSubmit={handleSubscribe} className="flex items-stretch border-2 border-[#FAF7F2]/30 focus-within:border-[#C9A27E] transition-colors relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER COFFEE LOVER EMAIL..."
                    required
                    className="w-full bg-[#1A1412] px-3.5 py-2.5 font-grotesk text-xs uppercase tracking-wider text-[#FAF7F2] placeholder-[#FAF7F2]/30 outline-none"
                  />
                  <button
                    type="submit"
                    onMouseEnter={playHoverBlip}
                    className="px-4 bg-[#FAF7F2] text-[#14100E] hover:bg-[#C9A27E] hover:text-[#14100E] font-grotesk font-black text-xs uppercase tracking-widest transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    {subscribed ? <Check className="w-4 h-4 text-emerald-800" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
                {subscribed && (
                  <span className="block text-[10px] font-grotesk text-emerald-400 mt-2 uppercase tracking-wider animate-fadeIn">
                    ✓ FREQUENCY LINKED. WELCOME TO THE TATVA CIRCLE.
                  </span>
                )}
              </div>
            </div>

            {/* Social & Google Reviews Badge */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {siteData.socials.instagram && (
                <a
                  href={siteData.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverBlip}
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#FAF7F2]/20 hover:border-[#FAF7F2] hover:bg-[#FAF7F2]/10 text-xs font-grotesk uppercase tracking-wider text-[#FAF7F2]/80 transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#C9A27E]" />
                  <span>@tatvacafe</span>
                </a>
              )}
              {GOOGLE_REVIEW_URL && (
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverBlip}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#FAF7F2]/20 hover:border-[#C9A27E] hover:bg-[#C9A27E]/10 text-xs font-grotesk uppercase tracking-wider text-[#C9A27E] transition-colors"
                >
                  <Star className="w-3.5 h-3.5 fill-[#C9A27E]" />
                  <span>4.9 / 5 on Google (420+ Reviews)</span>
                </a>
              )}
            </div>
          </div>

          {/* ── Col 2: Navigation Links (2 cols) ── */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-[#C9A27E]" />
              <h3 className="font-grotesk text-[10px] font-black tracking-[0.28em] uppercase text-[#C9A27E]">
                DIRECTORY // INDEX
              </h3>
            </div>
            <ul className="flex flex-col space-y-3.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onMouseEnter={playHoverBlip}
                    className="group inline-flex items-center gap-2.5 font-grotesk text-xs uppercase tracking-[0.16em] text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors"
                  >
                    <span className="font-mono text-[9px] text-[#FAF7F2]/30 group-hover:text-[#C9A27E] transition-colors">
                      [{link.code}]
                    </span>
                    <span className="group-hover:translate-x-1.5 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Sanctuary Waypoint & Coordinates (3 cols) ── */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-[#C9A27E]" />
              <h3 className="font-grotesk text-[10px] font-black tracking-[0.28em] uppercase text-[#C9A27E]">
                SANCTUARY WAYPOINT
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-[#17120F] border border-[#FAF7F2]/10 relative group">
                <span className="block font-grotesk text-[11px] font-black uppercase tracking-[0.2em] text-[#FAF7F2] mb-1">
                  TALWANDI, KOTA
                </span>
                <p className="font-grotesk text-xs uppercase tracking-wider text-[#FAF7F2]/70 leading-relaxed mb-2">
                  {footerData.contact.address}
                </p>
                
                <div className="flex items-center gap-2 pt-1 border-t border-[#FAF7F2]/10">
                  <button
                    onClick={copyAddressText}
                    onMouseEnter={playHoverBlip}
                    className="inline-flex items-center gap-1 text-[9px] font-mono uppercase text-[#C9A27E] hover:text-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    <Copy className="w-2.5 h-2.5" />
                    <span>{copiedAddress ? 'ADDRESS COPIED!' : 'COPY ADDRESS'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-1 text-xs font-grotesk uppercase tracking-wider">
                <a
                  href={`tel:${siteData.phoneRaw}`}
                  onMouseEnter={playHoverBlip}
                  className="flex items-center gap-2 text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A27E]" />
                  <span>{footerData.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${footerData.contact.email}`}
                  onMouseEnter={playHoverBlip}
                  className="flex items-center gap-2 text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C9A27E]" />
                  <span>{footerData.contact.email}</span>
                </a>
              </div>

              {GOOGLE_MAPS_URL && (
                <div className="pt-2">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHoverBlip}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-[#FAF7F2]/10 hover:bg-[#FAF7F2] hover:text-[#14100E] text-[10px] font-grotesk font-black uppercase tracking-[0.2em] border border-[#FAF7F2]/20 transition-all group"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#C9A27E] group-hover:text-[#14100E]" />
                    <span>LAUNCH GPS DIRECTIONS</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* ── Col 4: Timetable & Priority Reservation (3 cols) ── */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 bg-[#C9A27E]" />
                <h3 className="font-grotesk text-[10px] font-black tracking-[0.28em] uppercase text-[#C9A27E]">
                  OPERATING TIMETABLE
                </h3>
              </div>

              <div className="space-y-3 mb-6">
                {footerData.hours.map((h, idx) => (
                  <div key={idx} className="flex items-center justify-between pb-2 border-b border-[#FAF7F2]/10 text-xs font-grotesk uppercase">
                    <span className="font-black text-[#FAF7F2]/80 tracking-wider">
                      {h.days}
                    </span>
                    <span className="text-[#FAF7F2]/60 tracking-widest font-mono text-[11px]">
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Table Booking Card */}
            <div className="p-4 bg-[#1C1613] border border-[#FAF7F2]/20 relative">
              <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#C9A27E]" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#C9A27E]" />

              <span className="block font-grotesk text-[9px] font-bold uppercase tracking-[0.22em] text-[#C9A27E] mb-1">
                INTENTIONAL SEATING // PRIORITY
              </span>
              <span className="block font-grotesk font-black text-xs uppercase tracking-tight text-[#FAF7F2] mb-3">
                PRIVATE BREW BAR & CORNERS
              </span>
              <Link
                to="/reserve"
                onMouseEnter={playHoverBlip}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FAF7F2] text-[#14100E] hover:bg-[#C9A27E] font-grotesk font-black text-[10px] uppercase tracking-[0.2em] transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>BOOK A TABLE NOW →</span>
              </Link>
            </div>
          </div>

        </div>

        {/* ── Bottom Strip: Legal, Architecture Note, Back to Top ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-grotesk uppercase tracking-[0.18em] text-[#FAF7F2]/40">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A27E]" />
            <span>{footerData.copyright}</span>
          </div>

          <div className="hidden md:block text-center font-mono text-[9px] text-[#FAF7F2]/30">
            <span>DISCIPLINED EXTRACTION // RAW BASALT STONE // ARABICA TRADITION</span>
          </div>

          <div className="flex items-center gap-6">
            <span>KOTA · RAJASTHAN</span>
            <button
              onClick={scrollToTop}
              onMouseEnter={playHoverBlip}
              className="inline-flex items-center gap-1.5 text-[#FAF7F2]/70 hover:text-[#C9A27E] transition-colors cursor-pointer border-b border-transparent hover:border-[#C9A27E] pb-0.5 font-mono text-[10px]"
            >
              <span>RETURN TO SUMMIT [TOP ↑]</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
