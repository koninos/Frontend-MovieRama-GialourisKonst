import { renderHook, waitFor } from "@testing-library/react";

import { mockReviewApiResponse } from "../mocks/mockData";
import { Review } from "../models/movie.models";
import { useMovieReviews } from "./useMovieReviews";

describe("useMovieReviews", () => {
  test("should return a reviews array when called", async () => {
    window.fetch = jest.fn();
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockReviewApiResponse,
    });

    const movieId = 156;
    const expectedReview: Review = {
      id: "1234567",
      author: "Cat Ellington",
      content: "I wasted my time",
      rating: 4,
    };
    const { result } = renderHook(() => useMovieReviews(movieId));

    expect(window.fetch).toHaveBeenCalledTimes(1);

    await waitFor(() => expect(result.current.reviews).toHaveLength(1));
    expect(result.current.reviews[0]).toMatchObject(expectedReview);
  });
});
