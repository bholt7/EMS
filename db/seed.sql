INSERT INTO department
(name) 

VALUES
("Engineering"),
("Legal"), 
("Sales"),
("Finance");

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 3),
    ('Salesperson', 80000, 3),
    ('Lead Engineer', 150000, 1),
    ('Software Engineer', 120000, 1),
    ('Account Manager', 160000, 4),
    ('Accountant', 125000, 4),
    ('Legal Team Lead', 250000, 2),
    ('Lawyer', 190000, 2);
    
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
        