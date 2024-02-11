import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { SchemaTypes, Types } from "mongoose";
@Schema({timestamps:true})
export class Task extends Document{
    @Prop({required:true})
    name:string;
    @Prop({required:true})
    description:string;
    @Prop({required:true})
    deadline:string;
    @Prop({type:SchemaTypes.ObjectId,ref:'status',required:true})
    status:Types.ObjectId;
    @Prop({type:SchemaTypes.ObjectId,ref:'projects',required:true})
    project:Types.ObjectId; 
    @Prop([{type:SchemaTypes.ObjectId,ref:'taskemployees'}])
    taskemployee:Types.ObjectId[]
}
export const TasksSchema=SchemaFactory.createForClass(Task)