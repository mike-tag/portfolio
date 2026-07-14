import { BookOpenCheck, House, Info, LayoutGrid, Mic2, PencilLine, Route, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { PageId } from "../types";
import { MikeSigil } from "./MikeSigil";

const navItems: Array<{ id: PageId; label: string; Icon: LucideIcon }> = [
  { id: "advocacy", label: "Home", Icon: House },
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
  const isGateway = page === "home";
  const isTransformation = page === "transformation";
  const isAdvocacy = !isGateway && !isTransformation;
  const shellClass = isGateway ? "gateway-shell" : isTransformation ? "transformation-shell" : "";
  const brandHref = isTransformation ? "#/transformation" : "#/advocacy";
  const brandLabel = isTransformation ? "Consulting Reformed home" : "VAV Advocacy Workbench home";

  return (
    <div className={`site-shell ${shellClass}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {!isGateway && <header className="site-header">
        <a className="brand" href={brandHref} aria-label={brandLabel}>
          <span className="brand-mark" aria-hidden="true">{isTransformation ? "CR" : "V"}</span>
          <span>
            <strong>{isTransformation ? "Consulting Reformed" : "Advocacy Workbench"}</strong>
            <small>{isTransformation ? "Transformation Factory" : "Open primaries pilot"}</small>
          </span>
        </a>
        <div className="header-actions">
          {isAdvocacy && <nav className="site-nav" aria-label="Advocacy navigation">
            {navItems.map(({ id, label, Icon }) => (
              <a key={id} href={`#/${id}`} aria-current={page === id ? "page" : undefined}>
                <Icon aria-hidden="true" size={15} strokeWidth={1.9} />{label}
              </a>
            ))}
          </nav>}
          <a className="all-demos-link" href="#/"><LayoutGrid aria-hidden="true" size={15} />All demos</a>
        </div>
      </header>}
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div>
          <span className="footer-mark" aria-hidden="true">{isGateway ? <MikeSigil /> : isTransformation ? "CR" : "V"}</span>
          <p><strong>{isGateway ? "Mike Tagariello" : isTransformation ? "Consulting Reformed" : "Veterans for All Voters Advocacy Workbench"}</strong><br />{isGateway ? "Practical systems for complex change" : isTransformation ? "Transformation Factory demonstration" : "Open primaries example"}</p>
        </div>
        <p className="footer-privacy"><ShieldCheck aria-hidden="true" size={20} strokeWidth={1.7} /><span>{isGateway ? "These static demonstrations make no network calls." : isTransformation ? "This static demonstration uses illustrative data and makes no network calls." : "This beta creates a work packet and drafting prompt. It does not send your information anywhere."}</span></p>
      </footer>
    </div>
  );
}
