import { Prop , Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document, SchemaTypes , Types} from "mongoose";
@Schema({timestamps:true})
export class Status  extends Document{
    @Prop()
    status:string
    @Prop([{type:SchemaTypes.ObjectId,ref:'tasks'}])
    tasks:Types.ObjectId[]
    @Prop([{type:SchemaTypes.ObjectId,ref:'projects'}])
    projects:Types.ObjectId[]

}
export const StatusSchema=SchemaFactory.createForClass(Status)
