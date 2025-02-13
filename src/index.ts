import express, { Request, Response } from 'express'
import { roomsRouter } from './Controllers/room';
import { bookingsRouter } from './Controllers/booking';
import { contactRouter } from './Controllers/contact';
import { userRouter } from './Controllers/user';
import { loginRouter } from './Controllers/login';
import dotenv from 'dotenv';
dotenv.config();
const app = express()
const port = 3000
const  swaggerUi  =  require ( 'swagger-ui-express' ) ; 
const swaggerJsDoc = require('swagger-jsdoc');

//CONFIGURACIÓN SWAGGER
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Api Miranda',
      version: '1.0.0',
      description: 'API para gestionar los datos del Hotel Miranda',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/Controllers/*.ts'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


app.use(roomsRouter);
app.use(bookingsRouter);
app.use(contactRouter);
app.use(userRouter);
app.use(loginRouter)
app.use(express.json());
app.use("", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/live', (req: Request, res: Response) => {         
  res.send(`${new Date().toISOString()}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
