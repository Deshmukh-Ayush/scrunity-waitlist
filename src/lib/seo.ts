/**
 * SEO constants and helpers. Use NEXT_PUBLIC_SITE_URL in production for absolute OG/Twitter image URLs.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://scrunity.com");

export const SITE_NAME = "Scrunity";
export const DEFAULT_TITLE = "Scrunity — Research Your Ideas Like a Pro | AI Mind Maps & Flows";
export const DEFAULT_DESCRIPTION =
  "Join the Scrunity waitlist. Import everything, use AI on top of your research, and create mind-maps and flows. Research your ideas like a pro with Scrunity.";
export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

export const KEYWORDS = [
  "Scrunity",
  "AI research",
  "mind map",
  "mind map tool",
  "research tool",
  "AI whiteboard",
  "idea research",
  "productivity",
  "waitlist",
  "AI diagrams",
  "flow chart",
  "collaborative whiteboard",
];
