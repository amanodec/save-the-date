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
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const ivory = getComputedStyle(root.current).getPropertyValue('--ivory').trim();
        const intro = gsap.timeline();
        intro.fromTo('.intro-opening', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9, delay: 0.2 }).to('.intro-opening', { autoAlpha: 0, duration: 0.6 }, '+=1').fromTo('.intro-title', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }).fromTo('.intro-bottom', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, '-=0.7');
        gsap.timeline({ scrollTrigger: { trigger: '.intro', start: 'top top', end: '+=55%', pin: '.intro-stage', scrub: 1 } }).fromTo('.intro-title', { y: 0, opacity: 1 }, { y: -35, opacity: 0, duration: 1, immediateRender: false }).to('.intro-bottom', { opacity: 0, duration: 0.3 }, 0);
        gsap.utils.toArray('.childhood').forEach(scene => {
          const q = gsap.utils.selector(scene);
          gsap.timeline({ scrollTrigger: { trigger: scene, start: 'top top', end: '+=130%', pin: q('.scene-stage')[0], scrub: 0.7 } })
            .from(q('.memory'), { opacity: 0.2, y: 35, rotation: scene.classList.contains('bride') ? -3 : 3, duration: 0.8 })
            .to(q('.memory-first img'), { scale: 1.07, duration: 1.5 }, 0)
            .to(q('.memory-second'), { opacity: 1, duration: 0.65 }, 0.9)
            .fromTo(q('.memory-second img'), { scale: 1.06 }, { scale: 1, duration: 1.5 }, 1)
          .fromTo(q('.childhood-cutout'), { autoAlpha: 0, y: 30, rotation: -12, scale: 0.8 }, { autoAlpha: 1, y: 0, rotation: 5, scale: 1, duration: 0.55, ease: 'back.out(1.8)' }, 1.1)
            .to(q('.childhood-cutout'), { y: -12, rotation: 0, duration: 0.8 }, 1.8)
            .to(q('.memory, .childhood-copy, .scene-footnote, .childhood-cutout, .childhood-flower, .childhood-sparkle'), { opacity: 0, duration: 0.5 }, 2.5);
        });
        const isMobile = window.matchMedia('(max-width: 700px)').matches;
        const parallel = gsap.timeline({ scrollTrigger: { trigger: '.parallel', start: 'top top', end: '+=210%', pin: '.parallel-stage', scrub: 0.65 } });
        parallel.from('.life', { opacity: 0, y: 24, duration: 0.5 })
          .to('.parallel-stage', { '--path-gap': '0%', '--character-gap': isMobile ? '12%' : '8%', duration: 3, ease: 'power1.inOut' }, 0.4)
          .to('.life-bride .paper-cutout', { rotation: 3, y: 22, duration: 3 }, 0.4)
          .to('.life-groom .paper-cutout', { rotation: -4, y: 14, duration: 3 }, 0.4);
        wedding.lives.years.forEach((_, i) => { if (i) parallel.to(`.life-year-${i - 1}`, { opacity: 0, duration: 0.2 }, i * 0.8).to(`.life-year-${i}`, { opacity: 1, duration: 0.3 }, i * 0.8 + 0.15); });
        parallel.to('.meeting-dot', { opacity: 1, scale: 1, duration: 0.3 }, 3.2)
          .to('.parallel-heading, .life-years, .parallel-footer', { opacity: 0, duration: 0.4 }, 3.4)
          .to('.life', { opacity: 0, duration: 0.4 }, 3.9);
        // The paper characters meet first; the single exposure reveals their photograph.
        gsap.timeline({ scrollTrigger: { trigger: '.meeting', start: 'top top', end: '+=175%', pin: '.meeting-stage', scrub: 0.45 } })
          .fromTo('.plot-before', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0)
          .to('.plot-before', { autoAlpha: 0, duration: 0.3 }, 0.7)
          .fromTo('.plot-after', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 1)
          .to('.plot-after', { autoAlpha: 0, duration: 0.3 }, 1.65)
          .fromTo('.meeting-pair', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 2.05)
          .fromTo('.pair-bride', { xPercent: -60, rotation: -6 }, { xPercent: 0, rotation: 3, duration: 0.8, immediateRender: false }, 1.9)
          .fromTo('.pair-groom', { xPercent: 60, rotation: 7 }, { xPercent: 0, rotation: -3, duration: 0.8, immediateRender: false }, 1.9)
          .to('.camera-flash', { opacity: 0.85, duration: 0.08 }, 2.95)
          .set('.meeting-pair', { autoAlpha: 0 }, 3.03)
          .fromTo('.early-couple', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0 }, 3.03)
          .to('.camera-flash', { opacity: 0, duration: 0.35 }, 3.03)
          .fromTo('.early-couple img', { scale: 1.055 }, { scale: 1, duration: 1 }, 3.03)
          .to('.single-path', { opacity: 0, duration: 0.4 }, 3.03);
        gsap.timeline({ scrollTrigger: { trigger: '.cinema', start: 'top top', end: '+=140%', pin: '.cinema-stage', scrub: 0.8 } })
          .fromTo('.cinema-frame', { width: 'min(76vw, 680px)', height: 'min(57vw, 510px)' }, { width: '100vw', height: '100svh', duration: 2, ease: 'power1.inOut' })
          .from('.cinema-copy', { opacity: 0, duration: 0.8 }, 0.7).to('.cinema-footnote', { opacity: 0, duration: 0.5 }, 0.4).to('.cinema-frame', { opacity: 0, duration: 0.5 }, 2.4);
        const trailer = gsap.timeline({ scrollTrigger: { trigger: '.trailer', start: 'top top', end: '+=300%', pin: '.trailer-stage', scrub: 0.25 } });
        const montageColors = ['#ffdf83', '#ffe4e9', '#fff7e8', '#ffdf83', '#ffe4e9'];
        trailer.fromTo('.trailer-collage', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0);
        wedding.trailer.forEach((_, i) => {
          const at = i * 0.95;
          trailer.to('.trailer-stage', { backgroundColor: montageColors[i], duration: 0.18 }, at)
            .fromTo(`.trailer-card-${i}`, { autoAlpha: 0, yPercent: 18, rotation: i % 2 ? -5 : 5, scale: 0.85 }, { autoAlpha: 1, yPercent: 0, rotation: i % 2 ? 2 : -2, scale: 1, duration: 0.28, ease: 'back.out(1.6)' }, at)
            .to(`.trailer-card-${i}`, { autoAlpha: 0, yPercent: -12, duration: 0.18 }, at + 0.72);
          if (i === 0) trailer.fromTo('.montage-couple', { xPercent: -25, rotation: -16 }, { xPercent: 0, rotation: -9, duration: 0.6 }, at);
          if (i === 1) trailer.to('.montage-bride', { xPercent: -28, rotation: -6, duration: 0.4 }, at).to('.montage-groom', { xPercent: 26, rotation: 8, duration: 0.4 }, at);
          if (i === 2) trailer.to('.montage-couple', { xPercent: 30, yPercent: -12, rotation: 8, duration: 0.4 }, at).to('.montage-strip', { yPercent: -15, rotation: 12, duration: 0.4 }, at);
          if (i === 3) trailer.to('.montage-bride', { yPercent: -20, rotation: 3, duration: 0.3 }, at).to('.montage-groom', { yPercent: 12, rotation: -4, duration: 0.3 }, at);
          if (i === 4) trailer.to('.montage-couple', { yPercent: 12, rotation: -5, duration: 0.4 }, at).to('.montage-strip', { yPercent: 10, rotation: -6, duration: 0.4 }, at);
        });
        trailer.to('.montage-flash', { opacity: 0.22, duration: 0.06 }, 1.9).to('.montage-flash', { opacity: 0, duration: 0.16 }, 1.96);
        // A deliberate full stop: all collage and lettering leave before the finale.
        trailer.to('.trailer-collage, .trailer-stage .filmi-confetti', { autoAlpha: 0, yPercent: 8, duration: 0.4 }, 4.55)
          .to('.trailer-kicker', { autoAlpha: 0, duration: 0.3 }, 4.55)
          .to('.trailer-stage', { backgroundColor: ivory, duration: 0.55 }, 4.8)
          .to({}, { duration: 0.4 });
        gsap.timeline({ scrollTrigger: { trigger: '.final-reveal', start: 'top top', end: '+=210%', pin: '.hero-stage', scrub: 0.7 } })
          .fromTo('.finale-quiet', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7 }, 0.2)
          .to('.finale-quiet', { autoAlpha: 0, duration: 0.4 }, 1.65)
          .fromTo('.hero-photo, .hero-shade', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 2.25)
          .fromTo('.hero-photo img', { scale: 1.07 }, { scale: 1.01, duration: 3 }, 2.25)
          .fromTo('.hero-names', { opacity: 0 }, { opacity: 1, duration: 0.9 }, 3)
          .fromTo('.hero-married', { opacity: 0 }, { opacity: 1, duration: 0.7 }, 3.7)
          .to('.hero-stage', { opacity: 0, duration: 0.7 }, 5);
        gsap.timeline({ scrollTrigger: { trigger: '.date-scene', start: 'top top', end: '+=90%', pin: '.date-stage', scrub: 0.6 } }).from('.date-label', { opacity: 0, duration: 0.5 }).from('.release-date', { opacity: 0, scale: 0.96, duration: 1 }, 0.4).from('.coming-soon, .full-date, .production-credit', { opacity: 0, duration: 0.8 }, 1.1);
      });
      media.add('(prefers-reduced-motion: reduce)', () => { gsap.set('.intro-opening', { display: 'none' }); });
      // Measure chapters after the pinned scenes have added their scroll space.
      document.querySelectorAll('[data-chapter]').forEach(scene => ScrollTrigger.create({ trigger: scene, start: 'top 55%', end: 'bottom 55%', onToggle: self => { if (self.isActive) setChapter(Number(scene.dataset.chapter)); } }));
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
    <header className="film-header"><div className="film-monogram">{wedding.bride[0]}<i>/</i>{wedding.groom[0]}</div><span className="header-title">{wedding.filmTitle.toUpperCase()}</span><button className="sound-toggle" onClick={sound.toggle} aria-label={sound.playing ? 'Mute the soundtrack' : 'Play the soundtrack'} aria-pressed={sound.playing}><span className={`sound-mark ${sound.playing ? 'is-playing' : ''}`} aria-hidden="true"><i/><i/><i/><i/></span><span>{sound.playing ? 'SOUND ON' : 'SOUND OFF'}</span></button></header>
    <main><IntroScene enter={enter}/><ChildhoodScene side="bride" chapter="1"/><ChildhoodScene side="groom" chapter="2"/><ParallelLives/><MeetingScene/><CinemaTransition/><TrailerSequence/><FinalReveal/><DateScene replay={replay}/></main>
    <div className="film-footer"><span className="chapter-number">{String(chapter + 1).padStart(2, '0')}<i> / 09</i></span><span className="chapter-name">{wedding.chapters[chapter]}</span><span className="footer-date">{wedding.dateShort}</span></div><div className="film-progress" aria-hidden="true"><div className="film-progress-fill"/></div>
    {sound.error && <p role="status" className="sound-error">{sound.error}</p>}
  </div>;
}
