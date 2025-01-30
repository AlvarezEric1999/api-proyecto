import { response,request, query } from "express"
import bcrypt from 'bcrypt'
import { usuario } from "../models/usuario.js"
import { medico } from "../models/medico.js"
import { cita } from "../models/citas.js"
import { horario } from "../models/horario.js"
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "secreto_super_seguro"

//consultar usuarios
const getUsers = async(req,res) =>{
    const connection = await usuario.findAll()
    res.json(connection);
} 

//agregar usuario
const addUser = async(req,res)=>{
    try {
       const {nombre,apellido,email,no_documento,contrasena} = req.body
       if(nombre=== undefined || email === undefined || contrasena === undefined || no_documento === undefined ){
           return res.status(404).json({message:"bad request .please fill all field"})
       }else{

        const contrasenaHash= await bcrypt.hash(contrasena,10)

        const nuevoUsuario = await usuario.create({
          nombre,
          apellido,
          no_documento,
          email,
          contrasena:contrasenaHash
        })
        res.status(201).json(nuevoUsuario);
        console.log(nuevoUsuario.nombre)
       }
    } catch (error) {res.status(400);}
}


const loginUser = async(req,res)=>{
    try {
       const { email,contrasena} = req.body
        //validacion de datos ingresados
        if( !email || !contrasena ){
            return res.status(400).json({message:"bad request .please fill all field"})
          }

        const user= await usuario.findOne({where:{email}}) 
        console.log(user)
        
        if(!user){  
          return res.status(401).json({message:"usuario no encontrado"})
        }
        
        const isMatch = await bcrypt.compare(contrasena,user.contrasena );
     
        if(!isMatch) {
          return res.status(401).json({message:'contrasena incorrecta'})
        }

        
        const token = jwt.sign(
          { id: user.id_usuario, userName: user.nombre},
            JWT_SECRET,
            { expiresIn:"1h"}
        )
     
     
        res.json({ message: "Login exitoso", token });


      }catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Error al iniciar sesión' });
     }

}


const profile = async(req, res )=>{

res.send('pagina principal')


}






//consultar medicos
const getMedical = async(req,res)=>{
  const query = await medico.findAll({
    include:[{
      model: horario,
      attributes:['fecha','id_horario','bloque_horario','disponible','id_horario','hora'] }]
  });
  res.json(query)
}



//anadir mmedico
const addMedical = async(req,res)=>{
  try {
    const {nombre,apellido,especialidad,consultorio} = req.body
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

//obtener citas por id
const getCitabyId = async(req,res) =>{
  const {id_usuario} = req.params;

    const query = await cita.findOne({
      where:{id_usuario},
      attributes: ['id_cita','id_usuario', 'fecha', 'hora'],
      include:[{
        model:medico,
        attributes:['nombre','apellido','especialidad','consultorio']
      },
      {
        model: usuario, // Incluye la tabla relacionada "Usuario"
        attributes: ['nombre', 'apellido', 'no_documento'], // Selecciona columnas específicas de "Usuario"
      },]
    });
    res.status(200).json(query)
}

//obtener todas las citas
const getCita = async(req,res) =>{
    const query = await cita.findAll({
      attributes: ['id_cita',"id_usuario", 'fecha', 'hora',"Disponible"],
      include:[{
        model:medico,
        attributes:['nombre','apellido','especialidad','consultorio']
      },
      {
        model: usuario, // Incluye la tabla relacionada "Usuario"
        attributes: ['nombre', 'apellido', 'no_documento'], // Selecciona columnas específicas de "Usuario"
      },]
    });
    res.status(200).json(query)
}
// crear una cita nueva
const addCita = async(req,res) => {
  try {
    const {id_usuario,id_medico,fecha,hora,Disponible} = req.body
    if(id_usuario === undefined ||  id_medico === undefined ||  fecha === undefined || hora === undefined ){
        return res.status(404).json({message:"bad request .please fill all field"})
    }else{
     const nuevaCita = await cita.create({id_usuario,id_medico,fecha,hora,Disponible})
     res.status(201).json(nuevaCita);
    }
 } catch (error) {res.status(400);}}


//actualizar cita


const actCita = async(req,res)=>{
  try {
    
    const {id_cita}= req.params;
    const {Disponible} = req.body;

    const query = await cita.update(
      {Disponible:Disponible},
      {where:{id_cita}}
    )

    res.status(200).json(query)
  } catch (error) {
    
  }
}


//obtener horario
const getHorario = async(req,res)=>{
  const query = await horario.findAll()
  res.status(201).json(query)
}


//anadir horario
const addHorario = async(req,res)=>{
  try {
    const {id_medico,fecha,bloque_horario,hora} = req.body 
    if( id_medico === undefined ||  fecha === undefined ||  bloque_horario === undefined ){
        return res.status(404).json({message:"bad request .please fill all field"})
    }else{
      const query = await horario.create({id_medico,fecha,bloque_horario,hora})
      res.status(201).json(query);
    }
 } catch (error) {
     res.status(400);
 }
}
const actHorario = async(req,res)=>{
  try {
    
    const {id_horario} = req.params;
    const {disponible} = req.body;

    const query = await horario.update(
      { disponible:disponible},
      {where:{id_horario}}
    )
    res.status(200).json(query);

  } catch (error) {
    
  }
}


//exportar metodos de los controladores
export const methods = {
    getUsers,addUser,loginUser,profile,getMedical,addMedical,addCita,getCita,getCitabyId,getHorario,addHorario,actCita,actHorario 
}