import { Document } from "mongoose";
export interface IDmholiday extends Document{
    readonly dateofleave:string;
    readonly numberofdays:number;
    readonly holiday:string;
    /* readonly user:string; */
}