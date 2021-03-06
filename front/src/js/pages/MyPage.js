import MyScoredMovies from '../components/MyScoredMovies';
import Wrapper from '../components/Wrapper';
import { eventListeners } from '../eventListeners';
import { bindMyScoredMovieCarouselEvents } from '../utils/carousel';
import { defaultMovie, defaultUser } from './initialState/index.js';
import { fetchUser, fetchMovie } from '../services/index';

export default function MyPage({ $target }) {
  const $myPage = document.createElement('div');
  $target.appendChild($myPage);

  this.state = {
    myScoredMovies: defaultMovie.myScoredMovies,
    user: defaultUser.user,
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
    this.bindEvents();
  };

  this.render = () => {
    $myPage.appendChild(
      new Wrapper({
        $target: $myPage,
        initialState: this.state,
        components: [
          { component: MyScoredMovies, props: { initialState: { myScoredMovies: this.state.myScoredMovies } } },
        ],
      }).render()
    );
  };

  this.bindEvents = () => {
    eventListeners();

    bindMyScoredMovieCarouselEvents(
      document.querySelector('.my-scored-movies-container__inner'),
      this.state.myScoredMovies
    );
  };

  const fetchInitialState = async () => {
    if (!this.state) return;

    const user = await fetchUser.isAuth();
    const myScoredMovies = await fetchMovie.getMyScoredMovies(user.email);
    this.setState({ ...this.state, user: user, myScoredMovies: myScoredMovies });
  };

  fetchInitialState();
}
