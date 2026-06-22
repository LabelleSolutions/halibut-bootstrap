import { PageHeader, Section, Pill } from "@/components/ui-kit";
import { risks } from "@/lib/mockData";
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";

export default function RiskRadar() {
  const data = risks.map(r => ({ ...r, x: r.probability * 100, y: r.impact * 100, z: 200 }));
  return (
    <div>
      <PageHeader
        eyebrow="Risk Radar"
        title="Probability × Impact, continuously re-scored."
        description="The twin updates these as the world changes. Owners are assigned; trending direction is tracked."
      />
      <div className="grid lg:grid-cols-3 gap-4">
        <Section title="Live risk map" className="lg:col-span-2">
          <div className="h-80">
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 16, right: 24, bottom: 24, left: 16 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="Probability" unit="%" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" />
                <YAxis type="number" dataKey="y" name="Impact" unit="%" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" />
                <ZAxis type="number" dataKey="z" range={[80, 400]} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                  formatter={(_v, _n, ctx: any) => [`P ${ctx.payload.x.toFixed(0)}% · I ${ctx.payload.y.toFixed(0)}%`, ctx.payload.name]}
                />
                <Scatter data={data} fill="hsl(var(--primary))" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Registry">
          <ul className="space-y-2">
            {risks.map((r) => (
              <li key={r.name} className="p-3 rounded-md border border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{r.name}</div>
                  <Pill tone={r.trend === "rising" ? "danger" : r.trend === "falling" ? "success" : "default"}>{r.trend}</Pill>
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground font-mono">
                  P {(r.probability*100).toFixed(0)}% · I {(r.impact*100).toFixed(0)}% · owner {r.owner}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
