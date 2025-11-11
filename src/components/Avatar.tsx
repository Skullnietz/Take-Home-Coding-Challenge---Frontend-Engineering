export default function Avatar({ src, alt }: { src?: string; alt: string }) {
  return (
    <img
      src={src || 'https://i.pravatar.cc/120?u=placeholder'}
      alt={alt}
      className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow outline outline-2 outline-advantec-200"
      loading="lazy"
    />
  )
}
