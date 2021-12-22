import { routeChange } from './router';
import fetch from './utils/fetch.js';
import { fetchUser } from './services/index';

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

  const FORM_TYPE = {
    SIGNIN: 'SIGNIN',
    SOGNUP: 'SIGNUP',
  };

  const FORM_VALUE = {
    EMAIL: 'EMAIL',
    PASSWORD: 'PASSWORD',
    USERNAME: 'USERNAME',
  };

  $headerLogo.addEventListener('click', _ => {
    const route = '/';
    routeChange(route);
  });

  $searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const keyword = document.querySelector('.search-input').value;
    const route = `/search/${keyword}`;
    routeChange(route);
  });

  $signinBtn.addEventListener('click', () => {
    $signModal.classList.remove('hidden');
    $signinModal.classList.remove('hidden');
    $signupModal.classList.add('hidden');
    $title.innerText = 'SIGN IN';
  });

  $signupBtn.addEventListener('click', () => {
    $signModal.classList.remove('hidden');
    $signupModal.classList.remove('hidden');
    $signinModal.classList.add('hidden');
    $title.innerText = 'SIGN UP';
  });

  $myPageBtn.addEventListener('click', () => {
    const route = '/mypage';
    routeChange(route);
  });

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

  document.querySelector('.confirm-ok-btn').addEventListener('click', () => {
    $confirmModal.classList.add('hidden');
    fetchUser.postUserLogout();
    if (window.location.pathname === '/mypage') {
      const route = '/';
      routeChange(route);
    }
    location.reload();
  });

  const resetForm = formType => {
    const resetStyle = (target, $valid, $invalid, $error) => {
      document.getElementById(target).parentNode.classList.remove('input-label--active');
      $valid.classList.add('hidden');
      $invalid.classList.add('hidden');
      $error.textContent = '';
    };

    if (formType === FORM_TYPE.SIGNIN) {
      resetStyle('signin-email', $signinEmailValid, $signinEmailInvalid, $signinEmailError);
      resetStyle('signin-password', $signinPasswordValid, $signinPasswordInvalid, $signinPasswordError);
      $singinForm.email.value = '';
      $singinForm.password.value = '';
    } else if (formType === FORM_TYPE.SIGNUP) {
      resetStyle('signup-email', $signupEmailValid, $signupEmailInvalid, $signupEmailError);
      resetStyle('signup-password', $signupPasswordValid, $signupPasswordInvalid, $signupPasswordError);
      resetStyle('signup-username', $signupUsernameValid, $signupUsernameInvalid, $signupUsernameError);
      $singupForm.username.value = '';
      $singupForm.email.value = '';
      $singupForm.password.value = '';
    }
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
    EMAIL: new RegExp(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/),
    PASSWORD: new RegExp(/[\w]{5,12}/),
    USERNAME: new RegExp(/[\w가-힣]{2,8}/),
  };

  const inputValid = (type, value, target, $valid, $invalid, $error) => {
    const errorMessage = {
      EMAIL: '정확하지 않은 이메일입니다.',
      PASSWORD: '비밀번호는 최소 5자리 이상이어야 합니다.',
      USERNAME: '정확하지 않은 이름입니다.',
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
      inputValid(FORM_VALUE.EMAIL, email, target, $signinEmailValid, $signinEmailInvalid, $signinEmailError);
    } else if (target.matches('#signin-password')) {
      inputValid(
        FORM_VALUE.PASSWORD,
        password,
        target,
        $signinPasswordValid,
        $signinPasswordInvalid,
        $signinPasswordError
      );
    }
  });

  $singinForm.addEventListener('submit', async e => {
    e.preventDefault();

    const email = $singinForm.email.value.trim();
    const password = $singinForm.password.value.trim();

    if (!regExp[FORM_VALUE.EMAIL].test(email) || !regExp[FORM_VALUE.PASSWORD].test(password)) {
      resetForm(FORM_TYPE.SIGNIN);
      return;
    }

    const response = await fetchUser.postSignin(email, password);

    if (!response.success) {
      alert(response.message);
      resetForm(FORM_TYPE.SIGNIN);
      return;
    }
    hiddenSignModal();
    changeAuthHeader();
    isAuth();
    location.reload();
  });

  $singupForm.addEventListener('keyup', ({ target }) => {
    const username = $singupForm.username.value.trim();
    const email = $singupForm.email.value.trim();
    const password = $singupForm.password.value.trim();

    if (target.matches('#signup-email')) {
      inputValid(FORM_VALUE.EMAIL, email, target, $signupEmailValid, $signupEmailInvalid, $signupEmailError);
    } else if (target.matches('#signup-password')) {
      inputValid(
        FORM_VALUE.PASSWORD,
        password,
        target,
        $signupPasswordValid,
        $signupPasswordInvalid,
        $signupPasswordError
      );
    } else if (target.matches('#signup-username')) {
      inputValid(
        FORM_VALUE.USERNAME,
        username,
        target,
        $signupUsernameValid,
        $signupUsernameInvalid,
        $signupUsernameError
      );
    }
  });

  $singupForm.addEventListener('submit', async e => {
    e.preventDefault();

    const username = $singupForm.username.value.trim();
    const email = $singupForm.email.value.trim();
    const password = $singupForm.password.value.trim();

    if (
      !regExp[FORM_VALUE.USERNAME].test(username) ||
      !regExp[FORM_VALUE.EMAIL].test(email) ||
      !regExp[FORM_VALUE.PASSWORD].test(password)
    ) {
      resetForm(FORM_TYPE.SIGNUP);
      return;
    }

    const response = await fetchUser.postSignup(email, password, username);

    if (!response.success) {
      alert(response.message);
      resetForm(FORM_TYPE.SIGNUP);
      return;
    }

    hiddenSignModal();
    changeAuthHeader();
    isAuth();
    location.reload();
  });

  $toSignupBtn.addEventListener('click', _ => {
    $signinModal.classList.add('hidden');
    $signupModal.classList.remove('hidden');
    $title.innerText = 'SIGN UP';
    resetForm(FORM_TYPE.SIGNIN);
  });

  $toSigninBtn.addEventListener('click', _ => {
    $signupModal.classList.add('hidden');
    $signinModal.classList.remove('hidden');
    $title.innerText = 'SIGN IN';
    resetForm(FORM_TYPE.SIGNUP);
  });

  $signModal.addEventListener('click', ({ target }) => {
    if (!target.matches('#sign-modal')) return;
    hiddenSignModal();
    resetForm(FORM_TYPE.SIGNIN);
    resetForm(FORM_TYPE.SIGNUP);
  });

  const isAuth = async () => {
    try {
      const response = await fetch.get('/api/users/auth');
      if (response.resData.isAuth) {
        changeAuthHeader();
      } else {
        $signin.classList.remove('hidden');
        $signup.classList.remove('hidden');
        $myPage.classList.add('hidden');
        $logout.classList.add('hidden');
      }
    } catch (err) {
      console.error(err);
    }
  };
  isAuth();
};
