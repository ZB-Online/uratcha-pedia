import BoxOfficeRankingCarousel from './global/BoxOfficeRankingCarousel';
import HighestRankingCarousel from './global/HighestRankingCarousel';

export function MovieRanking({ $target, initialState }) {
  const $movieRanking = document.createElement('div');
  $target.appendChild($movieRanking);

  this.state = { title: initialState.title, movieRanking: initialState.movieRanking };

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    $movieRanking.innerHTML = `
      <section class="movie-container">
        <div class="outer">
          <div class="inner">
            <div class="movie-ranking">
              <span>${this.state.title}</span>
            </div>
          </div>
        </div> 
        <div class="carousel ${this.state.title === '별점 높은 순' ? 'box-office' : 'highest-ranking'}">
        
        </div>
      </section>`;

    this.state.title === '별점 높은 순'
      ? new BoxOfficeRankingCarousel({
          $target: $movieRanking.querySelector('.carousel'),
          initialState: this.state.movieRanking,
        }).render().innerHTML
      : new HighestRankingCarousel({
          $target: $movieRanking.querySelector('.carousel'),
          initialState: this.state.movieRanking,
        }).render().innerHTML;
  };
  this.render();
}
