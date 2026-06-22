import { PageHeader, Section, Pill, StatTile } from "@/components/ui-kit";
import { incidents } from "@/lib/mockData";

export default function Incidents() {
  return (
    <div>
      <PageHeader
        eyebrow="Incident Management"
        title="Resolve faster — with the twin in the war room."
        description="HALIBUT recommends containment, predicts blast radius, and drafts comms — humans command."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatTile label="Open incidents" value={incidents.filter(i => i.status !== "Resolved").length} delta={-2} />
        <StatTile label="MTTA" value="2.1" unit="m" delta={-0.3} />
        <StatTile label="MTTR" value="38" unit="m" delta={-7} />
        <StatTile label="Auto-mitigated" value="44" unit="%" delta={+3.4} />
      </div>

      <Section title="All incidents">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-border">
                {["ID","Title","Env","Severity","Owner agent","Opened","Status"].map(h => (
                  <th key={h} className="text-left font-medium py-2 pr-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {incidents.map((i) => (
                <tr key={i.id} className="border-b border-border/40 hover:bg-muted/30">
                  <td className="py-2 pr-3 font-mono text-xs">{i.id}</td>
                  <td className="py-2 pr-3">{i.title}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{i.env}</td>
                  <td className="py-2 pr-3"><Pill tone={i.severity === "SEV-1" ? "danger" : i.severity === "SEV-2" ? "warning" : "default"}>{i.severity}</Pill></td>
                  <td className="py-2 pr-3">{i.owner}</td>
                  <td className="py-2 pr-3 text-muted-foreground text-xs">{i.opened}</td>
                  <td className="py-2 pr-3"><Pill tone={i.status === "Resolved" ? "success" : i.status === "Mitigating" ? "warning" : "primary"}>{i.status}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
