import React, { useEffect, useRef, useState } from "react";
import { ArrowDownToLine, ArrowLeft, ArrowRight, ArrowUpRight, Minus, Plus } from "lucide-react";
import { nextPortfolioWork, portfolioHref, portfolioLocation, portfolioSections, workbenchPages } from "../data/portfolio";
import "./portfolio-navigation.css";

export function PortfolioNavigation({ page, inAgentDemo = false }: { page: string; inAgentDemo?: boolean }) {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const workButton = useRef<HTMLButtonElement>(null);
  const { section, proof, toolPage } = portfolioLocation(page);

  useEffect(() => { setOpen(false); }, [page]);
  useEffect(() => {
    if (open) header.current?.querySelector<HTMLAnchorElement>("#portfolio-work-menu a")?.focus();
  }, [open]);
  useEffect(() => {
    const close = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  return <header className="portfolio-navigation" ref={header}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false); }}
    onKeyDown={event => { if (event.key === "Escape" && open) { workButton.current?.focus(); setOpen(false); } }}>
    <div className="portfolio-navigation-top">
      <a className="portfolio-navigation-home" href={portfolioHref("home", inAgentDemo)} aria-label="Mike Tagariello — Portfolio home" aria-current={page === "home" ? "page" : undefined}>Mike Tagariello</a>
      <nav className="portfolio-primary-nav" aria-label="Main navigation">
        <button ref={workButton} type="button" aria-expanded={open} aria-controls="portfolio-work-menu" onClick={() => setOpen(!open)}>Explore work {open ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}</button>
        <a className="portfolio-nav-resume" href={`${inAgentDemo ? "../" : "./"}mike-tagariello-resume.pdf`} download="Mike-Tagariello-Resume.pdf" aria-label="Download Mike's resume (PDF)">Resume <ArrowDownToLine aria-hidden="true" /></a>
        <a className="portfolio-nav-connect" href="https://www.linkedin.com/in/miketagariello/" target="_blank" rel="noreferrer" aria-label="Connect with Mike on LinkedIn (opens a new tab)">Let’s talk <ArrowUpRight aria-hidden="true" /></a>
      </nav>
    </div>
    {open && <nav id="portfolio-work-menu" className="portfolio-work-menu" aria-label="Explore Mike's work" onClick={event => { if ((event.target as Element).closest("a")) setOpen(false); }}>
      <a className="portfolio-overview-link" href={portfolioHref("work", inAgentDemo)}>See all work <ArrowRight aria-hidden="true" /></a>
      <div className="portfolio-work-menu-grid">
        {portfolioSections.map(item => <section key={item.id} aria-labelledby={`nav-${item.id}`}>
          <h2 id={`nav-${item.id}`}><a href={portfolioHref(item.id, inAgentDemo)}>{item.label}<ArrowRight aria-hidden="true" /></a></h2>
          {item.pages.map(child => <a key={child.id} href={portfolioHref(child.id, inAgentDemo)} aria-current={proof?.id === child.id ? (toolPage ? "location" : "page") : undefined}>{child.label}{proof?.id === child.id ? <span className="portfolio-current-dot" aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}</a>)}
        </section>)}
      </div>
    </nav>}
    {section && proof && <div className="portfolio-context">
      <nav className="portfolio-breadcrumb" aria-label="Your place in the portfolio">
        <a href={portfolioHref(toolPage ? "advocacy" : section.id, inAgentDemo)}><ArrowLeft aria-hidden="true" />{toolPage ? "Communications case study" : section.label}</a>
        {!toolPage && <><span className="portfolio-breadcrumb-divider" aria-hidden="true">/</span><span aria-current="page">{proof.label}</span></>}
      </nav>
    </div>}
    {toolPage && <nav className="portfolio-workbench-nav" aria-label="Advocacy Workbench tasks">
      {workbenchPages.map(item => <a key={item.id} href={portfolioHref(item.id, inAgentDemo)} aria-current={page === item.id ? "page" : undefined}>{item.label}</a>)}
    </nav>}
  </header>;
}

export function PortfolioNextWork({ page, inAgentDemo = false }: { page: string; inAgentDemo?: boolean }) {
  const { section, proof } = portfolioLocation(page);
  if (!section || proof?.id !== page) return null;
  const next = nextPortfolioWork(page);
  return <nav className="portfolio-next-work" aria-label="Continue exploring">
    <a href={portfolioHref("work", inAgentDemo)}><ArrowLeft aria-hidden="true" />See all work</a>
    {next && <a className="portfolio-next-link" href={portfolioHref(next.id, inAgentDemo)}><span>Next: {next.label}</span><ArrowRight aria-hidden="true" /></a>}
  </nav>;
}
