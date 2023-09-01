CREATE TABLE users (
    id VARCHAR(150) PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    name VARCHAR(100),
    password VARCHAR(255),
    phone VARCHAR(20) UNIQUE,
    position VARCHAR(100),
    verified BOOLEAN DEFAULT false
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
    verified BOOLEAN DEFAULT false
);

CREATE TABLE recruiter_profile (
    id VARCHAR PRIMARY KEY,
    company_name VARCHAR(170),
    company_email VARCHAR(170),
    company_phone VARCHAR(90),
    company_field VARCHAR(170),
    company_info TEXT,
    province VARCHAR(50),
    city VARCHAR(50),
    user_id VARCHAR(100) UNIQUE,
    email VARCHAR UNIQUE,
    linkedin_url VARCHAR,
    photo VARCHAR
);

ALTER TABLE recruiter_profile ADD CONSTRAINT recruiter_name_fkey FOREIGN KEY (user_id) REFERENCES user_recruiter(id);

CREATE TABLE candidate_profile (
    id VARCHAR PRIMARY KEY,
    user_name VARCHAR(200),
    province VARCHAR(50),
    city VARCHAR(50),
    last_work VARCHAR(255),
    description TEXT,
    user_id VARCHAR(100) UNIQUE,
    photo VARCHAR
);

SELECT * FROM candidate_profile;
INSERT INTO candidate_profile (id, user_name, province, city, last_work, description, user_id) VALUES (md5(random()::text), 'idk', 'lskaf', 'asdfs', 'Back End Engineer at Grab', 'askldjflksadf', '51d75df0-5b74-47be-a48b-sdfs');

ALTER TABLE candidate_profile ADD CONSTRAINT candidate_name_fkey FOREIGN KEY (user_id) REFERENCES users(id);

CREATE TABLE social_media (
    id VARCHAR PRIMARY KEY,
    user_id VARCHAR UNIQUE,
    social_media_name VARCHAR,
    link VARCHAR
);

ALTER TABLE social_media ADD CONSTRAINT social_media_user_id_fkey FOREIGN KEY(user_id) REFERENCES users(id);

CREATE TABLE skill (
    id VARCHAR(170) PRIMARY KEY,
    user_name VARCHAR(100),
    user_id VARCHAR(100),
    skill_name VARCHAR(255)
);

INSERT INTO skill (id, user_name, user_id, skill_name) VALUES(md5(random2()::text), 'maulinux', '9f415485-4629-415a-9e76-47c1fc08f181', 'nulis');
INSERT INTO skill (id, user_name, user_id, skill_name) VALUES(md5(random()::text), 'maulinux', '9f415485-4629-415a-9e76-47c1fc08f181', 'cli-an');
SELECT * FROM skill;
SELECT skill_name FROM skill WHERE user_name = 'ariyanda';
DELETE FROM skill WHERE id = '9801c523c25f5591b5bcf2feebe02dd6';
TRUNCATE skill;

ALTER TABLE skill ADD CONSTRAINT skill_username_fkey FOREIGN KEY (user_id) REFERENCES users(id);

CREATE TABLE work_experience (
    id VARCHAR(170) PRIMARY KEY,
    user_name VARCHAR(100),
    user_id VARCHAR(100),
    position VARCHAR(100),
    company_name VARCHAR(150),
    working_start_at DATE,
    working_end_aT DATE,
    description TEXT,
    created_at DATE DEFAULT NOW()
);

SELECT * FROM work_experience;
INSERT INTO work_experience (id, user_name, user_id, position, company_name, working_start_at, working_end_at, description) VALUES(md5(random()::text),'maulinux', '51d75df0-5b74-47be-a48b-90b6b500b0a2', 'Back End Engineer at Grab', 'Grab', '2023-12-12', '2023-12-12', 'lakjsldjf');
ALTER TABLE work_experience ADD CONSTRAINT work_experience_username_fkey FOREIGN KEY (user_id) REFERENCES users(id);
TRUNCATE work_experience;

CREATE TABLE portfolio (
    id VARCHAR(170) PRIMARY KEY,
    user_id VARCHAR(100) UNIQUE,
    repository_link VARCHAR(255),
    app_type VARCHAR(95),
    photo VARCHAR(255),
    created_at DATE DEFAULT NOW()
);

SELECT * FROM portfolio;
ALTER TABLE portfolio RENAME COLUMN user_name TO portfolio_name;
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
SELECT photo.photo_profile, users.name, candidate_profile.province, candidate_profile.city, candidate_profile.description, work_experience.position, users.email, portfolio.photo AS portfolio_photo, portfolio.name AS portfolio_name, work_experience.position AS work_position, work_experience.company_name, work_experience.working_start_at, work_experience.working_end_at FROM users JOIN photo ON photo.user_id = users.id JOIN portfolio ON portfolio.user_id = users.id JOIN work_experience ON work_experience.user_id = users.id JOIN candidate_profile ON candidate_profile.user_id = users.id WHERE users.id = '51d75df0-5b74-47be-a48b-90b6b500b0a2';

SELECT work_experience.position, candidate_profile.city, candidate_profile.province FROM candidate_profile JOIN work_experience ON work_experience.user_id = candidate_profile.user_id WHERE candidate_profile.user_id = '9f415485-4629-415a-9e76-47c1fc08f181';