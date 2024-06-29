import { render, screen } from "@testing-library/react";

import { App } from "./App";

describe("App", () => {
  test("should render its title", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "MovieRama"
    );
  });
});
