CREATE TABLE tokens (
    token_id SERIAL PRIMARY KEY,
    access_token TEXT NOT NULL UNIQUE,
    refresh_token TEXT NOT NULL,
    expires_at BIGINT NOT NULL
);