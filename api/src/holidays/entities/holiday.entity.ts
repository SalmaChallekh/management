import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document,SchemaTypes,Types } from "mongoose";
@Schema({timestamps:true})
export class Holiday extends Document{
    @Prop()
    holiday:string
    @Prop({type:SchemaTypes.ObjectId,ref:'dmholidays'})
    dmholiday:Types.ObjectId[];
  
}
export const HolidaySchema=SchemaFactory.createForClass(Holiday)
