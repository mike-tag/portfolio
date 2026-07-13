import type { AdvocacyFrame, ValuePrinciple, WorkbenchState } from "../types";

export const vavValues: ValuePrinciple[] = [
  {
    id: "service",
    shortLabel: "Service",
    title: "Lead with service",
    description: "Connect reform to responsibility, leadership, and the democratic values veterans served to protect.",
  },
  {
    id: "voter_agency",
    shortLabel: "Voter voice",
    title: "Empower voters",
    description: "Keep the focus on voters having a meaningful voice, not on political insiders or procedural advantage.",
  },
  {
    id: "common_ground",
    shortLabel: "Common ground",
    title: "Build common ground",
    description: "Use a unifying, country-first frame that invites people in rather than sorting them into opposing camps.",
  },
  {
    id: "practical_action",
    shortLabel: "Action",
    title: "Offer a practical way forward",
    description: "Move from frustration to a concrete, achievable action a decision-maker can take.",
  },
  {
    id: "authentic_voice",
    shortLabel: "Real stories",
    title: "Use an authentic voice",
    description: "Make policy human through lived experience, community context, and plain language without insider jargon.",
  },
  {
    id: "trust",
    shortLabel: "Trust",
    title: "Restore trust and accountability",
    description: "Show how fairer, more open elections can strengthen legitimacy, competition, and public accountability.",
  },
];

export const advocacyFrames: AdvocacyFrame[] = [
  {
    id: "governance_legitimacy",
    label: "Governance + legitimacy",
    summary: "Government carries a stronger mandate when more of the people affected by its decisions can participate meaningfully.",
    bestFor: "Commissions, civic leaders, institutional reformers, and public-trust audiences.",
    watchOut: "Do not promise that one election reform automatically fixes trust or government performance.",
    sampleOpening: "City government works best when the people who rely on it have a meaningful voice in choosing its leadership.",
    valueIds: ["trust", "voter_agency", "practical_action"],
  },
  {
    id: "service_working_people",
    label: "Service + working people",
    summary: "Election rules should help public institutions answer to the people who depend on schools, transit, housing, and neighborhood services.",
    bestFor: "Labor, service-delivery, neighborhood, and working-family audiences.",
    watchOut: "Keep the connection to services concrete; avoid implying direct causal effects the evidence cannot establish.",
    sampleOpening: "The people who keep this city running deserve a real voice in choosing the leaders who shape the services they count on.",
    valueIds: ["service", "voter_agency", "trust"],
  },
  {
    id: "equal_access",
    label: "Equal access + voter voice",
    summary: "Public elections should not leave a large share of eligible voters without a meaningful role in the contest that decides representation.",
    bestFor: "Access, participation, civil-rights, and voter-inclusion audiences.",
    watchOut: "Pair exclusion language with a constructive remedy; do not make grievance the entire message.",
    sampleOpening: "A public election should give every eligible voter a meaningful path to participate.",
    valueIds: ["voter_agency", "common_ground", "practical_action"],
  },
  {
    id: "veterans_service",
    label: "Veterans + service",
    summary: "Veterans can connect service abroad and at home to a democracy that hears every voter and rewards responsible leadership.",
    bestFor: "Veteran-led testimony, coalition outreach, and values-first public communication.",
    watchOut: "Center a real story and a specific ask; avoid using veteran identity as a substitute for evidence.",
    sampleOpening: "Veterans served to protect democracy, and that service continues when we work to make democracy stronger at home.",
    valueIds: ["service", "authentic_voice", "common_ground"],
  },
  {
    id: "competition_accountability",
    label: "Competition + accountability",
    summary: "Leaders should have to earn support from a broader electorate and remain accountable to more of the people they represent.",
    bestFor: "Good-government, editorial, business, and reform-minded audiences.",
    watchOut: "Competition effects depend on the reform design and political context; acknowledge trade-offs.",
    sampleOpening: "Elected leaders are more accountable when they have to compete for every vote they can earn.",
    valueIds: ["trust", "practical_action", "voter_agency"],
  },
];


export { evidenceClaims, evidenceSources, getEvidenceSourcesForClaim } from "./evidence";

export const reviewChecklist = [
  "I added a real moment, observation, or detail that only I could contribute—and removed anything that does not sound like me.",
  "I read it aloud and adjusted the tone, length, and examples for this specific audience and setting.",
  "I checked every name, number, quote, and source, and made the exact action I want unmistakable.",
];

export const blankWorkbenchState: WorkbenchState = {
  issue: "",
  jurisdiction: "",
  advocacyMoment: "Public hearing",
  artifactType: "2-minute testimony",
  goal: "Persuade",
  length: "2 minutes",
  callToAction: "",
  targetName: "",
  targetRole: "",
  publicFacts: "",
  strategicJudgment: "",
  likelyObjections: "",
  advocateStory: "",
  tone: "Values-led and plainspoken",
  selectedValues: [],
  selectedFrame: "",
  selectedEvidence: [],
};

export const demoWorkbenchState: WorkbenchState = {
  issue: "Open, nonpartisan primaries for New York City elections",
  jurisdiction: "New York City",
  advocacyMoment: "Public hearing",
  artifactType: "2-minute testimony",
  goal: "Persuade the commission to advance reform",
  length: "2 minutes",
  callToAction: "Recommend that voters receive a proposal for an open, all-candidate primary system.",
  targetName: "NYC Commission on Government Efficiency",
  targetRole: "City government reform commission",
  publicFacts: "The commission is publicly focused on more effective government, outcomes for working people, service delivery, and public trust.",
  strategicJudgment: "A legitimacy-and-performance case is likely to be stronger than an exclusion-only argument. Connect participation to the commission's institutional purpose.",
  likelyObjections: "Primary rules may feel outside the commission's core mandate; reform could sound partisan or procedural; the evidence on downstream outcomes is mixed.",
  advocateStory: "I served because I believe responsibility does not end when the uniform comes off. In my community, I have seen how people disengage when public elections feel closed to them.",
  tone: "Values-led and plainspoken",
  selectedValues: ["service", "voter_agency", "trust", "practical_action", "authentic_voice"],
  selectedFrame: "governance_legitimacy",
  selectedEvidence: ["bpc_open_access_effect", "representativeness", "mixed_downstream_outcomes"],
};
