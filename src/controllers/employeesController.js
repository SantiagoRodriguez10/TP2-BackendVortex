const moment = require("moment")
import { getConnection } from "../database/database.js"

//Get All Employees
const getEmployees = async (req, res) => {
    try {
        const connection = await getConnection()
        /* const result = await connection.query('SELECT * FROM employees') //ejecuto un query (una consulta sql) que sea un select creando asi una consulta directamente a la base de datos. Este es mi método GET
        console.log(result);
        res.status(200).json(result); */
        await connection.query('SELECT * FROM employees', 
        function (err, rows) 
            {res.send(Object.values(JSON.parse(JSON.stringify(rows)))) 
            console.log(Object.values(JSON.parse(JSON.stringify(rows))))
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
            {res.send(Object.values(JSON.parse(JSON.stringify(rows)))) 
            console.log(Object.values(JSON.parse(JSON.stringify(rows))))
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
        function (err, rows) 
            {res.send(Object.values(JSON.parse(JSON.stringify(rows)))) 
            console.log(Object.values(JSON.parse(JSON.stringify(rows))))
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
            function (err, rows) 
            {res.send(Object.values(JSON.parse(JSON.stringify(rows)))) 
            console.log(Object.values(JSON.parse(JSON.stringify(rows))))
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
        function (err, rows) 
            {res.send(Object.values(JSON.parse(JSON.stringify(rows)))) 
            console.log(Object.values(JSON.parse(JSON.stringify(rows))))
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
        function (err, rows) 
            {res.send(Object.values(JSON.parse(JSON.stringify(rows)))) 
            console.log(Object.values(JSON.parse(JSON.stringify(rows))))
        })
    } catch (error) {
        res.status(500)
    }
}

const getFilterEmployee = async (req,res) => {
    try {
        const rol = req.query.rol
        const connection = await getConnection()
        await connection.query('SELECT * FROM employees WHERE rol = ?', rol,
        function (err, rows) 
            {res.send(Object.values(JSON.parse(JSON.stringify(rows)))) 
            console.log(Object.values(JSON.parse(JSON.stringify(rows))))
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
    deleteEmployee,
    getFilterEmployee
}