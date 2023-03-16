const express = require('express')
const morgan = require('morgan')
//Routes
import employeesRoutes from "./routes/employeesRoutes"
import assetsRoutes from "./routes/assetsRoutes"

const app = express()

//Settings
app.set("port", 4000)

//middlewares (funciones intermedias entre una peticion y una respuesta)
app.use(morgan("dev")); //indico que quiero utilizar morgan en modo desarrollo, que me detallara por consola las peticiones que estoy haciendo
app.use(express.json()); //de express uso el metodo json para que pueda entender y procesar json

//Routes
app.use("/api/employees", employeesRoutes)
app.use("/api/assets", assetsRoutes)

export default app