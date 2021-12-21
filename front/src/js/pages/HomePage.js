import Wrapper from '../components/Wrapper';
import { MovieRanking } from '../components/MovieRanking';
import { eventListeners } from '../eventListeners';
import fetch from '../utils/fetch.js';
import isAuth from '../utils/auth';
import { bindMovieRankingCarouselEvents } from '../utils/carousel.js';

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

    bindMovieRankingCarouselEvents(document.querySelector('.carousel.box-office'), this.state.boxOffice);
    bindMovieRankingCarouselEvents(document.querySelector('.carousel.highest-ranking'), this.state.boxOffice);
  };

  const fetchBoxOffice = async () => {
    try {
      const { resData } = await fetch.get('/api/movies');
      const boxOffice = await Promise.all(
        resData.map(async movie => {
          const { resData } = await fetch.get(`/api/stars/${movie.id}`);
          return { ...movie, averageStar: resData.averageStar };
        })
      );
      return boxOffice;
    } catch (e) {
      console.error('movie api not fetched: ', e);
    }
  };

  const fetchMovieRanking = async () => {
    try {
      const user = await isAuth();
      const boxOffice = await fetchBoxOffice();
      const highestRanking = [...boxOffice].sort((a, b) =>
        +b.averageStar >= +a.averageStar ? (+b.averageStar > +a.averageStar ? 1 : 0) : -1
      );
      this.setState({ ...this.state, boxOffice, highestRanking, user });
    } catch (e) {
      console.error('movie api not fetched: ', e);
    }
  };

  fetchMovieRanking();
}
