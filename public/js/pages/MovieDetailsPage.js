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
    user: {
      email: 'test1@test.com',
      username: '테스트계정1',
    },
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

    document.querySelector('.star-rating').addEventListener('click', e => {
      e.preventDefault();
      const score = +e.target.previousElementSibling.value;
      const currentScore = this.state.userScore?.score
      if (!currentScore) {
        fetchAddUserScore(score);
      } else if (currentScore !== score) {
        fetchUpdateUserScore(score);
      } else if (currentScore === score) {
        fetchDeleteUserScore(this.state.userScore.id);
      }
    });
  };

  const checkedStar = () => {
    const currentScore = this.state.userScore.score;
    if (currentScore) document.getElementById(`${currentScore}-star`).checked = true;
    let text;
    switch (currentScore) {
      case 1:
        text = '싫어요';
        break;
      case 2:
        text = '별로에요';
        break;
      case 3:
        text = '보통이에요';
        break;
      case 4:
        text = '재미있어요';
        break;
      case 5:
        text = '최고에요!';
        break;
      default:
        text = '평가하기';
    }
    document.querySelector('.movie-header_score-letter').textContent = text;
  };

  const fetchInitialUserScore = async () => {
    try {
      const data = await fetch.get(`/api/stars/movies/${this.state.movieId}/users/${this.state.user.email}`);
      return data?.resData?.star;
    } catch (err) {
      alert(err);
    }
  };

  const fetchAddUserScore = async score => {
    try {
      const data = await fetch.post('/api/stars', {
        userEmail: this.state.user.email,
        movieId: this.state.movieId,
        score,
      });
      this.setState({ ...this.state, userScore: data?.resData });
      checkedStar();
    } catch (err) {
      alert(err);
    }
  };

  const fetchUpdateUserScore = async score => {
    try {
      await fetch.patch('/api/stars', {
        id: this.state.userScore.id,
        movieId: this.state.movieId,
        score,
      });
      this.setState({ ...this.state, userScore: { ...this.state.userScore, score } });
      checkedStar();
    } catch (err) {
      alert(err);
    }
  };

  const fetchDeleteUserScore = async () => {
    try {
      await fetch.delete(`/api/stars/${this.state.userScore.id}`);
      this.setState({ ...this.state, userScore: false });
      checkedStar();
    } catch (err) {
      alert(err);
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

  const fetchInitialState = async () => {
    const movieDetailsData = await fetchMovieDetails(this.state.movieId);
    const reviewsByMovieId = await fetchReviewsByMovieId(this.state.movieId);

    const scoredReview = await Promise.all(
      reviewsByMovieId.map(async review => {
        const data = await fetch.get(`/api/stars/movies/${review.movieId}/users/${review.userEmail}`);
        const score = await data.resData.star.score;
        return { ...review, score };
      })
    );

    const userScore = await fetchInitialUserScore();
    this.setState({ ...this.state, movieDetails: movieDetailsData, reviewsByMovieId: scoredReview, userScore });
    checkedStar();
  };
  
  fetchInitialState();
}
