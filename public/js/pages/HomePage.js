import Wrapper from '../Components/Wrapper';
import { MovieRanking } from '../Components/MovieRanking';
import { eventListeners } from '../eventListeners';
import { routeChange } from '../router';

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
          { component: MovieRanking, props: { initialState: this.state.boxOffice } },
          { component: MovieRanking, props: { initialState: this.state.highestRanking } },
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
}
