import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error'] : [],
  })

// Cache the client on globalThis in EVERY environment.
//  - dev: survives HMR, so we don't spawn a new client + query-engine on each reload.
//  - prod: lets the custom server (server.js) reach the client to $disconnect() on
//    SIGTERM, so the Prisma query-engine child process exits instead of leaking on
//    every Passenger restart (the root cause of the nproc blow-ups).
globalForPrisma.prisma = prisma
