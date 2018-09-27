DROP TABLE  IF EXISTS member;
DROP TABLE  IF EXISTS content;


CREATE TABLE member (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(300) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        bio VARCHAR(300),
        instruments VARCHAR(300),
        category VARCHAR(300),
        url VARCHAR (300)
);

 CREATE TABLE content (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES member(id),
    track VARCHAR(300),
    genre VARCHAR(300),
    filename VARCHAR(255),
    image VARCHAR(300),
    media_type VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
