const titleFormat = title => {
  if (title.length === 0) return '';
  return title.length >= 33 ? title.slice(0, 33) + '...' : title;
};

export const bindCarouselEvents = ($container, items, duration, itemsPerPage) => {
  let $carouselPrevBtn = $container.querySelector('.carousel-control.prev');
  let $carouselNextBtn = $container.querySelector('.carousel-control.next');
  let $carouselSlides = $container.querySelector('.carousel-slides');

  $carouselPrevBtn.style.visibility = 'hidden';

  const DURATION = duration;
  const ITEMS_PER_PAGE = itemsPerPage;
  const itemNumber = items.length;

  let currentSlide = 0;
  let isMoving = false;

  const move = (currentSlide, duration = 0) => {
    if (duration) isMoving = true;

    $carouselSlides.style.setProperty('--duration', duration);

    $carouselSlides.style.setProperty('--currentSlide', currentSlide);
  };

  $container.onclick = ({ target }) => {
    if (
      (!target.classList.contains('carousel-control') && !target.classList.contains('carousel-control-image')) ||
      isMoving
    )
      return;

    let nextSlide = target.classList.contains('prev') ? -1 : 1;

    currentSlide += 1 * nextSlide;

    if (currentSlide < 0) currentSlide = 0;

    let restItems = itemNumber - currentSlide * ITEMS_PER_PAGE < 1 ? 0 : itemNumber - currentSlide * ITEMS_PER_PAGE;

    if (restItems < ITEMS_PER_PAGE) {
      currentSlide += +(restItems / ITEMS_PER_PAGE - 1).toFixed(3);
    }

    if (currentSlide > 0) {
      $carouselPrevBtn.style.visibility = 'visible';
      $carouselNextBtn.style.visibility =
        +currentSlide.toFixed(3) >= +(itemNumber / ITEMS_PER_PAGE - 1).toFixed(3) ? 'hidden' : 'visible';
    } else if (currentSlide === 0) {
      $carouselPrevBtn.style.visibility = 'hidden';
      $carouselNextBtn.style.visibility = 'visible';
    }

    move(currentSlide, DURATION);
  };

  $container.ontransitionend = () => {
    isMoving = false;
  };
};

export const renderMovieCarousel = movies => {
  const template = [];

  template.push(`<ul class="carousel-slides">`);

  template.push(
    movies
      .map((movie, i) => {
        let temp = `
          <li class="movie-item" data-movie-id="${movie?.id}">
            <div class="movie-item-container">
             <div class="movie-poster">
              <div class="movie-poster-num" data-num="${i}">${i + 1}</div>
              <img src="${movie?.poster_path}" alt="movie-poster" />
            </div>
            <div class="movie-detail">
             <span class="movie-title">${movie?.title ? titleFormat(movie.title) : ''}</span>
             <div class="movie-info">
              <span class="movie-year">${movie?.release_date}</span>
              <span>ㆍ</span>
              <span class="movie-country">${movie?.country}</span>
             </div>
              <div>연령등급 : ${movie?.certification}</div>
              <span class="movie-score">평균★3.9</span>
             </div>
           </div>
          </li>`;
        return temp;
      })
      .join('')
  );

  template.push(`</ul>
    <button class="carousel-control prev">
      <img
        class="carousel-control-image prev"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgxMlYxNkgweiIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDYgOCkiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjMjkyQTMyIiBzdHJva2U9IiMyOTJBMzIiIHN0cm9rZS13aWR0aD0iLjM1IiBkPSJNMy40MjkgMTMuNDA5TDQuMzU0IDE0LjI1OCAxMC42OCA4LjQ2IDExLjE0MyA4LjAzNiA0LjM1NCAxLjgxMyAzLjQyOSAyLjY2MiA5LjI5MSA4LjAzNnoiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA2IDgpIi8+CiAgICA8L2c+Cjwvc3ZnPgo="
        alt="backward"
      />
    </button>
    <button class="carousel-control next">
      <img
        class="carousel-control-image next"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgxMlYxNkgweiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiMyOTJBMzIiIHN0cm9rZT0iIzI5MkEzMiIgc3Ryb2tlLXdpZHRoPSIuMzUiIGQ9Ik0zLjQyOSAxMy40MDlMNC4zNTQgMTQuMjU4IDEwLjY4IDguNDYgMTEuMTQzIDguMDM2IDQuMzU0IDEuODEzIDMuNDI5IDIuNjYyIDkuMjkxIDguMDM2eiIvPgogICAgPC9nPgo8L3N2Zz4K"
        alt="forward"
      />
    </button>`);
  return template.join('');
};

export const renderMovieCommentCarousel = movieComments => {
  const template = [];

  template.push(`
    <div class="detail-container_comment-list carousel-slides">
  `);

  template.push(
    movieComments
      .map(comment => {
        let temp = `
          <div class="detail-container_comment-item" data-movie-id="${comment?.movieId}">
          <div class="detail-container_comment-item-header">
          <span class="detail-container_user-name">${comment.userEmail}</span>
          <div class="detail-container_user-score">★ <span>5.0</span></div>
        </div>
        <p class="detail-container_user-content">
          ${comment?.comment}
        </p>
        </div>
      `;
        return temp;
      })
      .join('')
  );

  template.push(`</div>
  <button class="carousel-control prev">
      <img
        class="carousel-control-image prev"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgxMlYxNkgweiIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDYgOCkiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjMjkyQTMyIiBzdHJva2U9IiMyOTJBMzIiIHN0cm9rZS13aWR0aD0iLjM1IiBkPSJNMy40MjkgMTMuNDA5TDQuMzU0IDE0LjI1OCAxMC42OCA4LjQ2IDExLjE0MyA4LjAzNiA0LjM1NCAxLjgxMyAzLjQyOSAyLjY2MiA5LjI5MSA4LjAzNnoiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA2IDgpIi8+CiAgICA8L2c+Cjwvc3ZnPgo="
        alt="backward"
      />
    </button>
    <button class="carousel-control next">
      <img
        class="carousel-control-image next"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgxMlYxNkgweiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiMyOTJBMzIiIHN0cm9rZT0iIzI5MkEzMiIgc3Ryb2tlLXdpZHRoPSIuMzUiIGQ9Ik0zLjQyOSAxMy40MDlMNC4zNTQgMTQuMjU4IDEwLjY4IDguNDYgMTEuMTQzIDguMDM2IDQuMzU0IDEuODEzIDMuNDI5IDIuNjYyIDkuMjkxIDguMDM2eiIvPgogICAgPC9nPgo8L3N2Zz4K"
        alt="forward"
      />
    </button>`);
  return template.join('');
};

export const bindSearchedMovieCarouselEvents = ($container, movies) => {
  bindCarouselEvents($container, movies, 500, 6);
};

export const bindMovieCommentCarouselEvents = ($container, comments) => {
  bindCarouselEvents($container, comments, 700, 3);
};

export const bindBoxOfficeMovieCarouselEvents = ($container, movies) => {
  bindCarouselEvents($container, movies, 500, 5);
};

export const bindHighestRankingMovieCarouselEvents = ($container, movies) => {
  bindCarouselEvents($container, movies, 500, 5);
};

export const bindMyScoredMovieCarouselEvents = ($container, movies) => {
  bindCarouselEvents($container, movies, 300, 17);
};
