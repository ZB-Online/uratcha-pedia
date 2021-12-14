import { MovieDetails } from '../Components/MovieDetails';
import Wrapper from '../Components/Wrapper';
import { eventListeners } from '../eventListeners';
import { getMoviesDetailsById, getPopularMovies } from '../modules/api';

export default function MovieDetailsPage({ $target, movieId }) {
  this.state = {
    movieId,
    movieDetails: {},
  };
  console.log(this.state);

  this.setState = nextState => {
    this.state = nextState;
  };

  this.render = () => {
    $target.innerHTML = Wrapper(MovieDetails);
  };

  this.event = () => {
    eventListeners();
  };

  const fetchMovieDetails = async () => {
    const movieDetailsData = await getMoviesDetailsById(589761);
    console.log(movieDetailsData);
    this.setState({
      movieDetails: movieDetailsData,
    });
  };
  fetchMovieDetails();
}
