import { Handshake, HeartHandshake, MicVocal, Route, ShieldCheck, Vote } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const valueIcons: Record<string, LucideIcon> = {
  service: HeartHandshake,
  voter_agency: Vote,
  common_ground: Handshake,
  practical_action: Route,
  authentic_voice: MicVocal,
  trust: ShieldCheck,
};

export function ValueIcon({ valueId, size = 26, strokeWidth = 1.8 }: { valueId: string; size?: number; strokeWidth?: number }) {
  const Icon = valueIcons[valueId] ?? ShieldCheck;
  return <Icon aria-hidden="true" size={size} strokeWidth={strokeWidth} />;
}
