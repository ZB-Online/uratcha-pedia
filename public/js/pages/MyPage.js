import { MyPageContents } from '../Components/MyScores';
import Wrapper from '../Components/Wrapper';
import { eventListeners } from '../eventListeners';
import { renderMyScoredMovies } from '../modules/movies';

// export default function MyPage() {
//   return Wrapper(MyPageContents);
// }

export default function MyPage({ $target }) {
  this.render = () => {
    $target.innerHTML = Wrapper(MyPageContents);
    renderMyScoredMovies();
  };

  this.event = () => {
    eventListeners();
  };
}
