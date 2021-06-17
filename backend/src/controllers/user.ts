import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { NewUserInput, User } from '../schema/user'
import {
  getUser as getUserService,
  createUser as createUserService
} from '../services/user/user'

@Resolver(User)
export class UserResolver {
  @Query((returns) => User)
  async getUser(@Arg('id') id: string): Promise<User> {
    const user = await getUserService(id)
    return user
  }

  @Mutation((returns) => User)
  async createUser(@Arg('newUserInput') input: NewUserInput): Promise<User> {
    const user = await createUserService(input)
    return user
  }
}
