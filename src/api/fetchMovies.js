import { BASE_URL } from './api';

export default async function fetchMoviesBySearch(searchQuery, controller) {
  try {
    const response = await fetch(`${BASE_URL}s=${searchQuery}`, {
      signal: controller.signal
    });
    if (!response.ok)
      throw new Error('Something went wrong with fetching movies');
    const data = await response.json();

    return { data, status: 'success' };
  } catch (err) {
    if (err.name === 'AbortError')
      return { data: err.message, status: 'abortError' };
    return { data: err.message, status: 'failed' };
  }
}
