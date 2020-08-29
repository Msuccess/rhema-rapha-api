module.exports = [{ 
  "name": "default",
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
},{ 
  "name": "production-connection",
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
}
]