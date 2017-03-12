
exports.seed = function (knex, Promise) {

  var tableName = 'birds';

  var rows = [

    {
      owner: '2e5cf699-0e35-4ef6-b393-41a50eb36d71',
      species: 'Columbidae',
      name: 'Pigeon',
      picture_url: 'http://pngimg.com/upload/pigeon_PNG3423.png',
      guid: '4c8d84f1-9e41-4e78-a254-0a5680cd19d5',
      isPublic: true,
    },

    {
      owner: '2e5cf699-0e35-4ef6-b393-41a50eb36d71',
      species: 'Zenaida',
      name: 'Mourning dove',
      picture_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mourning_Dove_2006.jpg/220px-Mourning_Dove_2006.jpg',
      guid: 'ddb8a136-6df4-4cf3-98c6-d29b9da4fbc6',
      isPublic: false,
    },

  ];

  // Deletes ALL existing entries
  return knex(tableName)
    .del()
    .then(function () {
      return knex().insert(rows).into(tableName);
    });
};
