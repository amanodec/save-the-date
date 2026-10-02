import { wedding as w } from '../data/wedding';
import Photo from './Photo';
import PaperCutout from './PaperCutout';
import { Flower, Sparkle, Confetti } from './FilmiDecor';
export function IntroScene({ enter }) {
  return <section className="scene intro" data-chapter="0" aria-label="Opening credits"><div className="scene-stage intro-stage">
    <div className="intro-opening"><span className="eyebrow">{w.openingEyebrow}</span><p>{w.opening}</p></div>
    <div className="intro-title"><span className="eyebrow">{w.production}</span><h1>{w.titleLines.map((line, i) => <span className={`intro-line intro-line-${i}`} key={line}>{line}</span>)}</h1><p className="intro-byline">{w.bride} <span className="byline-amp">&</span> {w.groom}<span className="intro-date">{w.dateLong.toUpperCase()}</span></p><div className="intro-stamp filmi-sticker" aria-hidden="true">{w.introStamp.map(line => <span key={line}>{line}</span>)}</div><div className="intro-review"><p>{w.introAside}</p><small>{w.introFinePrint}</small></div><Flower className="intro-flower"/><Sparkle className="intro-sparkle"/></div>
    <div className="intro-bottom"><div className="sound-gate"><button onClick={() => enter(true)} className="enter-button"><span className="sound-mark"><i/><i/><i/><i/></span>{w.soundCta} <span aria-hidden="true">↗</span></button><button className="silent-button" onClick={() => enter(false)}>Continue silently</button></div><p className="scroll-prompt">{w.scrollPrompt}<span className="scroll-stem"/></p></div>
  </div></section>;
}
export function ChildhoodScene({ side, chapter }) {
  const data = w.childhood[side]; const bride = side === 'bride';
  return <section className={`scene childhood ${side}`} data-chapter={chapter} aria-label={bride ? 'Her story' : 'His story'}><div className="scene-stage childhood-stage">
    <div className="childhood-copy"><span className="eyebrow">{data.cue}</span><h2>{data.title.split('\n').map(line => <span key={line}>{line}</span>)}</h2><p>{data.caption}</p><div className="childhood-note"><span>{data.note}</span><svg viewBox="0 0 160 60" fill="none" aria-hidden="true"><path d="M5 15c22 48 91 34 91 11S70 9 78 32s51 17 72-12m-24 2 25-4-4 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div></div>
    <div className="memory"><span className="memory-sticker filmi-sticker" aria-hidden="true">{data.sticker.map(line => <span key={line}>{line}</span>)}</span><div className="film-edge top"><span>{bride ? 'A' : 'B'} — 01</span><span>{data.archive}</span><span>✦</span></div><div className="memory-window"><Photo className="memory-first" src={w.photos[bride ? 'brideChild1' : 'groomChild1']} alt={`${bride ? w.bride : w.groom}’s first childhood memory`}/><Photo className="memory-second" src={w.photos[bride ? 'brideChild2' : 'groomChild2']} alt={`${bride ? w.bride : w.groom} growing up`}/></div><div className="film-edge bottom"><span className="year-first">{data.year}</span><span className="year-second">{data.secondYear}</span><span>{bride ? w.bride : w.groom} — THE EARLY YEARS</span></div></div>
    <div className="childhood-cutout" aria-hidden="true"><PaperCutout src={w.photos[bride ? 'brideAdult' : 'groomAdult']} alt={`${bride ? w.bride : w.groom}, a cutout character`}/><span className="paper-note">{bride ? w.bride : w.groom}, circa {data.secondYear}</span></div>
    <Flower className="childhood-flower"/><Sparkle className="childhood-sparkle"/>
    <span className="scene-footnote">{w.childhoodFootnote}</span>
  </div></section>;
}
export function ParallelLives() {
  return <section className="scene parallel" data-chapter="3" aria-label="Two lives drawing closer"><div className="scene-stage parallel-stage">
    <div className="parallel-heading"><span className="eyebrow">{w.lives.eyebrow}</span><h2>{w.lives.title.split('\n').map(line => <span key={line}>{line}</span>)}</h2></div>
    <div className="life life-bride"><PaperCutout src={w.photos.brideAdult} alt={`${w.bride}, on her timeline`}/><span>{w.bride}</span></div>
    <div className="life life-groom"><PaperCutout src={w.photos.groomAdult} alt={`${w.groom}, on his timeline`}/><span>{w.groom}</span></div>
    <div className="paths" aria-hidden="true"><div className="path path-left"/><div className="path path-right"/><div className="meeting-dot"/></div>
    <div className="life-years">{w.lives.years.map((year, i) => <div className={`life-year life-year-${i}`} key={year}><span>{year}</span><small>{w.lives.captions[i]}</small></div>)}</div>
    <p className="parallel-footer">{w.lives.footer}</p>
  </div></section>;
}
export function MeetingScene() {
  return <section className="scene meeting" data-chapter="4" aria-label="The meeting"><div className="scene-stage meeting-stage">
    <div className="single-path" aria-hidden="true"/>
    <div className="plot-before"><span className="eyebrow">{w.meeting.eyebrow}</span><h2>{w.meeting.before}</h2></div>
    <div className="plot-after"><h2>{w.meeting.after}</h2></div>
    <div className="meeting-pair" aria-hidden="true"><PaperCutout className="pair-bride" src={w.photos.brideAdult}/><PaperCutout className="pair-groom" src={w.photos.groomAdult}/><span className="snap-caption">{w.meeting.snapLabel}</span></div>
    <div className="camera-flash" aria-hidden="true"/>
    <div className="early-couple"><Photo src={w.photos.coupleEarly} alt={`${w.bride} and ${w.groom} together (placeholder)`}/><div className="early-caption"><span className="eyebrow">{w.meeting.photoEyebrow}</span><h2>{w.meeting.together}</h2></div></div>
  </div></section>;
}
export function CinemaTransition() {
  return <section className="scene cinema" data-chapter="5" aria-label="Their world becomes wider"><div className="scene-stage cinema-stage"><div className="cinema-frame"><Photo src={w.photos.coupleEarly} alt="A shared world, opening up (placeholder)"/><div className="cinema-shade"/><div className="cinema-copy"><span className="eyebrow">{w.cinema.eyebrow}</span><h2>{w.cinema.firstLine}<br/><em>{w.cinema.secondLine}</em></h2></div><span className="cinema-ratio" aria-hidden="true">THE NEXT CHAPTER</span></div><p className="cinema-footnote">{w.cinema.footnote}</p></div></section>;
}
export function TrailerSequence() {
  return <section className="scene trailer" data-chapter="6" aria-label="A joyful wedding trailer"><div className="scene-stage trailer-stage">
    <Confetti/>
    <span className="trailer-kicker eyebrow">{w.montage.eyebrow}</span>
    <div className="trailer-collage" aria-hidden="true">
      <div className="montage-piece montage-couple"><Photo src={w.photos.coupleEarly} alt=""/><span className="paper-tape"/></div>
      <PaperCutout className="montage-piece montage-bride" src={w.photos.brideAdult}/>
      <PaperCutout className="montage-piece montage-groom" src={w.photos.groomAdult}/>
      <div className="montage-piece montage-strip"><Photo src={w.photos.brideChild1} alt=""/><Photo src={w.photos.groomChild1} alt=""/><Photo src={w.photos.coupleEarly} alt=""/></div>
      <span className="montage-scribble scribble-one"/><span className="montage-scribble scribble-two"/>
    </div>
    {w.trailer.map((text, i) => <div className={`trailer-card trailer-card-${i}`} key={text}><span className="trailer-index">0{i + 1}</span><h2>{text.split('\n').map((line, j) => <span key={j}>{line}</span>)}</h2>{i === 3 && <p>{w.montage.aside}</p>}</div>)}
    <div className="montage-flash" aria-hidden="true"/>
  </div></section>;
}
export function FinalReveal() {
  return <section className="scene final-reveal" data-chapter="7" aria-label="The leading roles"><div className="scene-stage hero-stage"><p className="finale-quiet">{w.finale.quiet}</p><Photo className="hero-photo" src={w.photos.coupleHero} alt={`${w.bride} and ${w.groom}, the leading roles (placeholder)`}/><div className="hero-shade"/><div className="hero-names" style={{ '--name-length': Math.max(w.bride.length, w.groom.length) }}><span className="eyebrow">{w.finale.eyebrow}</span><h2><span>{w.bride}</span><em>&</em><span>{w.groom}</span></h2><p className="hero-married">{w.finale.married}</p><span className="hero-sticker filmi-sticker" aria-hidden="true">{w.finale.stamp.split('\n').map(line => <span key={line}>{line}</span>)}</span><Flower className="hero-flower"/></div></div></section>;
}
export function DateScene({ replay }) {
  return <><section className="scene date-scene" data-chapter="8" aria-label={`Save the date: ${w.dateLong}`}><div className="scene-stage date-stage"><Confetti/><div className="date-ticket"><span className="eyebrow date-label">{w.ending.save}</span><h2 className="release-date"><time dateTime={w.date}>{w.dateDisplay.split(' · ').map((part, i) => <span key={i}>{i > 0 && <b aria-hidden="true">·</b>}{part}</span>)}</time></h2><p className="coming-soon">{w.ending.soon}</p><p className="full-date">{w.dateLong}</p><div className="ticket-stub"><span>{w.ending.ticket}</span><span aria-hidden="true">M ✦ D</span></div></div><div className="production-credit"><p>STARRING {w.bride.toUpperCase()} & {w.groom.toUpperCase()} · {w.ending.credits}</p><span>{w.ending.invite}</span></div></div></section><section className="post-credits" aria-label="Post credits"><Flower className="post-flower"/><p>{w.ending.post}</p><button onClick={replay}>{w.ending.replay} <span aria-hidden="true">↗</span></button></section></>;
}
