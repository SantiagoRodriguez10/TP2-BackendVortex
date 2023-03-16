import {Router} from "express"
import { methods as employeeController } from "./../controllers/employeesController";

const router = Router();
//Cuando acceda a esta se me va a retornar la res de la funcion
router.get('/get', employeeController.getEmployees); 
router.get('/get/:employee_id', employeeController.getEmployeeById);
router.get('/pag', employeeController.getPaginatedEmployees)
router.post('/add', employeeController.addEmployee)
router.put('/update/:employee_id', employeeController.updateEmployee)
router.delete('/delete/:employee_id', employeeController.deleteEmployee)


export default router