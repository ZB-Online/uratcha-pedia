import { config } from '../modules/config';

export function SearchResultContent({ $target, initialState }) {
  const $searchResult = document.createElement('div');
  $target.appendChild($searchResult);

  this.state = initialState;

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;
    const { keyword, searchResult } = this.state;
    console.log(keyword, searchResult);
    $searchResult.innerHTML = `
      <section class="search-result">
        <article class="container">
          <section class="search-result-header">
            <div class="outer">
              <div class="inner">
                <div class="search-result-title">
                  <span>"${keyword}"</span>의 검색결과
                </div>
              </div>
            </div>
          </section>
          <section class="search-result-container">
            <div class="search-result-container__inner">
              <ul class="search-result-item">
                ${searchResult
                  .map(
                    movie => `
                  <li class="search-result-container__item">
                    <a href="/movies/${movie.id}" class="search-result-container__link">
                      <img src="${config.image_base_url + movie.poster_path}" alt="poster" />
                      <div class="search-result-item__info">
                        <div class="search-result-item__title">${movie.title}</div>
                        <div class="search-result-item__subtitle">
                          <span>${movie.release_date.split('-')[0]} ・ ${movie.country}</span>
                        </div>
                        <div class="search-result-item__category"><span>영화</span></div>
                      </div>
                    </a>
                  </li>`
                  )
                  .join('')}
              </ul>
            </div>
          </section>
        </article>
      </section>
  `;
    return $searchResult;
  };

  this.render();
}
