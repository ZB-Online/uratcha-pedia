// import Home from './pages/Home';
// import Detail from './pages/MovieDetail';
// import MyPage from './pages/MyPage';
// import SearchResult from './pages/Search';

// const ROUTE_CHANGE_EVENT = 'ROUTE_CHANGE';
// export const init = onRouteChange => {
//   window.addEventListener(ROUTE_CHANGE_EVENT, () => {
//     onRouteChange();
//   });
// };
// export const routeChange = (url, params) => {
//   history.pushState(null, null, url);
//   window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, params)); //{ detail: { url, params } }));
// };

// const routes = {
//   '/': Home,
//   '/home': Home,
//   '/detail': Detail,
//   '/mypage': MyPage,
//   '/search': SearchResult,
// };

// function render() {
//   const route = location.pathname;
//   console.log(route);
//   document.querySelector('.app').innerHTML = routes[route]();
// }

// export function initialRoute() {
//   render(routes['/']);
//   window.onpopstate = () => {
//     render(routes[window.location.pathname]);
//   };
// }

// export function router(url, pathName) {
//   window.history.pushState({}, pathName, window.location.origin + pathName);
//   render();
//   window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT));
// }
