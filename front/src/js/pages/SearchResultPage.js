import { SearchResult } from '../components/SearchResult';
import Wrapper from '../components/Wrapper';
import { eventListeners } from '../eventListeners';
import fetch from '../utils/fetch.js';
import {getCookieValue} from '../utils/cookie';
import { bindSearchedMovieCarouselEvents } from '../utils/carousel.js';

export default function SearchResultPage({ $target, initialState }) {
  const $searchResultPage = document.createElement('div');
  $target.appendChild($searchResultPage);

  this.state = {
    keyword: initialState,
    searchResult: [],
    user: {}
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

  const fetchSearchResult = async () => {
    const { keyword } = this.state;
    const searchResults = await getSearchMovies(keyword);
    this.setState({ ...this.state, searchResult: searchResults });
  };

  const isAuth = async () => {
    try {
      const token = getCookieValue();
      const response = await fetch.authGet('/api/users/auth', token);
      this.setState({ ...this.state, user: response?.resData });
    } catch (err) {
      console.error(err)
    }
  };

  isAuth();
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
