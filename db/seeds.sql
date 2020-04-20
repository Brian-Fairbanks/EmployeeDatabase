insert into departments(name)
values ("Sales"),("Engineering"),("Finance"),("Legal");

insert into roles(title, salary, department_id)
values  ("Sales Lead", 100000, 1),
        ("Salesperson", 80000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Lead Accountant", 125000, 3),
        ("Accountant", 105000, 3),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 190000, 4);

insert into employees(first_name, last_name, role_id, manager_id)
values  ('Vinny', 'Stafford',1,null),
        ('Daniele', 'Flores',3,null),
        ('Katharine', 'Colon',5,null),
        ('Amrit', 'Mayer',7,null),
        ('Kristy', 'Livingston',2,1),
        ('Darin', 'Rankin',2,1),
        ('Reagan', 'Hutchinson',4,2),
        ('Kia', 'Mullen',4,2),
        ('Abdur', 'Valdez',6,3),
        ('Amir', 'Castillo',6,3),
        ('Danny', 'Coates',8,4),
        ('Max', 'Sheppard',8,4),
        ('Dilan', 'Wall',2,1),
        ('Shaunie', 'Haley',4,2),
        ('Wren', 'Mcfadde',6,3);