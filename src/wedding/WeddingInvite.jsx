import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { wedding } from '../data/wedding';
import { useSound } from '../hooks/useSound';
import { getCountdown, invitation, rsvpUrl } from './invitation';
import { CourtyardLayers, FamilyThread, Keepsake, Petals } from './Atmosphere';
import { useWeddingMotion } from './useWeddingMotion';
import { prepareInvitation } from './prepareInvitation';

const invitationAudio = {
  src: new URL('../music/laavan.mp3', import.meta.url).href,
  volume: 0.28,
};

function Icon({ name, ...props }) {
  const paths = {
    arrow: <><path d="M4 12h15M13 5l7 7-7 7" /></>,
    down: <><path d="M12 3v17M5 13l7 7 7-7" /></>,
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 2v6m10-6v6M3 11h18m-13 5h3" /></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></>,
    whatsapp: <><path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.2-4.6a8.5 8.5 0 1 1 16.3-3.9Z" /><path d="m8 7 2 3-1 1c1 2 2 3 4 3l1-1 3 1c0 2-2 3-4 2-4-1-7-4-7-7 0-1 1-2 2-2Z" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>;
}

function Flourish({ className = '' }) {
  return <svg className={`flourish ${className}`} viewBox="0 0 180 40" fill="none" aria-hidden="true"><path d="M5 20h53c18 0 22-17 32-17s14 17 32 17h53M5 20h53c18 0 22 17 32 17s14-17 32-17h53" stroke="currentColor" strokeWidth=".7" /><path d="m90 9 7 11-7 11-7-11Z" stroke="currentColor" strokeWidth=".7" /><circle cx="5" cy="20" r="2" fill="currentColor" /><circle cx="175" cy="20" r="2" fill="currentColor" /></svg>;
}

function Countdown() {
  const [time, setTime] = useState(() => getCountdown());
  useEffect(() => { const interval = setInterval(() => setTime(getCountdown()), 1000); return () => clearInterval(interval); }, []);
  return <section className="countdown-section motion-scene" aria-labelledby="countdown-title">
    <span className="eyebrow">A LITTLE CLOSER TO FOREVER</span>
    <h2 id="countdown-title">{time.event ? <>Counting the days.<br /><em>Saving you a dance.</em></> : <>The wait is over.<br /><em>Let’s celebrate love.</em></>}</h2>
    {time.event && <><div className="countdown" role="timer" aria-label={`Until the ${time.event.id}`}>
      {['days', 'hours', 'minutes', 'seconds'].map(unit => <div className="countdown-unit" key={unit}><span>{String(time[unit]).padStart(2, '0')}</span><small>{unit}</small></div>)}
    </div><p className="countdown-note">Until {time.event.title.toLowerCase()} · {time.event.dateLabel} · 7:00 PM</p></>}
    {!time.event && <p className="countdown-note">1 & 2 December 2026 · Memories for a lifetime.</p>}
  </section>;
}

function EventCard({ event, index }) {
  return <article className={`event-card ${event.id} motion-scene`}>
    <div className="event-art"><img src={event.image} alt={event.imageAlt} loading="lazy" width="1536" height="1024" /><span className="event-number">CHAPTER {String(index + 1).padStart(2, '0')}</span>{event.id === 'baraat' && <Petals count={12} className="marigold-petals" />}</div>
    <div className="event-content"><div className="event-kicker">{event.id === 'engagement' ? <><svg className="ceremony-rings" viewBox="0 0 110 65" fill="none" aria-hidden="true"><circle cx="40" cy="33" r="26" /><circle cx="73" cy="33" r="26" /><path d="m35 7 5-6 5 6" /></svg><span>FIRST, A LITTLE SPARKLE.</span></> : <><span className="baraat-script">Full dhamaal.</span><span>THEN, A LITTLE EXTRA FILMY.</span></>}</div><div className="event-heading"><div><span className="eyebrow">{event.day.toUpperCase()}</span><h3>{event.title}</h3></div><div className="event-date"><span>{event.shortDate}</span><small>{event.month}</small></div></div>
      <p className="event-hindi">{event.hindi}</p><p className="event-description">{event.description}</p>
      <div className="event-details"><span><Icon name="calendar" />{event.dateLabel}</span><span><i className="time-dot" />{event.time}</span><a href={invitation.mapsUrl} target="_blank" rel="noreferrer"><Icon name="pin" />{invitation.venue}<span aria-hidden="true">↗</span></a></div>
    </div>
  </article>;
}

export default function WeddingInvite() {
  const [phase, setPhase] = useState('closed');
  const root = useRef(null);
  const main = useRef(null);
  const entryRequest = useRef(null);
  const sound = useSound(invitationAudio);
  const opened = phase === 'open';
  const startEntrance = useWeddingMotion(root);

  useLayoutEffect(() => {
    const documentRoot = document.documentElement;
    documentRoot.classList.toggle('invitation-locked', !opened);
    return () => { documentRoot.classList.remove('invitation-locked'); };
  }, [opened]);
  useEffect(() => () => entryRequest.current?.abort(), []);
  useLayoutEffect(() => {
    if (phase === 'opening') startEntrance(() => setPhase('open'));
  }, [phase, startEntrance]);
  useEffect(() => {
    if (!opened) return;
    const scenes = [...root.current.querySelectorAll('.motion-scene')];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.classList.toggle('is-active', entry.isIntersecting);
    }), { threshold: 0 });
    scenes.forEach(element => observer.observe(element));
    main.current?.focus({ preventScroll: true });
    const onVisibility = () => root.current?.classList.toggle('motion-paused', document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    onVisibility();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [opened]);

  async function openInvitation(withSound) {
    if (phase !== 'closed' || entryRequest.current) return;
    const request = new AbortController();
    entryRequest.current = request;
    if (withSound && !sound.playing) void sound.toggle();
    setPhase('preparing');
    window.scrollTo({ top: 0, behavior: 'instant' });
    await prepareInvitation(root.current.querySelector('.wedding-hero'), document.fonts);
    if (!request.signal.aborted) setPhase('opening');
  }

  return <div ref={root} className={`wedding-invite phase-${phase}`}>
    <div className="paper-grain" aria-hidden="true" />
    {phase !== 'open' && <div className="invitation-cover" role="dialog" aria-modal="true" aria-labelledby="cover-title">
      <div className="cover-door cover-door-left" aria-hidden="true"><div className="door-arch" /><div className="door-inlay" /></div><div className="cover-door cover-door-right" aria-hidden="true"><div className="door-arch" /><div className="door-inlay" /></div>
      <div className="cover-content">
        <span className="cover-blessing" lang="hi">ॐ</span><span className="eyebrow">A WEDDING. A CELEBRATION. A LITTLE MAGIC.</span>
        <div className="cover-seal" aria-hidden="true"><span>m<i>&</i>d</span><svg viewBox="0 0 180 180"><circle cx="90" cy="90" r="84" /><circle cx="90" cy="90" r="77" strokeDasharray="1 5" /></svg></div>
        <h1 id="cover-title">Meenakshi <em>&</em> Divyam</h1><p className="cover-date">01 & 02 DECEMBER 2026</p>
        <Flourish /><p className="cover-note">Some celebrations are incomplete without you.</p>
        <button className="button button-gold cover-open" onClick={() => openInvitation(true)} disabled={phase !== 'closed'} aria-busy={phase === 'preparing'}>{phase === 'preparing' ? 'Opening your invitation' : 'Open your invitation'} <Icon name="arrow" /></button>
        <button className="silent-entry" onClick={() => openInvitation(false)} disabled={phase !== 'closed'}>Enter without music</button>
        <span className="cover-footer">WITH LOVE, THE SHARMA & THAPA FAMILIES</span>
      </div>
    </div>}

    <div inert={!opened ? true : undefined} className="invite-world">
      <a className="skip-link" href="#celebrations">Skip to the celebrations</a>
      <header className="invite-header"><a className="monogram" href="#home" aria-label="Meenakshi and Divyam, back to top">m<span>&</span>d</a><nav aria-label="Invitation"><a href="#celebrations">The celebrations</a><a href="#venue">The venue</a><a href="#rsvp" className="header-rsvp">RSVP <span aria-hidden="true">↗</span></a></nav><button className="music-button" onClick={sound.toggle} aria-label={sound.playing ? 'Pause the music' : 'Play the music'} aria-pressed={sound.playing}><span className={`music-bars ${sound.playing ? 'playing' : ''}`} aria-hidden="true"><i /><i /><i /><i /></span><span>{sound.playing ? 'Music on' : 'Music off'}</span></button></header>

      <main ref={main} tabIndex="-1" id="invitation">
        <section className="wedding-hero motion-scene" id="home" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true"><img src="/wedding/art/courtyard.webp" alt="" fetchPriority="high" width="1024" height="1536" /><div className="hero-art-shade" /></div>
          <div className="hero-stars" aria-hidden="true">{Array.from({ length: 15 }, (_, index) => <i key={index} style={{ '--x': `${(index * 31 + 7) % 100}%`, '--y': `${(index * 17 + 10) % 90}%`, '--delay': `${index * -0.7}s` }} />)}</div>
          <CourtyardLayers />
          <div className="hero-copy"><div className="hero-blessing"><span lang="hi">ॐ</span><span className="eyebrow">WITH BLESSINGS, LOVE & A LITTLE STARDUST</span></div>
            <p className="hero-prelude">Together with our families,<br />we invite you to celebrate the wedding of</p>
            <h1 id="hero-title"><span className="name-line"><span>Meenakshi</span></span><em>&</em><span className="name-line"><span>Divyam</span></span></h1><Flourish />
            <p className="hero-tagline">Two hearts. Two families.<br /><em>One beautiful beginning.</em></p>
            <div className="hero-date"><span>01 & 02</span><div>DECEMBER<br /><b>2026</b></div><i /><div>GULATI BHAWAN<br /><b>7:00 PM ONWARDS</b></div></div>
          </div>
          <a className="hero-scroll" href="#families"><span>THE NEXT CHAPTER BEGINS</span><Icon name="down" /></a><span className="hero-aside" aria-hidden="true">A little filmy. A lot of forever.</span>
        </section>

        <section className="family-section section-padding" id="families" aria-labelledby="family-title">
          <div className="section-heading reveal"><span className="eyebrow">THE SHARMA & THAPA FAMILIES</span><h2 id="family-title">With full hearts,<br /><em>we’re becoming family.</em></h2><p>With the blessings of the Almighty and our elders,<br className="desktop-break" /> our families joyfully invite you to share in our wedding celebrations.</p></div>
          <div className="family-names"><div className="family-bride"><span className="eyebrow">DAUGHTER OF</span><p>{invitation.brideParents}</p><h3>{invitation.bride}</h3></div><span className="family-join" aria-hidden="true">&</span><div className="family-groom"><span className="eyebrow">SON OF</span><p>{invitation.groomParents}</p><h3>{invitation.groom}</h3></div></div>
          <FamilyThread />
        </section>

        <section className="love-section section-padding" aria-labelledby="love-title"><div className="couple-frame"><div className="couple-arch"><img src={wedding.photos.coupleHero.src} srcSet={wedding.photos.coupleHero.srcSet} sizes="(max-width: 700px) 85vw, 430px" alt="Meenakshi and Divyam sharing a happy moment together outdoors" loading="lazy" width="1020" height="1541" /></div><span className="photo-caption">Our favourite place? Together.</span><span className="photo-sparkle sparkle-one" aria-hidden="true">✧</span><span className="photo-sparkle sparkle-two" aria-hidden="true">✧</span></div>
          <div className="love-copy reveal"><span className="eyebrow">FROM THE TRAILER TO FOREVER</span><h2 id="love-title">Picture abhi<br /><em>baaki hai.</em></h2><Flourish /><p>You’ve seen our little love story.<br />Now, come be a part of our biggest chapter.</p><p>There will be happy tears, slightly dramatic entrances, and absolutely no sitting out the dancing.</p><span className="handwritten">Aap bas aa jaana.<svg className="love-underline" viewBox="0 0 300 30" fill="none" aria-hidden="true"><path d="M5 20C70 3 175 4 292 12M70 26C145 14 210 16 259 20" /></svg></span><a className="text-link" href="/savethedate/" target="_blank" rel="noreferrer">Revisit our save-the-date <Icon name="arrow" /></a></div>
        </section>

        <Countdown />

        <section className="celebrations-section section-padding" id="celebrations" aria-labelledby="celebrations-title"><div className="section-heading reveal"><span className="eyebrow">TWO EVENINGS. A LIFETIME OF MEMORIES.</span><h2 id="celebrations-title">Let the <em>celebrations</em> begin.</h2><p>A little sparkle on the first. Full dhamaal on the second.<br />Your presence is the part we’re looking forward to most.</p></div><div className="events-grid">{invitation.events.map((event, index) => <div className="event-chapter" key={event.id}>{index > 0 && <div className="evening-bridge" aria-hidden="true"><span>One evening to sparkle.</span><span>One evening to <em>let loose.</em></span><Flourish /></div>}<EventCard event={event} index={index} /></div>)}</div></section>

        <section className="venue-section" id="venue" aria-labelledby="venue-title"><div className="venue-art" aria-hidden="true"><img src="/wedding/art/courtyard.webp" loading="lazy" alt="" width="1024" height="1536" /></div><div className="venue-copy reveal"><Icon name="pin" width="32" height="32" /><span className="eyebrow">ONE PLACE. SO MANY BEAUTIFUL MOMENTS.</span><h2 id="venue-title">Gulati<br /><em>Bhawan.</em></h2><p>The setting for both our evenings.<br />The engagement. The baraat. And you.</p><a className="button button-gold" href={invitation.mapsUrl} target="_blank" rel="noreferrer">Find your way to us <Icon name="arrow" /></a><span className="venue-caption">Opens directions in Google Maps</span></div></section>

        <section className="rsvp-section section-padding" id="rsvp" aria-labelledby="rsvp-title"><div className="section-heading reveal"><span className="eyebrow">THE GUEST LIST IS MISSING OUR FAVOURITE NAME. YOURS.</span><h2 id="rsvp-title">Humari khushi.<br /><em>Aapke bina adhoori.</em></h2><p>We’ve saved you a place in our celebration.<br />Let us know you’ll be there with a little hello on WhatsApp.</p><a className="button button-wine" href={rsvpUrl()} target="_blank" rel="noreferrer"><Icon name="whatsapp" />RSVP on WhatsApp<Icon name="arrow" /></a><span className="rsvp-number">+91 83349 07636</span><div className="rsvp-secondary"><Keepsake /><a className="text-link" href="/wedding/Meenakshi-Divyam-Wedding-Invitation.jpg" download><Icon name="download" />Keep a little invitation</a><span>Save it. Share it. See you there.</span></div></div></section>
      </main>
      <footer className="invite-footer"><Flourish /><p>Meenakshi <em>&</em> Divyam</p><span>01 & 02 DECEMBER 2026 · GULATI BHAWAN</span><small>With love, laughter aur happily ever after.</small><a href="#home">Back to the beginning ↑</a></footer>
      <div className="guest-dock"><a href="#celebrations"><Icon name="calendar" />The celebrations</a><a href={rsvpUrl()} target="_blank" rel="noreferrer"><Icon name="whatsapp" />RSVP<Icon name="arrow" width="16" height="16" /></a></div>
      {sound.error && <p className="music-error" role="status">Music couldn’t start. You can try again using the music button.</p>}
    </div>
  </div>;
}
