import { renderHook, waitFor } from "@testing-library/react";

import { mockMovieTrailersResponse } from "../mocks/mockData";
import { useMovieTrailers } from "./useMovieTrailers";

describe("useMovieTrailers", () => {
  test("should return the first trailer's key when trailer type found among the videos", async () => {
    window.fetch = jest.fn();
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockMovieTrailersResponse,
    });

    const movieId = 156;
    const expectedTrailerKey = "trailerKey";
    const { result } = renderHook(() => useMovieTrailers(movieId));

    expect(window.fetch).toHaveBeenCalledTimes(1);

    await waitFor(() =>
      expect(result.current.trailerKey).toBe(expectedTrailerKey)
    );
  });
});
