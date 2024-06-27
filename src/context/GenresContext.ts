import { createContext } from "react";

import { Genre } from "../models/movie.models";

export const GenresContext = createContext<Genre>({});
