const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("../utils/jwt");

// Crear usuario
const register = async (req, res) => {
    const { name, lastname, email, password, address } = req.body;
    if (name!=null && lastname!=null && email!=null && password!=null && address!=null) {

        //console.log("Contraseña: ", password);

        const encriptar = await bcrypt.genSalt(10);
        const contrasenia = await bcrypt.hash(password, encriptar);
        //console.log("Contraseña encriptada: ", contrasenia);

        const newUser = await User({
            name,
            lastname,
            email: email.toLowerCase(),
            password,
            address,
            active: true,
            rol: "user"
        })
        console.log("Usuario creado: ", newUser);
        const userDB = await newUser.save();
        res.status(201).json(userDB);
    } else {
        console.log("Faltan datos");
    }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    if (!email || !password) {
      throw new Error("El email y la contraseña son obligatorios");
      console.log("no recibe datos");
    }
    const emailLowerCase = email.toLowerCase();
    const userStore = await User.findOne({ email: emailLowerCase }).exec();
    if (!userStore) {
      throw new Error("El usuario no existe");
    }
    const check = await bcrypt.compare(password, userStore.password);
    if (!check) {
      throw new Error("Contraseña incorrecta");
    }
    if (!userStore.active) {
      throw new Error("Usuario no autorizado o no activo");
    }
    res.status(200).send({
      access: jwt.createAccessToken(userStore),
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
    console.log();
  }
};

//Consultar usuario creado
const getAllUsers = async (req, res) => {
  try{
    const response = await User.find()
    res.status(200).json({ message: response });
  }catch (error){
    res.status(400).json(error);
  }  
  
};

//COnsultar usuario por id
const getUserById = async (req, res) => {
  const { userId } = req.params; 
    try {
      const response = await User.findById(userId)
      if(!response){
        throw new Error("Usuario no existe");
      }else{
        res.status(200).json(response);
      }
    }catch (error){
      res.status(400).json(error);
    }
};

//Actualizar usuario
const editUserPatch = async (req, res) => {
  try{
    const { userId } = req.params;
    const userData = req.body;
    
    if(userData.password){
      const encriptarContrasenia = await bcrypt.genSalt(10); 
      const contrasenia = await bcrypt.hash(password, encriptarContrasenia);
      userData.password = contrasenia;
    }
    await User.findByIdAndUpdate(userId, userData);
    res.status(200).json({ message: "Usuario actualizado" });
  }catch (error){
    res.status(400).json(error);
  }
};

//Actualizar usuario con PUT
const editUserPut = async (req, res) => {
  try{
    const { userId } = req.params;
    const { name, lastname, email, password, address, active, rol } = req.body;
    const encriptarContrasenia = await bcrypt.genSalt(10); 
    const contrasenia = await bcrypt.hash(password, encriptarContrasenia);
  
    const userData = {
      name,
      lastname,
      email,
      rol,
      password: contrasenia,
      address,
      active
    }
    await User.findByIdAndUpdate(userId, userData);
    res.status(200).json({message: "Usuario actualizado"});
  }catch (error){
    res.status(400).json(error);
  }
};

//Eliminar usuario
const deleteUser = async (req, res) => {
  try{
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).send("Usuario eliminado");
  }catch (error){
    res.status(400).json(error);
  }
};
    

module.exports = {
    register,
    login,
    getAllUsers,
    getUserById,
    editUserPatch,
    editUserPut,
    deleteUser
};
