/**
 * Em Mơ — Gacha Unboxing Simulator (Bộ giả lập khui túi mù 3D)
 * Realistic Kraft Paper Bag + 5-Step Progressive Tear + 3-Second Dramatic Suspense
 * Weighted RNG + Web Audio Synthesizer + Particle Shred Physics
 */

class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.tearAudioUrl = 'sound/Tear_paper.MP3';
    this.tearAudioBuffer = null;
    this.isTearLoading = false;
    this.tearAudioPool = [];

    // Delay audio (suspense countdown)
    this.delayAudioUrl = 'sound/delay_sound_effect.mp3';
    this.delayAudioBuffer = null;
    this.isDelayLoading = false;
    this.delayAudioEl = null;
    this.currentSuspenseSource = null;
    this.currentSuspenseGain = null;

    // After-delay audio (reveal & fanfare)
    this.afterDelayAudioUrl = 'sound/after_delay_sound.mp3';
    this.afterDelayAudioBuffer = null;
    this.isAfterDelayLoading = false;
    this.afterDelayAudioEl = null;
    this.currentAfterDelaySource = null;
    this.currentAfterDelayGain = null;

    this.initAudioPool();
  }

  // Pre-initialize HTML5 Audio elements for zero-delay fallback
  initAudioPool() {
    try {
      if (typeof Audio !== 'undefined') {
        for (let i = 0; i < 5; i++) {
          const a = new Audio(this.tearAudioUrl);
          a.preload = 'auto';
          this.tearAudioPool.push(a);
        }
        this.delayAudioEl = new Audio(this.delayAudioUrl);
        this.delayAudioEl.preload = 'auto';
        this.afterDelayAudioEl = new Audio(this.afterDelayAudioUrl);
        this.afterDelayAudioEl.preload = 'auto';
      }
    } catch (e) {
      console.warn('Audio element pool init notice:', e);
    }
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (!this.tearAudioBuffer && !this.isTearLoading) {
      this.loadTearAudio();
    }
    if ((!this.delayAudioBuffer && !this.isDelayLoading) || (!this.afterDelayAudioBuffer && !this.isAfterDelayLoading)) {
      this.loadDelayAndAfterDelayAudio();
    }
  }

  loadDelayAndAfterDelayAudio() {
    if (!this.ctx) return;
    
    if (!this.delayAudioBuffer && !this.isDelayLoading) {
      this.isDelayLoading = true;
      fetch(this.delayAudioUrl)
        .then(res => {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.arrayBuffer();
        })
        .then(arrayBuffer => this.ctx.decodeAudioData(arrayBuffer))
        .then(decoded => {
          this.delayAudioBuffer = decoded;
          this.isDelayLoading = false;
        })
        .catch(() => {
          this.isDelayLoading = false;
        });
    }

    if (!this.afterDelayAudioBuffer && !this.isAfterDelayLoading) {
      this.isAfterDelayLoading = true;
      fetch(this.afterDelayAudioUrl)
        .then(res => {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.arrayBuffer();
        })
        .then(arrayBuffer => this.ctx.decodeAudioData(arrayBuffer))
        .then(decoded => {
          this.afterDelayBuffer = decoded;
          this.isAfterDelayLoading = false;
        })
        .catch(() => {
          this.isAfterDelayLoading = false;
        });
    }
  }

  // Load and decode the user-provided Tear_paper.MP3 into an AudioBuffer
  loadTearAudio() {
    if (this.tearAudioBuffer || this.isTearLoading) return;
    this.isTearLoading = true;

    const decodeData = (arrayBuffer) => {
      if (!this.ctx) return;
      this.ctx.decodeAudioData(
        arrayBuffer,
        (decoded) => {
          this.tearAudioBuffer = decoded;
          this.isTearLoading = false;
        },
        (err) => {
          console.warn('Error decoding tear audio buffer:', err);
          this.isTearLoading = false;
        }
      );
    };

    // 1. Try fetching sound/Tear_paper.MP3 directly (works on http/https/localhost)
    if (typeof window !== 'undefined' && window.fetch && window.location.protocol !== 'file:') {
      fetch(this.tearAudioUrl)
        .then((res) => {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.arrayBuffer();
        })
        .then(decodeData)
        .catch(() => {
          this.decodeFromBase64(decodeData);
        });
    } else {
      // 2. Decode from window.TEAR_AUDIO_BASE64 (supports offline and file://)
      this.decodeFromBase64(decodeData);
    }
  }

  decodeFromBase64(callback) {
    try {
      const b64 = typeof window !== 'undefined' && window.TEAR_AUDIO_BASE64 ? window.TEAR_AUDIO_BASE64 : null;
      if (!b64) {
        this.isTearLoading = false;
        return;
      }
      const binaryString = window.atob(b64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      callback(bytes.buffer);
    } catch (e) {
      console.warn('Base64 tear audio decode error:', e);
      this.isTearLoading = false;
    }
  }

  // Fallback player using HTML5 Audio element pool
  playTearElement(volume = 1.0) {
    try {
      const el = this.tearAudioPool.find((a) => a.paused || a.ended) || this.tearAudioPool[0];
      if (el) {
        el.volume = Math.max(0, Math.min(1, volume));
        el.currentTime = 0;
        const p = el.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } else {
        const temp = new Audio(this.tearAudioUrl);
        temp.volume = volume;
        temp.play().catch(() => {});
      }
    } catch (e) {
      // ignore
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stopSuspenseCharge();
      this.stopAfterDelay();
    }
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

  // Authentic paper tearing step sound using provided Tear_paper.MP3 (1 to 5)
  playTearStep(step = 1) {
    if (!this.enabled) return;
    this.init();

    // Use decoded Web Audio buffer if ready
    if (this.ctx && this.tearAudioBuffer) {
      const now = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.tearAudioBuffer;

      // Realistic pitch nuance across 5 steps
      const pitch = step >= 5 ? 1.0 : (0.92 + step * 0.04);
      src.playbackRate.setValueAtTime(pitch, now);

      const gain = this.ctx.createGain();
      const vol = Math.min(1.0, 0.85 + step * 0.04);
      gain.gain.setValueAtTime(vol, now);

      // Low-frequency kraft pouch cavity thump
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(180, now);
      subOsc.frequency.exponentialRampToValueAtTime(55, now + 0.16);
      subGain.gain.setValueAtTime(0.3 + step * 0.04, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.17);

      src.connect(gain);
      gain.connect(this.ctx.destination);

      // Sliced playback: steps 1-4 play crisp progressive segments, step 5 plays full rip
      const duration = this.tearAudioBuffer.duration;
      if (step < 5) {
        const offset = Math.min(duration * 0.5, (step - 1) * 0.06);
        const playLen = 0.16 + step * 0.05;
        src.start(now, offset, playLen);
      } else {
        src.start(now, 0, duration);
      }
      return;
    }

    // Fallback: HTML5 Audio element with volume scaling
    this.playTearElement(Math.min(1.0, 0.85 + step * 0.04));
  }

  // Full authentic paper tear when bag bursts open (Step 5 / Rip Open)
  playTear() {
    if (!this.enabled) return;
    this.init();

    // Use decoded Web Audio buffer if ready
    if (this.ctx && this.tearAudioBuffer) {
      const now = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.tearAudioBuffer;
      src.playbackRate.setValueAtTime(1.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(1.0, now);

      // Sub-bass burst thump
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(200, now);
      subOsc.frequency.exponentialRampToValueAtTime(50, now + 0.22);
      subGain.gain.setValueAtTime(0.45, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.23);

      src.connect(gain);
      gain.connect(this.ctx.destination);
      src.start(now, 0, this.tearAudioBuffer.duration);
      return;
    }

    // Fallback: HTML5 Audio element
    this.playTearElement(1.0);
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

  // 3-Second Dramatic Suspense Audio Crescendo fine-tuned to exactly 3.0s using provided delay_sound_effect.mp3
  playSuspenseCharge(duration = 3.0) {
    if (!this.enabled) return;
    this.init();
    this.stopSuspenseCharge();

    const targetSec = duration || 3.0;

    // A) If Web Audio buffer of delay_sound_effect is ready:
    if (this.ctx && this.delayAudioBuffer) {
      const now = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.delayAudioBuffer;

      // The sound effect active build-up lasts ~5.143s.
      // Tuning playbackRate so the build-up reaches its full climax exactly at 3.0s!
      const activeDuration = Math.min(this.delayAudioBuffer.duration, 5.143);
      const rate = activeDuration / targetSec; // ~1.714
      src.playbackRate.setValueAtTime(rate, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.85, now);
      // Tension swells steadily to maximum at 3.0s
      gain.gain.linearRampToValueAtTime(1.0, now + targetSec * 0.88);
      gain.gain.linearRampToValueAtTime(0.92, now + targetSec);

      src.connect(gain);
      gain.connect(this.ctx.destination);
      src.start(now, 0, activeDuration);
      src.stop(now + targetSec);

      this.currentSuspenseSource = src;
      this.currentSuspenseGain = gain;
      return;
    }

    // B) HTML5 Audio Element fallback with playbackRate tuned to 3.0s
    try {
      if (this.delayAudioEl) {
        this.delayAudioEl.playbackRate = 5.143 / targetSec;
        this.delayAudioEl.currentTime = 0;
        this.delayAudioEl.volume = 0.9;
        const p = this.delayAudioEl.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
    } catch (e) {}

    // Sub-bass cinematic support
    if (this.ctx) {
      const now = this.ctx.currentTime;
      const rumbleOsc = this.ctx.createOscillator();
      const rumbleGain = this.ctx.createGain();
      rumbleOsc.type = 'triangle';
      rumbleOsc.frequency.setValueAtTime(60, now);
      rumbleOsc.frequency.exponentialRampToValueAtTime(140, now + targetSec);
      rumbleGain.gain.setValueAtTime(0.08, now);
      rumbleGain.gain.linearRampToValueAtTime(0.25, now + targetSec * 0.85);
      rumbleGain.gain.exponentialRampToValueAtTime(0.01, now + targetSec);
      rumbleOsc.connect(rumbleGain);
      rumbleGain.connect(this.ctx.destination);
      rumbleOsc.start(now);
      rumbleOsc.stop(now + targetSec);
    }
  }

  stopSuspenseCharge() {
    if (this.currentSuspenseSource) {
      try {
        this.currentSuspenseSource.stop();
      } catch (e) {}
      this.currentSuspenseSource = null;
      this.currentSuspenseGain = null;
    }
    if (this.delayAudioEl) {
      try {
        this.delayAudioEl.pause();
        this.delayAudioEl.currentTime = 0;
      } catch (e) {}
    }
  }

  // Combined Celebration & Reveal Audio (played right as 3.0s delay completes) using provided after_delay_sound.mp3
  playAfterDelay() {
    if (!this.enabled) return;
    this.init();
    this.stopAfterDelay();

    if (this.ctx && this.afterDelayBuffer) {
      const now = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.afterDelayBuffer;
      src.playbackRate.setValueAtTime(1.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.95, now);

      src.connect(gain);
      gain.connect(this.ctx.destination);
      src.start(now);

      this.currentAfterDelaySource = src;
      this.currentAfterDelayGain = gain;
      return;
    }

    // HTML5 Audio fallback
    try {
      if (this.afterDelayAudioEl) {
        this.afterDelayAudioEl.currentTime = 0;
        this.afterDelayAudioEl.volume = 0.95;
        const p = this.afterDelayAudioEl.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
    } catch (e) {}
  }

  stopAfterDelay() {
    if (this.currentAfterDelaySource) {
      try {
        if (this.currentAfterDelayGain && this.ctx) {
          const now = this.ctx.currentTime;
          this.currentAfterDelayGain.gain.linearRampToValueAtTime(0.01, now + 0.25);
          this.currentAfterDelaySource.stop(now + 0.28);
        } else {
          this.currentAfterDelaySource.stop();
        }
      } catch (e) {}
      this.currentAfterDelaySource = null;
      this.currentAfterDelayGain = null;
    }
    if (this.afterDelayAudioEl) {
      try {
        this.afterDelayAudioEl.pause();
        this.afterDelayAudioEl.currentTime = 0;
      } catch (e) {}
    }
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

    // 3. Sizzling high-frequency laser sparks & electric arcs across cut line (0.5s optimized looping buffer)
    const sampleRate = this.ctx.sampleRate;
    const bufferDuration = 0.5;
    const bufferSize = Math.floor(sampleRate * bufferDuration);
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const isSpark = Math.random() < 0.04;
      data[i] = isSpark ? (Math.random() * 2 - 1) * 0.85 : (Math.random() * 0.12 - 0.06);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    noise.loopEnd = bufferDuration;

    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(3200, now);
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.14, now);
    noiseGain.gain.linearRampToValueAtTime(0.38, now + duration * 0.9);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
    noise.connect(hp);
    hp.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(now);
    noise.stop(now + duration);
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
    this.recentPulls = [];

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

    this.recentHistoryContainer = document.getElementById('gachaRecentHistory');
    this.recentHistoryTrack = document.getElementById('recentHistoryTrack');

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

  addRecentPulls(items) {
    if (!items || !items.length) return;
    this.recentPulls = [...items, ...this.recentPulls].slice(0, 10);

    if (this.recentHistoryTrack) {
      this.recentHistoryTrack.innerHTML = this.recentPulls.map(item => `
        <div class="recent-history-chip chip-${item.tier}" onclick="window.app.inspectCharacter('${item.id}')" title="Nhấp xem chi tiết ${item.name}">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <span class="chip-name">${item.name}</span>
          <span style="font-size: 0.68rem; padding: 2px 6px; border-radius: 99px; background: rgba(0,0,0,0.4); color: ${item.tier === 'epic' ? '#f6d166' : (item.tier === 'rare' ? '#00e1d9' : '#df8a48')}">
            ${item.tier === 'epic' ? 'SSR' : (item.tier === 'rare' ? 'SR' : 'R')}
          </span>
        </div>
      `).join('');
    }
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

    // 6. Pre-calculate RNG results early to eliminate main-thread calculations at the 3.0s mark
    const precalculatedResults = [];
    let bestTier = 'common';
    for (let i = 0; i < count; i++) {
      const item = this.pullOne();
      precalculatedResults.push(item);
      if (item.tier === 'epic') {
        bestTier = 'epic';
      } else if (item.tier === 'rare' && bestTier !== 'epic') {
        bestTier = 'rare';
      }
    }

    // 7. Show 3-second live countdown HUD (Smoothed non-blocking timer)
    if (this.hintBadge) this.hintBadge.style.display = 'none';
    if (this.countdownBadge) this.countdownBadge.style.display = 'inline-flex';

    const startTime = performance.now();
    const totalDuration = 3000;
    let lastSecondText = '';

    const countdownInterval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const remainingSec = Math.max(0, (totalDuration - elapsed) / 1000);
      const textToSet = remainingSec > 0.1 ? remainingSec.toFixed(1) + 's' : '0.0s';
      
      if (this.countdownText && textToSet !== lastSecondText) {
        lastSecondText = textToSet;
        this.countdownText.textContent = `Đang giải mã nhân vật... ${textToSet}`;
      }
      
      if (remainingSec <= 0.05) {
        clearInterval(countdownInterval);
      }
    }, 120);

    // 8. Exactly at 3.0 seconds: Trigger flash overlay + Decoupled Unboxing Reveal
    setTimeout(() => {
      clearInterval(countdownInterval);

      // Stop delay sound cleanly & trigger after-delay sound effect
      this.audio.stopSuspenseCharge();
      this.audio.playAfterDelay();

      // Trigger blinding white-gold flash immediately
      if (this.flashOverlay) {
        this.flashOverlay.classList.add('flashing');
      }

      // Decouple heavy card rendering: mount cards when screen is blinded in white
      // This completely hides any DOM render/layout cost from the user!
      setTimeout(() => {
        // Unlock codex and update player stats
        precalculatedResults.forEach(item => {
          this.codex.unlock(item.id);
          this.totalPulls++;
          if (item.tier === 'epic') {
            this.epicPulls++;
          }
        });

        this.addRecentPulls(precalculatedResults);
        this.showReveal(precalculatedResults, bestTier);
        this.updateStats();

        // Fade out flash overlay smoothly after cards are mounted
        setTimeout(() => {
          if (this.flashOverlay) {
            this.flashOverlay.classList.remove('flashing');
          }
        }, 120);
      }, 70);
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

    this.addRecentPulls(results);
    this.showReveal(results, bestTier);
    this.updateStats();
  }

  resetBag() {
    this.audio.stopSuspenseCharge();
    this.audio.stopAfterDelay();
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
        <button class="btn btn-secondary btn-download-souvenir" id="btnDownloadSouvenir" title="Lưu lại tấm thẻ kỷ niệm hoàng gia kết quả mở túi">
          <span>📸 Tải Ảnh Kết Quả Kỷ Niệm</span>
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
          this.fireGoldenConfetti();
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

      // Trigger Golden Confetti on single epic discovery
      if (item.tier === 'epic') {
        this.fireGoldenConfetti();
      }

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

    const btnDownload = document.getElementById('btnDownloadSouvenir');
    if (btnDownload) {
      btnDownload.addEventListener('click', () => {
        this.downloadSouvenirCard(items);
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

  // Golden Confetti Particle Effect (SSR Celebration)
  fireGoldenConfetti() {
    let canvas = document.getElementById('gachaConfettiCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'gachaConfettiCanvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '999999';
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const colors = ['#f6d166', '#e5a93c', '#ffd700', '#fff3b0', '#ffaa00', '#ffffff', '#e60023'];
    const particleCount = 100;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: width * 0.5 + (Math.random() * 240 - 120),
        y: height * 0.42 + (Math.random() * 80 - 40),
        vx: (Math.random() - 0.5) * 18,
        vy: -Math.random() * 15 - 7,
        size: Math.random() * 8 + 6,
        aspectRatio: Math.random() * 0.6 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.18,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.14 + 0.06,
        gravity: 0.35 + Math.random() * 0.14,
        drag: 0.965,
        alpha: 1,
        decay: Math.random() * 0.006 + 0.005
      });
    }

    const startTime = performance.now();

    const renderFrame = (now) => {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      let activeCount = 0;
      particles.forEach(p => {
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotSpeed;
        p.wobble += p.wobbleSpeed;
        if (elapsed > 1.8) {
          p.alpha -= p.decay * 3.5;
        }

        if (p.alpha > 0.01 && p.y < height + 60) {
          activeCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.scale(Math.cos(p.wobble), 1);
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.shadowColor = '#e5a93c';
          ctx.shadowBlur = 8;
          ctx.fillRect(-p.size / 2, (-p.size * p.aspectRatio) / 2, p.size, p.size * p.aspectRatio);
          ctx.restore();
        }
      });

      if (activeCount > 0 && elapsed < 4.2) {
        requestAnimationFrame(renderFrame);
      } else {
        ctx.clearRect(0, 0, width, height);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }
    };

    requestAnimationFrame(renderFrame);
  }

  // Generate and Download Imperial Postcard Souvenir (Canvas 2D)
  downloadSouvenirCard(items) {
    if (!items || !items.length) return;

    // Pick featured character: priority epic > rare > common
    const tierPriority = { epic: 3, rare: 2, common: 1 };
    const sorted = [...items].sort((a, b) => (tierPriority[b.tier] || 0) - (tierPriority[a.tier] || 0));
    const featured = sorted[0];

    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 1260;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient (Deep Imperial Vermilion)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1260);
    bgGrad.addColorStop(0, '#3a0812');
    bgGrad.addColorStop(0.4, '#24040a');
    bgGrad.addColorStop(1, '#120205');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 900, 1260);

    // Radial Glow behind character
    const radGlow = ctx.createRadialGradient(450, 480, 50, 450, 480, 420);
    radGlow.addColorStop(0, featured.tier === 'epic' ? 'rgba(246, 209, 102, 0.35)' : (featured.tier === 'rare' ? 'rgba(0, 225, 217, 0.3)' : 'rgba(223, 138, 72, 0.25)'));
    radGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = radGlow;
    ctx.fillRect(0, 0, 900, 1260);

    // Golden Borders
    ctx.strokeStyle = '#e5a93c';
    ctx.lineWidth = 3.5;
    ctx.strokeRect(34, 34, 832, 1192);

    ctx.strokeStyle = '#f6d166';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(46, 46, 808, 1168);

    // Corner Accents
    const drawCornerOrnament = (x, y) => {
      ctx.save();
      ctx.fillStyle = '#f6d166';
      ctx.shadowColor = '#f6d166';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    drawCornerOrnament(46, 46);
    drawCornerOrnament(854, 46);
    drawCornerOrnament(46, 1214);
    drawCornerOrnament(854, 1214);

    // Top Header Banner
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f6d166';
    ctx.font = '700 16px "Inter", "Segoe UI", sans-serif';
    ctx.fillText('✦ DỰ ÁN TÚI MÙ TRUNG THU GÂY QUỸ THIỆN NGUYỆN ✦', 450, 96);

    ctx.font = 'bold 38px "Fraunces", Georgia, serif';
    ctx.fillStyle = '#fff4d4';
    ctx.shadowColor = 'rgba(246, 209, 102, 0.5)';
    ctx.shadowBlur = 12;
    ctx.fillText('EM MƠ · KHOẢNH KHẮC KỲ DUYÊN', 450, 148);
    ctx.shadowBlur = 0;

    ctx.font = 'italic 16px "Inter", "Segoe UI", sans-serif';
    ctx.fillStyle = 'rgba(255, 238, 220, 0.75)';
    ctx.fillText('Chứng nhận kết quả mở túi mù hoàng gia mùa Lễ hội', 450, 180);

    // Decorative Separator
    ctx.strokeStyle = 'rgba(246, 209, 102, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(250, 205);
    ctx.lineTo(650, 205);
    ctx.stroke();

    ctx.fillStyle = '#f6d166';
    ctx.font = '16px serif';
    ctx.fillText('❖', 450, 210);

    // Render Character and Export
    const renderContentAndSave = (imgEl) => {
      const imgX = 270;
      const imgY = 240;
      const imgSize = 360;
      const radius = 24;

      // Glow behind image frame
      ctx.save();
      ctx.shadowColor = featured.tier === 'epic' ? '#f6d166' : (featured.tier === 'rare' ? '#00e1d9' : '#df8a48');
      ctx.shadowBlur = 24;
      ctx.strokeStyle = featured.tier === 'epic' ? '#f6d166' : (featured.tier === 'rare' ? '#00e1d9' : '#e5a93c');
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(imgX, imgY, imgSize, imgSize, radius);
      ctx.stroke();
      ctx.restore();

      // Clip image to rounded rectangle
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(imgX, imgY, imgSize, imgSize, radius);
      ctx.clip();
      if (imgEl) {
        ctx.drawImage(imgEl, imgX, imgY, imgSize, imgSize);
      } else {
        ctx.fillStyle = '#22060b';
        ctx.fillRect(imgX, imgY, imgSize, imgSize);
      }
      ctx.restore();

      // Tier Badge Pill
      const tierBadgeY = 645;
      const tierColor = featured.tier === 'epic' ? '#f6d166' : (featured.tier === 'rare' ? '#00e1d9' : '#df8a48');
      const tierLabel = featured.tier === 'epic' ? '👑 CỰC PHẨM HOÀNG KIM (SSR)' : (featured.tier === 'rare' ? '⭐ PHẨM VẬT HIẾM CÓ (SR)' : '🏮 PHẨM VẬT PHỔ BIẾN (R)');
      
      ctx.fillStyle = 'rgba(20, 3, 7, 0.85)';
      ctx.strokeStyle = tierColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(260, tierBadgeY, 380, 42, 21);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = tierColor;
      ctx.font = 'bold 15px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(tierLabel, 450, tierBadgeY + 27);

      // Character Name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Fraunces", Georgia, serif';
      ctx.shadowColor = 'rgba(246, 209, 102, 0.4)';
      ctx.shadowBlur = 10;
      ctx.fillText(featured.name, 450, 735);
      ctx.shadowBlur = 0;

      // Odds Tag
      ctx.fillStyle = 'rgba(255, 238, 220, 0.8)';
      ctx.font = '600 15px "Inter", sans-serif';
      ctx.fillText(`Tỉ lệ xuất hiện toàn máy chủ: ${featured.odds}% · Độ tinh xảo: ${featured.craftStars || '★★★★☆'}`, 450, 770);

      // Flavor description
      ctx.fillStyle = 'rgba(255, 238, 220, 0.7)';
      ctx.font = 'italic 16px "Inter", sans-serif';
      const flavorText = `"${featured.flavor}"`;
      ctx.fillText(flavorText, 450, 815);

      // If Combo 5: Draw thumbnails row
      if (items.length > 1) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        ctx.roundRect(100, 860, 700, 110, 16);
        ctx.fill();
        ctx.strokeStyle = 'rgba(246, 209, 102, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = 'rgba(246, 209, 102, 0.85)';
        ctx.font = '600 13px "Inter", sans-serif';
        ctx.fillText('COMBO 5 TÚI ĐÃ KHUI TRONG LƯỢT:', 450, 888);

        const slotW = 120;
        const startX = 450 - ((items.length - 1) * slotW) / 2;
        items.forEach((it, i) => {
          const cx = startX + i * slotW;
          ctx.fillStyle = it.tier === 'epic' ? '#f6d166' : (it.tier === 'rare' ? '#00e1d9' : '#df8a48');
          ctx.font = 'bold 13px "Inter", sans-serif';
          ctx.fillText(it.name.length > 13 ? it.name.slice(0, 12) + '…' : it.name, cx, 925);
          ctx.font = '11px "Inter", sans-serif';
          ctx.fillStyle = 'rgba(255, 238, 220, 0.6)';
          ctx.fillText(it.tierLabel, cx, 945);
        });
      }

      // Project & Charity Mission Statement
      const footerBoxY = 1000;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.roundRect(80, footerBoxY, 740, 120, 14);
      ctx.fill();
      ctx.strokeStyle = 'rgba(246, 209, 102, 0.25)';
      ctx.stroke();

      ctx.fillStyle = '#f6d166';
      ctx.font = 'bold 15px "Inter", sans-serif';
      ctx.fillText('TRÁI TIM DỰ ÁN & SỨ MỆNH VÌ CỘNG ĐỒNG', 450, footerBoxY + 35);

      ctx.fillStyle = 'rgba(255, 238, 220, 0.75)';
      ctx.font = '13px "Inter", sans-serif';
      ctx.fillText('Toàn bộ lợi nhuận ròng được trao gửi đến hoạt động thiện nguyện tại các trường tiểu học khó khăn.', 450, footerBoxY + 62);
      ctx.fillText('Nhóm TECHCORN · ĐH FPT (SSG105) · 2026', 450, footerBoxY + 86);

      // Bottom Timestamp
      const nowStr = new Date().toLocaleString('vi-VN');
      ctx.fillStyle = 'rgba(255, 238, 220, 0.45)';
      ctx.font = '12px "Inter", sans-serif';
      ctx.fillText(`Thời khắc ghi nhận: ${nowStr} · ID: SSG105-${Math.floor(100000 + Math.random() * 900000)}`, 450, 1160);

      // Trigger Download
      try {
        const link = document.createElement('a');
        link.download = `EmMo_KyNiem_${featured.id}_${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        const btnDownload = document.getElementById('btnDownloadSouvenir');
        if (btnDownload) {
          const originalText = btnDownload.innerHTML;
          btnDownload.innerHTML = '<span>✅ Đã Tải Ảnh Kỷ Niệm!</span>';
          setTimeout(() => {
            btnDownload.innerHTML = originalText;
          }, 2500);
        }
      } catch (err) {
        console.error('Lỗi khi tải ảnh kỷ niệm:', err);
      }
    };

    // Preload image
    const charImg = new Image();
    charImg.crossOrigin = 'anonymous';
    charImg.onload = () => renderContentAndSave(charImg);
    charImg.onerror = () => renderContentAndSave(null);
    charImg.src = featured.image;
  }
}

window.GachaSimulator = GachaSimulator;
