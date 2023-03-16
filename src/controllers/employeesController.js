const moment = require("moment")
import { getConnection } from "../database/database.js"

//Get All Employees
const getEmployees = async (req, res) => {
    try {
        const connection = await getConnection()
        await connection.query('SELECT * FROM employees', 
        function (err, rows) 
            { res.send(rows); 
            console.log("result: ", rows); 
        })
        
    } catch (error) {
        res.status(500)
        console.log("error: ", error);
    }
}


//Get Employee By Id
const getEmployeeById = async (req,res) => {
    try {
        const { employee_id } = req.params
        const connection = await getConnection()
        await connection.query('SELECT * FROM employees WHERE employee_id = ?', 
        employee_id,
        function (err, rows) 
            { res.send(rows); 
            console.log("result: ", rows); 
        })
        
    } catch (error) {
        res.status(500)
        console.log("error: ", error );
    }
}

//Get Employee Paginado
const getPaginatedEmployees = async (req,res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;
    
    try {
        const connection = await getConnection()
        
        await connection.query(`SELECT * FROM employees LIMIT ${limit} OFFSET ${offset}`, 
        function (err, result) 
            { res.send(result); 
            console.log("result: ", result); 
        })
        
    } catch (error) {
        res.status(500)
        console.log("error: ", error);
    }
}


//Add Employee
const addEmployee = async (req, res) => { 
    const { first_name, last_name, cuit, join_date, rol, employee_id, team_id } = req.body
    if(!!first_name && !!last_name && !!rol) {
        try {
            const join_date = moment().format(join_date)
            const connection = await getConnection()
            const employees = {
                first_name, last_name, cuit, join_date, rol, employee_id, team_id
            }
            await connection.query('INSERT INTO employees SET ?', employees, 
            function (err, result) 
            { res.send(result); 
            console.log("result: ", result); 
            })
        
        } catch (error) {
            res.status(500)
            console.log("error: ", error);
        }
    } else {
        res.status(400)
        console.log("error-not found: ");
}
}

//Update Employee
const updateEmployee = async (req, res) => {
    const { employee_id } = req.params;
    const { first_name, last_name, cuit, rol, team_id } = req.body

    try {
        const join_date = moment().format(join_date)
        const connection = await getConnection()
        const employees = {
            first_name, last_name, cuit, join_date, rol, team_id
        }
        await connection.query('UPDATE employees SET ? WHERE employee_id = ? ', [employees, employee_id], 
        function (err, result) 
            { res.send(result); 
            console.log("result: ", result); 
        })
    } catch (error) {
        res.status(400)
    }

}

//Delete Employee
const deleteEmployee = async (req, res) => {
    try {
        const { employee_id } = req.params
        const connection = await getConnection()
        await connection.query('DELETE FROM employees WHERE employee_id = ?', employee_id,
        function (err, result) 
            { res.send(result); 
            console.log("result: ", result); 
        })
    } catch (error) {
        res.status(500)
    }
}

export const methods = {
    getEmployees,
    getEmployeeById,
    getPaginatedEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
}