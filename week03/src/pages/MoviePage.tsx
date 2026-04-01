import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie, MovieResponse } from "../types/movie";
import MovieItem from "../components/MovieItem";
import LoadingSpinner from "../components/LoadingSpinner";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const TMBD_TOKEN = import.meta.env.VITE_TMDB_KEY;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
        {
          headers: {
            Authorization: `Bearer ${TMBD_TOKEN}`,
          },
        },
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
