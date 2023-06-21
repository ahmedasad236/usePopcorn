import { BASE_URL } from './api';

export default async function fetchMoviesBySearch(searchQuery) {
  try {
    const response = await fetch(`${BASE_URL}s=${searchQuery}`);
    if (!response.ok)
      throw new Error('Something went wrong with fetching movies');
    const data = await response.json();

    return { data, status: 'success' };
  } catch (err) {
    console.log(err.message);
    return { data: err.message, status: 'failed' };
  }
}
