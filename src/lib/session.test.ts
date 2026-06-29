import { describe, expect, it } from "vitest";
import { parseStoredSession } from "./session";

describe("parseStoredSession", () => {
  it("returns the default state when storage is empty", () => {
    expect(parseStoredSession(null)).toEqual({
      user: null,
      environment: "Production",
    });
  });

  it("normalizes a valid stored demonstration identity", () => {
    const state = parseStoredSession(
      JSON.stringify({
        user: {
          name: "  Jordan Chen  ",
          email: "JORDAN.CHEN@APEX.DEMO",
          role: "CEO",
        },
        environment: "Manufacturing",
      }),
    );

    expect(state).toEqual({
      user: {
        name: "Jordan Chen",
        email: "jordan.chen@apex.demo",
        role: "CEO",
      },
      environment: "Manufacturing",
    });
  });

  it("rejects invalid identities without discarding a valid environment", () => {
    const state = parseStoredSession(
      JSON.stringify({
        user: {
          name: "Operator",
          email: "not-an-email",
          role: "CEO",
        },
        environment: "IT Operations",
      }),
    );

    expect(state).toEqual({
      user: null,
      environment: "IT Operations",
    });
  });

  it("recovers safely from malformed JSON", () => {
    expect(parseStoredSession("{invalid")).toEqual({
      user: null,
      environment: "Production",
    });
  });
});
