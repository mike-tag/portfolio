import { BookOpenCheck, House, Info, Mic2, PencilLine, Route, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { PageId } from "../types";

const navItems: Array<{ id: PageId; label: string; Icon: LucideIcon }> = [
  { id: "home", label: "Home", Icon: House },
  { id: "workbench", label: "Workbench", Icon: PencilLine },
  { id: "sources", label: "Evidence", Icon: BookOpenCheck },
  { id: "method", label: "Method", Icon: Route },
  { id: "examples", label: "Examples", Icon: Mic2 },
  { id: "about", label: "About", Icon: Info },
];

type SiteLayoutProps = {
  page: PageId;
  children: ReactNode;
};

export function SiteLayout({ page, children }: SiteLayoutProps) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#/" aria-label="VAV Advocacy Workbench home">
          <span className="brand-mark" aria-hidden="true">V</span>
          <span>
            <strong>Advocacy Workbench</strong>
            <small>Open Primaries Pilot</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map(({ id, label, Icon }) => (
            <a
              key={id}
              href={id === "home" ? "#/" : `#/${id}`}
              aria-current={page === id ? "page" : undefined}
            >
              <Icon aria-hidden="true" size={15} strokeWidth={1.9} />{label}
            </a>
          ))}
        </nav>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div>
          <span className="footer-mark" aria-hidden="true">V</span>
          <p><strong>Veterans for All Voters Advocacy Workbench</strong><br />Open primaries example</p>
        </div>
        <p className="footer-privacy"><ShieldCheck aria-hidden="true" size={20} strokeWidth={1.7} /><span>This beta creates a work packet and drafting prompt. It does not send your information anywhere.</span></p>
      </footer>
    </div>
  );
}
