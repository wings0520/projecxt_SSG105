/**
 * Em Mơ — Gacha Unboxing Simulator (Bộ giả lập khui túi mù 3D)
 * Realistic Kraft Paper Bag + 5-Step Progressive Tear + 3-Second Dramatic Suspense
 * Weighted RNG + Web Audio Synthesizer + Particle Shred Physics
 */

class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playShake() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  // Crisp, loud, realistic paper tearing step sound (1 to 5)
  playTearStep(step = 1) {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;

    const duration = 0.22 + step * 0.04;
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    // Physical modeling of kraft paper fibers snapping under tension
    let brownNoise = 0;
    const snapDensity = 0.02 + step * 0.014;
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      const white = Math.random() * 2 - 1;
      brownNoise = (brownNoise + 0.06 * white) / 1.06;

      // Random micro-transient spikes (individual paper fiber snaps)
      const isSnap = Math.random() < snapDensity;
      const snapVal = isSnap ? (Math.random() > 0.5 ? 1 : -1) * (0.75 + Math.random() * 0.25) : 0;

      // Amplitude envelope: sharp attack, sustained rough tearing friction, decay
      const env = Math.pow(Math.sin(Math.PI * Math.pow(t, 0.4)), 1.2);
      data[i] = (white * 0.4 + brownNoise * 0.35 + snapVal * 0.6) * env;
    }

    const noiseSrc = this.ctx.createBufferSource();
    noiseSrc.buffer = buffer;

    // 1. High-pass filter to isolate crisp ripping crunch
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(650, now);

    // 2. Resonant peaking filter (+9dB boost) at 2600Hz - 3800Hz for sharp paper bite
    const peak = this.ctx.createBiquadFilter();
    peak.type = 'peaking';
    peak.frequency.setValueAtTime(2600 + step * 250, now);
    peak.Q.setValueAtTime(3.2, now);
    peak.gain.setValueAtTime(9.0, now);

    // 3. Sweeping lowpass formant simulating tear propagation
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(6000, now);
    lp.frequency.exponentialRampToValueAtTime(1400, now + duration);

    // 4. Low-frequency kraft pouch cavity thump
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(190, now);
    subOsc.frequency.exponentialRampToValueAtTime(60, now + 0.18);
    subGain.gain.setValueAtTime(0.35 + step * 0.05, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.19);

    // Master Gain: High presence and clarity
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.85 + step * 0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    noiseSrc.connect(hp);
    hp.connect(peak);
    peak.connect(lp);
    lp.connect(gain);
    gain.connect(this.ctx.destination);

    noiseSrc.start(now);
  }

  // Massive continuous paper rip when bag bursts open (Step 5 / Rip Open)
  playTear() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;

    const duration = 0.55;
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    let brown = 0;
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      const white = Math.random() * 2 - 1;
      brown = (brown + 0.08 * white) / 1.08;

      const isSnap = Math.random() < 0.06;
      const snapVal = isSnap ? (Math.random() > 0.5 ? 1 : -1) * 0.9 : 0;

      const env = Math.sin(Math.PI * Math.pow(t, 0.5));
      data[i] = (white * 0.5 + brown * 0.4 + snapVal * 0.7) * env;
    }

    const noiseSrc = this.ctx.createBufferSource();
    noiseSrc.buffer = buffer;

    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(500, now);

    const peak = this.ctx.createBiquadFilter();
    peak.type = 'peaking';
    peak.frequency.setValueAtTime(3200, now);
    peak.Q.setValueAtTime(2.8, now);
    peak.gain.setValueAtTime(10.0, now);

    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(7000, now);
    lp.frequency.exponentialRampToValueAtTime(900, now + duration);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.95, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    noiseSrc.connect(hp);
    hp.connect(peak);
    peak.connect(lp);
    lp.connect(gain);
    gain.connect(this.ctx.destination);

    noiseSrc.start(now);
  }

  // Tactile micro-crackle when dragging mouse along cut line
  playDragScrub() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const duration = 0.06;
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      const snap = Math.random() < 0.09 ? (Math.random() > 0.5 ? 1 : -1) : 0;
      data[i] = (white * 0.45 + snap * 0.7) * Math.sin(Math.PI * (i / bufferSize));
    }

    const noiseSrc = this.ctx.createBufferSource();
    noiseSrc.buffer = buffer;

    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(3200 + Math.random() * 800, now);
    bp.Q.setValueAtTime(4.0, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    noiseSrc.connect(bp);
    bp.connect(gain);
    gain.connect(this.ctx.destination);

    noiseSrc.start(now);
  }

  // 3-Second Dramatic Suspense Audio Crescendo
  playSuspenseCharge(duration = 3.0) {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;

    // 1. Drumroll-style sub-bass rumble
    const rumbleOsc = this.ctx.createOscillator();
    const rumbleGain = this.ctx.createGain();
    rumbleOsc.type = 'triangle';
    rumbleOsc.frequency.setValueAtTime(65, now);
    rumbleOsc.frequency.exponentialRampToValueAtTime(150, now + duration);
    rumbleGain.gain.setValueAtTime(0.12, now);
    rumbleGain.gain.linearRampToValueAtTime(0.35, now + duration * 0.85);
    rumbleGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
    rumbleOsc.connect(rumbleGain);
    rumbleGain.connect(this.ctx.destination);
    rumbleOsc.start(now);
    rumbleOsc.stop(now + duration);

    // 2. Rising harmonic celestial energy
    const shimmerOsc = this.ctx.createOscillator();
    const shimmerGain = this.ctx.createGain();
    shimmerOsc.type = 'sine';
    shimmerOsc.frequency.setValueAtTime(330, now);
    shimmerOsc.frequency.exponentialRampToValueAtTime(1300, now + duration);
    shimmerGain.gain.setValueAtTime(0.03, now);
    shimmerGain.gain.exponentialRampToValueAtTime(0.28, now + duration * 0.9);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    shimmerOsc.connect(shimmerGain);
    shimmerGain.connect(this.ctx.destination);
    shimmerOsc.start(now);
    shimmerOsc.stop(now + duration);

    // 3. Three distinct heartbeat pulses at 1s, 2s, 3s
    [0.1, 1.0, 2.0].forEach((offset, idx) => {
      const pingTime = now + offset;
      const pingOsc = this.ctx.createOscillator();
      const pingGain = this.ctx.createGain();
      pingOsc.type = 'sine';
      pingOsc.frequency.setValueAtTime(523.25 * (1 + idx * 0.25), pingTime);
      pingGain.gain.setValueAtTime(0.22 + idx * 0.05, pingTime);
      pingGain.gain.exponentialRampToValueAtTime(0.01, pingTime + 0.4);
      pingOsc.connect(pingGain);
      pingGain.connect(this.ctx.destination);
      pingOsc.start(pingTime);
      pingOsc.stop(pingTime + 0.42);
    });
  }

  playReveal(tier) {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;

    const notes = tier === 'epic' 
      ? [523.25, 659.25, 783.99, 1046.50, 1318.51] // C5, E5, G5, C6, E6 (Major golden chime)
      : tier === 'rare'
      ? [440, 554.37, 659.25, 880]                 // A4, C#5, E5, A5 (Bright chime)
      : [392, 493.88, 587.33];                     // G4, B4, D5 (Warm chime)

    notes.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = tier === 'epic' ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.3, now + index * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + (tier === 'epic' ? 1.2 : 0.8));

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + (tier === 'epic' ? 1.3 : 0.9));
    });
  }

  // Soft celestial wind chime during page & section transition
  playTransitionChime() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const freqs = [587.33, 880.00]; // D5, A5
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.55);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.6);
    });
  }

  // Pentatonic celebration arpeggio when preloader completes (Mid-Autumn bells)
  playPreloaderComplete() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);
      gain.gain.setValueAtTime(0, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.22, now + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.75);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.8);
    });
  }

  // Grand theatrical red curtain opening fanfare (Fabric whoosh + pentatonic celestial bell chord)
  playCurtainOpeningFanfare() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;

    // 1. Soft velvet fabric whoosh
    const duration = 0.9;
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      const white = Math.random() * 2 - 1;
      data[i] = white * Math.pow(Math.sin(Math.PI * t), 1.6);
    }
    const noiseSrc = this.ctx.createBufferSource();
    noiseSrc.buffer = buffer;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(350, now);
    lp.frequency.exponentialRampToValueAtTime(1200, now + 0.4);
    lp.frequency.exponentialRampToValueAtTime(200, now + duration);
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
    noiseSrc.connect(lp);
    lp.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noiseSrc.start(now);

    // 2. Majestic celestial opening chime arpeggio
    const notes = [261.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4, G4, C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.15 + idx * 0.08);
      gain.gain.setValueAtTime(0, now + 0.15 + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.15 + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15 + idx * 0.08 + 1.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + 0.15 + idx * 0.08);
      osc.stop(now + 0.15 + idx * 0.08 + 1.25);
    });
  }

  // Futuristic Laser Beam Slice Sound (Sustained 3.0s Cinematic Laser Charge)
  playLaserSlice(duration = 3.0) {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;

    // 1. Initial cutting strike (Slash transient)
    const slashOsc = this.ctx.createOscillator();
    const slashGain = this.ctx.createGain();
    slashOsc.type = 'sawtooth';
    slashOsc.frequency.setValueAtTime(2800, now);
    slashOsc.frequency.exponentialRampToValueAtTime(320, now + 0.35);
    slashGain.gain.setValueAtTime(0.4, now);
    slashGain.gain.exponentialRampToValueAtTime(0.02, now + 0.35);
    slashOsc.connect(slashGain);
    slashGain.connect(this.ctx.destination);
    slashOsc.start(now);
    slashOsc.stop(now + 0.38);

    // 2. Continuous 3-second energetic laser beam plasma hum (Rising pitch & volume)
    const humOsc = this.ctx.createOscillator();
    const humGain = this.ctx.createGain();
    humOsc.type = 'triangle';
    humOsc.frequency.setValueAtTime(240, now);
    humOsc.frequency.exponentialRampToValueAtTime(960, now + duration);

    // Dynamic tremolo LFO for electric laser vibration
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(16, now); // 16Hz electric buzz
    lfo.frequency.linearRampToValueAtTime(36, now + duration);
    lfoGain.gain.setValueAtTime(0.08, now);
    lfo.connect(humGain.gain);

    humGain.gain.setValueAtTime(0.08, now);
    humGain.gain.linearRampToValueAtTime(0.32, now + duration * 0.88);
    humGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    humOsc.connect(humGain);
    humGain.connect(this.ctx.destination);

    lfo.start(now);
    humOsc.start(now);
    lfo.stop(now + duration);
    humOsc.stop(now + duration);

    // 3. Sizzling high-frequency laser sparks & electric arcs across cut line
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      const isSpark = Math.random() < (0.02 + 0.06 * t);
      data[i] = isSpark ? (Math.random() * 2 - 1) * 0.85 : (Math.random() * 0.12 - 0.06);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(3200, now);
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.14, now);
    noiseGain.gain.linearRampToValueAtTime(0.4, now + duration * 0.92);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
    noise.connect(hp);
    hp.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(now);
  }

  // Card Deal Flying Slide Sound
  playCardDeal(idx = 0) {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime + idx * 0.08;
    const duration = 0.14;

    const sampleRate = this.ctx.sampleRate;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * t);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(1400, now);
    bp.frequency.exponentialRampToValueAtTime(3200, now + duration);
    bp.Q.setValueAtTime(2.0, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    noise.connect(bp);
    bp.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
  }

  // Interactive 3D Card Flip Snap + Tier-Specific Resonance
  playCardFlip(tier = 'common') {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;

    // 1. Snappy card flip click transient
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.07);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);

    // 2. Chime according to rarity
    if (tier === 'epic') {
      const notes = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6 (Brilliant Golden Chime)
      notes.forEach((freq, i) => {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, now + 0.02 + i * 0.05);
        g.gain.setValueAtTime(0, now + 0.02 + i * 0.05);
        g.gain.linearRampToValueAtTime(0.35, now + 0.02 + i * 0.05 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.02 + i * 0.05 + 0.85);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(now + 0.02 + i * 0.05);
        o.stop(now + 0.02 + i * 0.05 + 0.9);
      });
    } else if (tier === 'rare') {
      const notes = [587.33, 880.00, 1174.66]; // D5, A5, D6 (Crystal Cyan Chime)
      notes.forEach((freq, i) => {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, now + 0.02 + i * 0.05);
        g.gain.setValueAtTime(0, now + 0.02 + i * 0.05);
        g.gain.linearRampToValueAtTime(0.28, now + 0.02 + i * 0.05 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.02 + i * 0.05 + 0.65);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(now + 0.02 + i * 0.05);
        o.stop(now + 0.02 + i * 0.05 + 0.7);
      });
    } else {
      // Warm folk bell tone
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(523.25, now + 0.02);
      g.gain.setValueAtTime(0.2, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      o.connect(g);
      g.connect(this.ctx.destination);
      o.start(now + 0.02);
      o.stop(now + 0.42);
    }
  }

  // Grand Fanfare when an Epic / SSR character is discovered
  playEpicFanfare() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.32, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 1.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.25);
    });
  }
}

class GachaSimulator {
  constructor(characters, codex) {
    this.characters = characters;
    this.codex = codex;
    this.audio = new AudioSynthesizer();
    this.isRolling = false;
    this.totalPulls = 0;
    this.epicPulls = 0;

    // 5-step progressive tearing state
    this.tearStep = 0;       // 0 to 5
    this.tearProgress = 0;   // 0.0 to 1.0
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartProgress = 0;
    this.dragDistance = 0;
    this.lastDragTime = 0;

    this.initElements();
  }

  initElements() {
    this.bagWrapper = document.getElementById('interactiveBag');
    this.bagStage = document.getElementById('blindBagStage');
    this.bagPartTop = document.getElementById('bagPartTop');
    this.bagPartBottom = document.getElementById('bagPartBottom');
    this.cavityBg = document.querySelector('.bag-cavity-bg');
    this.cavityGoldGlow = document.querySelector('.bag-cavity-gold-glow');
    this.bagImage = document.querySelector('.bag-part-bottom .bag-kraft-img');
    this.tearStrip = document.getElementById('tearStripZone');
    this.tearCut = document.getElementById('tearLineCut');
    this.tearZipper = document.getElementById('tearZipper');
    this.progressFill = document.getElementById('tearProgressFill');
    this.hintBadge = document.getElementById('tearHintBadge');
    this.hintText = document.getElementById('tearHintText');
    this.countdownBadge = document.getElementById('suspenseCountdownBadge');
    this.countdownText = document.getElementById('countdownText');
    this.internalGlow = document.getElementById('bagInternalGlow');
    this.tagText = document.getElementById('bagTagText');
    this.stepPills = document.querySelectorAll('.tear-step-pill');
    this.sunburstRays = document.getElementById('sunburstRays');
    this.peekCard = document.getElementById('suspensePeekCard');
    this.flashOverlay = document.getElementById('suspenseFlashOverlay');
    this.shredsContainer = document.getElementById('paperShredsContainer');
    this.laserFlare = document.getElementById('laserFlareSlice');
    this.slitGodRays = document.getElementById('slitGodRays');

    this.btnPull1 = document.getElementById('btnPull1');
    this.btnPull5 = document.getElementById('btnPull5');
    this.revealModal = document.getElementById('revealModal');
    this.revealContent = document.getElementById('revealSingleContent');
    this.statPullsEl = document.getElementById('statTotalPulls');
    this.statEpicEl = document.getElementById('statEpicPulls');

    // Button triggers
    if (this.btnPull1) {
      this.btnPull1.addEventListener('click', () => {
        if (!this.isRolling) this.autoTearSequence(1);
      });
    }
    if (this.btnPull5) {
      this.btnPull5.addEventListener('click', () => {
        if (!this.isRolling) this.autoTearSequence(5);
      });
    }

    // Interactive Bag click and drag listeners
    this.setupInteractions();

    // Reset bag when reveal modal closes
    this.setupModalReset();
  }

  setupInteractions() {
    if (!this.bagWrapper) return;

    // --- Pointer / Mouse / Touch Dragging on the Bag & Tear Strip ---
    const handleDragStart = (clientX) => {
      if (this.isRolling) return;
      this.isDragging = true;
      this.dragStartX = clientX;
      this.dragStartProgress = this.tearProgress;
      this.dragDistance = 0;
      this.bagWrapper.style.cursor = 'grabbing';
      if (this.tearZipper) this.tearZipper.style.transform = 'translate(-50%, -50%) scale(1.25)';
    };

    const handleDragMove = (clientX) => {
      if (!this.isDragging || this.isRolling) return;
      const deltaX = clientX - this.dragStartX;
      this.dragDistance = Math.abs(deltaX);

      // Strip zone width calculation
      const stripWidth = this.tearStrip ? this.tearStrip.offsetWidth : 220;
      const progressDelta = deltaX / Math.max(160, stripWidth);
      const newProgress = Math.max(0, Math.min(1, this.dragStartProgress + progressDelta));

      // Audio feedback: crisp paper friction crackle during mouse drag
      const now = performance.now();
      if (now - this.lastDragTime > 65) {
        this.audio.playDragScrub();
        this.lastDragTime = now;
      }

      this.setProgress(newProgress);
    };

    const handleDragEnd = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.bagWrapper.style.cursor = 'pointer';
      if (this.tearZipper) this.tearZipper.style.transform = '';

      // If user merely clicked (little to no drag distance)
      if (this.dragDistance < 10) {
        this.stepTear(1);
      } else {
        // Drag ended: if close to finish, complete it, else snap to current step
        if (this.tearProgress >= 0.88) {
          this.startSuspenseSequence(1);
        } else {
          this.snapToNearestStep();
        }
      }
    };

    // Mouse events
    this.bagWrapper.addEventListener('mousedown', (e) => {
      e.preventDefault();
      handleDragStart(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        handleDragMove(e.clientX);
      }
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        handleDragEnd();
      }
    });

    // Touch events for mobile
    this.bagWrapper.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        handleDragStart(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches && e.touches[0]) {
        handleDragMove(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (this.isDragging) {
        handleDragEnd();
      }
    });

    // Keyboard accessibility: Enter or Space triggers step tear
    this.bagWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.stepTear(1);
      }
    });
  }

  setupModalReset() {
    const btnCloseReveal = document.getElementById('btnCloseReveal');
    if (btnCloseReveal) {
      btnCloseReveal.addEventListener('click', () => this.resetBag());
    }

    if (this.revealModal) {
      this.revealModal.addEventListener('click', (e) => {
        if (e.target === this.revealModal) this.resetBag();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.revealModal && this.revealModal.classList.contains('active')) {
        this.resetBag();
      }
    });
  }

  // Spawn flying paper shred flakes
  spawnPaperShreds(pctX = 0.5, count = 6) {
    if (!this.shredsContainer) return;
    const stripWidth = this.tearStrip ? this.tearStrip.offsetWidth : 220;
    const originX = (pctX * stripWidth);
    const originY = 32;

    for (let i = 0; i < count; i++) {
      const shred = document.createElement('div');
      shred.className = 'paper-shred';
      shred.style.left = `${originX}px`;
      shred.style.top = `${originY}px`;

      const tx = (Math.random() - 0.5) * 80;
      const ty = -20 - Math.random() * 60;
      const rot = (Math.random() - 0.5) * 360;

      shred.style.setProperty('--tx', `${tx}px`);
      shred.style.setProperty('--ty', `${ty}px`);
      shred.style.setProperty('--rot', `${rot}deg`);

      this.shredsContainer.appendChild(shred);
      setTimeout(() => shred.remove(), 750);
    }
  }

  // Tap / Click one step further (1/5)
  stepTear(count = 1) {
    if (this.isRolling) return;
    this.tearStep = Math.min(5, this.tearStep + count);
    this.tearProgress = this.tearStep / 5;

    this.audio.playTearStep(this.tearStep);
    this.triggerShake(this.tearStep);
    this.spawnPaperShreds(this.tearProgress, 6);
    this.updateVisuals(this.tearProgress);

    if (this.tearStep >= 5) {
      this.startSuspenseSequence(1);
    }
  }

  // Smooth progress update from dragging
  setProgress(progress) {
    this.tearProgress = Math.max(0, Math.min(1, progress));
    
    // Map progress to step
    const computedStep = Math.min(5, Math.floor(this.tearProgress * 5) + (this.tearProgress > 0 ? 1 : 0));
    if (computedStep > this.tearStep) {
      this.tearStep = computedStep;
      this.audio.playTearStep(this.tearStep);
      this.triggerShake(this.tearStep);
      this.spawnPaperShreds(this.tearProgress, 8);
    }

    this.updateVisuals(this.tearProgress);

    if (this.tearProgress >= 0.94) {
      this.startSuspenseSequence(1);
    }
  }

  snapToNearestStep() {
    this.tearProgress = this.tearStep / 5;
    this.updateVisuals(this.tearProgress);
  }

  triggerShake(step) {
    if (!this.bagStage) return;
    this.bagStage.classList.remove('shake-step-1', 'shake-step-2', 'shake-step-3', 'shake-step-4', 'bag-ripping-open');
    void this.bagStage.offsetWidth;
    this.bagStage.classList.add(`shake-step-${Math.min(4, step)}`);
  }

  updateVisuals(progress) {
    const pct = Math.round(progress * 100);

    // Update cut line & zipper handle
    if (this.tearCut) this.tearCut.style.width = `${pct}%`;
    if (this.tearZipper) this.tearZipper.style.left = `${pct}%`;

    // Update progress bar
    if (this.progressFill) this.progressFill.style.width = `${pct}%`;

    // Two-part gradual physical separation along the cut line!
    if (this.bagPartTop && this.bagPartBottom) {
      if (progress <= 0) {
        this.bagPartTop.classList.remove('top-separated', 'tearing');
        this.bagPartTop.style.transform = '';
        this.bagPartBottom.classList.remove('tearing');
        this.bagPartBottom.style.transform = '';
        if (this.cavityGoldGlow) this.cavityGoldGlow.style.opacity = '0';
        if (this.cavityBg) this.cavityBg.style.opacity = '0';
        if (this.internalGlow) this.internalGlow.style.opacity = '0';
      } else if (progress < 0.96) {
        this.bagPartTop.classList.remove('top-separated');
        this.bagPartTop.classList.add('tearing');
        this.bagPartBottom.classList.add('tearing');

        // As cut progresses: left side lifts & tilts up around right uncut hinge
        const angle = -18 * progress;       // rotate up to -17 deg
        const lift = -22 * progress;        // lift up to -21px
        const tilt = 36 * progress;         // 3D forward flare up to 34 deg
        this.bagPartTop.style.transform = `rotateZ(${angle}deg) translateY(${lift}px) rotateX(${tilt}deg)`;

        // Bottom pouch has slight weight sag
        this.bagPartBottom.style.transform = `translateY(${progress * 5}px)`;

        // TRONG QUÁ TRÌNH XÉ: KHÔNG CÓ HIỆU ỨNG TĂNG SÁNG (Glow = 0)
        // Giữ ánh sáng tự nhiên mộc mạc của túi giấy kraft
        if (this.cavityGoldGlow) this.cavityGoldGlow.style.opacity = '0';
        if (this.internalGlow) this.internalGlow.style.opacity = '0';
        if (this.cavityBg) {
          this.cavityBg.style.opacity = String(Math.min(0.85, progress * 1.2));
        }
      } else {
        // CHỈ SAU KHI XÉ HOÀN THÀNH: BỪNG SÁNG ÁNH HÀO QUANG
        this.bagPartTop.classList.add('top-separated');
        this.bagPartBottom.style.transform = 'translateY(6px)';
        if (this.cavityGoldGlow) this.cavityGoldGlow.style.opacity = '1';
        if (this.internalGlow) this.internalGlow.style.opacity = '1';
        if (this.cavityBg) this.cavityBg.style.opacity = '0.9';
      }
    }

    // Update step pills
    if (this.stepPills && this.stepPills.length) {
      this.stepPills.forEach(pill => {
        const pillStep = parseInt(pill.dataset.step, 10);
        pill.classList.remove('active', 'done');
        if (pillStep < this.tearStep) {
          pill.classList.add('done');
        } else if (pillStep === this.tearStep) {
          pill.classList.add('active');
        }
      });
    }

    // Update hint texts (Giữ cảm giác xé túi kraft chân thực)
    if (this.hintText) {
      switch (this.tearStep) {
        case 0:
          this.hintText.textContent = "Nhấn 5 lần hoặc kéo chuột qua đường xé để mở túi!";
          break;
        case 1:
          this.hintText.textContent = "🏮 Nhịp 1/5: Vết rạch hé mở từ mép trái! Nhấn thêm 4 lần...";
          break;
        case 2:
          this.hintText.textContent = "✂️ Nhịp 2/5 (40%): Cắt dọc theo nếp gấp túi giấy kraft...";
          break;
        case 3:
          this.hintText.textContent = "📜 Nhịp 3/5 (60%): Nắp túi tách dần, mở rộng khoang túi...";
          break;
        case 4:
          this.hintText.textContent = "🔥 Nhịp 4/5 (80%): Sắp đứt hẳn! Nhấn 1 lần nữa để giải phóng ánh sáng!";
          break;
        case 5:
          this.hintText.textContent = "🎉 XÉ BUNG HOÀN TẤT! BỪNG SÁNG HÀO QUANG BÍ ẨN...";
          break;
      }
    }

    if (this.tagText) {
      this.tagText.textContent = this.tearStep === 0 
        ? "Chạm 5 lần hoặc kéo chuột xé ngang" 
        : `Tiến độ xé: ${this.tearStep}/5 (${pct}%)`;
    }
  }

  // Rapid automatic 5-step unboxing when button is clicked
  autoTearSequence(count = 1) {
    if (this.isRolling) return;
    this.isRolling = true;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      this.tearStep = step;
      this.tearProgress = step / 5;
      this.audio.playTearStep(step);
      this.triggerShake(step);
      this.spawnPaperShreds(this.tearProgress, 7);
      this.updateVisuals(this.tearProgress);

      if (step >= 5) {
        clearInterval(interval);
        setTimeout(() => {
          this.startSuspenseSequence(count);
        }, 120);
      }
    }, 120);
  }

  // --- 3-SECOND DRAMATIC SUSPENSE SEQUENCE (Cinematic Upgrade) ---
  startSuspenseSequence(count = 1) {
    this.isRolling = true;
    this.tearStep = 5;
    this.tearProgress = 1.0;
    this.updateVisuals(1.0);

    // 1. Play big tear rip + Laser slice + 3.0s suspense crescendo audio
    this.audio.playTear();
    this.audio.playLaserSlice();
    this.audio.playSuspenseCharge(3.0);

    // 2. Activate Laser Flare Beam & Volumetric Slit God-Rays
    if (this.laserFlare) {
      this.laserFlare.classList.remove('active');
      void this.laserFlare.offsetWidth;
      this.laserFlare.classList.add('active');
    }
    if (this.slitGodRays) {
      this.slitGodRays.classList.add('active');
    }

    // 3. Visual bag levitation & tearing animation + confetti burst
    if (this.bagStage) {
      this.bagStage.classList.remove('shake-step-1', 'shake-step-2', 'shake-step-3', 'shake-step-4');
      this.bagStage.classList.add('bag-ripping-open');
    }
    this.spawnPaperShreds(0.5, 18);

    // 4. Activate spinning sunburst rays
    if (this.sunburstRays) {
      this.sunburstRays.classList.add('active');
    }

    // 5. Mystery Peek Card floats out of the torn bag opening
    if (this.peekCard) {
      this.peekCard.classList.add('peeking');
    }

    // 6. Show 3-second live countdown HUD
    if (this.hintBadge) this.hintBadge.style.display = 'none';
    if (this.countdownBadge) this.countdownBadge.style.display = 'inline-flex';

    let timeLeft = 3.0;
    const countdownInterval = setInterval(() => {
      timeLeft = Math.max(0, timeLeft - 0.1);
      if (this.countdownText) {
        this.countdownText.textContent = `Đang giải mã nhân vật... ${timeLeft.toFixed(1)}s`;
      }
      if (timeLeft <= 0.05) {
        clearInterval(countdownInterval);
      }
    }, 100);

    // 7. Exactly at 3.0 seconds: Screen flash + Finish Unboxing
    setTimeout(() => {
      if (this.flashOverlay) {
        this.flashOverlay.classList.add('flashing');
        setTimeout(() => {
          this.flashOverlay.classList.remove('flashing');
        }, 350);
      }

      this.finishUnboxing(count);
    }, 3000);
  }

  finishUnboxing(count = 1) {
    const results = [];
    let bestTier = 'common';

    for (let i = 0; i < count; i++) {
      const item = this.pullOne();
      results.push(item);
      this.codex.unlock(item.id);
      this.totalPulls++;

      if (item.tier === 'epic') {
        this.epicPulls++;
        bestTier = 'epic';
      } else if (item.tier === 'rare' && bestTier !== 'epic') {
        bestTier = 'rare';
      }
    }

    this.showReveal(results, bestTier);
    this.updateStats();
  }

  resetBag() {
    this.tearStep = 0;
    this.tearProgress = 0;
    this.isRolling = false;
    this.isDragging = false;

    if (this.bagStage) {
      this.bagStage.classList.remove('shake-step-1', 'shake-step-2', 'shake-step-3', 'shake-step-4', 'bag-ripping-open');
    }
    if (this.sunburstRays) {
      this.sunburstRays.classList.remove('active');
    }
    if (this.peekCard) {
      this.peekCard.classList.remove('peeking');
    }
    if (this.flashOverlay) {
      this.flashOverlay.classList.remove('flashing');
    }
    if (this.laserFlare) {
      this.laserFlare.classList.remove('active');
    }
    if (this.slitGodRays) {
      this.slitGodRays.classList.remove('active');
    }
    if (this.hintBadge) {
      this.hintBadge.style.display = 'inline-flex';
    }
    if (this.countdownBadge) {
      this.countdownBadge.style.display = 'none';
    }
    if (this.bagPartTop) {
      this.bagPartTop.classList.remove('top-separated', 'tearing');
      this.bagPartTop.style.transform = '';
    }
    if (this.bagPartBottom) {
      this.bagPartBottom.classList.remove('tearing');
      this.bagPartBottom.style.transform = '';
    }
    if (this.cavityGoldGlow) {
      this.cavityGoldGlow.style.opacity = '0';
    }
    if (this.cavityBg) {
      this.cavityBg.style.opacity = '0';
    }

    this.updateVisuals(0);
  }

  // Weighted random selection:
  // Cá Vàng: 30%, Ngôi Sao: 25%, Ngựa Phi Vân: 20%, Thỏ Ngọc: 15%, Doraemon: 7%, Đầu Lân: 3%
  pullOne() {
    const rand = Math.random() * 100;
    let accumulated = 0;

    for (const char of this.characters) {
      accumulated += char.odds;
      if (rand <= accumulated) {
        return char;
      }
    }
    return this.characters[0];
  }

  updateStats() {
    if (this.statPullsEl) this.statPullsEl.textContent = this.totalPulls;
    if (this.statEpicEl) this.statEpicEl.textContent = this.epicPulls;
  }

  // ==========================================================================
  // CINEMATIC GACHA THEATER REVEAL & 3D INTERACTIVE CARD FLIP
  // ==========================================================================
  showReveal(items, bestTier) {
    if (!this.revealModal || !this.revealContent) return;

    const titleText = bestTier === 'epic' 
      ? '✨ CHÚC MỪNG! BẠN ĐÃ MỞ TRÚNG MẪU CỰC HIẾM (SSR)! ✨' 
      : bestTier === 'rare'
      ? '⭐ TUYỆT VỜI! BẠN NHẬN ĐƯỢC MẪU HIẾM (SR)! ⭐'
      : '🏮 KẾT QUẢ MỞ TÚI MÙ THÀNH CÔNG!';

    const totalCards = items.length;

    // Render HTML layout
    this.revealContent.innerHTML = `
      <div class="gacha-stage-header">
        <div class="stage-title-wrap">
          <div class="gacha-stage-title">${titleText}</div>
          <div class="gacha-stage-subtitle" id="gachaStageSub">
            ${totalCards === 1 ? 'Chạm vào lá bài để lật mở bí ẩn!' : `Đang chia ${totalCards} thẻ bài... Chạm vào thẻ hoặc bấm "BỎ QUA" để giải mã!`}
          </div>
        </div>
        <button class="btn-gacha-skip" id="btnGachaSkip" title="Lật mở toàn bộ thẻ bài ngay lập tức">
          <span class="skip-icon">⏩</span> BỎ QUA
        </button>
      </div>

      <div class="gacha-cards-stage" id="gachaCardsStage">
        ${items.map((item, idx) => `
          <div class="gacha-card-item tier-${item.tier}" data-index="${idx}" style="animation-delay: ${idx * 0.08}s;">
            <div class="gacha-card-inner">
              <div class="card-flip-flash"></div>

              <!-- Mặt Úp: Họa Tiết Hoàng Kim & Lồng Đèn Cổ Phong -->
              <div class="card-face card-face-back">
                <div class="card-back-sheen"></div>
                <div class="back-crest-top">🏮 EM MƠ</div>
                <div class="back-emblem-center">
                  <div class="back-lantern-icon">${item.tier === 'epic' ? '👑' : (item.tier === 'rare' ? '⭐' : '🏮')}</div>
                  <div class="back-mystery-badge">${item.tier === 'epic' ? 'CỰC PHẨM' : (item.tier === 'rare' ? 'HIẾM CÓ' : 'BÍ ẨN')}</div>
                </div>
                <div class="back-tap-hint">✦ CHẠM ĐỂ LẬT ✦</div>
              </div>

              <!-- Mặt Ngửa: Nhân Vật Đã Mở Khóa -->
              <div class="card-face card-face-front">
                <span class="card-tier-pill pill-${item.tier}" style="position:static; margin-bottom:4px; font-size:0.7rem; padding:3px 10px;">
                  ${item.tierLabel}
                </span>
                <div class="front-thumb-wrap">
                  <img src="${item.image}" alt="${item.name}" draggable="false" loading="lazy">
                </div>
                <div class="front-item-name" title="${item.name}">${item.name}</div>
                <div class="front-odds-tag">Tỉ lệ xuất hiện: ${item.odds}%</div>
                <button class="front-inspect-btn" onclick="event.stopPropagation(); window.app.inspectCharacter('${item.id}')">
                  Hồ sơ chi tiết
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="gacha-stage-actions">
        <button class="btn btn-primary" id="btnRevealPullAgain">
          🎲 Xé túi khác
        </button>
        <button class="btn btn-secondary" id="btnRevealPull5Combo">
          ✨ Mở Combo 5 túi
        </button>
        <button class="btn btn-secondary" id="btnRevealOpenCodex">
          📖 Xem Sổ Tay (${this.codex.getUnlockedCount()}/${this.codex.getTotalCharacters()})
        </button>
      </div>
    `;

    this.revealModal.classList.add('active');

    // Play card deal sound for each card
    items.forEach((_, idx) => {
      this.audio.playCardDeal(idx);
    });

    const cardEls = this.revealContent.querySelectorAll('.gacha-card-item');
    const btnSkip = document.getElementById('btnGachaSkip');
    const subTitleEl = document.getElementById('gachaStageSub');

    let flippedCount = 0;

    const checkAllFlipped = () => {
      if (flippedCount >= totalCards) {
        if (btnSkip) btnSkip.style.display = 'none';
        if (subTitleEl) {
          subTitleEl.innerHTML = `Đã mở hoàn tất <strong>${totalCards}</strong> thẻ! Các nhân vật đã tự động cập nhật vào Sổ Tay.`;
        }
        this.audio.playReveal(bestTier);
        if (bestTier === 'epic') {
          this.audio.playEpicFanfare();
        }
      } else {
        if (subTitleEl) {
          subTitleEl.textContent = `Tiến độ giải mã: ${flippedCount}/${totalCards} thẻ bài. Chạm tiếp để mở!`;
        }
      }
    };

    const flipSingleCard = (cardEl, item) => {
      if (cardEl.classList.contains('flipped')) return;
      cardEl.classList.add('flipped');
      flippedCount++;

      // Flash FX
      const flash = cardEl.querySelector('.card-flip-flash');
      if (flash) {
        flash.classList.remove('trigger');
        void flash.offsetWidth;
        flash.classList.add('trigger');
      }

      // Audio feedback
      this.audio.playCardFlip(item.tier);

      checkAllFlipped();
    };

    // Attach click listeners to individual cards
    cardEls.forEach((cardEl) => {
      cardEl.addEventListener('click', (e) => {
        // If clicking the inspect button, let the inspect modal handle it
        if (e.target.closest('.front-inspect-btn')) return;

        const idx = parseInt(cardEl.dataset.index, 10);
        const item = items[idx];
        if (item) flipSingleCard(cardEl, item);
      });
    });

    // Skip button logic: Fast cascade reveal
    if (btnSkip) {
      btnSkip.addEventListener('click', () => {
        btnSkip.style.pointerEvents = 'none';
        btnSkip.style.opacity = '0.5';

        cardEls.forEach((cardEl, idx) => {
          if (!cardEl.classList.contains('flipped')) {
            setTimeout(() => {
              const itemIdx = parseInt(cardEl.dataset.index, 10);
              const item = items[itemIdx];
              if (item) flipSingleCard(cardEl, item);
            }, idx * 100);
          }
        });
      });
    }

    // Action button listeners
    const btnAgain = document.getElementById('btnRevealPullAgain');
    if (btnAgain) {
      btnAgain.addEventListener('click', () => {
        this.revealModal.classList.remove('active');
        this.resetBag();
        setTimeout(() => this.autoTearSequence(1), 300);
      });
    }

    const btnCombo = document.getElementById('btnRevealPull5Combo');
    if (btnCombo) {
      btnCombo.addEventListener('click', () => {
        this.revealModal.classList.remove('active');
        this.resetBag();
        setTimeout(() => this.autoTearSequence(5), 300);
      });
    }

    const btnCodex = document.getElementById('btnRevealOpenCodex');
    if (btnCodex) {
      btnCodex.addEventListener('click', () => {
        this.revealModal.classList.remove('active');
        this.resetBag();
        window.app.openCodex();
      });
    }
  }
}

window.GachaSimulator = GachaSimulator;
