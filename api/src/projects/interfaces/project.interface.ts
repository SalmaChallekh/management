import { Document } from "mongoose";
export interface IProject extends Document{
    readonly title: string;
    readonly description :string;
    readonly deadline:string;
     readonly status:string; 
     readonly manager:string;
 
}