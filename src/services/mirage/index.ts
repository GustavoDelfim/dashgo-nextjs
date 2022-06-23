import { createServer, Factory, Model } from 'miragejs'
import { faker } from '@faker-js/faker'

type User = {
  name: string
  email: string
  created_at: string
}

export function makeServer () {
  const server  = createServer({
    models: {
      users: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name() {
          return `User ${faker.name.firstName()}`
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        createdAt() {
          return faker.date.recent(10)
        }
      })
    },
    
    seeds (server) {
      server.createList('user', 200)
    },
    
    routes () {
      this.namespace = 'api'
      this.timing = 750
      
      this.get('/users')
      this.post('/users')

      this.namespace = ''
      this.passthrough()
    }
  })

  return server
}