import MyScoredMovies from '../Components/MyScoredMovies';
import Wrapper from '../Components/Wrapper';
import { eventListeners } from '../eventListeners';
import fetch from '../utils/fetch.js';

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
  };

  const fetchMyScoredMovies = async () => {
    try {
      const data = await fetch.get('/api/movies');
      const myScoredMovies = data.resData;
      this.setState({ ...this.state, myScoredMovies: myScoredMovies });
    } catch (e) {
      console.error('movie api not fetched: ', e);
    }
  };

  fetchMyScoredMovies();
}
