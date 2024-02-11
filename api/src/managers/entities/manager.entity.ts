import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types, HydratedDocument } from "mongoose";

export type ManagerDocument = HydratedDocument<Manager>;
@Schema({ timestamps: true })
export class Manager {
    items: string;
    @Prop([{ type: SchemaTypes.ObjectId, ref: 'projects' }])
    projects: Types.ObjectId[]
}

export const ManagersSchema = SchemaFactory.createForClass(Manager)

