import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../../../core/dtos/response.dto';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { UserService } from '../services/user.service';
import { UserStatusEnum } from '../schemas/user-status.enum';
import { UserInterface } from '../interfaces/user.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { ContactInfoService } from '../services/contact-info.service';
import { ContactInfoInterface } from '../interfaces/contact-info.interface';
import { CitysInfosService } from '../services/cityInfo.service';
import { GroupInfosService } from '../services/groupInfos.service';
import { GroupInfosInterface } from '../interfaces/GroupInfos.interface';
import { ContactInfoRegisterDto } from '../dtos/contact-info-register.dto';
import { GroupInfosRegisterDto } from '../dtos/groupInfos.register.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly contactInfoService: ContactInfoService,
    private readonly citysInfosService: CitysInfosService,
    private readonly groupInfosService: GroupInfosService,
  ) {}

  @Get('list')
  @HttpCode(200)
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async list() {
    try {
      const result = await this.userService.list();
      return new ResponseDto(true, result, null);
    } catch (error) {
      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('id/:id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getById(@Param('id') id: string) {
    try {
      const result = await this.getUserById(id);
      return new ResponseDto(true, result, null);
    } catch (error) {
      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('authenticated')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAuthenticated(@Req() request) {
    try {
      const payload: JwtPayload = request.user;
      const result = await this.getUserByEmail(payload.email);
      return new ResponseDto(true, result, null);
    } catch (error) {
      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('registerUser')
  @HttpCode(201)
  async register(@Body() dto: UserRegisterDto) {
    try {
      dto.status = UserStatusEnum.active;

      const user = await this.userService.save(dto);

      return new ResponseDto(
        true,
        {
          _id: user._id,
          email: user.email,
        },
        null,
      );
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('registerUserInfo')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async registerContacts(@Body() dto: ContactInfoRegisterDto, @Req() request) {
    try {
      const payload: JwtPayload = request.user;
      const result = await this.getUserByEmail(payload.email);
      dto.user = result;
      const user = await this.contactInfoService.save(dto);

      return new ResponseDto(
        true,
        {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        null,
      );
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('listGroup')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async listGroup(@Req() request) {
    try {
      const payload: JwtPayload = request.user;
      const user = await this.getUserByEmail(payload.email);
      const result = await this.groupInfosService.getByUser(user);

      return new ResponseDto(true, result, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('userInfos')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async userInfos(@Req() request) {
    try {
      const payload: JwtPayload = request.user;
      const user = await this.getUserByEmail(payload.email);
      const result = await this.contactInfoService.getByUser(user);

      return new ResponseDto(true, result, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('removeUserGroup/:id')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async removeUserGroup(@Param('id') _id: string) {
    try {
      const result = await this.groupInfosService.remove(_id);

      return new ResponseDto(true, result, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('registerGroup')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async registerGroup(@Body() dto: GroupInfosRegisterDto, @Req() request) {
    try {
      const payload: JwtPayload = request.user;
      const result = await this.getUserByEmail(payload.email);
      dto.user = result;
      const citys = dto.citys;
      
      for (let i = 0; i < citys.length; i++) {
        //@ts-ignore
        const {id, ...newObj} = citys[i];
        const city = await this.citysInfosService.save(newObj);
        dto.citys[i] = city;
      } 
      const user = await this.groupInfosService.save(dto);

      return new ResponseDto(
        true,
        {
          _id: user._id,
          name: user.name,
        },
        null,
      );
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('updateGroup')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateGroup(@Body() dto: GroupInfosRegisterDto, @Req() request) {
    try {
      const payload: JwtPayload = request.user;
      const result = await this.getUserByEmail(payload.email);
      dto.user = result;
      console.log("dto",dto);
      
      const citys = dto.citys;
      
      for (let i = 0; i < citys.length; i++) {
             //@ts-ignore
        if(citys[i]._id){
        //@ts-ignore
        const city = await this.citysInfosService.update(result,citys[i]);
        dto.citys[i] = city;
        console.log("fez update",city);
        

        }else{	
        //@ts-ignore
        const {id, ...newObj} = citys[i];
        const city = await this.citysInfosService.save(newObj);
        console.log("fez um novo",city);
        dto.citys[i] = city;
        }
      } 
      const response = await this.groupInfosService.update(result,dto);

      return new ResponseDto(
        true,
        {
          name: response.name,
        },
        null,
      );
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('id/:id')
  @HttpCode(200)
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async deletar(@Param('id') _id: string) {
    try {
      const result = await this.userService.delete(_id);

      return new ResponseDto(
        true,
        {
          _id: result._id,
          email: result.email,
        },
        null,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async getUserById(_id: string): Promise<UserInterface> {
    const usuario = await this.userService.getById(_id);

    if (!usuario) throw new NotFoundException('Erro ao obter o usuario!');

    return usuario;
  }

  private async getUserByEmail(email: string): Promise<UserInterface> {
    const usuario = await this.userService.getByEmail(email);

    if (!usuario) throw new NotFoundException('Erro ao obter o usuario!');

    return usuario;
  }
}
