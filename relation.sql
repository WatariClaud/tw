CREATE TABLE users (id SERIAL PRIMARY KEY,
    firstName VARCHAR(30), lastName VARCHAR(30), email VARCHAR(50),
    password VARCHAR(255), gender VARCHAR(11), jobRole VARCHAR(50),
    department VARCHAR(50), address VARCHAR(30);


INSERT INTO users (firstName, lastName, 
                   email, password, 
                   gender, jobRole, 
                   department, address,
                   isAdmin) 
VALUES('Claud', 'Watari', 'claudwatari95@gmail.com', 
	    'password', 'male', 'Software developer', 'Engineering', 'Nairobi', true);