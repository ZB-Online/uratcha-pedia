import { MovieDetails } from '../components/MovieDetails';
import Wrapper from '../../js/components/Wrapper';
import { eventListeners } from '../../js/eventListeners';
import { bindMovieCommentCarouselEvents } from '../../js/utils/carousel';
import fetch from '../../js/utils/fetch';
import { getCookieValue } from '../utils/cookie';
import { routeChange } from '../../js/router';
import debounce from '../utils/debounce';

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
    myReview: {},
    userScore: {},
  };

  this.setState = newState => {
    this.state = newState;
    this.render();

    this.bindEvents();
  };

  this.render = () => {
    const { movieDetails, reviewsByMovieId, starsData, averageStarsData, similarWorksData, myReview } = this.state;

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
                myReview,
              },
            },
          },
        ],
      }).render()
    );

    if (this.state.myReview?.id) {
      document.querySelector('.my-comment-container').classList.remove('hidden');
      document.querySelector('.leave-comment').classList.add('hidden');
    } else {
      document.querySelector('.leave-comment').classList.remove('hidden');
    }
    if (this.state.user.isAuth) renderMarkStar();
  };

  this.bindEvents = () => {
    eventListeners();

    const $commentDropdown = document.querySelector('.comment-dropdown-container');
    const $commentModal = document.querySelector('.comment-modal-container');
    const $commentModalWriteBtn = document.querySelector('.write-comment-btn');
    const $commentModalTextarea = document.querySelector('.comment-textarea');

    const $signModal = document.querySelector('.sign-modal');
    const $signinModal = document.querySelector('.signin-modal');
    const $signupModal = document.querySelector('.signup-modal');
    const $title = document.querySelector('.title');
    const eventhandlers = ({ target }) => {
      // dropdown
      if (target.matches('.movie-header_add-comment *')) {
        // check if review exists
        if (this.state.user.isAuth) {
          this.state.myReview?.id && this.state.myReview?.movieId === +this.state.movieId
            ? $commentDropdown.classList.toggle('hidden') // pop up add-comment dropdown
            : $commentModal.classList.remove('hidden'); // pop up comment modal
        } else {
          $signModal.classList.remove('hidden');
          $signinModal.classList.remove('hidden');
          $signupModal.classList.add('hidden');
          $title.innerText = 'SIGN IN';
        }
      } else {
        $commentDropdown.classList.add('hidden');
      }

      // add / edit / delete comment btn
      if (
        target.matches('.edit-comment *') ||
        target.matches('.my-comment-container_btn.edit-btn *') ||
        target.matches('.leave-comment .movie-header_add-comment') ||
        (target.matches('.movie-header_add-comment *') &&
          !this.state.myReview?.id &&
          !this.state.myReview?.movieId === this.state.movieId)
      ) {
        if (this.state.user.isAuth) {
          $commentModal.classList.remove('hidden');

          // bring auto-saved comment
          const savedComments = JSON.parse(localStorage.getItem('COMMENT_AUTO_SAVE'));
          const comment =
            savedComments[`${this.state.user?.email}:${this.state.movieId}`] || this.state.myReview?.comment;
          $commentModalTextarea.value = comment || '';
          $commentModalWriteBtn.removeAttribute('disabled');
        } else {
          $signModal.classList.remove('hidden');
          $signinModal.classList.remove('hidden');
          $signupModal.classList.add('hidden');
          $title.innerText = 'SIGN IN';
        }
      } else if (
        this.state.user.isAuth &&
        (target.matches('.delete-comment *') || target.matches('.my-comment-container_btn.del-btn *'))
      ) {
        console.log('cur review', this.state.myReview?.id);
        deleteMyReview();
        document.querySelector('.my-comment-container.comment').classList.add('hidden');
      }

      // post/patch modal comments
      if (target.matches('.write-comment-btn')) {
        $commentModal.classList.add('hidden');
        const comment = $commentModalTextarea.value;

        // remove auto-saved comment
        const savedComments = JSON.parse(localStorage.getItem('COMMENT_AUTO_SAVE'));
        delete savedComments[`${this.state.user?.email}:${this.state.movieId}`];
        localStorage.setItem('COMMENT_AUTO_SAVE', JSON.stringify(savedComments));

        if (this.state.myReview?.id && this.state.myReview?.movieId === this.state.movieId) {
          patchMyReview(comment);
        } else {
          postMyReview(comment);
        }
      }

      // close modal
      if (target.matches('#comment-modal') || target.matches('.close-comment-btn')) {
        $commentModal.classList.add('hidden');
      }
    };

    // comment-modal
    // window.addEventListener('click', eventhandlers);
    window.onclick = eventhandlers;

    $commentModalTextarea.addEventListener('input', e => {
      e.target.value
        ? $commentModalWriteBtn.removeAttribute('disabled')
        : $commentModalWriteBtn.setAttribute('disabled', '');
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';

      // debouncing 추가 하기
      // userEmail 및 movieId를 key로 추가 (해시화)
      // debounce(e => {
      const comment = e.target.value;
      const savedComments = JSON.parse(localStorage.getItem('COMMENT_AUTO_SAVE')) || {};
      savedComments[`${this.state.user?.email}:${this.state.movieId}`] = comment;

      localStorage.setItem('COMMENT_AUTO_SAVE', JSON.stringify(savedComments));
      // }, 200);
    });

    bindMovieCommentCarouselEvents(
      document.querySelector('.detail-container_comment-container'),
      this.state.reviewsByMovieId
    );

    document.querySelector('.star-rating').addEventListener(
      'click',
      debounce(e => {
        e.preventDefault();
        if (!this.state.user.isAuth) {
          $signModal.classList.remove('hidden');
          $signinModal.classList.remove('hidden');
          $signupModal.classList.add('hidden');
          $title.innerText = 'SIGN IN';
          return;
        }
        const score = +e.target.previousElementSibling.value;
        const currentScore = this.state.userScore?.score;
        if (!currentScore) {
          fetchAddUserScore(score);
        } else if (currentScore !== score) {
          fetchUpdateUserScore(score);
        } else if (currentScore === score) {
          fetchDeleteUserScore(this.state.userScore.id);
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

  const fetchInitialUserScore = async () => {
    try {
      const data = await fetch.get(`/api/stars/movies/${this.state.movieId}/users/${this.state.user?.email}`);
      return data?.resData?.star;
    } catch (err) {
      alert(err);
    }
  };

  const fetchAddUserScore = async score => {
    try {
      const data = await fetch.post('/api/stars', {
        userEmail: this.state.user?.email,
        movieId: this.state.movieId,
        score,
      });
      this.setState({ ...this.state, userScore: data?.resData });
    } catch (err) {
      alert(err);
    }
  };

  const fetchUpdateUserScore = async score => {
    try {
      console.log(this.state.userScore.id, this.state.movieId, score);
      const response = await fetch.patch('/api/stars', {
        id: this.state.userScore.id,
        movieId: this.state.movieId,
        score,
      });
      console.log('update', response);
      this.setState({ ...this.state, userScore: { ...this.state.userScore, score } });
    } catch (err) {
      alert(err);
    }
  };

  const fetchDeleteUserScore = async () => {
    try {
      await fetch.delete(`/api/stars/${this.state.userScore.id}`);
      this.setState({ ...this.state, userScore: false });
    } catch (err) {
      alert(err);
    }
  };

  const fetchMovieDetails = async movieId => {
    try {
      const { resData } = await fetch.get(`/api/movies/${movieId}`);
      return resData;
    } catch (e) {
      console.error('movie api not fetched: ', e);
    }
  };

  const fetchReviewsByMovieId = async movieId => {
    try {
      const { resData } = await fetch.get(`/api/reviews/${movieId}`);
      return resData;
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
      if (!genre) return;
      const { resData } = await fetch.get(`/api/movies/genre/${genre}`);
      return resData;
    } catch (e) {
      console.error('averageStarsByMovieId not fetched: ', e);
    }
  };

  const postMyReview = async comment => {
    try {
      const myReview = {
        userEmail: this.state.user?.email,
        movieId: this.state.movieId,
        comment,
      };
      const res = await fetch.post('/api/reviews', myReview);
      if (res) this.setState({ ...this.state, myReview: res?.resData });
    } catch (e) {
      console.error(e);
    }
  };

  const patchMyReview = async comment => {
    try {
      const myReview = {
        id: this.state.myReview?.id,
        userEmail: this.state.user?.email,
        movieId: this.state.movieId,
        comment,
      };
      const res = await fetch.patch('/api/reviews', myReview);
      if (res) this.setState({ ...this.state, myReview });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteMyReview = async () => {
    const res = await fetch.delete(`/api/reviews/${this.state.myReview?.id}`);
    if (res)
      this.setState({
        ...this.state,
        myReview: { id: null, userEmail: this.state.user?.email, movieId: this.state.movieId, comment: null },
      });
  };

  const fetchInitialState = async () => {
    const movieDetailsData = await fetchMovieDetails(this.state.movieId);
    const reviewsByMovieId = await fetchReviewsByMovieId(this.state.movieId);
    const starsData = await fetchStarsByMovieId(this.state.movieId);
    const averageStarsData = await fetchAverageStarsByMovieId(this.state.movieId);
    const similarWorksData = await fetchSimilarWorksByGenre(movieDetailsData.genres[0]);
    let myReview;
    if (this.state.user.isAuth)
      myReview = await fetch.get(`/api/reviews/movies/${this.state.movieId}/users/${this.state.user?.email}`);

    const scoredReview = await Promise.all(
      reviewsByMovieId.map(async review => {
        const data = await fetch.get(`/api/stars/movies/${review.movieId}/users/${review?.userEmail}`);
        const score = await data.resData.star.score;
        return { ...review, score };
      })
    );
    let userScore;
    if (this.state.user.isAuth) {
      userScore = await fetchInitialUserScore();
    }
    this.setState({
      ...this.state,
      movieDetails: movieDetailsData,
      reviewsByMovieId: scoredReview,
      userScore,
      starsData,
      averageStarsData,
      similarWorksData,
      myReview: myReview?.resData,
    });
    console.log(this.state);
  };
  const isAuth = async () => {
    try {
      const token = getCookieValue();
      const { resData } = await fetch.authGet('/api/users/auth', token);
      this.setState({ ...this.state, user: resData });
    } catch (err) {
      console.error(err);
    }
  };
  isAuth();
  fetchInitialState();
}
