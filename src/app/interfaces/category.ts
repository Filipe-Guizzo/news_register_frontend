import { Person } from "./person";

export interface Category{
    id: number,
    name: string,
    person: Person,
    dt_create: string,
    dt_update: string
}

export interface CategoryIn{
    name: string,
    person: number 
}

