import 'reflect-metadata'

import { createUser, getUser } from './user'
import { IUserDB, UserDB } from '../../schema/user'
import { finishTestDatabase, initTestDatabase } from '../../test/mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server-core'

let mongoServer: MongoMemoryServer

beforeAll(async () => {
  mongoServer = await initTestDatabase()
})

afterAll(async () => {
  await finishTestDatabase(mongoServer)
})

test('Get user by id', async () => {
  const emailUser = (await UserDB.findOne({
    email: 'marcoshscunha@hotmail.com'
  })) as IUserDB
  const user = await getUser(emailUser._id)
  expect(user.email).toBe('marcoshscunha@hotmail.com')
  expect(decodeURI(encodeURI(user.id))).toBe(
    decodeURI(encodeURI(emailUser._id))
  )
})

test('Not found user', async () => {
  await expect(getUser('62cab99331417bcbbee4d299')).rejects.toThrowError()
})

test('Create user', async () => {
  const user = await createUser({
    email: 'novoEmail@gmail.com',
    name: 'novo nome',
    password: 'novoSenha',
    username: 'novoUsername'
  })
  expect(user.email).toBe('novoEmail@gmail.com')
  const mongooseUser = await UserDB.findById(user.id)
  expect(mongooseUser).not.toBeNull()
  expect(mongooseUser?.password).toBe('novoSenha')
})
