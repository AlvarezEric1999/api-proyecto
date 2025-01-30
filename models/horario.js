import sequelize from '../database/config.js'
import { DataTypes } from 'sequelize'
import { medico } from './medico.js'


export const horario = sequelize.define('horario',{

        id_horario:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },

        id_medico:{
            type:DataTypes.INTEGER
        },

        fecha:{
            type:DataTypes.DATE
        },

        bloque_horario:{
            type:DataTypes.INTEGER
        },
        disponible:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        hora:{
            type:DataTypes.STRING
        }
    })

horario.belongsTo(medico,{
    foreignKey:'id_medico'
}
)

medico.hasMany(horario,{
    foreignKey:'id_medico'
})