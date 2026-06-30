// Custom Next.js server — Plesk/Passenger startup file.
//
// Process-hygiene rules baked in here (root cause of the past nproc blow-ups):
//  1. Graceful shutdown on SIGTERM/SIGINT — closes the HTTP server AND disconnects
//     Prisma so its query-engine CHILD process exits. Without this, every Passenger
//     restart orphaned a Prisma engine; dozens of restarts piled up to the 100-process
//     cap. This is the single most important fix.
//  2. A single bad request never crashes the whole server (no respawn loop).
//  3. Small libuv thread pool — fewer OS threads counted against the nproc limit.

// Must be set BEFORE the thread pool is first used (i.e. before any fs/crypto/dns).
process.env.UV_THREADPOOL_SIZE = process.env.UV_THREADPOOL_SIZE || '2'

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0'
const port = parseInt(process.env.PORT, 10) || 3001

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

let server
let shuttingDown = false

async function shutdown(signal) {
  if (shuttingDown) return
  shuttingDown = true
  console.log(`[server] ${signal} received — shutting down gracefully`)

  // Stop accepting new connections.
  if (server) server.close(() => console.log('[server] HTTP server closed'))

  // Disconnect Prisma so its query-engine child process exits cleanly.
  // prisma.ts caches the client on globalThis in every environment for exactly this.
  try {
    const prisma = globalThis.prisma
    if (prisma && typeof prisma.$disconnect === 'function') {
      await prisma.$disconnect()
      console.log('[server] Prisma disconnected')
    }
  } catch (err) {
    console.error('[server] error during Prisma disconnect:', err)
  }

  // Force-exit if something hangs, so we never linger as a half-dead process.
  setTimeout(() => process.exit(0), 3000).unref()
  process.exit(0)
}

app.prepare().then(() => {
  server = createServer(async (req, res) => {
    try {
      await handle(req, res, parse(req.url, true))
    } catch (err) {
      // A single failed request must NOT take the process down.
      console.error('[server] error handling', req.url, err)
      if (!res.headersSent) {
        res.statusCode = 500
        res.end('internal server error')
      }
    }
  })

  // Only a fatal listen error (e.g. port already bound) should bring us down.
  server.once('error', (err) => {
    console.error('[server] fatal listen error:', err)
    process.exit(1)
  })

  server.listen(port, hostname, () => {
    console.log(`[server] ready on http://${hostname}:${port}`)
  })
})

// Passenger/Plesk send SIGTERM to restart the app — clean up so nothing leaks.
process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

// Never let an uncaught error spin into a crash→respawn→leak loop without cleanup.
process.on('uncaughtException', (err) => {
  console.error('[server] uncaught exception:', err)
  shutdown('uncaughtException')
})
process.on('unhandledRejection', (err) => {
  console.error('[server] unhandled rejection:', err)
})
