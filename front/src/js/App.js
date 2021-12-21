import '../css/common.css';
import '../css/main.css';
import '../css/movie-detail.css';
import '../css/mypage.css';
import '../css/popup.css';
import '../css/search-result.css';
import '../css/spinner.css';

import HomePage from './pages/HomePage';
import SearchResultPage from './pages/SearchResultPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import MyPage from './pages/MyPage';
import { init } from './router';

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
