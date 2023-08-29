import { Category } from './category';
import { Person } from "./person";

export interface News{
    id?: number,
    title: string,
    subtitle: string,
    content: string,
    photo?: string,
    category: Category,
    person: Person,
    dt_create?: string,
    dt_update?: string
}

export interface NewsIn{
    title: string,
    subtitle: string,
    content: string,
    category: number,
    person: number
}