import { lazy, Suspense, type ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "@/lib/session";
import AppLayout from "@/components/AppLayout";
import RoleGuard from "@/components/RoleGuard";

const Login = lazy(() => import("@/pages/Login"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Pipeline = lazy(() => import("@/pages/Pipeline"));
const IDIE = lazy(() => import("@/pages/IDIE"));
const Trust = lazy(() => import("@/pages/Trust"));
const ContextGraph = lazy(() => import("@/pages/ContextGraph"));
const AgentBoard = lazy(() => import("@/pages/AgentBoard"));
const Approvals = lazy(() => import("@/pages/Approvals"));
const DigitalTwin = lazy(() => import("@/pages/DigitalTwin"));
const Integrations = lazy(() => import("@/pages/Integrations"));
const Blueprint = lazy(() => import("@/pages/Blueprint"));
const DecisionStudio = lazy(() => import("@/pages/DecisionStudio"));
const AuditTrail = lazy(() => import("@/pages/AuditTrail"));
const Scenarios = lazy(() => import("@/pages/Scenarios"));
const RiskRadar = lazy(() => import("@/pages/RiskRadar"));
const Incidents = lazy(() => import("@/pages/Incidents"));
const Workforce = lazy(() => import("@/pages/Workforce"));
const SOC = lazy(() => import("@/pages/SOC"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

const guarded = (
  module: Parameters<typeof RoleGuard>[0]["module"],
  element: ReactElement,
) => <RoleGuard module={module}>{element}</RoleGuard>;

function RouteFallback() {
  return (
    <div className="min-h-screen grid place-items-center bg-background text-foreground">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Loading command surface
        </p>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SessionProvider>
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/app" element={<AppLayout />}>
                <Route index element={guarded("dashboard", <Dashboard />)} />
                <Route path="pipeline" element={guarded("pipeline", <Pipeline />)} />
                <Route path="idie" element={guarded("idie", <IDIE />)} />
                <Route path="trust" element={guarded("trust", <Trust />)} />
                <Route path="graph" element={guarded("graph", <ContextGraph />)} />
                <Route path="agents" element={guarded("agents", <AgentBoard />)} />
                <Route path="approvals" element={guarded("approvals", <Approvals />)} />
                <Route path="twin" element={guarded("twin", <DigitalTwin />)} />
                <Route path="integrations" element={guarded("integrations", <Integrations />)} />
                <Route path="blueprint" element={guarded("blueprint", <Blueprint />)} />
                <Route path="studio" element={guarded("studio", <DecisionStudio />)} />
                <Route path="audit" element={guarded("audit", <AuditTrail />)} />
                <Route path="scenarios" element={guarded("scenarios", <Scenarios />)} />
                <Route path="risk" element={guarded("risk", <RiskRadar />)} />
                <Route path="incidents" element={guarded("incidents", <Incidents />)} />
                <Route path="workforce" element={guarded("workforce", <Workforce />)} />
                <Route path="soc" element={guarded("soc", <SOC />)} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </SessionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
