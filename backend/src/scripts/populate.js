import { fetchMovies } from '../utils/fetchMovies.js';
import { fetchCrew } from '../utils/FetchCrew.js';
import { fetchPerson } from '../utils/FetchPerson.js';

import Movie from '../../entities/movie.jsx';
import People from '../../entities/people.js';
import { appDataSource } from '../../datasource.js';

const peopleCache = new Map();

async function getOrCreatePerson(person, peopleRepository) {
  if (!person?.id || !person?.name) {
    return null;
  }

  // Vérifie d'abord dans le cache en mémoire
  if (peopleCache.has(person.id)) {
    return peopleCache.get(person.id);
  }

  // Sinon, cherche dans la base
  let existing = await peopleRepository.findOneBy({ id: person.id });

  if (!existing) {
    existing = peopleRepository.create({
      id: person.id,
      name: person.name,
    });

    try {
      await peopleRepository.save(existing);
      console.log(`Personne ajoutée : ${person.name}`);
    } catch (error) {
      console.error(`Erreur à l'ajout de ${person.name}:`, error);

      return null;
    }
  }

  // Ajoute au cache
  peopleCache.set(person.id, existing);

  return existing;
}
function populateDatabase(totalPage = 50) {
  appDataSource
    .initialize()
    .then(() => {
      const movieRepository = appDataSource.getRepository(Movie);
      const peopleRepository = appDataSource.getRepository(People);
      let page = 1;

      function processNextPage() {
        if (page > totalPage) {
          return Promise.resolve(); // Toutes les pages ont été traitées
        }

        return fetchMovies(page)
          .then((movies) => {
            const savePromises = movies.map((movie) => {
              return movieRepository
                .findOneBy({ id: movie.id })
                .then(async (exists) => {
                  if (!exists) {
                    const movieCrew = await fetchCrew(movie.id);
                    console.log('creating new movie');
                    const people = [];
                    for (const role of [
                      'director_id',
                      'writer_id',
                      'actor1_id',
                      'actor2_id',
                      'actor3_id',
                      'actor4_id',
                      'actor5_id',
                    ]) {
                      const id = movieCrew[role];
                      if (id) {
                        const personDetails = await fetchPerson(id);
                        const personEntity = await getOrCreatePerson(
                          personDetails,
                          peopleRepository
                        );
                        if (personEntity) {
                          people.push(personEntity);
                        }
                      }
                    }
                    const newMovie = movieRepository.create({
                      id: movie.id,
                      title: movie.title,
                      release_date: movie.release_date,
                      overview: movie.overview,
                      poster_path: movie.poster_path,
                      original_language: movie.original_language,
                      popularity: String(movie.popularity),
                      genre_ids: JSON.stringify(movie.genre_ids),
                      director_id: movieCrew.director_id,
                      writer_id: movieCrew.writer_id,
                      actor1_id: movieCrew.actor1_id,
                      actor2_id: movieCrew.actor2_id,
                      actor3_id: movieCrew.actor3_id,
                      actor4_id: movieCrew.actor4_id,
                      actor5_id: movieCrew.actor5_id,
                      person: people,
                    });

                    return movieRepository.save(newMovie).then(() => {
                      console.log(`Film ajouté : ${movie.title}`);
                    });
                  } else {
                    console.log(`Film déjà existant : ${movie.title}`);

                    return Promise.resolve();
                  }
                });
            });

            return Promise.all(savePromises);
          })
          .then(() => {
            page++;

            return processNextPage(); // Traitement de la page suivante
          });
      }/

      return processNextPage();
    })
    .then(() => {
      return appDataSource.destroy(); // Ferme proprement la connexion à la fin
    })
    .catch((err) => {
      console.error('Erreur pendant le peuplement de la base :', err);

      return appDataSource.destroy(); // Tente quand même de fermer la connexion
    });
}

populateDatabase();
