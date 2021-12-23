import Wrapper from '../components/Wrapper';
import { MovieRanking } from '../components/MovieRanking';
import { eventListeners } from '../eventListeners';
import { bindMovieRankingCarouselEvents } from '../utils/carousel.js';
import { fetchUser, fetchMovie } from '../services/index.js';
import { defaultMovie, defaultUser } from './initialState/index.js';

export default function HomePage({ $target }) {
  const $homePage = document.createElement('div');
  $target.appendChild($homePage);

  this.state = {
    boxOffice: defaultMovie.boxOffice,
    highestRanking: defaultMovie.highestRanking,
    user: defaultUser.user,
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

  const fetchInitialState = async () => {
    try {
      const user = await fetchUser.isAuth();
      const boxOffice = await fetchMovie.getBoxOffice();
      const highestRanking = [...boxOffice].sort((a, b) =>
        +b.averageStar >= +a.averageStar ? (+b.averageStar > +a.averageStar ? 1 : 0) : -1
      );
      this.setState({ ...this.state, boxOffice, highestRanking, user });
    } catch (e) {
      console.error('movie api not fetched: ', e);
    }
  };

  fetchInitialState();
}
