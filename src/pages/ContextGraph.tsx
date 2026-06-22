import { PageHeader, Section, Pill } from "@/components/ui-kit";
import { contextGraphEdges, contextGraphNodes } from "@/lib/mockData";

export default function ContextGraph() {
  const w = 900, h = 480, cx = w / 2, cy = h / 2;
  const positions: Record<string, { x: number; y: number }> = {};
  const groups = ["org", "fn", "env", "sys", "twin"];
  contextGraphNodes.forEach((n, i) => {
    const ring = groups.indexOf(n.group);
    const inRing = contextGraphNodes.filter(x => x.group === n.group);
    const idx = inRing.indexOf(n);
    const r = 60 + ring * 80;
    const a = (idx / inRing.length) * Math.PI * 2 + ring * 0.4;
    positions[n.id] = { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.75 };
  });
  const colorFor = (g: string) => ({
    org: "hsl(var(--primary))", fn: "hsl(var(--accent))",
    env: "hsl(var(--gold))", sys: "hsl(var(--success))", twin: "hsl(var(--primary-glow))",
  } as any)[g];

  return (
    <div>
      <PageHeader
        eyebrow="Operational Context Graph"
        title="Every entity, dependency, and signal — modeled."
        description="The semantic memory of the enterprise. Powers reasoning, blast-radius analysis, and root-cause traversal."
      />
      <div className="flex flex-wrap gap-2 mb-4">
        {[["Organization","primary"],["Function","default"],["Environment","warning"],["System","success"],["Twin","primary"]].map(([k,t]) => (
          <Pill key={k as string} tone={t as any}>{k}</Pill>
        ))}
      </div>
      <Section title="Live topology · 842,113 nodes · 3.1M edges">
        <div className="relative w-full overflow-x-auto">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[480px]">
            <defs>
              <radialGradient id="bg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--primary) / 0.10)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width={w} height={h} fill="url(#bg)" />
            {contextGraphEdges.map(([a, b], i) => {
              const pa = positions[a], pb = positions[b];
              return <line key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke="hsl(var(--border))" strokeWidth={1.2} />;
            })}
            {contextGraphNodes.map((n) => {
              const p = positions[n.id];
              return (
                <g key={n.id}>
                  <circle cx={p.x} cy={p.y} r={22} fill={colorFor(n.group)} opacity={0.15} />
                  <circle cx={p.x} cy={p.y} r={9} fill={colorFor(n.group)} />
                  <text x={p.x} y={p.y + 28} textAnchor="middle" fontSize={11} fill="hsl(var(--foreground))" fontFamily="Inter">{n.label}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </Section>
    </div>
  );
}
