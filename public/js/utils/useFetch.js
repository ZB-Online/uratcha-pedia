import fetch from './fetch.js';
// 실제 사용시 awati fetch 부분만 사용하면 됨

// 유저 로그인
// resData: none
// message format :
// VALUE_INVALID
// EMAIL_NOT_EXIST
// PW_MISMATCH
// SIGNIN_SUCCESS
(async () => {
  const res = await fetch.post('/api/users/signin', {
    email: "test@test.com",
    password: 'test1',
  });
  console.log('POST', res);
})();

// 유저 회원가입
// resData: 객체
// message format :
// VALUE_INVALID
// EMAIL_ALREADY_EXIST
// USERNAME_ALREADY_EXIST
// SIGNUP_SUCCESS
(async () => {
  const res = await fetch.post('/api/users/signup', {
    email: "test4@test.com",
    password: 'test4',
    username: '테스트계정4'
  });
  console.log('POST', res);
})();

// 박스오피스 영화 20개 정보
// resData: 배열
// message format :
// MOVIE_GET_SUCCESS
// INTERNAL_SERVER_ERROR
(async () => {
  const res = await fetch.get("/api/movies");
  console.log("GET", res);
})();

// 영화id로 영화 상세정보 가져오기
// resData: 객체
// message format :
// MOVIE_GET_SUCCESS
// INTERNAL_SERVER_ERROR
(async () => {
  const res = await fetch.get("/api/movies/565");
  console.log("GET", res);
})();

// 검색어로 검색결과 가져오기
// resData: 객체
// message format :
// MOVIE_GET_SUCCESS
// INTERNAL_SERVER_ERROR
(async () => {
  const res = await fetch.get("/api/movies/search/ring");
  console.log("GET", res);
})();

// 영화id로 해당 영화의 리뷰들 가져오기
// message format :
// VALUE_INVALID
// REVIEW_GET_SUCCESS
(async () => {
  const res = await fetch.get('/api/reviews/1');
  console.log('GET', res);
})();

// 영화id와 userEmail로 리뷰 가져오기(Max 1개)
// resData
// 리뷰 있을 때 : 객체
// 리뷰 등록 안했을 때 : false
// message format :
// VALUE_INVALID
// EMAIL_NOT_EXIST
// REVIEW_GET_SUCCESS
(async () => {
  const res = await fetch.get('/api/reviews/movies/1/users/test2@test.com');
  console.log('GET', res);
})();

// 리뷰 등록
// resData: none
// message format :
// VALUE_INVALID
// ID_ALREADY_EXIST
// EMAIL_NOT_EXIST
// REVIEW_ALREADY_EXIST
// REVIEW_CREATE_SUCCESS
(async () => {
  const res = await fetch.post('/api/reviews', {
    id: 5,
    userEmail: 'test1@test.com',
    movieId: 10,
    comment: '졸리다',
  });
  console.log('POST', res);
})();

// 리뷰 수정하기
// resData: none
// message format :
// VALUE_INVALID
// ID_NOT_EXIST
// REVIEW_UPDATE_SUCCESS
(async () => {
  const res = await fetch.patch('/api/reviews', {
    id: 1,
    userEmail: 'test1',
    movieId: 1,
    comment: 'update',
  });
  console.log('PATCH', res);
})();

// 리뷰 삭제하기
// resData: none
// message format :
// VALUE_INVALID
// ID_NOT_EXIST
// REVIEW_DELETE_SUCCESS
(async () => {
  const res = await fetch.delete('/api/reviews/2');
  console.log('DELETE', res);
})();

// 평가 갯수 모두 가져오기
// resData: 객체 {starCount: 5}
// message format :
// STAR_GET_SUCCESS
// REVIEW_GET_SUCCESS
(async () => {
  const res = await fetch.get('/api/stars');
  console.log('GET', res);
})();

// 영화id로 해당 영화의 평균 별점 가져오기
// resData: 객체 {averageStar: 3}
// message format :
// VALUE_INVALID
// STAR_GET_SUCCESS
(async () => {
  const res = await fetch.get('/api/stars/1');
  console.log('GET', res);
})();

// 영화id와 userEmail로 별점 가져오기(Max 1개)
// resData
// 별점 있을 때 : 객체 {id: 1, userEmail: 'test1@test.com', movieId: 1, score: 1}
// 별점 등록 안했을 때 : {star: false}
// message format :
// VALUE_INVALID
// EMAIL_NOT_EXIST
// STAR_GET_SUCCESS
(async () => {
  const res = await fetch.get('/api/stars/movies/1/users/test1@test.com');
  console.log('GET', res);
})();

// userEmail로 작성한 모든 별점 가져오기
// resData
// 별점 있을 때 : 배열
// 별점 등록 안했을 때 : []
// message format :
// VALUE_INVALID
// EMAIL_NOT_EXIST
// STAR_GET_SUCCESS
(async () => {
  const res = await fetch.get('/api/stars/users/test3@test.com');
  console.log('GET', res);
})();

// 별점 등록
// resData: none
// message format :
// VALUE_INVALID
// ID_ALREADY_EXIST
// EMAIL_NOT_EXIST
// STAR_ALREADY_EXIST
// STAR_CREATE_SUCCESS
(async () => {
  const res = await fetch.post('/api/stars', {
    id: 6,
    userEmail: 'test1@test.com',
    movieId: 81,
    score: 2,
  });
  console.log('POST', res);
})();

// 별점 수정하기
// resData: none
// message format :
// VALUE_INVALID
// ID_NOT_EXIST
// STAR_UPDATE_SUCCESS
(async () => {
  const res = await fetch.patch('/api/stars', {
    id: 1,
    userEmail: 'test1',
    movieId: 1,
    score: 1,
  });
  console.log('PATCH', res);
})();

// 별점 삭제하기
// resData: none
// message format :
// VALUE_INVALID
// ID_NOT_EXIST
// STAR_DELETE_SUCCESS
(async () => {
  const res = await fetch.delete('/api/stars/2');
  console.log('DELETE', res);
})();