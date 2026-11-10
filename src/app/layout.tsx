import type { Metadata, Viewport } from "next"
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
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
