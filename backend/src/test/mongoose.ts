import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import { initializeUserData } from './initial-data/user'

export async function initTestDatabase(): Promise<MongoMemoryServer> {
  const mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getUri()
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  await initializeUserData()
  return mongoServer
}

export async function finishTestDatabase(mongoServer: MongoMemoryServer) {
  await mongoose.disconnect()
  await mongoServer.stop()
}
