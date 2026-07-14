export type PageId = "home" | "advocacy" | "workbench" | "sources" | "method" | "examples" | "about" | "transformation";

export type EvidenceCategory = "A" | "B" | "C" | "D";

export type VerificationStatus = "page_checked" | "research_lead";

export type ValuePrinciple = {
  id: string;
  title: string;
  shortLabel: string;
  description: string;
};

export type AdvocacyFrame = {
  id: string;
  label: string;
  summary: string;
  bestFor: string;
  watchOut: string;
  sampleOpening: string;
  valueIds: string[];
};

export type EvidenceClaim = {
  id: string;
  title: string;
  claim: string;
  category: EvidenceCategory;
  categoryLabel: string;
  bestUse: string;
  caveat: string;
  sourceIds: string[];
  reformType?: string;
  verificationStatus: VerificationStatus;
  tags: string[];
};

export type EvidenceSource = {
  id: string;
  title: string;
  locator: string;
  publisher?: string;
  year?: number;
  url?: string;
};

export type WorkbenchState = {
  issue: string;
  jurisdiction: string;
  advocacyMoment: string;
  artifactType: string;
  goal: string;
  length: string;
  callToAction: string;
  targetName: string;
  targetRole: string;
  publicFacts: string;
  strategicJudgment: string;
  likelyObjections: string;
  advocateStory: string;
  tone: string;
  selectedValues: string[];
  selectedFrame: string;
  selectedEvidence: string[];
};
