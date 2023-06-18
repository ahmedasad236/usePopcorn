import { useState } from 'react';
import CollapseButton from './CollapseButton';
import MovieList from './MovieList';

function MoviesBox({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <CollapseButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {isOpen && children}
    </div>
  );
}

export default MoviesBox;
