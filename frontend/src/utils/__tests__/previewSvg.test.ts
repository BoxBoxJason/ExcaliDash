import { describe, expect, it } from "vitest";
import { normalizePreviewSvg, previewHasEmbeddedImages } from "../previewSvg";

describe("normalizePreviewSvg", () => {
  it("makes only the default canvas transparent, preserving white artwork", () => {
    const result = normalizePreviewSvg(
      '<svg viewBox="0 0 100 80"><defs/><rect x="0" y="0" width="100" height="80" fill="#ffffff"/><g><rect width="30" height="20" fill="white"/></g></svg>',
    )!;
    const doc = new DOMParser().parseFromString(result, "image/svg+xml");
    expect(doc.querySelector("svg > rect")?.getAttribute("fill")).toBe(
      "transparent",
    );
    expect(doc.querySelector("g > rect")?.getAttribute("fill")).toBe("white");
  });

  it.each(["#000000", "#ffec99"])("preserves a custom %s canvas", (color) => {
    expect(
      normalizePreviewSvg(
        `<svg viewBox="0 0 100 80"><rect x="0" y="0" width="100" height="80" fill="${color}"/></svg>`,
      ),
    ).toContain(`fill="${color}"`);
  });
  it("removes legacy dark export filters without erasing white shapes", () => {
    const result = normalizePreviewSvg(
      '<svg filter="invert(93%) hue-rotate(180deg)"><rect fill="white"/><use filter="invert(100%) hue-rotate(180deg) saturate(1.25)"/></svg>',
    );
    expect(result).not.toContain("filter=");
    expect(result).toContain('fill="white"');
    expect(normalizePreviewSvg('<svg filter="url(#custom)"/>')).toContain(
      'filter="url(#custom)"',
    );
  });

  it("counter-filters raster uses but lets embedded SVGs follow the scene theme", () => {
    const result = normalizePreviewSvg(
      '<svg><defs><symbol id="photo"><image href="data:image/png;base64,AAAA"/></symbol><symbol id="vector"><image href="data:image/svg+xml;base64,AAAA"/></symbol></defs><use href="#photo"/><use href="#vector"/></svg>',
    )!;
    const doc = new DOMParser().parseFromString(result, "image/svg+xml");
    expect(
      doc
        .querySelector('use[href="#photo"]')
        ?.getAttribute("data-preview-raster"),
    ).toBe("true");
    expect(
      doc
        .querySelector('use[href="#vector"]')
        ?.hasAttribute("data-preview-raster"),
    ).toBe(false);
    expect(
      doc.querySelector("defs image")?.hasAttribute("data-preview-raster"),
    ).toBe(false);
    expect(normalizePreviewSvg(result)).toBe(result);
  });

  it("adds viewBox from background rect when missing", () => {
    const raw = [
      '<svg width="1456.7890625" height="1213.81640625">',
      '<rect x="0" y="0" width="728.39453125" height="606.908203125" fill="#fff"></rect>',
      '<path d="M0 0 L20 20"></path>',
      "</svg>",
    ].join("");

    const normalized = normalizePreviewSvg(raw);

    expect(normalized).toContain('viewBox="0 0 728.39453125 606.908203125"');
    expect(normalized).toContain('preserveAspectRatio="xMidYMid meet"');
  });

  it("leaves existing viewBox unchanged", () => {
    const raw = '<svg viewBox="0 0 100 50" width="200" height="100"></svg>';
    const normalized = normalizePreviewSvg(raw);

    expect(normalized).toContain('viewBox="0 0 100 50"');
  });

  it("detects embedded image tags", () => {
    const raw = '<svg><image href="data:image/png;base64,AAAA"></image></svg>';
    expect(previewHasEmbeddedImages(raw)).toBe(true);
    expect(previewHasEmbeddedImages("<svg><rect/></svg>")).toBe(false);
  });

  it("repairs flattened image previews that are hidden by white canvas rect", () => {
    const raw = [
      '<svg viewBox="0 0 500 700" width="1000" height="1400">',
      '<image width="100%" height="100%" href="data:image/png;base64,AAAA"></image>',
      "<defs></defs>",
      '<rect x="0" y="0" width="500" height="700" fill="#ffffff"></rect>',
      "</svg>",
    ].join("");

    const normalized = normalizePreviewSvg(raw);

    expect(normalized).toContain('fill="transparent"');
  });
});
