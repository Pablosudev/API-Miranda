import 'dotenv/config';
import express, { Request, Response } from "express";
import { roomsRouter } from "./Controllers/room";
import { bookingsRouter } from "./Controllers/booking";
import { contactRouter } from "./Controllers/contact";
import { userRouter } from "./Controllers/user";
import { loginRouter } from "./Controllers/login";
import serverless from "serverless-http";
import { authenticateJWT } from "./Middleware/auth";
import  {sequelize}  from './Utils/database';



const app = express();
const port = 3005;
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
app.use(cors());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Api Miranda",
      version: "1.0.0",
      description: "API para gestionar los datos del Hotel Miranda",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./src/Controllers/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(express.json());

app.use("/api/v1/login", loginRouter);
app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/contacts",  contactRouter);
app.use("/api/v1/users", userRouter);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/live", (req: Request, res: Response) => {
  res.send(`${new Date().toISOString()}`);
});



const runServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");
    
  
    await sequelize.sync({force:false});
    
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};


process.on("SIGINT", async () => {
  try {
    await sequelize.close();
    console.log("Conexión a la base de datos cerrada.");
    process.exit(0);
  } catch (error) {
    console.error("Error al cerrar la conexión a la base de datos:", error);
    process.exit(1);
  }
});

runServer();

export const handler = serverless(app);