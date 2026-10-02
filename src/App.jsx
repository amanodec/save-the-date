import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { wedding } from './data/wedding';
import { useSound } from './hooks/useSound';
import { IntroScene, ChildhoodScene, ParallelLives, MeetingScene, CinemaTransition, TrailerSequence, FinalReveal, DateScene } from './components/Scenes';
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const root = useRef(null);
  const [chapter, setChapter] = useState(0);
  const sound = useSound();
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      const progress = gsap.quickSetter('.film-progress-fill', 'scaleX');
      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: self => progress(self.progress) });
      document.querySelectorAll('[data-chapter]').forEach(scene => ScrollTrigger.create({ trigger: scene, start: 'top 55%', end: 'bottom 55%', onToggle: self => { if (self.isActive) setChapter(Number(scene.dataset.chapter)); } }));
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline();
        intro.fromTo('.intro-opening', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.3, delay: 0.3 }).to('.intro-opening', { autoAlpha: 0, duration: 0.8 }, '+=1.6').fromTo('.intro-title', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.8 }).fromTo('.intro-bottom', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, '-=0.7');
        gsap.timeline({ scrollTrigger: { trigger: '.intro', start: 'top top', end: '+=55%', pin: '.intro-stage', scrub: 1 } }).fromTo('.intro-title', { y: 0, opacity: 1 }, { y: -35, opacity: 0, duration: 1, immediateRender: false }).to('.intro-bottom', { opacity: 0, duration: 0.3 }, 0);
        gsap.utils.toArray('.childhood').forEach(scene => {
          const q = gsap.utils.selector(scene);
          gsap.timeline({ scrollTrigger: { trigger: scene, start: 'top top', end: '+=130%', pin: q('.scene-stage')[0], scrub: 0.7 } })
            .from(q('.memory'), { opacity: 0.2, y: 35, rotation: scene.classList.contains('bride') ? -3 : 3, duration: 0.8 })
            .to(q('.memory-first img'), { scale: 1.07, duration: 1.5 }, 0)
            .to(q('.memory-second'), { opacity: 1, duration: 0.65 }, 0.9)
            .to(q('.year-first'), { opacity: 0, duration: 0.2 }, 0.9)
            .to(q('.year-second'), { opacity: 1, duration: 0.2 }, 1)
            .fromTo(q('.memory-second img'), { scale: 1.06 }, { scale: 1, duration: 1.5 }, 1)
            .to(q('.memory, .childhood-copy, .scene-footnote'), { opacity: 0, duration: 0.5 }, 2.2);
        });
        const parallel = gsap.timeline({ scrollTrigger: { trigger: '.parallel', start: 'top top', end: '+=230%', pin: '.parallel-stage', scrub: 0.7 } });
        parallel.from('.life', { opacity: 0, y: 30, duration: 0.5 }).to('.parallel-stage', { '--path-gap': '0%', duration: 3, ease: 'power1.inOut' }, 0.4).to('.life-bride', { xPercent: 15, duration: 3 }, 0.4).to('.life-groom', { xPercent: -15, duration: 3 }, 0.4);
        wedding.lives.years.forEach((_, i) => { if (i) parallel.to(`.life-year-${i - 1}`, { opacity: 0, duration: 0.2 }, i * 0.8).to(`.life-year-${i}`, { opacity: 1, duration: 0.3 }, i * 0.8 + 0.15); });
        parallel.to('.meeting-dot', { opacity: 1, scale: 1, duration: 0.3 }, 3.2).to('.parallel-heading, .life, .life-years, .parallel-footer', { opacity: 0, duration: 0.5 }, 3.5);
        gsap.timeline({ scrollTrigger: { trigger: '.meeting', start: 'top top', end: '+=190%', pin: '.meeting-stage', scrub: 0.65 } })
          .from('.plot-before', { opacity: 0, duration: 0.4 }).to('.plot-before', { opacity: 0, duration: 0.35 }, 0.8).to('.plot-after', { opacity: 1, duration: 0.5 }, 1.2).to('.plot-after', { opacity: 0, duration: 0.4 }, 2.1).to('.early-couple', { opacity: 1, duration: 0.8 }, 2.6).fromTo('.early-couple img', { scale: 1.08 }, { scale: 1, duration: 1.6 }, 2.6).to('.single-path', { opacity: 0, duration: 0.4 }, 2.6);
        gsap.timeline({ scrollTrigger: { trigger: '.cinema', start: 'top top', end: '+=140%', pin: '.cinema-stage', scrub: 0.8 } })
          .fromTo('.cinema-frame', { width: 'min(76vw, 680px)', height: 'min(57vw, 510px)' }, { width: '100vw', height: '100svh', duration: 2, ease: 'power1.inOut' })
          .from('.cinema-copy', { opacity: 0, duration: 0.8 }, 0.7).to('.cinema-footnote', { opacity: 0, duration: 0.5 }, 0.4).to('.cinema-frame', { opacity: 0, duration: 0.5 }, 2.4);
        const trailer = gsap.timeline({ scrollTrigger: { trigger: '.trailer', start: 'top top', end: '+=230%', pin: '.trailer-stage', scrub: 0.35 } });
        wedding.trailer.forEach((_, i) => trailer.fromTo(`.trailer-card-${i}`, { autoAlpha: 0, scale: 0.97, clipPath: 'inset(0 0 100% 0)' }, { autoAlpha: 1, scale: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.25 }, i * 1.1).to(`.trailer-card-${i}`, { autoAlpha: 0, scale: 1.025, duration: 0.2 }, i * 1.1 + 0.85));
        gsap.timeline({ scrollTrigger: { trigger: '.final-reveal', start: 'top top', end: '+=150%', pin: '.hero-stage', scrub: 0.8 } }).fromTo('.hero-photo', { opacity: 0 }, { opacity: 1, duration: 1.3 }).fromTo('.hero-photo img', { scale: 1.1 }, { scale: 1.02, duration: 3 }, 0).from('.hero-names', { opacity: 0, y: 15, duration: 1 }, 1).to('.hero-stage', { opacity: 0, duration: 0.7 }, 2.8);
        gsap.timeline({ scrollTrigger: { trigger: '.date-scene', start: 'top top', end: '+=90%', pin: '.date-stage', scrub: 0.6 } }).from('.date-label', { opacity: 0, duration: 0.5 }).from('.release-date', { opacity: 0, scale: 0.96, duration: 1 }, 0.4).from('.coming-soon, .full-date, .production-credit', { opacity: 0, duration: 0.8 }, 1.1);
      });
      media.add('(prefers-reduced-motion: reduce)', () => { gsap.set('.intro-opening', { display: 'none' }); });
    }, root);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    document.fonts?.ready.then(onLoad);
    return () => { window.removeEventListener('load', onLoad); media.revert(); context.revert(); };
  }, []);
  const enter = async withSound => {
    if (withSound && !sound.playing) await sound.toggle();
    window.scrollTo({ top: document.querySelector('.childhood').getBoundingClientRect().top + window.scrollY, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  const replay = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return <div ref={root} className="film">
    <div className="grain" aria-hidden="true"/>
    <header className="film-header"><div className="film-monogram">{wedding.bride[0]}<i>/</i>{wedding.groom[0]}</div><span className="header-title">A FILM YEARS IN THE MAKING</span><button className="sound-toggle" onClick={sound.toggle} aria-label={sound.playing ? 'Mute the soundtrack' : 'Play the soundtrack'} aria-pressed={sound.playing}><span className={`sound-mark ${sound.playing ? 'is-playing' : ''}`} aria-hidden="true"><i/><i/><i/><i/></span><span>{sound.playing ? 'SOUND ON' : 'SOUND OFF'}</span></button></header>
    <main><IntroScene enter={enter}/><ChildhoodScene side="bride" chapter="1"/><ChildhoodScene side="groom" chapter="2"/><ParallelLives/><MeetingScene/><CinemaTransition/><TrailerSequence/><FinalReveal/><DateScene replay={replay}/></main>
    <div className="film-footer"><span className="chapter-number">{String(chapter + 1).padStart(2, '0')}<i> / 09</i></span><span className="chapter-name">{wedding.chapters[chapter]}</span><span className="footer-date">{wedding.dateShort}</span></div><div className="film-progress" aria-hidden="true"><div className="film-progress-fill"/></div>
    {sound.error && <p role="status" className="sound-error">{sound.error}</p>}
  </div>;
}
