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
    description: `Reserve a table at Royal Bean Café in Talwandi, Kota via WhatsApp. Choose your date, time and number of guests.`,
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
    const msg = `Hi Royal Bean Café, I'd like to book a table.\n\nName: ${fields.name}\nPhone: ${fields.phone}\nDate: ${fields.date}\nTime: ${fields.time}\nGuests: ${fields.guests}${note}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const inputCls = (key) =>
    `w-full px-4 py-3 rounded-xl border bg-foam text-ink text-sm font-inter
     focus:outline-none focus:ring-2 focus:ring-caramel focus:border-transparent
     transition-colors placeholder:text-ink/40
     ${errors[key] ? 'border-red-400 bg-red-50/40' : 'border-latte/50 hover:border-latte'}`;

  const labelCls = 'block text-xs font-bold uppercase tracking-[0.15em] text-ink/60 mb-1.5 font-inter';

  return (
    <div className="bg-foam text-ink min-h-screen">
      {/* ── Hero Banner ── */}
      <section className="bg-ink text-foam py-24 px-6 sm:px-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,97,46,0.18)_0%,transparent_70%)] pointer-events-none" />
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-2xl mx-auto"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-caramel bg-caramel/10 border border-caramel/25 px-4 py-1.5 rounded-full mb-6">
            Reservations
          </span>
          <h1 className="font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl text-foam leading-tight mb-4">
            Book a Table at<br />
            <span className="text-caramel italic font-normal">Royal Bean</span>
          </h1>
          <p className="text-almond/75 text-base sm:text-lg">
            Reserve your cosy spot via WhatsApp — we'll confirm in minutes.
          </p>
        </motion.div>
      </section>

      {/* ── Form ── */}
      <section className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16">
        <div className="max-w-xl mx-auto">
          {submitted ? (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-almond rounded-3xl p-10 text-center shadow-warm-lg"
            >
              <CheckCircle className="w-14 h-14 text-caramel mx-auto mb-4" strokeWidth={1.5} />
              <h2 className="font-playfair font-bold text-2xl text-ink mb-3">Request Sent!</h2>
              <p className="text-ink/70 text-sm leading-relaxed mb-6">
                Your reservation request has been sent via WhatsApp.<br />
                The café will confirm your booking shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFields({ name: '', phone: '', date: '', time: '', guests: 2, note: '' }); }}
                className="px-8 py-3 rounded-full bg-caramel hover:bg-caramel/90 text-foam font-bold text-sm tracking-wide transition-all shadow-warm"
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
              className="bg-almond rounded-3xl p-8 sm:p-10 shadow-warm-lg flex flex-col gap-6"
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
                className="w-full py-4 rounded-full bg-caramel hover:bg-caramel/90 text-foam font-bold text-sm tracking-wide
                           flex items-center justify-center gap-2 shadow-warm transition-all
                           hover:-translate-y-0.5 active:scale-95
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2"
              >
                <MessageCircle className="w-4 h-4" />
                Reserve on WhatsApp
              </button>
              <p className="text-center text-[11px] text-ink/50 -mt-3 font-inter">
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
