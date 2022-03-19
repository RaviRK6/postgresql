const { Router } = require('express')
const moment = require('moment')
const config = require('../config/config')

const router = Router()

//get data from table company
router.get('/company', async (req, res) =>{
    try {
        const table = await config.query("SELECT * FROM company");
        
        res.json(table.rows)
    } catch (error) {
        console.log(error.message)
    }
})
//get data from table department
router.get('/department', async (req, res) =>{
    try {
        const table = await config.query("SELECT * FROM department");
        res.json(table.rows)
    } catch (error) {
        console.log(error.message)
    }
})
//insert data for table company
router.post('/company/create', async (req, res) =>{
    try {
        const { name , age, address, salary } = req.body
        const table = await config.query("INSERT INTO company(name, age, address, salary) VALUES ($1,$2,$3,$4) RETURNING *",
            [name,age,address,salary]
        );
        res.json(table.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})

//insert data for table department
router.post('/department/create', async (req, res) =>{
    try {
        const { dept, emp_id } = req.body
        const table = await config.query("INSERT INTO department(dept,emp_id) VALUES($1,$2) RETURNING *",
            [dept, emp_id]
        );
        res.json(table.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})
//delete table 
router.delete('/table/delete/:name', async (req, res) =>{
    const { name } = req.params
    try {
        const table = await config.query(`DROP TABLE ${name}`);
        res.send('table deleted')
    } catch (error) {
        console.log(error.message)
    }
})
//result that cross join for two table
router.get('/crossjoin', async (req, res) =>{
    try {
        const table = await config.query("SELECT EMP_ID, NAME, DEPT FROM Company CROSS JOIN department");
        res.json(table.rows)
    } catch (error) {
        console.log(error.message)
    }
})

//result that inner join for two table
router.get('/innerjoin', async (req, res) =>{
    try {
        const table = await config.query("SELECT EMP_ID, NAME, DEPT FROM COMPANY INNER JOIN DEPARTMENT ON COMPANY.ID =DEPARTMENT.EMP_ID");
        res.json(table.rows)
    } catch (error) {
        console.log(error.message)
    }
})

//result that left join for two table
router.get('/leftjoin', async (req, res) =>{
    try {
        const table = await config.query("SELECT EMP_ID, NAME, DEPT FROM COMPANY LEFT OUTER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID");
        res.json(table.rows)
    } catch (error) {
        console.log(error.message)
    }
})

//result that right join for two table
router.get('/rightjoin', async (req, res) =>{
    try {
        const table = await config.query("SELECT EMP_ID, NAME, DEPT FROM COMPANY RIGHT OUTER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID");
        res.json(table.rows)
    } catch (error) {
        console.log(error.message)
    }
})

//result that full join for two table
router.get('/fulljoin', async (req, res) =>{
    try {
        const table = await config.query("SELECT EMP_ID, NAME, DEPT FROM COMPANY FULL OUTER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID");
        res.json(table.rows)
    } catch (error) {
        console.log(error.message)
    }
})

//result table using post method
router.post('/table', async (req, res) =>{
    try {
        const {name} = req.body
        const table = await config.query(`SELECT * FROM ${name}`);
        res.json(table.rows)
    } catch (error) {
        console.log(error.message)
    }
});

//result table using get method based params
router.get('/table/:name', async (req, res) =>{
    try {
        const {name} = req.params
        const table = await config.query(`SELECT * FROM ${name}`);
        res.json(table.rows)
    } catch (error) {
        console.log(error.message)
    }
})

//create a view table using 
router.post('/view/create', async (req, res) =>{
    const { viewname , targettable, values } = req.body
    try {
        const table = await config.query(`CREATE VIEW ${viewname} AS SELECT ${values} FROM  ${targettable}`);
        res.send('view table created')
    } catch (error) {
        console.log(error.message)
    }
})

//rename that view table using
router.post('/view/rename', async (req, res) =>{
    const {currentname, targetname} = req.body
    try {
        const table = await config.query(`ALTER VIEW ${currentname} RENAME TO ${targetname}`);
        res.send('Rename view table')
    } catch (error) {
        console.log(error.message)
    }
})


//delete view table using
router.delete('/view/delete/:name', async (req, res) =>{
    const { name } = req.params
    try {
        const table = await config.query(`DROP VIEW IF EXISTS ${name}`);
        res.send('view table deleted')
    } catch (error) {
        console.log(error.message)
    }
})

//create a MATERIALIZED view table using 
router.post('/materialized/create', async (req, res) =>{
    const { viewname , targettable, values } = req.body
    try {
        const table = await config.query(`CREATE MATERIALIZED VIEW ${viewname} AS SELECT ${values} FROM ${targettable} WITH NO DATA;`);
        res.send('materialized view table created')
    } catch (error) {
        console.log(error.message)
    }
})
//create a MATERIALIZED view table using refresh to see data
router.get('/materialized/:name', async (req, res) =>{
    try {
        const {name} = req.params
        const table = await config.query(`REFRESH MATERIALIZED VIEW ${name}`);
        const table2 = await config.query(`SELECT * FROM ${name}`);
        res.json(table2.rows)
    } catch (error) {
        console.log(error.message)
    }
})

//delete MATERIALIZED view table using
router.delete('/materialized/delete/:name', async (req, res) =>{
    const { name } = req.params
    try {
        const table = await config.query(`DROP MATERIALIZED VIEW IF EXISTS ${name}`);
        res.send('materialized view table deleted')
    } catch (error) {
        console.log(error.message)
    }
})

//call procedure to insert data in department
router.post('/procedure/call', async (req, res) =>{
    const { dept, emp_id } = req.body
    try {
        const table = await config.query("CALL procedure_insertdata($1,$2)", [dept, emp_id]);
        res.send('Call procedure to insert data')
    } catch (error) {
        console.log(error.message)
    }
})
//create a partitioning table
router.post('/partition/create', async (req, res) =>{
    const { partition_name , start_value, end_value } = req.body
    // const start = moment(start_value).format("YYYY-MM-DD")
    // const end = moment(end_value).format("YYYY-MM-DD")
    // console.log(typeof start, end)
    try {
        const table = await config.query(`CREATE TABLE ${partition_name} PARTITION OF MAIN_PARTITION_TABLE FOR VALUES FROM ('${start_value}') TO ('${end_value}')`)
        res.send('Partition created')
    } catch (error) {
        console.log(error.message)
    }
})

//delete partitioning  table using
router.delete('/partition/delete/:name', async (req, res) =>{
    const { name } = req.params
    try {
        const table = await config.query(`ALTER TABLE MAIN_PARTITION_TABLE DETACH PARTITION ${name}`);
        res.send('Partition table deleted but in database still there')
    } catch (error) {
        console.log(error.message)
    }
})

//default partition table
router.get('/partition/default', async (req, res) =>{
    try {
        const table = await config.query(`CREATE TABLE SALES_DEFAULT PARTITION OF main_table_name DEFAULT`);
        res.send('Partition table default created')
    } catch (error) {
        console.log(error.message)
    }
})
module.exports = router