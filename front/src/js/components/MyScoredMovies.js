import { routeChange } from '../router';
import MyScoredMoviesCarousel from './global/MyScoredMoviesCarousel';

export default function MyScoredMovies({ $target, initialState }) {
  const $myScoredMovies = document.createElement('div');
  $target.appendChild($myScoredMovies);

  this.state = {
    myScoredMovies: initialState.myScoredMovies,
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
    this.bindEvents();
  };

  this.render = () => {
    if (!this.state) return;

    $myScoredMovies.innerHTML = `
    <section class="mypage">
      <article class="container">
        <div class="my-scored-movies-header">
          <div class="my-scored-movies-header__back-button"></div>
          <div class="my-scored-movies-header__title">Movies</div>
        </div>
        <section class="my-scored-movies-container">
          <div class="my-scored-movies-container__header">
            <h2 class="my-scored-movies-container__title">Average</h2>
            <span class="my-scored-movies-container__number"></span>
          </div>
          <div class="my-scored-movies-container__inner">
          
          </div>
        </section>
      </article>
    </section>`;

    new MyScoredMoviesCarousel({
      $target: $myScoredMovies.querySelector('.my-scored-movies-container__inner'),
      initialState: { myScoredMovies: this.state.myScoredMovies },
    });

    return $myScoredMovies;
  };

  this.bindEvents = () => {
    $myScoredMovies.addEventListener('click', ({ target }) => {
      if (!target.matches('.carousel-slides *')) return;

      const movieId = target.closest('li').dataset.movieId;
      routeChange(`/movies/${movieId}`);
    });
  };

  this.render();
  this.bindEvents();
}
