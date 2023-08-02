CREATE TABLE users (
  id         SERIAL PRIMARY KEY, 
  email      TEXT NOT  NULL UNIQUE CHECK(POSITION('@' IN email) > 1),
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  password   TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE terms (
  id            SERIAL PRIMARY KEY,
  title         TEXT NOT NULL,
  user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY   (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE assignments (
  id            SERIAL PRIMARY KEY,
  course        TEXT NOT NULL,
  name          TEXT NOT NULL, 
  -- due_date      TIMESTAMP NOT NULL DEFAULT NOW(),
  -- task          TEXT NOT NULL,
  term_id       INTEGER NOT NULL ,
  user_id       INTEGER NOT NULL ,
  created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);