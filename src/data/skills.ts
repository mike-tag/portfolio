type SkillSimulationStepBase = {
  label: string;
  action: string;
  outcome: string;
};

type SkillConversationTurn = {
  speaker: "skill" | "product-owner";
  label: string;
  role: string;
  message: string;
};

export type SkillDecisionChoice = {
  id: string;
  title: string;
  description: string;
  tradeoff: string;
  recommended?: boolean;
};

export type SkillSimulationStep = SkillSimulationStepBase & (
  | {
      kind: "inspection";
      findings: string[];
      nextQuestion: string;
    }
  | {
      kind: "recommendation";
      conversation: SkillConversationTurn[];
      question: string;
      choices: SkillDecisionChoice[];
      confirmation: string;
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
  summary: string;
  before: string;
  after: string;
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
    summary: "An adaptive interview that turns an ambiguous design request into decisions a team can review, challenge, and implement.",
    before: "An ambiguous request jumps straight to production, so a finished-looking artifact can hide assumptions, unresolved tradeoffs, and no shared measure of success.",
    after: "The workflow inspects existing context, asks only what could change the direction, and records the rationale and tradeoffs in an implementation-ready plan.",
    scenario: "Help me redesign our employee onboarding experience. It feels scattered and people keep missing important steps.",
    simulation: [
      {
        kind: "inspection",
        label: "Inspect context",
        action: "The skill starts with what is already known before asking for another decision.",
        findings: [
          "Three required systems shape the onboarding path.",
          "Missed required tasks are the clearest failure in the brief.",
          "Mobile accessibility is a stated constraint.",
        ],
        nextQuestion: "Which outcome should anchor the first-week experience?",
        outcome: "The next question is grounded in evidence from the brief instead of starting from a blank slate.",
      },
      {
        kind: "recommendation",
        label: "Recommend a direction",
        action: "The skill works like a UX design partner: it asks, listens, narrows the decision, and makes a recommendation.",
        conversation: [
          {
            speaker: "skill",
            label: "Design Planning",
            role: "UX design partner",
            message: "Which outcome should anchor the first week: fewer missed steps, faster productivity, or stronger belonging?",
          },
          {
            speaker: "product-owner",
            label: "Product owner",
            role: "Sets the priority",
            message: "Fewer missed required steps. New hires are overlooking actions spread across three systems.",
          },
          {
            speaker: "skill",
            label: "Design Planning",
            role: "Frames the decision",
            message: "That makes first-time clarity the priority. I recommend a guided path, but here are three credible directions and the cost of each.",
          },
        ],
        question: "Which direction should anchor the first release?",
        choices: [
          {
            id: "guided-path",
            title: "Guided first-week path",
            description: "Sequences required actions across all three systems so first-time hires always know what comes next.",
            tradeoff: "Experienced users have less freedom to jump around until shortcuts are added.",
            recommended: true,
          },
          {
            id: "flexible-dashboard",
            title: "Flexible dashboard",
            description: "Puts every task and system in one place while letting each person choose their own route.",
            tradeoff: "More navigation decisions make it easier for a new hire to miss a required step.",
          },
          {
            id: "checklist-hub",
            title: "Checklist hub",
            description: "Creates the lightest-weight overview without changing the underlying system experiences.",
            tradeoff: "Fastest to release, but it surfaces fragmented work instead of resolving it.",
          },
        ],
        confirmation: "I’ll record this choice, its rationale, and its trade-off in the final plan.",
        outcome: "You make the decision with the skill’s judgment visible, then carry the rationale forward without reconstructing the conversation.",
      },
      {
        kind: "output",
        label: "Deliver the plan",
        action: "The skill writes the agreed decisions into a complete plan of action.",
        deliverableTitle: "Written, implementation-ready design plan",
        deliverableSections: [
          "Outcome + decision brief",
          "Recommendations + rationale + tradeoffs",
          "Implementation sequence",
          "Acceptance criteria + validation",
          "Risks + owned open questions",
        ],
        handoff: "Take the written plan into Codex, Claude Code, or another builder agent and execute it.",
        outcome: "You leave with the decisions and next actions already written out—not another conversation to reconstruct.",
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
