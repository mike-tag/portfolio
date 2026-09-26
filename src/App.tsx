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
import { TheBuildPage } from "./pages/TheBuildPage";
import { EnterpriseBuildPage } from "./pages/EnterpriseBuildPage";
import { WorkbenchPage } from "./pages/WorkbenchPage";
import { pageIds, routeDefinitions } from "./routes";
import type { PageId } from "./types";
import { portfolioOverviewTarget } from "./data/portfolio";

function pageFromHash(hash: string): PageId {
  const value = hash.split("?")[0].replace(/^#\/?/, "") || "home";
  return pageIds.includes(value as PageId) ? value as PageId : "home";
}

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const page = pageFromHash(hash);
  const pageMounted = useRef(false);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    const revisitPage = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest?.("a");
      if (link?.href === window.location.href && window.location.hash.startsWith("#/")) {
        window.requestAnimationFrame(() => {
          const target = portfolioOverviewTarget(window.location.hash);
          if (target) {
            document.getElementById(target.region)?.scrollIntoView({ block: "start" });
            document.getElementById(target.heading)?.focus({ preventScroll: true });
          } else {
            window.scrollTo(0, 0);
            document.querySelector<HTMLElement>("#main-content h1")?.focus({ preventScroll: true });
          }
        });
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    document.addEventListener("click", revisitPage);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", revisitPage);
    };
  }, []);

  useEffect(() => {
    document.title = routeDefinitions[page].title;
    const overviewTarget = portfolioOverviewTarget(hash);
    const resetScroll = () => {
      if (overviewTarget) {
        document.getElementById(overviewTarget.region)?.scrollIntoView({ block: "start" });
        document.getElementById(overviewTarget.heading)?.focus({ preventScroll: true });
        return;
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    resetScroll();
    const scrollFrame = window.requestAnimationFrame(resetScroll);
    if (pageMounted.current && !overviewTarget) {
      const heading = document.querySelector<HTMLElement>("#main-content h1");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
    } else {
      pageMounted.current = true;
    }
    return () => window.cancelAnimationFrame(scrollFrame);
  }, [page, hash]);

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
      {page === "the-build" && <TheBuildPage />}
      {page === "enterprise-build" && <EnterpriseBuildPage />}
    </SiteLayout>
  );
}
