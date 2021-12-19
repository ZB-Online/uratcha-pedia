import MovieCommentCarousel from './global/MovieCommentCarousel';
import SimilarWorks from './SimilarWorks';
import StarsGraph from './StarsGraph';

export function MovieDetails({ $target, initialState }) {
  const $movieDetails = document.createElement('div');
  $target.appendChild($movieDetails);

  this.state = {
    movieDetails: initialState.movieDetails,
    reviewsByMovieId: initialState.reviewsByMovieId,
    starsData: initialState.starsData,
    averageStarsData: initialState.averageStarsData,
    similarWorksData: initialState.similarWorksData,
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

    const { averageStarsData, starsData } = this.state;
    const { averageStar } = averageStarsData;

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

            <section class="detail-container__stars-graph">
              <div class="detail-container__title-container">
                <h2 class="detail-container__title">별점 그래프</h2>
                <span class="detail-container__info">
                  <p>평균 ★${averageStar}</p>
                  <strong>(${starsData?.length}명)</strong>
                </span>
              </div>
              <div class="detail-container__graph-container">
                
              </div>
            </section>

            <div class="detail-container_comment">
              <div class="detail-container_title-container">
                <h2 class="detail-container_title">코멘트</h2>
                <span class="detail-container_comment-count">${this.state.reviewsByMovieId.length}</span>
                <a class="detail-container_comment-more">더보기</a>
              </div>
              <div class="detail-container_comment-container">
                ${
                  new MovieCommentCarousel({
                    $target: $movieDetails,
                    initialState: this.state.reviewsByMovieId,
                  }).render().innerHTML
                }
              </div>
            </div>

            <div class="detail-container__similar-works">
              <h2 class="detail-container__title">비슷한 작품</h2>
              <div class="detail-container__similar-works-container">
                
              </div>
            </div>
          </div>
        </div>
      </div>
      </ul>
      </section>
    `;

    new StarsGraph({
      $target: $movieDetails.querySelector('.detail-container__graph-container'),
      initialState: { starsData: this.state.starsData },
    });

    new SimilarWorks({
      $target: $movieDetails.querySelector('.detail-container__similar-works-container'),
      initialState: { similarWorksData: this.state.similarWorksData },
    });

    return $movieDetails;
  };

  this.render();
}
