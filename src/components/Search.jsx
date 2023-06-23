import { useEffect, useRef } from 'react';

function Search({ query, handleQueryChange }) {
  const inputEl = useRef(null);
  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === 'Enter') {
        inputEl.current.focus();
        handleQueryChange('');
      }
    }

    document.addEventListener('keydown', callback);

    return () => document.removeEventListener('keydown', callback);
  }, [handleQueryChange]);
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
