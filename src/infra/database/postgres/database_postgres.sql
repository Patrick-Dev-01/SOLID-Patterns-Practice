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