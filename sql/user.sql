DROP TABLE  IF EXISTS member;


CREATE TABLE member (
    id SERIAL PRIMARY KEY,
        firstname VARCHAR(300) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        bio VARCHAR(300),
        url VARCHAR (300)
);
