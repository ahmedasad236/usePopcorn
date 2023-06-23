import { useEffect, useState } from 'react';
import fetchMoviesBySearch from '../api/fetchMovies';

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function getMovies() {
      setIsLoading(true);
      setError('');

      const response = await fetchMoviesBySearch(query, controller);

      if (response.status === 'failed') setError(response.data);
      else if (response.data.Response === 'False') setError('Movie not found');
      else if (response.status === 'success') setMovies(response.data.Search);

      setIsLoading(false);
    }

    if (query.length < 2) {
      setMovies([]);
      setError('');
      return;
    }
    getMovies();
  }, [query]);

  return { movies, isLoading, error };
};
