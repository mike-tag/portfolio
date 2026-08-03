import { BadgeCheck, ExternalLink, RefreshCw, RotateCcw, Search, SearchX, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { evidenceClaims, getEvidenceSourcesForClaim } from "../data/content";
import type { EvidenceCategory } from "../types";

const filters: Array<{ id: "all" | EvidenceCategory; label: string }> = [
  { id: "all", label: "All evidence" },
  { id: "A", label: "Electorate" },
  { id: "B", label: "Access" },
  { id: "C", label: "Institutional case" },
  { id: "D", label: "Reform evidence" },
];

export function SourcesPage() {
  const [category, setCategory] = useState<"all" | EvidenceCategory>("all");
  const [query, setQuery] = useState("");
  const results = useMemo(() => evidenceClaims.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const haystack = `${item.title} ${item.claim} ${item.categoryLabel} ${item.reformType} ${item.tags.join(" ")}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }), [category, query]);

  const clearFilters = () => {
    setCategory("all");
    setQuery("");
  };

  return (
    <section className="adv-depth-page adv-evidence-page">
      <header className="adv-depth-header">
        <div>
          <h1>Inspect the evidence behind the workbench.</h1>
          <p>Each of the {evidenceClaims.length} claim records keeps its intended use, limitation, reform design, verification status, and underlying publications together.</p>
        </div>
        <a className="button button-primary" href="#/workbench">Open the workbench</a>
      </header>

      <div className="adv-evidence-tools">
        <label>
          <span className="sr-only">Search evidence</span>
          <Search aria-hidden="true" size={18} />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search participation, competition, trust…" />
        </label>
        <div className="adv-evidence-filters" aria-label="Filter evidence by category">
          {filters.map((filter) => (
            <button key={filter.id} type="button" className={category === filter.id ? "active" : ""} onClick={() => setCategory(filter.id)}>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <p className="adv-result-count" role="status">Showing {results.length} of {evidenceClaims.length} claims</p>

      <div className="adv-evidence-records">
        {results.map((item) => {
          const needsRefresh = item.verificationStatus === "research_lead";
          const sources = getEvidenceSourcesForClaim(item);
          return (
            <details className="adv-evidence-record" key={item.id}>
              <summary>
                <span className="adv-record-status">
                  <span>{item.categoryLabel}</span>
                  <span className={needsRefresh ? "needs-refresh" : ""}>
                    {needsRefresh ? <RefreshCw aria-hidden="true" size={14} /> : <BadgeCheck aria-hidden="true" size={14} />}
                    {needsRefresh ? "Refresh needed" : "Source checked"}
                  </span>
                </span>
                <span className="adv-record-copy">
                  <strong>{item.title}</strong>
                  <span>{item.claim}</span>
                  <em><TriangleAlert aria-hidden="true" size={15} /><b>Keep in mind:</b> {item.caveat}</em>
                </span>
                <span className="adv-record-expand">Review the full record</span>
              </summary>
              <div className="adv-record-detail">
                <dl>
                  <div><dt>Best use</dt><dd>{item.bestUse}</dd></div>
                  <div><dt>Reform type</dt><dd>{item.reformType || "Multiple or not specified"}</dd></div>
                  <div><dt>Verification</dt><dd>{needsRefresh ? "Confirm the current or primary source before public use." : "Underlying source and locator checked; preserve the stated caveat."}</dd></div>
                </dl>
                <div className="adv-record-sources">
                  <h2>Underlying publications</h2>
                  {sources.map((source) => (
                    <article key={source.id}>
                      <cite>
                        {source.url ? <a href={source.url} target="_blank" rel="noreferrer">{source.title}<ExternalLink aria-hidden="true" size={13} /></a> : source.title}
                      </cite>
                      <p>{source.publisher}{source.publisher && source.year ? " · " : ""}{source.year}</p>
                      <p>{source.locator}</p>
                    </article>
                  ))}
                </div>
              </div>
            </details>
          );
        })}
      </div>

      {results.length === 0 && (
        <div className="adv-empty-state">
          <SearchX aria-hidden="true" size={38} />
          <h2>No matching evidence</h2>
          <p>Try a different word or clear the filters.</p>
          <button className="button button-quiet" type="button" onClick={clearFilters}>Clear search and filters <RotateCcw aria-hidden="true" size={16} /></button>
        </div>
      )}

      <nav className="adv-depth-links" aria-label="More Advocacy Workbench detail">
        <a href="#/method">See how evidence is handled</a>
        <a href="#/examples">Compare testimony approaches</a>
        <a href="#/about">Review the pilot boundaries</a>
      </nav>
    </section>
  );
}
