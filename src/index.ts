import express, { Request, Response } from 'express'
import { roomsRouter } from './Controllers/room';
import { bookingsRouter } from './Controllers/booking';
import { contactRouter } from './Controllers/contact';
import { userRouter } from './Controllers/user';
import 'dotenv/config'
import { loginRouter } from './Controllers/login';
import { connectDB} from "./Utils/database"

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

app.use(express.json())
app.use('/api/v1/login', loginRouter)
app.use('/api/v1/rooms', roomsRouter);
app.use('/api/v1/bookings', bookingsRouter);
app.use('/api/v1/contacts', contactRouter);
app.use('/api/v1/users', userRouter);
app.use("", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/live', (req: Request, res: Response) => {         
  res.send(`${new Date().toISOString()}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const runServer = async () => {
  try {
    await connectDB();  
    app.listen(3001, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);  
  }
}

runServer();
