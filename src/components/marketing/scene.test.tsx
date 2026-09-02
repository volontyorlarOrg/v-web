import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Scene, SplitWords } from "@/components/marketing/scene";

describe("SplitWords", () => {
  it("keeps the heading readable as one string", () => {
    render(
      <h2>
        <SplitWords text="Where the opportunities come from" />
      </h2>,
    );
    expect(
      screen.getByRole("heading", { name: "Where the opportunities come from" }),
    ).toBeInTheDocument();
  });

  it("gives every word its own masked slot and stagger index", () => {
    const { container } = render(
      <p>
        <SplitWords text="Fargʻona va Toshkent" />
      </p>,
    );
    const words = container.querySelectorAll<HTMLElement>(".scene-word");
    expect(words).toHaveLength(3);
    expect(words[0].textContent).toBe("Fargʻona");
    expect(words[2].style.getPropertyValue("--i")).toBe("2");
  });
});

describe("Scene", () => {
  it("marks an observation boundary that starts un-entered", () => {
    const { container } = render(
      <Scene as="ul" variant="stagger">
        <li>one</li>
      </Scene>,
    );
    const scene = container.querySelector("ul");
    expect(scene).toHaveAttribute("data-scene");
    expect(scene).not.toHaveAttribute("data-in");
    expect(scene).toHaveClass("scene-stagger");
  });

  it("waits for full visibility only when asked", () => {
    const { container } = render(
      <>
        <Scene>
          <span>enter</span>
        </Scene>
        <Scene trigger="full">
          <span>full</span>
        </Scene>
      </>,
    );
    const [enter, full] = container.querySelectorAll("[data-scene]");
    expect(enter).toHaveAttribute("data-scene", "enter");
    expect(full).toHaveAttribute("data-scene", "full");
  });

  it("rises as a block by default and passes other attributes through", () => {
    const { container } = render(
      <Scene role="list" className="mt-4">
        <span>copy</span>
      </Scene>,
    );
    const scene = container.querySelector("[data-scene]");
    expect(scene).toHaveClass("scene-rise", "mt-4");
    expect(scene).toHaveAttribute("role", "list");
  });
});
