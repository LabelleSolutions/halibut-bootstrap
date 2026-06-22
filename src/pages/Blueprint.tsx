import { PageHeader, Section, Pill } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Wand2, Sparkles } from "lucide-react";

const templates = [
  { name: "BPO Surge Protocol", env: "BPO Operations", steps: 7, decisions: 12 },
  { name: "Manufacturing Quality Loop", env: "Manufacturing", steps: 9, decisions: 18 },
  { name: "Fraud Containment Playbook", env: "Financial Services", steps: 11, decisions: 22 },
  { name: "Hospital Bed Optimization", env: "Healthcare", steps: 8, decisions: 14 },
  { name: "E-com Dynamic Pricing", env: "E-commerce", steps: 6, decisions: 9 },
  { name: "IT Major Incident Bridge", env: "IT Operations", steps: 10, decisions: 17 },
];

export default function Blueprint() {
  const [prompt, setPrompt] = useState("Build a workforce surge blueprint that protects SLA during marketing pushes for our BPO Manila pod.");
  const [generated, setGenerated] = useState<string[] | null>(null);
  const generate = () => setGenerated([
    "Observe: predicted call volume spike +28% over baseline",
    "Understand: Manila pod skill mix vs forecasted intent distribution",
    "Predict: SLA breach probability 0.41 at current staffing",
    "Decide: surge +12 agents · pull from L2 reserve · auto-greenlight",
    "Execute: WFM schedule push to NICE CXone · notify pod leads",
    "Learn: capture handle-time deltas, feed twin, recalibrate forecast",
  ]);
  return (
    <div>
      <PageHeader
        eyebrow="Blueprint AI Builder"
        title="Compose operational blueprints in natural language."
        description="Describe the outcome. HALIBUT composes an OUPDEL blueprint with the right agents, signals, and approval gates."
      />

      <div className="grid lg:grid-cols-3 gap-4">
        <Section title="Composer" className="lg:col-span-2">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Outcome description</div>
            <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="min-h-[120px] bg-muted/40" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Input placeholder="Blueprint name" defaultValue="Manila Surge Protocol v3" className="bg-muted/40" />
            <Input placeholder="Owner" defaultValue="Operations" className="bg-muted/40" />
          </div>
          <Button onClick={generate} className="mt-4 bg-gradient-primary text-primary-foreground shadow-glow">
            <Sparkles className="h-4 w-4 mr-1.5" /> Generate blueprint
          </Button>

          {generated && (
            <div className="mt-5 p-4 rounded-md border border-primary/30 bg-primary/5">
              <div className="text-[10px] uppercase tracking-wider text-primary mb-2">Composed OUPDEL Blueprint</div>
              <ol className="space-y-2">
                {generated.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="font-mono text-xs text-primary w-6 shrink-0">0{i+1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline">Send to Decision Studio</Button>
                <Button size="sm" className="bg-gradient-primary text-primary-foreground">Deploy as draft</Button>
              </div>
            </div>
          )}
        </Section>

        <Section title="Template library">
          <ul className="space-y-2">
            {templates.map((t) => (
              <li key={t.name} className="p-3 rounded-md border border-border bg-muted/30 hover:bg-muted/50 transition">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">{t.name}</div>
                  <Wand2 className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <Pill>{t.env}</Pill>
                  <span>· {t.steps} steps</span>
                  <span>· {t.decisions} decisions</span>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
