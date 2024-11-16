
import { response,request } from "express"
import getConnection from "../database/config.js"
import bcrypt from 'bcrypt'

//consultar usuerios
const getUsers = async(req,res) =>{

    const connection = await getConnection()
    const result = await connection.query("SELECT nombre,email,documento,contrasena from usuario")
    res.json(result[0]);
} 

//agregar usuario
const addUser = async(req,res)=>{
    try {

       const { nombre ,email,password,numero_de_documento} = req.body
      
       console.log(nombre ,email,password,numero_de_documento)
        //validacion que si se ingresen datos
       if(nombre=== undefined || email === undefined || password === undefined || numero_de_documento === undefined ){
           return res.status(404).json({message:"bad request .please fill all field"})
       }else{

       const user = {nombre,email,password,numero_de_documento};
       const connection = await getConnection();
       const hashPasswrod = await bcrypt.hash(password,10)
       const result = await connection.query("INSERT INTO usuario (nombre,email,documento,contrasena) " + " VALUES (?,?,?,? )",[nombre,email,numero_de_documento,hashPasswrod])
       return res.json(200);
       }

    } catch (error) {
        res.status(400);
    }

}



const loginUser = async(req,res)=>{
    try {

       const { email,password} = req.body
      
        //validacion de datos ingresados
       if( email === undefined || password === undefined ){
            return res.status(404).json({message:"bad request .please fill all field"})
       }
       else{
       const connection = await getConnection();
       const [result] = await connection.execute("SELECT * FROM usuario WHERE email = ?", [email]);
       

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


export const methods = {
    getUsers,addUser,loginUser
}