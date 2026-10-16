// Game HUD Audio Engine using native Web Audio API (Zero external assets needed)

let audioCtx = null;
let ambienceSource = null;
let ambienceGain = null;
let isMuted = false;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export const setMuted = (muted) => {
  isMuted = muted;
  if (isMuted && ambienceGain) {
    ambienceGain.gain.setValueAtTime(0, audioCtx?.currentTime || 0);
  }
};

export const getMuted = () => isMuted;

// High-tech subtle UI hover blip
export const playHoverBlip = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Graceful fallback
  }
};

// Tactical click / option select sound
export const playSelectSound = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(540, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch {
    // Graceful fallback
  }
};

// Warm extraction brew pulse sound
export const playExtractionPulse = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(280, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    // Graceful fallback
  }
};

// Game reward / completion chime
export const playRewardChime = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0.03, ctx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 0.35);
    });
  } catch {
    // Graceful fallback
  }
};

// Generative Sanctuary Ambience (gentle rain & warm low coffee steam resonance)
export const startSanctuaryAmbience = (volume = 0.05) => {
  if (isMuted) return false;
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    if (ambienceSource) {
      stopSanctuaryAmbience();
    }

    // Buffer noise for soft rain / cafe acoustic floor
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02; // Pink-ish noise filter
      lastOut = output[i];
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to soft rain frequency
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, ctx.currentTime);

    // Warm sub-bass generator for cafe room tone
    const roomTone = ctx.createOscillator();
    roomTone.type = 'sine';
    roomTone.frequency.setValueAtTime(55, ctx.currentTime); // Low 55Hz warm hum

    ambienceGain = ctx.createGain();
    ambienceGain.gain.setValueAtTime(volume, ctx.currentTime);

    const roomGain = ctx.createGain();
    roomGain.gain.setValueAtTime(0.012, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(ambienceGain);

    roomTone.connect(roomGain);
    roomGain.connect(ambienceGain);

    ambienceGain.connect(ctx.destination);

    whiteNoise.start();
    roomTone.start();

    ambienceSource = { whiteNoise, roomTone };
    return true;
  } catch {
    return false;
  }
};

export const stopSanctuaryAmbience = () => {
  try {
    if (ambienceSource) {
      ambienceSource.whiteNoise.stop();
      ambienceSource.roomTone.stop();
      ambienceSource = null;
    }
  } catch {
    // Graceful
  }
};
