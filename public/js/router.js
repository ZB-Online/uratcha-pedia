import Home from './pages/Home';
import Detail from './pages/MovieDetail';
import MyPage from './pages/MyPage';
import SearchResult from './pages/Search';

const routes = {
  '/': Home,
  '/home': Home,
  '/detail': Detail,
  '/mypage': MyPage,
  '/search': SearchResult,
};

function render() {
  const route = location.pathname;
  console.log(route);
  document.querySelector('.app').innerHTML = routes[route]();
}

export function initialRoute() {
  render(routes['/']);
  window.onpopstate = () => {
    render();
  };
}

export const eventListeners = () => {
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
    router(route);
  };

  $serachForm.onsubmit = e => {
    e.preventDefault();
    const route = $serachForm.getAttribute('route');
    router(route);
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
    router(route);
  };

  $myPageBtn.onclick = () => {
    const route = '/mypage';
    router(route);
  };
};

export function router(pathName) {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  render();
  eventListeners();
}
