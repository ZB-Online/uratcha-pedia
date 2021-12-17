import { SearchResult } from '../Components/SearchResult';
import Wrapper from '../Components/Wrapper';
import { eventListeners } from '../eventListeners';
import fetch from '../utils/fetch.js';
import { bindSearchedMovieCarouselEvents } from '../utils/carousel.js';

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
            component: SearchResult,
            props: { initialState: { keyword: this.state.keyword, searchResult: this.state.searchResult } },
          },
        ],
      }).render()
    );
  };

  this.bindEvents = () => {
    eventListeners();
  };

  const fetchSearchResult = async () => {
    const { keyword } = this.state;
    const searchResults = await getSearchMovies(keyword);
    this.setState({ ...this.state, searchResult: searchResults });
  };

  fetchSearchResult();
}

const getSearchMovies = async keyword => {
  try {
    const { resData } = await fetch.get(`/api/movies/search/${keyword}`);
    return resData;
  } catch (e) {
    console.error('search-result api not fetched: ', e);
  }
};
