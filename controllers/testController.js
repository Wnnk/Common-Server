const option = require("../public/option");

const test = (req, res) => {
  setTimeout(() => {
    res.send(`Hello World!${Math.random()}`);
  }, 5000);
};

const getMoreData = (req, res) => {
  setTimeout(() => {
    res.send({
      data: option,
      code: 2000,
    });
  }, 500);
};

module.exports = {
  test,
  getMoreData,
};
