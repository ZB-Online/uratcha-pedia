import MyScoredMovies from '../components/MyScoredMovies';
import Wrapper from '../components/Wrapper';
import { eventListeners } from '../eventListeners';
import fetch from '../utils/fetch.js';
import { getCookieValue } from '../utils/cookie';
import { bindMyScoredMovieCarouselEvents } from '../utils/carousel';

export default function MyPage({ $target, initialState }) {
  const $myPage = document.createElement('div');
  $target.appendChild($myPage);

  this.state = {
    myScoredMovies: [],
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

  const fetchData = async () => {
    if (!this.state) return;
    const user = await isAuth();
    const myScoredMovies = await fetchMyScoredMovies(user.email);
    this.setState({ ...this.state, user: user, myScoredMovies: myScoredMovies });
  };

  const isAuth = async () => {
    try {
      const token = getCookieValue();
      const { resData } = await fetch.authGet('/api/users/auth', token);
      return resData;
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}

const fetchMyScoredMovies = async userEmail => {
  try {
    const { resData } = await fetch.get(`/api/movies/users/${userEmail}`);
    return resData;
  } catch (e) {
    console.error('my scored movies api not fetched: ', e);
  }
};
