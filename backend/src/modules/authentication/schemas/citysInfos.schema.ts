import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "./user.schema";

@Schema({ timestamps: true, collection: 'citys-infos' })
export class CitysInfos {

    @Prop({ type: String })
    cityName: string;

    @Prop({ type: String })
    state: string;

    
}
export const CitysInfosSchema = SchemaFactory.createForClass(CitysInfos);