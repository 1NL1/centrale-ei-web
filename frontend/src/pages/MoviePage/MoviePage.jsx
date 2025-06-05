import { useParams } from 'react-router-dom';
import { useFetchMovies } from '../Home/useFetchMoviesFromDatabase';
import { useFetchPeople } from '../Home/useFetchPeopleFromDatabase';
import MovieDetail from '../../components/MovieDetails/MovieDetail';

function MoviePage() {
    const { id } = useParams();
    const { movies } = useFetchMovies();
    const { people } = useFetchPeople();

    const movie = movies.find(m => m.id === parseInt(id));

    if (!movie || !people) return <p>Chargement...</p>;

    return <MovieDetail movie={movie} people={people} />;
}

export default MoviePage;