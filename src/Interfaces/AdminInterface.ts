export interface AdminInterface{
    email: string,
    password: string;
}


export interface LoginResponse {
    token: string;
    admin : AdminInterface;
}