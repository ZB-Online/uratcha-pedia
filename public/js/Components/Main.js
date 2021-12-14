import { renderMovies } from '../modules/movies';

export function BoxOffice() {
  return `
  <section class="movie-container">
    <div class="outer">
      <div class="inner">
        <div class="movie-ranking">
          <span>박스오피스 순위</span>
        </div>
      </div>
    </div> 
  <div class="carousel box-office">
  </div>
  </section>`;
}

export function HighestRates() {
  return `
  <section class=" movie-container">
  <div class="outer">
    <div class="inner">
      <div class="movie-ranking">
        <span>평균 별점이 높은 작품</span>
      </div>
    </div>
    <div class="carousel highest-rates">
    </div>
  </div>
  </section>
  `;
}
