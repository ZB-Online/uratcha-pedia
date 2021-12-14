import { SearchResultContent } from '../Components/SearchResult';
import Wrapper from '../Components/Wrapper';

// export default function SearchResult() {
//   return Wrapper(SearchResultContent);
// }

export default function SearchResult({ $target }) {
  this.render = () => {
    $target.innerHTML = Wrapper(SearchResultContent);
  };
  this.render();
}
