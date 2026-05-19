// Kill any process occupying port 3001 before starting
const net = require('net')

const PORT = 3001

const server = net.createServer()
server.once('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is in use, attempting to free it...`)
    const { execSync } = require('child_process')
    try {
      execSync(`fuser -k ${PORT}/tcp`, { stdio: 'ignore' })
      console.log(`Port ${PORT} freed.`)
    } catch (e) {
      console.warn(`Could not free port ${PORT}:`, e.message)
    }
  }
  server.close()
})
server.once('listening', () => {
  server.close()
  console.log(`Port ${PORT} is available.`)
})
server.listen(PORT)
