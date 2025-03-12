import { Sequelize } from "sequelize";


export const sequelize = new Sequelize({
  dialect: "mysql",
  host: 'localhost',
  username: 'root',
  password: '24Miranda97',
  database: 'hotelmiranda',
  logging: false,
});


sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });


