export default function debounce(callback, delay) {
  let timerId;

  return event => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
}
