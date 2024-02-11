import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document,SchemaTypes,Types } from "mongoose";
@Schema({timestamps:true})
export class Project extends Document {
    @Prop({required:true,unique:true})
    title:string;
    @Prop({required:true})
    description:string;
    @Prop({required:true})
    deadline:string;
    @Prop({type:SchemaTypes.ObjectId,ref:'status',required:true})
    status:Types.ObjectId;
     @Prop({type:SchemaTypes.ObjectId,ref:'users',required:true})
    manager:Types.ObjectId; 
    @Prop([{type:SchemaTypes.ObjectId,ref:'tasks'}])
    tasks:Types.ObjectId[]
}
export const ProjectSchema=SchemaFactory.createForClass(Project)
