import { renderMovieCommentCarousel } from '../utils/carousel';

export function MovieDetails({ $target, initialState }) {
  const $movieDetails = document.createElement('div');
  $target.appendChild($movieDetails);

  this.state = {
    movieDetails: initialState.movieDetails,
    reviewsByMovieId: initialState.reviewsByMovieId,
    myReview: initialState.myReview,
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    $movieDetails.innerHTML = `
    <section class="movie-details">
    <ul>
    <div class="outer">
        <div class="inner">
          <div class="movie-header">
            <img class="movie-header_movie-poster" src="${this.state.movieDetails.poster_path}" />
            <div class="movie-header_movie-article">
              <h1 class="movie-header_movie-title">${this.state.movieDetails.title}</h1>
              <p class="movie-header_movie-etc">
                <span class="movie-header_movie-yaer">${this.state.movieDetails.release_date.replace(/-.+/g, '')}</span>
                <span class="movie-header_divide-letter">・</span>
                <span class="movie-header_movie-genre">${this.state.movieDetails.genres.join('/')}</span>
                <span class="movie-header_divide-letter">・</span>
                <span class="movie-header_movie-country">${this.state.movieDetails.country}</span>
              </p>
              <p class="movie-header_movie-average">평균 ★3.9 (5만명)</p>
              <div class="movie-header_user-interaction">
                <div class="movie-header_score-container">
                  <p class="movie-header_score-letter">평가하기</p>
                  <div class="movie-header_score-btn-container">
                    <button class="movie-header_score-btn">☆</button>
                    <button class="movie-header_score-btn">☆</button>
                    <button class="movie-header_score-btn">☆</button>
                    <button class="movie-header_score-btn">☆</button>
                    <button class="movie-header_score-btn">☆</button>
                  </div>
                </div>
                <button class="movie-header_add-comment btn">
                  <div class="add-comment-icon-container"><span class="material-icons"> edit </span></div>
                  코멘트
                  <div class="comment-dropdown-container hidden">
                    <div class="edit-comment"><span class="material-icons"> edit </span>Edit Comment</div>

                    <div class="delete-comment"><span class="material-icons "> delete </span>Delete Comment</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class="comment-modal-container hidden">
            <div class="backdrop"></div>
              <div id="comment-modal">
                <div class="modal-container">
                  <div class="comment-modal-header">
                    <div class="close-comment">
                      <button aria-label="close" class="close-comment-btn"></button>
                    </div>
                    <em class="comment-title">Spider-Man: No Way Home</em>
                    <div class="write-comment">
                      <button class="write-comment-btn" disabled>Comment</button>
                    </div>
                  </div>
                <div class="comment-main">
                  <div class="comment-content">
                    <textarea
                      placeholder="Feel free to write on this title"
                      class="comment-textarea"
                    ></textarea>
                    <div class="writed-content"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
    
    <div class="detail-container ">
      <ul class="my-comment-container comment hidden">
        <li>
          <ul class="my-comment">
            <li>
              <span class="username">${this.state.myReview.userEmail}</span>
            </li>
            <li>
              <span class="comment-content">${this.state.myReview.comment}</span>
            </li>
          </ul>
        </li>
        <li>
          <ul class="my-comment">
            <li>
              <button class="my-comment-container_btn del-btn">
                <span class="material-icons "> delete_outline </span>Delete
              </button>
            </li>
            <li>
              <button class="my-comment-container_btn edit-btn">
                <span class="material-icons"> edit </span>Edit
              </button>
            </li>
          </ul>
        </li>
      </ul>

      <ul class="my-comment-container leave-comment">
          <div class="my-comment">
              <span class="username">Please share your thought</span>
          </div>
          <div class="my-comment">
              <button class="movie-header_add-comment btn--white">Leave Comment</button>
          </div>
      </ul>
    </div>
      
          <div class="detail-container">
            <div class="detail-container_movie-info">
              <h2 class="detail-container_title">기본 정보</h2>
              <div class="detail-container_summary">
                <p class="detail-container_movie-item">${this.state.movieDetails.title}</p>
                <p class="detail-container_movie-item">
                  <span class="detail-container_movie-yaer">${this.state.movieDetails.release_date.replace(
                    /-.+/g,
                    ''
                  )}</span>
                  <span class="detail-container_divide-letter">・</span>
                  <span class="detail-container_movie-genre">${this.state.movieDetails.genres.join('/')}</span>
                  <span class="detail-container_divide-letter">・</span>
                  <span class="detail-container_movie-country">${this.state.movieDetails.country}</span>
                </p>
                <p class="detail-container_movie-item">
                  <span class="detail-container_movie-time">${this.state.movieDetails.runtime} Mins</span>
                  <span class="detail-container_divide-letter">・</span>
                  <span class="detail-container_movie-age">12세</span>
                </p>
              </div>
              <p class="detail-container_movie-story">
              ${this.state.movieDetails.overview}
              </p>
            </div>
      
            <div class="detail-container_cast">
              <h2 class="detail-container_title">출연/제작</h2>
              <div class="detail-container_cast-container">
                <div class="detail-container_cast-item">
                  <p class="detail-container_real-name">드니 빌뇌브</p>
                  <span class="detail-container_role">감독</span>
                </div>
                <div class="detail-container_cast-item">
                  <p class="detail-container_real-name">티모시 샬라메</p>
                  <span class="detail-container_role">주연</span
                  ><span class="detail-container_cast-divider">|</span
                  ><span class="detail-container_role-name">폴 아트레이드</span>
                </div>
                <div class="detail-container_cast-item">
                  <p class="detail-container_real-name">레베카 퍼거슨</p>
                  <span class="detail-container_role">주연</span
                  ><span class="detail-container_cast-divider">|</span
                  ><span class="detail-container_role-name">레이디 제시카</span>
                </div>
                <div class="detail-container_cast-item">
                  <p class="detail-container_real-name">오스카 아이삭</p>
                  <span class="detail-container_role">주연</span
                  ><span class="detail-container_cast-divider">|</span
                  ><span class="detail-container_role-name">레토 아트레이드</span>
                </div>
                <div class="detail-container_cast-item">
                  <p class="detail-container_real-name">젠데이아</p>
                  <span class="detail-container_role">주연</span
                  ><span class="detail-container_cast-divider">|</span
                  ><span class="detail-container_role-name">챠니</span>
                </div>
                <div class="detail-container_cast-item">
                  <p class="detail-container_real-name">조쇠 브롤린</p>
                  <span class="detail-container_role">주연</span
                  ><span class="detail-container_cast-divider">|</span
                  ><span class="detail-container_role-name">거니 할렉</span>
                </div>
              </div>
            </div>
                <div class="detail-container_comment">
                  <div class="detail-container_title-container">
                    <h2 class="detail-container_title">코멘트</h2>
                    <span class="detail-container_comment-count">7500+</span>
                    <a class="detail-container_comment-more">더보기</a>
                  </div>
                  <div class="detail-container_comment-container">
                    ${renderMovieCommentCarousel(this.state.reviewsByMovieId)}
                  </div>
                </div>
              </div>
        </div>
      </div>
      </ul>
      </section>
    `;

    return $movieDetails;
  };

  this.render();
}
