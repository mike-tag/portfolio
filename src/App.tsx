import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "./components/SiteLayout";
import { AboutPage } from "./pages/AboutPage";
import { AdvocacyCaseStudyPage } from "./pages/AdvocacyCaseStudyPage";
import { ExamplesPage } from "./pages/ExamplesPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { MethodPage } from "./pages/MethodPage";
import { SourcesPage } from "./pages/SourcesPage";
import { SkillsMarketPage } from "./pages/SkillsMarketPage";
import { TransformationPage } from "./pages/TransformationPage";
import { WorkbenchPage } from "./pages/WorkbenchPage";
import type { PageId } from "./types";

const pages: PageId[] = ["home", "skills", "advocacy", "workbench", "sources", "method", "examples", "about", "transformation"];

const pageTitles: Record<PageId, string> = {
  home: "Mike Tagariello | AI transformation portfolio",
  skills: "Skills market | Mike Tagariello",
  advocacy: "Advocacy Workbench case study | Mike Tagariello",
  workbench: "Build your advocacy prompt | Advocacy Workbench",
  sources: "Evidence | Advocacy Workbench",
  method: "Method | Advocacy Workbench",
  examples: "Examples | Advocacy Workbench",
  about: "About | Advocacy Workbench",
  transformation: "Consulting Reformed | Transformation Factory",
};

function pageFromHash(): PageId {
  const value = window.location.hash.replace(/^#\/?/, "") || "home";
  return pages.includes(value as PageId) ? value as PageId : "home";
}

export default function App() {
  const [page, setPage] = useState<PageId>(pageFromHash);
  const pageMounted = useRef(false);

  useEffect(() => {
    const handleHashChange = () => {
      setPage(pageFromHash());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    document.title = pageTitles[page];
    if (pageMounted.current) {
      const heading = document.querySelector<HTMLElement>("#main-content h1");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus();
    } else {
      pageMounted.current = true;
    }
  }, [page]);

  return (
    <SiteLayout page={page}>
      {page === "home" && <ExperiencePage />}
      {page === "skills" && <SkillsMarketPage />}
      {page === "advocacy" && <AdvocacyCaseStudyPage />}
      {page === "workbench" && <WorkbenchPage />}
      {page === "sources" && <SourcesPage />}
      {page === "method" && <MethodPage />}
      {page === "examples" && <ExamplesPage />}
      {page === "about" && <AboutPage />}
      {page === "transformation" && <TransformationPage />}
    </SiteLayout>
  );
}
