import { render, screen } from "@testing-library/react";

import { MovieShot } from "./MovieShot";

test("loads and displays MovieShot component", async () => {
  render(
    <MovieShot posterUrl="titanic-poster.jpg" rating={8.7} title="Titanic" />
  );

  expect(screen.getByText("Titanic")).toBeInTheDocument();
  expect(screen.getByText("8.7")).toBeInTheDocument();
  expect(screen.getAllByRole("img")[0]).toHaveAttribute(
    "src",
    "https://image.tmdb.org/t/p/w185/titanic-poster.jpg"
  );
});
