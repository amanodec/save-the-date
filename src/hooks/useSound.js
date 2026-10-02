import { useCallback, useEffect, useRef, useState } from 'react';
import { wedding } from '../data/wedding';
export function useSound() {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState('');
  const audio = useRef(null);
  const synth = useRef(null);
  const desired = useRef(false);
  const toggle = useCallback(async () => {
    const next = !desired.current;
    try {
      if (wedding.audio.src) {
        if (!audio.current) { audio.current = new Audio(wedding.audio.src); audio.current.loop = true; audio.current.volume = wedding.audio.volume; }
        if (next) await audio.current.play(); else audio.current.pause();
      } else {
        if (!synth.current) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (!AudioContext) throw new Error('Audio unavailable');
          const ctx = new AudioContext();
          const gain = ctx.createGain(); gain.gain.value = 0; gain.connect(ctx.destination);
          const nodes = [130.81, 196, 261.63, 329.63].map((frequency, index) => {
            const oscillator = ctx.createOscillator(); oscillator.type = 'sine'; oscillator.frequency.value = frequency;
            oscillator.detune.value = index % 2 ? 3 : -3;
            const voice = ctx.createGain(); voice.gain.value = 0.22 / (index + 1);
            oscillator.connect(voice); voice.connect(gain); oscillator.start(); return oscillator;
          });
          synth.current = { ctx, gain, nodes };
        }
        await synth.current.ctx.resume();
        synth.current.gain.gain.setTargetAtTime(next ? 0.12 : 0, synth.current.ctx.currentTime, 0.5);
      }
      desired.current = next; setPlaying(next); setError('');
    } catch { desired.current = false; setPlaying(false); setError('Sound couldn’t start. Enjoy the film silently.'); }
  }, []);
  useEffect(() => {
    const visibility = () => {
      if (document.hidden) { audio.current?.pause(); synth.current?.ctx.suspend(); }
      else if (desired.current) { audio.current?.play().catch(() => { desired.current = false; setPlaying(false); }); synth.current?.ctx.resume(); }
    };
    document.addEventListener('visibilitychange', visibility);
    return () => { document.removeEventListener('visibilitychange', visibility); audio.current?.pause(); synth.current?.nodes.forEach(node => node.stop()); synth.current?.ctx.close(); };
  }, []);
  return { playing, toggle, error };
}
