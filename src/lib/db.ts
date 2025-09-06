import mysql from 'mysql2/promise';

// This function creates a connection pool.
// It's better to create a pool once and reuse connections.
let pool: mysql.Pool | null = null;

const getPool = () => {
  if (pool) {
    return pool;
  }

  // Check for environment variables
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;
  if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_DATABASE || !DB_PORT) {
    throw new Error('Database environment variables are not set.');
  }

  pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: parseInt(DB_PORT, 10),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return pool;
};

// Export a function to get a connection from the pool
export const getConnection = async () => {
  return getPool().getConnection();
};
