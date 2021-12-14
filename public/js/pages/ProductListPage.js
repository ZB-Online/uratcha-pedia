export default function ProductListPage({ $target }) {
  const $page = document.createElement('div');
  $page.className = 'ProductListPage';

  $page.innerHTML = `<h1>Product List</h1>`;

  render($target, $page);
}

const render = ($target, $page) => {
  $target.appendChild($page);
};
