import { UserDB } from '../../schema/user'

export async function initializeUserData() {
  const user1 = new UserDB({
    id: '60ca87c1296802a8a0027d92',
    name: '1',
    username: '1',
    email: '1',
    password: '1'
  })
  const user2 = new UserDB({
    id: '60ca87cbdf06fda8b21848d5',
    name: '1',
    username: '1',
    email: '1',
    password: '1'
  })
  const user3 = new UserDB({
    id: '60cab99331417bcbbee4d299',
    name: 'Marcos',
    username: 'Marcoshsc',
    email: 'marcoshscunha@hotmail.com',
    password: 'marquin2000'
  })
  await user1.save()
  await user2.save()
  await user3.save()
}
