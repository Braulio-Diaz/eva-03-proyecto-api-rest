import UserRepository from "../models/repositories/UserRepository"
import { loginSchema, registerSchema } from "../models/validators/userSchemas"
import { Request, Response } from "express"
import { CreateUserDTO } from "../models/dto/UserDTO"
import { generateToken } from "../lib/jwt"
import bcrypt from 'bcryptjs'

export default class AuthController {
  public readonly login = async (req: Request, res: Response) => {
    const credentials = req.body

    try {
      await loginSchema.validateAsync(credentials)
    } catch (err) {
      res.status(400).json({ error: err.message })
      return
    }

    const repository = new UserRepository()

    try {
      const userFromDb = await repository.findByEmail(credentials.email)

    if (!userFromDb || !bcrypt.compareSync(credentials.password, userFromDb.password)) { //Compara las credenciales ingresadas con las que se encuentra en la base de datos
      res.status(401).json({ message: 'Invalid credentials' })
      return
    }

    const token = generateToken(userFromDb) //con las credenciales guardadas en userFromDb se genera el token con esa info contenida

    res.json({ token }) //responde json con el token al momento del login

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })     
    }
  }

  public readonly register = async (req: Request, res: Response) => {
    const user = req.body as CreateUserDTO

    try {
      await registerSchema.validateAsync(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
      return 
    }

    const hashedPassword = bcrypt.hashSync(user.password, 10) //le pasamos la password del usuario y el nivel de encriptación

    const repository = new UserRepository()

    try {
      const newUser = await repository.create({ ...user, password: hashedPassword }) //le pasamos los datos de CreateUserDTO contenida en user y la password encriptada
      res.status(201).json(newUser)  

    } catch (error) {
      if (error.code === 'P2002') { //P2202 es el codigo de error cuando creamos un usuario que ya existe
        res.status(409).json({ message: 'User already exists' })
        return
      }

      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }
}