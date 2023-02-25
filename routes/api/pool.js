const { Pool } = require("pg");
const pool = new Pool({
  // user: "ywpbqomgrajqrj",
  // host: "ec2-34-193-112-164.compute-1.amazonaws.com",
  // database: "dbu6dhlmqdia1l",
  // password: "6a49d412f6bb655f2ebd5ebf7e0a09524c0c276dcec214edd33e409f7715abe3",
  // port: 5432,
  ssl: { rejectUnauthorized: false },
  connectionString: process.env.ConnectionString,
});

module.exports = pool;
// Host ec2-34-193-112-164.compute-1.amazonaws.com
// Database dbu6dhlmqdia1l
// User ywpbqomgrajqrj
// Port 5432
// Password 6a49d412f6bb655f2ebd5ebf7e0a09524c0c276dcec214edd33e409f7715abe3
