
import { response,request } from "express"
//import getConnection from "../database/config.js"
import bcrypt from 'bcrypt'
import { usuario } from "../models/usuario.js"
import { medico } from "../models/medico.js"
import { cita } from "../models/citas.js"
import { horario } from "../models/horario.js"


//consultar usuarios
const getUsers = async(req,res) =>{
    const connection = await usuario.findAll()
    res.json(connection);
} 

//agregar usuario
const addUser = async(req,res)=>{
    try {
       const {nombre,apellido,email,no_documento,contrasena} = req.body
       console.log(nombre,apellido,email,no_documento,contrasena) 
       
       if(nombre=== undefined || email === undefined || contrasena === undefined || no_documento === undefined ){
           return res.status(404).json({message:"bad request .please fill all field"})

       }else{

        const nuevoUsuario = await usuario.create({
          nombre,
          apellido,
          no_documento,
          email,
          contrasena
        })
        res.status(201).json(nuevoUsuario);
       }

    } catch (error) {
        res.status(400);
    }
}


//pendiente
const loginUser = async(req,res)=>{
    try {

       const { email,contrasena} = req.body
      
        //validacion de datos ingresados
       if( email === undefined || contrasena === undefined ){
            return res.status(404).json({message:"bad request .please fill all field"})
       }
       else{
       //const connection = await getConnection();
       //const [result] = await connection.execute("SELECT * FROM usuario WHERE email = ?", [email]);
       

       if (!result[0]) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }


       const UserPassword = result[0].contrasena || "";
       //console.log("contrasena :" + password + UserPassword);
       //console.log("contrasena usuario :" +  UserPassword)

       //console.log(result)
       const isMatch = await bcrypt.compare(password, UserPassword);
       
       if (!isMatch) {
         return res.status(401).json({   error: 'Contraseña incorrecta' });
       }

       res.json({ message: 'Inicio de sesión exitoso' });
       }

     } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Error al iniciar sesión' });
     }

}

//consultar medicos
const getMedical = async(req,res)=>{
  const query = await medico.findAll({
    include:[{
      model: horario,
      attributes:['fecha','bloque_horario','estado','id_horario']
    
    }]
  });
  res.json(query)

}
//anadir mmedico
const addMedical = async(req,res)=>{
  try {
    const {nombre,apellido,especialidad,consultorio} = req.body
    //console.log(nombre,apellido) 
    
    if(nombre=== undefined || apellido === undefined || especialidad === undefined || consultorio === undefined ){
        return res.status(404).json({message:"bad request .please fill all field"})

      }else{
      const nuevoMedico = await medico.create({ nombre,apellido,especialidad,consultorio })
      res.status(201).json(nuevoMedico);
      }

 } catch (error) {
     res.status(400);
 }
}

//obtener citas
const getCita = async(req,res) =>{
  const {id_cita} = req.params;
    const query = await cita.findOne({
      where:{id_cita},
      include:{
        model:medico,
        attributes:['nombre','apellido','especialidad','consultorio']
      }
    });
    res.json(query)
}



// crear una cita nueva
const addCita = async(req,res) => {
  try {
    const {id_usuario,id_medico,fecha,hora,Disponible} = req.body
    //console.log(nombre,apellido) 
    
    if(id_usuario === undefined ||  id_medico === undefined ||  fecha === undefined || hora === undefined ){
        return res.status(404).json({message:"bad request .please fill all field"})

    }else{
     const nuevaCita = await cita.create({id_usuario,id_medico,fecha,hora,Disponible})
     res.status(201).json(nuevaCita);
    }

 } catch (error) {
     res.status(400);
 }
}

//obtener horario
const getHorario = async()=>{

  const query = await horario.findAll()
  res.status(201).json(query)
}


//
const addHorario = async(req,res)=>{
  try {
    const {id_medico,fecha,bloque_horario} = req.body
    //console.log(nombre,apellido) 
    
    if( id_medico === undefined ||  fecha === undefined ||  bloque_horario === undefined ){
        return res.status(404).json({message:"bad request .please fill all field"})
    }else{
      const query = await horario.create({
        id_medico,fecha,bloque_horario
      })
      res.status(201).json(query);
    }
 } catch (error) {
     res.status(400);
 }
}



//exportar metodos de los controladores
export const methods = {
    getUsers,addUser,loginUser,getMedical,addMedical,addCita,getCita,getHorario,addHorario 
}