import { PageHeader, Section, Pill, StatTile } from "@/components/ui-kit";
import { decisionBoard } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

export default function Approvals() {
  const [note, setNote] = useState("");
  const pending = decisionBoard.filter(d => d.status === "pending-approval");
  return (
    <div>
      <PageHeader
        eyebrow="Human Approval Workflow"
        title="The boardroom rail."
        description="Every high-impact decision passes through a human reviewer with full evidence, counterfactuals, and dissenting opinions in-line."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatTile label="Pending" value={pending.length} />
        <StatTile label="Avg approval latency" value="4.2" unit="m" delta={-0.7} />
        <StatTile label="Approval rate" value="91" unit="%" delta={+1.4} />
        <StatTile label="Overrides this week" value={6} delta={-2} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {pending.map((d) => (
          <Section key={d.id} title={`${d.id} · ${d.env}`} action={<Pill tone="warning">awaiting human</Pill>}>
            <div className="font-display text-lg">{d.title}</div>
            <div className="text-xs text-muted-foreground mt-1">{d.impact}</div>

            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <Stat k="Confidence" v={`${(d.confidence*100).toFixed(0)}%`} />
              <Stat k="Approve" v={d.votes.approve} />
              <Stat k="Dissent" v={d.votes.dissent} />
            </div>

            <div className="mt-4">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Counterfactual</div>
              <div className="text-xs p-2.5 rounded-md border border-border bg-muted/30 text-muted-foreground">
                If not approved within 9 minutes, SLA risk rises to 6.1pts and revenue exposure grows to $2.9M.
              </div>
            </div>

            <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Decision rationale (recorded to audit trail)…" className="mt-3 bg-muted/40" />

            <div className="mt-3 flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => toast("Sent back to council")}>Re-deliberate</Button>
              <Button variant="outline" size="sm" onClick={() => toast.error(`${d.id} rejected`)}>Reject</Button>
              <Button size="sm" className="bg-gradient-primary text-primary-foreground" onClick={() => toast.success(`${d.id} approved · dispatched`)}>Approve & Execute</Button>
            </div>
          </Section>
        ))}
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: any }) {
  return (
    <div className="rounded-md border border-border bg-muted/30 py-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className="font-display text-lg mt-0.5">{v}</div>
    </div>
  );
}
