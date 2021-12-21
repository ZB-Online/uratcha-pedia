export default function MovieCommentCarousel({ $target, initialState }) {
  const $movieCommentCarousel = document.createElement('div');
  $movieCommentCarousel.classList.add('detail-container_comment-list', 'carousel-slides');
  $target.appendChild($movieCommentCarousel);

  this.state = {
    comments: initialState,
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
    this.bindEvents();
  };

  this.render = () => {
    if (!this.state) return;

    const { comments } = this.state;

    $movieCommentCarousel.innerHTML = `
      ${comments
        .map(
          ({ movieId, userEmail, score, comment }) =>
            `<div class="detail-container_comment-item" data-movie-id="${movieId}">
              <div class="detail-container_comment-item-header">
              <span class="detail-container_user-name">${userEmail}</span>
              ${
                score
                  ? `<div class="detail-container_user-score">★<span>${score}.0</span></div>`
                  : `<div class="detail-container_user-score hide"></div>`
              }
            </div>
            <p class="detail-container_user-content">
              ${comment}
            </p>
            </div>
          `
        )
        .join('')}
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
            </button>`;
    return $movieCommentCarousel;
  };

  this.bindEvents = () => {
    bindMovieCommentCarouselEvents(
      document.querySelector('.detail-container_comment-container'),
      this.state.reviewsByMovieId
    );
  };

  this.render();
}
