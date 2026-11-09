// Small decorative layers stay separate from the painted scenery so they can
// move without stretching the architecture or the invitation text.
export function Petals({ count = 9, className = '' }) {
  return <div className={`petal-field ${className}`} aria-hidden="true">
    {Array.from({ length: count }, (_, i) => <span className="petal-track" key={i} style={{
      '--petal-x': `${(i * 37 + 11) % 100}%`, '--petal-delay': `${i * -1.73}s`,
      '--petal-duration': `${12 + i % 5 * 2}s`, '--petal-turn': `${i * 47}deg`,
    }}><i /></span>)}
  </div>;
}

export function CourtyardLayers() {
  return <div className="courtyard-layers" aria-hidden="true">
    <div className="water-light" />
    <div className="courtyard-lamps">{[0, 1, 2].map(i => <svg key={i} className={`courtyard-lamp lamp-${i}`} viewBox="0 0 80 100" fill="none">
      <ellipse className="lamp-halo" cx="40" cy="38" rx="32" ry="36" fill="url(#lamp-glow)" />
      <path className="lamp-flame" d="M40 15C43 26 52 30 46 40C43 46 34 45 33 38C31 30 39 25 40 15Z" fill="#f4d38c" />
      <path d="M17 48Q40 74 63 48Z" fill="#a77c43" /><ellipse cx="40" cy="48" rx="23" ry="5" fill="#d0a767" />
      <path d="M28 65H52M32 69H48" stroke="#b68b50" />
      {i === 0 && <defs><radialGradient id="lamp-glow"><stop stopColor="#f6c86d" stopOpacity=".35" /><stop offset="1" stopColor="#f6c86d" stopOpacity="0" /></radialGradient></defs>}
    </svg>)}</div>
    <div className="botanical-layer botanical-left"><img src="/wedding/art/floral-foreground.webp" width="650" height="975" alt="" /></div>
    <div className="botanical-layer botanical-right"><img src="/wedding/art/floral-foreground.webp" width="650" height="975" alt="" /></div>
    <Petals count={8} />
  </div>;
}

export function FamilyThread() {
  return <svg className="family-thread" viewBox="0 0 800 100" fill="none" aria-hidden="true">
    <path className="thread-left" d="M15 30H190C270 30 290 80 350 80C375 80 390 60 400 50" />
    <path className="thread-right" d="M785 30H610C530 30 510 80 450 80C425 80 410 60 400 50" />
    <path className="thread-heart" d="M400 50C360 24 380 4 400 25C420 4 440 24 400 50Z" />
    <circle cx="15" cy="30" r="3" /><circle cx="785" cy="30" r="3" />
  </svg>;
}

export function Keepsake() {
  return <div className="keepsake" aria-hidden="true">
    <div className="envelope-back" />
    <div className="envelope-flap" />
    <div className="keepsake-card">
      <span className="keepsake-blessing" lang="hi">ॐ</span>
      <small>WITH LOVE, YOU’RE INVITED</small>
      <span>Meenakshi</span><em>&</em><span>Divyam</span>
      <i /><small>01 & 02 DECEMBER 2026</small>
    </div>
    <div className="envelope-front"><span>m<i>&</i>d</span></div>
    <span className="keepsake-note">A little piece of our forever.</span>
  </div>;
}
