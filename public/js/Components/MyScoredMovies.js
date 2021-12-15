export function MyScoredMovies({ $target, initialState }) {
  const $myScoredMovies = document.createElement('div');
  $target.appendChild($myScoredMovies);

  this.state = {
    myScoredMovies: initialState.myScoredMovies,
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    $myScoredMovies.innerHTML = `
    <section class="mypage">
      <article class="container">
        <div class="my-scored-movies-header">
          <div class="my-scored-movies-header__back-button">&lt;-</div>
          <div class="my-scored-movies-header__title">영화</div>
        </div>
        <section class="my-scored-movies-container">
          <div class="my-scored-movies-container__header">
            <h2 class="my-scored-movies-container__title">평가</h2>
            <span class="my-scored-movies-container__number">9</span>
          </div>
          <div class="my-scored-movies-container__inner">
            <ul class="my-scored-movies-container__list">
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      평가함<i class="bx bxs-star bx-flip-horizontal"></i>5.0
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
              <li class="my-scored-movies-item">
                <a
                  title="반지의 제왕 : 반지 원정대"
                  href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd"
                >
                  <img src="https://picsum.photos/490/700" alt="poster" />
                  <div class="my-scored-movies-item__info">
                    <div class="my-scored-movies-item__title">
                      돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업
                    </div>
                    <div class="my-scored-movies-item__score">
                      <span>평가함 </span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </article>
    </section>`;

    return $myScoredMovies;
  };

  this.render();
}
