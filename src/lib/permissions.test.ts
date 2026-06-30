import { describe, expect, it } from "vitest";
import {
  ROLE_MODULES,
  canAccess,
  canAccessPath,
  defaultPathFor,
} from "./permissions";
import { ROLES } from "./mockData";

describe("role permissions", () => {
  it("grants the dashboard to every configured role", () => {
    for (const role of ROLES) {
      expect(canAccess(role, "dashboard")).toBe(true);
      expect(defaultPathFor(role)).toBe("/app");
    }
  });

  it("grants every module to administrators", () => {
    const administratorModules = ROLE_MODULES.Administrator;
    expect(administratorModules.length).toBeGreaterThan(0);

    for (const module of administratorModules) {
      expect(canAccess("Administrator", module)).toBe(true);
    }
  });

  it("keeps sensitive build modules outside operations access", () => {
    expect(canAccess("Operations", "studio")).toBe(false);
    expect(canAccess("Operations", "audit")).toBe(false);
    expect(canAccess("Operations", "integrations")).toBe(false);
  });

  it("maps protected paths and leaves unknown paths to the router", () => {
    expect(canAccessPath("Security", "/app/soc")).toBe(true);
    expect(canAccessPath("Support", "/app/soc")).toBe(false);
    expect(canAccessPath("Support", "/public-information")).toBe(true);
  });
});
