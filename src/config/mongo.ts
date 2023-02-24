import "dotenv/config";
import { connect } from "mongoose";

/**
 * Creamos una función asinconica que espera  una promesaa que 
 * se conecte a la base de datos
*/

async function dbConnect(): Promise<void> {
  const DB_URI = <string>process.env.DB_URI;
  await connect(DB_URI);
}

export default dbConnect;