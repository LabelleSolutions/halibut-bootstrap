import { Role } from "./mockData";

// Canonical module key per route path under /app
export type ModuleKey =
  | "dashboard" | "pipeline" | "idie" | "trust"
  | "graph" | "agents" | "approvals" | "twin"
  | "integrations" | "blueprint" | "studio" | "audit"
  | "scenarios" | "risk" | "incidents" | "workforce" | "soc";

export const PATH_TO_MODULE: Record<string, ModuleKey> = {
  "/app": "dashboard",
  "/app/pipeline": "pipeline",
  "/app/idie": "idie",
  "/app/trust": "trust",
  "/app/graph": "graph",
  "/app/agents": "agents",
  "/app/approvals": "approvals",
  "/app/twin": "twin",
  "/app/integrations": "integrations",
  "/app/blueprint": "blueprint",
  "/app/studio": "studio",
  "/app/audit": "audit",
  "/app/scenarios": "scenarios",
  "/app/risk": "risk",
  "/app/incidents": "incidents",
  "/app/workforce": "workforce",
  "/app/soc": "soc",
};

const ALL: ModuleKey[] = Object.values(PATH_TO_MODULE) as ModuleKey[];

export const ROLE_MODULES: Record<Role, ModuleKey[]> = {
  Administrator: ALL,
  CEO: [
    "dashboard", "pipeline", "idie", "trust",
    "graph", "agents", "approvals", "twin",
    "scenarios", "risk", "incidents", "workforce", "soc", "audit",
  ],
  Operations: [
    "dashboard", "pipeline", "idie", "graph", "agents",
    "approvals", "twin", "scenarios", "risk", "incidents", "workforce",
  ],
  Production: [
    "dashboard", "pipeline", "twin", "blueprint",
    "scenarios", "workforce", "incidents",
  ],
  Support: [
    "dashboard", "approvals", "agents", "incidents", "workforce", "trust",
  ],
  Technology: [
    "dashboard", "integrations", "blueprint", "studio",
    "agents", "graph", "audit", "idie", "twin",
  ],
  Security: [
    "dashboard", "soc", "trust", "audit", "risk", "incidents", "graph",
  ],
};

export function canAccess(role: Role | undefined, mod: ModuleKey): boolean {
  if (!role) return false;
  return ROLE_MODULES[role].includes(mod);
}

export function canAccessPath(role: Role | undefined, path: string): boolean {
  const mod = PATH_TO_MODULE[path];
  if (!mod) return true;
  return canAccess(role, mod);
}

export function defaultPathFor(role: Role | undefined): string {
  if (!role) return "/app";
  // Dashboard is granted to every role above, but keep safe fallback.
  const mods = ROLE_MODULES[role];
  const entry = Object.entries(PATH_TO_MODULE).find(([, m]) => mods.includes(m));
  return entry?.[0] ?? "/app";
}
