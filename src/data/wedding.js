// Replace the eight URLs here with your own photos. Local files can live in public/photos/.
// Use /photos/aanya-childhood.jpg, for example. Every visible story detail lives here.
export const wedding = {
  bride: 'Aanya',
  groom: 'Arjun',
  date: '2027-02-14',
  dateDisplay: '14 · 02 · 2027',
  dateLong: '14 February 2027',
  month: 'FEBRUARY',
  socialDescription: 'Two stories. One very important date.',
  filmTitle: 'A film years in the making.',
  titleLines: ['A film', 'years', 'in', 'the making.'],
  dateShort: '14.02.27',
  opening: 'Every great story starts long before the main characters meet.',
  production: 'A LITTLE FATE. A LOT OF LIFE.',
  audio: { src: '', volume: 0.28 }, // Add a licensed MP3 URL. Empty = a quiet generated ambient score.
  photos: {
    brideChild1: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b',
    brideChild2: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4',
    groomChild1: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9',
    groomChild2: 'https://images.unsplash.com/photo-1519689680058-324335c77eba',
    brideAdult: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    groomAdult: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    coupleEarly: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2',
    coupleHero: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486',
  },
  childhood: {
    bride: { cue: 'Meanwhile…', title: 'Aanya had absolutely no idea.', caption: 'A whole little world. A story just beginning.', year: '1998', secondYear: '2007' },
    groom: { cue: 'Somewhere else…', title: 'Arjun didn’t know either.', caption: 'Different adventures. The very same sky.', year: '1998', secondYear: '2007' },
  },
  lives: { eyebrow: 'TWO LIVES, RUNNING IN PARALLEL', title: 'Life had its own plans.', years: ['1998', '2007', '2016', '2022'], captions: ['childhood', 'growing up', 'life happened', 'still no idea…'], footer: 'Different places. Different days. The same direction.' },
  meeting: { before: 'And then…', after: '…the plot changed.', together: 'The stories became one.', caption: 'Some things make sense only when you look back.' },
  trailer: ['THIS FEBRUARY', 'TWO FAMILIES', 'ONE VERY\nIMPORTANT DATE', 'AND AN UNREASONABLE\nAMOUNT OF DANCING'],
  ending: { save: 'SAVE THE DATE', soon: 'Coming soon.', credits: 'WITH THEIR FAVOURITE PEOPLE', post: 'Based on a true story.' },
  chapters: ['Opening credits', 'Her story', 'His story', 'Two lives', 'The plot changes', 'A wider world', 'Coming soon', 'The leading roles', 'Save the date'],
};

export function imageUrl(src, width = 1200) {
  if (!src.includes('images.unsplash.com')) return src;
  return `${src}${src.includes('?') ? '&' : '?'}auto=format&fit=crop&w=${width}&q=80`;
}
