import { fetchMovies } from '../utils/fetchMovies.js';
import Movie from '../../entities/movie.js';
import { appDataSource } from '../../datasource.js';

function populateDatabase(totalPage = 10) {
  appDataSource
    .initialize()
    .then(() => {
      const movieRepository = appDataSource.getRepository(Movie);
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
                .then((exists) => {
                  if (!exists) {
                    const newMovie = movieRepository.create({
                      id: movie.id,
                      title: movie.title,
                      release_date: movie.release_date,
                      overview: movie.overview,
                      poster_path: movie.poster_path,
                      original_language: movie.original_language,
                      popularity: String(movie.popularity),
                      genre_ids: JSON.stringify(movie.genre_ids),
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
      }

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
