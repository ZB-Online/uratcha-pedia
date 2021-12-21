import Wrapper from '../components/Wrapper';
import { MovieRanking } from '../components/MovieRanking';
import { eventListeners } from '../eventListeners';
import { routeChange } from '../router';
import fetch from '../utils/fetch.js';
import { getCookieValue } from '../utils/cookie';
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
            props: { initialState: { title: 'Box Office', movieRanking: this.state.boxOffice } },
          },
          {
            component: MovieRanking,
            props: { initialState: { title: 'Highest Ranking', movieRanking: this.state.highestRanking } },
          },
        ],
      }).render()
    );
  };

  this.bindEvents = () => {
    eventListeners();

    bindBoxOfficeMovieCarouselEvents(document.querySelector('.carousel.box-office'), this.state.boxOffice);
    bindHighestRankingMovieCarouselEvents(document.querySelector('.carousel.highest-ranking'), this.state.boxOffice);
  };

  const fetchBoxOffice = async () => {
    try {
      const data = await fetch.get('/api/movies');
      const boxOffice = await Promise.all(
        data.resData.map(async movie => {
          const data = await fetch.get(`/api/stars/${movie.id}`);
          const averageStar = await data.resData.averageStar;
          return { ...movie, averageStar };
        })
      );
      return boxOffice;
    } catch (e) {
      console.error('movie api not fetched: ', e);
    }
  };

  const fetchHighestRanking = boxOffice => {
    try {
      const highestRanking = [...boxOffice].sort((a, b) => {
        return +b.averageStar >= +a.averageStar ? (+b.averageStar > +a.averageStar ? 1 : 0) : -1;
      });
      return highestRanking;
    } catch (e) {
      console.error('movie api not fetched: ', e);
    }
  };

  const fetchMovieRanking = async () => {
    try {
      const boxOffice = await fetchBoxOffice();
      const highestRanking = await fetchHighestRanking(boxOffice);
      this.setState({ ...this.state, boxOffice, highestRanking });
    } catch (e) {
      console.error('movie api not fetched: ', e);
    }
  };

  const isAuth = async () => {
    try {
      const token = getCookieValue();
      const response = await fetch.authGet('/api/users/auth', token);
      this.setState({ ...this.state, user: response?.resData });
    } catch (err) {
      console.error(err);
    }
  };

  isAuth();
  fetchMovieRanking();
}
