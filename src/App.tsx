import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "./components/SiteLayout";
import { AboutPage } from "./pages/AboutPage";
import { ExamplesPage } from "./pages/ExamplesPage";
import { HomePage } from "./pages/HomePage";
import { MethodPage } from "./pages/MethodPage";
import { SourcesPage } from "./pages/SourcesPage";
import { WorkbenchPage } from "./pages/WorkbenchPage";
import type { PageId } from "./types";

const pages: PageId[] = ["home", "workbench", "sources", "method", "examples", "about"];

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
      {page === "home" && <HomePage />}
      {page === "workbench" && <WorkbenchPage />}
      {page === "sources" && <SourcesPage />}
      {page === "method" && <MethodPage />}
      {page === "examples" && <ExamplesPage />}
      {page === "about" && <AboutPage />}
    </SiteLayout>
  );
}
