exports.up = (pgm) => {
  return pgm.sql(`
    CREATE TABLE "questions" (
    "id" BIGSERIAL PRIMARY KEY,
    "question" VARCHAR NOT NULL,
    "answer" VARCHAR NOT NULL,
    "route_id" VARCHAR(50) NOT NULL,
    "location" VARCHAR NOT NULL,
    "coins_value" INTEGER DEFAULT 0
    );
    
    CREATE TABLE "answers" (
    "id" BIGSERIAL PRIMARY KEY,
    "userId" VARCHAR(50) NOT NULL REFERENCES users (id),
    "answer" VARCHAR NOT NULL,
    "question_id" BIGINT REFERENCES questions (id),
    "route_id" VARCHAR(50) NOT NULL
    );
    
    
    INSERT INTO questions(question,route_id, answer, coins_value) VALUES ('Are you ok?', 'route_id', 'ok', 50);
  `);
};

exports.down = (pgm) => {
  return pgm.sql(`
    DROP TABLE "answers";
    DROP TABLE "questions";
  `);
};
