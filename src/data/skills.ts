type SkillSimulationStepBase = {
  label: string;
  action: string;
  outcome: string;
};

type SkillSimulationOption = {
  title: string;
  description: string;
  tradeoff: string;
  recommended?: boolean;
  rationale?: string;
};

export type SkillSimulationStep = SkillSimulationStepBase & (
  | {
      kind: "question";
      questionNumber: number;
      context: string;
      question: string;
      options: SkillSimulationOption[];
    }
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
    solution: "An adaptive interview that inspects what already exists, asks only the questions that can change the direction, and makes its recommendations, rationale, and tradeoffs explicit before producing an implementation-ready plan.",
    scenario: "Help me redesign our employee onboarding experience. It feels scattered and people keep missing important steps.",
    simulation: [
      {
        kind: "question",
        label: "Inspect",
        action: "The skill inspects the available brief, product, and constraints before asking a numbered question that earns its place.",
        questionNumber: 1,
        context: "I found three required onboarding systems, a 30-day checklist, and a mobile-accessibility requirement.",
        question: "Which outcome should anchor the first-week experience?",
        options: [
          {
            title: "Fewer missed steps",
            description: "Make required actions unmistakable and sequence them around the new hire's first week.",
            recommended: true,
            rationale: "The brief names missed steps as the clearest current failure, so this gives the first release a direct problem to solve.",
            tradeoff: "Time-to-productivity and belonging remain important, but become secondary measures for this release.",
          },
          {
            title: "Faster time-to-productivity",
            description: "Optimize the experience around reaching independent contribution sooner.",
            tradeoff: "Speed could obscure required steps that do not immediately affect productivity.",
          },
          {
            title: "A stronger sense of belonging",
            description: "Prioritize relationships, culture, and confidence during the first week.",
            tradeoff: "The experience may feel better without resolving the operational misses named in the brief.",
          },
        ],
        outcome: "The recommendation is grounded in known context, and its tradeoff stays visible.",
      },
      {
        kind: "question",
        label: "Clarify",
        action: "It asks one focused question whose answer would materially change the plan.",
        questionNumber: 2,
        context: "You chose fewer missed steps as the primary outcome.",
        question: "Which failure should the first release prevent first?",
        options: [
          {
            title: "An incomplete required task",
            description: "Surface deadlines, ownership, and completion state for mandatory work.",
            recommended: true,
            rationale: "Required tasks carry the clearest operational consequence and give the pilot an observable completion measure.",
            tradeoff: "This narrows the first release around compliance and may underrepresent relationship-based problems.",
          },
          {
            title: "A missed manager handoff",
            description: "Make manager actions and timing part of the same guided path.",
            tradeoff: "Success depends on manager participation, which the new-hire interface alone cannot guarantee.",
          },
          {
            title: "Uncertainty about where to get help",
            description: "Prioritize findable support and escalation routes.",
            tradeoff: "Better support can help people recover without preventing the missed step itself.",
          },
        ],
        outcome: "A broad goal becomes a concrete, measurable failure the design must prevent.",
      },
      {
        kind: "question",
        label: "Compare",
        action: "It leads with a recommendation, explains why it fits the brief, and keeps credible alternatives reviewable.",
        questionNumber: 3,
        context: "The first release needs to prevent incomplete required tasks across several systems.",
        question: "Which interaction model should organize the experience?",
        options: [
          {
            title: "A guided first-week path",
            description: "Sequence required actions by moment, owner, and completion state.",
            recommended: true,
            rationale: "A guided path reduces navigation decisions for first-time users and directly supports the goal of fewer missed steps.",
            tradeoff: "Experienced users have less freedom to jump around, so shortcuts should follow after the core path works.",
          },
          {
            title: "A flexible dashboard",
            description: "Let people scan and choose from all onboarding activity at once.",
            tradeoff: "Flexibility increases the chance that a first-time user overlooks an important action.",
          },
        ],
        outcome: "The decision and its tradeoff can be challenged constructively.",
      },
      {
        kind: "question",
        label: "Validate",
        action: "It closes with one focused validation decision and makes the cost of each evidence threshold clear.",
        questionNumber: 4,
        context: "The guided path is the proposed direction for a small first-week pilot.",
        question: "What evidence should trigger a design revision before wider release?",
        options: [
          {
            title: "Two of five participants miss the same required step",
            description: "Treat a repeated failure in a small task-based test as enough evidence to revisit the flow.",
            recommended: true,
            rationale: "It is a small, reversible check that can expose a consequential usability problem before implementation expands.",
            tradeoff: "The sample is directional rather than representative, so findings still require judgment.",
          },
          {
            title: "A measurable increase in support requests",
            description: "Use real pilot behavior to identify where the path creates confusion.",
            tradeoff: "The signal arrives later and asks pilot participants to experience the problem first.",
          },
        ],
        outcome: "The plan leaves with an explicit revision trigger instead of a vague promise to test.",
      },
      {
        kind: "output",
        label: "Output",
        action: "The skill packages the decisions into a structured plan with enough detail for implementation.",
        deliverableTitle: "Implementation-ready design plan",
        deliverableSections: [
          "Outcome + decision brief",
          "Recommendations + rationale + tradeoffs",
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
