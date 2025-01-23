import { sequelize } from "../database/config.js";
import { DataTypes } from "sequelize";

export const medico = sequelize.define('medico',{
    id_medico: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, },

    nombre:{ 
        type:DataTypes.STRING
   } ,
    apellido:{
        type:DataTypes.STRING
    },
    especialidad:{
        type:DataTypes.STRING},
    
    
    consultorio:{
        type:DataTypes.STRING
    }
})