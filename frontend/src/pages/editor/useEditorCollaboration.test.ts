import { describe, expect, it, vi } from "vitest";
import { bindRoomJoin } from "./useEditorCollaboration";

describe("bindRoomJoin", () => {
  it("rejoins the drawing room after every socket connection", () => {
    const listeners = new Map<string, () => void>();
    const emit = vi.fn();
    const socket = {
      connected: false,
      emit,
      on: vi.fn((event: string, listener: () => void) => {
        listeners.set(event, listener);
      }),
      off: vi.fn((event: string, listener: () => void) => {
        if (listeners.get(event) === listener) listeners.delete(event);
      }),
    };
    const user = {
      id: "user-1",
      name: "Ada",
      initials: "A",
      color: "#123456",
    };
    const onJoined = vi.fn();

    const detach = bindRoomJoin(socket as any, "drawing-1", user, onJoined);

    expect(emit).not.toHaveBeenCalled();
    listeners.get("connect")?.();
    listeners.get("connect")?.();
    expect(emit).toHaveBeenCalledTimes(2);
    expect(emit).toHaveBeenLastCalledWith(
      "join-room",
      { drawingId: "drawing-1", user },
      onJoined,
    );

    detach();
    expect(listeners.has("connect")).toBe(false);
  });

  it("joins immediately when the socket is already connected", () => {
    const socket = {
      connected: true,
      emit: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
    };

    bindRoomJoin(socket as any, "drawing-1", {} as any, vi.fn());

    expect(socket.emit).toHaveBeenCalledOnce();
  });
});
