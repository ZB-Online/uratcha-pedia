import { MovieDetails } from '../Components/MovieDetails';
import Wrapper from '../Components/Wrapper';
import { eventListeners } from '../eventListeners';
import { movieDetailCommentCarousel } from '../utils/carousel.js';
import fetch from '../utils/fetch';
import debounce from '../utils/debouncing.js';

export default function MovieDetailsPage({ $target, initialState }) {
  const $MovieDetailsPage = document.createElement('div');
  $MovieDetailsPage.classList.add('MovieDetailsPage');
  $MovieDetailsPage.classList.add('movie-detail-page');
  $target.appendChild($MovieDetailsPage);

  this.state = {
    movieId: +initialState,
    userEmail: 'test1@test.com',
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
              initialState: {
                movieDetails: this.state.movieDetails,
                reviewsByMovieId: this.state.reviewsByMovieId,
                myReview: this.state.myReview,
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
  };

  this.bindEvents = () => {
    eventListeners();
    // 추가

    console.log(this.state.myReview);
    const $commentDropdown = document.querySelector('.comment-dropdown-container');
    const $commentModal = document.querySelector('.comment-modal-container');
    const $commentModalWriteBtn = document.querySelector('.write-comment-btn');
    const $commentModalTextarea = document.querySelector('.comment-textarea');

    const eventhandlers = ({ target }) => {
      // dropdown
      if (target.matches('.movie-header_add-comment')) {
        // check if review exists
        console.log(this.state.myReview.id, this.state.myReview.movieId === this.state.movieId);
        this.state.myReview.id && this.state.myReview.movieId === this.state.movieId
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
        const comment = savedComments[`${this.state.userEmail}:${this.state.movieId}`] || this.state.myReview.comment;
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
        delete savedComments[`${this.state.userEmail}:${this.state.movieId}`];
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
      savedComments[`${this.state.userEmail}:${this.state.movieId}`] = comment;

      localStorage.setItem('COMMENT_AUTO_SAVE', JSON.stringify(savedComments));
      // }, 200);
    });

    // Carousel
    movieDetailCommentCarousel(
      document.querySelector('.detail-container_comment-container'),
      this.state.reviewsByMovieId
    );
  };

  // CRUD
  const fetchData = async () => {
    try {
      const movieDetails = await fetch.get('/api/movies/634649');
      const reviewsByMovieId = await fetch.get('/api/reviews/634649');
      const myReview = await fetch.get('/api/reviews/movies/634649/users/test1@test.com');
      console.log(myReview);
      this.setState({
        ...this.state,
        movieDetails: movieDetails.resData,
        reviewsByMovieId: reviewsByMovieId.resData,
        myReview: myReview.resData,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const postMyReview = async comment => {
    try {
      const myReview = {
        id: 1,
        // userEmail: this.state.userEmail,
        userEmail: 'test1@test.com',
        movieId: this.state.movieId,
        comment,
      };
      const res = await fetch.post('/api/reviews', myReview);
      console.log(res);
      this.setState({ ...this.state, myReview });
    } catch (e) {
      console.error(e);
    }
  };

  const patchMyReview = async comment => {
    try {
      const myReview = {
        id: this.state.myReview.id,
        // userEmail: this.state.userEmail,
        userEmail: 'test1@test.com',
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
      myReview: { id: null, userEmail: 'test1@test.com', movieId: this.state.movieId, comment: null },
    });
  };

  fetchData();
}
