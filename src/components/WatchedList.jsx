import React from 'react';
import WatchedMovieItem from './WatchedMovieItem';

function WatchedList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieItem
          key={movie.imdbID}
          movie={movie}
        />
      ))}
    </ul>
  );
}

export default WatchedList;
