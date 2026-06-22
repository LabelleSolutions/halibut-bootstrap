import { PageHeader, Section, StatTile } from "@/components/ui-kit";
import { agents } from "@/lib/mockData";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Trust() {
  const data = agents.map((a) => ({ name: a.name, trust: Math.round(a.trust * 100), dec: a.decisions }));
  return (
    <div>
      <PageHeader
        eyebrow="Trust Score Dashboard"
        title="Trustworthiness of every decision-making entity."
        description="Trust is composed from calibration, outcome accuracy, dissent ratio, policy alignment, and audit completeness."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatTile label="Org Trust Index" value={0.871} delta={+0.02} target={0.85} />
        <StatTile label="Calibration error" value="0.041" delta={-0.008} />
        <StatTile label="Outcome accuracy" value="91.4" unit="%" delta={+1.1} />
        <StatTile label="Dissent ratio" value="12.6" unit="%" delta={-0.4} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Section title="Agent trust scores" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="trust" radius={[6, 6, 0, 0]} fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
        <Section title="Composition">
          <ul className="space-y-3">
            {[
              ["Calibration",        88],
              ["Outcome accuracy",   91],
              ["Policy alignment",   96],
              ["Audit completeness", 99],
              ["Dissent integration",84],
            ].map(([k, v]) => (
              <li key={k as string}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-mono">{v}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded">
                  <div className="h-1.5 rounded bg-gradient-primary" style={{ width: `${v}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
