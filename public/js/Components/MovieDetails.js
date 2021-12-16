import { renderMovieCommentCarousel } from '../utils/carousel';

export function MovieDetails({ $target, initialState }) {
  const $movieDetails = document.createElement('div');
  $target.appendChild($movieDetails);

  this.state = {
    movieDetails: initialState.movieDetails,
    reviewsByMovieId: initialState.reviewsByMovieId,
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    const { cast, certification, country, genres, id, overview, poster_path, release_date, runtime, title } =
      this.state.movieDetails;

    const releaseYear = release_date.slice(0, 4);
    const genresComb = genres.join('/');

    $movieDetails.innerHTML = `
    <section class="movie-details">
    <ul>
    <div class="outer">
        <div class="inner">
          <div class="movie-header">
            <img class="movie-header_movie-poster" src="${poster_path}" />
            <div class="movie-header_movie-article">
              <h1 class="movie-header_movie-title">${title}</h1>
              <p class="movie-header_movie-etc">
                <span class="movie-header_movie-yaer">${releaseYear}</span>
                <span class="movie-header_divide-letter">・</span>
                <span class="movie-header_movie-genre">${genresComb}</span>
                <span class="movie-header_divide-letter">・</span>
                <span class="movie-header_movie-country">${country}</span>
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
                <button class="movie-header_add-comment">
                  <box-icon
                    type="solid"
                    name="pencil"
                    animation="tada-hover"
                  ></box-icon>
                  코멘트
                </button>
              </div>
            </div>
          </div>
      
          <div class="detail-container">
            <div class="detail-container_movie-info">
              <h2 class="detail-container_title">기본 정보</h2>
              <div class="detail-container_summary">
                <p class="detail-container_movie-item">${title}</p>
                <p class="detail-container_movie-item">
                  <span class="detail-container_movie-yaer">${releaseYear}</span>
                  <span class="detail-container_divide-letter">・</span>
                  <span class="detail-container_movie-genre">${genresComb}</span>
                  <span class="detail-container_divide-letter">・</span>
                  <span class="detail-container_movie-country">${country}</span>
                </p>
                <p class="detail-container_movie-item">
                  <span class="detail-container_movie-time">${runtime} minutes</span>
                  <span class="detail-container_divide-letter">・</span>
                  <span class="detail-container_movie-age">${certification}</span>
                </p>
              </div>
              <p class="detail-container_movie-story">
                ${overview}
              </p>
            </div>
      
            <div class="detail-container_cast">
              <h2 class="detail-container_title">출연/제작</h2>
              <div class="detail-container_cast-container">
              ${cast.reduce((acc, { name, character }) => {
                acc += `<div class="detail-container_cast-item">
                  <p class="detail-container_real-name">${name}</p>
                  <span class="detail-container_role">${character}</span>
                </div>`;
                return acc;
              }, '')}
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

// <div class="detail-container_cast-item">
//                   <p class="detail-container_real-name">드니 빌뇌브</p>
//                   <span class="detail-container_role">감독</span>
//                 </div>
//                 <div class="detail-container_cast-item">
//                   <p class="detail-container_real-name">티모시 샬라메</p>
//                   <span class="detail-container_role">주연</span
//                   ><span class="detail-container_cast-divider">|</span
//                   ><span class="detail-container_role-name">폴 아트레이드</span>
//                 </div>
//                 <div class="detail-container_cast-item">
//                   <p class="detail-container_real-name">레베카 퍼거슨</p>
//                   <span class="detail-container_role">주연</span
//                   ><span class="detail-container_cast-divider">|</span
//                   ><span class="detail-container_role-name">레이디 제시카</span>
//                 </div>
//                 <div class="detail-container_cast-item">
//                   <p class="detail-container_real-name">오스카 아이삭</p>
//                   <span class="detail-container_role">주연</span
//                   ><span class="detail-container_cast-divider">|</span
//                   ><span class="detail-container_role-name">레토 아트레이드</span>
//                 </div>
//                 <div class="detail-container_cast-item">
//                   <p class="detail-container_real-name">젠데이아</p>
//                   <span class="detail-container_role">주연</span
//                   ><span class="detail-container_cast-divider">|</span
//                   ><span class="detail-container_role-name">챠니</span>
//                 </div>
//                 <div class="detail-container_cast-item">
//                   <p class="detail-container_real-name">조쇠 브롤린</p>
//                   <span class="detail-container_role">주연</span
//                   ><span class="detail-container_cast-divider">|</span
//                   ><span class="detail-container_role-name">거니 할렉</span>
//                 </div>
