const e = require("express")



const openSSE = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')


  const messageId = setInterval(() => {
    res.write(`data: ${JSON.stringify(
      {
        event: 'option',
        data: {
          time: new Date().toLocaleString(),
          price: Math.floor(Math.random() * 100)
        }
      }
    )}\n\n`)
  }, 1000)


  const heartEvent =setInterval(() => {
    res.write(`data:${JSON.stringify({
      event: 'heartbeat',
      time: new Date().toLocaleString()
    })}\n\n`)
  }, 10000)  



  req.on('close', () => {
    console.log('SSE连接已断开')
    res.end()
    clearInterval(messageId)
    clearInterval(heartEvent)
  })
}

module.exports = {
  openSSE
}
  