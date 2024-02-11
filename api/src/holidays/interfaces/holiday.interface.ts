import { Document } from "mongoose";
export interface IHoliday extends Document{
    readonly holiday:string;
}