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
  const $singupForm = document.querySelector('.form.signup');
  const $toSignupBtn = document.querySelector('.to-signup-btn');
  const $toSigninBtn = document.querySelector('.to-signin-btn');

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

  const emailValid = new RegExp(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/);
  const passwordValid = new RegExp(/[\w]{5,12}/);
  const usernameValid = new RegExp(/[\w]{2,8}/);

  $singinForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = $singinForm.email.value;
    const password = $singinForm.password.value;
    if (email.trim() === '' || password.trim() === '') {
      return;
    }

    const resetValue = () => {
      $singinForm.email.value = '';
      $singinForm.password.value = '';
    };

    if (!emailValid.test(email)) {
      alert('이메일 형식으로 입력해주세요');
      resetValue();
      return;
    } else if (!passwordValid.test(password)) {
      alert('비밀번호는 5자리 이상 12자리 이하입니다.');
      resetValue();
      return;
    }

    try {
      const response = await fetch.post('/api/users/signin', {
        email,
        password,
      });
      if (!response.success) {
        alert(response.message);
        resetValue();
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

  $singupForm.addEventListener('submit', async e => {
    e.preventDefault();
    const username = $singupForm.username.value;
    const email = $singupForm.email.value;
    const password = $singupForm.password.value;

    const resetValue = () => {
      $singupForm.username.value = '';
      $singupForm.email.value = '';
      $singupForm.password.value = '';
    };

    if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
      return;
    }

    if (!usernameValid.test(username)) {
      alert('닉네임은 2자 이상 8자리 이하입니다.');
      resetValue();
      return;
    } else if (!emailValid.test(email)) {
      alert('이메일 형식으로 입력해주세요');
      resetValue();
      return;
    } else if (!passwordValid.test(password)) {
      alert('비밀번호는 5자리 이상 12자리 이하입니다.');
      resetValue();
      return;
    }

    try {
      const response = await fetch.post('/api/users/signup', {
        email,
        password,
        username,
      });
      if (!response.success) {
        alert(response.message);
        resetValue();
        return;
      }
      $signModal.classList.add('hidden');
      $signupModal.classList.add('hidden');
      $signin.classList.add('hidden');
      $signup.classList.add('hidden');
      $myPage.classList.remove('hidden');
    } catch (err) {
      alert(err);
    }
  });

  $toSignupBtn.addEventListener('click', _ => {
    $signinModal.classList.add('hidden');
    $signupModal.classList.remove('hidden');
  });

  $toSigninBtn.addEventListener('click', _ => {
    $signupModal.classList.add('hidden');
    $signinModal.classList.remove('hidden');
  });

  $signModal.addEventListener('click', ({ target }) => {
    if (target.matches('#sign-modal')) {
      $signModal.classList.add('hidden');
      $signupModal.classList.add('hidden');
      $signinModal.classList.add('hidden');
    }
  });
};
