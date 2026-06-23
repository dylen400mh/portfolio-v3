// Single source of truth for all site content + identity.
// Update SITE_URL before deploying to a domain other than the one below —
// it backs the self-referencing canonical URLs on every blog post.

export const SITE_URL = "https://dylenbelanger.com";

export const site = {
  name: "Dylen Belanger",
  tagline: "Software Engineering at Western University",
  email: "dbelang8@uwo.ca",
  // Resume lives on Google Drive (must be shared "anyone with the link can view").
  resumeUrl: "https://drive.google.com/file/d/1BfkkxCWK0AzbCUvmVUR03EX8twmsXF8R/view",
  githubUrl: "https://github.com/dylen400mh",
  linkedinUrl: "https://linkedin.com/in/dylenbelanger",
} as const;
