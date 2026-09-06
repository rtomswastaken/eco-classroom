import confetti from 'canvas-confetti';

export function fireSuccessConfetti() {
  try {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#22c55e', '#16a34a', '#86efac', '#eab308']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#0ea5e9', '#38bdf8', '#10b981', '#f59e0b']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#22c55e', '#facc15', '#ec4899', '#3b82f6']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#16a34a', '#eab308', '#22d3ee']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  } catch (e) {
    console.log('Confetti effect unavailable:', e);
  }
}

export function playCelebrationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.26);
    });
  } catch {
    // AudioContext might be blocked until user gesture, ignore silently
  }
}
