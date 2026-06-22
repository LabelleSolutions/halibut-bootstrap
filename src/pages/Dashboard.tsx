import { kpis, ohiSeries, decisionBoard, incidents, pipelineStages, organization } from "@/lib/mockData";
import { PageHeader, StatTile, Section, Pill } from "@/components/ui-kit";
import { useSession } from "@/lib/session";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Line, LineChart,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Download, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, environment } = useSession();
  return (
    <div>
      <PageHeader
        eyebrow={`Executive Command Center · ${environment}`}
        title={`Good ${greeting()}, ${user?.name?.split(" ")[0]}.`}
        description={`${organization.name} is operating at OHI 92.4 with 71% autonomous decisioning. 2 SEV-2 incidents require oversight.`}
        actions={
          <>
            <Button variant="outline" className="h-9"><Download className="h-4 w-4 mr-1.5" />Brief PDF</Button>
            <Button className="h-9 bg-gradient-primary text-primary-foreground shadow-glow"><Play className="h-4 w-4 mr-1.5" />Run morning sim</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {kpis.map((k) => <StatTile key={k.label} {...k} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <Section title="Operational Health Index · 24h" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={ohiSeries}>
                <defs>
                  <linearGradient id="ohi" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="t" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" domain={[70, 100]} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="ohi" stroke="hsl(var(--primary))" fill="url(#ohi)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Decision Velocity" action={<Pill tone="primary">Live</Pill>}>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={ohiSeries}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="t" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="decisions" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <Section title="OUPDEL Pipeline Health" className="lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {pipelineStages.map((s) => (
              <div key={s.key} className="rounded-md border border-border bg-muted/30 p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{s.name}</div>
                  <span className="ticker-dot" style={{ color: `hsl(${s.color})` }} />
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{s.desc}</div>
                <div className="mt-2 flex items-baseline justify-between">
                  <div className="text-xs font-mono text-muted-foreground">{s.rate}</div>
                  <div className="text-sm font-mono">{s.health}%</div>
                </div>
                <div className="mt-1.5 h-1 bg-muted rounded">
                  <div className="h-1 rounded" style={{ width: `${s.health}%`, background: `hsl(${s.color})` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/app/pipeline" className="text-xs text-primary hover:underline">Open pipeline →</Link>
          </div>
        </Section>

        <Section title="Pending Approvals" action={<Pill tone="warning">{decisionBoard.filter(d=>d.status==='pending-approval').length} queued</Pill>}>
          <ul className="space-y-2">
            {decisionBoard.filter(d => d.status === "pending-approval").map((d) => (
              <li key={d.id} className="rounded-md border border-border bg-muted/30 p-3 hover:bg-muted/50 transition">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span className="font-mono">{d.id} · {d.env}</span>
                  <span className="text-primary">conf {(d.confidence*100).toFixed(0)}%</span>
                </div>
                <div className="text-sm mt-1">{d.title}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{d.impact}</div>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="Active Incidents" action={<Link to="/app/incidents" className="text-xs text-primary hover:underline">View all →</Link>}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-left font-medium py-2 pr-3">ID</th>
                <th className="text-left font-medium py-2 pr-3">Title</th>
                <th className="text-left font-medium py-2 pr-3">Env</th>
                <th className="text-left font-medium py-2 pr-3">Owner</th>
                <th className="text-left font-medium py-2 pr-3">Severity</th>
                <th className="text-left font-medium py-2 pr-3">Opened</th>
                <th className="text-left font-medium py-2 pr-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((i) => (
                <tr key={i.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-2 pr-3 font-mono text-xs">{i.id}</td>
                  <td className="py-2 pr-3">{i.title}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{i.env}</td>
                  <td className="py-2 pr-3">{i.owner}</td>
                  <td className="py-2 pr-3">
                    <Pill tone={i.severity === "SEV-1" ? "danger" : i.severity === "SEV-2" ? "warning" : "default"}>{i.severity}</Pill>
                  </td>
                  <td className="py-2 pr-3 text-muted-foreground text-xs">{i.opened}</td>
                  <td className="py-2 pr-3">
                    <Pill tone={i.status === "Resolved" ? "success" : i.status === "Mitigating" ? "warning" : "primary"}>{i.status}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "morning" : h < 18 ? "afternoon" : "evening";
}
