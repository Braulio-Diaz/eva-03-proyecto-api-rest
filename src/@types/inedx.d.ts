import http from 'http'
import { UserTokenPayload } from "../models/dto/UserDTO";

//Código que me permite utilizar req.user y res.user en middelwares / tokenValidators
declare module 'express-serve-static-core' { 
  export interface Request extends http.IncomingMessage, Express.Request {
    user?: UserTokenPayload
  }

  export interface Response extends http.ServerResponse, Express.Response {
    user?: UserTokenPayload
  }
}