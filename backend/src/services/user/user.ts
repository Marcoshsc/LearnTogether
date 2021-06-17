import { IUserDB, NewUserInput, User, UserDB } from '../../schema/user'

const mongoUserToGQLUser = (user: IUserDB): User => ({
  ...user,
  id: user._id as string,
  name: user.name,
  username: user.username,
  email: user.email
})

export async function getUser(id: string): Promise<User> {
  const user = await UserDB.findById(id)
  if (!user) throw new Error(`User ${id} not found.`)
  return mongoUserToGQLUser(user)
}

export async function createUser(input: NewUserInput): Promise<User> {
  const user = new UserDB({
    ...input
  })
  const savedUser = await user.save()
  return mongoUserToGQLUser(savedUser)
}
