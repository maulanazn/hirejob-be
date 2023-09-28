CREATE TABLE users (
    id VARCHAR(150) PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    name VARCHAR(100),
    password VARCHAR(255),
    phone VARCHAR(20) UNIQUE,
    position VARCHAR(100),
    verified BOOLEAN DEFAULT false,
    last_work VARCHAR(255),
    description TEXT,
    photo VARCHAR,
    skill_name TEXT,
    domicile VARCHAR
);

SELECT * FROM users;

CREATE TABLE user_recruiter (
    id VARCHAR(150) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    company_name VARCHAR(255),
    position VARCHAR(100),
    phone VARCHAR(20) UNIQUE,
    password VARCHAR(255),
    verified BOOLEAN DEFAULT false,
    company_email VARCHAR(170),
    company_phone VARCHAR(90),
    company_field VARCHAR(170),
    company_info TEXT,
    province VARCHAR(50),
    city VARCHAR(50),
    linkedin_url VARCHAR,
    photo VARCHAR
);

SELECT * FROM user_recruiter;

CREATE TABLE social_media (
    id VARCHAR PRIMARY KEY,
    user_id VARCHAR,
    social_media_name VARCHAR,
    link VARCHAR
);

SELECT * FROM social_media WHERE user_id = '900b1327-94d3-4e9b-86ae-b0f05cc9a5b7';
INSERT INTO social_media (id, user_id, social_media_name, link) VALUES(0[], ';alksflajsdf', 'Github', 'github.com'), ('alsdjlfkas', ';alksflajsdf', 'Github', 'github.com');
SELECT * FROM social_media WHERE user_id = '900b1327-94d3-4e9b-86ae-b0f05cc9a5b7';

ALTER TABLE social_media ADD CONSTRAINT social_media_user_id_fkey FOREIGN KEY(user_id) REFERENCES users(id);

CREATE TABLE work_experience (
    id VARCHAR(170) PRIMARY KEY,
    user_name VARCHAR(100),
    user_id VARCHAR(100),
    position VARCHAR(100),
    company_name VARCHAR(150),
    working_start_at DATE,
    working_end_aT DATE,
    description TEXT,
    created_at DATE DEFAULT NOW(),
    work_experience_photo VARCHAR
);

SELECT * FROM work_experience;
INSERT INTO work_experience (id, user_name, user_id, position, company_name, working_start_at, working_end_at, description) VALUES(md5(random()::text),'maulinux', '51d75df0-5b74-47be-a48b-90b6b500b0a2', 'Back End Engineer at Grab', 'Grab', '2023-12-12', '2023-12-12', 'lakjsldjf');
ALTER TABLE work_experience ADD CONSTRAINT work_experience_username_fkey FOREIGN KEY (user_id) REFERENCES users(id);
ALTER 

CREATE TABLE portfolio (
    id VARCHAR(170) PRIMARY KEY,
    repository_link VARCHAR(255),
    app_type VARCHAR(95),
    photo VARCHAR(255),
    created_at DATE DEFAULT NOW(),
    portfolio_name VARCHAR,
    user_id VARCHAR(100)
);

SELECT * FROM portfolio;
INSERT INTO portfolio (id, user_id, name, repository_link, app_type, photo, created_at) VALUES(md5(random()::text), '51d75df0-5b74-47be-a48b-90b6b500b0a2', 'lakjsdfsadf', 'laksjdlfkjsaldf', 'alskjdflasd', 'laksjdlfkjsadf', NOW());
SELECT * FROM users;
ALTER TABLE portfolio ADD CONSTRAINT portfolio_username_fkey FOREIGN KEY (user_id) REFERENCES users(id);

CREATE TABLE form_message (
    id VARCHAR(170) PRIMARY KEY,
    user_id VARCHAR(170),
    position VARCHAR,
    user_name VARCHAR,
    recruiter_id VARCHAR,
    recruiter_name VARCHAR
);

CREATE TABLE messages (
    id VARCHAR(170) PRIMARY KEY,
    form_message_id VARCHAR(170),
    sender_id VARCHAR,
    user_name VARCHAR.
    position VARCHAR,
    message_detail TEXT
);

-- SELECT ALL CANDIDATE DATA BASED ON UI
SELECT photo_profile, name, last_work, province, city FROM users JOIN candidate_profile ON users.id = users.id JOIN photo ON photo.user_id = users.id;


-- SELECT ALL TO PORTFOLIO VIEW
-- iF DATA IS ONLY 1
SELECT users.id AS user_id, users.photo AS user_photo, 
users.name AS user_name, users.position AS user_position, users.domicile AS user_domicile, 
users.last_work AS user_lastwork, users.description AS user_description, users.skill_name AS user_skill, 
social_media.link AS socmed_link, portfolio.photo AS portfolio_photo, portfolio.portfolio_name, 
work_experience.position AS work_position, work_experience.company_name, work_experience.working_start_at, 
work_experience.working_end_at, work_experience.description AS work_description FROM users 
INNER JOIN social_media ON social_media.user_id = users.id
INNER JOIN portfolio ON portfolio.user_id = users.id
INNER JOIN work_experience ON work_experience.user_id = users.id
WHERE users.id = '09bf7c5d-d4a2-47bb-b56a-e534cf7402e7';

-- If DATA IS MORE THAN 1
SELECT name, position FROM users WHERE id = '09bf7c5d-d4a2-47bb-b56a-e534cf7402e7' UNION ALL SELECT position, company_name FROM work_experience WHERE user_id = '09bf7c5d-d4a2-47bb-b56a-e534cf7402e7' UNION ALL SELECT portfolio_name, app_type FROM portfolio WHERE user_id = '09bf7c5d-d4a2-47bb-b56a-e534cf7402e7' UNION ALL SELECT social_media_name, link FROM social_media WHERE user_id = '09bf7c5d-d4a2-47bb-b56a-e534cf7402e7';

SELECT work_experience.position, users.city, users.province FROM users JOIN work_experience ON work_experience.user_id = users.id WHERE users.id = '9f415485-4629-415a-9e76-47c1fc08f181';

SELECT users.photo AS user_photo, name, last_work, domicile, skill_name FROM users WHERE name ILIKE '%Clint%' UNION SELECT users.photo AS user_photo, name, last_work, domicile, skill_name FROM users WHERE last_work ILIKE '%n%' UNION SELECT users.photo AS user_photo, name, last_work, domicile, skill_name FROM users WHERE domicile ILIKE '%b%';