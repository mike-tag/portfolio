import { advocacyFrames, evidenceClaims, getEvidenceSourcesForClaim, vavValues } from "../data/content";
import type { WorkbenchState } from "../types";

const fallback = "Not supplied";

const formatSources = (claim: (typeof evidenceClaims)[number]) => getEvidenceSourcesForClaim(claim)
  .map((source, index) => `   Source ${index + 1}: ${source.title} — ${source.locator}${source.publisher ? ` · ${source.publisher}` : ""}${source.year ? ` · ${source.year}` : ""}${source.url ? `\n   Link ${index + 1}: ${source.url}` : ""}`)
  .join("\n");

export function buildWorkPacket(state: WorkbenchState) {
  const frame = advocacyFrames.find((item) => item.id === state.selectedFrame);
  const values = vavValues.filter((item) => state.selectedValues.includes(item.id));
  const evidence = evidenceClaims.filter((item) => state.selectedEvidence.includes(item.id));

  const evidenceNotes = evidence.length
    ? evidence
        .map(
          (item, index) =>
            `${index + 1}. ${item.title}\n   Claim: ${item.claim}\n   Best use: ${item.bestUse}\n   Caveat: ${item.caveat}\n   Reform type: ${item.reformType || "Multiple or not specified"}\n   Verification: ${item.verificationStatus === "research_lead" ? "Refresh needed — verify the current or primary source before public use" : "Source checked — preserve the stated caveat"}\n${formatSources(item)}`,
        )
        .join("\n\n")
    : "No evidence selected. Ask the writer to avoid factual claims until sources are added.";

  const valueNotes = values.length
    ? values.map((item) => `- ${item.title}: ${item.description}`).join("\n")
    : "- No values selected yet.";

  const hasResearchLead = evidence.some((item) => item.verificationStatus === "research_lead");

  return `# Advocacy work packet

## Campaign brief
- Issue: ${state.issue || fallback}
- Jurisdiction: ${state.jurisdiction || fallback}
- Advocacy moment: ${state.advocacyMoment || fallback}
- Desired artifact: ${state.artifactType || fallback}
- Goal: ${state.goal || fallback}
- Length: ${state.length || fallback}
- Concrete ask: ${state.callToAction || fallback}

## Audience brief
- Audience: ${state.targetName || fallback}
- Public role or responsibility: ${state.targetRole || fallback}
- Known public facts: ${state.publicFacts || fallback}
- Strategic judgment: ${state.strategicJudgment || fallback}
- Likely objections: ${state.likelyObjections || fallback}

## Values and voice
${valueNotes}

- Advocate story or credibility: ${state.advocateStory || fallback}
- Tone: ${state.tone || fallback}

## Recommended frame
- Frame: ${frame?.label || fallback}
- Rationale: ${frame?.summary || fallback}
- Best for: ${frame?.bestFor || fallback}
- Watch out: ${frame?.watchOut || fallback}
- Possible opening: ${frame?.sampleOpening || fallback}

## Evidence notes
${hasResearchLead ? "**Verification warning:** At least one selected record is marked Refresh needed. Do not use that claim publicly until its current or primary source is confirmed.\n\n" : ""}${evidenceNotes}

## Copyable drafting prompt
You are helping a Veterans for All Voters volunteer prepare ${state.artifactType || "an advocacy artifact"} for ${state.targetName || "a public audience"}.

Write for this situation:
- Issue: ${state.issue || fallback}
- Jurisdiction: ${state.jurisdiction || fallback}
- Moment and goal: ${state.advocacyMoment || fallback}; ${state.goal || fallback}
- Length: ${state.length || fallback}
- Concrete ask: ${state.callToAction || fallback}

Audience guidance:
- Public facts: ${state.publicFacts || fallback}
- Strategic judgment: ${state.strategicJudgment || fallback}
- Likely objections: ${state.likelyObjections || fallback}

Message guidance:
- Lead with ${frame?.label || "a values-first frame"}.
- Use these values: ${values.map((item) => item.shortLabel).join(", ") || "service, voter voice, trust, and practical action"}.
- Possible personal grounding: ${state.advocateStory || fallback}
- Tone: ${state.tone || fallback}
- Do not lead with insider mechanics, party attacks, or grievance alone.
- Distinguish public facts from strategic interpretation.
- Use only the evidence supplied below. Preserve every caveat and do not imply causation where the source does not.

Evidence:
${evidenceNotes}

Return:
1. A strong draft within the requested length.
2. A short note explaining why the frame fits the audience.
3. A source list tied to the factual claims used.
4. A final fact-check list identifying anything that still needs verification.
`;
}
