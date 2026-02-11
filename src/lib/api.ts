/**
 * API Client for UpSpeech backend
 * Base URL should be configured via environment variable
 */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3050/api/v1";

export interface Technique {
  id: number;
  slug: string;
  category_type: "main_category" | "subcategory" | "standalone";
  name: string;
  description: string;
  practical_description: string;
  objective: string;
  instructions: string;
  learn_more_url: string;
  display_order: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
  parent_technique?: {
    slug: string;
    name: string;
    category_type: string;
  };
  sub_techniques?: Array<{
    slug: string;
    name: string;
    description: string;
    display_order: number;
    featured: boolean;
  }>;
  mini_games_count?: number;
  consultation_exercises_count?: number;
}

export interface TechniquesResponse {
  techniques: Technique[];
}

export interface TechniqueResponse {
  technique: Technique;
}

/**
 * Fetch all techniques
 * @param locale - Language code (en, pt, es)
 * @param featured - Filter by featured techniques only
 */
export async function fetchTechniques(
  locale: string = "en",
  featured?: boolean,
): Promise<Technique[]> {
  const params = new URLSearchParams({ locale });
  if (featured) {
    params.append("featured", "true");
  }

  const response = await fetch(`${API_BASE_URL}/techniques?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch techniques: ${response.statusText}`);
  }

  const data: TechniquesResponse = await response.json();
  return data.techniques;
}

/**
 * Fetch a single technique by slug
 * @param slug - Technique slug
 * @param locale - Language code (en, pt, es)
 */
export async function fetchTechnique(
  slug: string,
  locale: string = "en",
): Promise<Technique> {
  const params = new URLSearchParams({ locale });
  const response = await fetch(`${API_BASE_URL}/techniques/${slug}?${params}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Technique not found: ${slug}`);
    }
    throw new Error(`Failed to fetch technique: ${response.statusText}`);
  }

  const data: TechniqueResponse = await response.json();
  return data.technique;
}
