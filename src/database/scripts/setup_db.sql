CREATE TYPE user_role as ENUM ('mentor', 'mentee');

CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(72) NOT NULL,
    role user_role
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

