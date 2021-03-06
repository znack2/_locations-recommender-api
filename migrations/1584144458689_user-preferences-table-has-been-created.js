exports.up = (pgm) => {
  return pgm.sql(`
    CREATE TABLE "userPreferences" (
      "id" UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
      "userId" VARCHAR(50) NOT NULL REFERENCES users (id),
      "preference" VARCHAR NOT NULL
    );
    
    CREATE INDEX "userPreferences_userId_index" ON "userPreferences" ("userId");
    CREATE UNIQUE INDEX "userPreferences_userId_preference_uindex" ON "userPreferences" ("userId", preference);
  `);
};

exports.down = (pgm) => {
  return pgm.sql(`
    DROP TABLE "userPreferences";
  `);
};
