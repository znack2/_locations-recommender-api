exports.up = (pgm) => {
  return pgm.sql(`
    CREATE TABLE users (
      "id" VARCHAR(50) NOT NULL PRIMARY KEY,
      "username" VARCHAR NOT NULL,
      "score" INTEGER DEFAULT 0,
      "current_route_id" INTEGER NOT NULL,
      "name" VARCHAR NOT NULL,
      "age" INTEGER NOT NULL,
       "type_emotion" INTEGER,
       "target" INTEGER
    );
    
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    CREATE TABLE sessions (
      "accessToken" VARCHAR(50) NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
      "userId" VARCHAR(50) NOT NULL REFERENCES users (id),
      "active" BOOLEAN NOT NULL DEFAULT true
    );
  `);
};

exports.down = (pgm) => {
  return pgm.sql(`
    DROP TABLE sessions;
    DROP TABLE users;
  `);
};
