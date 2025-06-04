import axios from 'axios';

export async function fetchCrew(movie_id) {
  try {
    const result = await axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`,
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
      },
    });

    return filterResult(result.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);

    return null;
  }
}

function filterResult(result) {
  const safeFind = (array, predicate) => {
    if (!Array.isArray(array)) {
      return null;
    }
    const found = array.find(predicate);

    return found ? found.id : null;
  };

  return {
    actor1_id: safeFind(result.cast, (person) => person.order === 0),
    actor2_id: safeFind(result.cast, (person) => person.order === 1),
    actor3_id: safeFind(result.cast, (person) => person.order === 2),
    actor4_id: safeFind(result.cast, (person) => person.order === 3),
    actor5_id: safeFind(result.cast, (person) => person.order === 4),
    director_id: safeFind(result.crew, (person) => person.job === 'Director'),
    writer_id: safeFind(result.crew, (person) => person.job === 'Writer'),
  };
}
