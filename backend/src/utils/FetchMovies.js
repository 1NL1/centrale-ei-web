import axios from 'axios';

export async function fetchMovies(page = 1) {
  try {
    const response = await axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);

    return [];
  }
}
