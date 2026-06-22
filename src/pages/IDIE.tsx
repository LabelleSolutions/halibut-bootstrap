import { PageHeader, Section, Pill, StatTile } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Zap } from "lucide-react";
import { toast } from "sonner";

export default function IDIE() {
  const [autonomy, setAutonomy] = useState(72);
  const [risk, setRisk] = useState(35);
  const [confidenceGate, setConfidenceGate] = useState(82);

  const inject = () => toast.success("Decision injected", { description: "IDIE-2231 dispatched to Decision Board" });

  return (
    <div>
      <PageHeader
        eyebrow="IDIE · Intelligent Decision Injection Engine"
        title="Inject expert decisions into live operations."
        description="IDIE arbitrates between autonomous agent recommendations and human-defined policy, routing each decision through the appropriate trust gate."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatTile label="Injections / hr" value={184} delta={+12} target={150} />
        <StatTile label="Autonomous Rate" value="71" unit="%" delta={+3.4} target={65} />
        <StatTile label="Gate Failures" value={9} delta={-2} target={15} />
        <StatTile label="Avg latency" value="412" unit="ms" delta={-18} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Section title="Injection Console" className="lg:col-span-2">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <Label k="Autonomy threshold" v={`${autonomy}%`} />
              <Slider value={[autonomy]} onValueChange={([v]) => setAutonomy(v)} max={100} step={1} />
              <p className="text-[11px] text-muted-foreground mt-1.5">Decisions with confidence ≥ {autonomy}% execute without human review.</p>
            </div>
            <div>
              <Label k="Risk tolerance" v={`${risk} / 100`} />
              <Slider value={[risk]} onValueChange={([v]) => setRisk(v)} max={100} step={1} />
              <p className="text-[11px] text-muted-foreground mt-1.5">Higher values allow IDIE to commit to riskier branches autonomously.</p>
            </div>
            <div>
              <Label k="Confidence gate" v={`${confidenceGate}%`} />
              <Slider value={[confidenceGate]} onValueChange={([v]) => setConfidenceGate(v)} max={100} step={1} />
              <p className="text-[11px] text-muted-foreground mt-1.5">Below this, decisions are escalated to the Multi-Agent Board.</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label k="Override channel" v="boardroom-rail" />
              <select className="h-9 rounded-md bg-muted/60 border border-border px-2 text-sm">
                <option>Boardroom Rail (CEO + Ops)</option>
                <option>Production Bridge</option>
                <option>Security War Room</option>
              </select>
            </div>
          </div>

          <div className="mt-5 p-4 rounded-md border border-primary/30 bg-primary/5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-primary">Composed injection</div>
                <div className="font-display text-lg mt-0.5">IDIE-2231 · Shift +12 BPO agents to Manila pod</div>
                <div className="text-xs text-muted-foreground mt-1">Confidence 0.91 · Risk 0.28 · Trust ≥ gate · auto-eligible</div>
              </div>
              <Button onClick={inject} className="bg-gradient-primary text-primary-foreground shadow-glow">
                <Zap className="h-4 w-4 mr-1.5" /> Inject decision
              </Button>
            </div>
          </div>
        </Section>

        <Section title="Active Policies">
          <ul className="space-y-2 text-sm">
            {[
              ["Pricing band ±5%", "primary"],
              ["No autonomous layoffs", "danger"],
              ["SLA never < 95%", "warning"],
              ["PII never crosses region", "danger"],
              ["Auto-isolate confirmed C2", "primary"],
              ["Human approval > $1M decisions", "warning"],
            ].map(([p, tone]) => (
              <li key={p} className="flex items-center justify-between border-b border-border/40 pb-2">
                <span>{p}</span>
                <Pill tone={tone as any}>active</Pill>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}

function Label({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between mb-2">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{k}</span>
      <span className="text-sm font-mono">{v}</span>
    </div>
  );
}
