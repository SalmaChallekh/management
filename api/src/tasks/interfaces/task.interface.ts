import { Document } from "mongoose";
export interface ITask extends Document{
    readonly name:string;
    readonly description:string;
    readonly deadline:string;
    readonly status:string; 
    readonly project:string;
}