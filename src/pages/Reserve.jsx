import React, { useState, useId, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CalendarDays, Clock, Users, MessageCircle, CheckCircle, Minus, Plus, StickyNote, ShieldCheck, MapPin, Volume2 } from 'lucide-react';
import { WHATSAPP_NUMBER, OPENING_HOURS, CAFE_NAME } from '../config';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

/* ─── Helpers ───────────────────────────────────────────────────────────── */
function getTodayLocal() {
  return new Date().toISOString().split('T')[0];
}

function buildTimeSlots(dayIndex) {
  const hours = OPENING_HOURS[dayIndex];
  if (!hours) return [];
  const [openH, openM] = hours.open.split(':').map(Number);
  const [closeH, closeM] = hours.close.split(':').map(Number);
  const closeMinutes = closeH * 60 + closeM;
  const slots = [];
  let cur = openH * 60 + openM;
  while (cur + 30 <= closeMinutes) {
    const h = Math.floor(cur / 60);
    const m = cur % 60;
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    slots.push(`${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`);
    cur += 30;
  }
  return slots;
}

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Please enter your name.';
  if (!/^\d{10}$/.test(fields.phone.replace(/\s/g, '')))
    errors.phone = 'Enter a valid 10-digit phone number.';
  if (!fields.date) {
    errors.date = 'Please select a date.';
  } else if (fields.date < getTodayLocal()) {
    errors.date = 'Date cannot be in the past.';
  }
  if (!fields.time) errors.time = 'Please select a time slot.';
  return errors;
}

/* ─── Component ─────────────────────────────────────────────────────────── */
const ReservePage = () => {
  useDocumentMeta({
    title: `Book a Table & Sanctuary Reservation | ${CAFE_NAME}`,
    description: `Reserve a quiet table or study nook at TATVA Café in Talwandi, Kota via instant WhatsApp confirmation. Select your preferred date, time slot, and party size.`,
  });

  const prefersReducedMotion = useReducedMotion();
  const id = useId();

  const [fields, setFields] = useState({
    name: '', phone: '', date: '', time: '', guests: 2, note: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [todayDay] = useState(() => new Date().getDay());
  const dayIndex = fields.date ? new Date(fields.date + 'T12:00:00').getDay() : todayDay;
  const timeSlots = useMemo(() => buildTimeSlots(dayIndex), [dayIndex]);

  const set = (key, val) => {
    setFields(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => { const n = { ...e }; delete n[key]; return n; });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      const first = Object.keys(errs)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }

    const note = fields.note.trim() ? `\nNote: ${fields.note.trim()}` : '';
    const msg = `Hi TATVA Café, I'd like to book a table.\n\nName: ${fields.name}\nPhone: ${fields.phone}\nDate: ${fields.date}\nTime: ${fields.time}\nGuests: ${fields.guests}${note}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const inputCls = (key) =>
    `w-full px-4 py-3 border-2 bg-[#FAF7F2] text-[#14100E] text-xs sm:text-sm font-grotesk
     focus:outline-none focus:border-[#14100E] focus:ring-0
     transition-all placeholder:text-[#14100E]/40
     ${errors[key] ? 'border-red-600 bg-red-50/20' : 'border-[#14100E] hover:bg-white'}`;

  const labelCls = 'block text-[10px] font-black uppercase tracking-[0.2em] text-[#14100E] mb-1.5 font-grotesk';

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#14100E] overflow-x-hidden selection:bg-[#14100E] selection:text-[#FAF7F2]">
      
      {/* ── Top Running Archival Ticker (Flush with Navbar, Zero Dead Space) ── */}
      <div className="w-full border-b-2 border-[#14100E] bg-[#FAF7F2] py-2.5 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-x-auto scrollbar-none">
        <div className="w-full flex items-center justify-between gap-6 whitespace-nowrap text-[10px] sm:text-xs font-grotesk font-black uppercase tracking-[0.28em] text-[#14100E]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#14100E]" />
            <span>TATVA RESERVATION REGISTRY // PROTOCOL NO. 07</span>
          </div>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>LOCATION: TALWANDI, KOTA</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>TABLES HELD FOR 15 MINUTES</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>INSTANT WHATSAPP DISPATCH</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>ACCEPTING BOOKINGS</span>
          </div>
        </div>
      </div>

      {/* ── Masthead ── */}
      <header className="py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 border-b-2 border-[#14100E] bg-[#FAF7F2]">
        <div className="w-full max-w-6xl">
          <div className="inline-block bg-[#FAF7F2] border-2 border-[#14100E] px-3 py-1 shadow-[3px_3px_0px_#14100E] mb-4">
            <span className="font-grotesk text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]">
              TABLE RESERVATION DOSSIER
            </span>
          </div>
          <h1 className="font-grotesk font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.92] text-[#14100E] mb-3">
            Book Your Seat.<br />
            <span className="font-cormorant italic font-semibold text-[#A8612E] lowercase text-4xl sm:text-6xl">
              in our quiet sanctuary.
            </span>
          </h1>
          <p className="font-grotesk text-xs sm:text-sm uppercase tracking-wider text-[#14100E]/70 max-w-xl">
            Whether preparing for high-stakes exams, holding unhurried conversations, or catching up over artisan brews — we hold your spot.
          </p>
        </div>
      </header>

      {/* ── Main Reservation Form Spread ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF7F2]">
        <div className="w-full border-2 border-[#14100E] bg-[#FAF7F2] shadow-[0_20px_50px_rgba(20,16,14,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#14100E]">
            
            {/* ══════════════════════════════════════════════════════════════
                LEFT FORM (7 COLS): The Constructivist Booking Form
                ══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 bg-[#FAF7F2]">
              
              {submitted ? (
                <div className="p-8 border-2 border-[#14100E] bg-[#FAF7F2] text-center shadow-[4px_4px_0px_#14100E]">
                  <div className="w-12 h-12 bg-[#14100E] text-[#C9A012] flex items-center justify-center mx-auto mb-4 border border-[#C9A012]">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-grotesk font-black text-2xl uppercase tracking-tight text-[#14100E] mb-2">
                    WhatsApp Dispatch Sent!
                  </h3>
                  <p className="font-grotesk text-xs sm:text-sm text-[#14100E]/80 mb-6">
                    Your table request has been forwarded to our barista counter via WhatsApp. You will receive a direct confirmation in minutes.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFields({ name: '', phone: '', date: '', time: '', guests: 2, note: '' });
                    }}
                    className="border-2 border-[#14100E] bg-[#14100E] text-[#FAF7F2] px-6 py-2.5 font-grotesk font-black text-xs uppercase tracking-[0.2em] shadow-[3px_3px_0px_#A8612E]"
                  >
                    Book Another Table
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor={`${id}-name`} className={labelCls}>
                        Full Name *
                      </label>
                      <input
                        id={`${id}-name`}
                        type="text"
                        value={fields.name}
                        onChange={(e) => set('name', e.target.value)}
                        placeholder="e.g. Aryan Sharma"
                        className={inputCls('name')}
                        autoComplete="name"
                      />
                      {errors.name && <p className="mt-1 text-[11px] text-red-600 font-bold font-grotesk">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor={`${id}-phone`} className={labelCls}>
                        Phone Number *
                      </label>
                      <input
                        id={`${id}-phone`}
                        type="tel"
                        value={fields.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        placeholder="10-digit mobile number"
                        className={inputCls('phone')}
                        autoComplete="tel"
                      />
                      {errors.phone && <p className="mt-1 text-[11px] text-red-600 font-bold font-grotesk">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Date & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor={`${id}-date`} className={labelCls}>
                        Date *
                      </label>
                      <input
                        id={`${id}-date`}
                        type="date"
                        min={getTodayLocal()}
                        value={fields.date}
                        onChange={(e) => set('date', e.target.value)}
                        className={inputCls('date')}
                      />
                      {errors.date && <p className="mt-1 text-[11px] text-red-600 font-bold font-grotesk">{errors.date}</p>}
                    </div>

                    <div>
                      <label className={labelCls}>
                        Party Size
                      </label>
                      <div className="flex items-center border-2 border-[#14100E] bg-[#FAF7F2] h-[46px]">
                        <button
                          type="button"
                          onClick={() => set('guests', Math.max(1, fields.guests - 1))}
                          className="w-12 h-full flex items-center justify-center border-r-2 border-[#14100E] hover:bg-[#14100E]/10 transition-colors"
                          aria-label="Decrease guests"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="flex-1 text-center font-grotesk font-black text-sm text-[#14100E]">
                          {fields.guests} {fields.guests === 1 ? 'Guest' : 'Guests'}
                        </span>
                        <button
                          type="button"
                          onClick={() => set('guests', Math.min(10, fields.guests + 1))}
                          className="w-12 h-full flex items-center justify-center border-l-2 border-[#14100E] hover:bg-[#14100E]/10 transition-colors"
                          aria-label="Increase guests"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className={labelCls}>
                      Preferred Time Slot *
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-2 border-2 border-[#14100E] bg-white scrollbar-thin">
                      {timeSlots.map((slot) => {
                        const isSelected = fields.time === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => set('time', slot)}
                            className={`py-2 px-1 text-center text-[11px] font-grotesk font-bold uppercase tracking-wider border transition-all ${
                              isSelected
                                ? 'bg-[#14100E] text-[#FAF7F2] border-[#14100E] shadow-[2px_2px_0px_#A8612E]'
                                : 'bg-[#FAF7F2] text-[#14100E] border-[#14100E]/20 hover:border-[#14100E]'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                    {errors.time && <p className="mt-1 text-[11px] text-red-600 font-bold font-grotesk">{errors.time}</p>}
                  </div>

                  {/* Special Note */}
                  <div>
                    <label htmlFor={`${id}-note`} className={labelCls}>
                      Special Preferences or Study Requirements (Optional)
                    </label>
                    <textarea
                      id={`${id}-note`}
                      rows={2}
                      value={fields.note}
                      onChange={(e) => set('note', e.target.value)}
                      placeholder="e.g. Window seat, study table with power socket, quiet corner..."
                      className={inputCls('note')}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#14100E] hover:bg-[#A8612E] text-[#FAF7F2] font-grotesk font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-3 shadow-[4px_4px_0px_#A8612E] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#A8612E] transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-[#C9A012]" />
                    <span>Confirm & Dispatch on WhatsApp</span>
                  </button>

                  <p className="text-[10px] text-center font-grotesk uppercase tracking-wider text-[#14100E]/60">
                    Tables are reserved without advance deposit • Held for 15 minutes past scheduled time
                  </p>

                </form>
              )}

            </div>

            {/* ══════════════════════════════════════════════════════════════
                RIGHT COLUMN (5 COLS): Sanctuary Policies & Spatial Guidance
                ══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-[#FAF7F2]">
              <div>
                <div className="flex items-center justify-between border-b-2 border-[#14100E] pb-3 mb-6">
                  <span className="font-mono text-xs font-black text-[#A8612E]">SANCTUARY GUIDELINES</span>
                  <span className="font-grotesk text-[10px] font-bold uppercase text-[#14100E]/70">TALWANDI • KOTA</span>
                </div>

                <div className="space-y-6 font-grotesk">
                  <div className="border-l-2 border-[#14100E] pl-4">
                    <span className="font-mono text-[10px] font-bold text-[#A8612E] block">POLICY // 01</span>
                    <h4 className="font-black text-sm uppercase text-[#14100E] mb-1">
                      15-Minute Grace Period
                    </h4>
                    <p className="text-xs text-[#14100E]/70 leading-relaxed">
                      We hold your table for up to 15 minutes past your chosen time slot before releasing it to walk-in patrons.
                    </p>
                  </div>

                  <div className="border-l-2 border-[#14100E] pl-4">
                    <span className="font-mono text-[10px] font-bold text-[#A8612E] block">POLICY // 02</span>
                    <h4 className="font-black text-sm uppercase text-[#14100E] mb-1">
                      Study Loft & Fiber Access
                    </h4>
                    <p className="text-xs text-[#14100E]/70 leading-relaxed">
                      Free gigabit Wi-Fi and power outlets at every desk. Please keep calls on vibration to maintain our 42 dB quiet atmosphere.
                    </p>
                  </div>

                  <div className="border-l-2 border-[#14100E] pl-4">
                    <span className="font-mono text-[10px] font-bold text-[#A8612E] block">POLICY // 03</span>
                    <h4 className="font-black text-sm uppercase text-[#14100E] mb-1">
                      Group Bookings (6+ Guests)
                    </h4>
                    <p className="text-xs text-[#14100E]/70 leading-relaxed">
                      For larger groups or special celebratory meetups, drop us a direct WhatsApp text for custom table arrangements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Contact */}
              <div className="mt-8 pt-6 border-t-2 border-[#14100E] flex items-center justify-between text-[11px] font-grotesk font-bold uppercase text-[#14100E]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#A8612E]" /> Talwandi, Kota
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#A8612E]" /> 08:00 — 23:00
                </span>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ReservePage;
