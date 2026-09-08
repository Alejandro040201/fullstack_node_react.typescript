import server from './server';
import dotenv from 'dotenv';
import colors from 'colors';
import { dbConnect } from './config/db';
dotenv.config();

async function startServer() {

  await dbConnect();

  const port = process.env.PORT || 4000;
  server.listen (port, () => {
      console.log(colors.cyan.bold(`Server is running on port ${port}`));
  })

  //Conectar a base de datos
  // async function connectDB() {
  //     try {
  //         await db.authenticate()
  //         await db.sync()
  //         console.log(colors.blue.white('Conectado a la base de datos'));
  //     } catch (error) {
  //         console.log(error);
  //         console.log(colors.red.bold('Error al conectar a la base de datos'));
  //     }
  // }

  // connectDB();

  // export const dbConnect = async () => {
  //   try {
  //     await db.authenticate();
  //     await db.sync(); // agrego force para rehacer la sincronización por si la tabla tiene cambios.
  //     //  console.log(colors.magenta.bold('Successful DATABASE connection'));
  //   } catch (error) {
  //     //console.error(error);
  //     console.log(colors.red.bold('Error al conectar a la base de datos'));

  //   }
  // };
  
}

startServer()
