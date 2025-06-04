import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
    },
    title: {
      type: String,
      unique: false,
    },
    release_date: { type: String },
    overview: { type: String },
    poster_path: { type: String },
    original_language: { type: String },
    popularity: { type: String },
    genre_ids: { type: String },
  },
});

export default Movie;
