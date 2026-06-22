import { PageHeader, Section, Pill } from "@/components/ui-kit";
import { integrations } from "@/lib/mockData";
import { Plug, CheckCircle2, AlertTriangle } from "lucide-react";

export default function Integrations() {
  const groups = Array.from(new Set(integrations.map(i => i.category)));
  return (
    <div>
      <PageHeader
        eyebrow="ERP · CRM · WFM · Cyber"
        title="Integration fabric."
        description="HALIBUT OS connects to your systems of record and signal — without moving the data lake. Read-only by default, write-back governed by policy."
      />
      {groups.map((g) => (
        <Section key={g} title={g} className="mb-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {integrations.filter(i => i.category === g).map((i) => (
              <div key={i.name} className="p-4 rounded-md border border-border bg-muted/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-background border border-border grid place-items-center">
                    <Plug className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{i.name}</div>
                    <div className="text-[11px] text-muted-foreground font-mono">{i.events}</div>
                  </div>
                </div>
                {i.status === "connected"
                  ? <Pill tone="success"><CheckCircle2 className="h-3 w-3" /> live</Pill>
                  : <Pill tone="warning"><AlertTriangle className="h-3 w-3" /> degraded</Pill>}
              </div>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}
