import { ApiProperty } from "@nestjs/swagger";

export abstract class CitysInfosRegisterDto {

    @ApiProperty({ type: String })
    cityName: string;

    @ApiProperty({ type: String })
    state: string;
}