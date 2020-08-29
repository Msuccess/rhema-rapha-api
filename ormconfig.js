module.exports = [{

  "name": "default",
  "type": "postgres",
  "url": "postgres://affckevcfcmbcf:cdb4e4600acd1e7519006ab72267cdcac86e18062d2008c7223d21800d7d4818@ec2-34-236-215-156.compute-1.amazonaws.com:5432/d6hqlj8st87sfu",
  "host": "ec2-34-236-215-156.compute-1.amazonaws.com",
  "port": 5432,
  "keepConnectionAlive": true,
  "autoLoadEntities": true,
  "username": "affckevcfcmbcf",
  "password": "cdb4e4600acd1e7519006ab72267cdcac86e18062d2008c7223d21800d7d4818",
  "database": "d6hqlj8st87sfu",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true

}, {
  "name": "dev",
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "keepConnectionAlive": true,
  "autoLoadEntities": true,
  "username": "postgres",
  "password": "postgres",
  "database": "RhemaRaphaDb",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}]