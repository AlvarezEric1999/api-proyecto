import mysql from 'mysql2/promise';


const connection  = mysql.createPool({
    host:process.env.HOST,
    database:process.env.DATABASE,
    user:process.env.USER,
    password:process.env.PASSWORD
})


const getConnection = ()=>{

    return connection;
}

export default getConnection