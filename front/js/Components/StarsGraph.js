export default function StarsGraph({ $target, initialState }) {
  const $starsGraph = document.createElement('div');
  $starsGraph.classList.add('stars-graph-container');
  $target.appendChild($starsGraph);

  this.state = {
    starsData: initialState.starsData,
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    const { starsData } = this.state;
    const one = starsData.filter(star => star.score === 1).length;
    const two = starsData.filter(star => star.score === 2).length;
    const three = starsData.filter(star => star.score === 3).length;
    const four = starsData.filter(star => star.score === 4).length;
    const five = starsData.filter(star => star.score === 5).length;
    const freq = [one, two, three, four, five];
    const max = Math.max(...freq);

    $starsGraph.innerHTML = freq
      .map(
        (num, i) =>
          `<span class="stars-graph-item 
            bar--color-${num === max ? 'most' : 'normal'}" data-val='${(num / max) * 100}' data-score="${i}">
          </span>`
      )
      .join('');

    d3.selectAll('.stars-graph-item')
      .datum(function () {
        return this.dataset;
      })
      .style('height', '10%')
      .transition()
      .duration(1500)
      .style('height', d => d.val + '%');
  };

  this.render();
}
