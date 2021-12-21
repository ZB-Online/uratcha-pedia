import MovieCommentCarousel from './global/MovieCommentCarousel';
import SimilarWorks from './SimilarWorks';
import StarsGraph from './StarsGraph';
import noImage from '../../img/no_image.png';

export function MovieDetails({ $target, initialState }) {
  const $movieDetails = document.createElement('div');
  $target.appendChild($movieDetails);

  this.state = {
    movieDetails: initialState?.movieDetails,
    reviewsByMovieId: initialState?.reviewsByMovieId,
    starsData: initialState?.starsData,
    averageStarsData: initialState?.averageStarsData,
    similarWorksData: initialState?.similarWorksData,
    userReview: initialState?.userReview,
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    const { cast, certification, country, genres, overview, poster_path, release_date, runtime, title } =
      this.state.movieDetails;

    const { userEmail, comment } = this.state.userReview;

    const releaseYear = release_date?.slice(0, 4);
    const genresComb = genres?.join('/');

    const { averageStarsData, starsData } = this.state;
    const { averageStar } = averageStarsData;

    $movieDetails.innerHTML = `
    <section class="movie-details">
    <ul>
    <div class="outer">
        <div class="inner">
          <div class="movie-header">
            <img class="movie-header_movie-poster" src="${poster_path ? poster_path : noImage}" alt="movie-poster" />
            <div class="movie-header_movie-article">
              <h1 class="movie-header_movie-title">${title}</h1>
              <p class="movie-header_movie-etc">
                <span class="movie-header_movie-yaer">${releaseYear}</span>
                <span class="movie-header_divide-letter">・</span>
                <span class="movie-header_movie-genre">${genres?.length ? genresComb : 'None'}</span>
                <span class="movie-header_divide-letter">・</span>
                <span class="movie-header_movie-country">${country}</span>
              </p>
              <p class="movie-header_movie-average"> Average ★${averageStar} (${starsData?.length})</p>
              <div class="movie-header_user-interaction">
                <div class="movie-header_score-container">
                  <p class="movie-header_score-letter">Rate</p>
                  <div class="star-rating">
                  <input type="radio" id="5-star" name="rating" value="5" disabled />
                  <label for="5-star" class="star">&#9733;</label>
                  <input type="radio" id="4-star" name="rating" value="4" disabled />
                  <label for="4-star" class="star">&#9733;</label>
                  <input type="radio" id="3-star" name="rating" value="3" disabled />
                  <label for="3-star" class="star">&#9733;</label>
                  <input type="radio" id="2-star" name="rating" value="2" disabled />
                  <label for="2-star" class="star">&#9733;</label>
                  <input type="radio" id="1-star" name="rating" value="1" disabled />
                  <label for="1-star" class="star">&#9733;</label>
                  </div>
                </div>
                <button class="movie-header_add-comment btn">
                  <span class="add-comment-icon-container"><span class="material-icons"> edit </span></span>
                  <span>코멘트</span>
                  <div class="comment-dropdown-container hidden">
                    <div class="edit-comment"><span class="material-icons"> edit </span><span>Edit Comment</span></div>
                    <div class="delete-comment"><span class="material-icons "> delete </span><span>Delete Comment</span></div>
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
                    <em class="comment-title">${title}</em>
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

          <div class="detail-container user-comment">
            <ul class="my-comment-container comment hidden">
              <li>
                <ul class="my-comment">
                  <li>
                    <span class="username">${userEmail}</span>
                  </li>
                  <li>
                    <span class="comment-content">${comment}</span>
                  </li>
                </ul>
              </li>
              <li>
                <ul class="my-comment">
                  <li>
                    <button class="my-comment-container_btn del-btn">
                      <span class="material-icons "> delete_outline </span><span>Delete</span>
                    </button>
                  </li>
                  <li>
                    <button class="my-comment-container_btn edit-btn">
                      <span class="material-icons"> edit </span><span>Edit</span>
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
              <h2 class="detail-container_title">Overview</h2>
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
              <h2 class="detail-container_title">Cast/Crew</h2>
              <div class="detail-container_cast-container">
              ${cast?.reduce((acc, { name, character }) => {
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
                <h2 class="detail-container__title">Rating Graph</h2>
                <span class="detail-container__info">
                  <p>Avg ★${averageStar}</p>
                  <strong>(${starsData?.length})</strong>
                </span>
              </div>
              <div class="detail-container__graph-container">
                
              </div>
            </section>

            <div class="detail-container_comment">
              <div class="detail-container_title-container">
                <h2 class="detail-container_title">Comment</h2>
                <span class="detail-container_comment-count">${this.state.reviewsByMovieId.length}</span>
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
              <h2 class="detail-container__title">Similar Titles</h2>
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
