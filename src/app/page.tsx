import { Mail } from "lucide-react"
import Image from "next/image"

import { BrandIcon } from "@/components/brand-icon"
import { Button } from "@/components/ui/button"
import { site, socials } from "@/content/site"

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  sameAs: socials.map((s) => s.href),
}

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <header className="flex flex-col gap-8 motion-safe:animate-in motion-safe:duration-700 motion-safe:fade-in motion-safe:slide-in-from-bottom-4">
        <div className="aspect-square w-28 overflow-hidden rounded-3xl bg-muted">
          <Image
            src={site.avatar.light}
            alt={site.name}
            width={480}
            height={480}
            sizes="112px"
            priority
            className="size-full object-cover dark:hidden"
          />
          <Image
            src={site.avatar.dark}
            alt={site.name}
            width={480}
            height={480}
            sizes="112px"
            priority
            className="hidden size-full object-cover dark:block"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {site.name}
              </h1>
              <p className="text-muted-foreground">{site.handle}</p>
            </div>
            <Button
              variant="default"
              size="lg"
              nativeButton={false}
              render={
                <a href={`mailto:${site.email}`} title={site.email} />
              }
            >
              <Mail data-icon="inline-start" />
              Contact
            </Button>
          </div>

          <div className="flex flex-col gap-4 text-lg leading-relaxed text-muted-foreground">
            {site.intro.map((paragraph, i) => (
              <p key={i}>
                {paragraph.map((part, j) =>
                  typeof part === "string" ? (
                    part
                  ) : part.href ? (
                    <a
                      key={j}
                      href={part.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline-offset-4 hover:underline"
                    >
                      {part.text}
                    </a>
                  ) : (
                    <span key={j} className="text-foreground">
                      {part.text}
                    </span>
                  )
                )}
              </p>
            ))}
          </div>

          <nav aria-label="Elsewhere" className="flex flex-wrap gap-2">
            {socials.map((s) => (
              <Button
                key={s.platform}
                variant="outline"
                size="icon-lg"
                nativeButton={false}
                render={
                  <a
                    href={s.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    aria-label={s.label}
                    title={`${s.label} · ${s.handle}`}
                  />
                }
              >
                <BrandIcon platform={s.platform} />
              </Button>
            ))}
          </nav>
        </div>
      </header>
    </main>
  )
}
