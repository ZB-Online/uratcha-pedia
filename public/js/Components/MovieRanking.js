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

    if (this.state.title === '박스 오피스') {
      $movieRanking.innerHTML = `
      <section class="movie-container">
        <div class="outer">
          <div class="inner">
            <div class="movie-ranking">
              <span>${this.state.title}</span>
            </div>
          </div>
        </div> 
        <div class="carousel box-office">
        ${
          new BoxOfficeRankingCarousel({ $target: $movieRanking, initialState: this.state.movieRanking }).render()
            .innerHTML
        }
        </div>
      </section>`;
    } else if (this.state.title === '별점 높은 순') {
      $movieRanking.innerHTML = `<section class="movie-container">
      <div class="outer">
        <div class="inner">
          <div class="movie-ranking">
            <span>${this.state.title}</span>
          </div>
        </div>
      </div> 
      <div class="carousel highest-ranking">
      ${
        new HighestRankingCarousel({ $target: $movieRanking, initialState: this.state.movieRanking }).render().innerHTML
      }
      </div>
    </section>
    `;
    }
  };
  this.render();
}
