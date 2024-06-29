import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Rating } from "./Rating";

test("loads and displays rating when there is a value", async () => {
  render(<Rating value={8.5} />);

  expect(screen.getByRole("paragraph")).toHaveTextContent("8.5");
});
