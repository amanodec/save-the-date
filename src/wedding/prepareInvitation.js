// Decode the first scene before it is exposed. Failed decorative assets should
// still let guests enter the invitation.
export async function prepareInvitation(hero, fonts) {
  const images = [...hero.querySelectorAll('img')];
  await Promise.allSettled([
    fonts?.load('400 96px "Cormorant Garamond"'),
    fonts?.load('italic 400 96px "Cormorant Garamond"'),
    fonts?.load('400 14px "DM Sans"'),
    ...images.map(image => image.decode?.()),
  ]);
  await Promise.allSettled([fonts?.ready]);
}
