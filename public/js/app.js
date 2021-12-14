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

// initialRoute();

// const eventListeners = () => {
//   const $headerLogo = document.querySelector('header .logo');
//   const $serachForm = document.querySelector('.search-form');
//   const $myPageBtn = document.querySelector('.my-page .btn');
//   const $signInBtn = document.querySelector('.sign-in .btn');
//   const $signUpBtn = document.querySelector('.sign-up .btn');
//   const $signModal = document.querySelector('.sign-modal');
//   const $signInModal = document.querySelector('.signin-modal');
//   const $signUpModal = document.querySelector('.signup-modal');
//   const $movieContainer = document.querySelector('.movie-container ul');

//   $headerLogo.onclick = () => {
//     const route = $headerLogo.getAttribute('route');
//     router(route, '/');
//   };

//   $serachForm.onsubmit = e => {
//     e.preventDefault();
//     const route = $serachForm.getAttribute('route');
//     router(route, '/search');
//   };

//   $signInBtn.onclick = () => {
//     $signModal.classList.remove('hidden');
//     $signInModal.classList.remove('hidden');
//     $signUpModal.classList.add('hidden');
//   };

//   $signUpBtn.onclick = () => {
//     $signModal.classList.remove('hidden');
//     $signUpModal.classList.remove('hidden');
//     $signInModal.classList.add('hidden');
//   };

//   $movieContainer.onclick = ({ target }) => {
//     if (!target.matches('.movie-item *')) return;
//     const route = '/detail';
//     router(route, '/detail');
//   };

//   $myPageBtn.onclick = () => {
//     const route = '/mypage';
//     router(route, '/mypage');
//   };
// };

// import Home from './pages/Home';

// const routes = {
//   '/': Home,
//   '/home': Home,
//   '/detail': Detail,
//   '/mypage': MyPage,
//   '/search': SearchResult,
// };

// export default function App({ $target }) {
//   this.route = () => {
//     const { pathname } = window.location;
//     $target.innerHTML = ``;
//     console.log(pathname);

//     if (pathname === '/') {
//       console.log(pathname);
//       router(route, '/');
//     } else if (pathname.indexOf('/search') !== -1) {
//       console.log(pathname);
//       router(route, '/search');
//     } else if (pathname.indexOf('/detail') !== -1) {
//       console.log(pathname);
//       router(route, '/detail');
//     } else if (pathname === '/mypage') {
//       console.log(pathname);
//       router(route, '/mypage');
//     }
//   };
//   foo.includes('a');
//   this.route();
// }

// window.onload = () => {
//   // init(() => {
//   //   router(location.pathname, location.pathname);
//   // });
//   new App({ $target: document.querySelector('.app') });
//   // eventListeners();
// };

import ProductListPage from './pages/ProductListPage';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import MovieDetailPage from './pages/MovieDetail';
import MyPage from './pages/MyPage';

// import { init } from './router';

// & : router
const ROUTE_CHANGE_EVENT = 'ROUTE_CHANGE';

export const init = onRouteChange => {
  window.addEventListener(ROUTE_CHANGE_EVENT, () => {
    console.log('init');
    onRouteChange();
  });
};

export const routeChange = (url, params) => {
  history.pushState(null, null, url);
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, params)); //{ detail: { url, params } }));
};
// & : App
export default function App({ $target }) {
  this.route = () => {
    const { pathname } = window.location;
    $target.innerHTML = ``;
    // console.log(pathname, $target);

    if (pathname === '/') {
      console.log('det');
      new HomePage({ $target }).render();
    } else if (pathname === '/search') {
      console.log('det');
      new SearchPage({ $target }).render();
    } else if (pathname.indexOf('/detail/') === 0) {
      console.log('det');
      const [, , movieId] = pathname.split('/');
      new MovieDetailPage({ $target, movieId }).render();
    } else if (pathname === '/mypage') {
      console.log('det');
      new MyPage({ $target }).render();
    }
  };

  init(this.route);

  this.route();
}
