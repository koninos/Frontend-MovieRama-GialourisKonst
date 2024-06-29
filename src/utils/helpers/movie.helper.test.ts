import {
  mockGenres,
  mockGenresResponse,
  mockMovieResponse,
} from "../../mocks/mockData";
import { Genre, Movie } from "../../models/movie.models";
import {
  createMapOfGenres,
  exportedForUnitTesting,
  mapMoviesToViewModel,
} from "./movie.helpers";

const { getGenresByIds } = exportedForUnitTesting;

describe("movie helper function", () => {
  describe("getGenresByIds", () => {
    it("should return all genres separated by a comma when multiple ids are provided", () => {
      const expected = "Comedy, Romance";
      expect(getGenresByIds(mockGenres, [2, 5])).toEqual(expected);
    });

    it("should return a single genre when one id is provided", () => {
      const expected = "Crime";
      expect(getGenresByIds(mockGenres, [4])).toEqual(expected);
    });

    it("should return empty string when no ids provided", () => {
      const expected = "";
      expect(getGenresByIds(mockGenres, [])).toEqual(expected);
    });
  });

  describe("createMapOfGenres", () => {
    it("should return a key value pair for each genre", () => {
      const expected: Genre = { 2: "Comedy", 5: "Romance" };
      expect(createMapOfGenres(mockGenresResponse)).toMatchObject(expected);
    });
  });

  describe("mapMoviesToViewModel", () => {
    it("should perform proper mapping", () => {
      const expected: Movie = {
        id: 297761,
        title: "Suicide Squad",
        overview: "From DC Comics comes the Suicide Squad.",
        releaseYear: 2016,
        genre: "Action, Crime",
        rating: 5.91,
        posterUrl: "/some_path.jpg",
      };

      expect(
        mapMoviesToViewModel(mockGenres, [mockMovieResponse])[0]
      ).toMatchObject(expected);
    });
  });
});
