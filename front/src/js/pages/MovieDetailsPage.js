import { MovieDetails } from '../components/MovieDetails';
import Wrapper from '../../js/components/Wrapper';
import { eventListeners } from '../../js/eventListeners';
import { bindMovieCommentCarouselEvents } from '../../js/utils/carousel';
import fetch from '../../js/utils/fetch';
import debounce from '../utils/debounce';
import { getMovieDetails, getSimilarWorksByGenre } from '../services/movies/movie';
import {
  deleteMyReview,
  getReviewsByMovieId,
  getUserReview,
  patchUserReview,
  postUserReview,
} from '../services/reviews/reviews';
import {
  deleteUserScore,
  getAverageStarsByMovieId,
  getStarsByMovieId,
  getUserScore,
  patchUserScore,
  postUserScore,
} from '../services/scores/scores';

export default function MovieDetailsPage({ $target, initialState }) {
  const $MovieDetailsPage = document.createElement('div');
  $MovieDetailsPage.classList.add('MovieDetailsPage');
  $MovieDetailsPage.classList.add('movie-detail-page');
  $target.appendChild($MovieDetailsPage);

  this.state = {
    movieId: +initialState,
    movieDetails: {},
    reviewsByMovieId: [],
    starsData: [],
    averageStarsData: {},
    similarWorksData: [],
    userReview: { id: null, userEmail: null, movieId: +initialState, comment: null },
    userScore: {},
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
                userReview: this.state.userReview,
              },
            },
          },
        ],
      }).render()
    );

    if (this.state.user.isAuth) {
      renderMarkStar();
      renderUserComment();
    } else {
      document.querySelector('.user-comment').classList.add('hidden');
    }
  };

  this.bindEvents = () => {
    eventListeners();

    const $commentDropdown = document.querySelector('.comment-dropdown-container');
    const $commentModal = document.querySelector('.comment-modal-container');
    const $commentModalWriteBtn = document.querySelector('.write-comment-btn');
    const $commentModalTextarea = document.querySelector('.comment-textarea');

    const $myComment = document.querySelector('.my-comment-container.comment');

    const $signModal = document.querySelector('.sign-modal');
    const $signinModal = document.querySelector('.signin-modal');
    const $signupModal = document.querySelector('.signup-modal');
    const $title = document.querySelector('.title');

    const popSignModal = () => {
      $signModal.classList.remove('hidden');
      $signinModal.classList.remove('hidden');
      $signupModal.classList.add('hidden');
      $title.innerText = 'SIGN IN';
    };

    const commentEventhandlers = async ({ target }) => {
      if (target.matches('.movie-header_add-comment')) {
        if (this.state.user.isAuth) {
          this.state.userReview?.id && this.state.userReview?.movieId === +this.state.movieId
            ? $commentDropdown.classList.toggle('hidden')
            : $commentModal.classList.remove('hidden');
        } else {
          popSignModal();
        }
      } else {
        $commentDropdown.classList.add('hidden');
      }

      if (
        target.matches('.edit-comment') ||
        target.matches('.my-comment-container_btn.edit-btn') ||
        target.matches('.leave-comment .movie-header_add-comment') ||
        (target.matches('.movie-header_add-comment.btn') &&
          !this.state.userReview?.id &&
          !this.state.userReview?.movieId === this.state.movieId)
      ) {
        if (this.state.user.isAuth) {
          $commentModal.classList.remove('hidden');

          const savedComments = JSON.parse(localStorage.getItem('COMMENT_AUTO_SAVE'));
          const comment =
            savedComments[`${this.state.user?.email}:${this.state.movieId}`] || this.state.userReview?.comment;

          $commentModalTextarea.value = comment || '';
          $commentModalWriteBtn.removeAttribute('disabled');
        } else {
          popSignModal();
        }
      } else if (
        this.state.user.isAuth &&
        (target.matches('.delete-comment') || target.matches('.my-comment-container_btn.del-btn'))
      ) {
        if (deleteMyReview(this.state.userReview?.id))
          this.setState({
            ...this.state,
            userReview: { id: null, userEmail: this.state.user?.email, movieId: this.state.movieId, comment: null },
          });
        $myComment.classList.add('hidden');
      }

      if (target.matches('.write-comment-btn')) {
        $commentModal.classList.add('hidden');
        const comment = $commentModalTextarea.value;

        const savedComments = JSON.parse(localStorage.getItem('COMMENT_AUTO_SAVE'));
        delete savedComments[`${this.state.user?.email}:${this.state.movieId}`];
        localStorage.setItem('COMMENT_AUTO_SAVE', JSON.stringify(savedComments));

        const userReview =
          this.state.userReview?.id && this.state.userReview?.movieId === this.state.movieId
            ? await patchUserReview(this.state.userReview?.id, this.state.user?.email, this.state.movieId, comment)
            : await postUserReview(this.state.user?.email, this.state.movieId, comment);

        this.setState({ ...this.state, userReview });
      }

      if (target.matches('#comment-modal') || target.matches('.close-comment-btn')) {
        $commentModal.classList.add('hidden');
      }
    };

    window.onclick = commentEventhandlers;

    $commentModalTextarea.addEventListener('input', e => {
      e.target.value
        ? $commentModalWriteBtn.removeAttribute('disabled')
        : $commentModalWriteBtn.setAttribute('disabled', '');
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';

      const comment = e.target.value;
      const savedComments = JSON.parse(localStorage.getItem('COMMENT_AUTO_SAVE')) || {};
      savedComments[`${this.state.user?.email}:${this.state.movieId}`] = comment;

      localStorage.setItem('COMMENT_AUTO_SAVE', JSON.stringify(savedComments));
    });

    bindMovieCommentCarouselEvents(
      document.querySelector('.detail-container_comment-container'),
      this.state.reviewsByMovieId
    );

    document.querySelector('.star-rating').addEventListener(
      'click',
      debounce(async e => {
        e.preventDefault();
        if (!this.state.user.isAuth) {
          popSignModal();
          return;
        }
        const score = +e.target.previousElementSibling.value;
        const currentScore = this.state.userScore?.score;
        if (!currentScore) {
          const userScore = await postUserScore(this.state.user?.email, this.state.movieId, score);
          this.setState({ ...this.state, userScore });
        } else if (currentScore !== score) {
          patchUserScore(this.state.userScore.id, this.state.movieId, score);
          this.setState({ ...this.state, userScore: { ...this.state.userScore, score } });
        } else if (currentScore === score) {
          deleteUserScore(this.state.userScore.id);
          this.setState({ ...this.state, userScore: false });
        }
      }, 300)
    );
  };

  const renderMarkStar = () => {
    const currentScore = this.state.userScore?.score || 0;
    if (currentScore) document.getElementById(`${currentScore}-star`).checked = true;
    const starMessage = ['Rate', 'Dislike', 'Meh', "It's not bad", "It's a must watch", "It's the best"];
    document.querySelector('.movie-header_score-letter').textContent = starMessage[currentScore];
  };

  const renderUserComment = () => {
    const $leaveComment = document.querySelector('.leave-comment');
    const $myComment = document.querySelector('.my-comment-container.comment');
    if (this.state.userReview?.id) {
      $myComment.classList.remove('hidden');
      $leaveComment.classList.add('hidden');
    } else {
      $leaveComment.classList.remove('hidden');
    }
  };

  const getInitialState = async () => {
    const movieDetailsData = await getMovieDetails(this.state.movieId);
    const reviewsByMovieId = await getReviewsByMovieId(this.state.movieId);
    const starsData = await getStarsByMovieId(this.state.movieId);
    const averageStarsData = await getAverageStarsByMovieId(this.state.movieId);
    const similarWorksData = await getSimilarWorksByGenre(movieDetailsData.genres[0]);

    const userReview = this.state.user.isAuth
      ? await getUserReview(this.state.movieId, this.state.user.email)
      : this.state.userReview;
    const userScore = this.state.user.isAuth
      ? await getUserScore(this.state.movieId, this.state.user?.email)
      : this.state.userScore;

    const scoredReview = await Promise.all(
      reviewsByMovieId.map(async review => {
        const data = await fetch.get(`/api/stars/movies/${review.movieId}/users/${review?.userEmail}`);
        const score = await data.resData.star.score;
        return { ...review, score };
      })
    );

    this.state.user.isAuth
      ? this.setState({
          ...this.state,
          movieDetails: movieDetailsData,
          reviewsByMovieId: scoredReview,
          userScore,
          starsData,
          averageStarsData,
          similarWorksData,
          userReview,
        })
      : this.setState({
          ...this.state,
          movieDetails: movieDetailsData,
          reviewsByMovieId: scoredReview,
          starsData,
          averageStarsData,
          similarWorksData,
          userScore,
          userReview,
        });
  };

  const isAuth = async () => {
    try {
      const { resData } = await fetch.get('/api/users/auth');
      this.setState({ ...this.state, user: resData });
    } catch (err) {
      console.error(err);
    }
  };

  isAuth();
  getInitialState();
}
