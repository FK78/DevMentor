CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    password_nonce TEXT NOT NULL,
    password_algorithm VARCHAR(32) NOT NULL DEFAULT 'argon2id',
    password_memory INTEGER NOT NULL,
    password_passes INTEGER NOT NULL,
    password_parallelism INTEGER NOT NULL,
    password_tag_length INTEGER NOT NULL,
    password_pepper_version INTEGER NOT NULL DEFAULT 1,
    role user_role NOT NULL DEFAULT 'mentee'
);

CREATE TABLE IF NOT EXISTS posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid,
    title VARCHAR(256) NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_posts_userId
        FOREIGN KEY(user_id)
            REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS comments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid,
    user_id uuid,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comments_postId
        FOREIGN KEY(post_id)
            REFERENCES posts(id),
    CONSTRAINT fk_comments_userId
        FOREIGN KEY(user_id)
            REFERENCES users(id)
);
