import { MovieDetail } from '../Components/MovieDetails';
import Wrapper from '../Components/Wrapper';
import { eventListeners } from '../eventListeners';
import { renderMovieComments } from '../modules/comments';

export default function Detail({ $target, movieId }) {
  this.state = {
    movieId,
  };

  this.setState = {
    // 1. this.state 업데이트
    // 2. render
  };

  this.render = () => {
    $target.innerHTML = Wrapper(MovieDetail);
    renderMovieComments();
  };

  this.event = () => {
    eventListeners();
  };
}
