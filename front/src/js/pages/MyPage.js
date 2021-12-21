import MyScoredMovies from '../components/MyScoredMovies';
import Wrapper from '../components/Wrapper';
import { eventListeners } from '../eventListeners';
import fetch from '../utils/fetch.js';
import {getCookieValue} from '../utils/cookie';
import { bindMyScoredMovieCarouselEvents } from '../utils/carousel';

export default function MyPage({ $target }) {
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

  const fetchMyScoredMovies = async () => {
    try {
      // & : userId에 맞는 별점을 가진 영화들을 가져오도록 수정필요
      const data = await fetch.get('/api/movies');
      const myScoredMovies = data.resData;
      this.setState({ ...this.state, myScoredMovies: myScoredMovies });
    } catch (e) {
      console.error('movie api not fetched: ', e);
    }
  };

  const isAuth = async () => {
    try {
      const token = getCookieValue();
      const response = await fetch.authGet('/api/users/auth', token);
      this.setState({ ...this.state, user: response?.resData });
      console.log(this.state)
    } catch (err) {
      console.error(err)
    }
  };

  isAuth();
  fetchMyScoredMovies();
}
