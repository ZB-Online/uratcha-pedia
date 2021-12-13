function Header() {
  return `
  <header>
      <div class="outer">
        <div class="inner">
          <ul>
            <li>
              <a href="" class="logo" route="/">
                <img src="./img/watcha_logo.png"></img>
              </a>
            </li>
            <li class="search">
              <form class="search-form" action="#" route="/search">
                <span class="material-icons">search</span>
                <label for="search-input">
                  <input type="text" id="search-input" class="search-input" placeholder="콘텐츠, 인물, 컬렉션, 유저를 검색해보세요." />
                  <!-- 입력 시 hidden 제거 -->
                  <div class="cancel-btn hidden"> 
                    <span class="material-icons ">
                      cancel
                      </span>
                  </div>
                </label>
              </form>
            </li>
            <li class='sign-in hidden'>
              <button class="btn">로그인</button>
            </li>
            <li class='sign-up hidden'>
              <button class="btn btn--white">회원가입</button>
            </li>
            <li class='my-page '>
              <button class="btn">마이페이지</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  `;
}

function Footer() {
  return `
  <!-- FOOTER -->
    <footer>
      <section class="score-info">
        <div class="outer">
          <div class="inner">
            <div >
              <span class="total-scores">지금까지 <em>★ 1,000,000,000 개의 평가가</em> 쌓였어요.</span>
            </div>
          </div>
        </div>
      </section>
      <section class="info">
        <div class="outer">
          <div class="inner">
            <ul class="menu">
              <li><a href="javascript:void(0)">데이터 출처</a></li>
              <li><a href="javascript:void(0)">서비스 이용약관</a></li>
              <li><a href="javascript:void(0)">개인정보 처리방침</a></li>
              <li><a href="javascript:void(0)">회사 안내</a></li>
            </ul>
            <ul class="customer-service">
              <li><a href="javascript:void(0)">고객센터</a></li>
              <li><a href="javascript:void(0)">support@watcha.com</a></li>
            </ul>
            <ul class="logo">
              <li>
                <img src="./img/watch_logo_s.PNG" alt="WATCHA_LOGO">
              </li>
              <li>
                <span>© 2021 by WATCHA, Inc. All rights reserved.</span>
              </li>              
            </ul>
          </div>
        </div>
      </section>
    </footer>
  `;
}

function Sign() {
  return `
  <!-- SIGNIN / SIGNUP POPUP -->
    <div class="sign-modal hidden">
      <div class="backdrop"></div>
      <div id="sign-modal">
        <div class="modal-container">
          <div class="signin-header">
            <span class="sign-logo"></span>
          </div>
          <h2 class="title">SIGN IN</h2>
          <section>
            <div class="signin-modal">
              <form class="form signin" novalidate>
                <div class="input-container">
                  <label for="signin-email" class="input-label">
                    <input
                      type="text"
                      id="signin-email"
                      name="email"
                      required
                      autocomplete="off"
                      placeholder="email"
                      autofocus
                  /></label>
                  <span class="bar"></span>
                  <i class="icon icon-success bx bxs-check-circle"></i>
                  <i class="icon icon-error bx bxs-x-circle"></i>
                  <div class="error"></div>
                </div>
                <div class="input-container">
                  <label for="signin-password" class="input-label">
                    <input
                      type="password"
                      id="signin-password"
                      name="password"
                      required
                      autocomplete="off"
                      placeholder="password"
                  /></label>
                  <span class="bar"></span>
                  <i class="icon icon-success bx bxs-check-circle"></i>
                  <i class="icon icon-error bx bxs-x-circle"></i>
                  <div class="error"></div>
                </div>
                <button class="signin button" disabled>SIGN IN</button>
                <div class="link">
                  Not a member? <button>Sign up now</a>
                </div>
              </form>
            </div>
          </section>
  
          <section>
            <div class="signup-modal hidden">
              <form class="form signup" novalidate>
                <div class="input-container">
                  <label for="signup-username" class="input-label"
                    ><input
                      type="text"
                      id="signup-username"
                      name="username"
                      required
                      autocomplete="off"
                      placeholder="username"
                      autofocus
                  /></label>
                  <span class="bar"></span>
                  <i class="icon icon-success bx bxs-check-circle"></i>
                  <i class="icon icon-error bx bxs-x-circle"></i>
                  <div class="error"></div>
                </div>
  
                <div class="input-container">
                  <label for="signup-email" class="input-label">
                    <input
                      type="text"
                      id="signup-email"
                      name="email"
                      required
                      autocomplete="off"
                      placeholder="email"
                  /></label>
                  <span class="bar"></span>
                  <i class="icon icon-success bx bxs-check-circle"></i>
                  <i class="icon icon-error bx bxs-x-circle"></i>
                  <div class="error"></div>
                </div>
  
                <div class="input-container">
                  <label for="signup-password" class="input-label">
                    <input
                      type="password"
                      id="signup-password"
                      name="password"
                      required
                      autocomplete="off"
                      placeholder="password"
                  /></label>
                  <span class="bar"></span>
                  <i class="icon icon-success bx bxs-check-circle"></i>
                  <i class="icon icon-error bx bxs-x-circle"></i>
                  <div class="error"></div>
                </div>
                <button class="signup button" disabled>SIGN UP</button>
                <div class="link">
                  Already a member? <button>Sign up now</a>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  `;
}

export default function Wrapper(...Components) {
  return `
  ${Header()}${Sign()}
  ${Components.reduce((html, Component) => html + Component(), '')}
  ${Footer()}
  `;
}
