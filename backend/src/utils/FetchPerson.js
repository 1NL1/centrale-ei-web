import axios from 'axios';

export async function fetchPerson(id) {
  try {
    const response = await axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/person/${id}?language=en-US`,
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la personne:', error);

    return [];
  }
}
