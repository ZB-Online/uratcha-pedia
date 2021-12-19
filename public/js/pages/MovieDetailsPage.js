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

  // 수정함!
  // this.state = {
  //   movieId: initialState,
  //   user: { email: 'test1@test.com', username: '테스트계정1' },
  //   userScore: { id: 1, userEmail: 'test1@test.com', movieId: 1, score: 5 },
  // };
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
    // 추가
    movieDetailCommentCarousel(
      document.querySelector('.detail-container_comment-container'),
      this.state.reviewsByMovieId
    );
    const starRating = document.querySelector('.star-rating');
    console.log(starRating);
    console.log('----------------');
    starRating.addEventListener('click', async e => {
      e.preventDefault();
      console.log(e.target);
      const score = e.target.previousElementSibling.value;
      // console.log(e.target.previousElementSibling.value)
      try {
        const res = await fetch.post('/api/stars', {
          id: 6,
          userEmail: 'test1@test.com',
          movieId: 81,
          score,
        });
        console.log(res);
      } catch (err) {
        alert(err);
      }
    });
  };

  const fetchInitialScore = async () => {
    try {
      const data = await fetch.get('/api/stars/movies/843241/users/test1@test.com');
      const userStar = data?.resData?.star;
      console.log('before state', this.state);
      console.log(userStar);
      this.setState({ ...this.state, userStar });
      console.log('after state', this.state);
      // const $cbox = document.getElementById('5-stars');
      // console.log($cbox);
      // cbox.checked = true;
    } catch (err) {
      console.log(err);
    }
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

  const fetchMovieDetailData = async () => {
    const movieDetailsData = await fetchMovieDetails(this.state.movieId);
    const reviewsByMovieId = await fetchReviewsByMovieId(this.state.movieId);

    const scoredReview = await Promise.all(
      reviewsByMovieId.map(async review => {
        const data = await fetch.get(`/api/stars/movies/${review.movieId}/users/${review.userEmail}`);
        const score = await data.resData.star.score;
        return { ...review, score };
      })
    );
    this.setState({ ...this.state, movieDetails: movieDetailsData, reviewsByMovieId: scoredReview });
    console.log('=========', this.state);
  };

  fetchMovieDetailData();
  fetchInitialScore()
}
