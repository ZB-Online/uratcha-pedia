import { routeChange } from '../router';
import BoxOfficeRankingCarousel from './global/BoxOfficeRankingCarousel';
import HighestRankingCarousel from './global/HighestRankingCarousel';

export function MovieRanking({ $target, initialState }) {
  const $movieRanking = document.createElement('div');
  $target.appendChild($movieRanking);

  this.state = { title: initialState.title, movieRanking: initialState.movieRanking };

  this.setState = newState => {
    this.state = newState;
    this.render();
    this.bindEvents();
  };

  this.render = () => {
    if (!this.state) return;

    const { title, movieRanking } = this.state;

    $movieRanking.innerHTML = `
      <section class="movie-container">
        <div class="outer">
          <div class="inner">
            <div class="movie-ranking">
              <span>${title}</span>
            </div>
          </div>
        </div> 
        <div class="carousel ${title === 'Box Office' ? 'box-office' : 'highest-ranking'}">
        
        </div>
      </section>`;

    title === 'Box Office'
      ? new BoxOfficeRankingCarousel({
          $target: $movieRanking.querySelector('.carousel'),
          initialState: movieRanking,
        })
      : new HighestRankingCarousel({
          $target: $movieRanking.querySelector('.carousel'),
          initialState: movieRanking,
        });
  };

  this.bindEvents = () => {
    const { title } = this.state;

    $target.addEventListener('click', ({ target }) => {
      if (!target.matches(`${title === 'Box Office' ? '.box-office' : '.highest-ranking'} .movie-item *`)) return;
      const movieId = target.closest('.movie-item').dataset.movieId;
      routeChange(`/movies/${movieId}`);
    });
  };

  this.render();
  this.bindEvents();
}
