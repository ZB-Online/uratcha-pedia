# uratcha-pedia

영화 추천 및 평가 서비스

## 1. 주제 선정 이유

- 왓챠 플레이 유저로서, 평소 사용하던 서비스를 직접 개발
- SPA 라우팅과 상태 관리의 동작 원리 이해 및 구현
- 회원가입, 로그인, 로그아웃의 유저 관리 이해 및 구현
- 외부 API 사용 (The Movie Database) 경험

</br>

## 2. 프로젝트 인원

- 4명 (서대원, 이승연, 이본행, 조나현)

  </br>

## 3. 일정

- [일정](https://pickle-stocking-1c4.notion.site/f539eab766664b3e8852f80aa1c5826e)

- 프로젝트 기간 2021-12-10 ~ 2021-12-22 (13일)

</br>

## 4. 기술 스택

### BACKEND

- express
- jwt
- bcrypt

### FRONTEND

- webpack (babel)
- d3.js

</br>

## 5. 디자인 패턴 및 디렉터리 구조

### BACKEND

- 디자인 패턴: MVC
- 디렉터리 구조

```
server
    ├─bin
    │      www.js
    │
    ├─config
    │      themovie.js
    │
    ├─controllers
    │      movies.js
    │      reviews.js
    │      stars.js
    │      users.js
    │
    ├─dao
    │      movies.js
    │      reviews.js
    │      stars.js
    │      users.js
    │
    ├─middleware
    │      auth.js
    │
    ├─models
    │      movies.js
    │      reviews.js
    │      stars.js
    │      users.js
    │
    ├─routes
    │      index.js
    │      movies.js
    │      reviews.js
    │      stars.js
    │      users.js
    │
    └─utils
            resData.js
            resMessage.js
            themovie.js
```

- bin/www : express 환경 설정
- config : 외부 모듈/라이브러리 환경 config
- controllers : 데이터 유효성 체크 및 dao 호출, 요청 / 응답
- dao : models에 직접적으로 접근하여 데이터 변경
- models : 데이터
- middleware : 미들웨어
- routes : 라우터
- utils : 공통적으로 사용하는 유틸리티 함수 및 외부 라이브러리

</br>

### FRONTEND

- 디자인 패턴: flux
  - props를 통한 단방향 데이터 흐름
  - MVC 단점(양방향 데이터 흐름의 경우 상태 관리 복잡도 ↑)을 보완
- 디렉터리 구조

```
src
    │  index.html
    ├─css
    ├─img
    └─js
        │  App.js
        │  eventListeners.js
        │  index.js
        │  router.js
        │
        ├─components
        │  │  MovieDetails.js
        │  │  MovieRanking.js
        │  │  MyScoredMovies.js
        │  │  SearchResult.js
        │  │  SimilarWorks.js
        │  │  StarsGraph.js
        │  │  Wrapper.js
        │  │
        │  └─global
        │          BoxOfficeRankingCarousel.js
        │          HighestRankingCarousel.js
        │          MovieCommentCarousel.js
        │          MyScoredMoviesCarousel.js
        │          SearchedMovieCarousel.js
        │          Spinner.js
        │
        ├─pages
        │  │  HomePage.js
        │  │  MovieDetailsPage.js
        │  │  MyPage.js
        │  │  SearchResultPage.js
        │  │
        │  └─initialState
        │          index.js
        │          movies.js
        │          reviews.js
        │          scores.js
        │          users.js
        │
        ├─services
        │      index.js
        │      movies.js
        │      reviews.js
        │      scores.js
        │      users.js
        │
        └─utils
                carousel.js
                debounce.js
                fetch.js
```

- index.html: 기본 마크업 및 외부 소스 (아이콘) 연결
- index.js: SPA App 생성 (entry)
- router.js: 라우팅 구현
- App.js: path 별 페이지 생성 및 history state 관리
- pages: 각 페이지 별 상태 관리 및 이벤트 핸들러 바인딩
  - pages/initialState: 초기 상태 값 저장
- eventListeners.js: 모든 페이지에서 발생하는 공통 이벤트 핸들러 바인딩
- components: 레이아웃 및 라우팅 이벤트 핸들러 바인딩
- services: 서버 API 호출 (GET, POST, PATCH, DELETE)
- utils: 공통적으로 사용하는 유틸리티 함수

  </br>

## 6. 구현

### 공통

- 로고 클릭 시 홈 이동
- 영화 검색
- 로그인 / 회원가입

  - 로그인 클릭 시 모달 창 팝업
  - 회원가입 클릭 시 회원가입 모달 창 팝업
  - 잘못된 형식 입력 시 사용자에게 알려줌
  - 잘못된 이메일/비밀번호로 로그인 시도 시 로그인 불가
  - 이미 존재하는 닉네임 및 이메일로 회원가입 시도 시 회원가입 불가
  - 로그인 시 헤더가 마이페이지 / 로그아웃 변경

- 포스터 클릭 시 디테일 페이지 이동

- 캐러셀 UI
  - 캐서셀 양 끝에 마우스 커서 호버 시 좌우 이동 버튼이 나타남

### Home

- 영화 순위 제공

  - 박스오피스 순위
  - 높은 평점 순위

### Movie Detail

- 평점 및 코멘트 CRUD

  - 비로그인 시 로그인 모달 창 팝업
  - 로그인 시 이미 해당 영화에 등록한 평점이 있을 경우 그 평점을 화면에 렌더링 (GET)
  - 평점 최초 클릭 시 해당 평점을 등록 (POST)
  - 다른 평점 클릭 시 평점 수정 (PATCH)
  - 이미 평가한 점수와 같은 평점을 클릭한 경우 평점 삭제 (DELETE)

- 평점 그래프 및 코멘트

  - 평점 그래프: 본인을 포함한 해당 영화의 모든 별점 시각화, 가장 높은 평점에 하이라이트
  - 코멘트: 본인을 포함한 해당 영화의 모든 코멘트를 캐러셀로 표현

- 영화 상세 정보

  - 영화 제목, 개봉 연도, 장르, 제작 국가, 상영 시간, 상영 등급, 줄거리 및 출연진

- 같은 장르 영화 추천

### Movie Search

- 영화 검색 결과를 캐러셀로 표현

### My Page

- 사용자가 평점을 남긴 영화 리스트를 캐러셀로 표현

[UratchaPedia PPT.pdf](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/da0ccd7c-3a36-4672-a8de-a2252a600c2d/UratchaPedia_PPT.pdf)
