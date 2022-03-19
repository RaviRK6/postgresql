const Pool = require('pg').Pool;

require("dotenv").config();

const config = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host:process.env.PGHOST,
    port: process.env.PGPORT
})

config.connect().then(() => 
    console.log('connected to Database')
).catch(err => 
    console.error('error to connected with Database', err.stack)
)

module.exports = config;