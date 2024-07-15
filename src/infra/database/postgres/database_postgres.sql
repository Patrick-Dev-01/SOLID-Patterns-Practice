CREATE TABLE teams(
	id text primary key NOT NULL,
    name text
);

CREATE TABLE players (
	id text primary key NOT NULL,
    name text,
    shirt_number integer,
    position text,
    starter boolean,
    team_id text REFERENCES teams(id)
);

CREATE TABLE coachs(
	id text primary key NOT NULL,
    name text,
    team_id text REFERENCES teams(id)   
);

-- Create a database based on a existing database
CREATE DATABASE newdb WITH TEMPLATE originaldb OWNER dbuser;

SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity 
WHERE pg_stat_activity.datname = 'originaldb' AND pid <> pg_backend_pid();