import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "@/lib/session";
import AppLayout from "@/components/AppLayout";
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
              <Route index element={<Dashboard />} />
              <Route path="pipeline" element={<Pipeline />} />
              <Route path="idie" element={<IDIE />} />
              <Route path="trust" element={<Trust />} />
              <Route path="graph" element={<ContextGraph />} />
              <Route path="agents" element={<AgentBoard />} />
              <Route path="approvals" element={<Approvals />} />
              <Route path="twin" element={<DigitalTwin />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="blueprint" element={<Blueprint />} />
              <Route path="studio" element={<DecisionStudio />} />
              <Route path="audit" element={<AuditTrail />} />
              <Route path="scenarios" element={<Scenarios />} />
              <Route path="risk" element={<RiskRadar />} />
              <Route path="incidents" element={<Incidents />} />
              <Route path="workforce" element={<Workforce />} />
              <Route path="soc" element={<SOC />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
