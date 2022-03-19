//create database
CREATE DATABASE todo_database;

//create tables
CREATE TABLE Company(
    Id SERIAL PRIMARY KEY,
    Name TEXT,
    Age INT,
    Address VARCHAR(255),
    SALARY  REAL
);

CREATE TABLE Department(
    Id SERIAL PRIMARY KEY,
    Dept CHAR(50),
    Emp_id INT
);

//insert data in tables
INSERT INTO company(name, age, address, salary) VALUES ('ajith',36,'Chennai',50000);

INSERT INTO department(dept,emp_id) VALUES('DEVELOPER',3);

//join 
Joins clause is used to combine records from two or more tables in a database. A JOIN is a means for combining fields from two tables by using values common to each.

//cross join
CROSS JOIN matches every row of the first table with every row of the second table.
//result table is x+y columns
//cross join query
SELECT EMP_ID, NAME, DEPT FROM Company CROSS JOIN department;

//inner join
//You can use INNER keyword optionally.
//result table is pair of values statisfied condition display
//If these values are equal (intersection)
//Returns records that have matching values in both tables
//inner join query
SELECT EMP_ID, NAME, DEPT FROM COMPANY INNER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;

//three types of OUTER JOINs: LEFT, RIGHT, and FULL and PostgreSQL supports all of these.

//left outer join 
//LEFT JOIN is the same as the LEFT OUTER JOIN
//Returns all records from the left table, and the matched records from the right table
//outer join query
SELECT EMP_ID, NAME, DEPT FROM COMPANY LEFT OUTER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;

//right outer join
//RIGHT JOIN is the same as the RIGHT OUTER JOIN
//Returns all records from the right table, and the matched records from the left table
//right outer join query
SELECT EMP_ID, NAME, DEPT FROM COMPANY RIGHT OUTER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;

//full outer join
//all data from two table display (union)
//FULL JOIN is the same as the FULL OUTER JOIN
//Returns all records when there is a match in either left or right table
//full outer join query
SELECT EMP_ID, NAME, DEPT FROM COMPANY FULL OUTER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;

//Views
//A view can contain all rows of a table or selected rows from one or more tables. 
//A view can be created from one or many tables, which depends on the written PostgreSQL query to create a view.
//views are not ordinary tables
//view can be subquery because it FROM clause

//once we add that view table that automatic update row based base table

//views are virtual tables that represent data of the underlying tables
CREATE VIEW COMPANY_VIEW AS SELECT ID, NAME, AGE FROM  COMPANY;

//view that data
SELECT * FROM COMPANY_VIEW;

//rename view
ALTER VIEW COMPANY_VIEW RENAME TO VIEW_TABLE;

//drop that view data
DROP VIEW COMPANY_VIEW;
DROP VIEW IF EXISTS COMPANY_VIEW;


//Materialized view
//PostgreSQL materialized views that allow you to store the result of a query physically and update the data periodically
//views to store data physically And these views are called materialized views.
//it not automatically update 
//query
CREATE MATERIALIZED VIEW MATERIALIZED_TABLE AS SELECT EMP_ID, DEPT FROM DEPARTMENT WITH NO DATA;

//using this only able to see that table 
REFRESH MATERIALIZED VIEW MATERIALIZED_TABLE;

//materialized view that table
SELECT * FROM MATERIALIZED_TABLE;

//drop that materialized view table
DROP MATERIALIZED VIEW MATERIALIZED_TABLE;


//procedure 
//define user-defined functions using the create function statement.
//inside a user-defined function, you cannot start a transaction, and commit or rollback it.
//you cannot use the return statement with a value inside a store procedure
//you can use the return statement without the expression to stop the stored procedure immediately
//Use create procedure statement to define a new stored procedure.
//Use the call statement to invoke a stored procedure.

//cretae a procedure to insert data in department table
CREATE OR REPLACE PROCEDURE procedure_insertdata( Dept CHAR(50),Emp_id INT)
LANGUAGE 'plpgsql'
AS $$
BEGIN
INSERT INTO DEPARTMENT (dept,emp_id)VALUES(Dept, Emp_id);
COMMIT;
END;
$$;


//to call that function procedure using
call procedure_insertdata('NODE',36);

//drop procedure 
DROP PROCEDURE procedure_insertdata;

//drop multiple procedure using ( , )
DROP PROCEDURE procedure_insertdata, procedure_name;

//partitioning table
//process of dividing large data tables into small manageable parts
//Table partitioning can be of two types, namely, vertical partitioning or horizontal partitioning. 
//In vertical partitioning, we divide the table column wise. 
//While in horizontal partitioning, we divide the table row wise on the basis of range of values in a certain column.

//basic syntax
CREATE TABLE main_table_name (
column_1 data type,
column_2 data type,
.
.
. ) PARTITION BY RANGE (column_2);

//create a partitioning table
CREATE TABLE partition_name PARTITION OF main_table_name FOR VALUES FROM (start_value) TO (end_value);

//command failed because there is no partition 
//default partition for remove that error
CREATE TABLE SALES_DEFAULT PARTITION OF main_table_name DEFAULT;


//remove table partition using ALTER(stored a regular table after remove it) or DROP(remove fully)
ALTER TABLE main_table_name DETACH PARTITION partition_name;
DROP TABLE partition_name;

//function 
//for current date and year and time
SELECT NOW();
SELECT extract(MINUTE from  now());
SELECT extract(YEAR from  now());
SELECT AGE(NOW(),1999-01-01);

//operation
SELECT AGE , AGE*10%2-2 as current_age from company;

//having
SELECT age,count(*) from company group by age having count(*) > 1;

//count that row values
SELECT count(*) from company group by name;

//round values
SELECT ROUND(4,4)

//PRIMARY key
//create
ALTER TABLE table_name ADD CONSTRAINT primary_name PRIMARY(column_name);

//delete 
ALTER TABLE table_name DROP CONSTRAINT primary_name;

//unique key
//create
ALTER TABLE table_name ADD CONSTRAINT unique_name UNIQUE(column_name);

//delete 
ALTER TABLE table_name DROP CONSTRAINT unique_name;

//check CONSTRAINT
//create
ALTER TABLE table_name ADD CONSTRAINT gender_name CHECK(gender == 'male' OR gender == 'female');

//relation table
//for foreign key to that PERSON
//car id is foreign key to person car_id
CREATE TABLE car(
 id BIGSERIAL NOT NULL PRIMARY KEY,
 MODEL VARCHAR(50) NOT NULL,
 PRICE NUMERIC(10,2) NOT NULL
);

CREATE TABLE PERSON(
 ID BIGSERIAL NOT NULL PRIMARY KEY,
 NAME VARCHAR(50) NOT NULL,
 GENDER VARCHAR(7),
 CAR_ID BIGINT REFERENCES CAR(ID),
 UNIQUE(CAR_ID)
);

//export table data using
\copy (SELECT * FROM department) TO '/Users/BRISTON FLEX3/Downloads/result.csv' DELIMITER ',' CSV HEADER;

//invocked that SERIAL VALUES
SELECT nextval('company_id_seq'::regclass);

//ALTER SEQUENCE VALUES
ALTER SEQUENCE COMPANY_ID_SEQ RESTART WITH 14;
