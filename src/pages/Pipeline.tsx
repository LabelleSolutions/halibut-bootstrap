import { PageHeader, Section, Pill } from "@/components/ui-kit";
import { pipelineStages, ohiSeries } from "@/lib/mockData";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ArrowRight } from "lucide-react";

export default function Pipeline() {
  return (
    <div>
      <PageHeader
        eyebrow="OUPDEL Pipeline"
        title="Observe → Understand → Predict → Decide → Execute → Learn"
        description="The continuous decision loop driving HALIBUT OS. Each stage emits metrics, events, and learning signals back into the twin."
      />

      <div className="flex items-stretch gap-2 overflow-x-auto pb-2 mb-6">
        {pipelineStages.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2 min-w-[220px]">
            <div className="flex-1 glass-panel p-4 relative overflow-hidden">
              <div className="absolute -inset-px rounded-lg opacity-30 pointer-events-none"
                   style={{ background: `radial-gradient(120px 80px at 100% 0%, hsl(${s.color} / 0.4), transparent 60%)` }} />
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Stage {i + 1}</div>
              <div className="font-display text-lg font-semibold mt-0.5">{s.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] font-mono text-muted-foreground">{s.rate}</span>
                <Pill tone="success">{s.health}%</Pill>
              </div>
            </div>
            {i < pipelineStages.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <Section title="Signal throughput · 24h" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={ohiSeries}>
                <defs>
                  <linearGradient id="sig" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="t" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Area dataKey="decisions" stroke="hsl(var(--accent))" fill="url(#sig)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>
        <Section title="Learn loop · feedback latency">
          <div className="space-y-3">
            {[
              { k: "Observation → Context", v: "1.4s p50 / 4.2s p99" },
              { k: "Context → Prediction",  v: "2.1s p50 / 6.7s p99" },
              { k: "Decision → Execution",  v: "0.8s p50 / 2.4s p99" },
              { k: "Outcome → Twin update", v: "12s p50 / 64s p99" },
              { k: "Twin drift detection",  v: "low · 0.04 KL" },
            ].map((r) => (
              <div key={r.k} className="flex items-center justify-between text-sm border-b border-border/50 pb-2">
                <span className="text-muted-foreground">{r.k}</span>
                <span className="font-mono text-xs">{r.v}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
