import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GroupInfosRegisterDto } from "../dtos/groupInfos.register.dto";
import { GroupInfosInterface } from "../interfaces/GroupInfos.interface";
import { UserInterface } from "../interfaces/user.interface";
import { GroupInfos } from "../schemas/grupInfos.schema";

@Injectable()
export class GroupInfosService {

    constructor(
        @InjectModel(GroupInfos.name) private readonly model: Model<GroupInfosInterface>,
    ) { }

    async save(dto: GroupInfosRegisterDto): Promise<GroupInfosInterface> {
        const data = await new this.model(dto);
        return data.save();
    }
    async getByUser(user: UserInterface): Promise<GroupInfosInterface[]> {
        return await this.model
            .find({ user }).populate('citys');
    }
    async remove(id: string): Promise<GroupInfosInterface> {
        return await this.model.findByIdAndRemove(id);
    }

    async update(user: UserInterface, dto: GroupInfosRegisterDto): Promise<GroupInfosRegisterDto> {
        return await this.model.findOneAndUpdate({ user }, {
            $set: {
                name: dto.name,
                citys: dto.citys,
            }
        });
    }
}