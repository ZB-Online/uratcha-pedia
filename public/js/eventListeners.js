import { routeChange } from './router';
import fetch from './utils/fetch.js';

export const eventListeners = () => {
  const $headerLogo = document.querySelector('header .logo');
  const $searchForm = document.querySelector('.search-form');
  const $myPageBtn = document.querySelector('.my-page .btn');
  const $signinBtn = document.querySelector('.sign-in .btn');
  const $signupBtn = document.querySelector('.sign-up .btn');
  const $signModal = document.querySelector('.sign-modal');
  const $signinModal = document.querySelector('.signin-modal');
  const $signupModal = document.querySelector('.signup-modal');
  const $singinForm = document.querySelector('.form.signin');
  const $myPage = document.querySelector('.my-page');
  const $signin = document.querySelector('.sign-in');
  const $signup = document.querySelector('.sign-up');

  $headerLogo.onclick = () => {
    const route = '/';
    routeChange(route);
  };

  $searchForm.onsubmit = e => {
    e.preventDefault();
    const keyword = document.querySelector('.search-input').value;
    const route = `/search/${keyword}`;
    routeChange(route);
  };

  $signinBtn.onclick = () => {
    $signModal.classList.remove('hidden');
    $signinModal.classList.remove('hidden');
    $signupModal.classList.add('hidden');
  };

  $signupBtn.onclick = () => {
    $signModal.classList.remove('hidden');
    $signupModal.classList.remove('hidden');
    $signinModal.classList.add('hidden');
  };

  $myPageBtn.onclick = () => {
    const route = '/mypage';
    routeChange(route);
  };

  $singinForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = $singinForm.email.value;
    const password = $singinForm.password.value;
    if (email.trim() === '' || password.trim() === '') {
      return;
    }
    try {
      const data = await fetch.post('/api/users/signin', {
        email,
        password,
      });
      if (!data.success) {
        alert('아이디/비밀번호가 틀렸습니다.');
        $singinForm.email.value = '';
        $singinForm.password.value = '';
        return;
      }

      $signModal.classList.add('hidden');
      $signinModal.classList.add('hidden');
      $signin.classList.add('hidden');
      $signup.classList.add('hidden');
      $myPage.classList.remove('hidden');
    } catch (err) {
      alert(err);
    }
  });
};
