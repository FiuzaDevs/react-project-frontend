import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CitysInfosRegisterDto } from "../dtos/citysInfos.register.dto";
import { CitysInfosInterface } from "../interfaces/citysInfos.interface";
import { UserInterface } from "../interfaces/user.interface";
import { CitysInfos } from "../schemas/citysInfos.schema";

@Injectable()
export class CitysInfosService {

    constructor(
        @InjectModel(CitysInfos.name) private readonly model: Model<CitysInfosInterface>,
    ) { }

    async save(dto: CitysInfosRegisterDto): Promise<CitysInfosInterface> {
        const data = await new this.model(dto);
        return data.save();
    }

    async update(user: UserInterface, dto: CitysInfosRegisterDto): Promise<CitysInfosRegisterDto> {
        return await this.model.findOneAndUpdate({ user }, {
            $set: {
                cityName: dto.cityName,
                state: dto.state,
            }
        });
    }
}