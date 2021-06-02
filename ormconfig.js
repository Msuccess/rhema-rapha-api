module.exports = [
  {
    name: 'default',
    // name: 'production',
    type: 'postgres',
    url:
      'postgres://qvnktefdycricz:29dc0ea372ea659d624c84fb8f814d8a2389ac36544f1e6d513a342ec5147309@ec2-35-169-188-58.compute-1.amazonaws.com:5432/db13u3lmbv8h7l',
    host: 'ec2-35-169-188-58.compute-1.amazonaws.com',
    port: 5432,
    keepConnectionAlive: true,
    autoLoadEntities: true,
    username: 'qvnktefdycricz',
    password:
      '29dc0ea372ea659d624c84fb8f814d8a2389ac36544f1e6d513a342ec5147309',
    database: 'db13u3lmbv8h7l',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
  {
    name: 'dev',
    // name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    keepConnectionAlive: true,
    autoLoadEntities: true,
    username: 'postgres',
    password: 'postgres',
    database: 'RhemaRaphaDb',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
];
