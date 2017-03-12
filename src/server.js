import Hapi from 'hapi'
import routes from './routes'


const server = new Hapi.Server()

server.connection({
  port: 8080
})

server.register(require('hapi-auth-jwt'), (err) => {
  if (!err) {
    console.log('registered authentication provider')
  }

  server.auth.strategy('token', 'jwt', {
    key: 'put_a_new_secret_key_here',
    verifyOptions: {
      algorithms: ['HS256'],
    }
  })

  routes.forEach((route) => {
    console.log(`attaching ${route.path}`);
    console.log('Yeah')
    server.route(route);
  })
})



server.start(err => {
  if (err) {
    console.error('Oops error')
    console.error(err)
  }
  console.log(`Server started at ${server.info.uri}`)

})