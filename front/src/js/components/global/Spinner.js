export default function Spinner({ $target, initialState }) {
  const $spinner = document.createElement('div');
  $spinner.classList.add();
  $target.appendChild($spinner);

  this.state = initialState;

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    $spinner.innerHTML = `
    <div class="loader">Loading...</div>
    `;
  };

  this.render();
}
