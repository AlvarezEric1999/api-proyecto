import mysql from 'mysql2/promise';


const connection  = mysql.createPool({
    host:'localhost',
    database:'user',
    user:'root',
    password:'root'
})


const getConnection = ()=>{

    return connection;
}

export default getConnection