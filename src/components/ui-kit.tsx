import { ReactNode } from "react";

export function PageHeader({ eyebrow, title, description, actions }: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary mb-1.5">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatTile({ label, value, unit, delta, target }: {
  label: string; value: number | string; unit?: string; delta?: number; target?: number;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="stat-tile group">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <div className="font-display text-3xl font-semibold tabular-nums">{value}</div>
        {unit && <div className="text-sm text-muted-foreground">{unit}</div>}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        {delta !== undefined && (
          <span className={positive ? "text-success" : "text-danger"}>
            {positive ? "▲" : "▼"} {Math.abs(delta)}{typeof delta === "number" && Math.abs(delta) < 1 ? "" : ""}
          </span>
        )}
        {target !== undefined && (
          <span className="text-muted-foreground font-mono">target {target}{unit}</span>
        )}
      </div>
    </div>
  );
}

export function Section({ title, action, children, className = "" }: {
  title: string; action?: ReactNode; children: ReactNode; className?: string;
}) {
  return (
    <section className={`glass-panel p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Pill({ tone = "default", children }: { tone?: "default" | "success" | "warning" | "danger" | "primary"; children: ReactNode }) {
  const map: Record<string, string> = {
    default: "bg-muted text-muted-foreground border-border",
    success: "bg-success/10 text-success border-success/30",
    warning: "bg-warning/10 text-warning border-warning/30",
    danger:  "bg-danger/10 text-danger border-danger/30",
    primary: "bg-primary/10 text-primary border-primary/30",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider border ${map[tone]}`}>
      {children}
    </span>
  );
}
