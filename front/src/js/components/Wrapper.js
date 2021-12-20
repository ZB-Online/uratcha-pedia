import logoImage from '../../img/uratcha_logo.PNG';

export function Header({ $target, initialState }) {
  const $header = document.createElement('header');
  $target.appendChild($header);

  this.state = initialState;

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    const { keyword } = this.state;

    $header.innerHTML = `
    <div class="outer">
      <div class="inner">
        <ul>
          <li>
            <a href="javascript:void(0)" class="logo">
              <img src='${logoImage}' alt="LOGO" />
            </a>
          </li>
          <li class="search">
            <form class="search-form" action="#">
              <span class="material-icons">search</span>
              <label for="search-input">
                <input type="text" value="${
                  keyword ? keyword : ''
                }" id="search-input" class="search-input" placeholder="콘텐츠, 인물, 컬렉션, 유저를 검색해보세요." />
                <!-- 입력 시 hidden 제거 -->
                <div class="cancel-btn hidden"> 
                  <span class="material-icons ">
                    cancel
                    </span>
                </div>
              </label>
            </form>
          </li>
          <li class='sign-in'>
            <button class="btn">로그인</button>
          </li>
          <li class='sign-up'>
            <button class="btn btn--white">회원가입</button>
          </li>
          <li class='my-page hidden'>
            <button class="btn btn--border">마이페이지</button>
          </li>
          <li class='logout hidden'>
            <button class="btn">로그아웃</button>
          </li>
        </ul>
      </div>
    </div>
    `;

    return $header;
  };

  this.render();
}

function Footer({ $target, initialState }) {
  const $footer = document.createElement('footer');
  $target.appendChild($footer);

  this.state = initialState;

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    $footer.innerHTML = `
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
                  <a href="javascript:void(0)"><img src="/img/watch_logo_s.PNG" alt="WATCHA_LOGO"></a>
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
  };

  this.render();
}

function Sign({ $target, initialState }) {
  const $sign = document.createElement('sign');
  $target.appendChild($sign);

  this.state = initialState;

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;
    $sign.innerHTML = `
  <!-- SIGNIN / SIGNUP POPUP -->
    <div class="sign-modal hidden">
      <div class="backdrop"></div>
      <div id="sign-modal">
        <div class="modal-container">
          <div class="signin-header">
            <span class="sign-logo"></span>
          </div>
          <h2 class="title"></h2>
          <section>
            <div class="signin-modal">
              <form class="form signin" action="#">
                <div class="input-container">
                  <label for="signin-email" class="input-label">
                    <input
                      type="email"
                      id="signin-email"
                      name="email"
                      required
                      autocomplete="off"
                      placeholder="email"
                      autofocus
                  />
                    <span class="valid hidden">
                      <box-icon name='check-circle' color="#1FA75C"></box-icon>
                    </span>
                    <span class="invalid hidden">
                    <box-icon name='error-circle' color="#FF2F62" ></box-icon>
                    </span>
                  </label>
                  <span class="error"></span>
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
                  />
                  <span class="valid hidden">
                      <box-icon name='check-circle' color="#1FA75C"></box-icon>
                    </span>
                    <span class="invalid hidden">
                    <box-icon name='error-circle' color="#FF2F62" ></box-icon>
                    </span>
                  </label>
                  <span class="error"></span>
                </div>
                <button type="submit" class="signin button">SIGN IN</button>
                <div class="link">
                  Not a member? <button class="to-signup-btn">Sign up now</button>
                </div>
              </form>
            </div>
          </section>
  
          <section>
            <div class="signup-modal hidden">
              <form class="form signup">
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
                  />
                  <span class="valid hidden">
                  <box-icon name='check-circle' color="#1FA75C"></box-icon>
                </span>
                <span class="invalid hidden">
                <box-icon name='error-circle' color="#FF2F62" ></box-icon>
                </span>
              </label>
              <span class="error"></span>
                </div>
  
                <div class="input-container">
                  <label for="signup-email" class="input-label">
                    <input
                      type="email"
                      id="signup-email"
                      name="email"
                      required
                      autocomplete="off"
                      placeholder="email"
                  /><span class="valid hidden">
                  <box-icon name='check-circle' color="#1FA75C"></box-icon>
                </span>
                <span class="invalid hidden">
                <box-icon name='error-circle' color="#FF2F62" ></box-icon>
                </span>
              </label>
              <span class="error"></span>
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
                  /><span class="valid hidden">
                  <box-icon name='check-circle' color="#1FA75C"></box-icon>
                </span>
                <span class="invalid hidden">
                <box-icon name='error-circle' color="#FF2F62" ></box-icon>
                </span>
              </label>
              <span class="error"></span>
                </div>
                <button type="submit" class="signup button">SIGN UP</button>
                <div class="link">
                  Already a member? <button class="to-signin-btn">Sign up now</button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="confirm-modal hidden">
      <div class="backdrop"></div>
      <div class="modal-container">
       <div class="confirm-main">
         <div class="confirm-title">알림</div>
         <div class="confirm-content">로그아웃 하시겠어요?</div>
       </div>
       <div class="confirm-btn-container">
        <button class="confirm-btn confirm-cancel-btn">취소</button>
        <button class="confirm-btn confirm-ok-btn">확인</button>
       </div>
      </div>
    </div>
  `;
  };

  this.render();
}

export default function Wrapper({ $target, initialState, components }) {
  $target.innerHTML = ``;

  const $wrapper = document.createElement('div');
  $target.appendChild($wrapper);

  this.state = initialState;

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    new Header({ $target: $wrapper, initialState });
    new Sign({ $target: $wrapper, initialState });
    components.forEach(
      ({ component, props }) => new component({ $target: $wrapper, initialState: props.initialState })
    );
    new Footer({ $target: $wrapper, initialState });

    return $wrapper;
  };
}
