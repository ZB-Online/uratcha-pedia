import Wrapper from '../Components/Wrapper';
import { MovieRanking } from '../Components/MovieRanking';
import { eventListeners } from '../eventListeners';
import { routeChange } from '../router';
import fetch from '../utils/fetch.js';
import { mainCarousel } from '../utils/carousel.js';

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
            props: {
              initialState: { title: '박스 오피스', className: 'box-office', movieRanking: this.state.boxOffice },
            },
          },
          {
            component: MovieRanking,
            props: {
              initialState: { title: '별점 높은 순', className: 'top-ranking', movieRanking: this.state.boxOffice },
            },
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
      } else if (target.matches('.top-ranking *')) {
        const route = `/movies/${movieId}`;
        routeChange(route);
      }
    });

    // Carousel Events
    mainCarousel(document.querySelector('.carousel.box-office'), this.state.boxOffice);
    mainCarousel(document.querySelector('.carousel.top-ranking'), this.state.boxOffice);
  };

  const fetchBoxOffice = async () => {
    try {
      const data = await fetch.get('/api/movies');
      const boxOffice = data.resData;
      this.setState({ ...this.state, boxOffice });
    } catch (e) {
      console.error(e);
    }
  };

  fetchBoxOffice();
}
