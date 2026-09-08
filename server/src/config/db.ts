
import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import Product from '../models/Product.model'
import colors from 'colors';
dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {
    //models: [__dirname + '/src/models/**/*.ts'],
    models: [Product],
    logging: false
})

export const dbConnect = async () => {
  try {
    await db.authenticate();
    await db.sync(); // agrego force para rehacer la sincronización por si la tabla tiene cambios.
    //  console.log(colors.magenta.bold('Successful DATABASE connection'));
  } catch (error) {
    //console.error(error);
    console.log(colors.red.bold('Error al conectar a la base de datos'));

  }
};

export default db