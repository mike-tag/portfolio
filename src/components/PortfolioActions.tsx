import { Download, ExternalLink } from "lucide-react";

type PortfolioActionsProps = {
  className?: string;
};

export function PortfolioActions({ className = "" }: PortfolioActionsProps) {
  return (
    <div className={`portfolio-actions ${className}`.trim()}>
      <a
        className="portfolio-linkedin"
        href="https://www.linkedin.com/in/miketagariello/"
        target="_blank"
        rel="noreferrer"
      >
        <img className="linkedin-mark" src="./linkedin-logo-initials.png" alt="" />
        Connect with Mike on LinkedIn
        <ExternalLink aria-hidden="true" size={15} strokeWidth={2} />
      </a>
      <a
        className="portfolio-linkedin portfolio-resume"
        href="./mike-tagariello-resume.pdf"
        download="Mike-Tagariello-Resume.pdf"
        type="application/pdf"
      >
        <Download aria-hidden="true" size={18} strokeWidth={2} />
        Download resume
        <span className="portfolio-file-type" aria-hidden="true">PDF</span>
      </a>
    </div>
  );
}
