import Wrapper from '../Components/Wrapper';
import { MovieRanking } from '../Components/MovieRanking';
import { eventListeners } from '../eventListeners';
import { routeChange } from '../router';
import fetch from '../utils/fetch.js';

export default function HomePage({ $target }) {
  const $homePage = document.createElement('div');
  $target.appendChild($homePage);

  this.state = {
    boxOffice: '박스 오피스',
    highestRanking: '별점 순',
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    $homePage.appendChild(
      new Wrapper({
        $target: $homePage,
        initialState: this.state,
        components: [
          {
            component: MovieRanking,
            props: { initialState: { title: '박스 오피스', movieRanking: this.state.boxOffice } },
          },
          {
            component: MovieRanking,
            props: { initialState: { title: '별점 높은 순', movieRanking: this.state.highestRanking } },
          },
        ],
      }).render()
    );
  };

  this.bindEvents = () => {
    eventListeners();

    $homePage.addEventListener('click', ({ target }) => {
      if (!target.matches('.movie-item *')) return;
      if (target.matches('.box-office *')) {
        const route = '/movies/1';
        routeChange(route);
      } else {
        const route = '/movies/2';
        routeChange(route);
      }
    });
  };

  const fetchBoxOffice = async () => {
    try {
      const data = await fetch.get('/api/movies');
      const boxOffice = data.resData;
      this.setState({ ...this.state, boxOffice });
    } catch (e) {
      console.error('movie api not fetched: ', e);
    }
  };

  fetchBoxOffice();
}
