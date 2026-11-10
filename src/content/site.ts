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

// A part of a sentence in the intro. Plain strings are quiet grey; objects
// stand out in full colour, and become links when they have an href.
export type IntroPart = string | { text: string; href?: string }

export const site = {
  url: "https://barryscheffka.com",
  name: "Barry Scheffka",
  handle: "@barryscheffka",
  // One plain sentence for search results and link previews.
  bio: "Designing and building things for the devices I love.",
  // The intro below the name, one array per paragraph.
  intro: [
    [
      "I design and build things for the devices I love, with an eye for ",
      { text: "detail" },
      " and ",
      { text: "restraint" },
      ".",
    ],
    [
      "I'm a ",
      { text: "Community Solutions Manager" },
      " at ",
      { text: "Levellr", href: "https://levellr.com" },
      ".",
    ],
    [
      "I'm also designing ",
      { text: "Vylee", href: "https://vylee.app" },
      ", a new ",
      { text: "family of community apps" },
      " made to work together seamlessly.",
    ],
  ] as IntroPart[][],
  // Square photos in public/, one per appearance.
  avatar: {
    light: "/avatar-light.jpg",
    dark: "/avatar-dark.webp",
  },
  email: "contact@barryscheffka.com",
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
