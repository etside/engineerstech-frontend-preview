import { describe, it, expect, vi, beforeEach } from "vitest";
import { auth, api } from "./api";

// Mock fetch — must include text() and json() methods to match Response interface
function createMockResponse(init: { ok: boolean; status: number; data?: unknown }) {
  return {
    ok: init.ok,
    status: init.status,
    text: () => Promise.resolve(init.data ? JSON.stringify(init.data) : ""),
    json: () => Promise.resolve(init.data ?? null),
  };
}

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
  localStorage.clear();
});

describe("auth", () => {
  it("stores token on login", async () => {
    mockFetch.mockResolvedValueOnce(
      createMockResponse({
        ok: true,
        status: 200,
        data: { token: "abc123", user: { id: 1, name: "Test", email: "test@test.com" } },
      })
    );

    await auth.login("test@test.com", "password");
    expect(localStorage.getItem("et_token")).toBe("abc123");
  });

  it("clears token on logout", async () => {
    localStorage.setItem("et_token", "abc123");
    mockFetch.mockResolvedValueOnce(createMockResponse({ ok: true, status: 204 }));

    await auth.logout();
    expect(localStorage.getItem("et_token")).toBeNull();
  });

  it("returns null for getUser when no token", async () => {
    const result = await auth.getUser();
    expect(result).toBeNull();
  });

  it("isLoggedIn returns false when no token", () => {
    expect(auth.isLoggedIn()).toBe(false);
  });

  it("isLoggedIn returns true when token exists", () => {
    localStorage.setItem("et_token", "abc123");
    expect(auth.isLoggedIn()).toBe(true);
  });
});

describe("api", () => {
  it("calls correct endpoint for services", async () => {
    mockFetch.mockResolvedValueOnce(
      createMockResponse({ ok: true, status: 200, data: [{ id: 1, title: "Test" }] })
    );

    await api.services();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/services"),
      expect.any(Object)
    );
  });

  it("throws on non-ok response", async () => {
    mockFetch.mockResolvedValueOnce(
      createMockResponse({ ok: false, status: 500, data: { message: "Server error" } })
    );

    await expect(api.services()).rejects.toThrow("Server error");
  });
});
