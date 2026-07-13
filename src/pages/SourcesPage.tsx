import { BadgeCheck, BookOpenCheck, ExternalLink, Info, Lightbulb, ListFilter, RefreshCw, RotateCcw, Search, SearchX, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { evidenceClaims, getEvidenceSourcesForClaim } from "../data/content";
import type { EvidenceCategory } from "../types";

const filters: Array<{ id: "all" | EvidenceCategory; label: string }> = [
  { id: "all", label: "All evidence" },
  { id: "A", label: "A · Electorate" },
  { id: "B", label: "B · Access" },
  { id: "C", label: "C · Institutional" },
  { id: "D", label: "D · Reform evidence" },
];

export function SourcesPage() {
  const [category, setCategory] = useState<"all" | EvidenceCategory>("all");
  const [query, setQuery] = useState("");
  const results = useMemo(() => evidenceClaims.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const haystack = `${item.title} ${item.claim} ${item.tags.join(" ")}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }), [category, query]);

  const clearFilters = () => {
    setCategory("all");
    setQuery("");
  };

  return <section className="section-pad interior-page">
    <div className="page-heading"><h1>Choose evidence that fits your argument.</h1><div className="library-stat"><BookOpenCheck aria-hidden="true" size={25} strokeWidth={1.7} /><strong>{evidenceClaims.length}</strong><span>claims with source notes</span></div></div>
    <div className="evidence-notice"><span className="evidence-notice-icon"><Info aria-hidden="true" size={21} strokeWidth={1.8} /></span><span className="evidence-notice-label">Evidence standard</span><p>Every claim names the publication behind it. “Refresh needed” flags a current figure, commentary, or research lead to confirm before public use.</p></div>
    <div className="library-tools">
      <label className="search-field"><span className="sr-only">Search evidence</span><Search aria-hidden="true" size={18} strokeWidth={1.8} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search participation, competition, trust…" /></label>
      <div className="filter-row" aria-label="Filter evidence by category"><span className="filter-icon" aria-hidden="true"><ListFilter size={17} strokeWidth={1.8} /></span>{filters.map((filter) => <button key={filter.id} type="button" className={category === filter.id ? "active" : ""} onClick={() => setCategory(filter.id)}>{filter.label}</button>)}</div>
    </div>
    <p className="result-count" role="status">Showing {results.length} of {evidenceClaims.length} claims</p>
    <div className="source-grid">{results.map((item) => {
      const needsRefresh = item.verificationStatus === "research_lead";
      const sources = getEvidenceSourcesForClaim(item);
      return <article className="source-card" key={item.id}>
        <div className="source-card-top"><span className="category-badge">{item.category}</span><span className={`verification-badge ${needsRefresh ? "needs-refresh" : ""}`}>{needsRefresh ? <RefreshCw aria-hidden="true" size={13} /> : <BadgeCheck aria-hidden="true" size={13} />}{needsRefresh ? "Refresh needed" : "Source checked"}</span></div>
        <p className="source-category">{item.categoryLabel}</p><h2>{item.title}</h2><p className="source-claim">{item.claim}</p>
        <dl>
          <div><dt><Lightbulb aria-hidden="true" size={15} />Best use</dt><dd>{item.bestUse}</dd></div>
          <div className="caveat-row"><dt><TriangleAlert aria-hidden="true" size={15} />Caveat</dt><dd>{item.caveat}</dd></div>
        </dl>
        <footer className="source-list">{sources.map((source) => <div key={source.id}><cite>{source.url ? <a href={source.url} target="_blank" rel="noreferrer">{source.title}<ExternalLink aria-hidden="true" size={13} /></a> : source.title}{source.publisher && <small>{source.publisher}{source.year ? ` · ${source.year}` : ""}</small>}</cite><span>{source.locator}</span></div>)}</footer>
      </article>;
    })}</div>
    {results.length === 0 && <div className="empty-state"><SearchX aria-hidden="true" size={38} strokeWidth={1.6} /><h2>No matching evidence</h2><p>Try a different word or clear the category filter.</p><button className="button button-quiet" type="button" onClick={clearFilters}>Clear search and filters <RotateCcw aria-hidden="true" size={16} /></button></div>}
  </section>;
}
