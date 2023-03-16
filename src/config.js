import { config } from "dotenv";

config(); //esto me permite ejecutar la funcion config que pone a mi disposicion las variables de entorno que asigne o configure en .env

export default {
    host: process.env.HOST || '', //utilizo el valor que indique en mi variable de entorno sin exponer mis datos
    database: process.env.DATABASE || '',
    user: process.env.USER || '',
    password: process.env.PASSWORD || '',
    port: process.env.PORT || ''
};