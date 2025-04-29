

exports.createTable = function(req, res) {
  let { start, end } = req.query;
  const data= [];
  for (; start < end; start++) {
    data.push({
      equipmentName: `equipment${start}`,
      equipmentId: `${start}`,
      temperature: Math.floor(Math.random() * 100),
      humidity: Math.floor(Math.random() * 100),
      pressure: Math.floor(Math.random() * 100),
      address: {
        street: `street${start}`,
        city: `city${start}`,
        state: `state${start}`
      }
    })
  }
  setTimeout(() => {
    res.send({
      data,
      code:2000,
      count:200
    })
  }, 2000);
}