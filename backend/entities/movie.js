import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    title: {
      type: String,
      unique: false,
    },
    release_date: { type: String },
    genre_id: { type: 'simple-array' },
    vote_average: { type: Number },
    vote_count: { type: Number },
  },
});

export default Movie;
