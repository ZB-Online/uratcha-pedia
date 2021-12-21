import logoImage from 'Images/uratcha_logo.PNG';
import fetch from '../utils/fetch';
import logoImageSmall from 'Images/uratcha_logo_small.png';

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
                }" id="search-input" class="search-input" placeholder="Search contents, people, collections and users." />
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
            <button class="btn">Login</button>
          </li>
          <li class='sign-up'>
            <button class="btn btn--white">Sign Up</button>
          </li>
          <li class='my-page hidden'>
            <button class="btn btn--border">My Page</button>
          </li>
          <li class='logout hidden'>
            <button class="btn">LogOut</button>
          </li>
        </ul>
      </div>
    </div>
    `;

    return $header;
  };

  this.render();
  
}

const fetchTotalStars = async () => {
  const data = await fetch.get('/api/stars');
  const totalStars = await data.resData.starCount;
  return totalStars;
};

function Footer({ $target, initialState }) {
  const $footer = document.createElement('footer');
  $target.appendChild($footer);

  this.state = initialState;

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = async () => {
    if (!this.state) return;

    const totalStars = await fetchTotalStars();

    $footer.innerHTML = `
    <!-- FOOTER -->
      <footer>
        <section class="score-info">
          <div class="outer">
            <div class="inner">
              <div >
                <span class="total-scores">So far <em>★ ${totalStars
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ratings</em> have made.</span>
              </div>
            </div>
          </div>
        </section>
        <section class="info">
          <div class="outer">
            <div class="inner">
              <ul class="menu">
                <li><a href="javascript:void(0)">Source of Data</a></li>
                <li><a href="javascript:void(0)">Terms of Service</a></li>
                <li><a href="javascript:void(0)">Privacy Policy</a></li>
                <li><a href="javascript:void(0)">About UratchaPedia</a></li>
              </ul>
              <ul class="customer-service">
                <li><a href="javascript:void(0)">Customer Support</a></li>
                <li><a href="javascript:void(0)">support@watcha.com</a></li>
              </ul>
              <ul class="logo">
                <li>
                  <a href="javascript:void(0)"><img src="${logoImageSmall}" alt="WATCHA_LOGO"></a>
                </li>
                <li>
                  <span>© 2021 by URATCHA, Inc. All rights reserved.</span>
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
         <div class="confirm-title">Alert</div>
         <div class="confirm-content">Are you sure you want to log out?</div>
       </div>
       <div class="confirm-btn-container">
        <button class="confirm-btn confirm-cancel-btn">Cancel</button>
        <button class="confirm-btn confirm-ok-btn">Confirm</button>
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
    const { pathname } = window.location;

    new Header({ $target: $wrapper, initialState });
    new Sign({ $target: $wrapper, initialState });
    components.forEach(
      ({ component, props }) => new component({ $target: $wrapper, initialState: props.initialState })
    );
    pathname !== '/mypage' && new Footer({ $target: $wrapper, initialState });

    return $wrapper;
  };
}
