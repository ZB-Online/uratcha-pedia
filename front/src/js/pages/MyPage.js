import MyScoredMovies from '../components/MyScoredMovies';
import Wrapper from '../components/Wrapper';
import { eventListeners } from '../eventListeners';
import { bindMyScoredMovieCarouselEvents } from '../utils/carousel';
import { getMyScoredMovies } from '../services/movie';
import isAuth from '../utils/auth';

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

  const fetchInitialState = async () => {
    if (!this.state) return;

    const user = await isAuth();
    const myScoredMovies = await getMyScoredMovies(user.email);
    this.setState({ ...this.state, user: user, myScoredMovies: myScoredMovies });
  };

  fetchInitialState();
}
