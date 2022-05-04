export interface BaseUserDTO {
  firstName: string
  lastName: string
  email: string
}

export interface UserDTO extends BaseUserDTO {
  id: number
}

export interface CreateUserDTO extends BaseUserDTO {
  password: string
}

export type UpdateUserDTO = Partial<CreateUserDTO>

export interface LoginUserDTO extends UserDTO {
  password: string
}

export interface UserTokenPayload {
  sub: number //especie de id para referirnos a quién va dirigido el token
  email: string 
  exp: number //fecha de expiración
  iat: number //fecha de creación
}