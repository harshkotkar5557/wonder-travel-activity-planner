import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  it("returns debounced value after delay", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "Pa" },
      },
    );

    expect(result.current).toBe("Pa");

    rerender({ value: "Paris" });

    expect(result.current).toBe("Pa");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("Paris");

    vi.useRealTimers();
  });
});
