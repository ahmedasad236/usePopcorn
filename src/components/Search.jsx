function Search({ query, handleQueryChange }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => handleQueryChange(e.target.value)}
    />
  );
}

export default Search;
