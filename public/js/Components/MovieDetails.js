export function MovieDetail() {
  return `
  <section class="movie-details">
      <div class="outer">
        <div class="inner">
          <div class="movie-header">
            <img class="movie-header_movie-poster" src="./img/poster.jpeg" />
            <div class="movie-header_movie-article">
              <h1 class="movie-header_movie-title">듄</h1>
              <p class="movie-header_movie-etc">
                <span class="movie-header_movie-yaer">2021</span>
                <span class="movie-header_divide-letter">・</span>
                <span class="movie-header_movie-genre">액션/모험/SF</span>
                <span class="movie-header_divide-letter">・</span>
                <span class="movie-header_movie-country">미국</span>
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
                <p class="detail-container_movie-item">Dune</p>
                <p class="detail-container_movie-item">
                  <span class="detail-container_movie-yaer">2021</span>
                  <span class="detail-container_divide-letter">・</span>
                  <span class="detail-container_movie-genre">액션/모험/SF</span>
                  <span class="detail-container_divide-letter">・</span>
                  <span class="detail-container_movie-country">미국</span>
                </p>
                <p class="detail-container_movie-item">
                  <span class="detail-container_movie-time">2시간 35분</span>
                  <span class="detail-container_divide-letter">・</span>
                  <span class="detail-container_movie-age">12세</span>
                </p>
              </div>
              <p class="detail-container_movie-story">
                “듄을 지배하는 자가 우주를 지배한다!” 10191년, 아트레이데스 가문의
                후계자인 폴(티모시 샬라메)은 시공을 초월한 존재이자 전 우주를 구원할
                예지된 자의 운명을 타고났다. 그리고 어떤 계시처럼 매일 꿈에서 아라키스
                행성에 있는 한 여인을 만난다. 모래언덕을 뜻하는 \`듄\`이라 불리는
                아라키스는 물 한 방울 없는 사막이지만 우주에서 가장 비싼 물질인 신성한
                환각제 스파이스의 유일한 생산지로 이를 차지하기 위한 전쟁이 치열하다.
                황제의 명령으로 폴과 아트레이스 가문은 죽음이 기다리
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
                    <div class="detail-container_comment-item">
                      <div class="detail-container_comment-item-header">
                        <span class="detail-container_user-name">의식의 흐름</span>
                        <div class="detail-container_user-score">★ <span>5.0</span></div>
                      </div>
                      <p class="detail-container_user-content">
                        '듄'은 학생들이 무조건 봐야한다. 듄을 영어 타자로 치면 'ebs'이기
                        때문이다.
                      </p>
                    </div>
                    <div class="detail-container_comment-item">
                      <div class="detail-container_comment-item-header">
                        <span class="detail-container_user-name"
                          >긴이름긴이름긴이름긴이름긴이름긴이름</span
                        >
                        <div class="detail-container_user-score">★ <span>5.0</span></div>
                      </div>
                      <p class="detail-container_user-content">
                        방대한 원작을 압축하는 과정에서 마주하는 친절하지 않은 스토리는
                        다소 정신없이 산만하고, 어쩌면 지루하게 느껴질 수 있다. (전체 중
                        전반부에만 해당하기도 하고) 그럼에도, 그런 아쉬움을 뛰어넘는 '눈을
                        만족시키는 압도적인 비주얼'을 체험한다는 것 만으로도 이 영화는
                        후속작을 기다리며 즐길만한 가치가 충분히 있을 듯 하다.
                        ------------------------------------ 드니 빌뇌브 X 티모시 샬라메
                        와우!! 조합 미쳤다...👍 믿고 기대해도 되는거겠죠?
                      </p>
                    </div>
                    <div class="detail-container_comment-item">
                      <div class="detail-container_comment-item-header">
                        <span class="detail-container_user-name">이동진 평론가</span>
                        <div class="detail-container_user-score">★ <span>5.0</span></div>
                      </div>
                      <p class="detail-container_user-content">
                        하나의 세계를 명확히 채운 온도 습도 채도.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </section>
  `;
}
