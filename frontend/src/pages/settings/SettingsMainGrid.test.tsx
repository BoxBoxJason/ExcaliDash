import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SettingsMainGrid } from "./SettingsMainGrid";

describe("SettingsMainGrid", () => {
  it("updates the editor auto-hide default", () => {
    const onEditorAutoHideChange = vi.fn();
    render(
      <SettingsMainGrid
        exportBackup={vi.fn()}
        theme="light"
        toggleTheme={vi.fn()}
        imageCompression={true}
        toggleImageCompression={vi.fn()}
        editorAutoHide={true}
        onEditorAutoHideChange={onEditorAutoHideChange}
        updateChannel="stable"
        updateInfo={null}
        updateLoading={false}
        updateError={null}
        onUpdateChannelChange={vi.fn()}
        onCheckForUpdates={vi.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole("switch", {
        name: "Toggle editor header auto-hide default",
      }),
    );

    expect(onEditorAutoHideChange).toHaveBeenCalledWith(false);
  });
});
