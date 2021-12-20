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

import HomePage from './pages/HomePage';
import SearchResultPage from './pages/SearchResultPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import MyPage from './pages/MyPage';
import { init } from './router';
import { eventListeners } from './eventListeners';
import useFetch from './utils/useFetch';

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = window.location;
    $target.innerHTML = ``;

    if (pathname === '/') {
      new HomePage({ $target });
    } else if (pathname.indexOf('/search/') === 0) {
      const [, , keyword] = pathname.split('/');
      new SearchResultPage({ $target, initialState: decodeURI(keyword) });
    } else if (pathname.indexOf('/movies/') === 0) {
      const [, , movieId] = pathname.split('/');
      new MovieDetailsPage({ $target, initialState: +movieId });
    } else if (pathname === '/mypage') {
      new MyPage({ $target });
    }
  };

  init(this.route);

  this.route();

  window.addEventListener('popstate', this.route);
}
