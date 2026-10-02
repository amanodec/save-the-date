import { useState } from 'react';
import { imageUrl } from '../data/wedding';
export default function Photo({ src, alt, className = '', priority = false, position = '50% 50%', sizes = '(max-width: 600px) 100vw, 85vw' }) {
  const [failed, setFailed] = useState(false);
  const image = typeof src === 'string' ? { src: imageUrl(src) } : src;
  const isRemote = typeof src === 'string' && src.includes('images.unsplash.com');
  return <div className={`photo ${className} ${failed ? 'photo-fallback' : ''}`}>
    {failed ? <span className="fallback-label">{alt}<small>A memory, waiting to be here.</small></span> : <img src={image.src} srcSet={image.srcSet || (isRemote ? `${imageUrl(src, 540)} 540w, ${imageUrl(src, 900)} 900w, ${imageUrl(src, 1600)} 1600w` : undefined)} sizes={sizes} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" style={{ objectPosition: position }} onError={() => setFailed(true)} />}
  </div>;
}
