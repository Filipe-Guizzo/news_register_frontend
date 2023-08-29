export interface Person{
    id?: number,
    name: string,
    date_born: string,
    sex: string,
    email: string,
    password: string,
    password_again?: string,
    token?: string, 
    photo?: string | null | undefined, 
    dt_create?: string,
    dt_update?: string
}