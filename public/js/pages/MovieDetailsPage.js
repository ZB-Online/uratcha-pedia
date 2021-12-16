import { MovieDetails } from '../Components/MovieDetails';
import Wrapper from '../Components/Wrapper';
import { eventListeners } from '../eventListeners';
import { movieDetailCommentCarousel } from '../utils/carousel.js';
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
        components: [
          {
            component: MovieDetails,
            props: {
              initialState: { movieDetails: this.state.movieDetails, reviewsByMovieId: this.state.reviewsByMovieId },
            },
          },
        ],
      }).render()
    );
  };

  this.bindEvents = () => {
    eventListeners();
    // 추가
    movieDetailCommentCarousel(
      document.querySelector('.detail-container_comment-container'),
      this.state.reviewsByMovieId
    );
  };

  const fetchMovieDetails = async () => {
    try {
      const movieDetailsData = await fetch.get('/api/movies/589761');
      this.setState({ ...this.state, movieDetails: movieDetailsData });
    } catch (e) {
      console.error('movie api not fetched: ', e);
    }
  };

  const fetchReviewsByMovieId = async () => {
    try {
      const data = await fetch.get('/api/reviews/1');
      const reviewsByMovieId = data?.resData;
      this.setState({ ...this.state, reviewsByMovieId });
    } catch (e) {
      console.error('reviews not fetched: ', e);
    }
  };

  fetchMovieDetails();
  fetchReviewsByMovieId();
}
