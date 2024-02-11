import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types,HydratedDocument, Document } from "mongoose";
export type EmployeeDocument=HydratedDocument<Employee>;
@Schema({timestamps:true})
export class Employee extends Document{
    items:string;
    @Prop([{type:SchemaTypes.ObjectId,ref:'taskemployees'}])
    taskemployee:Types.ObjectId[]
   
}
export const EmployeeSchema=SchemaFactory.createForClass(Employee)
