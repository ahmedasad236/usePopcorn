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
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], 'watched');

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((prevMovies) => [...prevMovies, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((prevMovies) =>
      prevMovies.filter((movie) => movie.imdbID !== id)
    );
  }

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
