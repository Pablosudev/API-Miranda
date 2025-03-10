import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "mirandahotel",
  logging: false, 
  pool: {
    max: 10, 
    min: 0,  
    acquire: 30000, 
    idle: 10000, 
  },
});

export { sequelize };