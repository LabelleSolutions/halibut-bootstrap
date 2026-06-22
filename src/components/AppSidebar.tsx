import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, GitBranch, Brain, ShieldCheck, Network, Users2, CheckSquare,
  Boxes, Plug, Wand2, Workflow, ScrollText, Telescope, Radar, AlertOctagon,
  CalendarRange, ShieldAlert, Fish,
} from "lucide-react";

const nav = [
  { section: "Command", items: [
    { to: "/app", label: "Executive Command", icon: LayoutDashboard, end: true },
    { to: "/app/pipeline", label: "OUPDEL Pipeline", icon: GitBranch },
    { to: "/app/idie", label: "IDIE Engine", icon: Brain },
    { to: "/app/trust", label: "Trust Score", icon: ShieldCheck },
  ]},
  { section: "Intelligence", items: [
    { to: "/app/graph", label: "Context Graph", icon: Network },
    { to: "/app/agents", label: "Agent Decision Board", icon: Users2 },
    { to: "/app/approvals", label: "Human Approvals", icon: CheckSquare },
    { to: "/app/twin", label: "Digital Twin Sim", icon: Boxes },
  ]},
  { section: "Build", items: [
    { to: "/app/integrations", label: "Integrations", icon: Plug },
    { to: "/app/blueprint", label: "Blueprint AI Builder", icon: Wand2 },
    { to: "/app/studio", label: "Decision Studio", icon: Workflow },
    { to: "/app/audit", label: "Audit Trail", icon: ScrollText },
  ]},
  { section: "Operate", items: [
    { to: "/app/scenarios", label: "Scenario Planning", icon: Telescope },
    { to: "/app/risk", label: "Risk Radar", icon: Radar },
    { to: "/app/incidents", label: "Incident Mgmt", icon: AlertOctagon },
    { to: "/app/workforce", label: "Workforce Forecast", icon: CalendarRange },
    { to: "/app/soc", label: "Security Ops Center", icon: ShieldAlert },
  ]},
];

export default function AppSidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl">
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-sidebar-border">
        <div className="h-9 w-9 rounded-md bg-gradient-primary grid place-items-center shadow-glow">
          <Fish className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="leading-tight">
          <div className="font-display font-bold tracking-tight">HALIBUT <span className="text-primary">OS</span></div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Operational Intelligence</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {nav.map((g) => (
          <div key={g.section}>
            <div className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
              {g.section}
            </div>
            <ul className="space-y-0.5">
              {g.items.map((it) => {
                const active = it.end ? pathname === it.to : pathname.startsWith(it.to);
                return (
                  <li key={it.to}>
                    <NavLink
                      to={it.to}
                      end={it.end as any}
                      className={`group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-all ${
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_2px_0_0_0_hsl(var(--primary))]"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <it.icon className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                      <span className="truncate">{it.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="m-3 p-3 rounded-md border border-sidebar-border bg-sidebar-accent/40">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>Twin Health</span><span className="text-success">● Live</span>
        </div>
        <div className="mt-1 text-sm font-mono">v4.2.1 · 99.97% uptime</div>
      </div>
    </aside>
  );
}
