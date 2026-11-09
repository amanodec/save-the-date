export const invitation = {
  bride: 'Meenakshi Sharma',
  groom: 'Divyam Thapa',
  brideParents: 'Anita & Sanjay Sharma',
  groomParents: 'Archana & Deepak Thapa',
  venue: 'Gulati Bhawan',
  mapsUrl: 'https://maps.app.goo.gl/bXN4YzBABMQftRBZA',
  whatsapp: '918334907636',
  events: [
    {
      id: 'engagement', title: 'The Engagement', hindi: 'A little sparkle. A lifetime of us.',
      date: '2026-12-01T19:00:00+05:30', day: 'Tuesday', dateLabel: '01 December 2026',
      shortDate: '01', month: 'DEC', time: '7:00 PM onwards',
      description: 'An evening of rings, happy tears, and the beginning of forever. Come raise a toast to our next chapter.',
      image: '/wedding/art/engagement.webp', imageAlt: 'Hand-painted roses, candlelight and two gold rings in a pink alcove',
    },
    {
      id: 'baraat', title: 'The Baraat', hindi: 'Baraat aa rahi hai. Thumke ready?',
      date: '2026-12-02T19:00:00+05:30', day: 'Wednesday', dateLabel: '02 December 2026',
      shortDate: '02', month: 'DEC', time: '7:00 PM onwards',
      description: 'Bring your loudest cheers and your best dance moves. We’re bringing two families together, full filmy style.',
      image: '/wedding/art/baraat.webp', imageAlt: 'Hand-painted festive Indian procession with dhol players, marigolds and glowing lanterns',
    },
  ],
};

export function getCountdown(now = Date.now()) {
  const event = invitation.events.find(item => new Date(item.date).getTime() > now);
  if (!event) return { event: null, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const remaining = Math.max(0, Math.floor((new Date(event.date).getTime() - now) / 1000));
  return {
    event,
    days: Math.floor(remaining / 86400), hours: Math.floor(remaining / 3600) % 24,
    minutes: Math.floor(remaining / 60) % 60, seconds: remaining % 60,
  };
}

export function rsvpUrl() {
  const message = 'Hi! Thank you for inviting me to Meenakshi & Divyam’s wedding celebrations on 1–2 December 2026 at Gulati Bhawan. I’d like to RSVP.\n\nName: \nNumber of guests: \nAttending: Engagement / Baraat / Both';
  return `https://wa.me/${invitation.whatsapp}?text=${encodeURIComponent(message)}`;
}

