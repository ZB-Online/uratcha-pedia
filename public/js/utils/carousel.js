export const titleFormat = title => {
  if (title.length === 0) return '';
  return title.length >= 33 ? title.slice(0, 33) + '...' : title;
};

export const bindCarouselEvents = ($container, items, duration, itemsPerPage) => {
  let $carouselPrevBtn = $container.querySelector('.carousel-control.prev');
  let $carouselNextBtn = $container.querySelector('.carousel-control.next');
  let $carouselSlides = $container.querySelector('.carousel-slides');

  $carouselPrevBtn.style.visibility = 'hidden';

  const DURATION = duration;
  const ITEMS_PER_PAGE = itemsPerPage;
  const itemNumber = items.length;

  let currentSlide = 0;
  let isMoving = false;

  const move = (currentSlide, duration = 0) => {
    if (duration) isMoving = true;

    $carouselSlides.style.setProperty('--duration', duration);

    $carouselSlides.style.setProperty('--currentSlide', currentSlide);
  };

  $container.onclick = ({ target }) => {
    if (
      (!target.classList.contains('carousel-control') && !target.classList.contains('carousel-control-image')) ||
      isMoving
    )
      return;

    let nextSlide = target.classList.contains('prev') ? -1 : 1;

    currentSlide += 1 * nextSlide;

    if (currentSlide < 0) currentSlide = 0;

    let restItems = itemNumber - currentSlide * ITEMS_PER_PAGE < 1 ? 0 : itemNumber - currentSlide * ITEMS_PER_PAGE;

    if (restItems < ITEMS_PER_PAGE) {
      currentSlide += +(restItems / ITEMS_PER_PAGE - 1).toFixed(3);
    }

    if (currentSlide > 0) {
      $carouselPrevBtn.style.visibility = 'visible';
      $carouselNextBtn.style.visibility =
        +currentSlide.toFixed(3) >= +(itemNumber / ITEMS_PER_PAGE - 1).toFixed(3) ? 'hidden' : 'visible';
    } else if (currentSlide === 0) {
      $carouselPrevBtn.style.visibility = 'hidden';
      $carouselNextBtn.style.visibility = 'visible';
    }

    move(currentSlide, DURATION);
  };

  $container.ontransitionend = () => {
    isMoving = false;
  };
};

export const bindSearchedMovieCarouselEvents = ($container, movies) => {
  bindCarouselEvents($container, movies, 500, 6);
};

export const bindMovieCommentCarouselEvents = ($container, comments) => {
  bindCarouselEvents($container, comments, 700, 3);
};

export const bindBoxOfficeMovieCarouselEvents = ($container, movies) => {
  bindCarouselEvents($container, movies, 500, 5);
};

export const bindHighestRankingMovieCarouselEvents = ($container, movies) => {
  bindCarouselEvents($container, movies, 500, 5);
};

export const bindMyScoredMovieCarouselEvents = ($container, movies) => {
  bindCarouselEvents($container, movies, 300, 17);
};
