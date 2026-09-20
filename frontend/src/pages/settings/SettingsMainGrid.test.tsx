import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SettingsMainGrid } from "./SettingsMainGrid";
import { LocaleProvider } from "../../context/LocaleProvider";

describe("SettingsMainGrid", () => {
  it("updates the editor auto-hide default", () => {
    const onEditorAutoHideChange = vi.fn();
    render(
      <LocaleProvider>
        <SettingsMainGrid
          exportBackup={vi.fn()}
          theme="light"
          toggleTheme={vi.fn()}
          imageCompression={true}
          toggleImageCompression={vi.fn()}
          imageCompressionThresholdMb={0.25}
          onImageCompressionThresholdChange={vi.fn()}
          editorAutoHide={true}
          onEditorAutoHideChange={onEditorAutoHideChange}
          updateChannel="stable"
          updateInfo={null}
          updateLoading={false}
          updateError={null}
          onUpdateChannelChange={vi.fn()}
          onCheckForUpdates={vi.fn()}
        />
      </LocaleProvider>,
    );

    fireEvent.click(
      screen.getByRole("switch", {
        name: "Toggle editor header auto-hide default",
      }),
    );

    expect(onEditorAutoHideChange).toHaveBeenCalledWith(false);
  });

  it("updates the image compression threshold", () => {
    const onThresholdChange = vi.fn();
    render(
      <LocaleProvider>
        <SettingsMainGrid
          exportBackup={vi.fn()}
          theme="light"
          toggleTheme={vi.fn()}
          imageCompression={true}
          toggleImageCompression={vi.fn()}
          imageCompressionThresholdMb={0.25}
          onImageCompressionThresholdChange={onThresholdChange}
          editorAutoHide={true}
          onEditorAutoHideChange={vi.fn()}
          updateChannel="stable"
          updateInfo={null}
          updateLoading={false}
          updateError={null}
          onUpdateChannelChange={vi.fn()}
          onCheckForUpdates={vi.fn()}
        />
      </LocaleProvider>,
    );

    fireEvent.change(
      screen.getByRole("spinbutton", {
        name: "Image compression threshold in MB",
      }),
      { target: { value: "2.5" } },
    );

    expect(onThresholdChange).toHaveBeenCalledWith(2.5);
  });
});
