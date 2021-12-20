import { MovieDetails } from '../components/MovieDetails';
import Wrapper from '../../../js/Components/Wrapper';
import { eventListeners } from '../../../js/eventListeners';
import { movieDetailCommentCarousel } from '../../../js/utils/carousel.js';
import { bindMovieCommentCarouselEvents } from '../../../js/utils/carousel';
import fetch from '../../../js/utils/fetch';
import { routeChange } from '../../../js/router';

export default function MovieDetailsPage({ $target, initialState }) {
  const $MovieDetailsPage = document.createElement('div');
  $MovieDetailsPage.classList.add('MovieDetailsPage');
  $MovieDetailsPage.classList.add('movie-detail-page');
  $target.appendChild($MovieDetailsPage);

  this.state = {
    movieId: +initialState,
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

    if (this.state.myReview.id) {
      document.querySelector('.my-comment-container').classList.remove('hidden');
      document.querySelector('.leave-comment').classList.add('hidden');
    } else {
      document.querySelector('.leave-comment').classList.remove('hidden');
    }

    renderMarkStar();
  };

  this.bindEvents = () => {
    eventListeners();

    const $commentDropdown = document.querySelector('.comment-dropdown-container');
    const $commentModal = document.querySelector('.comment-modal-container');
    const $commentModalWriteBtn = document.querySelector('.write-comment-btn');
    const $commentModalTextarea = document.querySelector('.comment-textarea');

    const eventhandlers = ({ target }) => {
      // dropdown
      if (target.matches('.movie-header_add-comment')) {
        // check if review exists
        console.log(this.state.myReview.id, this.state.myReview.movieId, this.state.movieId);
        this.state.myReview.id && this.state.myReview.movieId === +this.state.movieId
          ? $commentDropdown.classList.toggle('hidden') // pop up add-comment dropdown
          : $commentModal.classList.remove('hidden'); // pop up comment modal
      } else {
        $commentDropdown.classList.add('hidden');
      }

      // add / edit / delete comment btn
      if (
        target.matches('.edit-comment') ||
        target.matches('.my-comment-container_btn.edit-btn') ||
        target.matches('.leave-comment .movie-header_add-comment') ||
        (target.matches('.movie-header_add-comment') &&
          !this.state.myReview.id &&
          !this.state.myReview.movieId === this.state.movieId)
      ) {
        $commentModal.classList.remove('hidden');

        // bring auto-saved comment
        const savedComments = JSON.parse(localStorage.getItem('COMMENT_AUTO_SAVE'));
        const comment = savedComments[`${this.state.user.email}:${this.state.movieId}`] || this.state.myReview.comment;
        $commentModalTextarea.value = comment || '';
        $commentModalWriteBtn.removeAttribute('disabled');
      } else if (target.matches('.delete-comment') || target.matches('.my-comment-container_btn.del-btn')) {
        console.log('cur review', this.state.myReview.id);
        deleteMyReview();
        document.querySelector('.my-comment-container.comment').classList.add('hidden');
      }

      // post/patch modal comments
      if (target.matches('.write-comment-btn')) {
        $commentModal.classList.add('hidden');
        const comment = $commentModalTextarea.value;

        // remove auto-saved comment
        const savedComments = JSON.parse(localStorage.getItem('COMMENT_AUTO_SAVE'));
        delete savedComments[`${this.state.user.email}:${this.state.movieId}`];
        localStorage.setItem('COMMENT_AUTO_SAVE', JSON.stringify(savedComments));

        if (this.state.myReview.id && this.state.myReview.movieId === this.state.movieId) {
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
      savedComments[`${this.state.user.email}:${this.state.movieId}`] = comment;

      localStorage.setItem('COMMENT_AUTO_SAVE', JSON.stringify(savedComments));
      // }, 200);
    });

    bindMovieCommentCarouselEvents(
      document.querySelector('.detail-container_comment-container'),
      this.state.reviewsByMovieId
    );

    document.querySelector('.star-rating').addEventListener('click', e => {
      e.preventDefault();
      const score = +e.target.previousElementSibling.value;
      const currentScore = this.state.userScore?.score;
      if (!currentScore) {
        fetchAddUserScore(score);
      } else if (currentScore !== score) {
        fetchUpdateUserScore(score);
      } else if (currentScore === score) {
        fetchDeleteUserScore(this.state.userScore.id);
      }
    });
  };

  const renderMarkStar = () => {
    const currentScore = this.state.userScore.score || 0;
    if (currentScore) document.getElementById(`${currentScore}-star`).checked = true;
    const starMessage = ['평가하기', '싫어요', '별로에요', '보통이에요', '재미있어요', '최고에요!'];
    document.querySelector('.movie-header_score-letter').textContent = starMessage[currentScore];
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

  const postMyReview = async comment => {
    try {
      const myReview = {
        userEmail: this.state.user.email,
        movieId: this.state.movieId,
        comment,
      };
      const res = await fetch.post('/api/reviews', myReview);
      console.log(res);
      // review id 서버에서 가져와서 myReview 객체에 넣어주세요 :)
      this.setState({ ...this.state, myReview });
    } catch (e) {
      console.error(e);
    }
  };

  const patchMyReview = async comment => {
    try {
      const myReview = {
        id: this.state.myReview.id,
        userEmail: this.state.user.email,
        movieId: this.state.movieId,
        comment,
      };
      const res = await fetch.patch('/api/reviews', myReview);
      this.setState({ ...this.state, myReview });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteMyReview = async () => {
    const res = await fetch.delete(`/api/reviews/${this.state.myReview.id}`);
    console.log(res);
    this.setState({
      ...this.state,
      myReview: { id: null, userEmail: this.state.user.email, movieId: this.state.movieId, comment: null },
    });
  };

  const fetchInitialState = async () => {
    const movieDetailsData = await fetchMovieDetails(this.state.movieId);
    const reviewsByMovieId = await fetchReviewsByMovieId(this.state.movieId);
    const starsData = await fetchStarsByMovieId(843241);
    const averageStarsData = await fetchAverageStarsByMovieId(843241);
    const similarWorksData = await fetchSimilarWorksByGenre(movieDetailsData.genres[0]);
    const myReview = await fetch.get(`/api/reviews/movies/${this.state.movieId}/users/${this.state.user.email}`);

    const scoredReview = await Promise.all(
      reviewsByMovieId.map(async review => {
        const data = await fetch.get(`/api/stars/movies/${review.movieId}/users/${review.userEmail}`);
        const score = await data.resData.star.score;
        return { ...review, score };
      })
    );

    const userScore = await fetchInitialUserScore();
    this.setState({
      ...this.state,
      movieDetails: movieDetailsData,
      reviewsByMovieId: scoredReview,
      userScore,
      starsData,
      averageStarsData,
      similarWorksData,
      myReview: myReview.resData,
    });
  };

  fetchInitialState();
}
