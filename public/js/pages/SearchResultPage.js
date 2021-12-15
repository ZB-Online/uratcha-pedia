import { SearchResultContent } from '../Components/SearchResult';
import Wrapper from '../Components/Wrapper';
import { eventListeners } from '../eventListeners';

const searchResults = () => new Promise((resolve, reject) => resolve());

export default function SearchResultPage({ $target, initialState }) {
  const $searchResultPage = document.createElement('div');
  $target.appendChild($searchResultPage);

  this.state = initialState;

  this.setState = newState => {
    this.state = newState;
    this.render();
    this.bindEvents();
  };

  this.render = () => {
    $searchResultPage.appendChild(
      new Wrapper({
        $target: $searchResultPage,
        initialState: this.state,
        components: [
          { component: SearchResultContent, props: { initialState: { searchResult: this.state.searchResult } } },
        ],
      }).render()
    );
  };

  this.bindEvents = () => {
    eventListeners();
    // 추가
  };

  const fetchSearchResult = async () => {
    try {
      // const searchResultData = await getMoviesDetailsById(589761);
      const results = await searchResults();
      this.setState({ ...this.state, searchResult: results });
    } catch (e) {
      console.error('search-result api not fetched: ', e);
    }
  };

  fetchSearchResult();
}
