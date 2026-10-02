export function Flower({ className = '' }) {
  return <svg className={`filmi-flower ${className}`} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => <ellipse key={angle} cx="50" cy="25" rx="13" ry="23" fill="currentColor" transform={`rotate(${angle} 50 50)`}/>)}
    <circle cx="50" cy="50" r="13" fill="var(--pink)"/><circle cx="50" cy="50" r="5" fill="var(--ivory)"/>
  </svg>;
}

export function Sparkle({ className = '' }) {
  return <svg className={`filmi-sparkle ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M32 4c0 20-8 28-28 28 20 0 28 8 28 28 0-20 8-28 28-28C40 32 32 24 32 4Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/></svg>;
}

export function Confetti() {
  return <div className="filmi-confetti" aria-hidden="true">{[7, 19, 31, 46, 60, 74, 87, 95, 11, 24, 38, 55, 69, 81, 91, 4].map((x, i) => <i key={i} style={{ '--x': `${x}%`, '--y': `${i < 8 ? 15 + i % 3 * 7 : 73 + i % 3 * 6}%`, '--turn': `${i * 39}deg`, '--delay': `${i * -.3}s` }}/>)}</div>;
}
