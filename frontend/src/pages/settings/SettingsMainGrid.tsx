import { Archive, Eye, EyeOff, Moon, Sun, Zap, ZapOff } from "lucide-react";
import type * as api from "../../api";
import { PlayfulSwitch } from "../../components/PlayfulSwitch";
import { UpdateSettingsCard } from "./UpdateSettingsCard";
import {
  SettingsCard,
  SettingsRow,
  settingsPrimaryButtonClass,
} from "./SettingsRow";

type SettingsMainGridProps = {
  exportBackup: () => void;
  theme: string;
  toggleTheme: () => void;
  imageCompression: boolean;
  toggleImageCompression: () => void;
  imageCompressionThresholdMb: number;
  onImageCompressionThresholdChange: (value: number) => void;
  editorAutoHide: boolean;
  onEditorAutoHideChange: (enabled: boolean) => void;
  updateChannel: api.UpdateChannel;
  updateInfo: api.UpdateInfo | null;
  updateLoading: boolean;
  updateError: string | null;
  onUpdateChannelChange: (channel: api.UpdateChannel) => void;
  onCheckForUpdates: () => void;
};

export const SettingsMainGrid = ({
  exportBackup,
  theme,
  toggleTheme,
  imageCompression,
  toggleImageCompression,
  imageCompressionThresholdMb,
  onImageCompressionThresholdChange,
  editorAutoHide,
  onEditorAutoHideChange,
  updateChannel,
  updateInfo,
  updateLoading,
  updateError,
  onUpdateChannelChange,
  onCheckForUpdates,
}: SettingsMainGridProps) => (
  <SettingsCard>
    <SettingsRow
      icon={theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      tileClassName="border-black bg-amber-400 text-black dark:border-neutral-700 dark:bg-amber-400 dark:text-black"
      title="Appearance"
    >
      <PlayfulSwitch
        checked={theme === "dark"}
        onChange={() => toggleTheme()}
        ariaLabel="Toggle dark mode"
      />
    </SettingsRow>

    <SettingsRow
      icon={editorAutoHide ? <EyeOff size={20} /> : <Eye size={20} />}
      tileClassName="border-black bg-cyan-400 text-black dark:border-neutral-700 dark:bg-cyan-400 dark:text-black"
      title="Auto-hide editor header"
      description={
        editorAutoHide ? "Hide by default" : "Keep visible by default"
      }
    >
      <PlayfulSwitch
        checked={editorAutoHide}
        onChange={onEditorAutoHideChange}
        ariaLabel="Toggle editor header auto-hide default"
      />
    </SettingsRow>

    <SettingsRow
      icon={imageCompression ? <Zap size={20} /> : <ZapOff size={20} />}
      tileClassName="border-black bg-blue-400 text-black dark:border-neutral-700 dark:bg-blue-400 dark:text-black"
      title="Optimized images"
      description={
        imageCompression
          ? `Compress images over ${imageCompressionThresholdMb} MB`
          : "Original quality"
      }
    >
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-1 text-xs font-bold">
          <span>MB</span>
          <input
            aria-label="Image compression threshold in MB"
            type="number"
            min="0.1"
            max="100"
            step="0.1"
            value={imageCompressionThresholdMb}
            disabled={!imageCompression}
            onChange={(event) =>
              onImageCompressionThresholdChange(event.target.valueAsNumber)
            }
            className="w-16 rounded border-2 border-black bg-white px-1.5 py-1 text-black disabled:opacity-50 dark:border-neutral-600"
          />
        </label>
        <PlayfulSwitch
          checked={imageCompression}
          onChange={() => toggleImageCompression()}
          ariaLabel="Toggle image optimization"
        />
      </div>
    </SettingsRow>

    <SettingsRow
      icon={<Archive size={20} />}
      tileClassName="border-black bg-indigo-400 text-black dark:border-neutral-700 dark:bg-indigo-400 dark:text-black"
      title="Export backup"
    >
      <button onClick={exportBackup} className={settingsPrimaryButtonClass}>
        Export
      </button>
    </SettingsRow>

    <UpdateSettingsCard
      updateChannel={updateChannel}
      updateInfo={updateInfo}
      updateLoading={updateLoading}
      updateError={updateError}
      onChannelChange={onUpdateChannelChange}
      onCheckForUpdates={onCheckForUpdates}
    />
  </SettingsCard>
);
