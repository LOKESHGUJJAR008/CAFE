import React, { useState, useId, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CalendarDays, Clock, Users, MessageCircle, CheckCircle, Minus, Plus, StickyNote } from 'lucide-react';
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
    title: `Book a Table | ${CAFE_NAME}`,
    description: `Reserve a table at TATVA Café in Talwandi, Kota via WhatsApp. Choose your date, time and number of guests.`,
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
      // Focus first error
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
    `w-full px-4 py-3 border bg-[#FBF7F1] text-[#1F1612] text-sm font-grotesk
     focus:outline-none focus:border-[#C9A012] focus:ring-1 focus:ring-[#C9A012]
     transition-all placeholder:text-[#1F1612]/40
     ${errors[key] ? 'border-red-400 bg-red-50/40' : 'border-[#1F1612]/15 hover:border-[#1F1612]/40'}`;

  const labelCls = 'block text-[10px] font-bold uppercase tracking-[0.2em] text-[#1F1612]/70 mb-2 font-grotesk';

  return (
    <div className="bg-[#FBF7F1] text-[#1F1612] min-h-screen">
      {/* ── Hero Banner ── */}
      <section className="bg-[#1F1612] text-[#FBF7F1] py-24 sm:py-28 px-6 sm:px-10 text-center relative overflow-hidden border-b border-[#FBF7F1]/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,160,18,0.15)_0%,transparent_70%)] pointer-events-none" />
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-2xl mx-auto"
        >
          <span className="bd-eyebrow block mb-3">
            Table Reservations
          </span>
          <h1 className="font-cormorant font-semibold text-5xl sm:text-6xl lg:text-7xl text-[#FBF7F1] leading-[0.95] tracking-[-0.02em] mb-4">
            Book a Table at<br />
            <span className="text-[#C9A012] italic font-normal">TATVA</span>
          </h1>
          <p className="text-[#FBF7F1]/75 font-grotesk text-xs sm:text-sm uppercase tracking-[0.16em] max-w-md mx-auto">
            Reserve your quiet corner or lounge table via WhatsApp — confirmed in minutes.
          </p>
        </motion.div>
      </section>

      {/* ── Form: Luxury Editorial Custom Card ── */}
      <section className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16">
        <div className="max-w-xl mx-auto">
          {submitted ? (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-[#FFFFFF] border border-[#C9A012] p-10 sm:p-12 text-center shadow-lg"
            >
              <CheckCircle className="w-14 h-14 text-[#C9A012] mx-auto mb-4" strokeWidth={1.5} />
              <h2 className="font-cormorant font-semibold text-3xl text-[#1F1612] mb-3">Request Sent!</h2>
              <p className="font-grotesk text-xs sm:text-sm text-[#1F1612]/70 leading-relaxed mb-6">
                Your reservation request has been dispatched via WhatsApp.<br />
                Our team will confirm your table shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFields({ name: '', phone: '', date: '', time: '', guests: 2, note: '' }); }}
                className="bd-btn bd-btn-caramel"
              >
                Make Another Reservation
              </button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              noValidate
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#FFFFFF] border border-[#1F1612]/15 hover:border-[#C9A012] p-8 sm:p-12 shadow-[0_8px_32px_rgba(31,22,18,0.06)] transition-all duration-500 flex flex-col gap-6"
              aria-label="Reserve a table"
            >
              {/* Name */}
              <div>
                <label htmlFor={`${id}-name`} className={labelCls}>
                  Your Name *
                </label>
                <input
                  id={`${id}-name`}
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Aryan Sharma"
                  value={fields.name}
                  onChange={e => set('name', e.target.value)}
                  className={inputCls('name')}
                  aria-describedby={errors.name ? `${id}-name-err` : undefined}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p id={`${id}-name-err`} role="alert" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor={`${id}-phone`} className={labelCls}>
                  Phone Number *
                </label>
                <input
                  id={`${id}-phone`}
                  type="tel"
                  autoComplete="tel"
                  inputMode="numeric"
                  placeholder="10-digit mobile number"
                  value={fields.phone}
                  onChange={e => set('phone', e.target.value.replace(/[^\d\s]/g, ''))}
                  maxLength={12}
                  className={inputCls('phone')}
                  aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <p id={`${id}-phone-err`} role="alert" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Date + Time row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`${id}-date`} className={labelCls}>
                    <CalendarDays className="w-3 h-3 inline mr-1" />Date *
                  </label>
                  <input
                    id={`${id}-date`}
                    type="date"
                    min={getTodayLocal()}
                    value={fields.date}
                    onChange={e => { set('date', e.target.value); set('time', ''); }}
                    className={inputCls('date')}
                    aria-describedby={errors.date ? `${id}-date-err` : undefined}
                    aria-invalid={!!errors.date}
                  />
                  {errors.date && (
                    <p id={`${id}-date-err`} role="alert" className="mt-1.5 text-xs text-red-600 font-medium">
                      {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={`${id}-time`} className={labelCls}>
                    <Clock className="w-3 h-3 inline mr-1" />Time *
                  </label>
                  <select
                    id={`${id}-time`}
                    value={fields.time}
                    onChange={e => set('time', e.target.value)}
                    disabled={!fields.date || timeSlots.length === 0}
                    className={`${inputCls('time')} disabled:opacity-50 disabled:cursor-not-allowed`}
                    aria-describedby={errors.time ? `${id}-time-err` : undefined}
                    aria-invalid={!!errors.time}
                  >
                    <option value="">
                      {!fields.date ? 'Select date first' : timeSlots.length === 0 ? 'Closed this day' : 'Choose a slot'}
                    </option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.time && (
                    <p id={`${id}-time-err`} role="alert" className="mt-1.5 text-xs text-red-600 font-medium">
                      {errors.time}
                    </p>
                  )}
                </div>
              </div>

              {/* Guests stepper */}
              <div>
                <label className={labelCls}>
                  <Users className="w-3 h-3 inline mr-1" />Number of Guests
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => set('guests', Math.max(1, fields.guests - 1))}
                    aria-label="Decrease guests"
                    className="w-10 h-10 rounded-full bg-foam border border-latte/50 hover:border-caramel hover:text-caramel text-ink flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span
                    className="font-playfair font-bold text-2xl text-ink w-8 text-center"
                    aria-live="polite"
                    aria-label={`${fields.guests} guests`}
                  >
                    {fields.guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => set('guests', Math.min(12, fields.guests + 1))}
                    aria-label="Increase guests"
                    className="w-10 h-10 rounded-full bg-foam border border-latte/50 hover:border-caramel hover:text-caramel text-ink flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-ink/50 font-inter">max 12</span>
                </div>
              </div>

              {/* Note */}
              <div>
                <label htmlFor={`${id}-note`} className={labelCls}>
                  <StickyNote className="w-3 h-3 inline mr-1" />Special Request (optional)
                </label>
                <textarea
                  id={`${id}-note`}
                  rows={3}
                  placeholder="e.g. Window seat, birthday celebration…"
                  value={fields.note}
                  onChange={e => set('note', e.target.value)}
                  className={`${inputCls('note')} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-[#C9A012] hover:bg-[#E5B815] text-[#1F1612] font-grotesk font-bold text-xs uppercase tracking-[0.2em]
                           flex items-center justify-center gap-2 transition-all shadow-sm
                           hover:-translate-y-0.5 active:scale-98
                           focus-visible:outline-none"
              >
                <MessageCircle className="w-4 h-4" />
                Reserve on WhatsApp →
              </button>
              <p className="text-center text-[11px] text-[#1F1612]/50 -mt-2 font-grotesk">
                The café will confirm your booking on WhatsApp · No payment collected here
              </p>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
};

export default ReservePage;
