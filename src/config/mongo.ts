import "dotenv/config";
import mongoose from 'mongoose';
/**
 * Creamos una función asinconica que espera  una promesaa que 
 * se conecte a la base de datos
*/

const dbConnect=async()=>{
  mongoose.set("strictQuery", false); 
  const DB_URI = <string>process.env.DB_URI;
  await mongoose.connect(DB_URI);
}

export default dbConnect;