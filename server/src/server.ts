import express from 'express';
import router from './router';
import swaggerUi from 'swagger-ui-express';
import swaggerspec, {swaggerUiOptions} from './config/swagger';
// import colors from 'colors';
// import db from './config/db';

//Conectar a base de datos
// export async function connectDB() {
//     try {
//         await db.authenticate()
//         await db.sync()
//         // console.log(colors.blue.white('Conectado a la base de datos'));
//     } catch (error) {
//         // console.log(error);
//         console.log(colors.red.bold('Error al conectar a la base de datos'));
//     }
// }
// connectDB()

// Instancia de express
const server = express();
 
// export const dbConnect = async () => {
//   try {
//     await db.authenticate();
//     db.sync(); // agrego force para rehacer la sincronización por si la tabla tiene cambios.
//     //  console.log(colors.magenta.bold('Successful DATABASE connection'));
//   } catch (error) {
//     console.error(error);
//   }
// };
 
// dbConnect();
 
server.use(express.json());
server.use('/api/products', router);
 
// server.get('/api', (req, res) => {
//   res.json({ msg: 'Desde API' });
// });

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerspec, swaggerUiOptions));
 
export default server;
 