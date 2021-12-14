import Wrapper from '../Components/Wrapper';
import { BoxOffice, HighestRates } from '../Components/Main';
import { routeChange } from '../App';

export default function Home({ $target }) {
  this.render = () => {
    $target.innerHTML = Wrapper(BoxOffice, HighestRates);
  };

  this.render();

  const $boxOffice = document.querySelector('.box-office');
  console.log($boxOffice);

  document.addEventListener('click', e => {
    console.log(e);
    routeChange('/detail/1');
  });
}
