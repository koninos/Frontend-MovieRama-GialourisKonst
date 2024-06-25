import { Genre } from '../../models/movie.models';
import { GenreResponse } from '../../models/movieResponse.models';
import { createMapOfGenres, exportedForUnitTesting } from './movie.helpers';

const { getGenresByIds } = exportedForUnitTesting;

const genres: Genre = {
  1: "Action",
  2: "Comedy",
  3: "Drama",
  4: "Crime",
  5: "Romance",
};

const genresResponse: GenreResponse[] = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Drama" },
  { id: 4, name: "Crime" },
  { id: 5, name: "Romance" },
];

describe("movie helper function", () => {
  describe("getGenresByIds", () => {
    it("should return all genres separated by a comma when multiple ids are provided", () => {
      const expected = "Comedy, Romance";
      expect(getGenresByIds(genres, [2, 5])).toEqual(expected);
    });

    it("should return a single genre when one id is provided", () => {
      const expected = "Crime";
      expect(getGenresByIds(genres, [4])).toEqual(expected);
    });

    it("should return empty string when no ids provided", () => {
      const expected = "";
      expect(getGenresByIds(genres, [])).toEqual(expected);
    });
  });

  describe("createMapOfGenres", () => {
    it("should return a key value pair for each genre", () => {
      const expected = { 2: "Comedy", 5: "Romance" };
      expect(createMapOfGenres(genresResponse)).toMatchObject(expected);
    });
  });
});
