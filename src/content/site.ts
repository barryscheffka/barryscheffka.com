export type Platform =
  | "x"
  | "instagram"
  | "threads"
  | "github"
  | "linkedin"
  | "youtube"
  | "tiktok"
  | "twitch"
  | "figma"
  | "notion"

export type Social = {
  platform: Platform
  label: string
  href: string
}

export type IntroPart = string | { text: string; href: string }

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
  avatar: {
    light: "/avatar-light.jpg",
    dark: "/avatar-dark.jpg",
  },
}

export const socials: Social[] = [
  { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/barryscheffka" },
  { platform: "youtube", label: "YouTube", href: "https://www.youtube.com/@barryscheffka" },
  { platform: "instagram", label: "Instagram", href: "https://instagram.com/barryscheffka" },
  { platform: "github", label: "GitHub", href: "https://github.com/barryscheffka" },
  { platform: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@barryscheffka" },
  { platform: "x", label: "X", href: "https://x.com/barryscheffka" },
  { platform: "twitch", label: "Twitch", href: "https://www.twitch.tv/barryscheffka" },
  { platform: "threads", label: "Threads", href: "https://www.threads.com/@barryscheffka" },
  { platform: "figma", label: "Figma Community", href: "https://www.figma.com/@barryscheffka" },
  { platform: "notion", label: "Notion Marketplace", href: "https://www.notion.com/@barryscheffka" },
]
