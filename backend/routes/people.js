import express from 'express';
import { appDataSource } from '../datasource.js';
import People from '../entities/people.js';

const router = express.Router();

router.get('/', function (req, res) {
  const peopleRepository = appDataSource.getRepository(People);
  peopleRepository
    .find({
      select: {},
    })
    .then((peopleTable) => {
      console.log(peopleTable);
      res.json(peopleTable);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des personnes :', error);
      res.status(500).json({ error: 'Erreur serveur' });
    });
});

router.get('/:peopleId', function (req, res) {
  const peopleRepository = appDataSource.getRepository(People);
  peopleRepository
    .findOneBy({ id: req.params.peopleId })
    .then(function (people) {
      if (people) {
        res.status(200).json({ message: 'OK' });
      } else {
        res.status(404).json({ message: 'Not Found' });
      }
    });
});

export default router;
