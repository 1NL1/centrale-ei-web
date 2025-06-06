import { useParams } from 'react-router-dom';
import { useFetchMovies } from '../Home/useFetchMoviesFromDatabase';
import { useFetchPeople } from '../Home/useFetchPeopleFromDatabase';
import { useFetchRating } from '../Home/useFetchRatingFromDatabase';
import MovieDetail from '../../components/MovieDetails/MovieDetail';
import { useLocalStorage } from '../Page_authentification/manager_id';

function MoviePage() {
    const { id } = useParams();
    const [userId, setUserId] = useLocalStorage('user_id', null);
    const { movies } = useFetchMovies();
    const { people } = useFetchPeople();
    console.log("rating", userId, id);
    const { rating } = useFetchRating(userId, id);
    console.log("rating final", rating);

    if (!movies || movies.length === 0 || !people || people.length === 0) {
        return <p>Chargement...</p>;
    }

    const movie = movies.find(m => m.id === parseInt(id, 10));

    if (!movie) {
        return <p>Film non trouvé.</p>;
    }

    return <MovieDetail movie={movie} people={people} rating={rating} />;
}

export default MoviePage;
