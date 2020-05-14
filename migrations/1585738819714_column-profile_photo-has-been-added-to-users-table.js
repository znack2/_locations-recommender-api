exports.up = (pgm) => {
  return pgm.sql(`
    ALTER TABLE users ADD COLUMN profile_photo TEXT NOT NULL DEFAULT '';
  `);
};

exports.down = (pgm) => {
  return pgm.sql(`
    ALTER TABLE users DROP COLUMN profile_photo;
  `);
};
