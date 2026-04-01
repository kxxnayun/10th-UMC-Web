import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie, MovieResponse } from "../types/movie";
import MovieItem from "../components/MovieItem";
import LoadingSpinner from "../components/LoadingSpinner";
import NotFound from "./NotFound";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const TMBD_TOKEN = import.meta.env.VITE_TMDB_KEY;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchMovies = async () => {
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${TMBD_TOKEN}`,
            },
          },
        );

        setMovies(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <NotFound />;
  }

  console.log();

  return (
    <div className="p-10">
      <div className="grid gap-4 grid-cols-6">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
