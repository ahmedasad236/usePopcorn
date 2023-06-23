import { useRef } from 'react';
import { useKey } from '../hooks/useKey';

function Search({ query, handleQueryChange }) {
  const inputEl = useRef(null);

  useKey('Enter', function () {
    if (document.activeElement === inputEl.current) return;

    inputEl.current.focus();
    handleQueryChange('');
  });

  return (
    <input
      ref={inputEl}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => handleQueryChange(e.target.value)}
    />
  );
}

export default Search;
