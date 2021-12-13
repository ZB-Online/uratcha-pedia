const starService = require('../service/stars');

const getStars = (req, res) => {
  res.send(starService.getStars());
};

module.exports = {
  getStars,
};
