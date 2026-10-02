export default function PaperCutout({ src, alt = '', variant = 'portrait', className = '', position = '50% 36%', sizes = '(max-width: 600px) 55vw, 35vw' }) {
  const image = typeof src === 'string' ? { src } : src;
  return <img className={`paper-cutout paper-cutout-${variant} ${className}`} src={image.src} srcSet={image.srcSet} sizes={sizes} alt={alt} aria-hidden={alt ? undefined : true} style={{ objectPosition: position }} loading="lazy" decoding="async" />;
}
