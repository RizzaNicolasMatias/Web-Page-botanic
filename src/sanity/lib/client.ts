import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "../env";

export const client = isSanityConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // false para que los cambios de precios y stock se vean al instante
    })
  : null;