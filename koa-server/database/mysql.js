const mysql = require('mysql');
 
const pool = mysql.createPool({
    host: '101.43.111.57',
    user: 'root',
    password: 'ZkD707396',
    database: 'learning-dev',
    connectionLimit: 50
})
 
let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                return reject(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    connection.release();
                    if (err) {
                        return reject(err)
                    } else {
                        return resolve(rows);
                    }
                })
            }
        })
    })
}
 
module.exports = query;