export interface UsersModel{
    id?: number;
    phone: string;
    email: string;
    password: string;
    username: string;
    name: string;
    money?: number;
    isDelete?: boolean;
    rolesId?: number
}                     
