import * as mysql from 'mysql2/promise'; 


export const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'mirandahotel',
      
    });
    
    console.log("Conectado a la base de datos MySQL");
    
    return connection; 
  } catch (error) {
    console.error("Error al conectar a la base de datos: ", error);
    throw error; 
  }
};
