exports.getEchart = function (req, res) {
  let total = 200000;
  let data = timeFn(total);
  const { start, end } = req.query;
  const limitData = data.slice(start, end);

  setTimeout(() => {
    return res.json({
      data: limitData,
      code: 2000,
    });
  }, 2000);
};

exports.getBigData = function (req, res) {
  let total = 80000;
  let data = timeFn(total);
  setTimeout(() => {
    return res.json({
      data: data,
      code: 2000,
    });
  }, 2000);
};

const timeFn = (total) => {
  let dateTimeStamp = new Date(1968, 0, 1).getTime();
  let oneHourStamp = 24 * 3600 * 1000;
  let newArr = [];
  for (let i = 0; i < total; i++) {
    let date = new Date(dateTimeStamp);
    // 格式化时间为 YYYY-MM-DD HH:MM:SS
    let formattedTime = date.toISOString().slice(0, 19).replace("T", " ");
    newArr.push({
      time: formattedTime,
      value: (Math.random() * 50 + 10).toFixed(2),
    });
    dateTimeStamp += oneHourStamp;
  }
  return newArr;
};
