

const getSelectData = (req, res) => {
  const { start, end } = req.query;
  const data = createData(Number(start), Number(end));
  /* 模拟延迟 */
  setTimeout(() => {
    return res.send({
      code: 2000,
      data: data
    })
  },2000)
  /* 没有数据 */
  // setTimeout(() => {
  //   return res.send({
  //     code: 2000,
  //     data: []
  //   })
  // },2000)



}

const createData = (start,end) => {
  const data = [];
  for (start; start < end; start++) {
    data.push({
      label: `Option ${start+1}`,
      value: `Option ${start+1}`,
      price: (Math.random() * 100).toFixed(2)
    });
  }
  return data;
}

module.exports = {
    getSelectData
}

