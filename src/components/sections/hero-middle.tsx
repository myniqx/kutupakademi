import Image from 'next/image'

interface HeroMiddleProps {
  imageSrc?: string
  imageAlt?: string
  title: string
  subtitle?: string
}

export function HeroMiddle({
  imageSrc = '/blogs/blog-cover.webp',
  imageAlt = 'Kutup Akademi',
  title,
  subtitle
}: HeroMiddleProps) {
  return (
    <>
      {/* Cover Image Section */}
      <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
      </section>

      {/* Title and Subtitle */}
      <section className="relative -mt-32 md:-mt-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground leading-tight">
              {title}
            </h1>

            {subtitle && (
              <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed mb-12">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
