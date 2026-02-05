// Scans AI response text for destination mentions and returns matching destination data.
// Used to render rich inline cards in the chat when the AI talks about specific destinations.

import { LUXURY_DESTINATIONS, type Destination } from "./travel-data";

// Additional keywords that map to destinations (aliases, common references)
const DESTINATION_ALIASES: Record<string, string[]> = {
  santorini: ["santorini", "oia", "greece", "aegean", "greek islands", "cyclades"],
  kyoto: ["kyoto", "japan", "japanese", "bamboo grove", "geisha"],
  maldives: ["maldives", "maldivian", "overwater villa", "atoll"],
  "swiss-alps": ["swiss alps", "switzerland", "alpine", "zermatt", "glacier express", "matterhorn"],
  paris: ["paris", "eiffel", "louvre", "champs", "montmartre"],
  amalfi: ["amalfi", "positano", "ravello", "sorrento", "amalfi coast"],
  safari: ["serengeti", "safari", "tanzania", "great migration", "kilimanjaro"],
};

export function detectDestinations(text: string, maxResults = 2): Destination[] {
  const lowerText = text.toLowerCase();
  const detected: Destination[] = [];
  const seenIds = new Set<string>();

  for (const dest of LUXURY_DESTINATIONS) {
    if (seenIds.has(dest.id)) continue;

    // Check destination name and country
    const nameMatch =
      lowerText.includes(dest.name.toLowerCase()) ||
      lowerText.includes(dest.country.toLowerCase());

    // Check aliases
    const aliases = DESTINATION_ALIASES[dest.id] || [];
    const aliasMatch = aliases.some((alias) => lowerText.includes(alias));

    if (nameMatch || aliasMatch) {
      detected.push(dest);
      seenIds.add(dest.id);
    }

    if (detected.length >= maxResults) break;
  }

  return detected;
}
