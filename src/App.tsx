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
import { pageIds, routeDefinitions } from "./routes";
import type { PageId } from "./types";

function pageFromHash(): PageId {
  const value = window.location.hash.replace(/^#\/?/, "") || "home";
  return pageIds.includes(value as PageId) ? value as PageId : "home";
}

export default function App() {
  const [page, setPage] = useState<PageId>(pageFromHash);
  const pageMounted = useRef(false);

  useEffect(() => {
    const handleHashChange = () => {
      setPage(pageFromHash());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    document.title = routeDefinitions[page].title;
    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    resetScroll();
    const scrollFrame = window.requestAnimationFrame(resetScroll);
    if (pageMounted.current) {
      const heading = document.querySelector<HTMLElement>("#main-content h1");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
    } else {
      pageMounted.current = true;
    }
    return () => window.cancelAnimationFrame(scrollFrame);
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
