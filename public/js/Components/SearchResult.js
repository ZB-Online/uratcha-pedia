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
                <span>${this.state.keyword}</span>의 검색결과
              </div>
            </div>
          </div>
        </section>
        <section class="search-result-container">
          <div class="search-result-container__inner">
          ${
            new SearchedMovieCarousel({
              $target: $searchResult,
              initialState: { searchResult: this.state.searchResult },
            }).render().innerHTML
          }
          </div>      
        </section>
  `;
    return $searchResult;
  };

  this.render();
}
