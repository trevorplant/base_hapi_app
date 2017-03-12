import Knex from './knex'
import jwt from 'jsonwebtoken'
import GUID from 'node-uuid'

const routes = [
  {
    method: 'GET',
    path: '/birds',
    handler: (request, reply) => {
      const getOperation = Knex('birds').where({
        isPublic: true
      })
        .select('name', 'species', 'picture_url')
        .then((results) => {
          if (!results || results.length === 0) {
            reply({
              error: true,
              errMessage: 'no public birds found'
            })
          }
          reply({
            dataCount: results.length,
            data: results
          })
        }).catch(err => {
          reply('server-side oops')
        })
    }
  },
  {
    method: 'POST',
    path: '/auth',
    handler: (request, reply) => {
      const { username, password } = request.payload
      console.log('got %s, %s', username, password)
      const getOperation = Knex('users').where({
        username,
      })
        .select('guid', 'password')
        .then(([user]) => {
          if (!user) {
            reply({
              error: true,
              errMessage: 'the specified user was not found'
            })
            return
          }
          if (user.password === password) {
            const token = jwt.sign({
              username,
              scope: user.guid
            }, 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy', {
                algorithm: 'HS256',
                expiresIn: '1h'
              })

            reply({
              token,
              scope: user.guid
            })
          } else {
            reply('incorrect password')
          }
        }).catch(err => {
          reply('server-side Oopsy')
        })
    }
  },
  {
    method: 'POST',
    config: {
      auth: {
        strategy: 'token'
      }
    },
    path: '/birds',
    handler: (request, reply) => {
      console.log(request.auth.credentials)
      console.log(request.payload)
      const  bird  = request.payload
      const guid = GUID.v4()

      const insertOperation = Knex('birds').insert({
        owner: request.auth.credentials.scope,
        name: bird.name,
        species: bird.species,
        picture_url: bird.picture_url,
        guid,
      })
      .then(res => {
        reply({
          data: guid,
          message: 'successfully created a bird'
        })
      }).catch(err => {
        reply('server-side ba-bowww')
      })
    }
  }
  ,
  {
    method: 'PUT',
    config: {
      auth: {
        strategy: 'token'
      },
      pre: [
        {
          method: (request, reply) => {
            const {birdGUID} = request.params
                  , {scope}  = request.auth.credentials

            const getOperation = Knex('birds').where({
              guid: birdGUID
            })
            .select('owner')
            .then(([result]) => {
              if(!result) {
                reply({
                  error: true,
                  errMessage: `this is not the bird you are looking for ${birdGUID}`
                })
                .takeover()
              }
              if (result.scope !== scope) {
                reply({
                  error: true,
                  errMessage: `the bird  ${birdGUID} is not yours`
                })
                .takeover()
              }
              return reply.continue()
            })
          }
        }
      ]
    },
    path: '/birds/{birdGUID}',
    handler: (request, reply) => {
      
      const  bird  = request.payload
      const  {birdGUID} = request.params
      console.log(bird)
      console.log(birdGUID)
      const insertOperation = Knex('birds').where({
        guid: birdGUID
      })
      .update({
        name: bird.name,
        species: bird.species,
        picture_url: bird.picture_url,
        isPublic: bird.isPublic === 'true',
      })
      .then(res => {
        reply({
          data: guid,
          message: 'successfully updated a bird'
        })
      }).catch(err => {
        reply(`server-side ba-bowww ${err}`)
      })
    }
  }
]

export default routes