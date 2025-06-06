import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';

const router = express.Router();

router.get('/', function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  movieRepository
    .find({
      select: {},
    })
    .then((movieTable) => {
      console.log(movieTable);
      res.json(movieTable);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des films :', error);
      res.status(500).json({ error: 'Erreur serveur' });
    });
});

router.post('/new', function (req, res) {
  console.log(req.body);
  const movieRepository = appDataSource.getRepository(Movie);
  const newMovie = movieRepository.create({
    title: req.body.title,
    release_date: req.body.release_date,
    id: req.body.id,
    overview: req.body.overview,
    popularity: req.body.popularity,
    poster_path: req.body.poster_path,
    original_language: req.body.original_language,
    genre_ids: req.body.genre_ids,
  });
  movieRepository
    .insert(newMovie)
    .then(function (savedMovie) {
      res.status(201).json({
        message: 'Movie successfully created',
        id: savedMovie.id,
      });
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while creating the movie' });
    });
});

router.get('/:movieId', function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);

  movieRepository
    .findOneBy({ id: req.params.movieId })
    .then(function (movie) {
      if (movie) {
        res.status(200).json(movie); // Retourne les informations du film
      } else {
        res.status(404).json({ message: 'Not Found' });
      }
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.delete('/:movieId', function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  movieRepository.findOneBy({ id: req.params.movieId }).then(function (movie) {
    if (movie) {
      movieRepository.delete({ id: req.params.movieId });
      res.status(200).json({ message: 'Movie successfully deleted' });
    } else {
      res.status(404).json({ message: 'Not Found' });
    }
  });
});

export default router;
