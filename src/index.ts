import express, { Request, Response } from 'express'
import { roomsRouter } from './Controllers/room';
import { bookingsRouter } from './Controllers/booking';
import { contactRouter } from './Controllers/contact';
import { userRouter } from './Controllers/user';
const app = express()
const port = 3000
const  swaggerUi  =  require ( 'swagger-ui-express' ) ; 
const swaggerJsDoc = require('swagger-jsdoc');

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




app.get('/live', (req: Request, res: Response) => {         
  res.send(`${new Date().toISOString()}`)
})



app.use("", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
