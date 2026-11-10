import type { Metadata } from "next"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { site } from "@/content/site"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.bio,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: site.url,
    title: site.name,
    description: site.bio,
    siteName: new URL(site.url).host,
    images: [site.avatar.light],
  },
  twitter: {
    card: "summary",
    creator: site.handle,
    images: [site.avatar.light],
  },
}

// The card Discord shows for a pasted link, built from Discord components
// (docs.discord.com/developers/link-previews/component-embeds). No
// accent_color, so the container has no coloured edge. The Open Graph tags
// above stay as the fallback.
const discordEmbed = {
  component: {
    type: 17, // Container
    components: [
      {
        type: 9, // Section
        components: [
          {
            type: 10, // Text Display
            content: `## [${site.name}](${site.url})\n${site.bio}`,
          },
        ],
        accessory: {
          type: 11, // Thumbnail
          media: { url: new URL(site.avatar.light, site.url).href },
        },
      },
      {
        type: 1, // Action Row
        components: [
          { type: 2, style: 5, url: site.url, label: "Visit" }, // Link button
        ],
      },
    ],
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          id="discord:component-embed"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(discordEmbed).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
