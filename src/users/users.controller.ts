import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResultDto } from 'src/dto/result.dto';
import { UsersRegisterDto } from './dto/users.register.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('findAll')
  async findAll(): Promise<Users[]>{
      return this.usersService.findAll()
  }

  @Post('register')
  async register(@Body() data: UsersRegisterDto): Promise<ResultDto>{  
    return this.usersService.register(data)
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;    
  }
}