import { describe, expect, it } from "vitest";
import { resolveLocale, translate } from "../i18n";

describe("locale selection", () => {
  it("selects Simplified Chinese for Chinese browser locales", () => {
    expect(resolveLocale("zh-TW")).toBe("zh-CN");
    expect(resolveLocale("zh-CN")).toBe("zh-CN");
  });

  it("falls back to English for unsupported locales", () => {
    expect(resolveLocale("fr-FR")).toBe("en");
    expect(translate("en", "sidebar.settings")).toBe("Settings");
    expect(translate("zh-CN", "sidebar.settings")).toBe("设置");
  });
});
