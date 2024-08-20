export interface Login{
    email: string;
    password: string;
}

export interface Registration{
    id?: number;
    phone: string;
    name: string;
    username: string;
    email: string;
    password: string;
    roleId: number;
    date: Date;
}