import { renderHook, waitFor } from "@testing-library/react";

import { GenresContext } from "../context/GenresContext";
import { mockGenres, mockSimilarMoviesApiResponse } from "../mocks/mockData";
import { Movie } from "../models/movie.models";
import { useSimilarMovies } from "./useSimilarMovies";

describe("useSimilarMovies", () => {
  test("should return an array of movies", async () => {
    window.fetch = jest.fn();
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockSimilarMoviesApiResponse,
    });

    const movieId = 156;
    const expectedMovie: Movie = {
      id: 106912,
      title: "Darna: The Return",
      genre: "Action",
      posterUrl: "/posterabc.jpg",
      rating: 7,
      releaseYear: 1994,
      overview:
        "Valentina, Darna's snake-haired arch enemy, is trying to take over the Phillipines through subliminal messages on religious TV shows. Darna has her own problems, however, as she has lost her magic pearl and with it the ability to transform into her scantily clad super self. Trapped as her alter-ego, the plucky reporter Narda, she must try to regain the pearl and foil Valentina's plans.",
    };

    const wrapper = ({ children }: any) => (
      <GenresContext.Provider value={mockGenres}>
        {children}
      </GenresContext.Provider>
    );

    const { result } = renderHook(() => useSimilarMovies(movieId), { wrapper });

    expect(window.fetch).toHaveBeenCalledTimes(1);

    await waitFor(() => expect(result.current.similarMovies).toHaveLength(1));
    expect(result.current.similarMovies[0]).toMatchObject(expectedMovie);
  });
});
