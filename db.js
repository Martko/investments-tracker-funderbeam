const mysql = require('mysql2/promise');

/**
 * Create new MySQL connection
 */
const getConnection = async () => mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const insertPortfolioValue = async (connection, object) => {
  const [rows] = await connection.execute(
    'INSERT INTO `portfolio_values` (date, source, value, initial_investment) VALUES (NOW(),"funderbeam",?,?)',
    Object.values(object),
  );

  return rows.affectedRows;
};

module.exports = {
  getConnection,
  insertPortfolioValue,
};