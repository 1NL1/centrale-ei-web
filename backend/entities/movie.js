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
    director_id: { type: Number, nullable: true },
    writer_id: { type: Number, nullable: true },
    actor1_id: { type: Number, nullable: true },
    actor2_id: { type: Number, nullable: true },
    actor3_id: { type: Number, nullable: true },
    actor4_id: { type: Number, nullable: true },
    actor5_id: { type: Number, nullable: true },
  },
  relations: {
    people: {
      type: 'many-to-many',
      target: 'People',
      inverseSide: 'movies',
    },
  },
});

export default Movie;
