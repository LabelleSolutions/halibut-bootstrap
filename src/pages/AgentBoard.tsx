import { PageHeader, Section, Pill, StatTile } from "@/components/ui-kit";
import { agents, decisionBoard } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AgentBoard() {
  return (
    <div>
      <PageHeader
        eyebrow="Multi-Agent Decision Board"
        title="A digital boardroom of expert agents."
        description="Each decision is deliberated by the relevant council of agents. Dissent is preserved and surfaced — not hidden."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatTile label="Active agents" value={agents.length} />
        <StatTile label="Deliberations / hr" value={88} delta={+6} />
        <StatTile label="Avg consensus" value="86" unit="%" delta={+1.3} />
        <StatTile label="Dissent preserved" value="12.6" unit="%" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <Section title="Council" className="lg:col-span-1">
          <ul className="space-y-2">
            {agents.map((a) => (
              <li key={a.id} className="p-3 rounded-md border border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-[11px] text-muted-foreground">{a.role}</div>
                  </div>
                  <Pill tone="primary">trust {a.trust.toFixed(2)}</Pill>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span>{a.model}</span><span>{a.decisions} dec</span>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Decision queue" className="lg:col-span-2">
          <ul className="space-y-3">
            {decisionBoard.map((d) => (
              <li key={d.id} className="p-4 rounded-md border border-border bg-muted/30">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                      <span className="font-mono text-foreground">{d.id}</span>
                      <span>·</span><span>{d.env}</span>
                      <Pill tone={d.status === "auto-executed" ? "success" : "warning"}>{d.status.replace("-", " ")}</Pill>
                    </div>
                    <div className="text-sm mt-1.5">{d.title}</div>
                    <div className="text-[11px] text-muted-foreground mt-1">{d.impact}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] uppercase text-muted-foreground">Confidence</div>
                    <div className="font-display text-2xl">{(d.confidence * 100).toFixed(0)}<span className="text-sm text-muted-foreground">%</span></div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-success">▲ approve {d.votes.approve}</span>
                    <span className="text-danger">▼ dissent {d.votes.dissent}</span>
                    <span className="text-muted-foreground">○ abstain {d.votes.abstain}</span>
                  </div>
                  {d.status === "pending-approval" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => toast("Sent back for re-deliberation")}>Re-deliberate</Button>
                      <Button size="sm" className="bg-gradient-primary text-primary-foreground" onClick={() => toast.success(`${d.id} approved`)}>Approve</Button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
