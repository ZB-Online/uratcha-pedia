import { MyPageContents } from '../Components/MyScores';
import Wrapper from '../Components/Wrapper';

// export default function MyPage() {
//   return Wrapper(MyPageContents);
// }

export default function MyPage({ $target }) {
  this.render = () => {
    $target.innerHTML = Wrapper(MyPageContents);
  };
  this.render();
}
