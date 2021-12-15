import Wrapper from '../Components/Wrapper';
import { BoxOffice, HighestRates } from '../Components/Main';
import { eventListeners } from '../eventListeners';
import { routeChange } from '../router';
import { renderMovies } from '../modules/movies';

export default function Home({ $target }) {
  const $main = document.createElement('div');
  $target.appendChild($main);

  this.render = () => {
    $main.innerHTML = Wrapper(BoxOffice, HighestRates);
    renderMovies();
  };

  this.event = () => {
    eventListeners();

    $main.addEventListener('click', ({ target }) => {
      if (!target.matches('.movie-item *')) return;
      if (target.matches('.box-office *')) {
        const route = '/detail/1';
        routeChange(route);
      } else {
        const route = '/detail/2';
        routeChange(route);
      }
    });
  };
}
