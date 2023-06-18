import Logo from './Logo';
import ResultsCount from './ResultsCount';
import Search from './Search';

function NavBar({ movies }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <ResultsCount movies={movies} />
    </nav>
  );
}

export default NavBar;
