import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Role, Environment, ROLES, ENVIRONMENTS } from "./mockData";

export type SessionUser = {
  name: string;
  email: string;
  role: Role;
};

type SessionState = {
  user: SessionUser | null;
  environment: Environment;
};

type Session = SessionState & {
  signIn: (name: string, email: string, role: Role) => void;
  signOut: () => void;
  setEnvironment: (environment: Environment) => void;
};

const Ctx = createContext<Session | null>(null);

const KEY = "halibut.demo.session.v2";
const DEFAULT_STATE: SessionState = {
  user: null,
  environment: "Production",
};

const isRole = (value: unknown): value is Role =>
  typeof value === "string" && ROLES.includes(value as Role);

const isEnvironment = (value: unknown): value is Environment =>
  typeof value === "string" && ENVIRONMENTS.includes(value as Environment);

const isEmail = (value: unknown): value is string =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export function parseStoredSession(raw: string | null): SessionState {
  if (!raw) return DEFAULT_STATE;

  try {
    const candidate = JSON.parse(raw) as Partial<SessionState>;
    const environment = isEnvironment(candidate.environment)
      ? candidate.environment
      : DEFAULT_STATE.environment;

    const user = candidate.user;
    if (
      user &&
      typeof user === "object" &&
      typeof user.name === "string" &&
      user.name.trim().length > 0 &&
      isEmail(user.email) &&
      isRole(user.role)
    ) {
      return {
        environment,
        user: {
          name: user.name.trim().slice(0, 80),
          email: user.email.trim().toLowerCase().slice(0, 254),
          role: user.role,
        },
      };
    }

    return { user: null, environment };
  } catch {
    return DEFAULT_STATE;
  }
}

function loadStoredSession(): SessionState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  return parseStoredSession(window.localStorage.getItem(KEY));
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionState>(loadStoredSession);

  useEffect(() => {
    window.localStorage.setItem(KEY, JSON.stringify(session));
  }, [session]);

  const signIn = (name: string, email: string, role: Role) => {
    const normalizedName = name.trim().slice(0, 80);
    const normalizedEmail = email.trim().toLowerCase().slice(0, 254);

    if (!normalizedName || !isEmail(normalizedEmail) || !isRole(role)) return;

    setSession((current) => ({
      ...current,
      user: { name: normalizedName, email: normalizedEmail, role },
    }));
  };

  const signOut = () =>
    setSession((current) => ({ ...current, user: null }));

  const setEnvironment = (environment: Environment) => {
    if (!isEnvironment(environment)) return;
    setSession((current) => ({ ...current, environment }));
  };

  return (
    <Ctx.Provider
      value={{
        ...session,
        signIn,
        signOut,
        setEnvironment,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useSession() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSession outside provider");
  return ctx;
}
