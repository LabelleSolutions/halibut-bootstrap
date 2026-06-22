import { Outlet, Navigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { useSession } from "@/lib/session";

export default function AppLayout() {
  const { user } = useSession();
  if (!user) return <Navigate to="/" replace />;
  return (
    <div className="h-full flex">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 grid-bg">
          <div className="max-w-[1600px] mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
