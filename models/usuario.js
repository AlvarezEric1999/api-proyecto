import { sequelize } from "../database/config.js";
import { DataTypes } from "sequelize";


export const usuario = sequelize.define('usuario',{
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, },

    nombre:{ 
        type:DataTypes.STRING
   } ,
    apellido:{
        type:DataTypes.STRING
    },
    no_documento:{
        type:DataTypes.STRING},
    
    
    email:{
        type:DataTypes.STRING
    },
    contrasena:{
        type:DataTypes.STRING
    }
})