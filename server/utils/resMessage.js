const responseMessage = {
  // TODO : message 방식 status로 변경 여부
  SIGNUP_SUCCESS: '회원가입 성공',
  SIGNUP_FAIL: '회원 가입 실패',

  SIGNIN_SUCCESS: '로그인 성공',
  SIGNIN_FAIL: '로그인 실패',
  LOGOUT_SUCCESS: '로그아웃 성공',

  EMAIL_ALREADY_EXIST: '존재하는 email 입니다.',
  EMAIL_NOT_EXIST: '존재하지 않는 유저 email 입니다.',
  USERNAME_ALREADY_EXIST: '존재하는 유저이름입니다.',
  PW_MISMATCH: '비밀번호가 일치하지 않습니다',

  REVIEW_GET_SUCCESS: '리뷰 조회 성공',
  REVIEW_CREATE_SUCCESS: '리뷰 등록 성공',
  REVIEW_UPDATE_SUCCESS: '리뷰 수정 성공',
  REVIEW_DELETE_SUCCESS: '리뷰 삭제 성공',
  REVIEW_ALREADY_EXIST: '존재하는 리뷰입니다.',
  ID_NOT_EXIST: '존재하지 않는 id 입니다.',
  ID_ALREADY_EXIST: '존재하는 id 입니다.',

  STAR_GET_SUCCESS: '평점 조회 성공',
  STAR_CREATE_SUCCESS: '평점 등록 성공',
  STAR_UPDATE_SUCCESS: '평점 수정 성공',
  STAR_DELETE_SUCCESS: '평점 삭제 성공',
  STAR_ALREADY_EXIST: '존재하는 평점입니다.',
  MOVIE_GET_SUCCESS: '영화 조회 성공',

  AUTH_SUCCESS: "토큰 인증 성공",
  AUTH_FAIL: "토큰 인증 실패",
  VALUE_INVALID: "파라미터 값이 잘못 되었습니다.",
  INTERNAL_SERVER_ERROR: '서버 내부 오류',
};

module.exports = responseMessage;
