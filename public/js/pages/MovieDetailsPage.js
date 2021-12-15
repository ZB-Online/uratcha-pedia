import { MovieDetails } from '../Components/MovieDetails';
import Wrapper from '../Components/Wrapper';
import { eventListeners } from '../eventListeners';
import { getMoviesDetailsById, getPopularMovies } from '../modules/api';
import fetch from '../utils/fetch';

export default function MovieDetailsPage({ $target, initialState }) {
  const $MovieDetailsPage = document.createElement('div');
  $MovieDetailsPage.classList.add('MovieDetailsPage');
  $MovieDetailsPage.classList.add('movie-detail-page');
  $target.appendChild($MovieDetailsPage);

  this.state = initialState;

  this.setState = newState => {
    this.state = newState;
    this.render();
    this.bindEvents();
  };

  this.render = () => {
    $MovieDetailsPage.appendChild(
      new Wrapper({
        $target: $MovieDetailsPage,
        initialState: this.state,
        components: [{ component: MovieDetails, props: { initialState: { movieDetails: this.state.movieDetails } } }],
      }).render()
    );
  };

  this.bindEvents = () => {
    eventListeners();
    // 추가
  };

  const fetchMovieDetails = async () => {
    try {
      const movieDetailsData = await fetch.get('/api/movies/589761');
      this.setState({ ...this.state, movieDetails: movieDetailsData });
    } catch (e) {
      console.error('movie api not fetched: ', e);
    }
  };

  fetchMovieDetails();
}
