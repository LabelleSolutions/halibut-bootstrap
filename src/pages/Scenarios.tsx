import { PageHeader, Section, Pill } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";

const scenarios = [
  { id: "SCN-014", name: "10-yr Treasury +150bps · 90-day shock", impact: "OHI -2.4 · cost-to-serve +$0.41", prob: 0.31, tag: "Macro" },
  { id: "SCN-019", name: "Tier-1 CDN outage · 6-hour blackout",   impact: "Revenue -$1.2M · CSAT -8pts",       prob: 0.22, tag: "Vendor" },
  { id: "SCN-022", name: "Manila typhoon · 48-hour BPO impact",   impact: "SLA -6.4pts · need failover to BGC", prob: 0.18, tag: "Geo"   },
  { id: "SCN-024", name: "Regulatory · EU AI Act Article 9 audit",impact: "70 staff-hours · 3 doc deltas",      prob: 0.55, tag: "Reg"   },
  { id: "SCN-027", name: "Demand surge · holiday peak +34%",      impact: "Need staffing +18% · WFM repaint",    prob: 0.78, tag: "Demand"},
];

export default function Scenarios() {
  return (
    <div>
      <PageHeader
        eyebrow="Scenario Planning"
        title="Pre-mortems for an unpredictable world."
        description="Run cross-environment what-ifs. Each scenario binds to the twin and produces a playbook before the event happens."
      />
      <div className="grid lg:grid-cols-2 gap-4">
        {scenarios.map((s) => (
          <Section key={s.id} title={`${s.id} · ${s.tag}`} action={<Pill tone={s.prob > 0.5 ? "warning" : "primary"}>P {(s.prob*100).toFixed(0)}%</Pill>}>
            <div className="font-display text-lg">{s.name}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.impact}</div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">Open in twin</Button>
              <Button size="sm" className="bg-gradient-primary text-primary-foreground">Generate playbook</Button>
            </div>
          </Section>
        ))}
      </div>
    </div>
  );
}
