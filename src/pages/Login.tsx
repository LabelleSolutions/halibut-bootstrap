import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/lib/session";
import { ROLES, Role } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fish, ArrowRight, ShieldCheck, Activity, Layers } from "lucide-react";

export default function Login() {
  const { signIn } = useSession();
  const nav = useNavigate();
  const [name, setName] = useState("Jordan Chen");
  const [email, setEmail] = useState("jordan.chen@apex.demo");
  const [role, setRole] = useState<Role>("CEO");

  return (
    <div className="min-h-full grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden border-r border-border bg-gradient-surface">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
              <Fish className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <div className="font-display text-xl font-bold tracking-tight">HALIBUT <span className="text-primary">OS</span></div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Operational Intelligence Infrastructure</div>
            </div>
          </div>
        </div>

        <div className="relative max-w-md">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary mb-3">The Enterprise Decision OS</div>
          <h1 className="font-display text-4xl font-bold leading-tight glow-text">
            An expert digital twin for every operator in your enterprise.
          </h1>
          <p className="mt-4 text-muted-foreground">
            HALIBUT OS observes, understands, predicts, decides, executes, and learns —
            in continuous loops, with humans on the boardroom rail.
          </p>

          <div className="mt-8 grid gap-3">
            {[
              { icon: Activity, k: "1.24M signals/min", v: "Demonstration telemetry across ERP · CRM · WFM · Cyber" },
              { icon: Layers, k: "OUPDEL pipeline", v: "Observe → Understand → Predict → Decide → Execute → Learn" },
              { icon: ShieldCheck, k: "Trust-scored decisions", v: "Multi-agent deliberation with human approval rails" },
            ].map((feature) => (
              <div key={feature.k} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50">
                <feature.icon className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <div className="text-sm font-medium">{feature.k}</div>
                  <div className="text-xs text-muted-foreground">{feature.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs text-muted-foreground font-mono">
          Pre-production demonstration · Security and compliance controls shown are design targets, not certifications.
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
              <Fish className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="font-display text-lg font-bold">HALIBUT <span className="text-primary">OS</span></div>
          </div>

          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary mb-2">Controlled demonstration access</div>
          <h2 className="font-display text-2xl font-bold mb-1">Welcome, operator.</h2>
          <p className="text-sm text-muted-foreground mb-8">Enter a demonstration identity and select the role view you need.</p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              signIn(name, email, role);
              nav("/app");
            }}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="demo-name" className="text-xs uppercase tracking-wider text-muted-foreground">Full name</Label>
              <Input id="demo-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={80} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="demo-email" className="text-xs uppercase tracking-wider text-muted-foreground">Demonstration email</Label>
              <Input id="demo-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={254} required />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Role view</Label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map((candidateRole) => (
                  <button
                    type="button"
                    key={candidateRole}
                    onClick={() => setRole(candidateRole)}
                    aria-pressed={role === candidateRole}
                    className={`px-3 py-2 rounded-md text-sm border text-left transition-all ${
                      role === candidateRole
                        ? "border-primary bg-primary/10 text-foreground shadow-[0_0_0_1px_hsl(var(--primary)/0.4)]"
                        : "border-border bg-muted/40 text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    {candidateRole}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full h-11 bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow font-semibold">
              Enter Command Surface <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>

            <p className="text-[11px] text-muted-foreground text-center pt-2">
              No password or real credential is collected. Access controls in this build are client-side demonstration gates.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
