import { routeChange } from './router';

export const eventListeners = () => {
  const $headerLogo = document.querySelector('header .logo');
  const $serachForm = document.querySelector('.search-form');
  const $myPageBtn = document.querySelector('.my-page .btn');
  const $signInBtn = document.querySelector('.sign-in .btn');
  const $signUpBtn = document.querySelector('.sign-up .btn');
  const $signModal = document.querySelector('.sign-modal');
  const $signInModal = document.querySelector('.signin-modal');
  const $signUpModal = document.querySelector('.signup-modal');

  $headerLogo.onclick = () => {
    const route = '/';
    routeChange(route);
  };

  $serachForm.onsubmit = e => {
    e.preventDefault();
    const route = '/search';
    routeChange(route);
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

  $myPageBtn.onclick = () => {
    const route = '/mypage';
    routeChange(route);
  };
};
