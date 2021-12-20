import '../css/common.css';
import '../css/main.css';
import '../css/movie-detail.css';
import '../css/mypage.css';
import '../css/popup.css';
import '../css/search-result.css';

import HomePage from './pages/HomePage.js';
import SearchResultPage from './pages/SearchResultPage.js';
import MovieDetailsPage from './pages/MovieDetailsPage.js';
import MyPage from './pages/MyPage.js';
import { init } from './router.js';

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = window.location;
    $target.innerHTML = ``;

    if (pathname === '/') {
      new HomePage({ $target });
    } else if (pathname.indexOf('/search/') === 0) {
      const [, , keyword] = pathname.split('/');
      new SearchResultPage({ $target, initialState: keyword });
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
