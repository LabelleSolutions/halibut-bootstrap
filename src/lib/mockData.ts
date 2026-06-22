// HALIBUT OS — mock operational intelligence dataset

export const ROLES = [
  "CEO", "Operations", "Production", "Support", "Technology", "Security", "Administrator",
] as const;
export type Role = typeof ROLES[number];

export const ENVIRONMENTS = [
  "Production", "Manufacturing", "BPO Operations", "IT Operations", "Support Services",
  "Logistics", "Healthcare", "Education", "Financial Services", "E-commerce", "Web Builder",
] as const;
export type Environment = typeof ENVIRONMENTS[number];

export const organization = {
  id: "org_halibut_demo",
  name: "Apex Continental Holdings",
  industry: "Diversified Operations",
  region: "Global · 14 sites",
  twinVersion: "HALIBUT OS v4.2.1",
  deployedAt: "2026-03-11",
};

export const kpis = [
  { label: "Operational Health Index", value: 92.4, unit: "OHI", delta: +1.8, trend: "up", target: 90 },
  { label: "Decision Velocity", value: 348, unit: "/hr", delta: +12, trend: "up", target: 300 },
  { label: "Autonomous Decisions", value: 71, unit: "%", delta: +3.4, trend: "up", target: 65 },
  { label: "Avg Trust Score", value: 0.871, unit: "", delta: +0.02, trend: "up", target: 0.85 },
  { label: "Open Incidents", value: 7, unit: "", delta: -2, trend: "down", target: 10 },
  { label: "SLA Attainment", value: 98.6, unit: "%", delta: +0.4, trend: "up", target: 98 },
  { label: "Forecast Accuracy", value: 94.1, unit: "%", delta: +0.9, trend: "up", target: 92 },
  { label: "Cost-to-Serve", value: 12.74, unit: "$", delta: -0.31, trend: "down", target: 13.5 },
];

export const ohiSeries = Array.from({ length: 48 }, (_, i) => ({
  t: `${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`,
  ohi: 84 + Math.sin(i / 4) * 4 + Math.random() * 3,
  trust: 0.82 + Math.cos(i / 5) * 0.04 + Math.random() * 0.02,
  decisions: 200 + Math.round(Math.sin(i / 3) * 60 + Math.random() * 40),
}));

export const pipelineStages = [
  { key: "observe", name: "Observe", desc: "Telemetry ingest across signals", rate: "1.2M events/min", health: 99.1, color: "210 90% 58%" },
  { key: "understand", name: "Understand", desc: "Context graph enrichment", rate: "842K nodes", health: 97.4, color: "200 95% 55%" },
  { key: "predict", name: "Predict", desc: "Forecast and anomaly models", rate: "117 models live", health: 95.8, color: "190 95% 55%" },
  { key: "decide", name: "Decide", desc: "Multi-agent deliberation", rate: "348 decisions/hr", health: 96.2, color: "180 80% 55%" },
  { key: "execute", name: "Execute", desc: "Approved actions to systems", rate: "71% autonomous", health: 98.0, color: "170 75% 55%" },
  { key: "learn", name: "Learn", desc: "Outcome feedback to twin", rate: "+1.8 OHI / week", health: 93.5, color: "160 75% 55%" },
];

export const agents = [
  { id: "ag-001", name: "Atlas",   role: "Strategic Planner",   model: "Halibut-Reason-L",  trust: 0.94, decisions: 184, status: "active" },
  { id: "ag-002", name: "Mercury", role: "Throughput Optimizer", model: "Halibut-Ops-M",   trust: 0.89, decisions: 421, status: "active" },
  { id: "ag-003", name: "Vega",    role: "Risk Sentinel",        model: "Halibut-Risk-M",  trust: 0.91, decisions: 92,  status: "active" },
  { id: "ag-004", name: "Orion",   role: "Customer Advocate",    model: "Halibut-Voice-S", trust: 0.86, decisions: 312, status: "active" },
  { id: "ag-005", name: "Nyx",     role: "Security Analyst",     model: "Halibut-Sec-L",   trust: 0.93, decisions: 47,  status: "active" },
  { id: "ag-006", name: "Helios",  role: "Workforce Planner",    model: "Halibut-WFM-M",   trust: 0.88, decisions: 64,  status: "active" },
  { id: "ag-007", name: "Echo",    role: "Devil's Advocate",     model: "Halibut-Critic",  trust: 0.81, decisions: 188, status: "active" },
];

export const decisionBoard = [
  {
    id: "DEC-2401",
    title: "Reroute Line 4 production to Plant B — supplier delay forecast",
    env: "Manufacturing",
    impact: "$2.4M revenue at risk",
    confidence: 0.91,
    status: "pending-approval",
    votes: { approve: 5, dissent: 1, abstain: 1 },
  },
  {
    id: "DEC-2402",
    title: "Surge BPO agents +12 to Manila pod for forecasted call spike",
    env: "BPO Operations",
    impact: "SLA risk: 4.2pts",
    confidence: 0.87,
    status: "auto-executed",
    votes: { approve: 6, dissent: 0, abstain: 1 },
  },
  {
    id: "DEC-2403",
    title: "Isolate compromised IAM token — anomalous geo pattern detected",
    env: "IT Operations",
    impact: "Critical — contain spread",
    confidence: 0.96,
    status: "auto-executed",
    votes: { approve: 7, dissent: 0, abstain: 0 },
  },
  {
    id: "DEC-2404",
    title: "Approve dynamic pricing uplift +3.4% on SKU group A14",
    env: "E-commerce",
    impact: "+$184K weekly margin",
    confidence: 0.78,
    status: "pending-approval",
    votes: { approve: 4, dissent: 2, abstain: 1 },
  },
  {
    id: "DEC-2405",
    title: "Defer non-critical patch window — incident war room active",
    env: "IT Operations",
    impact: "MTTR exposure",
    confidence: 0.84,
    status: "pending-approval",
    votes: { approve: 6, dissent: 1, abstain: 0 },
  },
];

export const incidents = [
  { id: "INC-9821", title: "Payment gateway latency p99 > 1.4s", severity: "SEV-2", env: "E-commerce",  owner: "Mercury", opened: "12m ago", status: "Investigating" },
  { id: "INC-9817", title: "Anomalous OAuth grants from 3 regions", severity: "SEV-1", env: "IT Operations", owner: "Nyx",     opened: "31m ago", status: "Mitigating" },
  { id: "INC-9810", title: "Line 4 conveyor torque drift",           severity: "SEV-3", env: "Manufacturing", owner: "Atlas",   opened: "2h ago",  status: "Monitoring" },
  { id: "INC-9805", title: "Tier-1 queue depth above forecast",      severity: "SEV-3", env: "Support Services", owner: "Orion", opened: "4h ago",  status: "Resolved" },
  { id: "INC-9798", title: "Cold-storage truck temp excursion",      severity: "SEV-2", env: "Logistics",     owner: "Helios", opened: "6h ago",  status: "Resolved" },
];

export const risks = [
  { name: "Supply Chain Concentration", probability: 0.72, impact: 0.88, owner: "Operations", trend: "rising" },
  { name: "Credential Compromise",      probability: 0.41, impact: 0.94, owner: "Security",   trend: "rising" },
  { name: "Talent Attrition (Tier-2)",  probability: 0.55, impact: 0.62, owner: "Operations", trend: "stable" },
  { name: "Regulatory Shift — EU AI Act", probability: 0.38, impact: 0.71, owner: "CEO",       trend: "rising" },
  { name: "Vendor Outage — Tier-1 CDN",   probability: 0.22, impact: 0.85, owner: "Technology", trend: "stable" },
  { name: "Customer Churn — Mid-Market",  probability: 0.34, impact: 0.58, owner: "Support",   trend: "falling" },
  { name: "FX Exposure — LATAM",          probability: 0.48, impact: 0.46, owner: "CEO",       trend: "rising" },
];

export const integrations = [
  { name: "SAP S/4HANA",          category: "ERP",        status: "connected", events: "412K/day" },
  { name: "Oracle NetSuite",      category: "ERP",        status: "connected", events: "118K/day" },
  { name: "Salesforce",           category: "CRM",        status: "connected", events: "289K/day" },
  { name: "HubSpot",              category: "CRM",        status: "connected", events: "47K/day"  },
  { name: "Workday",              category: "HRIS",       status: "connected", events: "9K/day"   },
  { name: "NICE CXone",           category: "WFM",        status: "connected", events: "612K/day" },
  { name: "Genesys Cloud",        category: "WFM",        status: "connected", events: "284K/day" },
  { name: "ServiceNow",           category: "ITSM",       status: "connected", events: "73K/day"  },
  { name: "CrowdStrike Falcon",   category: "Cyber",      status: "connected", events: "1.1M/day" },
  { name: "Splunk Cloud",         category: "Observability", status: "connected", events: "3.4M/day" },
  { name: "Snowflake",            category: "Data",       status: "connected", events: "stream"   },
  { name: "Microsoft 365",        category: "Productivity", status: "degraded", events: "—"       },
  { name: "Shopify Plus",         category: "Commerce",   status: "connected", events: "62K/day"  },
  { name: "Stripe",               category: "Payments",   status: "connected", events: "38K/day"  },
];

export const auditLog = Array.from({ length: 24 }, (_, i) => ({
  ts: new Date(Date.now() - i * 1000 * 60 * 7).toISOString().replace("T", " ").slice(0, 19),
  actor: ["Mercury", "Atlas", "Nyx", "Vega", "j.chen@apex", "Orion", "Helios"][i % 7],
  action: [
    "executed decision DEC-2402", "policy update — pricing band", "approved DEC-2401 via human review",
    "auto-quarantined token tk_38ad…", "ingested context: SAP MM-IM", "rollback: experiment EXP-114",
    "promoted simulation SIM-77 to production", "rotated agent credential ag-005",
  ][i % 8],
  target: ["BPO ops", "Pricing", "Manufacturing", "IAM", "Context graph", "Decision Studio", "Twin", "Vault"][i % 8],
  result: i % 5 === 0 ? "warning" : "success",
}));

export const workforceForecast = Array.from({ length: 14 }, (_, i) => ({
  day: `D+${i + 1}`,
  required: 220 + Math.round(Math.sin(i / 2) * 30 + i * 1.5),
  scheduled: 220 + Math.round(Math.sin(i / 2) * 28 + i * 1.2),
  attrition: 4 + Math.round(Math.random() * 3),
}));

export const socEvents = [
  { time: "00:14:22", source: "EDR · Falcon",  type: "Suspicious PowerShell",  sev: "high",   asset: "WIN-OPS-1142" },
  { time: "00:13:01", source: "IAM · Okta",    type: "Impossible travel",       sev: "high",   asset: "user@apex" },
  { time: "00:11:48", source: "Cloud · AWS",   type: "Public S3 bucket created",sev: "medium", asset: "s3://apex-tmp-014" },
  { time: "00:09:33", source: "Net · Zeek",    type: "C2 beacon heuristic",     sev: "critical", asset: "10.42.11.88" },
  { time: "00:07:19", source: "SaaS · M365",   type: "Mass file download",      sev: "medium", asset: "k.silva@apex" },
  { time: "00:04:02", source: "DLP · Symantec",type: "PII exfil blocked",       sev: "low",    asset: "endpoint-2218" },
];

export const contextGraphNodes = [
  { id: "org", label: "Apex Holdings", group: "org" },
  { id: "ops", label: "Operations",    group: "fn" },
  { id: "mfg", label: "Manufacturing", group: "env" },
  { id: "bpo", label: "BPO",           group: "env" },
  { id: "ecom", label: "E-commerce",   group: "env" },
  { id: "sap", label: "SAP",           group: "sys" },
  { id: "sf",  label: "Salesforce",    group: "sys" },
  { id: "wd",  label: "Workday",       group: "sys" },
  { id: "soc", label: "SOC",           group: "fn" },
  { id: "cs",  label: "CrowdStrike",   group: "sys" },
  { id: "twin",label: "Digital Twin",  group: "twin" },
];
export const contextGraphEdges = [
  ["org", "ops"], ["org", "soc"], ["ops", "mfg"], ["ops", "bpo"], ["ops", "ecom"],
  ["mfg", "sap"], ["ecom", "sf"], ["ops", "wd"], ["soc", "cs"], ["twin", "org"],
  ["twin", "sap"], ["twin", "sf"], ["twin", "cs"], ["twin", "wd"],
] as const;
