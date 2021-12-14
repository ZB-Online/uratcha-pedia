import { MovieDetail } from '../Components/MovieDetails';
import Wrapper from '../Components/Wrapper';
import { eventListeners } from '../eventListeners';

export default function Detail({ $target, movieId }) {
  this.state = {
    movieId,
  };

  this.render = () => {
    $target.innerHTML = Wrapper(MovieDetail);
  };

  this.event = () => {
    eventListeners();
  };
}
