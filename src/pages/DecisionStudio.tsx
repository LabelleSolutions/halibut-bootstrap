import { PageHeader, Section, Pill } from "@/components/ui-kit";

const steps = [
  { id: "01", k: "Trigger", v: "demand_forecast.spike( pod=Manila, Δ ≥ 20% )" },
  { id: "02", k: "Enrich",  v: "context.merge( wfm.roster, skills.matrix, sla.targets )" },
  { id: "03", k: "Predict", v: "model: sla_breach_probability ≥ 0.30" },
  { id: "04", k: "Decide",  v: "agents = [ Mercury, Helios, Echo ]  · vote ≥ 5/7" },
  { id: "05", k: "Gate",    v: "if cost_delta > $35k → require human(role=Operations)" },
  { id: "06", k: "Execute", v: "wfm.schedulePush( delta=+12, source=L2_reserve )" },
  { id: "07", k: "Notify",  v: "channels: [ pod_leads, ops_bridge ]" },
  { id: "08", k: "Learn",   v: "feedback.capture( aht_delta, csat, occupancy ) → twin" },
];

export default function DecisionStudio() {
  return (
    <div>
      <PageHeader
        eyebrow="Decision Engineer Studio"
        title="Author the decisions that author your enterprise."
        description="A code-grade authoring surface for operational decisions. Versioned, simulated, and policy-bound — before they ever execute."
      />

      <div className="grid lg:grid-cols-3 gap-4">
        <Section title="manila_surge.protocol  · v3.2.0-rc" className="lg:col-span-2">
          <div className="font-mono text-xs bg-background/60 border border-border rounded-md p-4 overflow-x-auto">
            <pre className="text-foreground">{`# halibut.protocol v3
name: manila_surge.protocol
owner: operations
gates:
  - confidence >= 0.85
  - cost_delta < 100_000
  - policy: "no autonomous layoffs"
council: [ mercury, helios, echo ]
sla_floor: 0.95
audit: full
`}</pre>
          </div>

          <div className="mt-5 space-y-2">
            {steps.map((s) => (
              <div key={s.id} className="flex items-start gap-3 p-3 rounded-md border border-border bg-muted/30">
                <div className="font-mono text-xs text-primary w-6">{s.id}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground w-24">{s.k}</div>
                <div className="font-mono text-xs text-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Governance">
          <ul className="space-y-3 text-sm">
            {[
              ["Version", "3.2.0-rc"],
              ["Status", "ready-for-review"],
              ["Author", "j.chen@apex"],
              ["Tests passed", "47 / 47"],
              ["Sim score", "0.94"],
              ["Policy lint", "0 issues"],
            ].map(([k, v]) => (
              <li key={k} className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">{k}</span>
                <span className="font-mono text-xs">{v}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill tone="primary">canary 5%</Pill>
            <Pill tone="success">passes governance</Pill>
            <Pill>shadow mode</Pill>
          </div>
        </Section>
      </div>
    </div>
  );
}
