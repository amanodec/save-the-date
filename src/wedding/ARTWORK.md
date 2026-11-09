# Wedding foreground artwork

The motion edition adds `public/wedding/art/floral-foreground.webp`, generated with the built-in imagegen tool. The original illustration remains at its generation location. The project copy is resized to 650 by 975 pixels and encoded as WebP, preserving transparency.

Final prompt:

> Use case: illustration-story. Asset type: transparent botanical foreground layer for an elegant Indian wedding website. Primary request: a single lush painted floral spray growing diagonally from the lower left corner, with ivory jasmine, muted dusty pink roses, tiny warm marigolds, delicate antique gold stems and deep olive leaves. Style: exquisite traditional Indian miniature painting, matte gouache, fine hand painted detail, restrained romantic moonlit palette. Composition: portrait 2:3 canvas, flowers concentrated in the bottom left third, thin tendrils rising along the left edge, most of the upper and right canvas completely empty transparent. The stems gently arch inward. Genuine transparent background, isolated botanical cutout, no paper rectangle, no scenery, no text, no border, no watermark. Suitable to overlay a dark teal courtyard illustration. No glow, no neon, no photorealism.

The diya illustrations, petals, joining family thread and paper envelope are code-native shapes in `Atmosphere.jsx` and `motion.css`.

Motion uses the existing GSAP dependency. `useWeddingMotion.js` scopes all timelines to the invitation and cleans them up on unmount or preference changes. It respects reduced motion and leaves native document scrolling in charge. Ambient animations pause outside the viewport and while the document is hidden.
