import sharp from 'sharp';
import { invitation } from '../src/wedding/invitation.js';

const artwork = await sharp(new URL('../public/wedding/art/courtyard.webp', import.meta.url).pathname).png().toBuffer();
const image = `data:image/png;base64,${artwork.toString('base64')}`;
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const serif = 'Georgia, Times New Roman, serif';
const text = (x, y, size, content, options = '') => `<text x="${x}" y="${y}" font-size="${size}" ${options}>${escape(content)}</text>`;
const separator = y => `<path d="M570 ${y}h120m60 0h120" stroke="#d8bb7e" stroke-width="1"/><path d="m720 ${y - 8} 8 8-8 8-8-8Z" fill="none" stroke="#d8bb7e"/>`;

// The exported card is composed from the same artwork and confirmed invitation data.
const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="2160">
  <image href="${image}" width="1440" height="2160"/>
  <rect x="205" y="225" width="1030" height="1640" rx="480" fill="#102d31" opacity=".87"/>
  <g text-anchor="middle" font-family="${serif}" fill="#f6efdf">
    ${text(720, 345, 63, 'ॐ', 'font-family="Kohinoor Devanagari, Devanagari Sangam MN, serif" fill="#d8bb7e"')}
    ${text(720, 415, 23, 'WITH THE BLESSINGS OF OUR FAMILIES', 'letter-spacing="3" fill="#d8bb7e"')}
    ${text(720, 490, 30, 'Together, we joyfully invite you to celebrate')}
    ${text(720, 620, 106, invitation.bride)}
    ${text(720, 682, 28, `Daughter of ${invitation.brideParents}`)}
    ${text(720, 775, 65, '&', 'font-style="italic" fill="#d8bb7e"')}
    ${text(720, 880, 112, invitation.groom)}
    ${text(720, 942, 28, `Son of ${invitation.groomParents}`)}
    ${separator(1000)}
    ${text(720, 1140, 43, 'THE ENGAGEMENT', 'letter-spacing="3" fill="#d8bb7e"')}
    ${text(720, 1202, 35, 'Tuesday, 1 December 2026')}
    ${text(720, 1254, 29, '7:00 PM onwards')}
    ${text(720, 1370, 43, 'THE BARAAT', 'letter-spacing="3" fill="#d8bb7e"')}
    ${text(720, 1432, 35, 'Wednesday, 2 December 2026')}
    ${text(720, 1484, 29, '7:00 PM onwards')}
    ${separator(1540)}
    ${text(720, 1620, 50, invitation.venue)}
    ${text(720, 1684, 31, 'RSVP on WhatsApp: +91 83349 07636')}
  </g>
</svg>`;
await sharp(Buffer.from(card)).jpeg({ quality: 92 }).toFile(new URL('../public/wedding/Meenakshi-Divyam-Wedding-Invitation.jpg', import.meta.url).pathname);

const share = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><clipPath id="art-panel"><rect x="720" width="480" height="630"/></clipPath></defs>
  <rect width="1200" height="630" fill="#102d31"/>
  <image href="${image}" x="720" y="0" width="480" height="720" clip-path="url(#art-panel)"/>
  <path d="M720 0v630" stroke="#d8bb7e" opacity=".4"/>
  <path d="M28 28h1144v574H28Z" fill="none" stroke="#d8bb7e" opacity=".65"/>
  <g text-anchor="middle" font-family="${serif}" fill="#f6efdf">
    ${text(360, 100, 16, 'WITH LOVE, YOU’RE INVITED', 'letter-spacing="3" fill="#d8bb7e"')}
    ${text(360, 220, 88, 'Meenakshi')}
    ${text(360, 284, 52, '&', 'font-style="italic" fill="#d8bb7e"')}
    ${text(360, 370, 92, 'Divyam')}
    <path d="M150 411h185m50 0h185" stroke="#d8bb7e" opacity=".6"/>
    <path d="m360 404 7 7-7 7-7-7Z" fill="none" stroke="#d8bb7e" opacity=".8"/>
    ${text(360, 463, 24, '01 & 02 DECEMBER 2026', 'letter-spacing="2"')}
    ${text(360, 505, 22, 'Gulati Bhawan · 7:00 PM onwards', 'fill="#d8bb7e"')}
    ${text(360, 558, 21, 'Two hearts. Two families. One beautiful beginning.', 'font-style="italic"')}
  </g>
</svg>`;
await sharp(Buffer.from(share)).jpeg({ quality: 90 }).toFile(new URL('../public/wedding/og-invitation.jpg', import.meta.url).pathname);
console.log('Created the downloadable invitation and WhatsApp sharing image.');
