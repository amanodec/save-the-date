const responsiveImage = (small, medium, large, largeWidth) => ({
  src: large,
  srcSet: `${small} 400w, ${medium} 800w, ${large} ${largeWidth}w`,
});

const meenakshiChildhood1 = responsiveImage(
  new URL('../assets/optimized/meenakshi-childhood-1-400.webp', import.meta.url).href,
  new URL('../assets/optimized/meenakshi-childhood-1-800.webp', import.meta.url).href,
  new URL('../assets/optimized/meenakshi-childhood-1-1200.webp', import.meta.url).href,
  1200,
);
const meenakshiChildhood2 = responsiveImage(
  new URL('../assets/optimized/meenakshi-childhood-2-400.webp', import.meta.url).href,
  new URL('../assets/optimized/meenakshi-childhood-2-800.webp', import.meta.url).href,
  new URL('../assets/optimized/meenakshi-childhood-2-1200.webp', import.meta.url).href,
  1200,
);
const divyamChildhood1 = responsiveImage(
  new URL('../assets/optimized/divyam-childhood-1-400.webp', import.meta.url).href,
  new URL('../assets/optimized/divyam-childhood-1-800.webp', import.meta.url).href,
  new URL('../assets/optimized/divyam-childhood-1-1200.webp', import.meta.url).href,
  1200,
);
const divyamChildhood2 = responsiveImage(
  new URL('../assets/optimized/divyam-childhood-2-400.webp', import.meta.url).href,
  new URL('../assets/optimized/divyam-childhood-2-800.webp', import.meta.url).href,
  new URL('../assets/optimized/divyam-childhood-2-1200.webp', import.meta.url).href,
  1200,
);
const meenakshiAdult = responsiveImage(
  new URL('../assets/optimized/meenakshi-cutout-400.webp', import.meta.url).href,
  new URL('../assets/optimized/meenakshi-cutout-800.webp', import.meta.url).href,
  new URL('../assets/optimized/meenakshi-cutout-1200.webp', import.meta.url).href,
  1200,
);
const divyamAdult = responsiveImage(
  new URL('../assets/optimized/divyam-cutout-400.webp', import.meta.url).href,
  new URL('../assets/optimized/divyam-cutout-800.webp', import.meta.url).href,
  new URL('../assets/optimized/divyam-cutout-1200.webp', import.meta.url).href,
  1200,
);
const coupleEarly = responsiveImage(
  new URL('../assets/optimized/meenakshi-dviyam-1-400.webp', import.meta.url).href,
  new URL('../assets/optimized/meenakshi-dviyam-1-800.webp', import.meta.url).href,
  new URL('../assets/optimized/meenakshi-dviyam-1-1020.webp', import.meta.url).href,
  1020,
);
const coupleHero = responsiveImage(
  new URL('../assets/optimized/meenakshi-divyam-2-400.webp', import.meta.url).href,
  new URL('../assets/optimized/meenakshi-divyam-2-800.webp', import.meta.url).href,
  new URL('../assets/optimized/meenakshi-divyam-2-1020.webp', import.meta.url).href,
  1020,
);

// Replace the remaining photo URLs here with your own photos. Local files can live in public/photos/.
// Use /photos/meenakshi-childhood.jpg, for example. Every visible story detail lives here.
export const wedding = {
  bride: 'Meenakshi',
  groom: 'Divyam',
  date: '2026-12-02',
  dateDisplay: '02 · 12 · 2026',
  dateLong: '2 December 2026',
  month: 'DECEMBER',
  socialDescription: 'Meenakshi & Divyam. Ek love story. Full filmy. Save the date: 2 December 2026.',
  filmTitle: 'Ek love story. Full filmy.',
  titleLines: ['Ek love', 'story.', 'Full filmy.'],
  dateShort: '02.12.26',
  opening: 'Har love story ka ek bachpan hota hai…',
  openingEyebrow: 'ROLL CAMERA. CUE THE BACKSTORY.',
  production: 'MEENAKSHI & DIVYAM PRESENT',
  introStamp: ['PYAAR', '+ THODA', 'DRAMA'],
  introAside: 'Family-approved blockbuster.*',
  introFinePrint: '* Dance reviews pending.',
  soundCta: 'Picture shuru karein?',
  scrollPrompt: 'SCROLL KARO. PICTURE DEKHO.',
  audio: {
    src: new URL('../music/FOREVER - TEGI PANNU TANU GREWAL MANNI SANDHU PREM LATA (OFFICIAL MUSIC VIDEO).mp3', import.meta.url).href,
    volume: 0.28,
  }, // Vite bundles the local MP3. Empty src restores the generated ambient score.
  photos: {
    brideChild1: meenakshiChildhood1,
    brideChild2: meenakshiChildhood2,
    groomChild1: divyamChildhood1,
    groomChild2: divyamChildhood2,
    brideAdult: meenakshiAdult,
    groomAdult: divyamAdult,
    coupleEarly,
    coupleHero,
  },
  childhood: {
    bride: { cue: 'MEET THE HEROINE', title: 'Chhoti si.\nFull filmy.', caption: 'Big dreams. Small shoes. Divyam? Not in the script. Yet.', sticker: ['FULL', 'FILMY'], note: 'Shaadi? Pehle homework.', archive: 'THE HEROINE: PREQUEL' },
    groom: { cue: 'MEANWHILE, OUR HERO…', title: 'Hero ki\norigin story.', caption: 'Busy growing up. Completely unaware that the best plot twist was still to come.', sticker: ['HERO', 'ENERGY'], note: 'Love story? After homework.', archive: 'THE HERO: PREQUEL' },
  },
  childhoodFootnote: 'SPOILER: INKI SHAADI HONE WALI HAI.',
  lives: { eyebrow: 'SAME PLANET. ZERO CLUE.', title: 'Do alag kahaaniyan.\nSame filmy energy.', years: ['2023', '2026'], captions: ['they finally meet', 'the big day'], footer: 'The universe was cooking. These two had no idea.' },
  meeting: { before: 'Phir ek din…', after: 'Plot twist!', together: 'Aur bas… kahaani shuru.', caption: 'Life understood the assignment.', eyebrow: 'WAIT FOR IT…', photoEyebrow: 'OKAY, NOW WE HAVE A LOVE STORY.', snapLabel: 'HAAN, YEHI DONO.' },
  cinema: { eyebrow: 'ROMANCE? CHECK. NAUTANKI? OBVIOUSLY.', firstLine: 'Thoda pyaar.', secondLine: 'Thodi nautanki.', footnote: 'Special appearance: the entire family.' },
  montage: { eyebrow: 'AB AAYEGA ASLI MAZA.', aside: 'Two left feet? Also invited.' },
  finale: { quiet: 'Okay, ab main announcement…', eyebrow: 'YOUR FAVOURITE LEAD PAIR', married: 'ki shaadi hai!', stamp: 'IT’S\nOFFICIAL' },
  trailer: ['EK LOVE\nSTORY.', 'DO FAMILIES.\nDOUBLE DHAMAAL.', 'EK DATE.\nNO EXCUSES.', 'THODA THUMKA.\nFULL DRAMA.', 'PICTURE ABHI\nBAAKI HAI!'],
  ending: { save: 'SAVE THE DATE. BLOCK THE CALENDAR.', soon: 'Aap bas aa jaana.', credits: 'WITH OUR FAVOURITE PEOPLE', post: 'Love, laughter aur happily ever after.', ticket: 'ADMIT ALL OUR FAVOURITE PEOPLE', invite: 'NAACHNA. GAANA. SHAADI MEIN AANA.', replay: 'Once more? Picture chalao' },
  chapters: ['Picture shuru', 'Meet the heroine', 'Meet the hero', 'Zero clue', 'Plot twist!', 'Full filmy', 'Shaadi trailer', 'The lead pair', 'Aa jaana!'],
};

export function imageUrl(src, width = 1200) {
  if (!src.includes('images.unsplash.com')) return src;
  return `${src}${src.includes('?') ? '&' : '?'}auto=format&fit=crop&w=${width}&q=80`;
}
