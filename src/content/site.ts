// Everything on the page comes from this file. Edit here; the layout follows.

export type Platform =
  | "x"
  | "instagram"
  | "threads"
  | "github"
  | "linkedin"
  | "youtube"
  | "tiktok"
  | "twitch"

export type Social = {
  platform: Platform
  label: string
  handle: string
  href: string
}

// A part of a sentence in the intro: plain text, or a link that stands out.
export type IntroPart = string | { text: string; href: string }

// The intro below the name, one array per paragraph. The first paragraph is
// also the description in search results and link previews.
const intro: IntroPart[][] = [
  [
    "I care about how things look, how they feel, and who they bring together. Most of my time goes into communities: the people in them, and the tools that help them thrive.",
  ],
  [
    "I'm a Community Solutions Manager at ",
    { text: "Levellr", href: "https://levellr.com" },
    ".",
  ],
  [
    "I'm also designing ",
    { text: "Vylee", href: "https://vylee.app" },
    ", a new family of community apps made to work together seamlessly.",
  ],
]

export const site = {
  url: "https://barryscheffka.com",
  name: "Barry Scheffka",
  handle: "@barryscheffka",
  email: "contact@barryscheffka.com",
  intro,
  bio: intro[0].map((part) => (typeof part === "string" ? part : part.text)).join(""),
  // Square photos in public/, one per appearance.
  avatar: {
    light: "/avatar-light.jpg",
    dark: "/avatar-dark.webp",
  },
}

// TODO: check each URL — handles are assumed to be @barryscheffka everywhere.
export const socials: Social[] = [
  { platform: "linkedin", label: "LinkedIn", handle: "in/barryscheffka", href: "https://www.linkedin.com/in/barryscheffka" },
  { platform: "youtube", label: "YouTube", handle: "@barryscheffka", href: "https://www.youtube.com/@barryscheffka" },
  { platform: "instagram", label: "Instagram", handle: "@barryscheffka", href: "https://instagram.com/barryscheffka" },
  { platform: "github", label: "GitHub", handle: "@barryscheffka", href: "https://github.com/barryscheffka" },
  { platform: "tiktok", label: "TikTok", handle: "@barryscheffka", href: "https://www.tiktok.com/@barryscheffka" },
  { platform: "x", label: "X", handle: "@barryscheffka", href: "https://x.com/barryscheffka" },
  { platform: "twitch", label: "Twitch", handle: "barryscheffka", href: "https://www.twitch.tv/barryscheffka" },
  { platform: "threads", label: "Threads", handle: "@barryscheffka", href: "https://www.threads.com/@barryscheffka" },
]
