import { Dexie, type EntityTable } from 'dexie'

interface Friend {
  id?: number
  name: string
  age: number
}

const dbfriends = new Dexie('FriendsDatabase') as Dexie & {
  friends: EntityTable<
    Friend,
    'id'
  >
}

dbfriends.version(1).stores({
  friends: '++id, name, age'
})

export type { Friend }
export { dbfriends }
