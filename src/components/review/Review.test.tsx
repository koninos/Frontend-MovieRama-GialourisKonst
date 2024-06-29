import { render, screen } from "@testing-library/react";

import { Review } from "./Review";

test("loads and displays Review component", async () => {
  render(<Review author="James" content="Very good movie" rating={9} />);

  const [author, rating, content] = screen.getAllByRole("paragraph");

  expect(author).toHaveTextContent("James");
  expect(rating).toHaveTextContent("9");
  expect(content).toHaveTextContent("Very good movie");
});
