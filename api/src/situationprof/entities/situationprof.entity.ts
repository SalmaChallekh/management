import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
@Schema({timestamps:true})
export class Situationprof extends Document {
    @Prop()
    situationprof:string
    @Prop([{type:SchemaTypes.ObjectId,ref:'users'}])
    users:Types.ObjectId[]
}
export const SituationprofSchema=SchemaFactory.createForClass(Situationprof)
