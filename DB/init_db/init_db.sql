-- init_db.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    preferences TEXT
);

CREATE TABLE merged_articles (
    id SERIAL PRIMARY KEY,
    article TEXT,
    category TEXT,
    title TEXT
);

CREATE TABLE scraped_articles (
    id SERIAL PRIMARY KEY,
    article TEXT,
    category TEXT,
    title TEXT,
    source VARCHAR(255) CHECK (source IN ('ynet', 'n12'))
);
