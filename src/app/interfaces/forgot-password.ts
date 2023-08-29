export interface SendCodeIn{
    email: string
}

export interface SendCode{
    email: string,
    code: string,
    person: number
}

export interface ResendCodeIn{
    email: string,
    code: string,
}

export interface ResendCode{
    email: string,
    code: string,
    person: number
}

export interface ResetPasswordIn{
    password: string,
    person: number
}

export interface ResetPassword{
    content: string,
    status: number
}