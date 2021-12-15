export function MyPageContents() {
  return `
  <section class="mypage">
      <article class="container">
        <div class="my-scored-movies-header">
          <div class="my-scored-movies-header__back-button">&lt;-</div>
          <div class="my-scored-movies-header__title">영화</div>
        </div>
        <section class="my-scored-movies-container">
          <div class="my-scored-movies-container__header">
            <h2 class="my-scored-movies-container__title">평가</h2>
            <span class="my-scored-movies-container__number"></span>
          </div>
          <div class="my-scored-movies-container__inner">
          </div>
        </section>
      </article>
    </section>`;
}
