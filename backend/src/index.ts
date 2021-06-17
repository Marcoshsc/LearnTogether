import 'reflect-metadata'
import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './controllers/user'
import { UserDB } from './schema/user'

async function configureApp() {
  const app = express()

  const schema = await buildSchema({
    resolvers: [UserResolver]
  })

  await mongoose.connect(process.env.MONGODB_CONNECTION as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true
    })
  )

  // const user = new UserDB({
  //   id: '1',
  //   name: '1',
  //   username: '1',
  //   email: '1',
  //   password: '1'
  // })

  // user.save((err: any) => {
  //   if (err) console.log(err)
  //   console.log('salvou!')
  // })

  app.listen(3000, () => {
    console.log('Listening to port 3000.')
  })
}

configureApp()
