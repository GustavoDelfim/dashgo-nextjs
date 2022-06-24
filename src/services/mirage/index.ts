import { createServer, Factory, Model, Response } from 'miragejs'
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
      server.createList('user', 10)
    },
    
    routes () {
      this.namespace = 'api'
      this.timing = 750
      
      this.get('/users', (schema, request) => {
        const { page = '1', per_page = '10' } = request.params

        const total = schema.all('users').length

        const pageStart = (Number(page) - 1) * Number(per_page)
        const pageEnd = pageStart + Number(per_page)
        
        const users =  schema.all('users').slice(pageStart, pageEnd)

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users: users.models }
        )
      })

      this.post('/users')

      this.namespace = ''
      this.passthrough()
    }
  })

  return server
}