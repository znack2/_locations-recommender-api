exports.shorthands = undefined;

exports.up = (pgm) => {
  return pgm.sql(`
    CREATE TABLE "ratings" (
      "id" UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
      "userId" VARCHAR(50) NOT NULL REFERENCES users (id),
      "locationId" VARCHAR(50) NOT NULL REFERENCES locations (id),
      "rate" VARCHAR NOT NULL
    );
    
    CREATE INDEX "ratings_userId_index" ON "ratings" ("userId");
    CREATE UNIQUE INDEX "ratings_userId_rating_uindex" ON "ratings" ("userId", rating);
  `);
};

exports.down = (pgm) => {
  return pgm.sql(`
    DROP TABLE "ratings";
  `);
};
