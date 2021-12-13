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

import { initialRoute, router } from './router';

initialRoute();

const eventListeners = () => {
  const $headerLogo = document.querySelector('header .logo');
  const $serachForm = document.querySelector('.search-form');
  const $myPageBtn = document.querySelector('.my-page .btn');
  const $signInBtn = document.querySelector('.sign-in .btn');
  const $signUpBtn = document.querySelector('.sign-up .btn');
  const $signModal = document.querySelector('.sign-modal');
  const $signInModal = document.querySelector('.signin-modal');
  const $signUpModal = document.querySelector('.signup-modal');
  const $movieContainer = document.querySelector('.movie-container ul');

  $headerLogo.onclick = () => {
    const route = $headerLogo.getAttribute('route');
    router(route, '/');
  };

  $serachForm.onsubmit = e => {
    e.preventDefault();
    const route = $serachForm.getAttribute('route');
    router(route, '/search');
  };

  $signInBtn.onclick = () => {
    $signModal.classList.remove('hidden');
    $signInModal.classList.remove('hidden');
    $signUpModal.classList.add('hidden');
  };

  $signUpBtn.onclick = () => {
    $signModal.classList.remove('hidden');
    $signUpModal.classList.remove('hidden');
    $signInModal.classList.add('hidden');
  };

  $movieContainer.onclick = ({ target }) => {
    if (!target.matches('.movie-item *')) return;
    const route = '/detail';
    router(route, '/detail');
  };

  $myPageBtn.onclick = () => {
    const route = '/mypage';
    router(route, '/mypage');
  };
};

window.onload = () => {
  eventListeners();
};
