const moment = require("moment")
import { getConnection } from "../database/database.js"

//Get all assets
const getAssets = async (req, res) => {
    try {
        const connection = await getConnection()
        await connection.query('SELECT * FROM assets', 
        function (err, rows) 
            { res.send(rows); 
            console.log("result: ", rows); 
        })
        
    } catch (error) {
        res.status(500)
        console.log("error: ", error);
    }
}

//Get Assets by Employee Id
const getAssetsByEmployeeId = async (req,res) => {
    try {
        const { employee_id } = req.params
        const connection = await getConnection()
        await connection.query('SELECT * FROM assets WHERE employee_id = ?',
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

//Get Assets By Id
const getAssetsById = async (req, res) => {
    try {
        const { assets_id } = req.params
        const connection = await getConnection()
        await connection.query('SELECT * FROM assets WHERE assets_id = ?', 
        assets_id,
        function (err, rows) 
            { res.send(rows); 
            console.log("result: ", rows); 
        })
        
    } catch (error) {
        res.status(500)
        console.log("error: ", error );
    }
}

//Get Paginated Assets
const getPaginatedAssets = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;

    try {
        const connection = await getConnection()

        await connection.query(`SELECT * FROM assets LIMIT ${limit} OFFSET ${offset}`, 
        function (err, result) 
            { res.send(result); 
            console.log("result: ", result); 
        })
    } catch (error) {
        res.status(500)
        console.log("error: ", error);
    }
}


//Post => Create Asset
const addAsset = async (req, res) =>{
    const{ name, type, code, marca, description, purchase_date, assets_id, employee_id } = req.body
    if (!!name && !!type && !!marca) {
        try {
            const purchase_date = moment().format(purchase_date)
            const connection = await getConnection()
            const assets = {
                name, type, code, marca, description, purchase_date, assets_id, employee_id 
            }
            await connection.query('INSERT INTO assets SET ?', assets,
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

//Update Asset
const updateAsset = async (req, res) => {
    const { assets_id } = req.params
    const { name, type, code, marca, description, purchase_date } = req.body

    try {
        const purchase_date = moment().format(purchase_date)
        const connection = await getConnection()
        const assets = {
            name, type, code, marca, description, purchase_date
        }
        await connection.query('UPDATE assets SET ? WHERE assets_id = ? ', [assets, assets_id], 
        function (err, result) 
            { res.send(result); 
            console.log("result: ", result); 
        })
    } catch (error) {
        res.status(404)
    }
}

//Delete Asset
const deleteAsset = async (req, res) => {
    try {
        const { assets_id } = req.params
        const connection = await getConnection()
        await connection.query('DELETE FROM assets WHERE assets_id = ?', assets_id,
        function (err, result) 
            { res.send(result); 
            console.log("result: ", result); 
        })
    } catch (error) {
        res.status(500)
    }
}

export const methods = {
    getAssets,
    getAssetsById,
    getPaginatedAssets,
    addAsset,
    updateAsset,
    deleteAsset,
    getAssetsByEmployeeId
}