import Wrapper from '../Components/Wrapper';
import { MovieRanking } from '../Components/MovieRanking';
import { eventListeners } from '../eventListeners';
import { routeChange } from '../router';
import fetch from '../utils/fetch.js';
import { bindBoxOfficeMovieCarouselEvents, bindHighestRankingMovieCarouselEvents } from '../utils/carousel.js';

export default function HomePage({ $target }) {
  const $homePage = document.createElement('div');
  $target.appendChild($homePage);

  this.state = {
    boxOffice: [],
    highestRanking: [],
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
    this.bindEvents();
  };

  this.render = () => {
    $homePage.appendChild(
      new Wrapper({
        $target: $homePage,
        initialState: this.state,
        components: [
          {
            component: MovieRanking,
            props: { initialState: { title: '박스 오피스', movieRanking: this.state.boxOffice } },
          },
          {
            component: MovieRanking,
            props: { initialState: { title: '별점 높은 순', movieRanking: this.state.highestRanking } },
          },
        ],
      }).render()
    );
  };

  this.bindEvents = () => {
    // Routing Events
    eventListeners();

    $homePage.addEventListener('click', ({ target }) => {
      if (!target.matches('.movie-item *')) return;
      const movieId = target.closest('.movie-item').dataset.movieId;
      if (target.matches('.box-office *')) {
        const route = `/movies/${movieId}`;
        routeChange(route);
      } else {
        const route = '/movies/2';
        routeChange(route);
      }
    });

    // Carousel Events
    bindBoxOfficeMovieCarouselEvents(document.querySelector('.carousel.box-office'), this.state.boxOffice);
  };

  const fetchBoxOffice = async () => {
    try {
      const data = await fetch.get('/api/movies');
      const boxOffice = data.resData;
      this.setState({ ...this.state, boxOffice });
    } catch (e) {
      console.error('movie api not fetched: ', e);
    }
  };

  fetchBoxOffice();
}
