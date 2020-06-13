exports.up = (pgm) => {
  return pgm.sql(`
    CREATE TABLE "questions" (
    "id" BIGSERIAL PRIMARY KEY,
    "question" VARCHAR NOT NULL,
    "answer" VARCHAR NOT NULL,
    "route_id" INTEGER NOT NULL,
    "location" INTEGER NOT NULL,
    "coins_value" INTEGER DEFAULT 0,
    "reference" VARCHAR NOT NULL
    );
    
    CREATE TABLE "answers" (
    "id" BIGSERIAL PRIMARY KEY,
    "userId" VARCHAR(50) NOT NULL REFERENCES users (id),
    "answer" VARCHAR NOT NULL,
    "question_id" BIGINT REFERENCES questions (id),
    "route_id" VARCHAR(50) NOT NULL
    );
    
    
    INSERT INTO questions(question,route_id, answer, coins_value, location, reference) VALUES ('Are you ok?', 2, 'ok', 50, 265, 'FOOD');
    INSERT INTO questions(question,route_id, answer, coins_value, location, reference) VALUES ('It is you name?', 2, 'Peter', 50, 269, 'MUSIC');
    INSERT INTO questions(question,route_id, answer, coins_value, location, reference) VALUES ('What is happen?', 2, 'Nothing', 50, 260, 'GAME');
    INSERT INTO questions(question,route_id, answer, coins_value, location, reference) VALUES ('Will you go home?', 2, 'Of course', 50, 255, 'THEATER');
    INSERT INTO questions(question,route_id, answer, coins_value, location, reference) VALUES ('Did you mean duck?', 2, 'Nope', 50, 257, 'FILMS');
  `);
};

exports.down = (pgm) => {
  return pgm.sql(`
    DROP TABLE "answers";
    DROP TABLE "questions";
  `);
};
