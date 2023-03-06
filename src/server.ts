import "dotenv/config";
import  express  from "express";
// import swaggerUi  from "swagger-ui-express";
// import swaggerSetup  from "./api/docs/swagger"
import  cors  from "cors";//
import  { router }  from "./api/routes/index";
import db from "./config/mongo";
const Port= process.env.PORT || 3001;

const app = express();
// Agregar la documentación de Swagger a la aplicación
app.use(cors());// Allow cross-origin requests from any origin (for development)
app.use(express.json()); // Parse JSON bodies(Recived the response in JSON format)
app.use(router);// Use the routes defined in the router
// app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup));
//Connect to the database
db().then(()=>{
  console.log("Database is connected");
})
//Start the server
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
}); 

export default {app};