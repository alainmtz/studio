
'use server';

import { getConnection } from '@/lib/db';

export async function testDbConnection(): Promise<{ success: boolean; error?: string }> {
  let connection;
  try {
    // Get a connection from the pool
    connection = await getConnection();
    
    // If we get a connection, it's successful.
    // The pool handles pinging the server to ensure it's alive.
    return { success: true };
  } catch (error: any) {
    console.error('Database connection test failed:', error);
    // Provide a user-friendly error message
    let errorMessage = 'An unknown error occurred.';
    if (error.code) {
        switch (error.code) {
            case 'ECONNREFUSED':
                errorMessage = 'Connection refused. Please check the host and port.';
                break;
            case 'ER_ACCESS_DENIED_ERROR':
                errorMessage = 'Access denied. Please check the username and password.';
                break;
            case 'ER_BAD_DB_ERROR':
                errorMessage = 'The specified database does not exist.';
                break;
            default:
                errorMessage = `Error: ${error.code} - ${error.message}`;
        }
    } else if (error.message) {
        errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  } finally {
    // Release the connection back to the pool
    if (connection) {
      try {
        await connection.release();
      } catch (releaseError) {
        console.error('Error releasing database connection:', releaseError);
      }
    }
  }
}
