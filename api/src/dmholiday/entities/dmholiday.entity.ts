import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document, SchemaTypes, Types  } from "mongoose";
@Schema({timestamps:true})
export class Dmholiday extends Document{
    @Prop({required:true})
    dateofleave:string;
    @Prop({required:true})
    numberofdays:number
    @Prop({type:SchemaTypes.ObjectId,ref:'holidays',required:true})
    holiday:Types.ObjectId;
    /* @Prop({type:SchemaTypes.ObjectId,ref:'users',required:true})
    user:Types.ObjectId; */
    @Prop({required:true})
    accepted :false ;
}
export const DmholidaySchema=SchemaFactory.createForClass(Dmholiday)
