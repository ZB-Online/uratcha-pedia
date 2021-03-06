import { routeChange } from '../router';
import SearchedMovieCarousel from './global/SearchedMovieCarousel';

export function SearchResult({ $target, initialState }) {
  const $searchResult = document.createElement('div');
  $target.appendChild($searchResult);

  this.state = {
    keyword: initialState.keyword,
    searchResult: initialState.searchResult,
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
    this.bindEvents();
  };

  this.render = () => {
    if (!this.state) return;

    $searchResult.innerHTML = `
    <section class="search-result"> 
      <article class="container">
        <section class="search-result-header">
          <div class="outer">
            <div class="inner">
              <div class="search-result-title">
              Search results for <span>"${this.state.keyword}"</span>
              </div>
            </div>
          </div>
        </section>
        <section class="search-result-container">
        
        </section>
      </article>
    </section>`;

    new SearchedMovieCarousel({
      $target: $searchResult.querySelector('.search-result-container'),
      initialState: { searchResult: this.state.searchResult },
    });

    return $searchResult;
  };

  this.bindEvents = () => {
    $searchResult.addEventListener('click', ({ target }) => {
      if (!target.matches('.carousel-slides *')) return;

      const movieId = target.closest('li').dataset.movieId;
      routeChange(`/movies/${movieId}`);
    });
  };

  this.render();
  this.bindEvents();
}
