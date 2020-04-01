exports.up = (pgm) => {
  return pgm.sql(`
    ALTER TABLE users ADD COLUMN profile_photo TEXT NOT NULL DEFAULT 'https://scontent-frt3-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_ohc=juIw_rgxYewAX-axhtZ&oh=1e7f10f407a2e575a6b64250d0e0d1ae&oe=5EACD78F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2';
  `);
};

exports.down = (pgm) => {
  return pgm.sql(`
    ALTER TABLE users DROP COLUMN profile_photo;
  `);
};
