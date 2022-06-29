import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import * as mongoose from 'mongoose';
import { UserService } from '../authentication/services/user.service';
import { UserStatusEnum } from '../authentication/schemas/user-status.enum';
import { ContactInfoService } from '../authentication/services/contact-info.service';

@Injectable()
export class DatabaseSeedObjectiveCommand {
  constructor(
    private readonly userService: UserService,
    private readonly contactInfoService: ContactInfoService,
  ) {}

  @Command({
    command: 'seed:database:user',
    describe: 'seed database user',
  })
  async seed() {
    try {
      const joao = await this.userService.save({
        email:'joao@example.com',
        password: '1234',
        status : UserStatusEnum.active
      });

      await this.contactInfoService.save({name: "joao", email:joao.email,user:joao})
      console.log('Joao ended');

      const maria = await this.userService.save({
        email:'maria@example.com',
        password: '5678',
        status : UserStatusEnum.active
      })
      

      await this.contactInfoService.save({name: "Maria", email:maria.email,user:maria})
      console.log('maria ended');

      console.log('---------- seed finished');
    } catch (error) {
      console.log(error);
    }
  }
}