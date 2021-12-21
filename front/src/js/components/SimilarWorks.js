import { routeChange } from '../router';
import noImage from 'Images/no_image.png';

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
    this.bindEvents();
  };

  this.render = () => {
    if (!this.state) return;

    const { movies } = this.state;

    $similarWorks.innerHTML = movies
      ?.map(
        ({ id, poster_path, title }) => `
        <li class="similar-works-item" data-movie-id="${id}">
          <a href="javascript:void(0);">
            <img src="${poster_path ? poster_path : noImage}" alt="poster" />
            <div class="similar-works-item__info">
              <div class="similar-works-item__title">
                ${title}
              </div>
              <div class="search-result-item__category"><span>Movies</span></div>
            </div>
          </a>
        </li>`
      )
      .join('');
  };

  this.bindEvents = () => {
    $similarWorks.addEventListener('click', ({ target }) => {
      const movieId = target.closest('li').dataset.movieId;
      routeChange(`/movies/${movieId}`);
    });
  };

  this.render();
  this.bindEvents();
}
