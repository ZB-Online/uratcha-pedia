import { SearchResult } from '../components/SearchResult';
import Wrapper from '../components/Wrapper';
import { eventListeners } from '../eventListeners';
import { bindSearchedMovieCarouselEvents } from '../utils/carousel.js';
import isAuth from '../utils/auth';
import { getSearchMovies } from '../services/movie';

export default function SearchResultPage({ $target, initialState }) {
  const $searchResultPage = document.createElement('div');
  $target.appendChild($searchResultPage);

  this.state = {
    keyword: initialState,
    searchResult: [],
    user: {},
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
    bindSearchedMovieCarouselEvents(
      $searchResultPage.querySelector('.search-result-container__inner'),
      this.state.searchResult
    );
  };

  const fetchInitialState = async () => {
    const { keyword } = this.state;
    const user = await isAuth();
    const searchResults = await getSearchMovies(keyword);
    this.setState({ ...this.state, user, searchResult: searchResults });
  };

  fetchInitialState();
}
