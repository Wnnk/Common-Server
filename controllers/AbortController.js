exports.testAbort1 = function(req, res) {
  setTimeout(() => {
    res.send({
      code: 2000,
      message: "testAbort1 message"
    })
  },2000)
}

exports.testAbort2 = function(req, res) {
  setTimeout(() => {
    res.send({
      code: 2000,
      message: "testAbort2 message"
    })
  },3000)
}