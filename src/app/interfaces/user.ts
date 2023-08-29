export interface User{
    name: string,
    photo: string
}

export interface LoginIn{
    email: string,
    password: string
}

export interface Login{
    content: string,
    token: string,
    person: number
}