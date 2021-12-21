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

  this.render();
}
