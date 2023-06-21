import { BASE_URL } from './api';

export default async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(`${BASE_URL}i=${movieId}`);
    if (!response.ok)
      throw new Error('Something went wrong with fetching the movie');
    const data = await response.json();

    return { data, status: 'success' };
  } catch (err) {
    console.log(err.message);
    return { data: err.message, status: 'failed' };
  }
}
