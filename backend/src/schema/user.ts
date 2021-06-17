import mongoose, { Document } from 'mongoose'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string

  @Field()
  name: string

  @Field()
  username: string

  @Field()
  email: string
}

@InputType()
export class NewUserInput {
  @Field()
  name: string

  @Field()
  username: string

  @Field()
  email: string

  @Field()
  password: string
}

export interface IUserDB extends Document {
  name: string
  username: string
  email: string
  password: string
}

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String
})

export const UserDB = mongoose.model<IUserDB>('User', userSchema)
