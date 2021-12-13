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

import { eventListeners, init, initialRoute, router } from './router';

initialRoute();

window.onload = () => {
  eventListeners();
};
