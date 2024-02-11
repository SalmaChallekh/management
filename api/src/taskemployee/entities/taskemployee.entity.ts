import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
@Schema({timestamps:true})
export class Taskemployee extends Document{
    @Prop({type:SchemaTypes.ObjectId,ref:'tasks',required:true})
    task!:Types.ObjectId;
    @Prop({type:SchemaTypes.ObjectId,ref:'employees',required:true})
    employee!:Types.ObjectId
}
export const TaskemployeeSchema=SchemaFactory.createForClass(Taskemployee)
