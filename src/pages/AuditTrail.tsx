import { PageHeader, Section, Pill } from "@/components/ui-kit";
import { auditLog } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AuditTrail() {
  const [q, setQ] = useState("");
  const rows = auditLog.filter(r => (r.actor + r.action + r.target).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHeader
        eyebrow="Immutable Audit Trail"
        title="Every signal, every decision, every actor."
        description="Append-only audit log with cryptographic anchoring. Exportable for SOC 2, ISO 27001, EU AI Act."
      />
      <Section title={`Events · ${rows.length}`} action={<Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter…" className="h-8 w-56 bg-muted/40" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-left font-medium py-2 pr-3">Timestamp</th>
                <th className="text-left font-medium py-2 pr-3">Actor</th>
                <th className="text-left font-medium py-2 pr-3">Action</th>
                <th className="text-left font-medium py-2 pr-3">Target</th>
                <th className="text-left font-medium py-2 pr-3">Result</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-border/40 hover:bg-muted/30">
                  <td className="py-2 pr-3 font-mono text-xs text-muted-foreground">{r.ts}</td>
                  <td className="py-2 pr-3">{r.actor}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{r.action}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{r.target}</td>
                  <td className="py-2 pr-3"><Pill tone={r.result === "warning" ? "warning" : "success"}>{r.result}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
