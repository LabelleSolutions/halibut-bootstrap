import { PageHeader, Section, StatTile } from "@/components/ui-kit";
import { workforceForecast } from "@/lib/mockData";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Workforce() {
  return (
    <div>
      <PageHeader
        eyebrow="Workforce Forecasting"
        title="14-day forward look across pods."
        description="The twin reconciles intent forecasts, skill mix, attrition, and SLA targets — and recommends adjustments."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatTile label="Forecast accuracy" value="94.1" unit="%" delta={+0.9} />
        <StatTile label="Required FTE" value={workforceForecast.at(-1)?.required ?? 0} />
        <StatTile label="Scheduled FTE" value={workforceForecast.at(-1)?.scheduled ?? 0} />
        <StatTile label="Attrition risk" value="3.2" unit="%" delta={-0.2} />
      </div>

      <Section title="Required vs Scheduled · 14d" className="mb-4">
        <div className="h-72">
          <ResponsiveContainer>
            <ComposedChart data={workforceForecast}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" />
              <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="scheduled" fill="hsl(var(--primary) / 0.6)" radius={[4,4,0,0]} />
              <Line dataKey="required" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Section>

      <Section title="Attrition signal">
        <div className="h-48">
          <ResponsiveContainer>
            <AreaChart data={workforceForecast}>
              <defs>
                <linearGradient id="attr" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--warning))" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="hsl(var(--warning))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" />
              <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Area dataKey="attrition" stroke="hsl(var(--warning))" fill="url(#attr)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Section>
    </div>
  );
}
