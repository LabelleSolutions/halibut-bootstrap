import { useSession } from "@/lib/session";
import { ENVIRONMENTS, organization } from "@/lib/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, LogOut, Search, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AppHeader() {
  const { user, environment, setEnvironment, signOut } = useSession();
  const nav = useNavigate();
  return (
    <header className="h-16 shrink-0 flex items-center gap-3 px-4 md:px-6 border-b border-border bg-background/60 backdrop-blur-xl">
      <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
        <span className="text-foreground font-medium">{organization.name}</span>
        <span>·</span><span>{organization.region}</span>
      </div>

      <div className="flex-1 max-w-xl mx-auto relative">
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          className="w-full h-9 pl-9 pr-3 rounded-md bg-muted/60 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Search decisions, agents, assets, incidents…"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-1.5 px-2.5 h-9 rounded-md bg-muted/60 border border-border text-xs font-mono">
          <Activity className="h-3.5 w-3.5 text-success animate-pulse-soft" />
          <span className="text-muted-foreground">SIGNALS</span>
          <span className="text-foreground">1.24M/min</span>
        </div>

        <Select value={environment} onValueChange={(v) => setEnvironment(v as any)}>
          <SelectTrigger className="h-9 w-[200px] bg-muted/60 border-border">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mr-2">ENV</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ENVIRONMENTS.map((e) => (
              <SelectItem key={e} value={e}>{e}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-danger" />
        </Button>

        <div className="hidden md:flex items-center gap-2 pl-3 ml-1 border-l border-border">
          <div className="text-right leading-tight">
            <div className="text-sm font-medium">{user?.name}</div>
            <div className="text-[10px] uppercase tracking-wider text-primary">{user?.role}</div>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-primary grid place-items-center font-semibold text-primary-foreground">
            {user?.name?.[0] ?? "?"}
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => { signOut(); nav("/"); }}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
