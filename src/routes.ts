import type { PageId } from "./types";

export type SiteSurface = "portfolio-home" | "portfolio-case" | "advocacy-product" | "presentation";

export type RouteDefinition = {
  title: string;
  surface: SiteSurface;
  projectLabel?: string;
};

export const routeDefinitions: Record<PageId, RouteDefinition> = {
  home: {
    title: "Mike Tagariello | AI transformation portfolio",
    surface: "portfolio-home",
  },
  transformation: {
    title: "Consulting Reformed | Mike Tagariello",
    surface: "portfolio-case",
    projectLabel: "Role redesign",
  },
  "the-build": {
    title: "The Build | Mike Tagariello",
    surface: "presentation",
  },
  skills: {
    title: "Reusable AI skills | Mike Tagariello",
    surface: "portfolio-case",
    projectLabel: "Reusable expertise",
  },
  advocacy: {
    title: "Advocacy Workbench case study | Mike Tagariello",
    surface: "portfolio-case",
    projectLabel: "Usable workflows",
  },
  workbench: {
    title: "Build your advocacy prompt | Advocacy Workbench",
    surface: "advocacy-product",
  },
  sources: {
    title: "Evidence | Advocacy Workbench",
    surface: "advocacy-product",
  },
  method: {
    title: "Method | Advocacy Workbench",
    surface: "advocacy-product",
  },
  examples: {
    title: "Examples | Advocacy Workbench",
    surface: "advocacy-product",
  },
  about: {
    title: "About | Advocacy Workbench",
    surface: "advocacy-product",
  },
};

export const pageIds = Object.keys(routeDefinitions) as PageId[];
