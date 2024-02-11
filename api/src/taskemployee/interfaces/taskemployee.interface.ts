import { Document } from "mongoose";
export interface ITaskemployee extends Document{
    readonly task:string;
    readonly employee:string;
  
}