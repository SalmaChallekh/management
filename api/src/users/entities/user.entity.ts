import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types, HydratedDocument } from "mongoose";

import * as argon2 from 'argon2'
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Admin } from "src/admins/entities/admin.entity";
export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true, discriminatorKey: 'items' })
export class User extends Document {

    @Prop({ type: String, required: true, enum: [Employee.name, Manager.name, Admin.name] })
    items: string

    @Prop({ required: true })
    fullName: string;
    @Prop({ required: true })
    userName: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: true, unique: true })
    email: string;
    @Prop({ required: true })
    phone: number;
    @Prop({ required: true })
    adress: string;
    @Prop({ required: true })
    city: string;
    @Prop({ required: true })
    zipCode: number;
    @Prop({ type: SchemaTypes.ObjectId, ref: 'situationprof' })
    situationprof: Types.ObjectId;
    /*  @Prop({required:true})
     disponibility:boolean; */
    /*  @Prop()
     taskemployee:string; */
    @Prop()
    refreshToken: string;

    @Prop([{ type: SchemaTypes.ObjectId, ref: 'projects' }])
    projects: Types.ObjectId[]
    @Prop([{type:SchemaTypes.ObjectId,ref:'taskemployees'}])
    taskemployee:Types.ObjectId[]

}
export const UsersSchema = SchemaFactory.createForClass(User).pre('save', async function () {
    this.password = await argon2.hash(this.password)
})
