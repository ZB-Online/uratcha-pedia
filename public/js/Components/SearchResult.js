export function SearchResultContent({ $target, initialState }) {
  const $searchResult = document.createElement('div');
  $target.appendChild($searchResult);

  this.state = {
    $searchResult: initialState.searchResult,
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    $searchResult.innerHTML = `
      <section class="search-result">
      <article class="container">
        <section class="search-result-header">
          <div class="outer">
            <div class="inner">
              <div class="search-result-title">
                <span>"반지의 제왕 왕의 귀환"</span>의 검색결과
              </div>
            </div>
          </div>
        </section>
        <section class="search-result-container">
        <div class="search-result-container__inner">
          <ul class="search-result-container__list">
            <li class="search-result-item">
              <a title="반지의 제왕 : 반지 원정대" href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd">
                <img src="https://picsum.photos/490/700" alt="poster" />
                <div class="search-result-item__info">
                  <div class="search-result-item__title">돈 룩 업돈 룩 업돈 룩 업돈 룩 업돈 룩 업</div>
                  <div class="search-result-item__subtitle">
                    <span>2003 ・ 미국/뉴질랜드/독일/한국/인도/일본</span>
                  </div>
                  <div class="search-result-item__category"><span>영화</span></div>
                </div>
              </a>
            </li>
            <li class="search-result-item">
              <a title="반지의 제왕 : 반지 원정대" href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd">
                <img src="https://picsum.photos/490/700" alt="poster" />
                <div class="search-result-item__info">
                  <div class="search-result-item__title">돈 룩 업</div>
                  <div class="search-result-item__subtitle">
                    <span>2003 ・ 미국/뉴질랜드/독일/한국/인도/일본</span>
                  </div>
                  <div class="search-result-item__category"><span>영화</span></div>
                </div>
              </a>
            </li>
            <li class="search-result-item">
              <a title="반지의 제왕 : 반지 원정대" href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd">
                <img src="https://picsum.photos/490/700" alt="poster" />
                <div class="search-result-item__info">
                  <div class="search-result-item__title">돈 룩 업</div>
                  <div class="search-result-item__subtitle">
                    <span>2003 ・ 미국/뉴질랜드/독일/한국/인도/일본</span>
                  </div>
                  <div class="search-result-item__category"><span>영화</span></div>
                </div>
              </a>
            </li>
            <li class="search-result-item">
              <a title="반지의 제왕 : 반지 원정대" href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd">
                <img src="https://picsum.photos/490/700" alt="poster" />
                <div class="search-result-item__info">
                  <div class="search-result-item__title">돈 룩 업</div>
                  <div class="search-result-item__subtitle">
                    <span>2003 ・ 미국/뉴질랜드/독일/한국/인도/일본</span>
                  </div>
                  <div class="search-result-item__category"><span>영화</span></div>
                </div>
              </a>
            </li>
            <li class="search-result-item">
              <a title="반지의 제왕 : 반지 원정대" href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd">
                <img src="https://picsum.photos/490/700" alt="poster" />
                <div class="search-result-item__info">
                  <div class="search-result-item__title">돈 룩 업</div>
                  <div class="search-result-item__subtitle">
                    <span>2003 ・ 미국/뉴질랜드/독일/한국/인도/일본</span>
                  </div>
                  <div class="search-result-item__category"><span>영화</span></div>
                </div>
              </a>
            </li>
            <li class="search-result-item">
              <a title="반지의 제왕 : 반지 원정대" href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd">
                <img src="https://picsum.photos/490/700" alt="poster" />
                <div class="search-result-item__info">
                  <div class="search-result-item__title">돈 룩 업</div>
                  <div class="search-result-item__subtitle">
                    <span>2003 ・ 미국/뉴질랜드/독일/한국/인도/일본</span>
                  </div>
                  <div class="search-result-item__category"><span>영화</span></div>
                </div>
              </a>
            </li>
            <li class="search-result-item">
              <a title="반지의 제왕 : 반지 원정대" href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd">
                <img src="https://picsum.photos/490/700" alt="poster" />
                <div class="search-result-item__info">
                  <div class="search-result-item__title">돈 룩 업</div>
                  <div class="search-result-item__subtitle">
                    <span>2003 ・ 미국/뉴질랜드/독일/한국/인도/일본</span>
                  </div>
                  <div class="search-result-item__category"><span>영화</span></div>
                </div>
              </a>
            </li>
            <li class="search-result-item">
              <a title="반지의 제왕 : 반지 원정대" href="https://pedia.watcha.com/ko-KR/contents/mP5mPzd">
                <img src="https://picsum.photos/490/700" alt="poster" />
                <div class="search-result-item__info">
                  <div class="search-result-item__title">돈 룩 업</div>
                  <div class="search-result-item__subtitle">
                    <span>2003 ・ 미국/뉴질랜드/독일/한국/인도/일본</span>
                  </div>
                  <div class="search-result-item__category"><span>영화</span></div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </article>
    </section>
  `;
    return $searchResult;
  };

  this.render();
}
