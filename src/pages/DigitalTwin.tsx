import { PageHeader, Section, StatTile, Pill } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useMemo, useState } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function DigitalTwin() {
  const [demand, setDemand] = useState(100);
  const [staff, setStaff] = useState(100);
  const [price, setPrice] = useState(100);

  const data = useMemo(() => Array.from({ length: 24 }, (_, h) => {
    const base = 100 + Math.sin(h / 3) * 12;
    const scenario = base * (demand / 100) * (1 - (staff < 100 ? (100 - staff) * 0.004 : 0)) * (1 + (price - 100) * 0.002);
    return { h: `${String(h).padStart(2, "0")}:00`, baseline: Math.round(base), scenario: Math.round(scenario) };
  }), [demand, staff, price]);

  const revenue = Math.round(data.reduce((s, d) => s + d.scenario, 0) * 142);
  const sla = Math.max(74, Math.min(99.8, 98 - (100 - staff) * 0.18 - (demand - 100) * 0.12));

  return (
    <div>
      <PageHeader
        eyebrow="Digital Twin Simulator"
        title="What-if, before commit."
        description="The twin runs counterfactuals over your live operations — shifting demand, staffing, and pricing — without risk to production."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatTile label="Simulated revenue · 24h" value={`$${(revenue/1000).toFixed(1)}k`} />
        <StatTile label="SLA attainment" value={sla.toFixed(1)} unit="%" />
        <StatTile label="Throughput Δ" value={`${(((demand - 100) + (staff - 100)*0.4)/2).toFixed(1)}`} unit="%" />
        <StatTile label="Twin fidelity" value="0.94" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Section title="Scenario controls" className="lg:col-span-1">
          <Knob k="Demand surge" v={`${demand}%`} val={demand} set={setDemand} min={60} max={160} />
          <Knob k="Staffing level" v={`${staff}%`} val={staff} set={setStaff} min={60} max={130} />
          <Knob k="Price index" v={`${price}%`} val={price} set={setPrice} min={85} max={120} />
          <div className="flex gap-2 mt-5">
            <Button variant="outline" className="flex-1" onClick={() => { setDemand(100); setStaff(100); setPrice(100); }}>
              <RotateCcw className="h-4 w-4 mr-1.5" /> Reset
            </Button>
            <Button className="flex-1 bg-gradient-primary text-primary-foreground" onClick={() => toast.success("Promoted SIM-78 to Decision Studio")}>
              <Play className="h-4 w-4 mr-1.5" /> Promote
            </Button>
          </div>
        </Section>

        <Section title="Baseline vs Scenario" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="h" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--border))" />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line dataKey="baseline" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
                <Line dataKey="scenario" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Pill tone="primary">Live twin · last sync 4s ago</Pill>
            <Pill>Confidence interval ±3.1%</Pill>
            <Pill tone="success">No policy violations detected</Pill>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Knob({ k, v, val, set, min, max }: any) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{k}</span>
        <span className="text-sm font-mono">{v}</span>
      </div>
      <Slider value={[val]} onValueChange={([x]) => set(x)} min={min} max={max} step={1} />
    </div>
  );
}
