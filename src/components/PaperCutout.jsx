export default function PaperCutout({ src, alt = '', variant = 'portrait', className = '', position = '50% 36%' }) {
  return <img className={`paper-cutout paper-cutout-${variant} ${className}`} src={src} alt={alt} aria-hidden={alt ? undefined : true} style={{ objectPosition: position }} loading="lazy" decoding="async" />;
}
