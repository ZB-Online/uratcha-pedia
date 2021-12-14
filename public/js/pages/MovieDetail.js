import { MovieDetail } from '../Components/MovieDetails';
import Wrapper from '../Components/Wrapper';

// export default function Detail() {
//   return Wrapper(MovieDetail);
// }

export default function Detail({ $target, movieId }) {
  this.state = {
    movieId,
  };
  this.render = () => {
    $target.innerHTML = Wrapper(MovieDetail);
  };
  this.render();
}
