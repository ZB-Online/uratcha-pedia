import '../css/common.css';
import '../css/main.css';
import '../css/movie-detail.css';
import '../css/mypage.css';
import '../css/popup.css';
import '../css/search-result.css';
// import moviePoster from '../img/movie-poster.png';
// import watchaLogoS from '../img/watch_logo_s.png';
// import watchaLogo from '../img/watcha_logo.png';
// import poster from '../img/poster.jpeg';

import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import MovieDetailPage from './pages/MovieDetail';
import MyPage from './pages/MyPage';
import { init } from './router';
import { eventListeners } from './eventListeners';
import { renderMovies, renderMyScoredMovies } from './modules/movies';

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = window.location;
    $target.innerHTML = ``;

    if (pathname === '/') {
      const Home = new HomePage({ $target });
      Home.render();
      Home.event();
      renderMovies();
    } else if (pathname === '/search') {
      const Search = new SearchPage({ $target });
      Search.render();
      Search.event();
    } else if (pathname.indexOf('/detail/') === 0) {
      const [, , movieId] = pathname.split('/');
      const MovieDetail = new MovieDetailPage({ $target, movieId });
      MovieDetail.render();
      MovieDetail.event();
    } else if (pathname === '/mypage') {
      const MyPageP = new MyPage({ $target });
      MyPageP.render();
      MyPageP.event();
      renderMyScoredMovies();
    }
  };

  init(this.route);

  this.route();

  window.addEventListener('popstate', this.route);
}
