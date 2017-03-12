
exports.up = function (knex, Promise) {
  return knex
    .schema
    .createTable('users', function (usersTable) {
      //PK
      usersTable.increments()

      //Data
      usersTable.string('name', 50).notNullable()
      usersTable.string('username', 50).notNullable().unique()
      usersTable.string('email', 250).notNullable().unique()
      usersTable.string('password', 128).notNullable()
      usersTable.string('guid', 36).notNullable().unique()

      usersTable.timestamp('create_at').notNullable()

    })

    .createTable('birds', function (birdsTable) {
      //PK
      birdsTable.increments()
      birdsTable.string('owner', 36).references('guid').inTable('users')

      //Data
      birdsTable.string('name', 250).notNullable()
      birdsTable.string('species', 250).notNullable()
      birdsTable.string('picture_url', 250).notNullable()
      birdsTable.string('guid', 36).notNullable()
      birdsTable.boolean('isPublic').notNullable().defaultTo(true)
      birdsTable.timestamp('create_at').notNullable()
    })
};

exports.down = function (knex, Promise) {
  return knex
        .schema
          .dropTableIfExists('birds')
          .dropTableIfExists('users')
};
