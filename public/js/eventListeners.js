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

  $logoutBtn.addEventListener('click', () => {});

  const resetValue = form => {
    if (form === 'SIGNIN') {
      $singinForm.email.value = '';
      $singinForm.password.value = '';
    } else {
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

  const emailValid = new RegExp(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/);
  const passwordValid = new RegExp(/[\w]{5,12}/);
  const usernameValid = new RegExp(/[\w]{2,8}/);

  $singinForm.addEventListener('keyup', ({ target }) => {
    const email = $singinForm.email.value.trim();
    const password = $singinForm.password.value.trim();
    if (target.matches('#signin-email')) {
      if (email === '') {
        target.parentNode.classList.remove('input-label--active');
        $signinEmailInvalid.classList.add('hidden');
        $signinEmailValid.classList.add('hidden');
        $signinEmailError.textContent = '';
      } else if (!emailValid.test(email)) {
        target.parentNode.classList.add('input-label--active');
        $signinEmailInvalid.classList.remove('hidden');
        $signinEmailValid.classList.add('hidden');
        $signinEmailError.textContent = '정확하지 않은 이메일입니다.';
      } else if (emailValid.test(email)) {
        target.parentNode.classList.remove('input-label--active');
        $signinEmailValid.classList.remove('hidden');
        $signinEmailInvalid.classList.add('hidden');
        $signinEmailError.textContent = '';
      }
    } else if (target.matches('#signin-password')) {
      if (password === '') {
        $signinPasswordInvalid.classList.add('hidden');
        $signinPasswordValid.classList.add('hidden');
        target.parentNode.classList.remove('input-label--active');
        $signinPasswordError.textContent = '';
      } else if (!passwordValid.test(password)) {
        target.parentNode.classList.add('input-label--active');
        $signinPasswordValid.classList.add('hidden');
        $signinPasswordInvalid.classList.remove('hidden');
        $signinPasswordError.textContent = '비밀번호는 최소 6자리 이상이어야 합니다.';
      } else if (passwordValid.test(password)) {
        target.parentNode.classList.remove('input-label--active');
        $signinPasswordValid.classList.remove('hidden');
        $signinPasswordInvalid.classList.add('hidden');
        $signinPasswordError.textContent = '';
      }
    }
  });

  $singinForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = $singinForm.email.value.trim();
    const password = $singinForm.password.value.trim();
    if (!emailValid.test(email) || !passwordValid.test(password)) {
      resetValue('SIGNIN');
      return;
    }

    try {
      const response = await fetch.post('/api/users/signin', {
        email,
        password,
      });
      if (!response.success) {
        alert(response.message);
        resetValue('SIGNIN');
        return;
      }
      hiddenSignModal();
      changeAuthHeader();
    } catch (err) {
      alert(err);
    }
  });

  $singupForm.addEventListener('keyup', ({ target }) => {
    const username = $singupForm.username.value.trim();
    const email = $singupForm.email.value.trim();
    const password = $singupForm.password.value.trim();

    if (target.matches('#signup-email')) {
      if (email === '') {
        target.parentNode.classList.remove('input-label--active');
        $signupEmailInvalid.classList.add('hidden');
        $signupEmailValid.classList.add('hidden');
        $signupEmailError.textContent = '';
      } else if (!emailValid.test(email)) {
        target.parentNode.classList.add('input-label--active');
        $signupEmailInvalid.classList.remove('hidden');
        $signupEmailValid.classList.add('hidden');
        $signupEmailError.textContent = '정확하지 않은 이메일입니다.';
      } else if (emailValid.test(email)) {
        target.parentNode.classList.remove('input-label--active');
        $signupEmailValid.classList.remove('hidden');
        $signupEmailInvalid.classList.add('hidden');
        $signupEmailError.textContent = '';
      }
    } else if (target.matches('#signup-password')) {
      if (password === '') {
        $signupPasswordInvalid.classList.add('hidden');
        $signupPasswordValid.classList.add('hidden');
        target.parentNode.classList.remove('input-label--active');
        $signupPasswordError.textContent = '';
      } else if (!passwordValid.test(password)) {
        target.parentNode.classList.add('input-label--active');
        $signupPasswordValid.classList.add('hidden');
        $signupPasswordInvalid.classList.remove('hidden');
        $signupPasswordError.textContent = '비밀번호는 최소 6자리 이상이어야 합니다.';
      } else if (passwordValid.test(password)) {
        target.parentNode.classList.remove('input-label--active');
        $signupPasswordValid.classList.remove('hidden');
        $signupPasswordInvalid.classList.add('hidden');
        $signupPasswordError.textContent = '';
      }
    } else if (target.matches('#signup-username')) {
      if (username === '') {
        $signupUsernameInvalid.classList.add('hidden');
        $signupUsernameValid.classList.add('hidden');
        target.parentNode.classList.remove('input-label--active');
        $signupUsernameError.textContent = '';
      } else if (!usernameValid.test(username)) {
        target.parentNode.classList.add('input-label--active');
        $signupUsernameValid.classList.add('hidden');
        $signupUsernameInvalid.classList.remove('hidden');
        $signupUsernameError.textContent = '정확하지 않은 이름입니다.';
      } else if (usernameValid.test(username)) {
        target.parentNode.classList.remove('input-label--active');
        $signupUsernameValid.classList.remove('hidden');
        $signupUsernameInvalid.classList.add('hidden');
        $signupUsernameError.textContent = '';
      }
    }
  });

  $singupForm.addEventListener('submit', async e => {
    e.preventDefault();
    const username = $singupForm.username.value.trim();
    const email = $singinForm.email.value.trim();
    const password = $singinForm.password.value.trim();

    if (username === '' || email === '' || password === '') {
      return;
    }

    if (!usernameValid.test(username) || !emailValid.test(email) || !passwordValid.test(password)) {
      resetValue('SIGNUP');
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
        resetValue('SIGNUP');
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
    if (target.matches('#sign-modal')) {
      hiddenSignModal()
      resetValue('SIGNIN');
      resetValue('SIGNUP');
      // css 활성화 해제
    }
  });
};
