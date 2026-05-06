export const Role = {
    USER: 'USER',
    ADMIN: 'ADMIN'
} as const

export type Role = (typeof Role)[keyof typeof Role]


export interface IUser {
    email: string
    uuid: string
    role: Role
}

export interface IUserAccountInfo{
    uuid: string
    email: string
    name: string
    surename: string | null
    middleName: string | null
    dateOfBirth: string | null
    phone: string | null
    role: Role
}

