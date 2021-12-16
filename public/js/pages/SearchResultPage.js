import { SearchResultContent } from '../Components/SearchResult';
import Wrapper from '../Components/Wrapper';
import { eventListeners } from '../eventListeners';
import fetch from '../utils/fetch.js';
import { searchMovieCarousel } from '../utils/carousel.js';

export default function SearchResultPage({ $target, initialState }) {
  const $searchResultPage = document.createElement('div');
  $target.appendChild($searchResultPage);

  this.state = {
    keyword: initialState,
  };

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
          {
            component: SearchResultContent,
            props: { initialState: { keyword: this.state.keyword, searchResult: this.state.searchResult } },
          },
        ],
      }).render()
    );
  };

  this.bindEvents = () => {
    eventListeners();
    // 추가
    searchMovieCarousel(document.querySelector('.search-result-container'), this.state.searchResult);
  };

  const fetchSearchResult = async () => {
    try {
      // const searchResultData = await getMoviesDetailsById(589761);
      const data = await fetch.get('/api/movies');
      const searchResultData = data.resData;
      this.setState({ ...this.state, searchResult: searchResultData });
    } catch (e) {
      console.error('search-result api not fetched: ', e);
    }
  };

  fetchSearchResult();
}
