CREATE TABLE department(
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY (department_id)
REFERENCES department(id)
);

CREATE TABLE employee(
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL ,
role_id INT NOT NULL,
manager_id INT,
FOREIGN KEY (role_id)
REFERENCES roles(id)
);

INSERT INTO department
(name) 

VALUES
("Sales"),
("Engineering"), 
("Finance"),
("Legal");

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);
    
    INSERT INTO employee
		(first_name, last_name, role_id, manager_id) 
        
        VALUES
        
        ("James", "Hendricks", 1, NULL),
        ('Eric', 'Brookes', 2, 1),
		('Adam', 'Brashear', 3, NULL),
		('TChalla', 'StarLord', 4, 3),
		('Ororo', 'Munroe', 5, NULL),
		('Monica', 'Rambeau', 6, 5),
		('Rhiana', 'Williams', 7, NULL),
		('Aja', 'Adanna', 8, 7);
        
        
		