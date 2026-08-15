import { agentSkillsIndex } from "@/lib/agent/skills";
import { jsonDiscovery, jsonDiscoveryOptions } from "@/lib/agent/site";

export function OPTIONS() {
  return jsonDiscoveryOptions();
}

export function GET() {
  return jsonDiscovery(agentSkillsIndex());
}
