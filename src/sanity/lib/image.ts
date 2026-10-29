import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
});

export function urlFor(source: unknown) {
  return builder.image(source as Parameters<typeof builder.image>[0]);
}