exports.up = (pgm) => {
  return pgm.sql(`
    CREATE TABLE "questions" (
    "id" BIGSERIAL PRIMARY KEY,
    "question" VARCHAR NOT NULL,
    "answers" VARCHAR[4],
    "correct_answer" VARCHAR NOT NULL,
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
    
    
    INSERT INTO questions(question,route_id, correct_answer, coins_value, location, reference, answers) 
    VALUES ('Are you ok?', 2, 'Ok', 50, 265, 'FOOD', ARRAY['Ok', 'No', 'Sure','Oh my...']);
    INSERT INTO questions(question,route_id, correct_answer, coins_value, location, reference, answers) 
    VALUES ('What is you name?', 2, 'Peter', 50, 269, 'MUSIC', ARRAY['Sasha', 'Peter', 'Nick','Lester']);
    INSERT INTO questions(question,route_id, correct_answer, coins_value, location, reference, answers)
     VALUES ('What is happen?', 2, 'Nothing', 50, 260, 'GAME', ARRAY['Oh my...', 'Life', 'Nothing','Travel Hack']);
    INSERT INTO questions(question,route_id, correct_answer, coins_value, location, reference, answers) 
    VALUES ('Will you go home?', 2, 'Of course', 50, 255, 'THEATER', ARRAY['Sure', 'I want to see all countries', 'No','Of course']);
    INSERT INTO questions(question,route_id, correct_answer, coins_value, location, reference, answers) 
    VALUES ('Did you mean duck?', 2, 'Nope', 50, 257, 'FILMS', ARRAY['You don not need to know this', 'Ha ha', 'Sure','Nope']);
  `);
};

exports.down = (pgm) => {
  return pgm.sql(`
    DROP TABLE "answers";
    DROP TABLE "questions";
  `);
};
