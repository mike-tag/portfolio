type SkillSimulationStepBase = {
  label: string;
  action: string;
  outcome: string;
};

export type SkillSimulationStep = SkillSimulationStepBase & (
  | { kind: "question"; question: string }
  | {
      kind: "output";
      deliverableTitle: string;
      deliverableSections: string[];
      handoff: string;
    }
);

export type MarketSkill = {
  id: string;
  name: string;
  commandName: string;
  availability: string;
  problem: string;
  solution: string;
  scenario: string;
  simulation: SkillSimulationStep[];
  repositoryUrl: string;
  codexInstall: string;
  codexPrompt: string;
  claudeMarketplace: string;
  claudeInstall: string;
  claudeRun: string;
};

export const marketSkills: MarketSkill[] = [
  {
    id: "design-planning",
    name: "Design Planning",
    commandName: "plan-design-decisions",
    availability: "Available now",
    problem: "Ambiguous design requests often jump straight to production. The result can look finished while hiding assumptions, unresolved tradeoffs, and unclear measures of success.",
    solution: "An adaptive interview that inspects what already exists, asks only the questions that can change the direction, and turns the answers into an implementation-ready plan with decisions, acceptance criteria, validation, and risks.",
    scenario: "Help me redesign our employee onboarding experience. It feels scattered and people keep missing important steps.",
    simulation: [
      {
        kind: "question",
        label: "Inspect",
        action: "The skill starts with the available brief, product, and constraints instead of opening with a generic questionnaire.",
        question: "I found three required onboarding systems, a 30-day checklist, and a mobile-accessibility requirement. Which outcome should matter most in the first week: fewer missed steps, faster time-to-productivity, or a stronger sense of belonging?",
        outcome: "Known context is preserved; the first question earns its place.",
      },
      {
        kind: "question",
        label: "Clarify",
        action: "It asks one focused question whose answer would materially change the plan.",
        question: "You chose fewer missed steps. Which failure is most important to prevent first: an incomplete compliance task, a missed manager handoff, or uncertainty about where to get help?",
        outcome: "A broad goal becomes a concrete failure the design must prevent.",
      },
      {
        kind: "question",
        label: "Compare",
        action: "It connects a recommended direction to the audience need and names a credible alternative.",
        question: "A guided first-week path would reduce missed steps; a dashboard would preserve more flexibility. Should first-time clarity take priority over self-navigation in this release?",
        outcome: "The decision and its tradeoff can be challenged constructively.",
      },
      {
        kind: "question",
        label: "Validate",
        action: "It closes the interview by defining ownership, success, and what evidence should trigger revision.",
        question: "Before I turn these decisions into the plan, who must approve the first release, what evidence would trigger a revision, and what must be true for you to call the pilot successful?",
        outcome: "The final decision gates are ready to carry into the plan.",
      },
      {
        kind: "output",
        label: "Output",
        action: "The skill packages the decisions into a structured plan with enough detail for implementation.",
        deliverableTitle: "Implementation-ready design plan",
        deliverableSections: [
          "Outcome + decision brief",
          "Design decisions + tradeoffs",
          "Implementation sequence",
          "Acceptance criteria + validation",
          "Risks + owned open questions",
        ],
        handoff: "Review and refine the plan, then hand it to your builder agent to implement.",
        outcome: "You leave with a reviewable plan and a clear next handoff.",
      },
    ],
    repositoryUrl: "https://github.com/mike-tag/shared-agent-skills",
    codexInstall: "codex plugin marketplace add mike-tag/shared-agent-skills",
    codexPrompt: "Use $plan-design-decisions to interview me and create an implementation-ready design plan.",
    claudeMarketplace: "/plugin marketplace add mike-tag/shared-agent-skills",
    claudeInstall: "/plugin install design-planning@mike-tag-skills",
    claudeRun: "/design-planning:plan-design-decisions",
  },
];
