import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});

router.post('/new', function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  const newUser = userRepository.create({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    dict: req.body.password,
  });

  userRepository
    .save(newUser)
    .then(function (savedUser) {
      res.status(201).json({
        message: 'User successfully created',
        id: savedUser.id,
      });
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the user' });
      }
    });
});

router.delete('/:userId', function (req, res) {
  appDataSource
    .getRepository(User)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: 'User successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the user' });
    });
});

router.get('/email/:email', function (req, res) {
  const userRepository = appDataSource.getRepository(User);

  userRepository
    .findOneBy({ email: req.params.email })
    .then(function (user) {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
    })
    .catch(function (error) {
      console.error('Erreur lors de la recherche par email :', error);
      res.status(500).json({ message: 'Erreur serveur' });
    });
});

export default router;
