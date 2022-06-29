import { ApiProperty } from "@nestjs/swagger";
export abstract class UserRegisterDto {

    @ApiProperty({ type: String })
    email: string;

    @ApiProperty({ type: String })
    password: string;
    
    status: string;

}