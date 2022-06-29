import { ApiProperty } from "@nestjs/swagger";
import { UserInterface } from "../../authentication/interfaces/user.interface";
import { CitysInfosRegisterDto } from "./citysInfos.register.dto";

export abstract class GroupInfosRegisterDto {

    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: [CitysInfosRegisterDto] , required: false})
    citys: CitysInfosRegisterDto[];

    user: UserInterface;
}