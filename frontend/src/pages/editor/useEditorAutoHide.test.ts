import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useEditorAutoHide } from "./useEditorAutoHide";

describe("useEditorAutoHide", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => store.set(key, value),
        removeItem: (key: string) => store.delete(key),
        clear: () => store.clear(),
      },
    });
  });

  it("uses the user preference when a drawing has no override", () => {
    const { result, rerender } = renderHook(
      ({ defaultEnabled }) => useEditorAutoHide("drawing-1", defaultEnabled),
      { initialProps: { defaultEnabled: false } },
    );

    expect(result.current.autoHideEnabled).toBe(false);

    rerender({ defaultEnabled: true });
    expect(result.current.autoHideEnabled).toBe(true);
  });

  it("keeps a drawing override when the user preference changes", () => {
    const key = "excalidash:editor:drawing-1:autoHideEnabled";
    window.localStorage.setItem(key, "0");
    const { result, rerender } = renderHook(
      ({ defaultEnabled }) => useEditorAutoHide("drawing-1", defaultEnabled),
      { initialProps: { defaultEnabled: true } },
    );

    expect(result.current.autoHideEnabled).toBe(false);

    rerender({ defaultEnabled: false });
    expect(result.current.autoHideEnabled).toBe(false);
  });

  it("stores a drawing-specific override", () => {
    const { result } = renderHook(() => useEditorAutoHide("drawing-1", true));

    act(() => result.current.setAutoHideEnabled(false));

    expect(result.current.autoHideEnabled).toBe(false);
    expect(
      window.localStorage.getItem(
        "excalidash:editor:drawing-1:autoHideEnabled",
      ),
    ).toBe("0");
  });
});
