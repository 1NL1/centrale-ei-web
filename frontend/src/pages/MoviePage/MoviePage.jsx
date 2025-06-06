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

    const movie = movies.find(m => m.id === parseInt(id));

    if (!movie || !people) return <p>Chargement...</p>;

    return <MovieDetail movie={movie} people={people} rating={rating} />;
}

export default MoviePage;