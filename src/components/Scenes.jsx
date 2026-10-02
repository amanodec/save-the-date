import { wedding as w } from '../data/wedding';
import Photo from './Photo';
export function IntroScene({ enter }) {
  return <section className="scene intro" data-chapter="0" aria-label="Opening credits"><div className="scene-stage intro-stage">
    <div className="intro-opening"><span className="eyebrow">SOME STORIES TAKE THEIR TIME</span><p>{w.opening}</p></div>
    <div className="intro-title"><span className="eyebrow">{w.production}</span><h1>{w.titleLines[0]}<br/><em>{w.titleLines[1]}</em> {w.titleLines[2]}<br/>{w.titleLines[3]}</h1><p className="intro-byline">{w.bride} & {w.groom}<span>{w.dateLong.toUpperCase()}</span></p></div>
    <div className="intro-bottom"><div className="sound-gate"><button onClick={() => enter(true)} className="enter-button"><span className="sound-mark"><i/><i/><i/><i/></span>Enter with sound <span aria-hidden="true">↗</span></button><button className="silent-button" onClick={() => enter(false)}>Continue silently</button></div><p className="scroll-prompt">SCROLL TO UNFOLD THE STORY<span className="scroll-stem"/></p></div>
  </div></section>;
}
export function ChildhoodScene({ side, chapter }) {
  const data = w.childhood[side]; const bride = side === 'bride';
  return <section className={`scene childhood ${side}`} data-chapter={chapter} aria-label={bride ? 'Her story' : 'His story'}><div className="scene-stage childhood-stage">
    <div className="childhood-copy"><span className="eyebrow">{data.cue}</span><h2>{data.title}</h2><p>{data.caption}</p></div>
    <div className="memory"><div className="film-edge top"><span>{bride ? 'A' : 'B'} — 01</span><span>35 MM / A MEMORY</span><span>◦</span></div><div className="memory-window"><Photo className="memory-first" src={w.photos[bride ? 'brideChild1' : 'groomChild1']} alt={`${bride ? w.bride : w.groom}’s first childhood memory (placeholder)`}/><Photo className="memory-second" src={w.photos[bride ? 'brideChild2' : 'groomChild2']} alt={`${bride ? w.bride : w.groom} growing up (placeholder)`}/></div><div className="film-edge bottom"><span className="year-first">{data.year}</span><span className="year-second">{data.secondYear}</span><span>THE EARLY YEARS</span></div></div>
    <span className="scene-footnote">BEFORE THERE WAS AN “US”.</span>
  </div></section>;
}
export function ParallelLives() {
  return <section className="scene parallel" data-chapter="3" aria-label="Two lives drawing closer"><div className="scene-stage parallel-stage">
    <div className="parallel-heading"><span className="eyebrow">{w.lives.eyebrow}</span><h2>{w.lives.title}</h2></div>
    <div className="life life-bride"><Photo src={w.photos.brideAdult} alt={`${w.bride}’s portrait (placeholder)`}/><span>{w.bride}</span></div>
    <div className="life life-groom"><Photo src={w.photos.groomAdult} alt={`${w.groom}’s portrait (placeholder)`}/><span>{w.groom}</span></div>
    <div className="paths" aria-hidden="true"><div className="path path-left"/><div className="path path-right"/><div className="meeting-dot"/></div>
    <div className="life-years">{w.lives.years.map((year, i) => <div className={`life-year life-year-${i}`} key={year}><span>{year}</span><small>{w.lives.captions[i]}</small></div>)}</div>
    <p className="parallel-footer">{w.lives.footer}</p>
  </div></section>;
}
export function MeetingScene() {
  return <section className="scene meeting" data-chapter="4" aria-label="The meeting"><div className="scene-stage meeting-stage"><div className="single-path" aria-hidden="true"/><div className="plot-before"><span className="eyebrow">A SMALL MOMENT. A DIFFERENT EVERYTHING.</span><h2>{w.meeting.before}</h2></div><div className="plot-after"><h2>{w.meeting.after}</h2></div><div className="early-couple"><Photo src={w.photos.coupleEarly} alt={`${w.bride} and ${w.groom} together (placeholder)`}/><div className="early-caption"><span className="eyebrow">THE BEGINNING OF EVERYTHING ELSE</span><h2>{w.meeting.together}</h2></div></div></div></section>;
}
export function CinemaTransition() {
  return <section className="scene cinema" data-chapter="5" aria-label="Their world becomes wider"><div className="scene-stage cinema-stage"><div className="cinema-frame"><Photo src={w.photos.coupleEarly} alt="A shared world, opening up (placeholder)"/><div className="cinema-shade"/><div className="cinema-copy"><span className="eyebrow">SAME STORY. A WHOLE NEW FRAME.</span><h2>A wider world.<br/><em>Together.</em></h2></div><span className="cinema-ratio" aria-hidden="true">THE NEXT CHAPTER</span></div><p className="cinema-footnote">{w.meeting.caption}</p></div></section>;
}
export function TrailerSequence() {
  return <section className="scene trailer" data-chapter="6" aria-label="The wedding trailer"><div className="scene-stage trailer-stage"><span className="trailer-kicker eyebrow">AND NOW, THE PART WE’VE BEEN WAITING FOR.</span>{w.trailer.map((text, i) => <div className={`trailer-card trailer-card-${i}`} key={text}><span className="trailer-index">0{i + 1}</span><h2>{text.split('\n').map((line, j) => <span key={j}>{line}</span>)}</h2>{i === 3 && <p>You’ve been warned.</p>}</div>)}</div></section>;
}
export function FinalReveal() {
  return <section className="scene final-reveal" data-chapter="7" aria-label="The leading roles"><div className="scene-stage hero-stage"><Photo className="hero-photo" src={w.photos.coupleHero} alt={`${w.bride} and ${w.groom}, the leading roles (placeholder)`}/><div className="hero-shade"/><div className="hero-names" style={{ '--name-length': Math.max(w.bride.length, w.groom.length) }}><span className="eyebrow">A LIFETIME IN THE MAKING</span><h2><span>{w.bride}</span><em>&</em><span>{w.groom}</span></h2><span className="hero-credit">TWO STORIES. ONE FILM.</span></div></div></section>;
}
export function DateScene({ replay }) {
  return <><section className="scene date-scene" data-chapter="8" aria-label={`Save the date: ${w.dateLong}`}><div className="scene-stage date-stage"><span className="eyebrow date-label">{w.ending.save}</span><h2 className="release-date"><time dateTime={w.date}>{w.dateDisplay.split(' · ').map((part, i) => <span key={i}>{i > 0 && <b aria-hidden="true">·</b>}{part}</span>)}</time></h2><p className="coming-soon">{w.ending.soon}</p><p className="full-date">{w.dateLong}</p><div className="production-credit"><p>STARRING {w.bride.toUpperCase()} & {w.groom.toUpperCase()} · {w.ending.credits}</p><span>A CELEBRATION OF WHAT COMES NEXT</span></div></div></section><section className="post-credits" aria-label="Post credits"><p>{w.ending.post}</p><button onClick={replay}>Watch it again <span aria-hidden="true">↗</span></button></section></>;
}
