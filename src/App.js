import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Logo from './components/Logo';
import Search from './components/Search';
import ResultsCount from './components/ResultsCount';
import MovieList from './components/MovieList';
import CollapsedBox from './components/CollapsedBox';
import WatchedSummary from './components/WatchedSummary';
import WatchedList from './components/WatchedList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import SelectedMovie from './components/SelectedMovie';
import fetchMoviesBySearch from './api/fetchMovies';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() =>
    JSON.parse(
      localStorage.getItem('watched') ? localStorage.getItem('watched') : '[]'
    )
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((prevMovies) => [...prevMovies, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((prevMovies) =>
      prevMovies.filter((movie) => movie.imdbID !== id)
    );
  };
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
    handleCloseMovie();
    getMovies();
  }, [query]);

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);
  return (
    <>
      <NavBar>
        <Logo />
        <Search
          query={query}
          handleQueryChange={setQuery}
        />
        <ResultsCount movies={movies} />
      </NavBar>
      <Main>
        <CollapsedBox>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList
              onSelectMovie={handleSelectMovie}
              movies={movies}
            />
          )}
        </CollapsedBox>
        <CollapsedBox>
          {selectedId ? (
            <SelectedMovie
              watched={watched}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </CollapsedBox>
      </Main>
    </>
  );
}
