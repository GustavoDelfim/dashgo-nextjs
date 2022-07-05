import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs'
import { faker } from '@faker-js/faker'

type User = {
  name: string
  email: string
  created_at: string
}

export function makeServer () {
  const server  = createServer({
    serializers: {
      application: ActiveModelSerializer
    },
    
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
      server.createList('user', 27)
    },
    
    routes () {
      this.namespace = 'api'
      this.timing = 750
      
      this.get('/users', (schema, request) => {
        const {queryParams} = request
        const page = queryParams?.page || '1'
        const per_page = queryParams?.per_page || '10'

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

      this.get('/users/:id')
      this.post('/users', async (schema, request) => {
        const { user } = JSON.parse(request.requestBody)
        
        schema.create('users', {
          name: user.name,
          email: user.email,
          created_at: user.created_at
        }).save()

        return new Response(201, {}, { user })
      })

      this.namespace = ''
      this.passthrough()
    }
  })

  return server
}