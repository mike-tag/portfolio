import { ArrowLeft } from "lucide-react";
import { PortfolioActions } from "./PortfolioActions";

type PortfolioCaseClosingProps = {
  heading?: string;
  description?: string;
};

export function PortfolioCaseClosing({
  heading = "Let’s talk about making AI useful in real work.",
  description = "If this is the kind of transformation judgment your team needs, connect with Mike or download his résumé.",
}: PortfolioCaseClosingProps) {
  return (
    <section className="portfolio-case-closing" aria-labelledby="portfolio-case-closing-title">
      <div>
        <h2 id="portfolio-case-closing-title">{heading}</h2>
        <p>{description}</p>
      </div>
      <PortfolioActions className="portfolio-case-closing-actions" />
      <a className="portfolio-case-back" href="#/">
        <ArrowLeft aria-hidden="true" size={17} />
        Return to the portfolio
      </a>
    </section>
  );
}
