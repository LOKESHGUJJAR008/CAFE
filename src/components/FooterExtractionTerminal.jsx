import React, { useState } from 'react';
import { 
  Flame, 
  Droplets, 
  Gauge, 
  Sparkles, 
  Check, 
  Copy, 
  Terminal, 
  Zap,
  BookOpen,
  Activity,
  Layers
} from 'lucide-react';
import { 
  playHoverBlip, 
  playSelectSound, 
  playExtractionPulse, 
  playRewardChime 
} from '../lib/soundFx';

const BEANS = [
  {
    id: 'peaberry',
    name: 'Coorg Volcanic Peaberry',
    origin: 'Estate 1450m • Coorg',
    roast: 'Medium-Light',
    notes: 'Bergamot, Dark Plum, Raw Honey',
    rarity: 'RARE 5% HARVEST',
    rarityColor: 'text-amber-400 border-amber-400/40 bg-amber-400/10'
  },
  {
    id: 'chikmagalur',
    name: 'Chikmagalur Red Honey',
    origin: 'Bababudangiri 1200m',
    roast: 'Cinnamon Roast',
    notes: 'Jasmine, White Peach, Cocoa Nibs',
    rarity: 'LIMITED MICROLOT',
    rarityColor: 'text-rose-400 border-rose-400/40 bg-rose-400/10'
  },
  {
    id: 'wayanad',
    name: 'Wayanad Basalt Monolith',
    origin: 'Western Ghats 1600m',
    roast: 'Dark Brutalist',
    notes: 'Toasted Walnut, Molasses, Smoke',
    rarity: 'RESERVE APOTHECARY',
    rarityColor: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10'
  }
];

const METHODS = [
  { id: 'espresso', label: '9-Bar Espresso', dose: '18.5g', ratio: '1:2', time: '28s', icon: Gauge },
  { id: 'v60', label: 'Ceramic V60', dose: '15.0g', ratio: '1:16', time: '3m 15s', icon: Droplets },
  { id: 'kyoto', label: 'Kyoto Cold Drip', dose: '45.0g', ratio: '1:10', time: '18 hrs', icon: Layers },
  { id: 'aeropress', label: 'Inverted AeroPress', dose: '17.0g', ratio: '1:13', time: '1m 45s', icon: Zap }
];

export const FooterExtractionTerminal = () => {
  const [activeTab, setActiveTab] = useState('alchemist'); // 'alchemist' | 'sensors' | 'codex'
  const [selectedBean, setSelectedBean] = useState(BEANS[0]);
  const [selectedMethod, setSelectedMethod] = useState(METHODS[0]);
  const [temp, setTemp] = useState(93);
  
  // Game simulation state
  const [extracting, setExtracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('');
  const [extractedResult, setExtractedResult] = useState(null);
  const [copiedReward, setCopiedReward] = useState(false);

  // Codex read state
  const [expandedCodex, setExpandedCodex] = useState(0);

  const startExtraction = () => {
    if (extracting) return;
    setExtracting(true);
    setProgress(0);
    setExtractedResult(null);
    playExtractionPulse();

    const phases = [
      { p: 20, text: `PRECISION DOSE: ${selectedMethod.dose} PEABERRY` },
      { p: 45, text: `THERMAL STABILIZATION: ${temp}°C INJECTION` },
      { p: 75, text: `EXTRACTION RATIO ${selectedMethod.ratio} UNDER PRESSURE` },
      { p: 100, text: `EXTRACTION COMPLETE: GOLDEN CREMA YIELD` }
    ];

    let currentPhase = 0;
    const interval = setInterval(() => {
      if (currentPhase < phases.length) {
        setProgress(phases[currentPhase].p);
        setStepText(phases[currentPhase].text);
        playExtractionPulse();
        currentPhase++;
      } else {
        clearInterval(interval);
        setExtracting(false);
        playRewardChime();
        setExtractedResult({
          score: Math.floor(94 + Math.random() * 5),
          tds: (1.32 + Math.random() * 0.15).toFixed(2),
          flavorYield: '21.4%',
          passcode: 'TATVA-VIP-CIPHER'
        });
      }
    }, 450);
  };

  const copyRewardCode = () => {
    if (!extractedResult) return;
    navigator.clipboard.writeText(extractedResult.passcode);
    playSelectSound();
    setCopiedReward(true);
    setTimeout(() => setCopiedReward(false), 3000);
  };

  return (
    <div className="relative mb-14 border border-[#FAF7F2]/20 bg-[#0F0C0A] p-4 sm:p-6 lg:p-8 overflow-hidden shadow-2xl">
      {/* Tactical Corner Brackets (Game HUD style) */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C9A27E]" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C9A27E]" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C9A27E]" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C9A27E]" />

      {/* Background HUD Scanline Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #FAF7F2 1px, transparent 1px), linear-gradient(to bottom, #FAF7F2 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Terminal Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#FAF7F2]/15 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-[#1C1613] border border-[#C9A27E]/40 text-[#C9A27E]">
            <Terminal className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <h4 className="font-grotesk text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-[#FAF7F2]">
                TATVA BARISTA TERMINAL // PROTOCOL MK-IV
              </h4>
            </div>
            <p className="font-grotesk text-[10px] uppercase tracking-wider text-[#FAF7F2]/50">
              Interactive Extraction Alchemist • Single-Origin Crafting Console
            </p>
          </div>
        </div>

        {/* Tab Controls (Game HUD menu) */}
        <div className="flex items-center gap-1.5 bg-[#171210] p-1 border border-[#FAF7F2]/15 self-start sm:self-auto">
          <button
            onClick={() => { setActiveTab('alchemist'); playSelectSound(); }}
            onMouseEnter={playHoverBlip}
            className={`px-3 py-1.5 font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 ${
              activeTab === 'alchemist'
                ? 'bg-[#C9A27E] text-[#14100E] shadow-sm'
                : 'text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:bg-[#FAF7F2]/5'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>01 ALCHEMIST</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('sensors'); playSelectSound(); }}
            onMouseEnter={playHoverBlip}
            className={`px-3 py-1.5 font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 ${
              activeTab === 'sensors'
                ? 'bg-[#C9A27E] text-[#14100E] shadow-sm'
                : 'text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:bg-[#FAF7F2]/5'
            }`}
          >
            <Activity className="w-3 h-3" />
            <span>02 SENSORS</span>
          </button>

          <button
            onClick={() => { setActiveTab('codex'); playSelectSound(); }}
            onMouseEnter={playHoverBlip}
            className={`px-3 py-1.5 font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 ${
              activeTab === 'codex'
                ? 'bg-[#C9A27E] text-[#14100E] shadow-sm'
                : 'text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:bg-[#FAF7F2]/5'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span>03 CODEX</span>
          </button>
        </div>
      </div>

      {/* ── TAB 1: BREW ALCHEMIST (INTERACTIVE CRAFTING GAME) ── */}
      {activeTab === 'alchemist' && (
        <div className="pt-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Step 1: Bean Selection (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-grotesk text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A27E]">
                  [STEP 01] SELECT SINGLE-ORIGIN BEAN
                </span>
                <span className="font-mono text-[9px] text-[#FAF7F2]/40">3 AVAILABLE</span>
              </div>

              <div className="space-y-2">
                {BEANS.map((b) => {
                  const isSel = selectedBean.id === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => { setSelectedBean(b); playSelectSound(); }}
                      onMouseEnter={playHoverBlip}
                      className={`w-full text-left p-3 border transition-all relative group ${
                        isSel
                          ? 'border-[#C9A27E] bg-[#1F1714] text-[#FAF7F2]'
                          : 'border-[#FAF7F2]/10 bg-[#14100E]/70 hover:border-[#FAF7F2]/30 text-[#FAF7F2]/70 hover:text-[#FAF7F2]'
                      }`}
                    >
                      {isSel && (
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#C9A27E] rounded-full animate-ping" />
                      )}
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-grotesk text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">
                          {b.name}
                        </span>
                        <span className={`text-[8px] font-mono px-1.5 py-0.5 border ${b.rarityColor}`}>
                          {b.rarity}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-[#C9A27E] mb-1">
                        {b.origin} • {b.roast}
                      </div>
                      <div className="text-[10px] text-[#FAF7F2]/50 italic font-cormorant">
                        Notes: {b.notes}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Extraction Method & Temperature (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <div>
                <span className="block font-grotesk text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A27E] mb-3">
                  [STEP 02] EXTRACTION METHOD
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {METHODS.map((m) => {
                    const isM = selectedMethod.id === m.id;
                    const IconComp = m.icon;
                    return (
                      <button
                        key={m.id}
                        onClick={() => { setSelectedMethod(m); playSelectSound(); }}
                        onMouseEnter={playHoverBlip}
                        className={`p-3 border text-left transition-all ${
                          isM
                            ? 'border-[#C9A27E] bg-[#1F1714] text-[#FAF7F2]'
                            : 'border-[#FAF7F2]/10 bg-[#14100E]/70 hover:border-[#FAF7F2]/30 text-[#FAF7F2]/60 hover:text-[#FAF7F2]'
                        }`}
                      >
                        <IconComp className={`w-4 h-4 mb-1.5 ${isM ? 'text-[#C9A27E]' : 'text-[#FAF7F2]/40'}`} />
                        <span className="block font-grotesk text-[11px] font-bold uppercase tracking-wider">
                          {m.label}
                        </span>
                        <span className="block font-mono text-[9px] text-[#FAF7F2]/40 mt-1">
                          {m.dose} • {m.time}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Water Temperature Slider */}
              <div className="p-3 bg-[#14100E] border border-[#FAF7F2]/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span className="font-grotesk text-[10px] font-black uppercase tracking-wider text-[#FAF7F2]/80">
                      THERMAL CALIBRATION
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#C9A27E]">
                    {temp}°C {temp >= 92 && temp <= 94 ? '(GOLDEN GOLD)' : ''}
                  </span>
                </div>
                <input
                  type="range"
                  min="88"
                  max="97"
                  value={temp}
                  onChange={(e) => { setTemp(Number(e.target.value)); playHoverBlip(); }}
                  className="w-full h-1.5 bg-[#251D1A] rounded-none appearance-none cursor-pointer accent-[#C9A27E]"
                />
                <div className="flex justify-between text-[9px] font-mono text-[#FAF7F2]/30 mt-1">
                  <span>88°C GENTLE</span>
                  <span>93°C OPTIMAL</span>
                  <span>97°C BOLD</span>
                </div>
              </div>
            </div>

            {/* Step 3: Simulation Chamber & Reward (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full bg-[#14100E] border border-[#FAF7F2]/15 p-4 relative">
              <span className="font-grotesk text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A27E] mb-2">
                [STEP 03] SIMULATION CHAMBER
              </span>

              {/* Chamber Visualizer */}
              <div className="relative border border-[#FAF7F2]/10 bg-[#0A0807] p-4 text-center my-3 min-h-[140px] flex flex-col items-center justify-center">
                {extracting ? (
                  <div className="space-y-3 w-full">
                    <div className="flex items-center justify-center gap-2 text-amber-400">
                      <Sparkles className="w-5 h-5 animate-spin" />
                      <span className="font-mono text-xs font-bold tracking-widest uppercase">
                        {stepText || 'EXTRACTION IN PROGRESS...'}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#1C1613] h-2 overflow-hidden border border-[#FAF7F2]/20">
                      <div
                        className="bg-gradient-to-r from-[#C9A27E] to-amber-400 h-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-[#FAF7F2]/50">
                      SYSTEM PRESSURE: {(8.8 + (progress / 100) * 0.6).toFixed(1)} BAR • FLOW RATE: OPTIMAL
                    </span>
                  </div>
                ) : extractedResult ? (
                  <div className="space-y-2 w-full animate-fadeIn">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-[9px] font-mono uppercase">
                      <Check className="w-3 h-3" /> MASTER EXTRACTION ACHIEVED
                    </div>
                    <div className="text-xl font-cormorant italic text-[#C9A27E]">
                      "{selectedBean.name}"
                    </div>
                    <div className="grid grid-cols-3 gap-1 py-1 font-mono text-[10px] text-[#FAF7F2]/70 border-t border-b border-[#FAF7F2]/10">
                      <div>SCORE: <span className="text-[#C9A27E]">{extractedResult.score}/100</span></div>
                      <div>TDS: <span className="text-[#C9A27E]">{extractedResult.tds}%</span></div>
                      <div>YIELD: <span className="text-[#C9A27E]">{extractedResult.flavorYield}</span></div>
                    </div>
                    
                    {/* Secret Voucher Code Reward */}
                    <div className="pt-1">
                      <span className="block text-[8px] font-grotesk uppercase tracking-widest text-[#FAF7F2]/40">
                        BARISTA SECRET CIPHER (10% AT COUNTER)
                      </span>
                      <button
                        onClick={copyRewardCode}
                        className="mt-1 w-full flex items-center justify-center gap-2 py-1.5 px-3 bg-[#FAF7F2] text-[#14100E] hover:bg-[#C9A27E] font-grotesk font-black text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        {copiedReward ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-800" />
                            <span>COPIED: {extractedResult.passcode}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>COPY PASSCODE: {extractedResult.passcode}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-[#FAF7F2]/50">
                    <Gauge className="w-8 h-8 mx-auto text-[#C9A27E]/60 stroke-1" />
                    <p className="font-grotesk text-xs uppercase tracking-wider">
                      STANDBY // PROTOCOL READY
                    </p>
                    <p className="font-cormorant italic text-xs text-[#FAF7F2]/40">
                      Target: {selectedBean.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={startExtraction}
                disabled={extracting}
                onMouseEnter={playHoverBlip}
                className="w-full py-3 bg-[#FAF7F2] text-[#14100E] hover:bg-[#C9A27E] disabled:opacity-50 font-grotesk font-black text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>{extracting ? 'EXTRACTING EMULSION...' : 'EXECUTE EXTRACTION ⚡'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── TAB 2: LIVE SANCTUARY SENSORS (GAME HUD TELEMETRY) ── */}
      {activeTab === 'sensors' && (
        <div className="pt-6 relative z-10 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 bg-[#14100E] border border-[#FAF7F2]/15 relative">
              <span className="font-mono text-[9px] text-[#C9A27E] uppercase block mb-1">
                // SENSOR 01 • WATER CHEMISTRY
              </span>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-2xl font-black text-[#FAF7F2]">110.4</span>
                <span className="font-mono text-xs text-[#C9A27E]">PPM TDS</span>
              </div>
              <p className="text-[10px] font-grotesk uppercase text-[#FAF7F2]/60 leading-relaxed">
                Volcanic basalt filtered mineral water. Magnesium-calcium 2:1 ratio for bright acidity preservation.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-[9px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>VOLATILITY: OPTIMAL</span>
              </div>
            </div>

            <div className="p-4 bg-[#14100E] border border-[#FAF7F2]/15 relative">
              <span className="font-mono text-[9px] text-[#C9A27E] uppercase block mb-1">
                // SENSOR 02 • PROBAT DRUM CORE
              </span>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-2xl font-black text-[#FAF7F2]">204.2°C</span>
                <span className="font-mono text-xs text-amber-400">BATCH #409</span>
              </div>
              <p className="text-[10px] font-grotesk uppercase text-[#FAF7F2]/60 leading-relaxed">
                Slow-curve conduction roasting. Rate of Rise (RoR): 8.4°C/min. First crack locked at 09m 14s.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-[9px] font-mono text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>STATE: COOLED & RESTING</span>
              </div>
            </div>

            <div className="p-4 bg-[#14100E] border border-[#FAF7F2]/15 relative">
              <span className="font-mono text-[9px] text-[#C9A27E] uppercase block mb-1">
                // SENSOR 03 • ACOUSTIC FREQUENCY
              </span>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-2xl font-black text-[#FAF7F2]">43.6</span>
                <span className="font-mono text-xs text-[#C9A27E]">dB NOISE FLOOR</span>
              </div>
              <p className="text-[10px] font-grotesk uppercase text-[#FAF7F2]/60 leading-relaxed">
                Serene acoustic dampening by raw cast concrete and wild botanical greenery. Curated vinyl rotation.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-[9px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>ATMOSPHERE: HIGH FOCUS</span>
              </div>
            </div>

            <div className="p-4 bg-[#14100E] border border-[#FAF7F2]/15 relative">
              <span className="font-mono text-[9px] text-[#C9A27E] uppercase block mb-1">
                // SENSOR 04 • BARISTA APOTHECARY
              </span>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-2xl font-black text-[#FAF7F2]">ACTIVE</span>
                <span className="font-mono text-xs text-emerald-400">BAR OPEN</span>
              </div>
              <p className="text-[10px] font-grotesk uppercase text-[#FAF7F2]/60 leading-relaxed">
                Talwandi brew bar operational. Custom ceramic hand-pulled cups & single-estate peaberry infusions.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-[9px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SANCTUARY ONLINE</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── TAB 3: SANCTUARY CODEX (GAME WORLD LORE ARCHIVE) ── */}
      {activeTab === 'codex' && (
        <div className="pt-6 relative z-10 animate-fadeIn space-y-3">
          {[
            {
              code: 'CODEX // 001',
              title: 'THE PEABERRY ANOMALY (RARE SINGLE SEED)',
              content: 'In 95% of coffee cherries, two flat-sided seeds develop face-to-face. In 5% of wild harvests, nature fuses them into one solid, spherical pearl — the Peaberry. Because heat penetrates a sphere uniformly, it yields a denser, sweeter, extraordinarily complex cup with notes of blood orange, bergamot, and raw mountain honey.'
            },
            {
              code: 'CODEX // 002',
              title: 'THE BRUTALIST ARCHITECTURE OF TALWANDI',
              content: 'Tatva was erected on the philosophical tenet that silence is the highest luxury. Built from poured basalt concrete, unpolished brass, and native Rajasthan flora, the physical space shields you from the urban rush of Kota, calibrating your nervous system for slow extraction.'
            },
            {
              code: 'CODEX // 003',
              title: 'THE 18-HOUR KYOTO SLOW DRIP MONOLITH',
              content: 'Cold water is metered drop by drop through a borosilicate glass tower at an exact cadence of one drop per 2.4 seconds over Coorg peaberry grinds. Because zero thermal shock occurs, acidity is round, bitter tannins are nonexistent, and volatile aromatics are preserved in liquid suspension.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => { setExpandedCodex(idx); playSelectSound(); }}
              className={`p-4 border transition-all cursor-pointer ${
                expandedCodex === idx
                  ? 'border-[#C9A27E] bg-[#1A1411]'
                  : 'border-[#FAF7F2]/10 bg-[#14100E] hover:border-[#FAF7F2]/25'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[9px] text-[#C9A27E] tracking-widest font-bold">
                  {item.code}
                </span>
                <span className="text-[10px] font-mono text-[#FAF7F2]/40">
                  {expandedCodex === idx ? '[COLLAPSE -]' : '[EXPAND +]'}
                </span>
              </div>
              <h5 className="font-grotesk text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FAF7F2] mb-2">
                {item.title}
              </h5>
              {expandedCodex === idx && (
                <p className="font-cormorant text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed italic border-t border-[#FAF7F2]/10 pt-2 animate-fadeIn">
                  "{item.content}"
                </p>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default FooterExtractionTerminal;
