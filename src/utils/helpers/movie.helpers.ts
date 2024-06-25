import { Genre, Movie } from '../../models/movie.models';
import { GenreResponse, MovieResponse } from '../../models/movieResponse.models';

export const createMapOfGenres = (genres: GenreResponse[]): Genre => {
  const map = {} as Genre;

  genres.forEach((g) => (map[g.id] = g.name));

  return map;
};

export const mapMoviesToViewModel = (
  genres: Genre,
  movies: MovieResponse[]
): Movie[] => {
  return movies.map((movie) => {
    const {
      id,
      title,
      overview,
      genre_ids,
      release_date,
      vote_average: rating,
      poster_path: posterUrl,
    } = movie;

    return {
      id,
      title,
      overview,
      releaseDate: new Date(release_date).getFullYear(),
      genre: getGenresByIds(genres, genre_ids),
      rating,
      posterUrl,
    };
  });
};

const getGenresByIds = (genres: Genre, ids: number[]): string => {
  return ids.map((id) => genres[id]).join(", ");
};

// To be used ONLY for Unit Testing
export const exportedForUnitTesting = {
  getGenresByIds,
};
