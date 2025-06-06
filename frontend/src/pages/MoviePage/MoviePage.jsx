import { useParams } from 'react-router-dom';
import { useFetchMovies } from '../Home/useFetchMoviesFromDatabase';
import { useFetchPeople } from '../Home/useFetchPeopleFromDatabase';
import MovieDetail from '../../components/MovieDetails/MovieDetail';

function MoviePage() {
    const { id } = useParams();
    const { movies } = useFetchMovies();
    const { people } = useFetchPeople();

    if (!movies || movies.length === 0 || !people || people.length === 0) {
        return <p>Chargement...</p>;
    }

    const movie = movies.find(m => m.id === parseInt(id, 10));

    if (!movie) {
        return <p>Film non trouvé.</p>;
    }

    return <MovieDetail movie={movie} people={people} />;
}

export default MoviePage;
