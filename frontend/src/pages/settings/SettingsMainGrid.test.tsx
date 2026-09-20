import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SettingsMainGrid } from "./SettingsMainGrid";
import { LocaleProvider } from "../../context/LocaleProvider";

const preference = vi.hoisted(() => ({ language: "en", setLanguage: vi.fn() }));
vi.mock("../../context/PreferencesContext", () => ({
  usePreference: () => [preference.language, preference.setLanguage],
}));

describe("SettingsMainGrid", () => {
  beforeEach(() => {
    preference.language = "en";
    preference.setLanguage.mockClear();
  });
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
    preference.language = "fr-FR";
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

    expect(screen.getByRole("combobox", { name: "Language" })).toHaveValue(
      "fr-FR",
    );
    expect(preference.setLanguage).not.toHaveBeenCalled();
    const input = screen.getByRole("spinbutton", {
      name: "Image compression threshold in MB",
    });
    fireEvent.change(input, { target: { value: "" } });
    expect(input).toHaveValue(null);
    expect(onThresholdChange).not.toHaveBeenCalled();
    fireEvent.blur(input);
    expect(input).toHaveValue(0.25);
    fireEvent.change(input, { target: { value: "2.5" } });
    expect(onThresholdChange).not.toHaveBeenCalled();
    fireEvent.blur(input);
    expect(onThresholdChange).toHaveBeenCalledWith(2.5);
  });
});
