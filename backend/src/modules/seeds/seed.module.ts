
import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { AuthenticationModule } from '../authentication/authentication.module';
import { DatabaseSeedObjectiveCommand } from './database-seed-user.command';

@Module({
    imports: [
        CommandModule,
        AuthenticationModule,
    ],
    providers: [
        DatabaseSeedObjectiveCommand,
    ],
    exports: [
        DatabaseSeedObjectiveCommand,
    ]
})
export class SeedModule { }