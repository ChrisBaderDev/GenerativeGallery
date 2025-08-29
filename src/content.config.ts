import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

let studiesCounter = 0;

const studies = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/studies",
    generateId: ({ data }) => {
      const title = data.title as string;
      const baseSlug = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");
      return `${studiesCounter++}-${baseSlug}`;
    },
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      date: z.coerce.date(),
      status: z.enum(["Draft", "Published", "Archived"]),
      technology: z.enum(["p5js", "threejs"]),
      thumbnail: z.object({
        src: image(),
        alt: z.string(),
      }),
      category: z
        .enum([
          "Generative Art",
          "UI/UX Experiment",
          "3D/WebGL",
          "Data Visualization",
          "Installation",
        ])
        .optional(),
      seoTitle: z.string(),
      seoDescription: z.string(),
    }),
});

export const collections = { studies };