export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export function isSanityConfigured(): boolean {
  return Boolean(
    projectId &&
      projectId !== "tu_project_id_aqui" &&
      /^[a-z0-9-]+$/.test(projectId)
  );
}