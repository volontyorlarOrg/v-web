import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SmoothScroll } from "@/components/marketing/smooth-scroll";

const { destroy, LenisMock, resize } = vi.hoisted(() => ({
  destroy: vi.fn(),
  LenisMock: vi.fn(),
  resize: vi.fn(),
}));

vi.mock("lenis", () => ({
  default: function Lenis() {
    LenisMock();
    return { destroy, resize };
  },
}));

class ResizeObserverMock {
  static instances: ResizeObserverMock[] = [];

  disconnect = vi.fn();
  observe = vi.fn();

  constructor(readonly callback: ResizeObserverCallback) {
    ResizeObserverMock.instances.push(this);
  }
}

describe("SmoothScroll", () => {
  afterEach(() => {
    document.documentElement.dataset.motion = "enabled";
    ResizeObserverMock.instances = [];
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it("refreshes Lenis when post-hydration content changes the document height", () => {
    vi.stubGlobal("ResizeObserver", ResizeObserverMock);
    document.documentElement.dataset.motion = "enabled";

    const { unmount } = render(<SmoothScroll />);
    const observer = ResizeObserverMock.instances[0];

    expect(observer).toBeDefined();
    expect(observer?.observe).toHaveBeenCalledWith(document.body);

    observer?.callback([], observer as unknown as ResizeObserver);
    expect(resize).toHaveBeenCalledOnce();

    unmount();
    expect(observer?.disconnect).toHaveBeenCalledOnce();
    expect(destroy).toHaveBeenCalledOnce();
  });
});
