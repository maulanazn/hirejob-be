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
SELECT * FROM users WHERE email = 'maulinuxzn@gmail.com';

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

CREATE TABLE social_media (
    id VARCHAR PRIMARY KEY,
    user_id VARCHAR UNIQUE,
    social_media_name VARCHAR,
    link VARCHAR
);

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
    created_at DATE DEFAULT NOW()
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
TRUNCATE portfolio;
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
SELECT users.photo, users.name, users.position, users.domicile, users.last_work, users.description, users.skill_name, portfolio.photo, portfolio.portfolio_name, work_experience.position, work_experience.company_name, work_experience.working_start_at, work_experience.working_end_at, work_experience.description FROM users JOIN portfolio ON portfolio.user_id = users.id JOIN work_experience ON work_experience.user_id = users.id WHERE users.id = '87090013-71bb-4906-b396-940552098eb3';

SELECT work_experience.position, users.city, users.province FROM users JOIN work_experience ON work_experience.user_id = users.id WHERE users.id = '9f415485-4629-415a-9e76-47c1fc08f181';
