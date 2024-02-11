import { Document } from "mongoose";
export interface IUser extends Document{
    readonly items:string;
    readonly fullName: string;
    readonly userName :string;
    readonly password :string;
    readonly email:string;
    readonly phone:number;
    readonly adress:string;
    readonly city:string;
    readonly zipCode:number;
    readonly situationprof:string;
   /*  readonly taskemployee:string; */
    /* readonly disponibility:boolean; */
    readonly refreshToken:string 

}