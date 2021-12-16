import { MyScoredMovies } from '../Components/MyScoredMovies';
import Wrapper from '../Components/Wrapper';
import { eventListeners } from '../eventListeners';
import fetch from '../utils/fetch.js';
import { myScoredCarousel } from '../utils/carousel.js';

const stars = () =>
  new Promise((resolve, reject) =>
    resolve([
      {
        id: 3,
        userEmail: 'test3@test.com',
        movieId: 3,
        score: 5,
      },
      {
        id: 4,
        userEmail: 'test3@test.com',
        movieId: 6,
        score: 1,
      },
      {
        id: 5,
        userEmail: 'test3@test.com',
        movieId: 2,
        score: 4,
      },
    ])
  );

export default function MyPage({ $target }) {
  const $myPage = document.createElement('div');
  $target.appendChild($myPage);

  this.state = {};

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
        components: [{ component: MyScoredMovies, props: { initialState: this.state.myScoredMovies } }],
      }).render()
    );
  };

  this.bindEvents = () => {
    eventListeners();

    // Carousel Events
    myScoredCarousel(document.querySelector('.my-scored-movies-container__inner'), this.state.myScoredMovies);
  };

  const fetchMyScoredMovies = async () => {
    try {
      const data = await fetch.get('/api/movies');
      const myScoredMovies = data.resData;
      // const myScoredMovies = await stars;
      // stars movieId mapping => movieDetails 취득
      this.setState({ ...this.state, myScoredMovies });
    } catch (e) {
      console.error('movie api not fetched: ', e);
    }
  };

  fetchMyScoredMovies();
}
