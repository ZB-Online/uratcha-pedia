export default function SimilarWorks({ $target, initialState }) {
  const $similarWorks = document.createElement('ul');
  $similarWorks.classList.add('similar-works-container');
  $target.appendChild($similarWorks);

  this.state = {
    movies: initialState.similarWorksData,
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    const { movies } = this.state;

    $similarWorks.innerHTML = movies
      .map(
        movie => `
        <li class="similar-works-item" data-movie-id="${movie.id}">
          <a href="javascript:void(0);">
            <img src="${movie.poster_path}" alt="poster" />
            <div class="similar-works-item__info">
              <div class="similar-works-item__title">
                ${movie.title}
              </div>
              <div class="search-result-item__category"><span>영화</span></div>
            </div>
          </a>
        </li>`
      )
      .join('');
  };

  this.render();
}
