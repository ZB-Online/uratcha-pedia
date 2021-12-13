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

function render(route) {
  document.querySelector('.app').innerHTML = route();
}

export function initialRoute() {
  render(routes['/']);
  window.onpopstate = () => {
    render(routes[window.location.pathname]);
  };
}

export function router(route, pathName) {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  render(routes[route]);
}
