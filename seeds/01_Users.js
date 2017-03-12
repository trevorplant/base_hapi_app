
exports.seed = function(knex, Promise) {
  var tableName = 'users'

  var rows = [
    {
      name: 'Trevor Plant',
      username: 'trevios',
      password: 'password',
      email: 'tp@example.com',
      guid: '024b129b-5920-4a08-945a-aeeb2084e0de'
    },
    {
      name: 'Stephen Bartlett',
      username: 'stevo',
      password: 'password',
      email: 'sb@example.com',
      guid: '2e5cf699-0e35-4ef6-b393-41a50eb36d71'
    },
    {
      name: 'Ian MacDonald',
      username: 'MrD',
      password: 'password',
      email: 'im@example.com',
      guid: '57a7ff64-9f7b-4c15-bef3-c922a68b970e'
    },
    {
      name: 'Dan Gray',
      username: 'dan',
      password: 'password',
      email: 'dg@example.com',
      guid: '5dfb4b5d-fe1e-4e55-993a-becfc6e6d6d2'
    },
    {
      name: 'Davor Bisko',
      username: 'davor',
      password: 'password',
      email: 'db@example.com',
      guid: '2575e8cc-61b9-46b9-bd30-d487a1f01021'
    },
    {
      name: 'Greg Frye',
      username: 'greg',
      password: 'password',
      email: 'gf@example.com',
      guid: '869e48d6-f0fc-4fdb-bf9c-da0f52ec5bb5'
    },

  ]

  return knex( tableName )
    //Empty the table
    .del()
    .then(function() {
      return knex.insert(rows).into(tableName)
    })
}
