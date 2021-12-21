import MyScoredMovies from '../components/MyScoredMovies';
import Wrapper from '../components/Wrapper';
import { eventListeners } from '../eventListeners';
import fetch from '../utils/fetch.js';
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

  const userEmail = 'test7@test.com';

  const fetchData = async () => {
    if (!userEmail) return;
    const myScoredMovies = await fetchMyScoredMovies(userEmail);
    this.setState({ ...this.state, myScoredMovies: myScoredMovies });
  };

  const isAuth = async () => {
    try {
      const response = await fetch.get('/api/users/auth');
      this.setState({ ...this.state, user: response?.resData });
      console.log(this.state)
    } catch (err) {
      console.error(err);
    }
  };

  isAuth();
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
