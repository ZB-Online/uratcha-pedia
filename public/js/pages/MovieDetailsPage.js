import { MovieDetails } from '../Components/MovieDetails';
import Wrapper from '../Components/Wrapper';
import { eventListeners } from '../eventListeners';
import { movieDetailCommentCarousel } from '../utils/carousel.js';
import { bindMovieCommentCarouselEvents } from '../utils/carousel';
import fetch from '../utils/fetch';
import { routeChange } from '../router';

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
    const { movieDetails, reviewsByMovieId, starsData, averageStarsData, similarWorksData } = this.state;

    $MovieDetailsPage.appendChild(
      new Wrapper({
        $target: $MovieDetailsPage,
        initialState: this.state,
        components: [
          {
            component: MovieDetails,
            props: {
              initialState: {
                movieDetails: movieDetails,
                reviewsByMovieId: reviewsByMovieId,
                starsData: starsData,
                averageStarsData: averageStarsData,
                similarWorksData: similarWorksData,
              },
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

    $MovieDetailsPage.addEventListener('click', ({ target }) => {
      if (!target.matches('.similar-works-container *')) return;

      const movieId = target.closest('li').dataset.movieId;
      routeChange(`/movies/${movieId}`);
    });
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
      const { resData } = await fetch.get(`/api/stars/movies/${movieId}`);
      return resData;
    } catch (e) {
      console.error('starsByMovieId not fetched: ', e);
    }
  };

  const fetchAverageStarsByMovieId = async movieId => {
    try {
      const { resData } = await fetch.get(`/api/stars/${movieId}`);
      return resData;
    } catch (e) {
      console.error('averageStarsByMovieId not fetched: ', e);
    }
  };

  const fetchSimilarWorksByGenre = async genre => {
    try {
      const { resData } = await fetch.get(`/api/movies/genre/${genre}`);
      return resData;
    } catch (e) {
      console.error('averageStarsByMovieId not fetched: ', e);
    }
  };

  const fetchMovieDetailData = async () => {
    const movieDetailsData = await fetchMovieDetails(this.state.movieId);
    const reviewsByMovieId = await fetchReviewsByMovieId(this.state.movieId);
    // & : movieId 변경 필요 1~20 들어옴
    const starsData = await fetchStarsByMovieId(843241);
    // & : 평균 별점 가져오기
    const averageStarsData = await fetchAverageStarsByMovieId(843241);
    // & : 비슷한 작품 가져오기
    const similarWorksData = await fetchSimilarWorksByGenre(movieDetailsData.genres[0]);

    this.setState({
      ...this.state,
      movieDetails: movieDetailsData,
      reviewsByMovieId: reviewsByMovieId,
      starsData: starsData,
      averageStarsData: averageStarsData,
      similarWorksData: similarWorksData,
    });
  };

  fetchMovieDetailData();
}
