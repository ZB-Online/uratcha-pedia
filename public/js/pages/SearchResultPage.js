import { SearchResultContent } from '../Components/SearchResult';
import Wrapper from '../Components/Wrapper';
import { eventListeners } from '../eventListeners';

// export default function SearchResult() {
//   return Wrapper(SearchResultContent);
// }

export default function SearchResultPage({ $target }) {
  this.render = () => {
    $target.innerHTML = Wrapper(SearchResultContent);
  };

  this.event = () => {
    eventListeners();
  };
}
