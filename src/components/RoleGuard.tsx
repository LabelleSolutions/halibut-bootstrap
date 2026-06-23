import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useSession } from "@/lib/session";
import { ModuleKey, canAccess, defaultPathFor } from "@/lib/permissions";
import { ShieldAlert } from "lucide-react";

export default function RoleGuard({
  module,
  children,
}: {
  module: ModuleKey;
  children: ReactNode;
}) {
  const { user } = useSession();
  const location = useLocation();

  if (!user) return <Navigate to="/" replace state={{ from: location }} />;

  if (!canAccess(user.role, module)) {
    return (
      <div className="grid place-items-center min-h-[60vh]">
        <div className="max-w-md text-center glass-panel p-8 rounded-lg">
          <div className="mx-auto h-12 w-12 rounded-md bg-destructive/15 grid place-items-center mb-4">
            <ShieldAlert className="h-6 w-6 text-destructive" />
          </div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1">
            Access Restricted
          </div>
          <h2 className="text-lg font-display font-semibold mb-2">
            Module unavailable for the {user.role} role
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            Your current role does not have clearance for this module. Switch roles
            from the sign-in screen or contact an Administrator.
          </p>
          <a
            href={defaultPathFor(user.role)}
            className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90"
          >
            Return to allowed module
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
