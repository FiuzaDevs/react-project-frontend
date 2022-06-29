import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { SendGridModule } from "@ntegral/nestjs-sendgrid";
import { EnviromentVariablesEnum } from "../../core/dtos/enviroment.variables.enum";
import { EmailService } from "../../core/services/email.service";
import { AuthenticationController } from "./controllers/authentication.controller";
import { UserController } from "./controllers/user.controller";
import { User, UserSchema } from "./schemas/user.schema";
import { Verification, VerificationSchema } from "./schemas/verification.schema";
import { AuthenticationService } from "./services/authentication.service";
import { UserService } from "./services/user.service";
import { VerificationService } from "./services/verification.service";
import { JwtStrategy } from "./strategies/jwt-strategy";
import { ContactInfo, ContactInfoSchema } from "./schemas/contact-data.schema";
import { ContactInfoService } from "./services/contact-info.service";
import { CitysInfos, CitysInfosSchema } from "./schemas/citysInfos.schema";
import { GroupInfos, GroupInfosSchema } from "./schemas/grupInfos.schema";
import { CitysInfosService } from "./services/cityInfo.service";
import { GroupInfosService } from "./services/groupInfos.service";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [
                ConfigModule,
            ],
            useFactory: async (
                configService: ConfigService,
            ) => ({
                secret: configService.get(EnviromentVariablesEnum.JWT_KEY),
                signOptions: {
                    expiresIn: configService.get(EnviromentVariablesEnum.JWT_EXPIRATION)
                }
            }),
            inject: [
                ConfigService,
            ]
        }),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Verification.name, schema: VerificationSchema },
            { name: ContactInfo.name, schema: ContactInfoSchema },
            { name: CitysInfos.name, schema: CitysInfosSchema },
            { name: GroupInfos.name, schema: GroupInfosSchema },

        ]),
        SendGridModule.forRootAsync({
            imports: [
                ConfigModule,
            ],
            useFactory: async (
                configService: ConfigService,
            ) => ({
                apiKey: await (configService.get(EnviromentVariablesEnum.NOSQL_CONNECTION_STRING)).SENDGRID_API_KEY
            }),
            inject: [
                ConfigService,
            ]
        }),
    ],
    controllers: [
        AuthenticationController,
        UserController,
    ],
    providers: [
        JwtStrategy,
        EmailService,
        AuthenticationService,
        UserService,
        VerificationService,
        CitysInfosService,
        GroupInfosService,
        ContactInfoService,
    ],
    exports: [
        UserService,
    ]
})
export class AuthenticationModule { }