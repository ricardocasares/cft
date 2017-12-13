import { BaseData } from '../base/base'

export enum UserLevel {
  USER = 0,
  ADMIN = 50
}

export interface UserData extends BaseData {
  gender: string
  name: string
  location: {
    street: string
    city: string
    state: string
    postcode: string
  }
  email: string
  username: string
  dob: string
  phone: string
  avatarUrl: string
  level: UserLevel
  botId: string
}
