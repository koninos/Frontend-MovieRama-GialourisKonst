import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mockMovie } from "../../mocks/mockData";
import { MovieItem } from "./MovieItem";

describe("MovieItem component", () => {
  test("should have movie info displayed", async () => {
    render(<MovieItem movie={mockMovie} isLastMovieInPage={true} />);

    expect(screen.getByText("Suicide Squad")).toBeInTheDocument();
    expect(screen.getByText("5.9")).toBeInTheDocument();
    expect(screen.getByText("2016")).toBeInTheDocument();
    expect(screen.getAllByRole("img")[0]).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/original/some_path.jpg"
    );
  });

  test("should display Movie details when is clicked", async () => {
    render(<MovieItem movie={mockMovie} isLastMovieInPage={true} />);

    const movieItem = screen.getByTestId("movie-item");
    userEvent.click(movieItem);

    const movieDetails = screen.getByTestId("movie-details");
    expect(movieDetails).toBeInTheDocument();
  });
});
