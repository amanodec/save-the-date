import { useCallback, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useWeddingMotion(root) {
  const entranceRef = useRef(null);
  const onDoorsOpened = useRef(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      // Native document scrolling stays in charge. No pinning, touch handlers,
      // replacement scrollers or extra scroll space are needed for these scenes.
      media.add('(prefers-reduced-motion: no-preference)', () => {
        // Prime every entrance value while the cover is opaque. Doors, artwork
        // and lettering then share one clock, with no React-phase reset midway.
        gsap.set('.hero-art > img', { scale: 1.1 });
        gsap.set('.hero-blessing, .hero-prelude, .hero-copy > .flourish, .hero-tagline, .hero-date', { autoAlpha: 0, y: 15 });
        gsap.set('.name-line > span', { yPercent: 115, rotation: 3 });
        gsap.set('.hero-copy h1 > em', { autoAlpha: 0, scale: 0.7 });
        gsap.set('.invite-header, .hero-scroll, .hero-aside', { autoAlpha: 0 });
        const entrance = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
        entrance.to('.cover-content', { autoAlpha: 0, duration: 0.4 }, 0)
          .to('.cover-door-left', { rotationY: -100, duration: 1.6, ease: 'power3.inOut' }, 0.15)
          .to('.cover-door-right', { rotationY: 100, duration: 1.6, ease: 'power3.inOut' }, 0.15)
          .to('.hero-art > img', { scale: 1, duration: 3 }, 0.15)
          .to('.hero-blessing', { autoAlpha: 1, y: 0, duration: 1 }, 0.55)
          .to('.hero-prelude', { autoAlpha: 1, y: 0, duration: 1 }, 0.7)
          .to('.name-line > span', { yPercent: 0, rotation: 0, stagger: 0.25, duration: 1.5 }, 0.85)
          .to('.hero-copy h1 > em', { autoAlpha: 1, scale: 1, duration: 1.1 }, 1.15)
          .to('.hero-copy > .flourish, .hero-tagline, .hero-date', { autoAlpha: 1, y: 0, stagger: 0.15, duration: 1 }, 1.35)
          .to('.invite-header, .hero-scroll, .hero-aside', { autoAlpha: 1, duration: 1 }, 1.55)
          .call(() => {
            const onOpen = onDoorsOpened.current;
            onDoorsOpened.current = null;
            onOpen?.();
          }, [], 1.8);
        entranceRef.current = entrance;
        return () => { entranceRef.current = null; };
      });
      media.add('(prefers-reduced-motion: reduce)', () => {
        const onOpen = onDoorsOpened.current;
        onDoorsOpened.current = null;
        onOpen?.();
      });

      // Prepare scroll scenes under the cover as well, so entering the page
      // doesn't initialize every ScrollTrigger during the visible animation.
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root.current);

        gsap.to('.hero-art', { yPercent: 9, ease: 'none', scrollTrigger: { trigger: '.wedding-hero', start: 'top top', end: 'bottom top', scrub: 1 } });
        gsap.to('.botanical-layer', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.wedding-hero', start: 'top top', end: 'bottom top', scrub: 0.8 } });

        q('.reveal').forEach(element => {
          gsap.from(element, { autoAlpha: 0, y: 30, duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 90%', once: true } });
        });
        const family = gsap.timeline({ scrollTrigger: { trigger: '.family-names', start: 'top 88%', once: true } });
        family.from('.family-bride', { x: -28, autoAlpha: 0, duration: 1.2 })
          .from('.family-groom', { x: 28, autoAlpha: 0, duration: 1.2 }, 0.2)
          .from('.family-join', { scale: 0.5, autoAlpha: 0, duration: 0.8 }, 0.5)
          .fromTo('.thread-left, .thread-right', { strokeDasharray: 500, strokeDashoffset: 500 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0.35)
          .fromTo('.thread-heart', { strokeDasharray: 160, strokeDashoffset: 160 }, { strokeDashoffset: 0, duration: 0.9 }, 1.7);

        gsap.from('.couple-arch', { clipPath: 'inset(100% 0% 0% 0% round 48% 48% 0% 0%)', duration: 1.7, ease: 'power3.inOut', scrollTrigger: { trigger: '.couple-frame', start: 'top 88%', once: true } });
        gsap.fromTo('.couple-arch img', { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.couple-frame', start: 'top bottom', end: 'bottom top', scrub: 1 } });
        gsap.fromTo('.love-underline', { strokeDasharray: 330, strokeDashoffset: 330 }, { strokeDashoffset: 0, duration: 1.3, scrollTrigger: { trigger: '.handwritten', start: 'top 93%', once: true } });
        gsap.from('.photo-caption, .photo-sparkle', { autoAlpha: 0, scale: 0.85, stagger: 0.16, duration: 0.9, scrollTrigger: { trigger: '.couple-frame', start: 'center 85%', once: true } });
        if (q('.countdown').length) {
          gsap.from('.countdown-unit', { autoAlpha: 0, y: 28, stagger: 0.13, duration: 1, scrollTrigger: { trigger: '.countdown', start: 'top 93%', once: true } });
        }

        q('.event-card').forEach(card => {
          const select = gsap.utils.selector(card);
          const baraat = card.classList.contains('baraat');
          const timeline = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 86%', once: true } });
          timeline.from(select('.event-art'), { autoAlpha: 0, x: baraat ? 24 : 0, y: baraat ? 0 : 20, duration: 1.4, ease: 'power3.out' })
            .from(select('.event-number, .event-kicker, .event-heading, .event-hindi, .event-description, .event-details'), { autoAlpha: 0, y: baraat ? 30 : 18, stagger: 0.13, duration: 0.9, ease: baraat ? 'back.out(1.2)' : 'power2.out' }, 0.5);
          if (!baraat) {
            timeline.fromTo(select('.ceremony-rings circle'), { strokeDasharray: 200, strokeDashoffset: 200 }, { strokeDashoffset: 0, stagger: 0.2, duration: 1.4 }, 0.7);
          }
          gsap.fromTo(select('.event-art > img'), { scale: 1.08, yPercent: -3 }, { scale: 1.02, yPercent: 3, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
        });

        gsap.from('.evening-bridge span', { autoAlpha: 0, y: 20, stagger: 0.18, duration: 0.9, scrollTrigger: { trigger: '.evening-bridge', start: 'top 90%', once: true } });
        gsap.fromTo('.venue-art img', { scale: 1.12, yPercent: -4 }, { scale: 1, yPercent: 4, ease: 'none', scrollTrigger: { trigger: '.venue-section', start: 'top bottom', end: 'bottom top', scrub: 1 } });

        const envelope = gsap.timeline({ scrollTrigger: { trigger: '.keepsake', start: 'top 85%', once: true } });
        envelope.from('.keepsake', { autoAlpha: 0, y: 30, rotation: -5, duration: 0.9 })
          .to('.envelope-flap', { rotateX: 180, duration: 0.8, ease: 'power2.inOut' }, 0.4)
          .set('.envelope-flap', { zIndex: 0 }, 0.8)
          .fromTo('.keepsake-card', { y: 65, rotation: 0 }, { y: -70, rotation: -5, duration: 1.4, ease: 'power3.inOut' }, 0.95)
          .from('.keepsake-note', { autoAlpha: 0, y: 10, duration: 0.8 }, 1.8);
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    let active = true;
    document.fonts?.ready.then(() => { if (active) refresh(); });
    // Images may finish after scroll scenes are measured, particularly on mobile.
    const images = [...root.current.querySelectorAll('img')];
    images.forEach(img => img.addEventListener('load', refresh));
    return () => {
      active = false;
      images.forEach(img => img.removeEventListener('load', refresh));
      media.revert();
      context.revert();
    };
  }, [root]);

  return useCallback(onOpen => {
    ScrollTrigger.refresh();
    if (entranceRef.current) {
      onDoorsOpened.current = onOpen;
      entranceRef.current.play(0);
    } else onOpen();
  }, []);
}
