import React from 'react';
import { useEffect } from 'react';
import fetchMovieDetails from '../api/fetchMovieDetails';
import { useState } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';

function SelectedMovie({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre
  } = movie;

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  useEffect(
    function () {
      const getMovieData = async () => {
        setIsLoading(true);
        setError('');
        const response = await fetchMovieDetails(selectedId);

        if (response.status === 'success') setMovie(response.data);
        else {
          setError(response.data);
        }
        setIsLoading(false);
      };

      getMovieData();
    },
    [selectedId]
  );

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      imdbRating: Number(imdbRating),
      userRating: userRating,
      title,
      poster,
      year,
      runtime: Number(runtime.split(' ').at(0))
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button
              className="btn-back"
              onClick={onCloseMovie}
            >
              &larr;
            </button>
            <img
              src={poster}
              alt={`poster of ${movie}`}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>You rated this movie with {watchedUserRating} ⭐</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={handleAdd}
                    >
                      Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default SelectedMovie;
