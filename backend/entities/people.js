import typeorm from 'typeorm';

const People = new typeorm.EntitySchema({
  name: 'People',
  columns: {
    id: {
      primary: true,
      type: Number,
    },
    name: {
      type: String,
    },
  },
  relations: {
    movies: {
      type: 'many-to-many',
      target: 'Movie',
      inverseSide: 'people',
    },
  },
});

export default People;
