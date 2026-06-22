import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Role, Environment, ROLES, ENVIRONMENTS } from "./mockData";

type Session = {
  user: { name: string; email: string; role: Role } | null;
  environment: Environment;
  signIn: (name: string, role: Role) => void;
  signOut: () => void;
  setEnvironment: (e: Environment) => void;
};

const Ctx = createContext<Session | null>(null);

const KEY = "halibut.session.v1";

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Session["user"]>(null);
  const [environment, setEnvironment] = useState<Environment>("Production");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.user && ROLES.includes(s.user.role)) setUser(s.user);
        if (s.environment && ENVIRONMENTS.includes(s.environment)) setEnvironment(s.environment);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ user, environment }));
  }, [user, environment]);

  const signIn = (name: string, role: Role) =>
    setUser({ name, email: `${name.toLowerCase().replace(/\s+/g, ".")}@apex.demo`, role });
  const signOut = () => setUser(null);

  return (
    <Ctx.Provider value={{ user, environment, signIn, signOut, setEnvironment }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSession() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSession outside provider");
  return ctx;
}
