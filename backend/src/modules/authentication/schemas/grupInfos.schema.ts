import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { CitysInfos } from "./citysInfos.schema";
import { User } from "./user.schema";

@Schema({ timestamps: true, collection: 'citys-infos' })
export class GroupInfos {

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: User;

    @Prop({ type: String })
    email: string;

    @Prop({ type: String })
    name: string;

    @Prop({ type:[{  type: mongoose.Types.ObjectId, ref:'CitysInfos'}] , required: true, default: [] })
    citys:CitysInfos[]
    
}
export const GroupInfosSchema = SchemaFactory.createForClass(GroupInfos);