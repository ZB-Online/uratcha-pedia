import { MovieDetails } from '../Components/MovieDetails';
import Wrapper from '../Components/Wrapper';
import { eventListeners } from '../eventListeners';
import { movieDetailCommentCarousel } from '../utils/carousel.js';
import { bindMovieCommentCarouselEvents } from '../utils/carousel';
import fetch from '../utils/fetch';

export default function MovieDetailsPage({ $target, initialState }) {
  const $MovieDetailsPage = document.createElement('div');
  $MovieDetailsPage.classList.add('MovieDetailsPage');
  $MovieDetailsPage.classList.add('movie-detail-page');
  $target.appendChild($MovieDetailsPage);

  this.state = {
    movieId: initialState,
  };

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

    bindMovieCommentCarouselEvents(
      document.querySelector('.detail-container_comment-container'),
      this.state.reviewsByMovieId
    );
    // 추가
  };

  const fetchMovieDetails = async movieId => {
    try {
      const data = await fetch.get(`/api/movies/${movieId}`);
      const movieDetailsData = await data?.resData;
      return movieDetailsData;
    } catch (e) {
      console.error('movie api not fetched: ', e);
    }
  };

  const fetchReviewsByMovieId = async movieId => {
    try {
      const data = await fetch.get(`/api/reviews/${movieId}`);
      const reviewsByMovieId = await data?.resData;
      return reviewsByMovieId;
    } catch (e) {
      console.error('reviews not fetched: ', e);
    }
  };

  const fetchStarsByMovieId = async movieId => {
    try {
      const data = await fetch.get(`/api/stars/movies/${movieId}`);
      console.log('data', data);
      return await data.resData;
      // const starsByMovieId = await data?.resData;
      // return starsByMovieId;
    } catch (e) {
      console.error('stars not fetched: ', e);
    }
  };

  const fetchMovieDetailData = async () => {
    const movieDetailsData = await fetchMovieDetails(this.state.movieId);
    const reviewsByMovieId = await fetchReviewsByMovieId(this.state.movieId);
    const starsData = await fetchStarsByMovieId(this.state.movieId);
    console.log('starsData', starsData);
    this.setState({ ...this.state, movieDetails: movieDetailsData, reviewsByMovieId: reviewsByMovieId });
  };

  fetchMovieDetailData();
}
