import { routeChange } from './router';
import fetch from './utils/fetch.js';

export const eventListeners = () => {
  const $headerLogo = document.querySelector('header .logo');
  const $searchForm = document.querySelector('.search-form');
  const $logoutBtn = document.querySelector('.logout .btn');
  const $myPageBtn = document.querySelector('.my-page .btn');
  const $signinBtn = document.querySelector('.sign-in .btn');
  const $signupBtn = document.querySelector('.sign-up .btn');
  const $signModal = document.querySelector('.sign-modal');
  const $signinModal = document.querySelector('.signin-modal');
  const $signupModal = document.querySelector('.signup-modal');
  const $singinForm = document.querySelector('.form.signin');
  const $logout = document.querySelector('.logout');
  const $myPage = document.querySelector('.my-page');
  const $signin = document.querySelector('.sign-in');
  const $signup = document.querySelector('.sign-up');
  const $singupForm = document.querySelector('.form.signup');
  const $toSignupBtn = document.querySelector('.to-signup-btn');
  const $toSigninBtn = document.querySelector('.to-signin-btn');
  const $title = document.querySelector('.title');
  const [$signinEmailValid, $signinPasswordValid, $signupUsernameValid, $signupEmailValid, $signupPasswordValid] =
    document.querySelectorAll('.valid');
  const [
    $signinEmailInvalid,
    $signinPasswordInvalid,
    $signupUsernameInvalid,
    $signupEmailInvalid,
    $signupPasswordInvalid,
  ] = document.querySelectorAll('.invalid');
  const [$signinEmailError, $signinPasswordError, $signupUsernameError, $signupEmailError, $signupPasswordError] =
    document.querySelectorAll('.error');
  const $confirmModal = document.querySelector('.confirm-modal');

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
    $title.innerText = 'SIGN IN';
  };

  $signupBtn.onclick = () => {
    $signModal.classList.remove('hidden');
    $signupModal.classList.remove('hidden');
    $signinModal.classList.add('hidden');
    $title.innerText = 'SIGN UP';
  };

  $myPageBtn.onclick = () => {
    const route = '/mypage';
    routeChange(route);
  };

  $logoutBtn.addEventListener('click', () => {
    $confirmModal.classList.remove('hidden');
  });

  $confirmModal.addEventListener('click', ({ target }) => {
    if (!target.matches('.backdrop')) return;
    $confirmModal.classList.add('hidden');
  });

  document.querySelector('.confirm-cancel-btn').addEventListener('click', () => {
    $confirmModal.classList.add('hidden');
  });

  document.querySelector('.confirm-ok-btn').addEventListener('click', async () => {
    $confirmModal.classList.add('hidden');
    console.log('logout');
    var bearer = 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.dGVzdDlAdGVzdC5jb20.UBSWiKnGLeEhrmwBxzRXlZKl9lAKAiaQtI7KJqgmQT8';
    try {
      const res = await fetch.get('/api/users/logout', {
        mothod: 'GET',
        headers: {
          'Authorization': bearer,
          'content-type': 'application/json',
        },
      });
      console.log(res);
    } catch (err) {
      alert(err);
    }
  });

  const resetValue = sign => {
    if (sign === 'signin') {
      $singinForm.email.value = '';
      $singinForm.password.value = '';
    } else {
      $singupForm.username.value = '';
      $singupForm.email.value = '';
      $singupForm.password.value = '';
    }
  };

  const resetStyle = (target, $valid, $invalid, $error) => {
    document.getElementById(target).parentNode.classList.remove('input-label--active');
    $valid.classList.add('hidden');
    $invalid.classList.add('hidden');
    $error.textContent = '';
  };

  const hiddenSignModal = () => {
    $signModal.classList.add('hidden');
    $signinModal.classList.add('hidden');
  };

  const changeAuthHeader = () => {
    $signin.classList.add('hidden');
    $signup.classList.add('hidden');
    $myPage.classList.remove('hidden');
    $logout.classList.remove('hidden');
  };

  const regExp = {
    email: new RegExp(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/),
    password: new RegExp(/[\w]{5,12}/),
    username: new RegExp(/[\w]{2,8}/),
  };
  const inputValid = (type, value, target, $valid, $invalid, $error) => {
    const errorMessage = {
      email: '정확하지 않은 이메일입니다.',
      password: '비밀번호는 최소 5자리 이상이어야 합니다.',
      username: '정확하지 않은 이름입니다.',
    };

    if (value === '') {
      target.parentNode.classList.remove('input-label--active');
      $error.textContent = '';
      $valid.classList.add('hidden');
      $invalid.classList.add('hidden');
    } else if (!regExp[type].test(value)) {
      target.parentNode.classList.add('input-label--active');
      $error.textContent = errorMessage[type];
      $valid.classList.add('hidden');
      $invalid.classList.remove('hidden');
    } else if (regExp[type].test(value)) {
      target.parentNode.classList.remove('input-label--active');
      $error.textContent = '';
      $valid.classList.remove('hidden');
      $invalid.classList.add('hidden');
    }
  };

  $singinForm.addEventListener('keyup', ({ target }) => {
    const email = $singinForm.email.value.trim();
    const password = $singinForm.password.value.trim();
    if (target.matches('#signin-email')) {
      inputValid('email', email, target, $signinEmailValid, $signinEmailInvalid, $signinEmailError);
    } else if (target.matches('#signin-password')) {
      inputValid('password', password, target, $signinPasswordValid, $signinPasswordInvalid, $signinPasswordError);
    }
  });

  $singinForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = $singinForm.email.value.trim();
    const password = $singinForm.password.value.trim();
    if (!regExp['email'].test(email) || !regExp['password'].test(password)) {
      resetValue('signin');
      resetStyle('signin-email', $signinEmailValid, $signinEmailInvalid, $signinEmailError);
      resetStyle('signin-password', $signinPasswordValid, $signinPasswordInvalid, $signinPasswordError);
      return;
    }

    try {
      const response = await fetch.post('/api/users/signin', {
        email,
        password,
      });
      if (!response.success) {
        alert(response.message);
        resetValue('signin');
        resetStyle('signin-email', $signinEmailValid, $signinEmailInvalid, $signinEmailError);
        resetStyle('signin-password', $signinPasswordValid, $signinPasswordInvalid, $signinPasswordError);
        return;
      }
      hiddenSignModal();
      changeAuthHeader();
      // localStorage.setItem('AUTH', JSON.stringify(response.resData));
    } catch (err) {
      alert(err);
    }
  });

  $singupForm.addEventListener('keyup', ({ target }) => {
    const username = $singupForm.username.value.trim();
    const email = $singupForm.email.value.trim();
    const password = $singupForm.password.value.trim();

    if (target.matches('#signup-email')) {
      inputValid('email', email, target, $signupEmailValid, $signupEmailInvalid, $signupEmailError);
    } else if (target.matches('#signup-password')) {
      inputValid('password', password, target, $signupPasswordValid, $signupPasswordInvalid, $signupPasswordError);
    } else if (target.matches('#signup-username')) {
      inputValid('username', username, target, $signupUsernameValid, $signupUsernameInvalid, $signupUsernameError);
    }
  });

  $singupForm.addEventListener('submit', async e => {
    e.preventDefault();
    const username = $singupForm.username.value.trim();
    const email = $singupForm.email.value.trim();
    const password = $singupForm.password.value.trim();

    if (!regExp['username'].test(username) || !regExp['email'].test(email) || !regExp['password'].test(password)) {
      resetValue('signup');
      resetStyle('signup-email', $signupEmailValid, $signupEmailInvalid, $signupEmailError);
      resetStyle('signup-password', $signupPasswordValid, $signupPasswordInvalid, $signupPasswordError);
      resetStyle('signup-username', $signupUsernameValid, $signupUsernameInvalid, $signupUsernameError);
      return;
    }
    try {
      const response = await fetch.post('/api/users/signup', {
        email,
        password,
        username,
      });
      console.log(response);
      if (!response.success) {
        alert(response.message);
        resetValue('signup');
        resetStyle('signup-email', $signupEmailValid, $signupEmailInvalid, $signupEmailError);
        resetStyle('signup-password', $signupPasswordValid, $signupPasswordInvalid, $signupPasswordError);
        resetStyle('signup-username', $signupUsernameValid, $signupUsernameInvalid, $signupUsernameError);
        return;
      }
      hiddenSignModal();
      changeAuthHeader();
    } catch (err) {
      alert(err);
    }
  });

  $toSignupBtn.addEventListener('click', _ => {
    $signinModal.classList.add('hidden');
    $signupModal.classList.remove('hidden');
    $title.innerText = 'SIGN UP';
  });

  $toSigninBtn.addEventListener('click', _ => {
    $signupModal.classList.add('hidden');
    $signinModal.classList.remove('hidden');
    $title.innerText = 'SIGN IN';
  });

  $signModal.addEventListener('click', ({ target }) => {
    if (!target.matches('#sign-modal')) return;
    hiddenSignModal();
    resetValue('signin');
    resetValue('signup');
    resetStyle('signin-email', $signinEmailValid, $signinEmailInvalid, $signinEmailError);
    resetStyle('signin-password', $signinPasswordValid, $signinPasswordInvalid, $signinPasswordError);
    resetStyle('signup-email', $signupEmailValid, $signupEmailInvalid, $signupEmailError);
    resetStyle('signup-password', $signupPasswordValid, $signupPasswordInvalid, $signupPasswordError);
    resetStyle('signup-username', $signupUsernameValid, $signupUsernameInvalid, $signupUsernameError);
  });
};
