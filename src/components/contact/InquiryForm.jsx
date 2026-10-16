import React, { useState, useMemo } from 'react';
import { MessageSquare, Send, Copy, AlertCircle, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_NUMBER, CAFE_NAME } from '../../config';
import Scroll3DEmerge from './Scroll3DEmerge';

const TOPICS = [
  { id: 'table', label: '☕ Table & Seating', defaultMsg: "Hi, I'd like to check table availability for a visit." },
  { id: 'study', label: '📖 Study Nook & Wi-Fi', defaultMsg: "Hi, I'm inquiring about quiet study desks and Wi-Fi access." },
  { id: 'group', label: '👥 Group / Workshop', defaultMsg: "Hi, I'd like to organize a small group meetup or workshop." },
  { id: 'lost', label: '💼 Lost & Found', defaultMsg: "Hi, I believe I left an item at the café recently and wanted to check." },
  { id: 'feedback', label: '✍️ Feedback / Note', defaultMsg: "Hi TATVA team, I wanted to share a note from my recent visit." },
];

export const InquiryForm = ({ onCopy }) => {
  const [topic, setTopic] = useState('table');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState(TOPICS[0].defaultMsg);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleTopicChange = (newTopicId) => {
    setTopic(newTopicId);
    const selected = TOPICS.find(t => t.id === newTopicId);
    if (selected) {
      setMessage(selected.defaultMsg);
    }
  };

  const selectedTopicObj = TOPICS.find(t => t.id === topic) || TOPICS[0];

  // Compose formatted telemetry payload for WhatsApp
  const compiledPayload = useMemo(() => {
    const lines = [
      `*${CAFE_NAME} — DISPATCH TELEMETRY*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `• *Topic:* ${selectedTopicObj.label}`,
      `• *Guest:* ${name.trim() || '[Your Name]'}`,
      `• *Phone:* ${phone.trim() || '[Your Phone]'}`,
    ];

    if (date || time) {
      lines.push(`• *Schedule:* ${date ? date : ''} ${time ? `@ ${time}` : ''}`.trim());
    }

    lines.push(`• *Note / Inquiry:*`);
    lines.push(message.trim() || selectedTopicObj.defaultMsg);
    lines.push(`━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`Sent via TATVA Digital Portal`);

    return lines.join('\n');
  }, [name, phone, selectedTopicObj.label, date, time, message, selectedTopicObj.defaultMsg]);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Please provide your name.';
    const cleanPhone = phone.replace(/[\s\-+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please provide a valid 10-digit number.';
    }
    return errs;
  };

  const handleDispatch = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      return;
    }

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(compiledPayload)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyPayload = () => {
    onCopy(compiledPayload, 'Formatted message copied to clipboard', 'dispatch-payload');
  };

  return (
    <section id="dispatch-form" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF7F2] text-[#14100E] border-b-2 border-[#14100E] selection:bg-[#14100E] selection:text-[#FAF7F2]">
      
      {/* ── Ground Rift Line ── */}
      <div className="w-full max-w-7xl mx-auto mb-10 flex items-center justify-between border-b-2 border-dashed border-[#14100E]/20 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#A8612E] rotate-45 animate-pulse" />
          <span className="font-grotesk text-[9px] font-black uppercase tracking-[0.28em] text-[#A8612E]">
            TECTONIC SECTOR // DISPATCH PORTAL 3D DOCK
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[9px] text-[#14100E]/60 uppercase tracking-widest">
          <span>CONSOLE ELEVATION ACTIVE</span>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 pb-6 border-b-2 border-[#14100E] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-block bg-[#FAF7F2] border-2 border-[#14100E] px-3 py-1 shadow-[3px_3px_0px_#14100E] mb-3">
              <span className="font-grotesk text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]">
                DIRECT TELEMETRY DISPATCH
              </span>
            </div>
            <h2 className="font-grotesk font-black text-4xl sm:text-5xl uppercase tracking-tighter text-[#14100E]">
              Interactive Message Portal
            </h2>
          </div>
          <p className="font-grotesk text-xs sm:text-sm uppercase tracking-wider text-[#14100E]/75 max-w-md leading-relaxed">
            Select an inquiry subject, enter your details, and preview the transmission before dispatching to WhatsApp.
          </p>
        </div>

        {/* 2-Column Split: 3D Ground Emerge Modules Docking in from Sides */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 border-2 border-[#14100E] bg-[#FAF7F2] shadow-[8px_8px_0px_#14100E] overflow-hidden">
          
          {/* Left Column (7 Cols): Form Controls (Emerges from Left) */}
          <div className="lg:col-span-7 p-6 sm:p-10 border-b-2 lg:border-b-0 lg:border-r-2 border-[#14100E]">
            <Scroll3DEmerge side="left" depth={80} pitchAngle={14}>
              <form onSubmit={handleDispatch} noValidate className="space-y-6">
                
                {/* Step 1: Topic Pills */}
                <div>
                  <label className="block font-grotesk text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]/70 mb-3">
                    1. Select Classification
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((item) => {
                      const isSelected = topic === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleTopicChange(item.id)}
                          className={`py-2 px-4 border-2 text-xs font-grotesk font-bold uppercase tracking-wider transition-all ${
                            isSelected
                              ? 'bg-[#14100E] text-[#FAF7F2] border-[#14100E] shadow-[2px_2px_0px_#A8612E]'
                              : 'bg-[#FAF7F2] text-[#14100E] border-[#14100E]/40 hover:border-[#14100E] hover:bg-[#EADBC8]/30'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dispatch-name" className="block font-grotesk text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]/70 mb-1.5">
                      Your Name <span className="text-[#A8612E]">*</span>
                    </label>
                    <input
                      id="dispatch-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: null }));
                      }}
                      placeholder="e.g. Aarav Sharma"
                      className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border-2 font-grotesk text-sm text-[#14100E] placeholder:text-[#14100E]/30 focus:outline-none focus:ring-2 focus:ring-[#A8612E] transition-colors ${
                        errors.name ? 'border-red-500' : 'border-[#14100E]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 font-grotesk text-[10px] font-bold text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="dispatch-phone" className="block font-grotesk text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]/70 mb-1.5">
                      WhatsApp Number <span className="text-[#A8612E]">*</span>
                    </label>
                    <input
                      id="dispatch-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
                      }}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border-2 font-grotesk text-sm text-[#14100E] placeholder:text-[#14100E]/30 focus:outline-none focus:ring-2 focus:ring-[#A8612E] transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-[#14100E]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 font-grotesk text-[10px] font-bold text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Step 3: Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dispatch-date" className="block font-grotesk text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]/70 mb-1.5">
                      Date (Optional)
                    </label>
                    <input
                      id="dispatch-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border-2 border-[#14100E] font-grotesk text-sm text-[#14100E] focus:outline-none focus:ring-2 focus:ring-[#A8612E]"
                    />
                  </div>

                  <div>
                    <label htmlFor="dispatch-time" className="block font-grotesk text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]/70 mb-1.5">
                      Time Window (Optional)
                    </label>
                    <input
                      id="dispatch-time"
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="e.g. 11:30 AM or Evening"
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border-2 border-[#14100E] font-grotesk text-sm text-[#14100E] placeholder:text-[#14100E]/30 focus:outline-none focus:ring-2 focus:ring-[#A8612E]"
                    />
                  </div>
                </div>

                {/* Step 4: Message Body */}
                <div>
                  <label htmlFor="dispatch-message" className="block font-grotesk text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]/70 mb-1.5">
                    Message or Specific Request
                  </label>
                  <textarea
                    id="dispatch-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Detail your question or requirement..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border-2 border-[#14100E] font-grotesk text-sm text-[#14100E] placeholder:text-[#14100E]/30 focus:outline-none focus:ring-2 focus:ring-[#A8612E]"
                  />
                </div>

                {/* Dispatch Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-[#A8612E] hover:bg-[#92541f] text-[#FAF7F2] font-grotesk font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 border-2 border-[#14100E] shadow-[3px_3px_0px_#14100E] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#14100E] transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Dispatch on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyPayload}
                    className="w-full sm:w-auto py-3.5 px-6 border-2 border-[#14100E] bg-[#FAF7F2] hover:bg-[#14100E] hover:text-[#FAF7F2] text-[#14100E] font-grotesk font-black text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors shadow-[2px_2px_0px_#14100E]"
                  >
                    <Copy className="w-4 h-4 text-[#A8612E]" />
                    <span>Copy Message Text</span>
                  </button>
                </div>

                {hasSubmitted && Object.keys(errors).length > 0 && (
                  <p className="font-grotesk text-xs text-red-600 font-bold">
                    Please review the required fields highlighted above before dispatching.
                  </p>
                )}

              </form>
            </Scroll3DEmerge>
          </div>

          {/* Right Column (5 Cols): Inverted Dark Telemetry Display (Emerges from Right) */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-[#14100E] text-[#FAF7F2] flex flex-col justify-between">
            <Scroll3DEmerge side="right" depth={80} pitchAngle={14}>
              <div>
                <div className="flex items-center justify-between border-b-2 border-[#FAF7F2]/20 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#A8612E] animate-ping" />
                    <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#FAF7F2]">
                      LIVE TRANSMISSION STREAM
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#FAF7F2]/40">RFC-822 / UTF-8</span>
                </div>

                <p className="font-grotesk text-xs text-[#FAF7F2]/75 mb-4 leading-relaxed uppercase tracking-wider">
                  This exact telemetry format will be transmitted to our verified WhatsApp desk:
                </p>

                {/* Terminal Preview Block */}
                <div className="bg-[#FAF7F2]/10 border border-[#FAF7F2]/25 p-4 font-mono text-xs text-[#FAF7F2] leading-relaxed overflow-x-auto whitespace-pre-wrap select-all shadow-inner">
                  {compiledPayload}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#FAF7F2]/20 flex items-center justify-between text-[10px] font-grotesk uppercase tracking-wider text-[#FAF7F2]/50">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#A8612E]" />
                  Response: &lt; 3 mins
                </span>
                <span className="flex items-center gap-1 text-[#FAF7F2]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Verified Channel
                </span>
              </div>
            </Scroll3DEmerge>
          </div>

        </div>

      </div>
    </section>
  );
};

export default InquiryForm;
