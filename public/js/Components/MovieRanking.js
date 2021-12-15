export function MovieRanking({ $target, initialState }) {
  const $movieRanking = document.createElement('ul');
  $target.appendChild($movieRanking);

  this.state = initialState;

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    $movieRanking.innerHTML = `
    <section class="movie-container">
    <div class="outer">
      <div class="inner">
        <div class="movie-ranking">
          <span>${initialState}</span>
        </div>
        <ul class="box-office">
          <li class="movie-item">
            <div class="movie-poster">
              <div class="movie-poster-num" data-num='1'>1</div>
              <img src="./img/movie-poster.jpg" alt="movie-poster">
            </div>
            <div class="movie-detail">
              <span class="movie-title">엔칸토: 마법의 세계</span>
              <div class="movie-info">
                <span class="movie-year">2021</span>
                <span>ㆍ</span>
                <span class="movie-country">미국</span>
              </div>
              <span class="movie-score">평균★3.9</span>
            </div>
          </li>
          <li class="movie-item">
            <div class="movie-poster">
              <div class="movie-poster-num" data-num='1'>1</div>
              <img src="./img/movie-poster.jpg" alt="movie-poster">
            </div>
            <div class="movie-detail">
              <span class="movie-title">엔칸토: 마법의 세계</span>
              <div class="movie-info">
                <span class="movie-year">2021</span>
                <span>ㆍ</span>
                <span class="movie-country">미국</span>
              </div>
              <span class="movie-score">평균★3.9</span>
            </div>
          </li>
          <li class="movie-item">
            <div class="movie-poster">
              <div class="movie-poster-num" data-num='1'>1</div>
              <img src="./img/movie-poster.jpg" alt="movie-poster">
            </div>
            <div class="movie-detail">
              <span class="movie-title">엔칸토: 마법의 세계</span>
              <div class="movie-info">
                <span class="movie-year">2021</span>
                <span>ㆍ</span>
                <span class="movie-country">미국</span>
              </div>
              <span class="movie-score">평균★3.9</span>
            </div>
          </li>
          <li class="movie-item">
            <div class="movie-poster">
              <div class="movie-poster-num" data-num='1'>1</div>
              <img src="./img/movie-poster.jpg" alt="movie-poster">
            </div>
            <div class="movie-detail">
              <span class="movie-title">엔칸토: 마법의 세계</span>
              <div class="movie-info">
                <span class="movie-year">2021</span>
                <span>ㆍ</span>
                <span class="movie-country">미국</span>
              </div>
              <span class="movie-score">평균★3.9</span>
            </div>
          </li>
          <li class="movie-item">
            <div class="movie-poster">
              <div class="movie-poster-num" data-num='1'>1</div>
              <img src="./img/movie-poster.jpg" alt="movie-poster">
            </div>
            <div class="movie-detail">
              <span class="movie-title">엔칸토: 마법의 세계</span>
              <div class="movie-info">
                <span class="movie-year">2021</span>
                <span>ㆍ</span>
                <span class="movie-country">미국</span>
              </div>
              <span class="movie-score">평균★3.9</span>
            </div>
          </li>
        </ul>
      </div>
    </div> </section>`;
  };
  this.render();
}

// export function HighestRates() {
//   return `
//   <section class=" movie-container">
//   <div class="outer">
//     <div class="inner">
//       <div class="movie-ranking">
//         <span>평균 별점이 높은 작품</span>
//       </div>
//       <ul class="movie-score">
//         <li class="movie-item">
//           <div class="movie-poster">
//             <div class="movie-poster-num" data-num='1'>1</div>
//             <img src="./img/movie-poster.jpg" alt="movie-poster">
//           </div>
//           <div class="movie-detail">
//             <span class="movie-title">엔칸토: 마법의 세계</span>
//             <div class="movie-info">
//               <span class="movie-year">2021</span>
//               <span>ㆍ</span>
//               <span class="movie-country">미국</span>
//             </div>
//             <span class="movie-score">평균★3.9</span>
//           </div>
//         </li>
//         <li class="movie-item">
//           <div class="movie-poster">
//             <div class="movie-poster-num" data-num='1'>1</div>
//             <img src="./img/movie-poster.jpg" alt="movie-poster">
//           </div>
//           <div class="movie-detail">
//             <span class="movie-title">엔칸토: 마법의 세계</span>
//             <div class="movie-info">
//               <span class="movie-year">2021</span>
//               <span>ㆍ</span>
//               <span class="movie-country">미국</span>
//             </div>
//             <span class="movie-score">평균★3.9</span>
//           </div>
//         </li>
//         <li class="movie-item">
//           <div class="movie-poster">
//             <div class="movie-poster-num" data-num='1'>1</div>
//             <img src="./img/movie-poster.jpg" alt="movie-poster">
//           </div>
//           <div class="movie-detail">
//             <span class="movie-title">엔칸토: 마법의 세계</span>
//             <div class="movie-info">
//               <span class="movie-year">2021</span>
//               <span>ㆍ</span>
//               <span class="movie-country">미국</span>
//             </div>
//             <span class="movie-score">평균★3.9</span>
//           </div>
//         </li>
//         <li class="movie-item">
//           <div class="movie-poster">
//             <div class="movie-poster-num" data-num='1'>1</div>
//             <img src="./img/movie-poster.jpg" alt="movie-poster">
//           </div>
//           <div class="movie-detail">
//             <span class="movie-title">엔칸토: 마법의 세계</span>
//             <div class="movie-info">
//               <span class="movie-year">2021</span>
//               <span>ㆍ</span>
//               <span class="movie-country">미국</span>
//             </div>
//             <span class="movie-score">평균★3.9</span>
//           </div>
//         </li>
//         <li class="movie-item">
//           <div class="movie-poster">
//             <div class="movie-poster-num" data-num='1'>1</div>
//             <img src="./img/movie-poster.jpg" alt="movie-poster">
//           </div>
//           <div class="movie-detail">
//             <span class="movie-title">엔칸토: 마법의 세계</span>
//             <div class="movie-info">
//               <span class="movie-year">2021</span>
//               <span>ㆍ</span>
//               <span class="movie-country">미국</span>
//             </div>
//             <span class="movie-score">평균★3.9</span>
//           </div>
//         </li>
//       </ul>
//     </div>
//   </div>
//   </section>
//   `;
// }
