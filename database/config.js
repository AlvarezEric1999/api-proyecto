import mysql from 'mysql2/promise';

import { Sequelize } from 'sequelize';


export const sequelize = new Sequelize('gestionCitas','root','admin123',
    {
    host:'localhost',
    dialect:'mysql'
})

export default sequelize;