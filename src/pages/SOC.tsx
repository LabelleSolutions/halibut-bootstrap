import { PageHeader, Section, Pill, StatTile } from "@/components/ui-kit";
import { socEvents } from "@/lib/mockData";
import { Shield, ShieldAlert } from "lucide-react";

export default function SOC() {
  const tone = (s: string) => s === "critical" ? "danger" : s === "high" ? "warning" : s === "medium" ? "primary" : "default";
  return (
    <div>
      <PageHeader
        eyebrow="Security Operations Center"
        title="A twin-aware SOC."
        description="HALIBUT correlates EDR, IAM, cloud, and network signals through the context graph — surfacing what matters, suppressing what doesn't."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatTile label="Signals correlated" value="1.1M" />
        <StatTile label="Cases opened" value={12} delta={-4} />
        <StatTile label="Auto-contained" value="78" unit="%" delta={+2.1} />
        <StatTile label="Mean detection" value="46" unit="s" delta={-9} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Section title="Live event stream" className="lg:col-span-2">
          <div className="space-y-2">
            {socEvents.map((e, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-md border border-border bg-muted/30 hover:bg-muted/50">
                {e.sev === "critical" || e.sev === "high"
                  ? <ShieldAlert className="h-4 w-4 text-danger" />
                  : <Shield className="h-4 w-4 text-primary" />}
                <div className="font-mono text-xs text-muted-foreground w-20">{e.time}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground w-28">{e.source}</div>
                <div className="text-sm flex-1">{e.type}</div>
                <div className="font-mono text-xs text-muted-foreground">{e.asset}</div>
                <Pill tone={tone(e.sev) as any}>{e.sev}</Pill>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Posture">
          <ul className="space-y-3 text-sm">
            {[
              ["MFA coverage", "98.4%"],
              ["EDR deployed", "99.1%"],
              ["Privileged accts", "126 · all vaulted"],
              ["Open vulnerabilities (crit)", "3 · in patch"],
              ["Last red-team", "11 days ago"],
              ["Compliance drift", "0.4% (low)"],
            ].map(([k, v]) => (
              <li key={k} className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">{k}</span>
                <span className="font-mono text-xs">{v}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
