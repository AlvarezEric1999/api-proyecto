import  sequelize  from "../database/config.js";
import { DataTypes } from "sequelize";
import {usuario} from "./usuario.js"
import  {medico}  from "./medico.js";
import { horario } from "./horario.js";



 export const cita = sequelize.define('cita',{
    id_cita: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, },

    id_usuario:{ 
        type:DataTypes.INTEGER
   } ,
    id_medico:{
        type:DataTypes.INTEGER
    },
    fecha:{
        type:DataTypes.DATE},
    
    
    hora:{
        type:DataTypes.TIME
    },
    Disponible:{
        type:DataTypes.BOOLEAN
    }


}
)

  cita.belongsTo(usuario, {
    foreignKey: "id_usuario",
  });
  
  usuario.hasMany(cita, {
    foreignKey: "id_usuario",
  });
  
  cita.belongsTo(medico, {
    foreignKey: "id_medico",
  });
  
  medico.hasMany(cita, {
    foreignKey: "id_medico",
  });
  


//await usuario.sync();
//await medico.sync();
//await cita.sync();


//await horario.sync()