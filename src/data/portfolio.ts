// Shared by the portfolio overview, navigation, and recorded demonstrations.
export const portfolioSections = [
  {
    id: "reinvent", label: "Reinvent the work", title: "Reinvent how work gets done.",
    image: "reinvent-work.png",
    alt: "A hand rearranges a tangled model of tasks into a clear teal path with people at the decision points.",
    pages: [{ id: "transformation", label: "Redesign a role with AI" }],
  },
  {
    id: "build", label: "Build the system", title: "Build the system that makes it real.",
    image: "build-system.png",
    alt: "A hand fits a teal bridge into a working model connecting inputs, reusable methods, human review, and finished work.",
    pages: [
      { id: "enterprise-build", label: "Plan how to deliver AI" },
      { id: "feasibility", label: "Investigate what a build needs" },
      { id: "integration", label: "Put checks around AI actions" },
    ],
  },
  {
    id: "people", label: "Bring people along", title: "Bring people along with the change.",
    image: "bring-people-along.png",
    alt: "People work together at a shared table, using a laptop, reusable method cards, and a microphone to prepare their stories.",
    pages: [
      { id: "advocacy", label: "Make communication easier" },
      { id: "skills", label: "Reuse expert methods" },
    ],
  },
];

export const workbenchPages = [
  { id: "workbench", label: "Prepare testimony" },
  { id: "sources", label: "Find evidence" },
  { id: "examples", label: "See examples" },
  { id: "method", label: "How it works" },
  { id: "about", label: "About the pilot" },
];

export function portfolioHref(id: string, inAgentDemo = false) {
  if (id === "feasibility" || id === "integration") return `${inAgentDemo ? "" : "./integration-agents/index.html"}#/${id}`;
  const isSection = id === "work" || portfolioSections.some(section => section.id === id);
  const route = id === "home" ? "" : isSection ? `?section=${id}` : id;
  return `${inAgentDemo ? "../" : ""}#/${route}`;
}

export function portfolioLocation(page: string) {
  const toolPage = workbenchPages.find(item => item.id === page);
  const proofId = toolPage ? "advocacy" : page;
  const section = portfolioSections.find(item => item.pages.some(child => child.id === proofId));
  const proof = section?.pages.find(item => item.id === proofId);
  return { section, proof, toolPage };
}

export function portfolioOverviewTarget(hash: string) {
  const route = hash.split("?")[0];
  if (!["#/", "#/home"].includes(route)) return null;
  const section = new URLSearchParams(hash.split("?")[1]).get("section");
  if (section === "work") return { region: "portfolio-work", heading: "work-title" };
  if (portfolioSections.some(item => item.id === section)) return { region: `work-${section}`, heading: `work-${section}-title` };
  return null;
}

export function nextPortfolioWork(page: string) {
  const proofs = portfolioSections.flatMap(section => section.pages);
  const index = proofs.findIndex(item => item.id === page);
  return index < 0 ? undefined : proofs[index + 1];
}
