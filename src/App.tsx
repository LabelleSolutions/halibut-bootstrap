import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "@/lib/session";
import AppLayout from "@/components/AppLayout";
import RoleGuard from "@/components/RoleGuard";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Pipeline from "@/pages/Pipeline";
import IDIE from "@/pages/IDIE";
import Trust from "@/pages/Trust";
import ContextGraph from "@/pages/ContextGraph";
import AgentBoard from "@/pages/AgentBoard";
import Approvals from "@/pages/Approvals";
import DigitalTwin from "@/pages/DigitalTwin";
import Integrations from "@/pages/Integrations";
import Blueprint from "@/pages/Blueprint";
import DecisionStudio from "@/pages/DecisionStudio";
import AuditTrail from "@/pages/AuditTrail";
import Scenarios from "@/pages/Scenarios";
import RiskRadar from "@/pages/RiskRadar";
import Incidents from "@/pages/Incidents";
import Workforce from "@/pages/Workforce";
import SOC from "@/pages/SOC";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const guarded = (mod: Parameters<typeof RoleGuard>[0]["module"], el: JSX.Element) => (
  <RoleGuard module={mod}>{el}</RoleGuard>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SessionProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </SessionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
